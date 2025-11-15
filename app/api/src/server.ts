// src/server.ts
import express, { Application } from "express";
import { UserController } from "./controllers/userController";
import PersonController from "./controllers/personController";
import bodyParser from 'body-parser';
import MongoDBConnection from "./mongoose/MongoDBConnection";
import JsonObjectController from "./controllers/JsonObjectController";
import KeyValueController from "./controllers/KeyValueController";

const app: Application = express();
const port: number = 3000;

let db = new MongoDBConnection("admin","password","tradex");



// Middleware สำหรับ parse JSON
app.use(bodyParser.json());
// Routes
/*--People--*/
app.post('/api/people', PersonController.createPerson);
app.get('/api/people', PersonController.getAllPeople);
app.get('/api/people/:id', PersonController.getPersonById);
app.put('/api/people/:id', PersonController.updatePerson);
app.delete('/api/people/:id', PersonController.deletePerson);
/*--JsonObject--*/
app.get('/api/jsonobject/json', JsonObjectController.generate);
app.post('/api/jsonobject', JsonObjectController.createItem);
app.get('/api/jsonobject', JsonObjectController.getAll);
app.get('/api/jsonobject/:id', JsonObjectController.getItemById);
app.put('/api/jsonobject/:id', JsonObjectController.updateItem);
app.delete('/api/jsonobject/:id', JsonObjectController.deleteItem);
/*--KeyValue--*/
app.get('/api/keyvalue/json', KeyValueController.generate);
app.post('/api/keyvalue', KeyValueController.createItem);
app.get('/api/keyvalue', KeyValueController.getAll);
app.get('/api/keyvalue/:id', KeyValueController.getItemById);
app.put('/api/keyvalue/:id', KeyValueController.updateItem);
app.delete('/api/keyvalue/:id', KeyValueController.deleteItem);
/*--Users--*/
app.get("/api/user", UserController.getUser);

app.listen(port, () => {
 
  db.connect();
  console.log(`Server running on http://localhost:${port}/api/jsonobject/json`);
});
