import "./App.css";
import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Information } from "./layouts/medical_supplies/Information";
import HomePage from "./layouts/HomePage";
import { Footer } from "./layouts/FooterLayout";
import List from "./layouts/List";
import { StatisticsMaterial } from "./layouts/statistics_material/StatisticsMaterial";
import { CreateAccount } from "./layouts/account/CreateAccount";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Example from "./components/pagination/SupplyPagination";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
