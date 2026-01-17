import express from 'express';
import { db } from '../database';

const enrolmentRouter = express.Router();

/* Enroll student in course */
enrolmentRouter.post('/', async (req, res) => {
  const { student_id, course_id } = req.body;

  await db.query(
    'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)',
    [student_id, course_id]
  );

  res.json({ success: true });
});

export default enrolmentRouter;
