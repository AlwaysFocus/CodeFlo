import React from "react";
import { useHistory } from "react-router";
import {
  ListItem,
  Typography,
  Grid,
  Avatar,
  ListItemAvatar,
  Paper,
  Badge,
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { ThumbUpAltOutlined as LikeIcon, CommentRounded as CommentIcon } from "@material-ui/icons";
import { EpicorFunctionResponseItem } from "../models";
import EpicorFunctionTitle from "./EpicorFunctionTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    margin: "auto",
    width: "100%",
  },
  avatar: {
    width: theme.spacing(2),
  },
  socialStats: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  countIcons: {
    color: theme.palette.grey[400],
  },
  countText: {
    color: theme.palette.grey[400],
    marginTop: 2,
    height: theme.spacing(2),
    width: theme.spacing(2),
  },
}));

type EpicorFunctionProps = {
  epicorFunction: EpicorFunctionResponseItem;
};

const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  })
)(Avatar);

const EpicorFunctionItem: React.FC<EpicorFunctionProps> = ({ epicorFunction }) => {
  const classes = useStyles();
  const history = useHistory();

  const showEpicorFunctionDetail = (epicorFunctionId: string) => {
    history.push(`/epicor-functions/${epicorFunctionId}`);
  };

  return (
    <ListItem
      data-test={`transaction-item-${epicorFunction.id}`}
      alignItems="flex-start"
      onClick={() => showEpicorFunctionDetail(epicorFunction.id)}
    >
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item>
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<SmallAvatar src={epicorFunction.thumbnail} />}
              >
                {/* <Avatar src={epicorFunction.senderAvatar} /> */}
              </Badge>
            </ListItemAvatar>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <EpicorFunctionTitle epicorFunction={epicorFunction} />
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {epicorFunction.description}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                  className={classes.socialStats}
                >
                  <Grid item>
                    <LikeIcon className={classes.countIcons} />
                  </Grid>
                  <Grid item>
                    <Typography data-test="transaction-like-count" className={classes.countText}>
                      {epicorFunction.likes.length}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CommentIcon className={classes.countIcons} />
                  </Grid>
                  <Grid item>
                    <Typography data-test="transaction-comment-count" className={classes.countText}>
                      {epicorFunction.comments.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
};

export default EpicorFunctionItem;
