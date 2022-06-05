import { omit } from "lodash/fp";
import gql from "graphql-tag";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

const listEpicorConnectionQuery = gql`
  query ListEpicorConnection {
    listEpicorConnection {
      id
      name
      uuid
      userId
      epicorUrl
      epicorApiKey
      epicorUsername
      epicorPassword
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;

const deleteEpicorConnectionMutation = gql`
  mutation DeleteEpicorConnection($id: ID!) {
    deleteEpicorConnection(id: $id)
  }
`;

const createEpicorConnectionMutation = gql`
  mutation CreateEpicorConnection(
    $name: String!
    $epicorUrl: String!
    $epicorApiKey: String!
    $epicorUsername: String!
    $epicorPassword: String!
  ) {
    createEpicorConnection(
      name: $name
      epicorUrl: $epicorUrl
      epicorApiKey: $epicorApiKey
      epicorUsername: $epicorUsername
      epicorPassword: $epicorPassword
    ) {
      id
      name
      uuid
      userId
      epicorUrl
      epicorApiKey
      epicorUsername
      epicorPassword
      isDeleted
      createdAt
    }
  }
`;

export const epicorConnectionsMachine = dataMachine("epicorConnections").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "ListEpicorConnection",
        query: listEpicorConnectionQuery.loc?.source.body,
      });
      // @ts-ignore
      return { results: resp.data.data.listEpicorConnection, pageData: {} };
    },
    deleteData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "DeleteEpicorConnection",
        query: deleteEpicorConnectionMutation.loc?.source.body,
        variables: payload,
      });
      return resp.data;
    },
    createData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.post(`http://localhost:${backendPort}/graphql`, {
        operationName: "CreateEpicorConnection",
        query: createEpicorConnectionMutation.loc?.source.body,
        variables: payload,
      });
      return resp.data;
    },
  },
});
