import express from 'express';
import studentRouter from './routes/students';
import courseRouter from './routes/courses';
import enrolmentRouter from './routes/enrollments';

const app = express();
app.use(express.json());

app.use('/students', studentRouter);
app.use('/courses', courseRouter);
app.use('/enrollments', enrolmentRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the School Management API');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
