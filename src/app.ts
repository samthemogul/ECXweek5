import express, { Request, Response, NextFunction } from "express";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "./database/prisma";

dotenv.config();

const app = express();
app.use(express.json());

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["auth-token"] as string;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    if (verified.exp! * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token has expired" });
    }

    //  Check if the user is in our database
    const user = await  prisma.user.findUnique({
      where: {
        id: (verified as jwt.JwtPayload).sub,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }

    next();

    // Bearer geyThdadnahjdni.uiajishide
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

app.use("/auth", authRouter);
app.use("/posts", verifyToken, postRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the School Management API");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
