import React, { useEffect, useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import user from "../img/user.svg";
import compare from "../img/comparar.svg";
import heart from "../img/corazon.svg";
import iconCategory from "../img/menu.svg";
import carrito from "../img/carrito.svg";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../features/user/userSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAllProducts } from "../features/product/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [selectLogin, setSelectLogin] = useState(false);
  const [selectCategories, setSelectCategories] = useState(false);
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.auth.getCartProduct) || [];
  const productState = useSelector((state) => state.product.product);
  const [productOpt, setProductOpt] = useState([]);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);

  const handleSelectedCategory = (category) => {
    setTimeout(() => {
      dispatch(getAllProducts({ category }));
    }, 300);

    navigate("/product");
  };

  const handleSelectLogin = () => {
    setSelectLogin(!selectLogin);
  };

  const handleSelectCategories = () => {
    setSelectCategories(!selectCategories);
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    let data = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }

    setProductOpt(data);
  }, [productState]);

  useEffect(() => {
    let sum = 0;

    for (let index = 0; index < cartState.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
    }
    setTotal(sum);
  }, [cartState]);

  useEffect(() => {
    let newCategory = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newCategory.push(element.category);
    }

    setCategories(newCategory);
  }, [productState]);

  return (
    <>
      <header className="w-full bg-[#AA1A2A] text-blanco p-1">
        <section className="container flex justify-between items-center">
          <p>envío gratis a partir de $100 y devoluciones gratis</p>

          <div className="flex items-center gap-5">
            <p>
              línea directa <span>(888) 5400 6000-(888) 1123 54666</span>
            </p>

            <div className="relative">
              <div
                onClick={handleSelectLogin}
                className="w-[240px} h-[30px] cursor-pointer bg-bordo flex justify-content-between items-center p-4"
              >
                <p>Idioma</p>
                <FaCaretDown />
              </div>

              {selectLogin && (
                <div className="absolute w-[100px] text-negro h-auto top-full right-[-2px] flex flex-col items-center mt-1 bg-white border z-50 shadow transition-opacity">
                  <section className="cursor-pointer transition-color duration-500 p-1 flex items-center hover:bg-[#E2E8F0]">
                    <p>Español</p>
                  </section>
                  <section className="cursor-pointer transition-color duration-500 p-1 flex items-center hover:bg-[#E2E8F0]">
                    <p>EEUU</p>
                  </section>
                </div>
              )}
            </div>
          </div>
        </section>
      </header>
      <header className="w-full bg-rojo text-blanco">
        <section className="container p-3 flex justify-between items-center">
          <h2 className="text-3xl font-bold">TecnoTech</h2>

          <form action="" className="flex">
            <Typeahead
              id="pagination-example"
              onChange={(selected) => {
                navigate(`/product/${selected[0].prod}`);
              }}
              options={productOpt}
              onPaginate={() => console.log("Results paginated")}
              paginate={paginate}
              labelKey={"name"}
              placeholder="Buscar productos aqui"
              className="input-buscar"
              minLength={2}
            />
            <button className="h-10 w-10 bg-negro flex justify-center items-center hover:bg-gris hover:text-negro">
              <FaSearch />
            </button>
          </form>

          <div className="flex items-center gap-2">
            <Link to="/compare-product" className="flex gap-3">
              <img src={compare} className="w-10" alt="comparar producto" />
              <p className="w-20">Comparar productos</p>
            </Link>
            <Link to="/wishlist" className="flex gap-3">
              <img src={heart} className="w-10" alt="" />
              <p className="w-20">Lista de favoritos</p>
            </Link>
            <Link
              to={authState.user === null ? "/login" : "/my-profile"}
              className="flex gap-3"
            >
              <img src={user} className="w-10" alt="comparar producto" />
              {authState.user === null ? (
                <p className="w-20">Iniciar sesion</p>
              ) : (
                <p className="w-20">
                  Bienvenido {authState?.user?.data?.nombre}
                </p>
              )}
            </Link>

            <Link to="cart" className="flex gap-3">
              <img src={carrito} className="w-8 cursor-pointer" alt="" />
              <span className="flex flex-col">
                <span className="w-6 text-blanco bg-negro rounded text-center">
                  {cartState?.length ? cartState?.length : 0}
                </span>
                <span>${total ? total : 0}</span>
              </span>
            </Link>
          </div>
        </section>
      </header>
      <header className="w-full bg-negro text-blanco">
        <section className="container p-3 flex justify-start items-center gap-3">
          <div className="relative">
            <div
              onClick={handleSelectCategories}
              className="w-60 h-[35px]  cursor-pointer flex justify-between items-center p-4"
            >
              <img src={iconCategory} className="w-8" alt="Categorias" />
              <p>CATEGORIAS</p>
              <FaCaretDown />
            </div>

            {selectCategories && (
              <div className="absolute w-60 text-blanco h-auto top-full right-[-2px] flex flex-col items-center mt-2 text-center bg-white border z-50 shadow transition-opacity">
                {categories &&
                  [...new Set(categories)].map((items, index) => {
                    return (
                      <section
                        key={index}
                        className="cursor-pointer z-10 w-60 bg-negro transition-color duration-500 p-2 flex items-center "
                        onClick={() => handleSelectedCategory(items)}
                      >
                        <p>{items}</p>
                      </section>
                    );
                  })}
              </div>
            )}
          </div>

          <Link to="/">HOME</Link>
          <Link to="/product">NUESTRA TIENDA</Link>
          <Link to="/blogs">BLOGS</Link>
          <Link to="/contact">CONTACT</Link>
        </section>
      </header>
    </>
  );
};

export default Header;
