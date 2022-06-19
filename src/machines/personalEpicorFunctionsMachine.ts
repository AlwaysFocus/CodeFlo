import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

export const personalEpicorFunctionsMachine = dataMachine("personalEpicorFunctions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(`http://localhost:${backendPort}/epicor-functions`, {
        params: !isEmpty(payload) ? payload : undefined,
      });

      console.log(`Inside PersonalEpicorFunctionsMachine: ${JSON.stringify(resp.data)}`);
      return resp.data;
    },
  },
});
