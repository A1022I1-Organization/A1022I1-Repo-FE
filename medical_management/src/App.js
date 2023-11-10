
import "./App.css";
import { LoginGoogle } from "./components/modal/LoginGoogle";
import { Header } from "./layouts/HeaderLayout";
import {SuppliesList} from "./layouts/medical_supplies/SuppliesList";
import {Information} from "./layouts/medical_supplies/Information";
import HomePage from "./layouts/HomePage";
import { Footer } from "./layouts/FooterLayout";
import List from "./layouts/List";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <div>
      {/* <Header />

      <List />

      <HomePage /> 

      <Footer />
      
      
        <Information /> */}
=======
      <AppRouter />
    </div>

  );
}

export default App;
