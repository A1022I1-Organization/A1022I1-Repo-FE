import "./App.css";
import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Information } from "./layouts/medical_supplies/Information";
import HomePage from "./layouts/HomePage";
import { Footer } from "./layouts/FooterLayout";
import List from "./layouts/List";
import { AppRouter } from "./AppRouter";
import { StatisticsMaterial } from "./layouts/statistics_material/StatisticsMaterial";
import { CreateAccount } from "./layouts/account/CreateAccount";

import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Example from "./components/pagination/SupplyPagination";

function App() {
  return (
    <div>
      <AppRouter />
      <CreateAccount />
      {/*  <SuppliesList />*/}
    </div>
  );
}

export default App;
