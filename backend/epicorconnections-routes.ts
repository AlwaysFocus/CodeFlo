///<reference path="types.ts" />

import express from "express";

import {
  getEpicorConnectionsByUserId,
  getEpicorConnectionById,
  createEpicorConnectionForUser,
  removeEpicorConnectionById,
} from "./database";
import { ensureAuthenticated, validateMiddleware } from "./helpers";
import { shortIdValidation, isEpicorConnectionValidator } from "./validators";
const router = express.Router();

// Routes

//GET /epicorConnections (scoped-user)
router.get("/", ensureAuthenticated, (req, res) => {
  /* istanbul ignore next */
  const connections = getEpicorConnectionsByUserId(req.user?.id!);

  res.status(200);
  res.json({ results: connections });
});

//GET /epicorConnections/:epicorConnectionId (scoped-user)
router.get(
  "/:epicorConnectionId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("epicorConnectionId")]),
  (req, res) => {
    const { epicorConnectionId } = req.params;

    const connection = getEpicorConnectionById(epicorConnectionId);

    res.status(200);
    res.json({ connection });
  }
);

//POST /epicorConnections (scoped-user)
router.post(
  "/",
  ensureAuthenticated,
  validateMiddleware(isEpicorConnectionValidator),
  (req, res) => {
    /* istanbul ignore next */
    const connection = createEpicorConnectionForUser(req.user?.id!, req.body);

    res.status(200);
    res.json({ connection });
  }
);

//DELETE (soft) /epicorConnection (scoped-user)
router.delete(
  "/:epicorConnectionId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("epicorConnectionId")]),
  (req, res) => {
    const { epicorConnectionId } = req.params;

    const account = removeEpicorConnectionById(epicorConnectionId);

    res.status(200);
    res.json({ account });
  }
);

export default router;
