import "./App.css";
import { AppRouter } from "./AppRouter";
import { StatisticsMaterial } from "./layouts/statistics_material/StatisticsMaterial";
import { CreateAccount } from "./layouts/account/CreateAccount";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Example from "./components/pagination/SupplyPagination";


function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
