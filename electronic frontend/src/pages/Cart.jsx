import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCartDelete,
  getCart,
  orderPayment,
  removeFromCart,
  updateFromCart,
} from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const getCartUser = useSelector((state) => state.auth.getCartProduct) || [];
  const [productUpdateDetail, setProductUpdateDetaild] = useState(null);
  const [total, setTotal] = useState(null);
  const paymentState = useSelector((state) => state.auth.createOrder);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const removeFromProductCart = (id) => {
    dispatch(removeFromCart(id));

    setTimeout(() => {
      dispatch(getCart());
    }, 300);
  };

  const deleteEmptyCart = () => {
    dispatch(emptyCartDelete());

    setTimeout(() => {
      dispatch(getCart());
    }, 200);
  };

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateFromCart({
          cartItemId: productUpdateDetail?.cartItemId,
          newQuantity: productUpdateDetail?.newQuantity,
        })
      );

      setTimeout(() => {
        dispatch(getCart());
      }, 200);
    }
  }, [productUpdateDetail]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < getCartUser.length; index++) {
      sum += Number(getCartUser[index].quantity) * getCartUser[index].price;
    }
    setTotal(sum);
  }, [getCartUser]);

  useEffect(() => {
    dispatch(orderPayment());
  }, []);

  const paymentStore = () => {
    if (paymentState?.url) {
      window.location = paymentState?.url;
    }
  };

  return (
    <div>
      <BreadCrum title="Carrito" />
      <Meta title="Carrito" />

      <div className="container my-16">
        {/* CONTENEDOR*/}
        <div className="w-full">
          {/* TITULOS */}
          <div className="flex justify-end gap-[280px]">
            <h2 className="text-[#5C5D5E] font-semibold">Productos</h2>
            <h2 className="text-[#5C5D5E] font-semibold">Precio</h2>
            <h2 className="text-[#5C5D5E] font-semibold">Cantidad</h2>
            <h2 className="text-[#5C5D5E] font-semibold">Total</h2>
          </div>
          {/* ELEMENTOS */}

          {getCartUser &&
            getCartUser.map((items) => {
              return (
                <section key={items._id}>
                  <div className="mt-3 flex items-center justify-between">
                    {/* PRODUCTO */}
                    <div className="flex gap-3 items-center">
                      <img
                        src={items?.productId?.images[0]?.url}
                        alt="Producto audicular"
                        className="w-24"
                      />
                      <div className="text-[#5C5D5E]">
                        <h2 className="w-64">{items?.productId?.title}</h2>
                        <h2 className="">Size: S</h2>

                        <div className="flex gap-2 items-center">
                          <h2>Color</h2>

                          <li
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: items?.color?.title }}
                          ></li>
                        </div>
                      </div>
                    </div>
                    {/* PRECIO */}
                    <div className="font-semibold">
                      <p>$ {items?.productId?.price}</p>
                    </div>
                    {/* CANTIDAD */}
                    <div className="flex gap-4 items-center">
                      <input
                        className="px-5 w-28 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                        type="number"
                        placeholder="0"
                        name="hasta"
                        value={
                          productUpdateDetail?.newQuantity
                            ? productUpdateDetail?.newQuantity
                            : items?.quantity
                        }
                        onChange={(e) =>
                          setProductUpdateDetaild({
                            cartItemId: items?._id,
                            newQuantity: e.target.value,
                          })
                        }
                      />
                      <Link
                        onClick={() => removeFromProductCart(items?._id)}
                        className="bg-negro p-2 rounded-full"
                      >
                        <MdDelete color="#ffff" size={25} />
                      </Link>
                    </div>
                    {/* TOTAL */}
                    <div className="font-semibold">
                      <h2>$ 18.839</h2>
                    </div>
                  </div>
                </section>
              );
            })}

          {/* COMPRAR PRODUCTO */}
          <div className="my-16 flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex gap-5">
                <Link className="bg-rojo text-center text-blanco p-3 font-semibold rounded-full">
                  continuar enviando
                </Link>
                <button
                  onClick={deleteEmptyCart}
                  className="bg-negro text-blanco rounded-full font-semibold p-3"
                >
                  Vaciar carrito
                </button>
              </div>

              <p className="text-[#5C5D5E]">Ordene instrucciones especiales</p>
            </div>

            <div className="flex flex-col gap-3">
              {(total !== null || total !== 0) && (
                <>
                  <h2 className="text-lg text-[#5C5D5E]">
                    <span className="font-semibold">Subtotal: $ {total}</span>
                  </h2>
                  <p>mpuestos y envío calculados al finalizar la compra</p>

                  <button
                    onClick={paymentStore}
                    className="bg-negro text-blanco p-3 rounded-full text-center font-bold"
                  >
                    Verificar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
