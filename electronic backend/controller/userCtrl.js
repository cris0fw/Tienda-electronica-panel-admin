import generateToken from "../config/jwtToken.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import generateRefreshToken from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
import enviarEmail from "./emailCtrl.js";
import crypto from "crypto";

// Registramos un usuario
const registerUser = asyncHandler(async (req, res) => {
  const { nombre, apellido, email, mobile, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    // SI EL EMAIL YA ESTA CREADO
    if (findUser) {
      return res.json({
        message: "El email ya esta creado intente con otro",
        success: false,
      });
    }

    // CREACION DEL USUARIO
    const newUser = new User({ nombre, apellido, email, mobile, password });
    const saveUser = await newUser.save();

    return res.json({
      message: "Usuario creado satisfactoriamente",
      success: true,
      data: saveUser,
    });
  } catch (error) {
    console.log("Ha habido un error de base de datos" + error);
  }
});

// Logueamos un usuario
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    if (!findUser) {
      return res.json({
        message: "Ese email no existe, por favor registrese primero",
        success: false,
      });
    }

    const comparePassword = await findUser.isPasswordMatched(password);

    if (!comparePassword) {
      return res.json({
        message: "Credenciales invalidas",
        success: false,
      });
    }

    return res.json({
      data: {
        _id: findUser?._id,
        nombre: findUser?.nombre,
        apellido: findUser?.apellido,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      },
    });
  } catch (error) {
    console.log("ha habido un error" + error);
  }
});

// Logueamos al administrador
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const findAdmin = await User.findOne({ email });

    if (findAdmin.role !== "admin") {
      return res.json({
        message: "No estas autorizado user",
        status: 400,
        status: false,
      });
    }

    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin?._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    if (!findAdmin) {
      return res.json({
        message: "Ese email no existe, por favor registrese primero",
        success: false,
      });
    }

    const comparePassword = await findAdmin.isPasswordMatched(password);

    if (!comparePassword) {
      return res.json({
        message: "Credenciales invalidas",
        success: false,
      });
    }

    return res.json({
      message: "Bienvenido al home",
      success: true,
      data: {
        _id: findAdmin?._id,
        nombre: findAdmin?.nombre,
        apellido: findAdmin?.apellido,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      },
    });
  } catch (error) {
    console.log("ha habido un error" + error);
  }
});

const handlerRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No hay refresh token en cookies");
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user)
    throw new Error(
      "No hay token de actualización presente en la base de datos o no coincide"
    );

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("hay algún problema con el token de actualización");
    }

    const accessToken = generateToken(user?.id);
    res.json({ accessToken });
  });
});

// Cerramos session
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No hay refresh token en cookies");
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return res.sendStatus(204);
  }

  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: "",
    }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.sendStatus(204);
});

// Obtenemos todos los usuarios
const obtenerTodosUsuarios = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();

    return res.json(allUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Obtenemos solo un usuario
const obtenerUnUsuario = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const getUser = await User.findById(id);

    return res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Actualizo direccion del usuario
const saveAddress = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );

    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Elimino un usuario
const eliminarUsuario = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    await User.findByIdAndDelete(id);

    return res.json({
      message: "Usuario eliminado satisfactoriamente",
      status: 200,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Actualizo un usuario
const actualizarUsuario = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        nombre: req?.body?.nombre,
        apellido: req?.body?.apellido,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "Datos actualizados correctamente",
      status: 200,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Bloqueo un usuario
const usuarioBloqueado = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const userBlocked = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "El usuario ha sido bloqueado",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Desbloqueo un usuario
const usuarioDesbloqueado = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const userDesblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "El usuario ha sido desbloqueado",
    });
  } catch (error) {
    console.log(error);
  }
});

// Cambio mi contraseña de usuario
const cambiarContraseña = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const password = req.body.password;

    validateMongoDbId(id);

    const user = await User.findById(id);
    if (password) {
      user.password = password;
      const updatePassword = await user.save();

      res.json({
        message: "Se ha cambiado la contraseña",
        data: updatePassword,
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Cambio mi contraseña en el forget password
const olvidarContraseña = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("usuario no encontrado con este correo electrónico");
  }

  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `hi, please follow this link to reset your password. This link is valid till 10 minutes from now <a href='http://localhost:5173/reset-password/${token}'>click here</a>`;

    const data = {
      to: email,
      text: "hola querido usuario!",
      subject: "olvide mi contraseña link",
      html: resetURL,
    };

    enviarEmail(data);

    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

// Cambio la contraseña luego de la redireccion
const resetearContraseña = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token expirado, por favor intentelo mas tarde");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

// Agregar producto a lista de deseos
const getWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;

  try {
    const findUser = await User.findById(id).populate("wishList");

    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Agregar productos al carrito
const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    // Creación y Guardado del Nuevo Carrito:
    const newCart = new Cart({
      userId: id,
      productId,
      color,
      price,
      quantity,
    });

    const saveCart = await newCart.save();

    return res.json(saveCart);
  } catch (error) {
    throw new Error(error);
  }
});

// Obtener todos mis productos del carrito
const getUserCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    // Búsqueda del Carrito del Usuario:
    const cart = await Cart.find({ userId: id })
      .populate("productId")
      .populate("color");

    return res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// Eliminar productos de mi carrito
const removeProductFromCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(id);

  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

// Actualizar cantidad del carrito
const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(id);

  try {
    const cartitem = await Cart.findOne({
      userId: id,
      _id: cartItemId,
    });
    cartitem.quantity = newQuantity;
    cartitem.save();

    res.json(cartitem);
  } catch (error) {
    throw new Error(error);
  }
});

// Vaciar carrito
const empytCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const deleteCart = await Cart.deleteMany({ userId: id });

    return res.json(deleteCart);
  } catch (error) {
    throw Error(error);
  }
});

// const createOrder = asyncHandler(async (req, res) => {
//   const {
//     shippingInfo,
//     orderItems,
//     totalPrice,
//     totalPriceAfterDiscount,
//     paymentInfo,
//   } = req.body;
//   const { id } = req.user;

//   try {
//     const order = await Order.create({
//       shippingInfo,
//       orderItems,
//       totalPrice,
//       totalPriceAfterDiscount,
//       paymentInfo,
//       user: id,
//     });

//     res.json({ order, success: true });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const aplicarCupon = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { id } = req.user;
//   validateMongoDbId(id);

//   const validCoupon = await Coupon.findOne({ name: coupon });

//   if (validCoupon === null) {
//     return res.json({
//       message: "Cupon invalido",
//     });
//   }

//   const user = await User.findOne({ _id: id });

//   let { products, cartTotal } = await Cart.findOne({
//     orderBy: user._id,
//   }).populate("products.product");

//   let totalAffterDiscount = (
//     cartTotal -
//     (cartTotal * validCoupon.discount) / 100
//   ).toFixed(2);

//   await Cart.findOneAndUpdate(
//     { orderBy: user._id },
//     { totalAffterDiscount },
//     { new: true }
//   ),
//     res.json(totalAffterDiscount);
// });

// // CREAR ORDENES
// const createOrder = asyncHandler(async (req, res) => {
//   const { COD, couponApplied } = req.body;
//   const { id } = req.user;
//   validateMongoDbId(id);

//   try {
//     if (!COD) {
//       return res.json({
//         message: "Error al crear orden en efectivo",
//       });
//     }

//     // Obtener información del usuario
//     const user = await User.findById(id);

//     // Obtener el carrito del usuario
//     const userCart = await Cart.findOne({ orderBy: user._id });
//     let finalAmout = 0;

//     if (!userCart) {
//       return res.json({
//         message: "Error: el usuario no tiene un carrito.",
//       });
//     }

//     // Calcular el monto final de la orden, considerando descuentos si hay cupón aplicado
//     if (couponApplied && userCart.totalAffterDiscount) {
//       finalAmout = userCart.totalAffterDiscount;
//     } else {
//       finalAmout = userCart.cartTotal * 100;
//     }

//     // Crear una nueva orden
//     let newOrder = new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniquid(),
//         method: "COD",
//         amount: finalAmout,
//         status: "contra reembolso",
//         created: Date.now(),
//         currency: "usd",
//       },
//       orderBy: user._id,
//       orderStatus: "contra reembolso",
//     });

//     // Guardar la nueva orden en la base de datos
//     const saveOrder = await newOrder.save();

//     // Actualizar la cantidad de productos y las ventas en la colección de productos
//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quantity: -item.count, sold: +item.count } },
//         },
//       };
//     });

//     // Realizar la actualización masiva en la colección de productos
//     const updated = await Product.bulkWrite(update, {});

//     return res.json({
//       message: "success",
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const getOrders = asyncHandler(async (req, res) => {
//   const { id } = req.user;
//   validateMongoDbId(id);

//   try {
//     const userOrders = await Order.findOne({ orderBy: id })
//       .populate("products.product")
//       .populate("orderBy")
//       .exec();

//     return res.json(userOrders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const userOrders = await Order.find()
//       .populate("products.product")
//       .populate("orderBy")
//       .exec();

//     return res.json(userOrders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const getOrderByUserId = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;

//     validateMongoDbId(id);

//     const userorders = await Order.findOne({ orderBy: id })
//       .populate("products.product")
//       .populate("orderBy")
//       .exec();

//     return res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const updateOrder = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   validateMongoDbId(id);

//   try {
//     const updateOrderStatus = await Order.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     return res.json(updateOrderStatus);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

export {
  registerUser,
  loginUser,
  obtenerTodosUsuarios,
  obtenerUnUsuario,
  eliminarUsuario,
  actualizarUsuario,
  usuarioBloqueado,
  usuarioDesbloqueado,
  handlerRefreshToken,
  logout,
  cambiarContraseña,
  olvidarContraseña,
  resetearContraseña,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
  empytCart,
};
