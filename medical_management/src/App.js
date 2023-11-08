import "./App.css";
import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import {SuppliesList} from "./layouts/medical_supplies/SuppliesList";
import {Information} from "./layouts/medical_supplies/Information";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      {/*<Header />*/}
      {/*  <BrowserRouter>*/}
      {/*      <Routes>*/}
      {/*          <Route path="" element={<SuppliesList />}/>*/}
      {/*          <Route path="/detail/:id" element={<Information />}/>*/}
      {/*      </Routes>*/}
      {/*  </BrowserRouter>*/}
        <SuppliesList />
        {/*<Information />*/}
    </>
  );
}

export default App;
