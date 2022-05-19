import React from "react";

import { Grid, Typography, Button, ListItem } from "@material-ui/core";
import { EpicorConnection } from "../models";

export interface EpicorConnectionListItemProps {
  epicorConnection: EpicorConnection;
  deleteEpicorConnection: Function;
}

const EpicorConnectionListItem: React.FC<EpicorConnectionListItemProps> = ({
  epicorConnection,
  deleteEpicorConnection,
}) => {
  return (
    <ListItem data-test={`bankaccount-list-item-${epicorConnection.id}`}>
      <Grid container direction="row" justify="space-between" alignItems="flex-start">
        <Grid item>
          <Typography variant="body1" color="primary" gutterBottom>
            {epicorConnection.epicorUrl} {epicorConnection.isDeleted ? "(Deleted)" : undefined}
          </Typography>
        </Grid>
        {!epicorConnection.isDeleted && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              // data-test="bankaccount-delete"
              data-test="epicorconnection-delete"
              onClick={() => {
                deleteEpicorConnection({ id: epicorConnection.id });
              }}
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
};

export default EpicorConnectionListItem;
