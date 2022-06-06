import {
  Transaction,
  User,
  TransactionRequestStatus,
  NotificationType,
  PaymentNotificationStatus,
  TransactionResponseItem,
  TransactionQueryPayload,
  TransactionDateRangePayload,
  TransactionAmountRangePayload,
  LikeNotification,
  CommentNotification,
} from "../models";
import { faker } from "@faker-js/faker";
import Dinero from "dinero.js";
import {
  flow,
  get,
  isEmpty,
  negate,
  curry,
  isEqual,
  join,
  pick,
  values,
  has,
  find,
  omit,
  map,
  drop,
} from "lodash/fp";

/* istanbul ignore next */
export const currentUserLikesTransaction = (
  currentUser: User,
  transaction: TransactionResponseItem
) =>
  flow(
    find((like) => flow(get("userId"), isEqual(get("id", currentUser)))(like)),
    negate(isEmpty)
  )(transaction.likes);

export const hasDateQueryFields = (query: TransactionQueryPayload | TransactionDateRangePayload) =>
  has("dateRangeStart", query) && has("dateRangeEnd", query);

export const getDateQueryFields = (query: TransactionDateRangePayload) =>
  pick(["dateRangeStart", "dateRangeEnd"], query);

export const omitDateQueryFields = (query: TransactionQueryPayload) =>
  omit(["dateRangeStart", "dateRangeEnd"], query);
