///<reference path="types.ts" />

import express from "express";
import {
  getCommentsByEpicorFunctionId,
  createEpicorFunctionComments,
  createEpicorFunctionComment,
} from "./database";
import { ensureAuthenticated, validateMiddleware } from "./helpers";
import { shortIdValidation, isCommentValidator } from "./validators";
const router = express.Router();

// Routes

//GET /comments/:epicorFunctionId
router.get(
  "/:epicorFunctionId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("epicorFunctionId")]),
  (req, res) => {
    const { epicorFunctionId } = req.params;
    const comments = getCommentsByEpicorFunctionId(epicorFunctionId);

    res.status(200);
    res.json({ comments });
  }
);

//POST /comments/:epicorFunctionId
router.post(
  "/:epicorFunctionId",
  ensureAuthenticated,
  validateMiddleware([shortIdValidation("epicorFunctionId"), isCommentValidator]),
  (req, res) => {
    const { epicorFunctionId } = req.params;
    const { content } = req.body;

    /* istanbul ignore next */
    createEpicorFunctionComments(req.user?.id!, epicorFunctionId, content);

    res.sendStatus(200);
  }
);

export default router;
