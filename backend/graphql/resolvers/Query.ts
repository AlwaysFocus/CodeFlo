import { getBankAccountsByUserId, getEpicorConnectionsByUserId } from "../../database";

const Query = {
  listBankAccount(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const accounts = getBankAccountsByUserId(ctx.user.id!);

      return accounts;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },
  listEpicorConnection(obj: any, args: any, ctx: any) {
    /* istanbul ignore next */
    try {
      const connections = getEpicorConnectionsByUserId(ctx.user.id!);

      return connections;
      /* istanbul ignore next */
    } catch (err: any) {
      /* istanbul ignore next */
      throw new Error(err);
    }
  },
};

export default Query;
