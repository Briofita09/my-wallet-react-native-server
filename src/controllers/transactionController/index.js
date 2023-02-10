import "dotenv/config";
import { ObjectId } from "mongodb";
import MongoConnection from "../../server/index.js";

const mongo = new MongoConnection(process.env.DATABASE_URL);

const db = await mongo.start();

export async function getTransactions(_req, res) {
  try {
    const user = res.locals;
    const transactions = await db
      .collection("transactions")
      .find({ user: ObjectId(user) })
      .toArray();

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Erro interno no servidor" });
    console.log(err);
  }
}

export async function newTransaction(req, res) {
  try {
    const user = res.locals;
    const newTransaction = {
      user: ObjectId(user),
      ...req.body,
    };
    await db.collection("transactions").insertOne(newTransaction);
    return res
      .status(201)
      .json({ message: "Transação inserida com sucesso", newTransaction });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ message: "Erro interno no servidor" });
  }
}

export async function getTotal(_req, res) {
  try {
    const user = res.locals;
    const transactions = await db
      .collection("transactions")
      .find({ user: ObjectId(user) })
      .toArray();
    let total = 0;
    transactions.map((transaction) =>
      transaction.type === "credit"
        ? (total += transaction.value)
        : (total -= transaction.value)
    );
    res.status(200).json(total);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const transaction = req.params;
    await db
      .collection("transactions")
      .deleteOne({ _id: ObjectId(transaction._id) });
    res.status(204).json({ message: "transação deletada com sucesso" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}
