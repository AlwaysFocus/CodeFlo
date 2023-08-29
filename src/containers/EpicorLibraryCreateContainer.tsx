import React, { useEffect } from "react";
import { useMachine, useActor } from "@xstate/react";
import { User, EpicorFunctionPayload, EpicorFunction, EpicorFunctionSignature } from "../models";
import { createEpicorFunctionMachine } from "machines/createEpicorFunctionMachine";
import { usersMachine } from "../machines/usersMachine";
import { debounce, props } from "lodash/fp";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";
import { SnackbarSchema, SnackbarContext, SnackbarEvents } from "../machines/snackbarMachine";
import {
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Library Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="libraryName"
            name="LibraryId"
            label="Library name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            // value={props.functionLibrary.LibraryId}
            // onChange={handleLibraryNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* @ts-ignore */}
          <FormControl variant="standard" sx={{ minWidth: 130 }}>
            <InputLabel id="epicor-version-select-label">Epicor Version</InputLabel>
            <Select
              name="Version"
              labelId="epicor-version-select-label"
              id="epicor-version-select"
              // value={props.functionLibrary.Version ?? "4.2.100"}
              // onChange={handleVersionChange}
              label="Epicor Version"
              // defaultValue="4.2.100"
            >
              <MenuItem value="4.2.100">4.2.100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="functionDescription"
            name="Description"
            // value={props.functionLibrary.Library.Description}
            // onChange={handleLibraryDescriptionChange}
            label="Function description"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          {/* @ts-ignore */}
          <FormControl variant="standard" sx={{ minWidth: 180 }}>
            <InputLabel id="db-access-select-label">DB Access from Code</InputLabel>
            <Select
              labelId="db-access-select-label"
              id="db-access-select"
              name="DirectDBAccess"
              // value={props.functionLibrary.Library.DirectDBAccess}
              // onChange={handleDBAccessChange}
              label="DB Access from Code"
              defaultValue={0}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Read Only</MenuItem>
              <MenuItem value={2}>Read Write</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="AllowCustomCodeWidgets"
                // checked={props.functionLibrary.Library.AllowCustomCodeWidgets}
                // onChange={handleCustomCodeWidgetChange}
              />
            }
            label="Custom Code Widgets"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="AllowCustomCodeFunctions"
                // checked={props.functionLibrary.Library.AllowCustomCodeFunctions}
                // onChange={handleCustomCodeFunctionChange}
              />
            }
            label="Custom Code Functions"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="internalUseOnly" value="no" />}
            label="For Internal Use Only"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="debugMode" value="no" />}
            label="Debug Mode"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="dumpSources" value="no" />}
            label="Dump Sources"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EpicorLibraryCreateContainer;
