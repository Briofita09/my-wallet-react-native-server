import { MongoClient } from "mongodb";
import "dotenv/config";

export default class MongoConnection {
  url;
  constructor(url) {
    this.url = url;
  }
  async start() {
    const mongoClient = new MongoClient(this.url);
    let db;
    try {
      await mongoClient.connect();
      console.log("conectado ao banco");
      db = mongoClient.db();
      return db;
    } catch (err) {
      console.log(err);
    }
  }
}
