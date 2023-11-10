import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import { SuppliesList } from "./layouts/medical_supplies/SuppliesList";
import { Information } from "./layouts/medical_supplies/Information";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
