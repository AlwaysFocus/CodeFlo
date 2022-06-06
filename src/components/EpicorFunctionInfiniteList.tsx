import React from "react";
import { get } from "lodash/fp";
import { useTheme, makeStyles, useMediaQuery, Divider } from "@material-ui/core";
import { InfiniteLoader, List, Index } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once

import EpicorFunctionItem from "./EpicorFunctionItem";
import { EpicorFunctionResponseItem, EpicorFunctionPagination } from "../models";

export interface EpicorFunctionLostProps {
  epicorFunctions: EpicorFunctionResponseItem[];
  loadNextPage: Function;
  pagination: EpicorFunctionPagination;
}

const useStyles = makeStyles((theme) => ({
  epicorFunctionList: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const EpicorFunctionInfiniteList: React.FC<EpicorFunctionLostProps> = ({
  epicorFunctions,
  loadNextPage,
  pagination,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXsBreakpoint = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const itemCount = pagination.hasNextPages ? epicorFunctions.length + 1 : epicorFunctions.length;

  const loadMoreItems = () => {
    return new Promise((resolve) => {
      return resolve(pagination.hasNextPages && loadNextPage(pagination.page + 1));
    });
  };

  const isRowLoaded = (params: Index) =>
    !pagination.hasNextPages || params.index < epicorFunctions.length;

  // @ts-ignore
  function rowRenderer({ key, index, style }) {
    const epicorFunction = get(index, epicorFunctions);

    if (index < epicorFunctions.length) {
      return (
        <div key={key} style={style}>
          <EpicorFunctionItem epicorFunction={epicorFunction} />
          <Divider variant={isMobile ? "fullWidth" : "inset"} />
        </div>
      );
    }
  }

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreItems}
      rowCount={itemCount}
      threshold={2}
    >
      {({ onRowsRendered, registerChild }) => (
        <div data-test="epicor-function-list" className={classes.epicorFunctionList}>
          <List
            rowCount={itemCount}
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            height={isXsBreakpoint ? theme.spacing(74) : theme.spacing(88)}
            width={isXsBreakpoint ? theme.spacing(38) : theme.spacing(110)}
            rowHeight={isXsBreakpoint ? theme.spacing(28) : theme.spacing(16)}
            rowRenderer={rowRenderer}
          />
        </div>
      )}
    </InfiniteLoader>
  );
};

export default EpicorFunctionInfiniteList;
