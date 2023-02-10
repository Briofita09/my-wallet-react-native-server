import { Router } from "express";
import {
  validateSchemaMiddleware,
  isAuhtenticatedMiddleware,
} from "../../middlewares/index.js";
import * as transactionController from "../../controllers/transactionController/index.js";

import { TransactionSchema } from "../../schemas/transactionSchema/index.js";

const transactionRouter = Router();

transactionRouter.get(
  "/transactions",
  isAuhtenticatedMiddleware,
  transactionController.getTransactions
);

transactionRouter.get(
  "/total",
  isAuhtenticatedMiddleware,
  transactionController.getTotal
);

transactionRouter.post(
  "/transactions",
  isAuhtenticatedMiddleware,
  validateSchemaMiddleware(TransactionSchema),
  transactionController.newTransaction
);

transactionRouter.delete(
  "/transactions/:_id",
  isAuhtenticatedMiddleware,
  transactionController.deleteTransaction
);

export { transactionRouter };
