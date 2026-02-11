import express, { Request, Response, NextFunction} from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const router = express.Router();

const validateUser = (req:Request, res:Response, next:NextFunction) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

// Registr route
router.post("/register", validateUser, async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create anew user
  const newUSer = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Create token and add to the header
  const token = jwt.sign(
    { sub: newUSer.id, role: newUSer.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "2h" },
  );

  res.setHeader("Auth-token", token);

  return res.status(201).json(newUSer);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Create token and add to the header
  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "2h" },
  );

  res.setHeader("Auth-token", token);

  return res.status(200).json({ message: "Login successful", user });
});

export default router;
