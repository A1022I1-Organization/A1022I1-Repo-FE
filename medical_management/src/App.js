import "./App.css";
import { Header } from "./layouts/HeaderLayout";
import {SuppliesList} from "./layouts/medical_supplies/SuppliesList";

function App() {
  return (
    <div>
      
      <Header />
        <SuppliesList />

    </div>
  );
}

export default App;
