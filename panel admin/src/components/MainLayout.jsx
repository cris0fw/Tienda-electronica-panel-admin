import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { IoCart, IoNotifications } from "react-icons/io5";
import { FaRegUser, FaBlogger, FaBlog } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt, BiColorFill } from "react-icons/bi";
import { MdChecklistRtl, MdOutlineDiscount } from "react-icons/md";
import { AiOutlinePicLeft, AiOutlinePicRight } from "react-icons/ai";
// importamos toasify para los mensajes de errores o correctos
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">P.A.E</span>
            <span className="lg-logo">Panel Admin electronic</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RiDashboard3Line className="fs-4" />,
              label: "panel",
            },
            {
              key: "customers",
              icon: <FaRegUser className="fs-4" />,
              label: "Clientes",
            },
            {
              key: "catalog",
              icon: <IoCart className="fs-4" />,
              label: "Catalogo",
              children: [
                {
                  key: "product",
                  icon: <IoCart className="fs-4" />,
                  label: "Añadir Productos",
                },
                {
                  key: "product-list",
                  icon: <IoCart className="fs-4" />,
                  label: "Lista de Productos",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Marcas",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Lista de marcas",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Categorias",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Lista de categorias",
                },
                {
                  key: "color",
                  icon: <BiColorFill className="fs-4" />,
                  label: "Colores",
                },
                {
                  key: "list-color",
                  icon: <BiColorFill className="fs-4" />,
                  label: "Lista de colores",
                },
              ],
            },
            {
              key: "orders",
              icon: <MdChecklistRtl className="fs-4" />,
              label: "Ordenes",
            },
            {
              key: "marketing",
              icon: <MdOutlineDiscount className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <MdOutlineDiscount className="fs-4" />,
                  label: "Añadir cupon",
                },
                {
                  key: "coupon-list",
                  icon: <MdOutlineDiscount className="fs-4" />,
                  label: "Lista de cupones",
                },
              ],
            },
            {
              key: "blog",
              icon: <FaBlogger className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <FaBlog className="fs-4" />,
                  label: "Añadir blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBlogger className="fs-4" />,
                  label: "Lista de blogs",
                },
                {
                  key: "blog-category",
                  icon: <FaBlog className="fs-4" />,
                  label: "Añadir categoria de blog",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBlogger className="fs-4" />,
                  label: "lista categoria de blog",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaBlogger className="fs-4" />,
              label: "Encuentas",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={40}
                  height={40}
                  src="https://i.ibb.co/7gsxfRP/unnamed.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                arial-aria-expanded="false"
              >
                <h5 className="mb-0">Cris ludue</h5>
                <p className="mb-0">crisludue5@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Ver perfil
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    cambiar la contraseña
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />

          {/* LO vamos a colocar en el contenido  */}
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            theme="light"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
