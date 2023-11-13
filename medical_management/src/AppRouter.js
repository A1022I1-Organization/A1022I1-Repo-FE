import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Header } from "./layouts/HeaderLayout";
import { SupplierCreate } from "./layouts/medical_supplies/SupplierCreate";
import { SupplierUpdate } from "./layouts/medical_supplies/SupplierUpdate";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Outlet />}>
          <Route path="" element={""} />
        </Route>
        <Route path="/admin" element={<Outlet />}>
          <Route path="" element={""} />

          <Route />
        </Route>
        <Route path="/supply" element={<Outlet />}>
          <Route path="/supply/create" element={<SupplierCreate />} />
          <Route path="/supply/update/:id" element={<SupplierUpdate />} />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
