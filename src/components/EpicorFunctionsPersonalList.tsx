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
  //   const [current, send, personalTransactionService] = useMachine(personalTransactionsMachine);
  const [current, send, personalEpicorFunctionService] = useMachine(personalEpicorFunctionsMachine);
  const { pageData, results } = current.context;

  // @ts-ignore
  if (window.Cypress) {
    // @ts-ignore
    window.personalEpicorFunctionService = personalEpicorFunctionService;
    // window.personalTransactionService = personalTransactionService;
  }

  useEffect(() => {
    send("FETCH", { ...dateRangeFilters });
  }, [send, dateRangeFilters]);
  //   }, [send, dateRangeFilters, amountRangeFilters]);

  const loadNextPage = (page: number) => send("FETCH", { page, ...dateRangeFilters });
  // send("FETCH", { page, ...dateRangeFilters, ...amountRangeFilters });

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
