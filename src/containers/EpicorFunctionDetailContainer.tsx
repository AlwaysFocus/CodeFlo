import React, { useEffect } from "react";
import { useMachine, useActor } from "@xstate/react";
import { useParams } from "react-router-dom";
import { EpicorFunction } from "../models";
import { first } from "lodash/fp";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import { epicorFunctionDetailMachine } from "machines/epicorFunctionDetailMachine";
import EpicorFunctionDetail from "components/EpicorFunctionDetail";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}
interface Params {
  epicorFunctionId: string;
}

const EpicorFunctionDetailContainer: React.FC<Props> = ({ authService }) => {
  const { epicorFunctionId }: Params = useParams();
  const [authState] = useActor(authService);
  const [epicorFunctionDetailState, sendEpicorFunctionDetail] = useMachine(
    epicorFunctionDetailMachine
  );
  useEffect(() => {
    sendEpicorFunctionDetail("FETCH", { epicorFunctionId });
  }, [sendEpicorFunctionDetail, epicorFunctionId]);

  const epicorFunctionLike = (epicorFunctionId: EpicorFunction["id"]) =>
    sendEpicorFunctionDetail("CREATE", { entity: "LIKE", epicorFunctionId });

  const epicorFunctionComment = (payload: any) =>
    sendEpicorFunctionDetail("CREATE", { entity: "COMMENT", ...payload });

  const epicorFunctionUpdate = (payload: any) => sendEpicorFunctionDetail("UPDATE", payload);

  const epicorFunction = first(epicorFunctionDetailState.context?.results);
  const currentUser = authState?.context?.user;

  return (
    <>
      {epicorFunctionDetailState.matches("idle") && (
        <div>
          Loading...
          <br />
        </div>
      )}
      {currentUser && epicorFunctionDetailState.matches("success") && (
        <EpicorFunctionDetail
          epicorFunction={epicorFunction}
          epicorFunctionLike={epicorFunctionLike}
          epicorFunctionComment={epicorFunctionComment}
          epicorFunctionUpdate={epicorFunctionUpdate}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default EpicorFunctionDetailContainer;
