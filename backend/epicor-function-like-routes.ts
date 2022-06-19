///<reference path="types.ts" />

import express from "express";
import { getLikesByEpicorFunctionId, createLikes } from "./database";
import { ensureAuthenticated, validateMiddleware } from "./helpers";
import { shortIdValidation } from "./validators";
const router = express.Router();

// Routes

//GET /likes/:epicorFunctionId
router.get(
  "/:epicorFunctionId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("epicorFunctionId")]),
  (req, res) => {
    const { epicorFunctionId } = req.params;
    const likes = getLikesByEpicorFunctionId(epicorFunctionId);

    res.status(200);
    res.json({ likes });
  }
);

//POST /likes/:epicorFunctionId
router.post(
  "/:epicorFunctionId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("epicorFunctionId")]),
  (req, res) => {
    const { epicorFunctionId } = req.params;
    /* istanbul ignore next */
    createLikes(req.user?.id!, epicorFunctionId);

    res.sendStatus(200);
  }
);

export default router;
