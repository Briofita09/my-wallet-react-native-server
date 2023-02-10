import express from "express";
import cors from "cors";
import "dotenv/config";

import { userRouter } from "./routers/userRoutes/index.js";
import { transactionRouter } from "./routers/transactionRoutes/index.js";

const app = express();

app.use(cors()).use(express.json()).use(userRouter).use(transactionRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("servidor rodando na porta", PORT);
});
