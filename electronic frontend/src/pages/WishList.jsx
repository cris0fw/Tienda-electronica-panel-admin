import React, { useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishList } from "../features/user/userSlice";
import { addProductList } from "../features/product/productSlice";

const WishList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllsWishList();
  }, []);

  const getAllsWishList = () => {
    dispatch(getUserProductWishList());
  };

  const removeFromWishList = (id) => {
    dispatch(addProductList(id));

    setTimeout(() => {
      dispatch(getUserProductWishList());
    }, 300);
  };

  const wishListState = useSelector((state) => state.auth.wishList?.wishList);

  return (
    <div>
      <BreadCrum title="Lista de deseos" />
      <Meta title="Lista de deseos" />

      <div className="container my-16 flex gap-3 flex-wrap">
        {wishListState && wishListState.length === 0 ? (
          <div className="m-auto">No hay datos</div>
        ) : wishListState ? (
          wishListState.map((items) => {
            return (
              <div key={items._id} className="w-[250px] flex flex-col gap-3">
                <div className="w-full bg-blanco relative">
                  <img
                    className="w-[190px] m-auto"
                    src={items.images[0].url}
                    alt="Tablet"
                  />

                  <div
                    onClick={(e) => removeFromWishList(items._id)}
                    className="absolute top-0 right-0 cursor-pointer"
                  >
                    <IoMdClose size={22} />
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold">{items.title}</h2>

                  <p className="font-semibold">$ {items.price}</p>
                </div>
              </div>
            );
          })
        ) : (
          []
        )}
      </div>
    </div>
  );
};

export default WishList;
