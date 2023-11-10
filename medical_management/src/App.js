import "./App.css";
import { Header } from "./layouts/HeaderLayout";
import ImageUpload from "./layouts/medical_supplies/ImageUpload";
import { SupplierCreate } from "./layouts/medical_supplies/SupplierCreate";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <SupplierCreate />
      {/* <ImageUpload /> */}
      <ToastContainer />
    </>
  );
}

export default App;
