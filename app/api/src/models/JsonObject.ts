import mongoose, { Schema, Document } from 'mongoose';
import { Guid } from 'guid-typescript';

export interface JsonObject {  
  object_id: Guid;
  name: string;
  children?: JsonObject[];
}

// สร้าง Schema ของ JsonObject
const JsonObjectSchema = new Schema<JsonObject>({
  object_id: { type: String, required: true },
  name: { type: String, required: true },
  children:[] 
});

// สร้าง Model จาก Schema
const JsonObjectModel = mongoose.model<JsonObject>('JsonObject', JsonObjectSchema);

export default JsonObjectModel;