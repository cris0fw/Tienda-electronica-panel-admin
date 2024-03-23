import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import OurStore from "./pages/OutStore.jsx";
import Blog from "./pages/Blog.jsx";
import CompareProduct from "./pages/CompareProduct.jsx";
import WishList from "./pages/WishList.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Signop from "./pages/Signop.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import PirvacyPolicy from "./pages/PirvacyPolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import TermAndCondition from "./pages/TermAndCondition.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import { PrivateRoutes } from "./router/PrivateRoutes.jsx";
import { OpenRoutes } from "./router/OpenRoutes.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Profile from "./pages/Profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/product" element={<OurStore />}></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/blogs/:id" element={<SingleBlog />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/compare-product" element={<CompareProduct />}></Route>
        <Route
          path="/my-profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        ></Route>
        <Route
          path="/wishlist"
          element={
            <PrivateRoutes>
              <WishList />
            </PrivateRoutes>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/register"
          element={
            <OpenRoutes>
              <Signop />
            </OpenRoutes>
          }
        ></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/privacy-policy" element={<PirvacyPolicy />}></Route>
        <Route path="/refund-policy" element={<RefundPolicy />}></Route>
        <Route path="/shipping-policy" element={<ShippingPolicy />}></Route>
        <Route path="/term-condition" element={<TermAndCondition />}></Route>
        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        ></Route>

        <Route
          path="/payment/success"
          element={
            <PrivateRoutes>
              <PaymentSuccess />
            </PrivateRoutes>
          }
        ></Route>

        <Route
          path="/checkout"
          element={
            <PrivateRoutes>
              <CheckOut />
            </PrivateRoutes>
          }
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
