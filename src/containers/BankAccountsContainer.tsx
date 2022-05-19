import React, { useEffect } from "react";
import { useActor } from "@xstate/react";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from "xstate";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { Grid, Button, Paper, Typography, useTheme } from "@mui/material";

import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";
import { DataContext, DataEvents, DataSchema } from "../machines/dataMachine";
import EpicorConnectionForm from "../components/EpicorConnectionForm";
import EpicorConnectionList from "../components/EpicorConnectionList";

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

const EpicorConnectionsContainer: React.FC<Props> = ({
  authService,
  // bankAccountsService,
  epicorConnectionsService,
}) => {
  const match = useRouteMatch();
  const theme = useTheme();
  const [authState] = useActor(authService);
  // const [bankAccountsState, sendBankAccounts] = useActor(bankAccountsService);
  const [epicorConnectionsState, sendEpicorConnections] = useActor(epicorConnectionsService);

  const paperStyle = {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  };

  const currentUser = authState?.context.user;

  // const createBankAccount = (payload: any) => {
  //   sendBankAccounts({ type: "CREATE", ...payload });
  // };
  const createEpicorConnection = (payload: any) => {
    sendEpicorConnections({ type: "CREATE", ...payload });
  };

  // const deleteBankAccount = (payload: any) => {
  //   sendBankAccounts({ type: "DELETE", ...payload });
  // };
  const deleteEpicorConnection = (payload: any) => {
    sendEpicorConnections({ type: "DELETE", ...payload });
  };

  useEffect(() => {
    // sendBankAccounts("FETCH");
    sendEpicorConnections("FETCH");
  }, [sendEpicorConnections]);

  if (match.url === "/epicorconnections/new" && currentUser?.id) {
    return (
      <Paper sx={{ ...paperStyle }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Create Epicor Connection
        </Typography>
        <EpicorConnectionForm
          userId={currentUser?.id}
          createEpicorConnection={createEpicorConnection}
        />
      </Paper>
    );
  }

  return (
    <Paper sx={{ ...paperStyle }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Epicor Connections
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/epicorconnections/new"
            // data-test="bankaccount-new"
            data-test="epicorconnection-new"
          >
            Create
          </Button>
        </Grid>
      </Grid>
      {/* <BankAccountList
        bankAccounts={bankAccountsState?.context.results!}
        deleteBankAccount={deleteBankAccount}
      /> */}
      <EpicorConnectionList
        epicorConnections={epicorConnectionsState?.context.results!}
        deleteEpicorConnection={deleteEpicorConnection}
      />
    </Paper>
  );
};
export default EpicorConnectionsContainer;
