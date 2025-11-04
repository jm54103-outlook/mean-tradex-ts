// src/server.ts
import express, { Application } from "express";
import { UserController } from "./controllers/userController";
import MongoDBConnection from "./mongoose/MongoDBConnection";

const app: Application = express();
const port: number = 3000;
let db = new MongoDBConnection("admin","password","db");

app.get("/user", UserController.getUser);

app.listen(port, () => {
 
  db.connect();
  console.log(`Server running on http://localhost:${port}`);
});
