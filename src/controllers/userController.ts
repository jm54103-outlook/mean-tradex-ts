// src/controllers/userController.ts
import { Request, Response } from "express";
import { User } from "../models/user";

export class UserController {
  static getUser(req: Request, res: Response) {
    const user = new User(1, "John Doe", "john@example.com");
    res.json(user);
  }
}
