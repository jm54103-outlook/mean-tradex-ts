"use strict";
// src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./models/Person");
const person1 = new Person_1.Person('John Doe', 30);
person1.greet();
const person2 = new Person_1.Person('Jane Smith', 25);
person2.greet();
