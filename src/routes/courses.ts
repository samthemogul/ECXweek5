import express from 'express';
import { db } from '../database';

const courseRouter = express.Router();

/* Create course */
courseRouter.post('/', async (req, res) => {
  const { name, capacity } = req.body;

  const [result] = await db.query(
    'INSERT INTO courses (name, capacity) VALUES (?, ?)',
    [name, capacity]
  );

  res.json({ id: result });
});

/* Get all courses */
courseRouter.get('/', async (_, res) => {
  const [rows] = await db.query('SELECT * FROM courses');
  res.json(rows);
});

// Get all courses a particular student is enrolled in
courseRouter.get('/student/:studentId', async (req, res) => {
  const { studentId } = req.params;

  const [rows] = await db.query(
    `SELECT c.* FROM courses c
     JOIN enrollments e ON c.id = e.course_id
     WHERE e.student_id = ?`,
    [studentId]
  );

  res.json(rows);
});

// Get the courses along with the students details that are more than half capacity


export default courseRouter;
