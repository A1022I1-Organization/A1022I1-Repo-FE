import "./App.css";
import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Information } from "./layouts/medical_supplies/Information";
import HomePage from "./layouts/HomePage";
import { Footer } from "./layouts/FooterLayout";
import List from "./layouts/List";
import { AppRouter } from "./AppRouter";

import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
