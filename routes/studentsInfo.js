import express from "express";
import{ studentsInfoDB } from "../app.js";

const router = express.Router();

router.get("/", async(req, res) => {
    const connection = await studentsInfoDB();
    try{
        const [results] = await connection.query('select * from `students`');
        res.send(results);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); 
    }
})

router.get('/:id', async(req,res)=>{ 
    const studentid = req.params.id
   const connection = await studentsInfoDB();
    try {
  const [results] = await connection.query('SELECT * FROM `students` where `id`= ? ',  [studentid]);
  res.send(results);
} 
  catch (err) {
  console.log(err);
  res.status(500).json({ error: 'Internal server error' }); 
}
}) 


router.post("/", async (req, res) => { 
  const connection = await studentsInfoDB();
  try {
    const { id, full_name, age, phone,created_at} = req.body;
       if (!id || !full_name || !age || !phone || !created_at ) {
        return res.send({ 
           error: "All fields are required" 
        });
    }
    const query = `
        INSERT INTO students (id, full_name, age, phone,created_at)
         VALUES (?, ?, ?, ?, ?)
     `;
    const [result] = await connection.query(query, [
      id, full_name, age, phone,created_at
        ]);
        res.send({ 
            message: "student added!",
        });   
    } catch (err) {
        res.send({ error:"Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
  const studentid = req.params.id;
  const connection = await studentsInfoDB();
  const { id, full_name, age, phone,created_at} = req.body;

  try {
     if (!full_name || !age || !phone || !created_at ) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const query = `
      UPDATE  students
      SET full_name=?, age=?, phone=?, created_at=?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
      full_name, age, phone,created_at, id
    ]);
 
    res.send({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const studentid = req.params.id;
  const connection = await studentsInfoDB();
  const { id, full_name, age, phone,created_at} = req.body;

  try {
     if (!full_name || !age || !phone || !created_at ) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const query = `
      UPDATE  students
      SET full_name=?, age=?, phone=?, created_at=?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
      full_name, age, phone,created_at, id
    ]);
 
    res.send({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.delete("/:id", async (req, res) => {
  const studentid = req.params.id;
  try {
    const connection = await studentsInfoDB();
    const [result] = await connection.query(
      "DELETE FROM students WHERE id = ?",
      [studentid]
    );
    res.send({ message: "student deleted" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.send({ error: "Internal server error" });
  }
});


export default router; 

