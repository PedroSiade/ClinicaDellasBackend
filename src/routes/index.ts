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
import { login, verifyToken, logout, getProfile } from "../controller/auth";
import { authenticateToken } from "../middleware/auth";

const createMainRouter = (): Router => {
  const router = Router();

  // Authentication routes (public)
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
  router.get("/auth/verify", authenticateToken, verifyToken);
  router.get("/auth/profile", authenticateToken, getProfile);

  // Public routes (no authentication required)
  router.get("/", getHomeData);
  // Worker/Professional routes
  router.get("/professionais", getManyWorker);
  router.get("/professional", getManyWorkerPage);
  router.get("/professional/:id", getOneWorker);
  // Protected routes - require authentication
  router.delete("/professional/:id", authenticateToken, deleteOneWorker);
  router.post("/professional", authenticateToken, uploadPhoto, createWorker);
  router.put("/professional/:id", authenticateToken, uploadPhoto, updateWorker);

  // Post routes
  router.get("/post", getManyPost);
  router.get("/post/:id", getOnePost);
  // Protected routes - require authentication
  router.delete("/post/:id", authenticateToken, deleteOnePost);
  router.post("/post", authenticateToken, uploadPhoto, createPost);
  router.put("/post/:id", authenticateToken, uploadPhoto, updatePost);

  // Service routes
  router.get("/service", getManyService);
  router.get("/service/:id", getOneService);
  // Protected routes - require authentication
  router.delete("/service/:id", authenticateToken, deleteOneService);
  router.post("/service", authenticateToken, uploadServiceImages, createService);
  router.put("/service/:id", authenticateToken, uploadServiceImages, updateService);

  // Banner routes
  router.get("/banner/:id", getOneBanner);
  // Protected routes - require authentication
  router.delete("/banner/:id", authenticateToken, deleteOneBanner);
  router.post("/banner", authenticateToken, uploadPhoto, createBanner);
  router.put("/banner/:id", authenticateToken, uploadPhoto, updateBanner);

  return router;
};

export { createMainRouter };
