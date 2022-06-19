import React from "react";
import { Button, Typography, Grid, Avatar, Paper, IconButton, makeStyles } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { ThumbUpAltOutlined as LikeIcon, CommentRounded as CommentIcon } from "@material-ui/icons";
import {
  TransactionResponseItem,
  TransactionRequestStatus,
  User,
  EpicorFunctionResponseItem,
} from "../models";
import CommentForm from "./CommentForm";
import {
  isPendingRequestTransaction,
  receiverIsCurrentUser,
  currentUserLikesTransaction,
} from "../utils/transactionUtils";
import CommentsList from "./CommentList";
import TransactionTitle from "./TransactionTitle";
import TransactionAmount from "./TransactionAmount";
import EpicorFunctionTitle from "./EpicorFunctionTitle";
import { currentUserLikesEpicorFunction } from "utils/epicorFunctionUtils";
import EpicorFunctionCommentForm from "./EpicorFunctionCommentForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paperComments: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(2),
  },
  headline: {
    marginTop: theme.spacing(4),
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarGroup: {
    margin: 10,
  },
  redButton: {
    backgrounColor: "red",
    color: "#ffffff",
    backgroundColor: "red",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "red",
      borderColor: "red",
      boxShadow: "none",
    },
  },
  greenButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
    backgroundColor: "#00C853",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#4CAF50",
      borderColor: "#00C853",
      boxShadow: "none",
    },
  },
}));

// type TransactionProps = {
//   transaction: TransactionResponseItem;
//   transactionLike: Function;
//   transactionComment: Function;
//   transactionUpdate: Function;
//   currentUser: User;
// };

type EpicorFunctionProps = {
  epicorFunction: EpicorFunctionResponseItem;
  epicorFunctionLike: Function;
  epicorFunctionComment: Function;
  epicorFunctionUpdate: Function;
  currentUser: User;
};

const EpicorFunctionDetail: React.FC<EpicorFunctionProps> = ({
  epicorFunction,
  epicorFunctionLike,
  epicorFunctionComment,
  epicorFunctionUpdate,
  currentUser,
}) => {
  const classes = useStyles();
  console.log(`In Epicor Function Detail, the function is: ${JSON.stringify(epicorFunction)}`);
  return (
    <Paper className={classes.paper}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        // data-test="transaction-detail-header"
        data-test="epicor-function-detail-header"
      >
        Epicor Function Detail
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        // data-test={`transaction-item-${transaction.id}`}
        data-test={`epicor-function-item-${epicorFunction.id}`}
      >
        <Grid item className={classes.headline}>
          {/* <AvatarGroup className={classes.avatarGroup} max={2}>
            <Avatar
              data-test="transaction-sender-avatar"
              className={classes.avatarLarge}
              src={transaction.senderAvatar}
            />
            <Avatar
              data-test="transaction-receiver-avatar"
              className={classes.avatarLarge}
              src={transaction.receiverAvatar}
            />
          </AvatarGroup> */}
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item></Grid>
            <Grid item>
              <EpicorFunctionTitle epicorFunction={epicorFunction} />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                // data-test="transaction-description"
                data-test="epicor-function-description"
              >
                {epicorFunction.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item>
          <TransactionAmount transaction={transaction} />
        </Grid> */}
      </Grid>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        <Grid item>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            {/* <Grid item data-test={`transaction-like-count-${transaction.id}`}> */}
            <Grid item data-test={`epicor-function-like-count-${epicorFunction.id}`}>
              {epicorFunction.likes ? epicorFunction.likes.length : 0}{" "}
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                // disabled={currentUserLikesTransaction(currentUser, transaction)}
                disabled={currentUserLikesEpicorFunction(currentUser, epicorFunction)}
                onClick={() => epicorFunctionLike(epicorFunction.id)}
                // data-test={`transaction-like-button-${transaction.id}`}
                data-test={`epicor-function-like-button-${epicorFunction.id}`}
              >
                <LikeIcon />
              </IconButton>
            </Grid>
            {/* <Grid item>
              {receiverIsCurrentUser(currentUser, transaction) &&
                isPendingRequestTransaction(transaction) && (
                  <Grid item>
                    <Button
                      className={classes.greenButton}
                      variant="contained"
                      size="small"
                      onClick={() =>
                        transactionUpdate({
                          id: transaction.id,
                          requestStatus: TransactionRequestStatus.accepted,
                        })
                      }
                      data-test={`transaction-accept-request-${transaction.id}`}
                    >
                      Accept Request
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.redButton}
                      size="small"
                      onClick={() =>
                        transactionUpdate({
                          id: transaction.id,
                          requestStatus: TransactionRequestStatus.rejected,
                        })
                      }
                      data-test={`transaction-reject-request-${transaction.id}`}
                    >
                      Reject Request
                    </Button>
                  </Grid>
                )}
            </Grid> */}
          </Grid>
          <Grid item>
            {/* <CommentForm
              transactionId={transaction.id}
              transactionComment={(payload) => transactionComment(payload)}
            /> */}
            <EpicorFunctionCommentForm
              epicorFunctionId={epicorFunction.id}
              epicorFunctionComment={(payload) => epicorFunctionComment(payload)}
            />
          </Grid>
        </Grid>
      </Grid>
      {epicorFunction.comments.length > 0 && (
        <Paper className={classes.paperComments}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            <CommentIcon /> Comments
          </Typography>
          <CommentsList comments={epicorFunction.comments} />
        </Paper>
      )}
    </Paper>
  );
};

export default EpicorFunctionDetail;
