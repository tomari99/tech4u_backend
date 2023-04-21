import multer from "multer";
export const configureUpload = (destination) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + " " + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Your image is not a valid image type. Try jpeg/jpg/png/etc..."
        ),
        false
      );
    }
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
  });

  return upload;
};
