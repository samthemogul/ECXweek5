import express from 'express';
import { prisma } from '../database/prisma';


const router = express.Router();


// Create a new post
router.post('/', async (req, res) => {
    const { content, user_id } = req.body;

    const newPost = await prisma.post.create({
        data: {
            content,
            user_id
        }
    });
    return res.status(201).json(newPost);
})

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const posts = await prisma.post.findMany({
        where: {
            user_id
        }
    });

    return res.status(200).json({
        user_id,
        posts
    })
})

export default router;