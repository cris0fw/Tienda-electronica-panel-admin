// Creamos los slices y los errores
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// importamos el servicio para consumir
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const queryContact = createAsyncThunk(
  "contact/post",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.postQuery(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(queryContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(queryContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contact = action.payload;
        if (state.isSuccess === true) {
          toast.success("Formulario de contacto enviado exitosamente");
        }
      })
      .addCase(queryContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("algo salió mal");
        }
      });
  },
});

export default contactSlice.reducer;
