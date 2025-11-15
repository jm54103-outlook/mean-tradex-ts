// JsonObjectController.ts
import { Request, Response } from 'express';
import JsonObjectModel, { JsonObject } from '../models/JsonObject';
import { Guid } from 'guid-typescript';


class JsonObjectController {   

  static ObjectName="JsonObject";
 
  // Create - เพิ่มข้อมูล
  async createItem(req: Request, res: Response): Promise<Response> {
    
     try {         
       const json = req.body;
       const newItem = new JsonObjectModel(json);       
       await newItem.save();       
       return res.status(201).json({ message: `${JsonObjectController.ObjectName} created successfully.`, item: newItem });
     } catch (error) {
       return res.status(500).json({ message: `${JsonObjectController.ObjectName} Error creating` , error });
     }
   }
 
   // Read - ดูข้อมูลทั้งหมด
   async getAll(req: Request, res: Response): Promise<Response> {
     try {
       const items = await JsonObjectModel.find();
       return res.status(200).json({ items });
     } catch (error) {
       return res.status(500).json({ message: `Error fetching`, error });
     }
   }

   // สร้าง json
   async generate(req: Request, res: Response): Promise<Response> {
      let item : JsonObject = { 
       object_id : Guid.create(),
       name : "Object Name",
       children : null
      }
      return res.status(200).json({ item });   
  }
 
   // Read - ดูข้อมูล id เฉพาะ
   async getItemById(req: Request, res: Response): Promise<Response> {
     try {
       const item = await JsonObjectModel.findById(req.params.id);
       if (!item) {
         return res.status(404).json({ message: `not found` });
       }
       return res.status(200).json({ item });
     } catch (error) {
       return res.status(500).json({ message: `Error fetching `, error });
     }
   }
 
   // Update - แก้ไขข้อมูล
   async updateItem(req: Request, res: Response): Promise<Response> {
     try {
       const json = req.body;
       const updatedItem = await JsonObjectModel.findByIdAndUpdate(
         req.params.id,
         json,
         { new: true }  // ส่งคืนข้อมูลใหม่หลังจากการอัปเดต
       );
 
       if (!updatedItem) {
         return res.status(404).json({ message: `not found` });
       }
 
       return res.status(200).json({ message: `updated successfully`, item: updatedItem });
     } catch (error) {
       return res.status(500).json({ message: `Error updating`, error });
     }
   }
 
   // Delete - ลบข้อมูล
   async deleteItem(req: Request, res: Response): Promise<Response> {
     try {
       const deletedItem = await JsonObjectModel.findByIdAndDelete(req.params.id);
       if (!deletedItem) {
         return res.status(404).json({ message: 'JsonObject not found' });
       }
       return res.status(200).json({ message: 'JsonObject deleted successfully' });
     } catch (error) {
       return res.status(500).json({ message: 'Error deleting JsonObject', error });
     }
   }
}
   
export default new JsonObjectController();