import { getEpicorConnectionsByUserId, getEpicorFunctionsByUserId } from "../../database";

const Query = {
  listEpicorConnection(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const connections = getEpicorConnectionsByUserId(ctx.user.id!);
      console.log("Inside listEpicorConnection");
      console.log(connections);
      return connections;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },
  listEpicorFunction(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const funcs = getEpicorFunctionsByUserId(ctx.user.id!);
      return funcs;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },
};

export default Query;
