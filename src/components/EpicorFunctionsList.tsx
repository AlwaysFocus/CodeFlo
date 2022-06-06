import React, { ReactNode } from "react";
import { makeStyles, Paper, Button, ListSubheader, Grid } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { isEmpty } from "lodash/fp";

import SkeletonList from "./SkeletonList";
import { EpicorFunctionResponseItem, EpicorFunctionPagination } from "../models";
import EmptyList from "./EmptyList";
import EpicorFunctionInfiniteList from "./EpicorFunctionInfiniteList";
import TransferMoneyIllustration from "./SvgUndrawTransferMoneyRywa";

export interface EpicorFunctionListProps {
  header: string;
  epicorFunctions: EpicorFunctionResponseItem[];
  isLoading: Boolean;
  showCreateButton?: Boolean;
  loadNextPage: Function;
  pagination: EpicorFunctionPagination;
  filterComponent: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: theme.spacing(1),
  },
}));

const EpicorFunctionList: React.FC<EpicorFunctionListProps> = ({
  header,
  epicorFunctions,
  isLoading,
  showCreateButton,
  loadNextPage,
  pagination,
  filterComponent,
}) => {
  const classes = useStyles();

  const showEmptyList = !isLoading && epicorFunctions?.length === 0;
  const showSkeleton = isLoading && isEmpty(pagination);

  return (
    <Paper className={classes.paper}>
      {filterComponent}
      <ListSubheader component="div">{header}</ListSubheader>
      {showSkeleton && <SkeletonList />}
      {epicorFunctions.length > 0 && (
        <EpicorFunctionInfiniteList
          epicorFunctions={epicorFunctions}
          loadNextPage={loadNextPage}
          pagination={pagination}
        />
      )}
      {showEmptyList && (
        <EmptyList entity="Epicor Functions">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ width: "100%" }}
            spacing={2}
          >
            <Grid item>
              <TransferMoneyIllustration style={{ height: 200, width: 300, marginBottom: 30 }} />
            </Grid>
            <Grid item>
              {showCreateButton && (
                <Button
                  //   data-test="transaction-list-empty-create-transaction-button"
                  data-test="epicor-function-list-empty-create-epicor-function-button"
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/epicor-functions/new"
                >
                  Create A Function
                </Button>
              )}
            </Grid>
          </Grid>
        </EmptyList>
      )}
    </Paper>
  );
};

export default EpicorFunctionList;
