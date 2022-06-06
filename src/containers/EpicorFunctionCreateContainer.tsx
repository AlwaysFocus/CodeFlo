import React, { useEffect } from "react";
import { useMachine, useActor } from "@xstate/react";
import {
  User,
  TransactionPayload,
  EpicorFunctionPayload,
  EpicorFunction,
  EpicorFunctionSignature,
} from "../models";
import { createEpicorFunctionMachine } from "machines/createEpicorFunctionMachine";
import { usersMachine } from "../machines/usersMachine";
import { debounce } from "lodash/fp";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";
import { SnackbarSchema, SnackbarContext, SnackbarEvents } from "../machines/snackbarMachine";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import EpicorFunctionCreateStepOne from "components/EpicorFunctionCreateStepOne";
import { EpicorFunctionBuilder } from "builders/EpicorFunctionBuilder";
import EpicorFunctionCreateStepTwo from "components/EpicorFunctionCreateStepTwo";
import EpicorFunctionCreateStepThree from "components/EpicorFunctionCreateStepThree";
import EpicorFunctionCreateStepFour from "components/EpicorFunctionCreateStepFour";

export interface Props {
  authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents, any, any>;
  snackbarService: Interpreter<
    SnackbarContext,
    SnackbarSchema,
    SnackbarEvents,
    any,
    ResolveTypegenMeta<TypegenDisabled, SnackbarEvents, BaseActionObject, ServiceMap>
  >;
}

const EpicorFunctionCreateContainer: React.FC<Props> = ({ authService, snackbarService }) => {
  const [authState] = useActor(authService);
  const [, sendSnackbar] = useActor(snackbarService);

  // const [createTransactionState, sendCreateTransaction, createTransactionService] =
  //   useMachine(createTransactionMachine);

  const [createEpicorFunctionState, sendCreateEpicorFunction, createEpicorFunctionService] =
    useMachine(createEpicorFunctionMachine);

  // Expose createTransactionService on window for Cypress
  // @ts-ignore
  // window.createTransactionService = createTransactionService;

  // Expose createTransactionService on window for Cypress
  // @ts-ignore
  window.createEpicorFunctionService = createEpicorFunctionService;

  const epicorFunctionBuilder = new EpicorFunctionBuilder();
  const newEpicorFunction = epicorFunctionBuilder.build();

  useEffect(() => {});

  const setEpicorFunction = (functionId: string, description: string) => {
    // @ts-ignore
    sendCreateEpicorFunction({ type: "SET_EPICOR_FUNCTION_INFO", functionId, description });
  };

  const setEpicorFunctionBody = (code: string, usings: string[]) => {
    // @ts-ignore
    sendCreateEpicorFunction({ type: "SET_EPICOR_FUNCTION_BODY", code, usings });
  };

  const setEpicorFunctionSignature = (functionParameters: EpicorFunctionSignature[]) => {
    // @ts-ignore
    sendCreateEpicorFunction({ type: "SET_EPICOR_FUNCTION_SIGNATURE", functionParameters });
  };

  const createEpicorFunction = (payload: EpicorFunction) => {
    sendCreateEpicorFunction("CREATE", payload);
  };

  const showSnackbar = (payload: SnackbarContext) => sendSnackbar({ type: "SHOW", ...payload });

  let activeStep;
  if (createEpicorFunctionState.matches("stepTwo")) {
    activeStep = 1;
  } else if (createEpicorFunctionState.matches("stepThree")) {
    activeStep = 2;
  } else if (createEpicorFunctionState.matches("stepFour")) {
    activeStep = 3;
  } else {
    activeStep = 0;
  }

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step key={"stepOne"}>
          <StepLabel>Function Name & Description</StepLabel>
        </Step>
        <Step key={"stepTwo"}>
          <StepLabel>Function Body</StepLabel>
        </Step>
        <Step key={"stepThree"}>
          <StepLabel>Function Signature</StepLabel>
        </Step>
        <Step key={"stepFour"}>
          <StepLabel>Deploy</StepLabel>
        </Step>
      </Stepper>
      {createEpicorFunctionState.matches("stepOne") && (
        <EpicorFunctionCreateStepOne
          // setAuthor={setAuthor}
          // users={usersState.context.results!}
          // userListSearch={userListSearch}
          setEpicorFunctionDetails={setEpicorFunction}
          showSnackbar={showSnackbar}
        />
      )}
      {createEpicorFunctionState.matches("stepTwo") && (
        <EpicorFunctionCreateStepTwo
          setEpicorFunctionBody={setEpicorFunctionBody}
          showSnackbar={showSnackbar}
        />
      )}
      {createEpicorFunctionState.matches("stepThree") && (
        <EpicorFunctionCreateStepThree
          setEpicorFunctionSignature={setEpicorFunctionSignature}
          showSnackbar={showSnackbar}
        />
      )}
      {createEpicorFunctionState.matches("stepFour") && (
        <EpicorFunctionCreateStepFour
          // @ts-ignore
          createEpicorFunctionService={createEpicorFunctionService}
          createEpicorFunction={createEpicorFunction}
          showSnackbar={showSnackbar}
        />
      )}
    </>
  );
};

export default EpicorFunctionCreateContainer;
