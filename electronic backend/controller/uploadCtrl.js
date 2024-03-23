import {
  cloudinaryUploading,
  cloudinaryDeleting,
} from "../utils/cloudinary.js";
import fs from "fs";
import asyncHandler from "express-async-handler";

// Subir imagen a un producto
const subirImagenes = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploading(path);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    console.error("Error al subir imágenes:", error.message);
    throw new Error(error);
  }
});

// Eliminar imagenes de producto
const eliminarImagenes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = cloudinaryDeleting(id, "images");
    return res.json({
      message: "imagen eliminada",
    });
  } catch (error) {
    console.error("Error al subir imágenes:", error.message);
    throw new Error(error);
  }
});

export { subirImagenes, eliminarImagenes };
