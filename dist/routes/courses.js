import express from 'express';
import { db } from '../database';
const courseRouter = express.Router();
/* Create course */
courseRouter.post('/', async (req, res) => {
    const { name, capacity } = req.body;
    const [result] = await db.query('INSERT INTO courses (name, capacity) VALUES (?, ?)', [name, capacity]);
    res.json({ id: result });
});
/* Get all courses */
courseRouter.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM courses');
    res.json(rows);
});
export default courseRouter;
