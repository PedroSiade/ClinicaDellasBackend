import express from "express";
import { PrismaClient } from "@prisma/client";
import { createMainRouter } from "./routes";
import cors from "cors";

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 4530;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
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
