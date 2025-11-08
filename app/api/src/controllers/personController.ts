// personController.ts
import { Request, Response } from 'express';
import PersonModel, { Person } from '../models/person';

class PersonController {
  
  // Create - เพิ่มข้อมูล Person
  async createPerson(req: Request, res: Response): Promise<Response> {
    try {
      const { name, age, email } = req.body;
      const newPerson = new PersonModel({ name, age, email });
      await newPerson.save();
      return res.status(201).json({ message: 'Person created successfully', person: newPerson });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating person', error });
    }
  }

  // Read - ดูข้อมูลทั้งหมด
  async getAllPeople(req: Request, res: Response): Promise<Response> {
    try {
      const people = await PersonModel.find();
      return res.status(200).json({ people });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching people', error });
    }
  }

  // Read - ดูข้อมูลคนที่มี id เฉพาะ
  async getPersonById(req: Request, res: Response): Promise<Response> {
    try {
      const person = await PersonModel.findById(req.params.id);
      if (!person) {
        return res.status(404).json({ message: 'Person not found' });
      }
      return res.status(200).json({ person });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching person', error });
    }
  }

  // Update - แก้ไขข้อมูล Person
  async updatePerson(req: Request, res: Response): Promise<Response> {
    try {
      const { name, age, email } = req.body;
      const updatedPerson = await PersonModel.findByIdAndUpdate(
        req.params.id,
        { name, age, email },
        { new: true }  // ส่งคืนข้อมูลใหม่หลังจากการอัปเดต
      );

      if (!updatedPerson) {
        return res.status(404).json({ message: 'Person not found' });
      }

      return res.status(200).json({ message: 'Person updated successfully', person: updatedPerson });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating person', error });
    }
  }

  // Delete - ลบข้อมูล Person
  async deletePerson(req: Request, res: Response): Promise<Response> {
    try {
      const deletedPerson = await PersonModel.findByIdAndDelete(req.params.id);
      if (!deletedPerson) {
        return res.status(404).json({ message: 'Person not found' });
      }
      return res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting person', error });
    }
  }
}

export default new PersonController();
