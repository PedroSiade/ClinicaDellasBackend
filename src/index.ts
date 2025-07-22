import express from 'express';
import { PrismaClient } from '@prisma/client';
import {createMainRouter} from "./routes";

export const prisma = new PrismaClient();

const app = express();
const port = 4000;

app.use(express.json());


app.use('/', createMainRouter());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});