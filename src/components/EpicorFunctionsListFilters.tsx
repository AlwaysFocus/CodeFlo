import React from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { EpicorFunctionDateRangePayload } from "../models";
import EpicorFunctionsListDateRangeFilter from "./EpicorFunctionDateRangeFilter";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export type EpicorFunctionsListFiltersProps = {
  sendFilterEvent: Function;
  dateRangeFilters: EpicorFunctionDateRangePayload;
};

const EpicorFunctionsListFilters: React.FC<EpicorFunctionsListFiltersProps> = ({
  sendFilterEvent,
  dateRangeFilters,
}) => {
  const classes = useStyles();

  const filterDateRange = (payload: EpicorFunctionDateRangePayload) =>
    sendFilterEvent("DATE_FILTER", payload);
  const resetDateRange = () => sendFilterEvent("DATE_RESET");

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
        <Grid item>
          <EpicorFunctionsListDateRangeFilter
            filterDateRange={filterDateRange}
            dateRangeFilters={dateRangeFilters}
            resetDateRange={resetDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EpicorFunctionsListFilters;
