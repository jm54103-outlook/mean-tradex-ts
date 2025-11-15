// KeyValueController.ts
import { Request, Response } from 'express';
import KeyValueModel, { KeyValue } from '../models/KeyValue';
import { Guid } from 'guid-typescript';

class KeyValueController {
  
  ItemName:String;
  
  constructor(){
    this.ItemName='KeyValue';
  }
 

  // Create - เพิ่มข้อมูล
  async createItem(req: Request, res: Response): Promise<Response> {
     try {         
       const json = req.body;
       const newItem = new KeyValueModel(json);
       await newItem.save();
       return res.status(201).json({ message: `created successfully`, item: newItem });
     } catch (error) {
       return res.status(500).json({ message: `Error creating` , error });
     }
   }
 
   // Read - ดูข้อมูลทั้งหมด
   async getAll(req: Request, res: Response): Promise<Response> {
     try {
       const items = await KeyValueModel.find();
       return res.status(200).json({ items });
     } catch (error) {
       return res.status(500).json({ message: `Error fetching ${this.ItemName}`, error });
     }
   }

   // สร้าง json
   async generate(req: Request, res: Response): Promise<Response> {
      let item : KeyValue = { 
        object_id : Guid.create(),
        id :  Guid.create(),
        key : 'KeyName',
        value : 'KeyValue',
      }
      return res.status(200).json({ item });   
  }
 
   // Read - ดูข้อมูล id เฉพาะ
   async getItemById(req: Request, res: Response): Promise<Response> {
     try {
       const item = await KeyValueModel.findById(req.params.id);
       if (!item) {
         return res.status(404).json({ message: `${this.ItemName} not found` });
       }
       return res.status(200).json({ item });
     } catch (error) {
       return res.status(500).json({ message: `Error fetching ${this.ItemName}`, error });
     }
   }
 
   // Update - แก้ไขข้อมูล
   async updateItem(req: Request, res: Response): Promise<Response> {
     try {
       const json = req.body;
       const updatedItem = await KeyValueModel.findByIdAndUpdate(
         req.params.id,
         json,
         { new: true }  // ส่งคืนข้อมูลใหม่หลังจากการอัปเดต
       );
 
       if (!updatedItem) {
         return res.status(404).json({ message: `${this.ItemName} not found` });
       }
 
       return res.status(200).json({ message: `${this.ItemName} updated successfully`, item: updatedItem });
     } catch (error) {
       return res.status(500).json({ message: `Error updating ${this.ItemName}`, error });
     }
   }
 
   // Delete - ลบข้อมูล
   async deleteItem(req: Request, res: Response): Promise<Response> {
     try {
       const deletedItem = await KeyValueModel.findByIdAndDelete(req.params.id);
       if (!deletedItem) {
         return res.status(404).json({ message: 'JsonObject not found' });
       }
       return res.status(200).json({ message: 'JsonObject deleted successfully' });
     } catch (error) {
       return res.status(500).json({ message: 'Error deleting JsonObject', error });
     }
   }
}

export default new KeyValueController();