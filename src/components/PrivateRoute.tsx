import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  isLoggedIn: boolean;
}

function PrivateRoute({ isLoggedIn, children, ...rest }: IPrivateRouteProps) {
  return (
    <Route
      {...rest}
      // @ts-ignore
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          /* istanbul ignore next */
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
      // render={({ location }) =>
      //   isLoggedIn ? (
      //     children
      //   ) : (
      //     /* istanbul ignore next */
      //     <Redirect
      //       to={{
      //         pathname: "/signin",
      //         state: { from: location },
      //       }}
      //     />
      //   )
      // }
    />
  );
}

export default PrivateRoute;
