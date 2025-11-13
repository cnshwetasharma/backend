import express from "express";
import {DBBConnection} from "../app.js";

const router = express.Router();

router.get('/', async(req,res)=>{ 
   const connection = await DBBConnection();
   try {
  const [results] = await connection.query('SELECT * FROM `student_details`');
  res.send(results);
} catch (err) {
  console.log(err);
  res.status(500).json({ error: 'Internal server error' }); 
}

})

router.get('/:id', async(req,res)=>{ 
    const studentsid = req.params.id
   const connection = await DBBConnection();
    try {
  const [results] = await connection.query('SELECT * FROM `student_details` where `id`= ? ',  [studentsid]);
  res.send(results);
} 
  catch (err) {
  console.log(err);
  res.status(500).json({ error: 'Internal server error' }); 
}

}) 

router.post("/", async (req, res) => { 
  const connection = await DBBConnection();
  try {
    const { id, parents_name, parents_mobile, student_id} = req.body;
       if (!id || !parents_name || !parents_mobile || !student_id) {
        return res.send({ 
           error: "All fields are required" 
        });
    }
    const query = `
        INSERT INTO student_details (id, parents_name, parents_mobile, student_id)
         VALUES (?, ?, ?, ?)
     `;
    const [result] = await connection.query(query, [
       id, parents_name, parents_mobile, student_id,
        ]);
        res.send({ 
            message: "student added!",
        });   
    } catch (err) {
        res.send({ error:"Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
  const pid = req.params.id;
  const connection = await DBBConnection();
  const { id, parents_name, parents_mobile, student_id} = req.body;

  try {
    if (!parents_name || !parents_mobile || !student_id) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const query = `
      UPDATE  student_details
      SET parents_name=?, parents_mobile=?, student_id=?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
     parents_name, parents_mobile, student_id, id
    ]);
 
    res.send({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const patchid  = req.params.id;
  const connection = await DBBConnection();
 const { id, parents_name, parents_mobile, student_id} = req.body;
  try {
    const query = `
     UPDATE  student_details
      SET parents_name=?, parents_mobile=?, student_id=?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
     parents_name, parents_mobile, student_id, id
    ]);
 
    res.send({ message:"updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.delete("/:id", async (req, res) => {
  const studentsid = req.params.id;
  try {
    const connection = await DBBConnection();
    const [result] = await connection.query(
      "DELETE FROM student_details WHERE id = ?",
      [studentsid]
    );
    res.send({ message: "student deleted" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.send({ error: "Internal server error" });
  }
});
export default router;