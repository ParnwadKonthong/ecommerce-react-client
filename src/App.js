import React, { useState, useEffect } from "react";
// Page
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Home from "./components/pages/home";
import Product from "./components/pages/product"
import AllProduct from "./components/pages/allProduct";
import Cart from "./components/pages/cart"

// Layout
import Navbar from "./components/layouts/navbar";

// Admin
import HomeAdmin from "./components/pages/admin/homeAdmin";
import ManageUserForAdmin from "./components/pages/admin/manageUserForAdmin";
import CreateCategory from "./components/pages/admin/category/createCategory";
import UpdateCategory from "./components/pages/admin/category/updateCategory";
import CreateProduct from "./components/pages/admin/product/createProduct";
import UpdateProduct from "./components/pages/admin/product/updateProduct";
import Orders from "./components/pages/admin/orders"

// User
import Payment from "./components/pages/payment";
import Favorites from "./components/pages/user/favorites"
import History from "./components/pages/user/history";

// v.6
import { Routes, Route } from "react-router-dom";

// Functopn
import { currentUser } from "./components/function/auth";

// Redux
import { useDispatch } from "react-redux";

// Routes
import UserRoute from "./components/routes/userRoute";
import AdminRoute from "./components/routes/adminRoute";

// Drawer
import SideDrawer from "./components/drawer/sideDrawer";

// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.token;
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <SideDrawer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/allproduct" element={<AllProduct />} />

        <Route
          path="/admin/home"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <AdminRoute>
              <ManageUserForAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <UserRoute>
              <Cart />
            </UserRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <UserRoute>
              <Payment />
            </UserRoute>
          }
        />
        <Route
          path="/user/favorites"
          element={
            <UserRoute>
              <Favorites />
            </UserRoute>
          }
        />
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
