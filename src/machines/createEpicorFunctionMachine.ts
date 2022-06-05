import { omit } from "lodash/fp";
import { assign, createMachine } from "xstate";
import gql from "graphql-tag";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { User, EpicorFunctionCreatePayload, EpicorFunction } from "../models";
import { authService } from "./authMachine";
import { backendPort } from "../utils/portUtils";
import { EpicorFunctionBuilder } from "builders/EpicorFunctionBuilder";
import produce from "immer";

export interface CreateEpicorFunctionMachineSchema {
  states: {
    stepOne: {};
    stepTwo: {};
    stepThree: {};
    stepFour: {};
  };
}

const createEpicorFunctionMutation = gql`
  mutation CreateEpicorFunction(
    $functionId: String!
    $description: String!
    $functionBody: EpicorFunctionBody
    $functionSignature: EpicorFunctionSignature!
  ) {
    createEpicorConnection(
      functionId: $functionId
      description: $description
      functionBody: $functionBody
      functionSignature: $functionSignature
    ) {
      id
      uuid
      userId
      description
      kind
      requireTransaction
      singleRowMode
      private
      disabled
      invalid
      thumbnail
      body
      functionSignature
      privacyLevel
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;

const epicorFunctionDataMachine = dataMachine("epicorFunctionData").withConfig({
  services: {
    createData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "CreateEpicorFunction",
        query: createEpicorFunctionMutation.loc?.source.body,
        variables: payload,
      });
      return resp.data;
    },
  },
});

export type CreateEpicorFunctionMachineEvents =
  | { type: "SET_EPICOR_FUNCTION_INFO" }
  | { type: "SET_EPICOR_FUNCTION_BODY" }
  | { type: "SET_EPICOR_FUNCTION_SIGNATURE" }
  | { type: "CREATE_EPICOR_FUNCTION" }
  | { type: "RESET" };

export interface CreateEpicorFunctionMachineContext {
  epicorFunctionDetails: EpicorFunction;
}

const epicorFunctionBuilder = new EpicorFunctionBuilder();

export const createEpicorFunctionMachine = createMachine(
  {
    preserveActionOrder: true,
    schema: {
      // Context of the machine
      context: { epicorFunction: {} as EpicorFunction },

      // The events this machine can handle
      events: {} as CreateEpicorFunctionMachineEvents,
    },
    context: { epicorFunction: epicorFunctionBuilder.build() },
    id: "createEpicorFunction",
    initial: "stepOne",
    states: {
      stepOne: {
        entry: ["clearContext"],
        on: {
          SET_EPICOR_FUNCTION_INFO: {
            target: "stepTwo",
            // transition actions
            actions: ["setEpicorFunctionDetail"],
          },
        },
      },
      stepTwo: {
        entry: [(context: any) => console.log(JSON.stringify(context))],
        on: {
          SET_EPICOR_FUNCTION_BODY: {
            target: "stepThree",
            actions: ["setEpicorFunctionBody"],
          },
        },
      },
      stepThree: {
        entry: [(context: any) => console.log(JSON.stringify(context))],
        on: {
          SET_EPICOR_FUNCTION_SIGNATURE: {
            target: "stepFour",
            actions: ["setEpicorFunctionSignature"],
          },
          RESET: {
            target: "stepOne",
          },
        },
      },
      stepFour: {
        entry: [(context: any) => console.log(JSON.stringify(context))],
        invoke: {
          src: epicorFunctionDataMachine,
          id: "epicorFunctionDataMachine",
          autoForward: true,
        },
        on: {
          CREATE_EPICOR_FUNCTION: {
            target: "stepOne",
            actions: ["createEpicorFunction"],
          },
          RESET: {
            target: "stepOne",
          },
        },
      },
    },
  },
  {
    actions: {
      setEpicorFunctionDetail: assign((ctx, event: any) => ({
        epicorFunction: {
          ...ctx.epicorFunction,
          functionId: event.functionId,
          description: event.description,
        },
      })),
      setEpicorFunctionBody: assign((ctx, event: any) => ({
        epicorFunction: {
          ...ctx.epicorFunction,
          body: {
            code: event.code,
            usings: event.usings,
          },
        },
      })),
      setEpicorFunctionSignature: (ctx, event: any) => {
        const addNewFunctionSignature = produce(ctx.epicorFunction.functionSignature, (draft) => {
          draft?.push(...event.functionParameters);
        });

        assign({
          epicorFunction: {
            ...ctx.epicorFunction,
            functionSignature: addNewFunctionSignature,
          },
        });
      },
      createEpicorFunction: (ctx, event: any) => {
        return;
      },
      clearContext: assign((ctx, event: any) => ({})),
    },
  }
);
