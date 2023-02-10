import bcrypt, { genSaltSync } from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

import MongoConnection from "../../server/index.js";

const mongo = new MongoConnection(process.env.DATABASE_URL);

const db = await mongo.start();
const numberOfSalts = 10;

export async function createUser(req, res) {
  try {
    const user = req.body;
    const registredUser = await db
      .collection("users")
      .find({ email: user.email })
      .toArray();
    if (registredUser.length !== 0) {
      return res.status(409).json({ message: "usuário já cadastrado" });
    }

    const salt = genSaltSync(numberOfSalts);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const newUser = {
      user: user.name,
      email: user.email,
      password: hashedPassword,
    };
    const newRegistredUser = await db.collection("users").insertOne(newUser);
    if (newRegistredUser)
      return res
        .status(201)
        .json({ message: "usuário cadastrado com sucesso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function loginUser(req, res) {
  try {
    const user = req.body;
    const userExist = await db
      .collection("users")
      .findOne({ email: user.email });
    if (!userExist)
      return res.status(401).json({ message: "usuário ou senha inválidos" });
    const correctPassword = bcrypt.compareSync(
      user.password,
      userExist.password
    );
    if (correctPassword === false)
      return res.status(401).json({ message: "usuário ou senha inválidos" });

    const expiresIn = process.env.EXPIRES_IN;
    const secretToken = process.env.SECRET_TOKEN;
    const token = jwt.sign({ user: userExist._id }, secretToken, { expiresIn });
    return res.status(200).json({
      message: "usuário logado com sucesso",
      name: userExist.user,
      email: userExist.email,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
