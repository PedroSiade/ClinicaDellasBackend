import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"));
  }
};

export const uploadPhoto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("photo");

export const uploadServiceImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).fields([
  { name: "icon", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);
