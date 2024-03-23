import express from "express";
import {
  obtenerTodosUsuarios,
  handlerRefreshToken,
  logout,
  getUserCart,
  getWishList,
  obtenerUnUsuario,
  registerUser,
  loginUser,
  loginAdmin,
  olvidarContraseña,
  userCart,
  eliminarUsuario,
  empytCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
  resetearContraseña,
  actualizarUsuario,
  usuarioBloqueado,
  cambiarContraseña,
  saveAddress,
  usuarioDesbloqueado,
} from "../controller/userCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/AuthMiddleware.js";
const authUser = express.Router();

// METODOS GET
authUser.get("/buscar-usuarios", obtenerTodosUsuarios);
authUser.get("/refresh", handlerRefreshToken);
authUser.get("/logout", logout);
authUser.get("/cart", authMiddleware, getUserCart);
authUser.get("/wishList", authMiddleware, getWishList);
authUser.get("/buscar-usuario/:id", authMiddleware, isAdmin, obtenerUnUsuario);

// METODOS POST
authUser.post("/register", registerUser);
authUser.post("/login", loginUser);
authUser.post("/admin-login", loginAdmin);
authUser.post("/olvidar-contrasena", olvidarContraseña);
authUser.post("/addToCart", authMiddleware, userCart);

// METODOS DELETE
authUser.delete("/:id", eliminarUsuario);
authUser.delete("/cart/empty-cart", authMiddleware, empytCart);
authUser.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
authUser.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);

// METODOS PUT
authUser.put("/reset-password/:token", resetearContraseña);
authUser.put("/edit-user", authMiddleware, actualizarUsuario);
authUser.put("/user-blocked/:id", authMiddleware, isAdmin, usuarioBloqueado);
authUser.put("/password", authMiddleware, cambiarContraseña);
authUser.put("/save-address", authMiddleware, saveAddress);
authUser.put(
  "/user-desblock/:id",
  authMiddleware,
  isAdmin,
  usuarioDesbloqueado
);

export default authUser;
