import {
  User,
  NotificationType,
  TransactionQueryPayload,
  TransactionDateRangePayload,
  LikeNotification,
  CommentNotification,
  EpicorFunctionResponseItem,
  EpicorFunctionQueryPayload,
  EpicorFunctionDateRangePayload,
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
export const currentUserLikesEpicorFunction = (
  currentUser: User,
  epicorFunction: EpicorFunctionResponseItem
) =>
  flow(
    find((like) => flow(get("userId"), isEqual(get("id", currentUser)))(like)),
    negate(isEmpty)
  )(epicorFunction.likes);

export const hasDateQueryFields = (
  query: EpicorFunctionQueryPayload | EpicorFunctionDateRangePayload
) => has("dateRangeStart", query) && has("dateRangeEnd", query);

export const getDateQueryFields = (query: TransactionDateRangePayload) =>
  pick(["dateRangeStart", "dateRangeEnd"], query);

export const omitDateQueryFields = (query: TransactionQueryPayload) =>
  omit(["dateRangeStart", "dateRangeEnd"], query);
