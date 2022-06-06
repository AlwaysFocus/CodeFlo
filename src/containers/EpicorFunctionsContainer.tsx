import React from "react";
import { useMachine } from "@xstate/react";
import { Switch, Route } from "react-router";
import { EpicorFunctionDateRangePayload } from "../models";
import { epicorFunctionFiltersMachine } from "../machines/epicorFunctionFiltersMachine";
import { getDateQueryFields } from "../utils/transactionUtils";
import EpicorFunctionsPersonalList from "components/EpicorFunctionsPersonalList";
import EpicorFunctionsListFilters from "components/EpicorFunctionsListFilters";

const EpicorFunctionsContainer: React.FC = () => {
  const [currentFilters, sendFilterEvent] = useMachine(epicorFunctionFiltersMachine);

  const hasDateRangeFilter = currentFilters.matches({ dateRange: "filter" });

  const dateRangeFilters = hasDateRangeFilter && getDateQueryFields(currentFilters.context);

  const Filters = (
    <EpicorFunctionsListFilters
      dateRangeFilters={dateRangeFilters as EpicorFunctionDateRangePayload}
      sendFilterEvent={sendFilterEvent}
    />
  );

  return (
    <Switch>
      {/* <Route exact path="/contacts">
        <TransactionContactsList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as TransactionDateRangePayload}
          amountRangeFilters={amountRangeFilters as TransactionAmountRangePayload}
        />
      </Route> */}
      <Route exact path="/(epicor-functions)?/(personal)?">
        <EpicorFunctionsPersonalList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as EpicorFunctionDateRangePayload}
        />
      </Route>
      {/* <Route exact path="/(public)?">
        <TransactionPublicList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as TransactionDateRangePayload}
          amountRangeFilters={amountRangeFilters as TransactionAmountRangePayload}
        />
      </Route> */}
    </Switch>
  );
};

export default EpicorFunctionsContainer;
