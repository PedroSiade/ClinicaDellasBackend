import express from "express";
import { PrismaClient } from "@prisma/client";
import { createMainRouter } from "./routes";
import cors from "cors";

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 4530;

app.use(express.json());

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/", createMainRouter());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
