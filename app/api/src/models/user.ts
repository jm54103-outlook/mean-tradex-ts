// src/models/user.ts
export class User {
    constructor(
      public id: number,
      public name: string,
      public email: string
    ) {}
  
    greet() {
      return `Hello, my name is ${this.name}`;
    }
  }
  