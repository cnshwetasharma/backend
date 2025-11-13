import express, { Router } from 'express'
import {feesData} from "../app.js";

const router = express.Router();

router.get("/", async(req,res) => {
    const connection =  await feesData ();
    try{
    const [result] = await connection.query('select * from `fees_installments`');
    res.send(result);
    }catch(err){
       console.log(err); 
      console.log(err);
      res.status(500).json({ error: 'Internal server error' }); 
    }
})

router.get("/:id", async(req, res) => {
  const feesid = req.params.id
  const connection = await feesData();
  try{
    const [results]=await connection.query('select * from `fees_installments` where `id`= ?',[feesid]);
    res.send(results);
  }catch(err){
    console.log(err);
  res.send({ error: 'Internal server error' }); 
  }
})

router.post("/", async(req, res) => {
  const connection = await feesData(); 
  try{
    const {id, amount, installment_no, pay_date, student_id, course_id} = req.body;
    if(!id || !amount || !installment_no|| !pay_date || !student_id|| !course_id){
     return res.send({ 
           error: "All fields are required" 
    });
  }
  const query = `INSERT INTO fees_installments (id, amount, installment_no, pay_date, student_id, course_id) 
  VALUES(?, ?, ?, ?, ?, ?)`;
  const [result] = await connection.query(query, [
      id, amount, installment_no, pay_date, student_id, course_id,
        ]);
        res.send({ 
            message: " added!",
        });   
    } catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
  const feesid = req.params.id;
  const connection = await feesData();
  const { id, amount, installment_no, pay_date, student_id, course_id } = req.body;

  try {
    if (!amount || !installment_no || !pay_date || !student_id || ! course_id) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const query = `
      UPDATE  fees_installments 
      SET amount=?, installment_no=?, pay_date=?, student_id=?, course_id=?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
     amount, installment_no, pay_date, student_id, course_id,id
    ]);
 
    res.send({ message: "fees updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const feesid  = req.params.id;
  const connection = await feesData();
  const { amount, installment_no, pay_date, student_id, course_id } = req.body;

  try {
    const query = `
      UPDATE fees_installments 
      SET amount = ?, installment_no = ?, pay_date = ?, student_id = ?, course_id = ?
      WHERE id = ?
    `;

    const [result] = await connection.query(query, [
      amount, installment_no, pay_date, student_id, course_id, feesid
    ]);
 
    res.send({ message:"updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const feesid = req.params.id;
  try {
    const connection = await feesData();
    const [result] = await connection.query(
      "DELETE FROM fees_installments WHERE id = ?",
      [feesid]
    );
    res.send( "deleted");
  } catch (err) {
    console.error("Error", err);
    res.send({ error: "Internal server error" });
  }
});

export default router ;