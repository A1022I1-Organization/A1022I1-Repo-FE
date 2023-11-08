import "./App.css";
import { Header } from "./layouts/HeaderLayout";
import {SuppliesList} from "./layouts/medical_supplies/SuppliesList";
import {Information} from "./layouts/medical_supplies/Information";

function App() {
  return (
    <div>
      
      {/*<Header />*/}
      {/*  <SuppliesList />*/}
        <Information />
    </div>
  );
}

export default App;
