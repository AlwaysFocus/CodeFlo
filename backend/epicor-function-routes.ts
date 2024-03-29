///<reference path="types.ts" />

import express from "express";
import { remove, isEmpty, slice, concat } from "lodash/fp";
import {
  getPublicTransactionsDefaultSort,
  getPublicTransactionsByQuery,
  getEpicorFunctionsForUserForApi,
  getEpicorFunctionByIdForApi,
  createEpicorFunction,
  createEpicorFunctionForUser,
} from "./database";
import { ensureAuthenticated, validateMiddleware } from "./helpers";
import {
  sanitizeTransactionStatus,
  sanitizeRequestStatus,
  isTransactionQSValidator,
  isTransactionPublicQSValidator,
  shortIdValidation,
} from "./validators";
import { getPaginatedItems } from "../src/utils/transactionUtils";
const router = express.Router();

// Routes

//GET /epicor-functions - scoped user, auth-required
router.get(
  "/",
  ensureAuthenticated,
  // validateMiddleware([
  //   sanitizeTransactionStatus,
  //   sanitizeRequestStatus,
  //   ...isTransactionQSValidator,
  // ]),
  (req, res) => {
    /* istanbul ignore next */
    const epicorFunctions = getEpicorFunctionsForUserForApi(req.user?.id!, req.query);
    // const transactions = getTransactionsForUserForApi(req.user?.id!, req.query);

    const { totalPages, data: paginatedItems } = getPaginatedItems(
      req.query.page,
      req.query.limit,
      epicorFunctions
    );

    res.status(200);
    res.json({
      pageData: {
        page: res.locals.paginate.page,
        limit: res.locals.paginate.limit,
        hasNextPages: res.locals.paginate.hasNextPages(totalPages),
        totalPages,
      },
      results: paginatedItems,
    });
  }
);

//GET /transactions/contacts - scoped user, auth-required
// router.get(
//   "/contacts",
//   ensureAuthenticated,
//   validateMiddleware([
//     sanitizeTransactionStatus,
//     sanitizeRequestStatus,
//     ...isTransactionQSValidator,
//   ]),
//   (req, res) => {
//     /* istanbul ignore next */
//     const transactions = getTransactionsForUserContacts(req.user?.id!, req.query);

//     const { totalPages, data: paginatedItems } = getPaginatedItems(
//       req.query.page,
//       req.query.limit,
//       transactions
//     );

//     res.status(200);
//     res.json({
//       pageData: {
//         page: res.locals.paginate.page,
//         limit: res.locals.paginate.limit,
//         hasNextPages: res.locals.paginate.hasNextPages(totalPages),
//         totalPages,
//       },
//       results: paginatedItems,
//     });
//   }
// );

//GET /epicor-functions/public - auth-required
// router.get(
//   "/public",
//   ensureAuthenticated,
//   validateMiddleware(isTransactionPublicQSValidator),
//   (req, res) => {
//     const isFirstPage = req.query.page === 1;

//     /* istanbul ignore next */
//     let transactions = !isEmpty(req.query)
//       ? getPublicTransactionsByQuery(req.user?.id!, req.query)
//       : /* istanbul ignore next */
//         getPublicTransactionsDefaultSort(req.user?.id!);

//     const { contactsTransactions, publicTransactions } = transactions;

//     let publicTransactionsWithContacts;

//     if (isFirstPage) {
//       const firstFiveContacts = slice(0, 5, contactsTransactions);

//       publicTransactionsWithContacts = concat(firstFiveContacts, publicTransactions);
//     }

//     const { totalPages, data: paginatedItems } = getPaginatedItems(
//       req.query.page,
//       req.query.limit,
//       isFirstPage ? publicTransactionsWithContacts : publicTransactions
//     );

//     res.status(200);
//     res.json({
//       pageData: {
//         page: res.locals.paginate.page,
//         limit: res.locals.paginate.limit,
//         hasNextPages: res.locals.paginate.hasNextPages(totalPages),
//         totalPages,
//       },
//       results: paginatedItems,
//     });
//   }
// );

//POST /epicor-functions - scoped-user
router.post(
  "/",
  ensureAuthenticated,
  // validateMiddleware(isTransactionPayloadValidator),
  (req, res) => {
    const epicorFunctionPayload = req.body;

    /* istanbul ignore next */
    const epicorFunction = createEpicorFunctionForUser(req.user?.id!, epicorFunctionPayload);

    res.status(200);
    res.json({ epicorFunction });
  }
);

//GET /transactions/:transactionId - scoped-user
router.get(
  "/:epicorFunctionId",
  ensureAuthenticated,
  // validateMiddleware([shortIdValidation("transactionId")]
  //),
  (req, res) => {
    const { epicorFunctionId } = req.params;
    console.log(`Hit get detail endpoint for epicor functions. Function ID: ${epicorFunctionId}`);
    const epicorFunction = getEpicorFunctionByIdForApi(epicorFunctionId);

    console.log(`Hit get detail endpoint for epicor functions. Functions: ${epicorFunction}`);

    res.status(200);
    res.json({ epicorFunction });
  }
);

//PATCH /transactions/:transactionId - scoped-user
// router.patch(
//   "/:epicorFunctionId",
//   ensureAuthenticated,
//   // validateMiddleware([shortIdValidation("epicorFunctionId"), ...isTransactionPatchValidator]),
//   (req, res) => {
//     const { epicorFunctionId } = req.params;

//     /* istanbul ignore next */
//     updateTransactionById(epicorFunctionId, req.body);

//     res.sendStatus(204);
//   }
// );

export default router;
