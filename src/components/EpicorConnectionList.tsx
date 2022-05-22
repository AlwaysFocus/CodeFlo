import React from "react";
import { List } from "@material-ui/core";
import { EpicorConnection } from "../models";
import EpicorConnectionItem from "./EpicorConnectionItem";
import EmptyList from "./EmptyList";

// export interface BankAccountListProps {
//   bankAccounts: BankAccount[];
//   deleteBankAccount: Function;
// }

export interface EpicorConnectionListProps {
  epicorConnections: EpicorConnection[];
  deleteEpicorConnection: Function;
}

const EpicorConnectionList: React.FC<EpicorConnectionListProps> = ({
  epicorConnections,
  deleteEpicorConnection,
}) => {
  return (
    <>
      {epicorConnections?.length > 0 ? (
        <List
          // data-test="bankaccount-list"
          data-test="epicorconnection-list"
        >
          {epicorConnections.map((epicorConnection: EpicorConnection) => (
            <EpicorConnectionItem
              key={epicorConnection.epicorUrl}
              epicorConnection={epicorConnection}
              deleteEpicorConnection={deleteEpicorConnection}
            />
          ))}
        </List>
      ) : (
        <EmptyList entity="Epicor Connections" />
      )}
    </>
  );
};

export default EpicorConnectionList;
