import express from 'express';
import { db } from '../database';
const studentRouter = express.Router();
/* Create student */
studentRouter.post('/', async (req, res) => {
    const { name, age, is_jamb_entry } = req.body;
    const [result] = await db.query('INSERT INTO students (name, age, is_jamb_entry) VALUES (?, ?, ?)', [name, age, is_jamb_entry]);
    res.json({ id: result });
});
/* Get all students */
studentRouter.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM students');
    res.json(rows);
});
export default studentRouter;
