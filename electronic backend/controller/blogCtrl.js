import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import { cloudinaryUploading } from "../utils/cloudinary.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import asyncHandler from "express-async-handler";
import fs from "fs";

const crearBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const saveBlog = await newBlog.save();

    return res.json({
      message: "Blog creado satisfactoriamente",
      status: 201,
      success: true,
      data: saveBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const actualizarBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      message: "el blog se actualizo correctamente",
      status: 200,
      success: true,
      data: updateBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAblog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("disLikes");
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );

    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const obtenerLosBlogs = asyncHandler(async (req, res) => {
  try {
    const allsBlogs = await Blog.find();

    return res.json(allsBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const eliminarBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    await Blog.findByIdAndDelete(id);

    return res.json({
      message: "Se ha eliminado el blog",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const meGustaBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;

    // Encuentra el blog en el que quieres que te gusten.
    const blog = await Blog.findOne({ _id: blogId });

    // encontrar el usuario de inicio de sesión
    const loginUserId = req?.user?._id;
    // Averigua si al usuario le ha gustado el blog.
    const isLiked = blog?.isLiked;

    // Encuentra si al usuario si ya le dio dislike
    const alreadyDisliked = blog?.disLikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    // comprueba si ya le dio dislike
    if (alreadyDisliked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisliked: false,
        },
        {
          new: true,
        }
      );

      return res.json(updatedBlog);
    }

    // comprueba si ya le dio like
    if (isLiked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        }
      );

      return res.json(updatedBlog);
    } else {
      //   no le dio like ni dislike
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $addToSet: { likes: loginUserId }, // Utiliza $addToSet para agregar solo si no está presente
          isLiked: true,
          $pull: { disLikes: loginUserId }, // Elimina de la lista de dislikes
          isDisliked: false,
        },
        {
          new: true,
        }
      );

      return res.json(updatedBlog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const noMeGustaBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;

    // Encuentra el blog en el que quieres que no te guste.
    const blog = await Blog.findOne({ _id: blogId });

    // encontrar el usuario de inicio de sesión
    const loginUserId = req?.user?._id;

    // Averigua si al usuario le ha gustado el blog.
    const isLiked = blog?.isLiked;

    // Encuentra si al usuario ya le dio dislike
    const alreadyDisliked = blog?.disLikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    // Comprueba si ya le dio dislike
    if (alreadyDisliked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisliked: false,
        },
        {
          new: true,
        }
      );

      return res.json(updatedBlog);
    }

    // Comprueba si ya le dio like
    if (isLiked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        }
      );

      return res.json(updatedBlog);
    } else {
      // No le dio like ni dislike, entonces agrega al array de disLikes
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $addToSet: { disLikes: loginUserId }, // Utiliza $addToSet para agregar solo si no está presente
          isDisliked: true,
          $pull: { likes: loginUserId }, // Elimina de la lista de likes
          isLiked: false,
        },
        {
          new: true,
        }
      );

      return res.json(updatedBlog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const subirImagenes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

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

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );

    res.json(findBlog);
  } catch (error) {
    console.error("Error al subir imágenes:", error.message);
    throw new Error(error);
  }
});

export {
  crearBlog,
  actualizarBlog,
  getAblog,
  obtenerLosBlogs,
  eliminarBlog,
  meGustaBlog,
  noMeGustaBlog,
  subirImagenes,
};
