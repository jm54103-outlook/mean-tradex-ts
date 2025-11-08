// person.ts
import mongoose, { Schema, Document } from 'mongoose';

// กำหนด interface สำหรับ Person
export interface Person extends Document {
  name: string;
  age: number;
  email: string;
}

// สร้าง Schema ของ Person
const personSchema = new Schema<Person>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

// สร้าง Model จาก Schema
const PersonModel = mongoose.model<Person>('Person', personSchema);

export default PersonModel;
