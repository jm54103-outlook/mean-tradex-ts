// src/server.ts
import express, { Application } from "express";
import { UserController } from "./controllers/userController";
import PersonController from "./controllers/personController";
import bodyParser from 'body-parser';
import MongoDBConnection from "./mongoose/MongoDBConnection";

const app: Application = express();
const port: number = 3000;

let db = new MongoDBConnection("admin","password","tradex");




// Middleware สำหรับ parse JSON
app.use(bodyParser.json());
// Routes
app.post('/people', PersonController.createPerson);
app.get('/people', PersonController.getAllPeople);
app.get('/people/:id', PersonController.getPersonById);
app.put('/people/:id', PersonController.updatePerson);
app.delete('/people/:id', PersonController.deletePerson);


app.get("/user", UserController.getUser);

app.listen(port, () => {
 
  db.connect();
  console.log(`Server running on http://localhost:${port}`);
});
