import mongoose, { Schema, Document } from 'mongoose';
import { Guid } from 'guid-typescript';

export interface KeyNode { 
  data: KeyValue;
  info: KeyValueInfomation;
  validator: KeyValueValidator;
}

export interface KeyValue {   
  object_id: Guid;
  id: Guid; 
  key: string;
  value: string;  
}

export interface KeyValueInfomation
{ 
  caption : string;
  description : string;
}

export interface KeyValueValidator 
{
    required : boolean;  
    type: string;
    min : number;
    max : number;
    format : string;
    length : number;
    minLength : number;
    maxLength : number;
    hint : string;
}

// สร้าง Schema ของ KeyValue
const KeyValueSchema = new Schema<KeyValue>({
  object_id: { type: Object, required: true , unique: true },
  id: { type: Object, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

// สร้าง Model จาก Schema
const KeyValueModel = mongoose.model<KeyValue>('KeyValue', KeyValueSchema);

export default KeyValueModel;