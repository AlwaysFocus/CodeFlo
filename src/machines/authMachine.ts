import dotenv from "dotenv";
import { Machine, assign, interpret, State } from "xstate";
import { omit } from "lodash/fp";
import { httpClient } from "../utils/asyncUtils";
import { history } from "../utils/historyUtils";
import { User } from "../models";
import { backendPort } from "../utils/portUtils";

dotenv.config();
export interface AuthMachineSchema {
  states: {
    unauthorized: {};
    signup: {};
    loading: {};
    updating: {};
    logout: {};
    refreshing: {};
    google: {};
    authorized: {};
    auth0: {};
    cognito: {};
    okta: {};
  };
}

export type AuthMachineEvents =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "UPDATE" }
  | { type: "REFRESH" }
  | { type: "AUTH0" }
  | { type: "COGNITO" }
  | { type: "OKTA" }
  | { type: "GOOGLE" }
  | { type: "SIGNUP" };

export interface AuthMachineContext {
  user?: User;
  message?: string;
}

export const authMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAdKjmlqQE74BekAxADIDyA4gJIByiUAAdSsfGRxCQAD0QBGACwAmAMwUADPPmrlANgAcBgOwG9igDQgAnomOr5FVXvnnVGje4CcLgL6+rWmw8IhJ8cioaDEwGZjYAZV5ufgBVAAVpUXFJaTkEJTVNbV1DEzNLG0QvAFZ1NWr5DWVFBxNzf0Do3AJiSUig2JYIVm5OHnYAUUyxCXCpJFkFZQNqpwdjRsVFNz1VK1t8o2UKaurmhw1dr0UvDpAg7tC+6gHGIdYAQRSAFQAJDWm2TmuQUnmMFGUtTOXguTSa+wUikuTkUxmuBi8yh0PjuDxCvTm-WigzYnAA0t8PoDZuQQflGhoKGZjE1ITCsc0EfkNMZVhprq5UcoNIp5MZlLiuviwhEXsS3mwAMI8fi8b6cak5BZ5RqGCimRTVLzGjQGbQaapcgC0SMZHixqjNyg2N2qkqwjwJEXEUBwqGErAg5DAFHwOAAbqQANYhvE9GWUH1+4QIMORr04ADaGgAuprgdrEYUtDp9EZTOYuWY9BCzKpVDcvAZ+dd3cF430k-7WGB6PQGBRhAAbEgAMwYAFsKHGnoSuym06QM9m8wssjT5qAdSoa01NqpqqabnovFzjGi1ry9FeWso723PQmKEPSMgIGGoIHg6GI9HY1KO0JF83w-VNf2XXN81pQt8haOoHGqPQXDNMUai5JEa0hAwD0xAUD22B9pT6YD3xwT9e37ehBxHdBx3oKcZwzZ9X1IqAwPTBMVygzdFlg5wIVFBtsMPHQlC5cxFAoUVll5RCYXkDFCMA2VhAgMIyK-HAQ0XGNpwA2cVLUggyPYpdOMgtcZi1LdEF2AwKAkm4jAMFQNmMLl3EwxCzRcm40TRJSDMof0jI-Hs+wHYcx0nPSPSIwkQvUtjFwg1cRCsgsbO5YwawPWpMVZHkDC5RDGWbBx5C8SrDDUQKmPoMBRwa2BMDCoMtJ-SNdMYp8GqauBWpMlLzLSkB12s3irX0Y4T1LVR-N2S4uWWJxTQtRpXDhDFjDq3rGuawbyIiqiotomKer6PqDtA4bJC4yygWgrKpr0Gaqt0eavByzzrWqezzB5QUxSvXRdsu-aBrCrhRh+bi6Ret65oWn7KgQG5JKvHyti+nGwcJKBSFIKAhzATTtN-br9KYgmiZJ0zUrhmCrTFVZrhcDYYQaBo9C5TbGWcKqsVZa9aoCe4qafGnidJijIpouiGIlvopbp265nu9LHp4vIrQPE5HT0IqDGFK93NRsVm00S4LTZsUsTxiIVdJ6HOFhh6N3h0UazOQ19FNUoVl5llMLMLEXO0LYJTFi6gKJ0gMDJzq-1i9sguYgmMHpkbGayyrji8JpUQZdwVEUYrUfFLwHOw9blneswHcoF8M-QcLKOo6L6JTx9iLjzO1fIDWxoyp7eLzigC+aDYPBL5py4Oc9wT0P6vr+w9nAI6OlcJV44mGdIABEPm+KZ3YmvI7IcrYnKMVyxRK3kTlcNQtGN5-bi3uLlMoXf3gAJQmAAMQAfEX4OdeLOn+nWYuJgtiWnNmYfUpREKuCqi5L6jcU4kmGC7N2msPYwWWMccs8hnRaFOEoVE4kzT6kBvocUaJSFuk-qnJiQQNCJx0v+L+ad2FZzuhZfB59EAIwcu9NQyMlrm0qpJP6HIWRaE8CKTB7C25y07orHhbDogaH4erQRw8tbw2mmIpGX1Fo83NroKuh5DAKWNIbesegVE6I4DwV23xwE6xMbND6kjLEHFITQ2opprgtDLjyZxLCe6EmjOgZAnCKbcNYU+OJyA9GDwMeNTKk0fHiM+t9KRBxqgqH1LoYwLQSyF0wWktRJ15bnW3hENJGSsxZJHtrEReSzGFICVUVwDl6w4UQuKWo8galRniW4mGniz45O8a9UxfjzEowXqYKSfkmyGHCQ0TBhAiY4AkKQRJXVkkxIiPs30RzWlD2yaPBZiNlm9OtMsRkDRRS8hcsvZwUTOhaKfJcw56Bjmy3qRo7u8ULkHOuQPNpo07mdIQKI3xEiVlFJEUoVYK8y6Oi5vWEpezoXAumR4rxXTFkooKRY60lV1CIRKUeUhvIcR3BwKQCAcBpAx1lFEOgCoIBkvyOcfUK92aySNHsVGVVHCA0uDCDYtjFCYPnIK9+E9oQeBaPYVwZsDgmEcGYGoWIGieCbJgkiH5VWvSrkaguIp5oOGvOJG4E8fCXGFGadmzC-kpOeKpJKgrsKSVFM2E8xpXLGxKmXJw8gjTKCNfWO8O1omQsoFdSGZFBU2mvBPDYahGjNFpfIdCtQpL6G0CYJNLhY2YKdlm9eEJtBEPjfNc4uqFBmD5J4HQngHBT1+eLf5vcW6CvUO4SEbIGyGAuAeM8iyRTL12DlTw2yXF8r3oKlQjJBRsi0C4HkFSo2rDNHGhNuhnRrswACOZ9yRFITeZiBwYSVi4V5oeeyOVmgjMuKcZwEz4lZpuNuowYyWiPrvLzU1EJEJYiUPYQwSFCVXOBfW5EH0T11mtpKg4zNzAbI2ohFwTZQ6Nyzdsk4j6ZFl1PdaIUE9zDlQ2j2zw-h-BAA */
  Machine<AuthMachineContext, AuthMachineSchema, AuthMachineEvents>(
    {
      context: {
        user: undefined,
        message: undefined,
      },
      id: "authentication",
      initial: "unauthorized",
      states: {
        unauthorized: {
          entry: "resetUser",
          on: {
            LOGIN: {
              target: "loading",
            },
            SIGNUP: {
              target: "signup",
            },
            GOOGLE: {
              target: "google",
            },
            AUTH0: {
              target: "auth0",
            },
            OKTA: {
              target: "okta",
            },
            COGNITO: {
              target: "cognito",
            },
          },
        },
        signup: {
          invoke: {
            src: "performSignup",
            onDone: [
              {
                actions: "onSuccess",
                target: "unauthorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
        },
        loading: {
          invoke: {
            src: "performLogin",
            onDone: [
              {
                actions: "onSuccess",
                target: "authorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
        },
        updating: {
          invoke: {
            src: "updateProfile",
            onDone: [
              {
                target: "refreshing",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
        },
        refreshing: {
          invoke: {
            src: "getUserProfile",
            onDone: [
              {
                actions: "setUserProfile",
                target: "authorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
          on: {
            LOGOUT: {
              target: "logout",
            },
          },
        },
        google: {
          invoke: {
            src: "getGoogleUserProfile",
            onDone: [
              {
                actions: "setUserProfile",
                target: "authorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
          on: {
            LOGOUT: {
              target: "logout",
            },
          },
        },
        logout: {
          invoke: {
            src: "performLogout",
            onDone: [
              {
                target: "unauthorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
        },
        authorized: {
          entry: "redirectHomeAfterLogin",
          on: {
            UPDATE: {
              target: "updating",
            },
            REFRESH: {
              target: "refreshing",
            },
            LOGOUT: {
              target: "logout",
            },
          },
        },
        auth0: {
          invoke: {
            src: "getAuth0UserProfile",
            onDone: [
              {
                actions: "setUserProfile",
                target: "authorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
          on: {
            LOGOUT: {
              target: "logout",
            },
          },
        },
        okta: {
          invoke: {
            src: "getOktaUserProfile",
            onDone: [
              {
                actions: "setUserProfile",
                target: "authorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
          on: {
            LOGOUT: {
              target: "logout",
            },
          },
        },
        cognito: {
          invoke: {
            src: "getCognitoUserProfile",
            onDone: [
              {
                actions: "setUserProfile",
                target: "authorized",
              },
            ],
            onError: [
              {
                actions: "onError",
                target: "unauthorized",
              },
            ],
          },
          on: {
            LOGOUT: {
              target: "logout",
            },
          },
        },
      },
    },
    {
      services: {
        performSignup: async (ctx, event) => {
          const payload = omit("type", event);
          const resp = await httpClient.post(`http://localhost:${backendPort}/users`, payload);
          history.push("/signin");
          return resp.data;
        },
        performLogin: async (ctx, event) => {
          return await httpClient
            .post(`http://localhost:${backendPort}/login`, event)
            .then(({ data }) => {
              history.push("/");
              return data;
            })
            .catch((error) => {
              throw new Error("Username or password is invalid");
            });
        },
        getOktaUserProfile: /* istanbul ignore next */ (ctx, event: any) => {
          // Map Okta User fields to our User Model
          const user = {
            id: event.user.sub,
            email: event.user.email,
            firstName: event.user.given_name,
            lastName: event.user.family_name,
            username: event.user.preferred_username,
          };

          // Set Access Token in Local Storage for API calls
          localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_NAME!, event.token);

          return Promise.resolve({ user });
        },
        getUserProfile: async (ctx, event) => {
          const resp = await httpClient.get(`http://localhost:${backendPort}/checkAuth`);
          return resp.data;
        },
        getGoogleUserProfile: /* istanbul ignore next */ (ctx, event: any) => {
          // Map Google User fields to our User Model
          const user = {
            id: event.user.googleId,
            email: event.user.email,
            firstName: event.user.givenName,
            lastName: event.user.familyName,
            avatar: event.user.imageUrl,
          };

          // Set Google Access Token in Local Storage for API calls
          localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_NAME!, event.token);

          return Promise.resolve({ user });
        },
        getAuth0UserProfile: /* istanbul ignore next */ (ctx, event: any) => {
          // Map Auth0 User fields to our User Model
          const user = {
            id: event.user.sub,
            email: event.user.email,
            firstName: event.user.nickname,
            avatar: event.user.picture,
          };

          // Set Auth0 Access Token in Local Storage for API calls
          localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_NAME!, event.token);

          return Promise.resolve({ user });
        },
        updateProfile: async (ctx, event: any) => {
          const payload = omit("type", event);
          const resp = await httpClient.patch(
            `http://localhost:${backendPort}/users/${payload.id}`,
            payload
          );
          return resp.data;
        },
        performLogout: async (ctx, event) => {
          localStorage.removeItem("authState");
          return await httpClient.post(`http://localhost:${backendPort}/logout`);
        },
        getCognitoUserProfile: /* istanbul ignore next */ (ctx, event: any) => {
          // Map Cognito User fields to our User Model
          const ourUser = {
            id: event.user.sub,
            email: event.user.email,
          };

          // Set Access Token in Local Storage for API calls
          localStorage.setItem(
            process.env.REACT_APP_AUTH_TOKEN_NAME!,
            event.user.signInUserSession.accessToken.jwtToken
          );

          return Promise.resolve(ourUser);
        },
      },
      actions: {
        redirectHomeAfterLogin: async (ctx, event) => {
          if (history.location.pathname === "/signin") {
            /* istanbul ignore next */
            window.location.pathname = "/";
          }
        },
        resetUser: assign((ctx: any, event: any) => ({
          user: undefined,
        })),
        setUserProfile: assign((ctx: any, event: any) => ({
          user: event.data.user,
        })),
        onSuccess: assign((ctx: any, event: any) => ({
          user: event.data.user,
          message: undefined,
        })),
        onError: assign((ctx: any, event: any) => ({
          message: event.data.message,
        })),
      },
    }
  );

// @ts-ignore
const stateDefinition = JSON.parse(localStorage.getItem("authState"));

let resolvedState;
if (stateDefinition) {
  const previousState = State.create(stateDefinition);

  // @ts-ignore
  resolvedState = authMachine.resolveState(previousState);
}

export const authService = interpret(authMachine)
  .onTransition((state) => {
    if (state.changed) {
      localStorage.setItem("authState", JSON.stringify(state));
    }
  })
  .start(resolvedState);
