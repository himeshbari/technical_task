import logo from "./logo.svg";
import "./App.css";
import AddCategoryForm from "./pages/Category/addCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from "./pages/Category/getCategory";
import CreateProduct from "./pages/Product/addProduct";
import Products from "./pages/Product/getProduct";
import UpdateProduct from "./pages/Product/updateProduct";
import UpdateCategory from "./pages/Category/updateCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/add-category" element={<AddCategoryForm/>}/>
          <Route path="/get-category" element={<CategoryList/>}/>
          <Route path="/add-product" element={<CreateProduct/>}/>
          <Route path="/" element={<Products/>}/>
          <Route path="/update-product/:_id" element={<UpdateProduct/>}/>
          <Route path="/update-category/:_id" element={<UpdateCategory/>}/>
          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
