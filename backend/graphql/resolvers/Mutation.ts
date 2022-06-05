import { DefaultPrivacyLevel } from "models";
import {
  createEpicorConnectionForUser,
  createEpicorFunctionForUser,
  removeEpicorConnectionById,
  removeEpicorFunctionById,
} from "../../database";

const Mutation = {
  createEpicorConnection: (obj: any, args: any, ctx: any) => {
    const connection = createEpicorConnectionForUser(ctx.user.id!, args);
    return connection;
  },
  deleteEpicorConnection: (obj: any, args: any, ctx: any) => {
    removeEpicorConnectionById(args.id);
    return true;
  },
  createEpicorFunction: (obj: any, args: any, ctx: any) => {
    console.log("Triggered createEpicorFunction in GraphQL server");
    const func = createEpicorFunctionForUser(ctx.user.id!, args);
    return func;
  },
  deleteEpicorFunction: (obj: any, args: any, ctx: any) => {
    removeEpicorFunctionById(args.id);
    return true;
  },
};

export default Mutation;
