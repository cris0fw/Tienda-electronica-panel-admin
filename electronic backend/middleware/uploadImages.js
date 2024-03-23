import multer from "multer";
import sharp from "sharp";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb({
      message: "Formato de imagen incorrecta/incopatible",
    });
  }
};

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const { path, filename } = file;
      const fileExtension = filename.split(".").pop().toLowerCase();

      //verficar si la extension es JPEG o PNG
      if (["jpeg", "jpg", "png"].includes(fileExtension)) {
        await sharp(path)
          .resize(300, 300)
          .toFormat(fileExtension === "png" ? "png" : "jpeg")
          .jpeg({ quality: 90 })
          .png({ quality: 90 })
          .toFile(`public/images/products/${filename}`);
        fs.unlinkSync(`public/images/products/${filename}`);
      } else {
        //Manejar otros tipos que sean necesarios
        throw new Error(`formato de archivo no admitido ${fileExtension}`);
      }
    })
  );

  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const { path, filename } = file;
      const fileExtension = filename.split(".").pop().toLowerCase();

      //verficar si la extension es JPEG o PNG
      if (["jpeg", "jpg", "png"].includes(fileExtension)) {
        await sharp(path)
          .resize(300, 300)
          .toFormat(fileExtension === "png" ? "png" : "jpeg")
          .jpeg({ quality: 90 })
          .png({ quality: 90 })
          .toFile(`public/images/blogs/${filename}`);
      } else {
        //Manejar otros tipos que sean necesarios
        throw new Error(`formato de archivo no admitido ${fileExtension}`);
      }
    })
  );

  next();
};

const uploads = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

export { uploads, productImgResize, blogImgResize };
