import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Header } from "./layouts/HeaderLayout";
import {Information} from "./layouts/medical_supplies/Information";
import HomePage from "./layouts/HomePage";
import List from "./layouts/List";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Outlet />}>
          <Route path="" element={<HomePage />} />
          <Route path="/list" element={<List />} />
        </Route>

        <Route path="/admin" element={<Outlet />}>
          <Route path="" element={""} />
          <Route />
        </Route>

        <Route path="/supply" element={<Outlet />}>
          <Route path="/supply/list" element={<SuppliesList />} ></Route>
          <Route path="/supply/list/:id" element={<Information />} ></Route>
          <Route path="" element={""} />
          <Route />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
};
