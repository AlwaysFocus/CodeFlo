import React, { useEffect } from "react";
import { useMachine, useActor } from "@xstate/react";
import { User, EpicorFunctionPayload, EpicorFunction, EpicorFunctionSignature } from "../models";
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

import EpicorFunctionCreateStepTwo from "components/EpicorFunctionCreateStepTwo";
import EpicorFunctionCreateStepThree from "components/EpicorFunctionCreateStepThree";
import EpicorFunctionCreateStepFour from "components/EpicorFunctionCreateStepFour";
import { createEpicorLibraryMachine } from "machines/createEpicorLibraryMachine";

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

const EpicorLibraryCreateContainer: React.FC<Props> = ({ authService, snackbarService }) => {
  const [authState] = useActor(authService);
  const [, sendSnackbar] = useActor(snackbarService);

  const [createEpicorLibraryState, sendCreateEpicorLibrary, createEpicorLibraryService] =
    useMachine(createEpicorLibraryMachine);

  // Expose createEpicorLibraryService on window for Cypress
  // @ts-ignore
  window.createEpicorLibraryService = createEpicorLibraryService;

  const showSnackbar = (payload: SnackbarContext) => sendSnackbar({ type: "SHOW", ...payload });

  return <></>;
};

export default EpicorLibraryCreateContainer;
