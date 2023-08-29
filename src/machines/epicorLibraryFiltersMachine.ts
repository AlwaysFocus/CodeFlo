import { Machine, assign } from "xstate";

interface FilterSchema {
  states: {
    dateRange: {
      states: {
        none: {};
        filter: {};
      };
    };
  };
}

type DateFilterEvent = {
  type: "DATE_FILTER";
  dateRangeStart: string;
  dateRangeEnd: string;
};
type DateResetEvent = { type: "DATE_RESET" };
type FilterEvents = { type: "NONE" } | DateFilterEvent | DateResetEvent;

export interface FilterContext {}

export const epicorLibraryFiltersMachine = Machine<FilterContext, FilterSchema, FilterEvents>(
  {
    id: "filters",
    type: "parallel",
    context: {},
    states: {
      dateRange: {
        initial: "none",
        states: {
          none: {
            entry: "resetDateRange",
            on: {
              DATE_FILTER: "filter",
            },
          },
          filter: {
            entry: "setDateRange",
            on: {
              DATE_RESET: "none",
            },
          },
        },
      },
    },
  },
  {
    actions: {
      setDateRange: assign((ctx: FilterContext, event: any) => ({
        dateRangeStart: event.dateRangeStart,
        dateRangeEnd: event.dateRangeEnd,
      })),
      resetDateRange: assign((ctx: FilterContext, event: any) => ({
        dateRangeStart: undefined,
        dateRangeEnd: undefined,
      })),
    },
  }
);
