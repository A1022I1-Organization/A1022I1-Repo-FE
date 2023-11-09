import "./App.css";
import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import {SuppliesList} from "./layouts/medical_supplies/SuppliesList";
import {Information} from "./layouts/medical_supplies/Information";
import HomePage from "./layouts/HomePage";
import { Footer } from "./layouts/FooterLayout";
import List from "./layouts/List";

function App() {
  return (
    <div>
      <Header />

      <List />

      {/* <HomePage />  */}

      <Footer />
      
       {/*<SuppliesList /> */}
        {/* <Information /> */}
    </div>
  );
}

export default App;
