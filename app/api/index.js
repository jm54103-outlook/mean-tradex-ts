
import { Person } from './models/Person';

// index.js
const express = require('express');
const app = express();
const port = 3000; // ตั้งค่า port เป็น 3000


const person1 = new Person('John Doe', 30);

// สร้าง route ตัวอย่าง
app.get('/', (req, res) => {
  
  res.send(person1.greet());
});

// เริ่มเซิร์ฟเวอร์ที่ port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
