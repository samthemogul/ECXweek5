import express from 'express';
import { db } from '../database';

const studentRouter = express.Router();

/* Create student */
studentRouter.post('/', async (req, res) => {
  const { name, age, is_jamb_entry } = req.body;

  const [result] = await db.query(
    'INSERT INTO students (name, age, is_jamb_entry) VALUES (?, ?, ?)',
    [name, age, is_jamb_entry]
  );

  res.json({ id: result});
});

/* Get all students */
studentRouter.get('/', async (_, res) => {
  const [rows] = await db.query('SELECT * FROM students');
  res.json(rows);
});

// Get all student taking a particular course
studentRouter.get('/course/:courseId', async (req, res) => {
  const { courseId } = req.params;

  const [rows] = await db.query(
    `SELECT s.* FROM students s
     JOIN enrollments e ON s.id = e.student_id
     WHERE e.course_id = ?`,
    [courseId]
  );

  res.json(rows);
});

export default studentRouter;
