import { omit, flow, first, isEmpty } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

export const epicorFunctionDetailMachine = dataMachine("epicorFunctionData").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const contextEpicorFunctionId = !isEmpty(ctx.results) && first(ctx.results)["id"];
      const epicorFunctionId = contextEpicorFunctionId || payload.epicorFunctionId;
      console.log(
        `Attempting to fetch details for epicor function. payload: ${JSON.stringify(payload)}`
      );
      console.log(`epicorFunctionId: ${epicorFunctionId}`);
      const resp = await httpClient.get(
        `http://localhost:${backendPort}/epicor-functions/${epicorFunctionId}`
      );
      console.log(
        `Retrieved response for fetched function data. response: ${JSON.stringify(resp)}`
      );
      // @ts-ignore
      return { results: [resp.data.epicorFunction] };
    },
    createData: async (ctx, event: any) => {
      let route = event.entity === "LIKE" ? "epicor-function-likes" : "epicor-function-comments";
      const payload = flow(omit("type"), omit("entity"))(event);
      const resp = await httpClient.post(
        `http://localhost:${backendPort}/${route}/${payload.epicorFunctionId}`,
        payload
      );
      return resp.data;
    },
    // updateData: async (ctx, event: any) => {
    //   const payload = omit("type", event);
    //   const contextTransactionId = !isEmpty(ctx.results) && first(ctx.results)["id"];
    //   const transactionId = contextTransactionId || payload.id;
    //   const resp = await httpClient.patch(
    //     `http://localhost:${backendPort}/transactions/${transactionId}`,
    //     payload
    //   );
    //   return resp.data;
    // },
  },
});
