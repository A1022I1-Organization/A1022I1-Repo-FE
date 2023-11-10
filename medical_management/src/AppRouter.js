import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Header } from "./layouts/HeaderLayout";

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
          <Route path="" element={""} />

          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
