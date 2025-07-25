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

  return router;
};

export { createMainRouter };
