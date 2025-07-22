import {Router} from 'express';
import {createWorker, deleteOneWorker, getManyWorker, getOneWorker, updateWorker} from "../controller/workers";

const createMainRouter = (): Router => {
    const router = Router();

    router.get('/professional', getManyWorker)
    router.get('/professional/:id', getOneWorker)
    router.delete('/professional/:id', deleteOneWorker)
    router.post('/professional', createWorker)
    router.put('/professional/:id', updateWorker)

    return router;
};

export { createMainRouter };