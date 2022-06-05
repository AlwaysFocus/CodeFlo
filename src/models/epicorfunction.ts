import { EpicorFunctionBody } from "./epicorfunctionbody";
import { EpicorFunctionSignature } from "./epicorfunctionsignature";

import { DefaultPrivacyLevel } from "./user";
import { Like, Comment } from ".";

export interface EpicorFunction {
  id: string;
  uuid: string;
  userId: string;
  functionId: string; // This is the functions name
  description: string;
  kind: 2;
  requireTransaction: boolean;
  singleRowMode: boolean;
  private: boolean;
  disabled: boolean;
  invalid: boolean;
  thumbnail?: any;
  body: EpicorFunctionBody | string | null;
  functionSignature: EpicorFunctionSignature[] | null;
  privacyLevel: DefaultPrivacyLevel;
  isDeleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export type EpicorFunctionPayload = Pick<EpicorFunction, "functionId" | "description" | "userId">;

export interface EpicorFunctionResponseItem extends EpicorFunction {
  likes: Like[];
  comments: Comment[];
  receiverName: string;
  receiverAvatar: string;
  senderName: string;
  senderAvatar: string;
}

// export type TransactionCreatePayload = Partial<
//   Pick<Transaction, "senderId" | "receiverId" | "description"> & {
//     amount: string;
//     transactionType: string;
//   }
// >;
export type EpicorFunctionCreatePayload = Partial<
  Pick<EpicorFunction, "functionId" | "description"> & {}
>;

// export type TransactionUpdateActionPayload = Pick<Transaction, "id" | "requestStatus">;

type EpicorFunctionQueryBase = {
  dateRangeStart?: string;
  dateRangeEnd?: string;
  functionId?: string;
  createdBy?: number;
  published?: boolean;
  limit?: number;
  page?: number;
};

export type EpicorFunctionQueryPayload = Partial<EpicorFunctionQueryBase>;

export type EpicorFunctionDateRangePayload = Partial<
  Pick<EpicorFunctionQueryPayload, "dateRangeStart" | "dateRangeEnd">
>;

export type EpicorFunctionFindByIdPayload = Partial<Pick<EpicorFunctionQueryPayload, "functionId">>;

export type EpicorFunctionPaginationPayload = Partial<
  Pick<EpicorFunctionQueryPayload, "page" | "limit">
>;

export type EpicorFunctionClearFiltersPayload = {
  filterType: "date" | "functionId";
};

export type EpicorFunctionPagination = {
  page: number;
  limit: number;
  hasNextPages: boolean;
  totalPages: number;
};
