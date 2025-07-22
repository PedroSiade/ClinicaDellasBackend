import { Router } from 'express';
import {getWorkers} from "../controller/workers";

const createMainRouter = (): Router => {
    const router = Router();

   router.get('/professional', getWorkers)

    return router;
};

export { createMainRouter };