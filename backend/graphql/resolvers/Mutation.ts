import {
  createBankAccountForUser,
  createEpicorConnectionForUser,
  removeBankAccountById,
  removeEpicorConnectionById,
} from "../../database";

const Mutation = {
  createBankAccount: (obj: any, args: any, ctx: any) => {
    const account = createBankAccountForUser(ctx.user.id!, args);
    return account;
  },
  deleteBankAccount: (obj: any, args: any, ctx: any) => {
    removeBankAccountById(args.id);
    return true;
  },
  createEpicorConnection: (obj: any, args: any, ctx: any) => {
    const account = createEpicorConnectionForUser(ctx.user.id!, args);
    return account;
  },
  deleteEpicorConnection: (obj: any, args: any, ctx: any) => {
    removeEpicorConnectionById(args.id);
    return true;
  },
};

export default Mutation;
