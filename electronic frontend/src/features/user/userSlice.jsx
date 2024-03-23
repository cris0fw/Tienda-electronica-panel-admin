// Creamos los slices y los errores
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// importamos el servicio para cnsumir
import { authService } from "./userService";
// importo alertas para avisar que ya estoy registrado toasfy
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishList = createAsyncThunk(
  "auth/getWishList",
  async (thunkAPI) => {
    try {
      return await authService.getWishList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "auth/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk("auth/cart/get", async (thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeFromCart = createAsyncThunk(
  "auth/cart/delete",
  async (cartItemId, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateFromCart = createAsyncThunk(
  "auth/cart/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderPayment = createAsyncThunk(
  "payment/create-order",
  async (thunkAPI) => {
    try {
      return await authService.createOrderPayment();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forget-password",
  async (data, thunkAPI) => {
    try {
      return await authService.forgetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetpassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyCartDelete = createAsyncThunk(
  "auth/cart/empty",
  async (thunkAPI) => {
    try {
      return await authService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("customer");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;

        if (state.isSuccess === true) {
          toast.info("Usuario creado satisfactoriamente");
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;

        if (state.isSuccess === true) {
          toast.info("Usuario loguado correctamente");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getUserProductWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishList = action.payload;
      })
      .addCase(getUserProductWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("producto agregado al carrito");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getCartProduct = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("producto eliminado del carrito con éxito");
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("No se pudo eliminar del carrito");
        }
      })
      .addCase(updateFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updateCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("producto actualizado del carrito con éxito");
        }
      })
      .addCase(updateFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(orderPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createOrder = action.payload;
      })
      .addCase(orderPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updateUser = action.payload;

        if (state.isSuccess === true) {
          let currentUserData = JSON.parse(localStorage.getItem("customer")); //<- El viejo customer con los datos viejos
          let currenTokenData = localStorage.getItem("token"); //<-Extraemos el token

          let newUserData = {
            //<- Armamos un nuevo objeto con los datos actuales
            _id: currentUserData?.data?._id,
            nombre: action?.payload?.data?.nombre,
            apellido: action?.payload?.data?.apellido,
            email: action?.payload?.data?.email,
            mobile: action?.payload?.data?.mobile,
            token: currenTokenData,
          };

          let data = {
            data: newUserData,
          };

          localStorage.setItem("customer", JSON.stringify(data));

          state.user = data;
          toast.success("Usuario actualizado correctamente");
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isError === true) {
          toast.error("Error al actualizar el usuario");
        }
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = action.payload;

        if (state.isSuccess === true) {
          toast.success(
            "olvidar contraseña correo electrónico enviado exitosamente"
          );
        }
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetpassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetpassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pass = action.payload;

        if (state.isSuccess === true) {
          toast.success("Cambio de contraseña exitoso");
        }
      })
      .addCase(resetpassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(emptyCartDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCartDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.emptyCart = action.payload;
      })
      .addCase(emptyCartDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
