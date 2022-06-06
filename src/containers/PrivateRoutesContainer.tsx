import React, { useEffect } from "react";
import { Switch } from "react-router";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import MainLayout from "../components/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import TransactionsContainer from "./TransactionsContainer";
import UserSettingsContainer from "./UserSettingsContainer";
import NotificationsContainer from "./NotificationsContainer";
import EpicorConnectionsContainer from "./EpicorConnectionsContainer";
import EpicorFunctionCreateContainer from "./EpicorFunctionCreateContainer";
import TransactionDetailContainer from "./TransactionDetailContainer";
import { DataContext, DataSchema, DataEvents } from "../machines/dataMachine";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";
import { SnackbarContext, SnackbarSchema, SnackbarEvents } from "../machines/snackbarMachine";
import { useActor } from "@xstate/react";
import UserOnboardingContainer from "./UserOnboardingContainer";
import EpicorFunctionsContainer from "./EpicorFunctionsContainer";

export interface Props {
  isLoggedIn: boolean;
  authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents, any, any>;
  notificationsService: Interpreter<
    DataContext,
    DataSchema,
    DataEvents,
    any,
    ResolveTypegenMeta<TypegenDisabled, DataEvents, BaseActionObject, ServiceMap>
  >;
  snackbarService: Interpreter<
    SnackbarContext,
    SnackbarSchema,
    SnackbarEvents,
    any,
    ResolveTypegenMeta<TypegenDisabled, SnackbarEvents, BaseActionObject, ServiceMap>
  >;
  epicorConnectionsService: Interpreter<
    DataContext,
    DataSchema,
    DataEvents,
    any,
    ResolveTypegenMeta<TypegenDisabled, DataEvents, BaseActionObject, ServiceMap>
  >;
}

const PrivateRoutesContainer: React.FC<Props> = ({
  isLoggedIn,
  authService,
  notificationsService,
  snackbarService,
  epicorConnectionsService,
}) => {
  const [, sendNotifications] = useActor(notificationsService);

  useEffect(() => {
    sendNotifications({ type: "FETCH" });
  }, [sendNotifications]);

  return (
    <MainLayout notificationsService={notificationsService} authService={authService}>
      <UserOnboardingContainer
        authService={authService}
        epicorConnectionsService={epicorConnectionsService}
      />
      <Switch>
        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path={"/(public|contacts|personal)?"}>
          <TransactionsContainer />
        </PrivateRoute> */}
        <PrivateRoute
          isLoggedIn={isLoggedIn}
          exact
          path={"/epicor-functions/(public|contacts|personal)?"}
        >
          <EpicorFunctionsContainer />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path="/user/settings">
          <UserSettingsContainer authService={authService} />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path="/notifications">
          <NotificationsContainer
            authService={authService}
            notificationsService={notificationsService}
          />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/epicorconnections*">
          <EpicorConnectionsContainer
            authService={authService}
            epicorConnectionsService={epicorConnectionsService}
          />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path="/epicor-functions/new">
          <EpicorFunctionCreateContainer
            authService={authService}
            snackbarService={snackbarService}
          />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} exact path="/transaction/:transactionId">
          <TransactionDetailContainer authService={authService} />
        </PrivateRoute>
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutesContainer;
