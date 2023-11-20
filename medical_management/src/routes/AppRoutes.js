import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { SuppliesList } from "../layouts/medical_supplies/SuppliesList";
import { Header } from "../layouts/HeaderLayout";
import { SupplierCreate } from "../layouts/medical_supplies/SupplierCreate";
import { SupplierUpdate } from "../layouts/medical_supplies/SupplierUpdate";
import { Information } from "../layouts/medical_supplies/Information";
import HomePage from "../layouts/HomePage";
import List from "../layouts/List";

import { Footer } from "../layouts/FooterLayout";
import { CreateAccount } from "../layouts/account/CreateAccount";
import { StatisticsMaterial } from "../layouts/statistics_material/StatisticsMaterial";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";
import { useMemo, useState } from "react";

export const AppRoutes = () => {
  const account = useSelector((store) => store.auth);

  const role = useMemo(() => {
    if (account === null) {
      return "guest";
    } else if (account.accountRole.appRole.name === "ROLE_ADMIN") {
      return "admin";
    } else if (account.accountRole.appRole.name === "ROLE_EMPLOYEE") {
      return "employee";
    } else if (account.accountRole.appRole.name === "ROLE_USER") {
      return "user";
    }
  }, [account]);
  return (
    <BrowserRouter>
      {(role === "admin" ||
        role === "employee" ||
        role === "user" ||
        role === "guest") && <Header />}

      <Routes>
        <Route path="" element={<Outlet />}>
          <Route path="" element={<HomePage />} />
          {(role === "user" || role === "guest") && (
            <Route path="list" element={<List />} />
          )}
        </Route>

        {role === "admin" && (
          <Route path="/admin" element={<Outlet />}>
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="meterial" element={<StatisticsMaterial />} />
          </Route>
        )}
        {(role === "admin" || role === "employee") && (
          <Route path="/supply" element={<Outlet />}>
            <Route path="/supply/create" element={<SupplierCreate />} />
            <Route path="/supply/update/:id" element={<SupplierUpdate />} />
            <Route path="list" element={<SuppliesList />}></Route>
            <Route path="/supply/list/:id" element={<Information />}></Route>
            <Route path="" element={""} />
            <Route />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {(role === "admin" ||
        role === "employee" ||
        role === "user" ||
        role === "guest") && <Footer />}
    </BrowserRouter>
  );
};
