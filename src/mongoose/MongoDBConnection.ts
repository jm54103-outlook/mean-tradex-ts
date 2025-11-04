import mongoose from 'mongoose';
//import dotenv from 'dotenv';

//dotenv.config(); // โหลดค่าจากไฟล์ .env ถ้ามี

class MongoDBConnection {
  private dbUri: string;
  private isConnected: boolean;

  constructor(
    private username: string,
    private password: string,
    private dbName: string,
    private host: string = 'localhost',  // ใช้ default เป็น 'localhost'
    private port: number = 27017         // ใช้ default เป็น '27017'
  ) {
    // สร้าง MongoDB URI จากข้อมูลที่รับใน constructor
    this.dbUri = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
    this.isConnected = false;
  }

  // เชื่อมต่อกับ MongoDB
  public async connect(): Promise<void> {
    try {
      if (this.isConnected) {
        console.log('Already connected to the database.');
        return;
      }

      console.log(`Connecting to MongoDB at ${this.dbUri}...`);
      await mongoose.connect(this.dbUri);

      this.isConnected = true;
      console.log('Successfully connected to MongoDB.');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // ปิดโปรแกรมหากไม่สามารถเชื่อมต่อได้
    }
  }

  // ปิดการเชื่อมต่อ
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Disconnected from MongoDB.');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

export default MongoDBConnection;
