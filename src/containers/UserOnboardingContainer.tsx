import React, { useEffect } from "react";
import {
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import { isEmpty } from "lodash/fp";
import { useActor, useMachine } from "@xstate/react";

import { userOnboardingMachine } from "../machines/userOnboardingMachine";
import EpicorConnectionForm from "../components/EpicorConnectionForm";
import { DataContext, DataEvents, DataSchema } from "../machines/dataMachine";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";
import NavigatorIllustration from "../components/SvgUndrawNavigatorA479";
import PersonalFinance from "../components/SvgUndrawPersonalFinanceTqcd";
import CodeReviewIllustration from "../components/SvgUndrawCodeReview";

export interface Props {
  authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents, any, any>;
  // bankAccountsService: Interpreter<
  //   DataContext,
  //   DataSchema,
  //   DataEvents,
  //   any,
  //   ResolveTypegenMeta<TypegenDisabled, DataEvents, BaseActionObject, ServiceMap>
  // >;
  epicorConnectionsService: Interpreter<
    DataContext,
    DataSchema,
    DataEvents,
    any,
    ResolveTypegenMeta<TypegenDisabled, DataEvents, BaseActionObject, ServiceMap>
  >;
}

const UserOnboardingContainer: React.FC<Props> = ({ authService, epicorConnectionsService }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [epicorConnectionsState, sendEpicorConnections] = useActor(epicorConnectionsService);
  const [authState, sendAuth] = useActor(authService);
  const [userOnboardingState, sendUserOnboarding] = useMachine(userOnboardingMachine);

  const currentUser = authState?.context?.user;

  useEffect(() => {
    sendEpicorConnections("FETCH");
  }, [sendEpicorConnections]);

  const noEpicorConnections =
    epicorConnectionsState?.matches("success.withoutData") &&
    isEmpty(epicorConnectionsState?.context?.results);

  const dialogIsOpen =
    (userOnboardingState.matches("stepTwo") && !noEpicorConnections) ||
    (userOnboardingState.matches("stepThree") && !noEpicorConnections) ||
    (!userOnboardingState.matches("done") && noEpicorConnections) ||
    false;

  const nextStep = () => sendUserOnboarding("NEXT");

  const createEpicorConnectionWithNextStep = (payload: any) => {
    sendEpicorConnections({ type: "CREATE", ...payload });
    nextStep();
  };

  return (
    <Dialog data-test="user-onboarding-dialog" fullScreen={fullScreen} open={dialogIsOpen}>
      <DialogTitle data-test="user-onboarding-dialog-title">
        {userOnboardingState.matches("stepOne") && "Get Started with CodeFlo"}
        {userOnboardingState.matches("stepTwo") && "Enter Epicor Connection Info"}
        {userOnboardingState.matches("stepThree") && "Finished"}
      </DialogTitle>
      <DialogContent data-test="user-onboarding-dialog-content">
        <Box display="flex" alignItems="center" justifyContent="center">
          {userOnboardingState.matches("stepOne") && (
            <>
              {/* <NavigatorIllustration /> */}
              <CodeReviewIllustration />
              <br />
              <DialogContentText style={{ paddingLeft: 20 }}>
                CodeFlo requires a connection to your Epicor Environment to work.
                <br />
                <br />
                Click <b>Next</b> to begin setup of your Epicor Connection.
              </DialogContentText>
            </>
          )}
          {userOnboardingState.matches("stepTwo") && (
            <EpicorConnectionForm
              userId={currentUser?.id!}
              createEpicorConnection={createEpicorConnectionWithNextStep}
              onboarding
            />
          )}
          {userOnboardingState.matches("stepThree") && (
            <>
              <PersonalFinance />
              <br />
              <DialogContentText style={{ paddingLeft: 20 }}>
                You're all set!
                <br />
                <br />
                Time to let the Code Flow!
              </DialogContentText>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between">
          <Grid item>
            <Button
              style={{ paddingRight: "80%" }}
              onClick={/* istanbul ignore next */ () => sendAuth("LOGOUT")}
              color="secondary"
              data-test="user-onboarding-logout"
            >
              Logout
            </Button>
          </Grid>
          <Grid item>
            {!userOnboardingState.matches("stepTwo") && (
              <Button onClick={() => nextStep()} color="primary" data-test="user-onboarding-next">
                {userOnboardingState.matches("stepThree") ? "Done" : "Next"}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default UserOnboardingContainer;
