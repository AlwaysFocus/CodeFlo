import React, { useEffect, ReactNode } from "react";
import { useMachine } from "@xstate/react";
import {
  EpicorFunctionPagination,
  EpicorFunctionResponseItem,
  EpicorFunctionDateRangePayload,
} from "../models";
import EpicorFunctionList from "./EpicorFunctionsList";
import { personalEpicorFunctionsMachine } from "machines/personalEpicorFunctionsMachine";

export interface EpicorFunctionPersonalListProps {
  filterComponent: ReactNode;
  dateRangeFilters: EpicorFunctionDateRangePayload;
}

const EpicorFunctionsPersonalList: React.FC<EpicorFunctionPersonalListProps> = ({
  filterComponent,
  dateRangeFilters,
}) => {
  const [current, send, personalEpicorFunctionService] = useMachine(personalEpicorFunctionsMachine);
  const { pageData, results } = current.context;

  // @ts-ignore
  if (window.Cypress) {
    // @ts-ignore
    window.personalEpicorFunctionService = personalEpicorFunctionService;
  }

  useEffect(() => {
    console.log("About to fetch epicor functions in TransactionPublic");
    send("FETCH", { ...dateRangeFilters });
  }, [send, dateRangeFilters]);

  const loadNextPage = (page: number) => send("FETCH", { page, ...dateRangeFilters });

  return (
    <>
      <EpicorFunctionList
        filterComponent={filterComponent}
        header="Personal"
        epicorFunctions={results as EpicorFunctionResponseItem[]}
        isLoading={current.matches("loading")}
        loadNextPage={loadNextPage}
        pagination={pageData as EpicorFunctionPagination}
        showCreateButton={true}
      />
    </>
  );
};

export default EpicorFunctionsPersonalList;
