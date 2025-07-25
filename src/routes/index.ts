import { Router } from "express";
import {
  createWorker,
  deleteOneWorker,
  getManyWorker,
  getOneWorker,
  updateWorker,
} from "../controller/worker";
import {
  createPost,
  deleteOnePost,
  getManyPost,
  getOnePost,
  updatePost,
} from "../controller/post";
import {
  getManyService,
  createService,  
} from "../controller/service";

const createMainRouter = (): Router => {
  const router = Router();

  router.get("/professional", getManyWorker);
  router.get("/professional/:id", getOneWorker);
  router.delete("/professional/:id", deleteOneWorker);
  router.post("/professional", createWorker);
  router.put("/professional/:id", updateWorker);

  router.get("/post", getManyPost);
  router.get("/post/:id", getOnePost);
  router.delete("/post/:id", deleteOnePost);
  router.post("/post", createPost);
  router.put("/post/:id", updatePost);

  router.get("/service", getManyService);
  router.post("/service", createService);



  return router;
};

export { createMainRouter };
