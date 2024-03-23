import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getBrands } from "../features/brand/brandSlice";
import { getCategory } from "../features/category/categorySlice";
import { getColors } from "../features/color/colorSlice";
import { deleteImg, uploading } from "../features/uploads/uploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
const { Option } = Select;
import Dropzone from "react-dropzone";
import { createProduct, resetState } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProducts = () => {
  const [color, setColor] = useState([]);
  const navigate = useNavigate();

  // VALIDAAMOS QUE LOS CAMPOS SEAN OBLIGATORIOS
  let schema = Yup.object().shape({
    title: Yup.string().required("El nombre del producto es requerido"),
    description: Yup.string().required(
      "la descripcion del producto es requerido"
    ),
    price: Yup.number().required("El precio del producto es requerido"),
    brand: Yup.string().required("La marca del producto es requerido"),
    category: Yup.string().required("La categoria del producto es requerido"),
    tags: Yup.string().required("Los tags del producto es requerido"),
    color: Yup.array()
      .min(1, "Elige al menos un color")
      .required("El color es requerido"),
    quantity: Yup.string().required("la cantidad del producto es requerido"),
  });

  // LOS VALORES TIENEN QUE CORRESPONDER AL MODELO DEL PRODUCT DEL BACKEND
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: [],
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm;
      setColor(null);

      // En 3 segundos me lleva a la pagina de lista de productos
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const img = [];

  const dispatch = useDispatch();
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.category);
  const colorsState = useSelector((state) => state.color.colors);
  const uploadState = useSelector((state) => state.upload.images);
  const newProductState = useSelector((state) => state.product);

  const { isError, isLoading, isSuccess, createdProduct } = newProductState;

  // Validacion si salio todo bien
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Producto agregado correctamente");
    }

    if (isError) {
      toast.error("Error no se pudo agregar el producto");
    }
  }, [isError, isLoading, isSuccess]);

  // CON EL ARRAY DE COLORS AGREGO EL ID Y EL COLOR CORRESPONDIENTE DE COLORSTATE
  const colors = colorsState.map((element) => ({
    _id: element._id,
    color: element.title,
  }));

  // LO MISMO HAGO CON LA IMAGEN
  uploadState.forEach((element) => {
    img.push({
      public_id: element.public_id,
      url: element.url,
    });
  });

  const handleColorChange = (selectedColors) => {
    setColor(selectedColors);
    formik.setFieldValue("color", selectedColors);
  };

  useEffect(() => {
    formik.values.color;
    formik.values.images = img;
  }, [color, img]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategory());
    dispatch(getColors());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Añadir productos</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div className="mb-3">
            <CustomInput
              onCh={formik.handleChange("title")}
              onBl={formik.handleChange("title")}
              name="title"
              val={formik.values.title}
              type="text"
              label="Ingresa el nombre del producto"
            />
          </div>

          {/* ACA VA A ESTAR SU ERROR DE NOMBRE */}
          <div className="error">
            {formik.touched.nombre && formik.errors.nombre}
          </div>

          <ReactQuill
            theme="snow"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
          />

          {/* ACA VA A ESTAR SU ERROR DE DESCRIPCION */}
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <CustomInput
            type="number"
            label="Ingresa el precio"
            name="price"
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
            val={formik.values.price}
          />

          {/* ACA VA A ESTAR SU ERROR DEL PRECIO */}
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <select
            className="form-control py-3 mb-3"
            name="brand"
            onChange={formik.handleChange("brand")}
            value={formik.values.brand}
          >
            <option value="">Selecciona la marca del producto</option>
            {brandState.map((brand) => {
              return <option key={brand.title}>{brand.title}</option>;
            })}
          </select>

          {/* ACA VA A ESTAR SU ERROR DE LA MARCA */}
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            className="form-control py-3 mb-3"
            name="category"
            onChange={formik.handleChange("category")}
            value={formik.values.category}
          >
            <option value="">Selecciona categoria del producto</option>

            {categoryState.map((category) => {
              return <option key={category.title}>{category.title}</option>;
            })}
          </select>

          {/* ACA VA A ESTAR SU ERROR DE LA CATEGORIA */}
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            className="form-control py-3 mb-3"
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleChange("tags")}
            value={formik.values.tags}
          >
            <option value="presentado">presentado</option>
            <option value="popular">Popular</option>
            <option value="especial">Especial</option>
          </select>

          {/* ACA VA A ESTAR SU ERROR DE LA TAGS */}
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple" // Esto permite seleccionar múltiples opciones
            style={{ width: "100%" }}
            placeholder="Selecciona colores"
            onChange={handleColorChange}
          >
            {/* Renderizar opciones de colores */}
            {colors.map((color) => (
              <Option key={color._id} value={color._id}>
                {color.color}
              </Option>
            ))}
          </Select>

          {/* ACA VA A ESTAR SU ERROR DEL COLOR */}
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput
            type="number"
            label="Ingrese la cantidad del producto"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />

          {/* ACA VA A ESTAR SU ERROR DEL QUANTITY */}
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploading(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {uploadState.map((img) => {
              return (
                <div key={img.public_id} className="position-relative">
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => dispatch(deleteImg(img.public_id))}
                  ></button>
                  <img src={img.url} width={200} alt="" />
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="btn btn-success border-4 rounded-3 my-5"
          >
            Añadir producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
