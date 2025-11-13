import express from "express";
import {DBConnection} from "../app.js";

const router = express.Router();


router.get('/', async (req, res) => { 
  const connection = await DBConnection();
  try {
    const [results] = await connection.query('SELECT * FROM `courses`');
    res.status(200).json(results); 
  } catch (err) {
    res.send({ error: 'Internal server error' }); 
  } 
});


 router.get('/:id', async(req,res)=>{ 
    const  courseid = req.params.id
   const connection = await DBConnection();
    try {
  const [results] = await connection.query('SELECT * FROM `courses` where `id`= ? ',  [courseid]);
    if(results.length === 0) {
      return res.send({ error: 'Course not found' });
 }
    res.send(results[0]);
} 
  catch (err) {
  console.log(err);
  res.send({ error: 'Internal server error' }); 
}
}) 

router.post("/", async (req, res) => { 
const connection = await DBConnection();
  try {
    const { id, course_name, fees, duration, end_day } = req.body;
    if (!id || !course_name || !fees || !duration || !end_day) {
     return res.send({ 
       error: "All fields are required" 
        });
    }
    const query = `
     INSERT INTO courses (id, course_name, fees, duration, end_day)
     VALUES (?, ?, ?, ?, ?)
   `;
   const [result] = await connection.query(query, [
      id, course_name, fees, duration, end_day,
    ]);
      res.send({ 
       message: "Course added!",
     });   
    } catch (err) {
       res.send({ error:"Internal server error" });
    }
});


router.put("/:id", async (req, res) => {
  const courseid = req.params.id;
  const connection = await DBConnection();
  const { id, course_name, fees, duration, end_day } = req.body;

  try {
    if (!course_name || !fees || !duration || !end_day) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const query = `
      UPDATE courses 
      SET course_name = ?, fees = ?, duration = ?, end_day = ?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
      course_name,
      fees,
      duration,
      end_day,
      id,
    ]);
 
    res.send({ message: "Course updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

  
router.patch("/:id", async (req, res) => {
  const courseid = req.params.id;
  const connection = await DBConnection();
  const { id, course_name, fees, duration, end_day } = req.body;

  try {
    if (!course_name || !fees || !duration || !end_day) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const query = `
      UPDATE courses 
      SET course_name = ?, fees = ?, duration = ?, end_day = ?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
      course_name,
      fees,
      duration,
      end_day,
      id,
    ]);
 
    res.send({ message: "Course updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const courseid = req.params.id;
  try {
    const connection = await DBConnection();
    const [result] = await connection.query(
      "DELETE FROM courses WHERE id = ?",
      [courseid]
    );
    res.send({ message: "Course deleted" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.send({ error: "Internal server error" });
  }
});


export default router;

