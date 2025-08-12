import { Router } from "express";
import {
  createTransaction,
  deleteTransactions,
  getAllTransaction,
  getSummary,
} from "../controllers/transaction.controller.js";

const transRouter = Router();

transRouter.post("/transaction", createTransaction);
transRouter.get("/transaction/:userId", getAllTransaction);
transRouter.delete("/transaction/:id", deleteTransactions);
transRouter.get("/getBalance/:userId", getSummary);

export { transRouter };
