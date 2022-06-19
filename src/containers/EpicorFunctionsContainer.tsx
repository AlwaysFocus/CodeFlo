import React from "react";
import { useMachine } from "@xstate/react";
import { Switch, Route } from "react-router";
import { EpicorFunctionDateRangePayload } from "../models";
import { epicorFunctionFiltersMachine } from "../machines/epicorFunctionFiltersMachine";

import EpicorFunctionsPersonalList from "components/EpicorFunctionsPersonalList";
import EpicorFunctionsListFilters from "components/EpicorFunctionsListFilters";
import { getDateQueryFields } from "utils/epicorFunctionUtils";

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
      <Route exact path="/epicor-functions">
        <EpicorFunctionsPersonalList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as EpicorFunctionDateRangePayload}
        />
      </Route>
      {/* <Route exact path="/(epicor-functions)?/(personal)?">
        <EpicorFunctionsPersonalList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as EpicorFunctionDateRangePayload}
        />
      </Route>
      <Route exact path="/(epicor-functions)?/(public)?">
        <EpicorFunctionsPersonalList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as EpicorFunctionDateRangePayload}
        />
      </Route> */}
    </Switch>
  );
};

export default EpicorFunctionsContainer;
