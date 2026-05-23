import multer from "multer";

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, "uploads/");
  },

  filename: (
    req,
    file,
    cb
  ) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const fileFilter = (
  req: any,
  file: any,
  cb: any
) => {
  const allowed =
    file.mimetype ===
      "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg";

  if (allowed) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;