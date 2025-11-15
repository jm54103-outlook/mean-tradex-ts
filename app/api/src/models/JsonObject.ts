import mongoose, { Schema, Document } from 'mongoose';
import { Guid } from 'guid-typescript';

export interface JsonObject {  
  object_id: Guid;
  name: string;
  children?: JsonObject[];
}

// สร้าง Schema ของ JsonObject
const JsonObjectSchema = new Schema<JsonObject>({
  object_id: { type: Object, required: true },
  name: { type: String, required: true },
  children:[] 
});

// กำหนด Index แบบ Unique
JsonObjectSchema.index({object_id:1, name:1}, {unique:true});

// สร้าง Model จาก Schema
const JsonObjectModel = mongoose.model<JsonObject>('JsonObject', JsonObjectSchema);

export default JsonObjectModel;