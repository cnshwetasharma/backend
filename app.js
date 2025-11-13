import express from 'express'
import mysql from 'mysql2/promise';
import coursesRouter from "./routes/courses.js";
import studentsRouter from "./routes/students.js";
import feesRouter from "./routes/fees.js";
import studentsInfoRouter from "./routes/studentsInfo.js";

const app = express();
app.use(express.json());


export async function DBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", 
    database: "ASSIGNMENT_4",
  });
  console.log("Connect to Mysql Database");
  return connection;
}

export async function DBBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", 
    database: "ASSIGNMENT_4",
  });
  console.log("Connect to Mysql Database");
  return connection;
}

export async function feesData() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", 
    database: "ASSIGNMENT_4",
  });
  console.log("Connect to Mysql Database");
  return connection;
}

export async function studentsInfoDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", 
    database: "ASSIGNMENT_4",
  });
  console.log("Connect to Mysql Database");
  return connection;
}

app.use('/courses', coursesRouter)
app.use('/students', studentsRouter)
app.use('/fees', feesRouter)
app.use('/studentsInfo', studentsInfoRouter)



let Port = 8003;

app.listen(Port, () =>{
    console.log(`Server start ${Port}`);
})
