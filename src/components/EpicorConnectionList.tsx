import React from "react";
import { List } from "@material-ui/core";

import { BankAccount } from "../models";
import { EpicorConnection } from "../models";
import BankAccountItem from "./EpicorConnectionItem";
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
        <List data-test="bankaccount-list">
          {epicorConnections.map((epicorConnection: EpicorConnection) => (
            <BankAccountItem
              key={epicorConnection.id}
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
