import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import User from "../models/userModel.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";

// Crear un producto nuevo
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();

    return res.status(201).json({
      message: "Producto creado correctamente",
      status: 201,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Buscar solo un producto
const buscarProducto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const findProduct = await Product.findById(id).populate("color");

    return res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Buscar todos los productos
const buscarTodosProductos = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };

    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // FILTRAR POR PRECIO
    // $gte el valor del campo tiene que ser mayor o igual ejemplo : campo <= 1000
    // $lt el valor del campo tiene que ser menor ejemplo campo > 1000
    // $lte el valor del campo tiene que ser menor o igual ejemplo campo >= 1000
    // $gt el valor del campo tiene que ser mayor ejemplo campo < 1000
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    //ORDENACION
    // Ejemplo /api/product/todos-productos?sort=category,-brand (ordenar por categoria y marca)
    // Ejemplo /api/product/todos-productos?sort=category
    // Ejemplo /api/product/todos-productos?sort=price
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");

      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // LIMITAR LOS CAMPOS
    // ejemplo /api/product/todos-productos?fields=title,price,color (limita varios campos)
    // ejemplo /api/product/todos-productos?fields=title (que solo aparezca title)
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-___v");
    }

    //PAGINACION
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const countProduct = await Product.countDocuments();
      if (skip >= countProduct) {
        throw new Error("Esta pagina no existe");
      }
    }

    const product = await query;

    return res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

// Actualizar un producto
const actualizarProducto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      message: "Producto actualizado",
      status: 200,
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Eliminar un producto
const eliminarProducto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deleteProduct = await Product.findOneAndDelete({ _id: id });

    return res.json({
      message: "producto eliminado",
      status: 200,
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Agregar a la lista de deseos
const addToWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  const { prodId } = req.body;

  try {
    const user = await User.findById(id);

    const alreadyAdded = user.wishList.find((id) => id.toString() === prodId);

    if (alreadyAdded) {
      // Si el producto ya está en la lista, se elimina.
      let user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishList: prodId },
        },
        {
          new: true,
        }
      );

      res.json(user);
    } else {
      // Si el producto no está en la lista, se agrega.
      let user = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishList: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Colocar una estrella a un producto
const rating = asyncHandler(async (req, res) => {
  const { id } = req.user; //id del usuario que realiza la calificacion
  validateMongoDbId(id);
  const { star, prodId, comment } = req.body;
  // start: la clasificacion que el usuario le da al producto
  // prodId: id del producto que esta siendo calificado

  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === id.toString()
    );

    // comprueba si el usuario ya califico el producto
    if (alreadyRated) {
      // Si el producto ya está en la lista, se elimina.
      const updateRating = await Product.updateOne(
        {
          // utiliza selemMatch para encontrar la clasificacion del usuario y actualiza
          // la estrella si ya existe
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      // Si no existe agrego la clasificacion
      const ratedProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: { ratings: { star: star, comment: comment, postedBy: id } },
        },
        {
          new: true,
        }
      );
    }

    // Calcula el nuevo rating promedio del producto
    const getallratings = await Product.findById(prodId);
    let totalrating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualrating = Math.round(ratingsum / totalrating);

    // Actualiza el rating total del producto
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualrating,
      },
      {
        new: true,
      }
    );

    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createProduct,
  buscarProducto,
  buscarTodosProductos,
  actualizarProducto,
  eliminarProducto,
  addToWishList,
  rating,
};
