import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Paper, Typography, Grid, Box, Button } from "@mui/material";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import {
  CreateEpicorFunctionMachineContext,
  CreateEpicorFunctionMachineEvents,
  CreateEpicorFunctionMachineSchema,
} from "../machines/createEpicorFunctionMachine";
import { useActor } from "@xstate/react";
import { EpicorFunction } from "models";

export interface EpicorFunctionCreateStepFourProps {
  createEpicorFunctionService: Interpreter<
    { epicorFunction: EpicorFunction },
    CreateEpicorFunctionMachineSchema,
    CreateEpicorFunctionMachineEvents,
    any,
    ResolveTypegenMeta<
      TypegenDisabled,
      CreateEpicorFunctionMachineEvents,
      BaseActionObject,
      ServiceMap
    >
  >;
  createEpicorFunction: Function;
  showSnackbar: Function;
}

const EpicorFunctionCreateStepFour: React.FC<EpicorFunctionCreateStepFourProps> = ({
  createEpicorFunctionService,
  createEpicorFunction,
}) => {
  const history = useHistory();
  const [createEpicorFunctionState, sendCreateEpicorFunction] = useActor(
    createEpicorFunctionService
  );
  const epicorFunctionDetails = createEpicorFunctionState?.context?.epicorFunction;

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} elevation={0}>
      <Box
        display="flex"
        justifyContent="center"
        width="95%"
        min-height={200}
        height={200}
        style={{ paddingTop: "5%" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Typography component="h2" variant="h3" color="primary" gutterBottom>
                  {epicorFunctionDetails.functionId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="h3" variant="h4" color="primary" gutterBottom>
                  {epicorFunctionDetails.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height="100"
        style={{ paddingBottom: "5%" }}
      >
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {/* ID: {epicorFunctionDetails.id} */}
              {/* Description: {epicorFunctionDetails.description} */}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height="100"
        style={{ paddingBottom: "5%" }}
      >
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              size="small"
              component={RouterLink}
              to="/"
              data-test="new-epicor-function-return-to-epicor-functions"
              onClick={() => {
                createEpicorFunction(epicorFunctionDetails);
                sendCreateEpicorFunction("RESET");
                history.push("/epicor-functions/personal");
              }}
            >
              Submit and Exit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              /* istanbul ignore next */
              onClick={() => {
                createEpicorFunction(epicorFunctionDetails);
                sendCreateEpicorFunction("RESET");
                history.push("/epicor-functions/new");
              }}
              data-test="new-epicor-function-create-another-epicor-function"
            >
              Create Another Function
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EpicorFunctionCreateStepFour;
