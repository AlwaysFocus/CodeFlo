import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { EpicorFunctionResponseItem } from "../models";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.fontSize,
    },
  },
  titleAction: {
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.fontSize,
    },
  },
  titleName: {
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.fontSize,
    },
    color: "#1A202C",
  },
}));

const EpicorFunctionTitle: React.FC<{
  epicorFunction: EpicorFunctionResponseItem;
}> = ({ epicorFunction }) => {
  const classes = useStyles();

  return (
    <Typography color="textSecondary" className={classes.title} gutterBottom>
      <Typography
        // data-test={`transaction-sender-${transaction.id}`}
        data-test={`epicor-function-id-${epicorFunction.id}`}
        className={classes.titleName}
        display="inline"
        component="span"
      >
        {epicorFunction.functionId}
      </Typography>
      <Typography
        // data-test={`transaction-action-${transaction.id}`}
        data-test={`epicor-function-description-${epicorFunction.id}`}
        display="inline"
        className={classes.titleAction}
        component="span"
      >
        {/* {isRequestTransaction(transaction)
          ? isAcceptedRequestTransaction(transaction)
            ? " charged "
            : " requested "
          : " paid "} */}
        {epicorFunction.description}
      </Typography>
    </Typography>
  );
};

export default EpicorFunctionTitle;
