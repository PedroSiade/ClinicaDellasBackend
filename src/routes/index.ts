import { Router } from "express";
import {
  createWorker,
  deleteOneWorker,
  getManyWorker,
  getManyWorkerPage,
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
  createService,
  deleteOneService,
  getManyService,
  getOneService,
  updateService,
} from "../controller/service";
import { getHomeData } from "../controller/home";
import { uploadPhoto, uploadServiceImages } from "../middleware/upload";
import {
  createBanner,
  deleteOneBanner,
  getOneBanner,
  updateBanner,
} from "../controller/banner";

const createMainRouter = (): Router => {
  const router = Router();

  router.get("/", getHomeData);
  router.get("/professionais", getManyWorker);
  router.get("/professional", getManyWorkerPage);
  router.get("/professional/:id", getOneWorker);
  router.delete("/professional/:id", deleteOneWorker);
  router.post("/professional", uploadPhoto, createWorker);
  router.put("/professional/:id", uploadPhoto, updateWorker);

  router.get("/post", getManyPost);
  router.get("/post/:id", getOnePost);
  router.delete("/post/:id", deleteOnePost);
  router.post("/post", uploadPhoto, createPost);
  router.put("/post/:id", uploadPhoto, updatePost);

  router.get("/service", getManyService);
  router.get("/service/:id", getOneService);
  router.delete("/service/:id", deleteOneService);
  router.post("/service", uploadServiceImages, createService);
  router.put("/service/:id", uploadServiceImages, updateService);

  router.get("/banner/:id", getOneBanner);
  router.delete("/banner/:id", deleteOneBanner);
  router.post("/banner", uploadPhoto, createBanner);
  router.put("/banner/:id", uploadPhoto, updateBanner);

  return router;
};

export { createMainRouter };
