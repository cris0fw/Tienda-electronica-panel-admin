import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import menu from "../img/mi menu.svg";
import menuOne from "../img/menu-dos.svg";
import menuThree from "../img/menu-tres.svg";
import menuFor from "../img/menu-cuatro.svg";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import ReactPaginate from "react-paginate";

const OutStore = () => {
  const [grid, setGrid] = useState(250);
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);

  // TODOS FILTROS
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  // paginacion
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 10;

  const startIndex = pageNumber * productPerPage;
  const endIndex = startIndex + productPerPage;

  // uso el useSelector para recorrer los elementos
  const productState = useSelector((state) => state.product.product);

  const productsOnPage = productState.slice(startIndex, endIndex);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  useEffect(() => {
    let newBrands = [];
    let newCategory = [];
    let newTags = [];
    let newColors = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      newCategory.push(element.category);
      newTags.push(element.tags);
      newColors.push(element.color);
    }

    setBrands(newBrands);
    setCategories(newCategory);
    setTags(newTags);
    setColors(newColors);
  }, [productState]);

  return (
    <div>
      <Meta title="Nuestra tienda" />
      <BreadCrum title="tienda" />

      <section className="container my-20 flex gap-16">
        {/* BARRA LATERAL IZQUIERDA */}
        <div className="w-[300px] flex flex-col gap-4">
          {/* COMPRAR POR CATEGORIAS */}
          <div className=" bg-blanco p-4 shadow-lg">
            <div>
              <h2 className="mb-3 font-semibold text-lg">
                comprar por categorías
              </h2>
              <ul className="text-[#5C5D5E]">
                {categories &&
                  [...new Set(categories)].map((items, index) => {
                    return (
                      <li
                        onClick={() => setCategory(items)}
                        key={index}
                        className="text-sm mb-2"
                      >
                        {items}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          {/* FILTRAR Y FILTRAR POR PRECIO, COLORES, TAMAÑO */}
          <div className="bg-blanco p-4 shadow-lg">
            <h2 className="mb-3 font-semibold text-lg">Filtrar por</h2>

            <h3 className="mb-3 font-semibold text-sm">Disponibilidad</h3>

            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">En stock (10)</p>
            </div>
            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">Agotado (1)</p>
            </div>

            <h3 className="mb-3 mt-5 font-semibold text-sm">Precio</h3>

            <div className="flex gap-5">
              <input
                className="px-5 w-28 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                type="number"
                placeholder="De"
                name="de"
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className="px-5 w-28 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                type="number"
                placeholder="Hasta"
                name="hasta"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <h3 className="mb-3 mt-5 font-semibold text-sm">Colores</h3>

            <div>
              <ul className="flex flex-wrap gap-2">
                <li className="w-8 h-8 rounded-full bg-[#194EA5]"></li>
                <li className="w-8 h-8 rounded-full bg-negro"></li>
                <li className="w-8 h-8 rounded-full bg-[#74933C]"></li>
                <li className="w-8 h-8 rounded-full bg-[#CECECE]"></li>
                <li className="w-8 h-8 rounded-full bg-[#6057AE]"></li>
                <li className="w-8 h-8 rounded-full bg-[#2D213F]"></li>
                <li className="w-8 h-8 rounded-full bg-[#7186C5]"></li>
                <li className="w-8 h-8 rounded-full bg-[#E63F31]"></li>
                <li className="w-8 h-8 rounded-full bg-[#8A8E96]"></li>
                <li className="w-8 h-8 rounded-full bg-[#0000FF]"></li>
                <li className="w-8 h-8 rounded-full bg-[#F48221]"></li>
                <li className="w-8 h-8 rounded-full bg-[#203643]"></li>
                <li className="w-8 h-8 rounded-full bg-[#3AC5DA]"></li>
                <li className="w-8 h-8 rounded-full bg-[#F08465]"></li>
                <li className="w-8 h-8 rounded-full bg-[#C53A25]"></li>
                <li className="w-8 h-8 rounded-full bg-[#07DC99]"></li>
                <li className="w-8 h-8 rounded-full bg-[#C016E9]"></li>
                <li className="w-8 h-8 rounded-full bg-[#F48ADF]"></li>
              </ul>
            </div>

            <h3 className="mb-3 mt-5 font-semibold text-sm">Tamaño</h3>

            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">S (10)</p>
            </div>
            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">M (13)</p>
            </div>
            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">L (10)</p>
            </div>
            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">XL (5)</p>
            </div>
            <div className="flex items-center text-[#5C5D5E]">
              <input type="checkbox" />
              <p className="mt-1 ml-2">XXL (5)</p>
            </div>
          </div>
          {/* TAG DE PRODUCTOS */}
          <div className="bg-blanco p-4 shadow-lg">
            <h2 className="mb-3 font-semibold text-lg">Tag de productos</h2>
            <div className="flex flex-wrap gap-2 justify-start">
              {tags &&
                [...new Set(tags)].map((items, index) => {
                  return (
                    <p
                      onClick={() => setTag(items)}
                      key={index}
                      className="bg-[#DDDDDB] py-1 px-2 text-[#5C5D5E] rounded text-sm"
                    >
                      {items}
                    </p>
                  );
                })}
            </div>
          </div>
          {/* PRODUCTOS ALEATORIOS */}
          <div className="bg-blanco p-4 flex flex-col gap-3 shadow-lg">
            <h2 className="mb-3 font-semibold text-lg">Marcas</h2>

            {brands &&
              [...new Set(brands)].map((items, index) => {
                return (
                  <p
                    onClick={() => setBrand(items)}
                    key={index}
                    className="bg-[#DDDDDB] py-1 px-2 cursor-pointer text-[#5C5D5E] rounded text-sm"
                  >
                    {items}
                  </p>
                );
              })}
          </div>
        </div>

        {/* BARRA DERECHA */}
        <div className="w-full">
          {/* ORDENACION E ICONOS */}
          <div className=" bg-blanco p-3 shadow-lg flex justify-between items-center">
            <div className="flex">
              <h2 className="text-lg font-semibold">Ordenar por:</h2>
              <select
                name=""
                id=""
                className="ml-2 text-[#5C5D5E] bg-[#F7F7F5] outline-none p-2 shadow-md"
                defaultValue={"manual"}
                onChange={(e) => setSort(e.target.value)}
              >
                m
                <option value="title" className="p-2">
                  Alfabéticamente, A-Z
                </option>
                <option value="-title" className="p-2">
                  Alfabéticamente, Z-A
                </option>
                <option value="price" className="p-2">
                  Precio, bajo a alto
                </option>
                <option value="-price" className="p-2">
                  Precio, bajo a alto
                </option>
                <option value="createdAt" className="p-2">
                  Fecha, vieja a nueva
                </option>
                <option value="-createdAt" className="p-2">
                  Fecha, nueva a vieja
                </option>
              </select>
            </div>

            <div className="flex gap-5">
              <p>21 productos</p>
              <img
                src={menuFor}
                className="w-5 cursor-pointer"
                onClick={() => setGrid(500)}
                alt="menu cuatro"
              />
              <img
                src={menuThree}
                className="w-5 cursor-pointer"
                onClick={() => setGrid(350)}
                alt="menu tres"
              />
              <img
                src={menuOne}
                className="w-5 cursor-pointer"
                onClick={() => setGrid(290)}
                alt="menu dos"
              />
              <img
                src={menu}
                onClick={() => setGrid(250)}
                className="w-5 cursor-pointer"
                alt="menu"
              />
            </div>
          </div>
          {/* LISTA DE PRODUCTOS */}
          <div className="mt-11 flex gap-3 flex-wrap">
            {productsOnPage.map((items) => {
              return <ProductCard grid={grid} key={items._id} data={items} />;
            })}
          </div>

          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            pageCount={Math.ceil(productState.length / productPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => setPageNumber(selected)}
            containerClassName={"pagination flex justify-center mt-8"}
            activeClassName={"bg-blue-500 text-white"}
            pageClassName="mx-2"
            pageLinkClassName="px-4 py-2 rounded-full bg-white text-blue-500"
            previousClassName="mx-2"
            previousLinkClassName="px-4 py-2 rounded-full bg-white text-blue-500"
            nextClassName={"mx-2"}
            nextLinkClassName={"px-4 py-2 rounded-full bg-white text-blue-500"}
            breakClassName={"mx-2"}
            breakLinkClassName={"px-4 py-2 rounded-full bg-white text-blue-500"}
          />
        </div>
      </section>
    </div>
  );
};

export default OutStore;
