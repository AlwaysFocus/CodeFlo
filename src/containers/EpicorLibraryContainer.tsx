import React from "react";
import { useMachine } from "@xstate/react";
import { Switch, Route } from "react-router";
import { EpicorFunctionDateRangePayload } from "../models";

import { getDateQueryFields } from "utils/epicorFunctionUtils";
import { epicorLibraryFiltersMachine } from "machines/epicorLibraryFiltersMachine";
import EpicorLibraryListFilters from "components/EpicorLibraryListFilters";

const EpicorLibrariesContainer: React.FC = () => {
  const [currentFilters, sendFilterEvent] = useMachine(epicorLibraryFiltersMachine);

  const hasDateRangeFilter = currentFilters.matches({ dateRange: "filter" });

  const dateRangeFilters = hasDateRangeFilter && getDateQueryFields(currentFilters.context);

  const Filters = (
    <EpicorLibraryListFilters
      dateRangeFilters={dateRangeFilters as EpicorLibraryDateRangePayload}
      sendFilterEvent={sendFilterEvent}
    />
  );

  return (
    <Switch>
      <Route exact path="/epicor-libraries">
        <EpicorLibrariesPersonalList
          filterComponent={Filters}
          dateRangeFilters={dateRangeFilters as EpicorLibraryDateRangePayload}
        />
      </Route>
    </Switch>
  );
};

export default EpicorLibrariesContainer;
