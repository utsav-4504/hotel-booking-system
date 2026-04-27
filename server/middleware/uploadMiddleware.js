import multer from "multer";
import { createHttpError } from "../utils/validator.js";

const storage = multer.memoryStorage();
const allowedFileTypes = (
  process.env.ALLOWED_FILE_TYPES || "jpg,jpeg,png,gif"
)
  .split(",")
  .map((type) => type.trim().toLowerCase());

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const extension = file.originalname.split(".").pop()?.toLowerCase();

    if (!extension || !allowedFileTypes.includes(extension)) {
      return cb(
        createHttpError(
          400,
          `Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}`
        )
      );
    }

    return cb(null, true);
  }
});

export default upload;
