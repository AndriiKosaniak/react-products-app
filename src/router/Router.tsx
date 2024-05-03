import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ProductList, ProductDetails } from "views";
import { routes } from "./routes";

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.products} element={<ProductList />} />
      <Route path={routes.product} element={<ProductDetails />} />

      <Route path="*" element={<Navigate to={routes.products} />} />
    </Routes>
  );
};
