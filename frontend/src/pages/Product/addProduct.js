import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [attributes, setAttributes] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [stock, setStock] = useState(0);
//   const [image, setImage] = useState("");
  const [tax, setTax] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  // get all categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category/get-categories");
      if (response.data) {
        setCategories(response.data.data);
        // console.log(response.data.data)
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        longDescription,
        attributes,
        price,
        salePrice,
        stock,
        photo,
        tax,
        category,
      };

      const response = await axios.post(
        "http://localhost:8080/product/add-product",
        productData
      );

      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert("Product Created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  
    return (
      <>
        <div className="container-fluid dashboard">
          <div className="row">
            <div className="col-lg-2 col-md-7 justify-content-center dash-position">
              <Nav />
            </div>
            <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 w-50 dash margin" style={{marginLeft:"32%"}}> 
              <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">CREATE PRODUCT</h1>
              <div className=" m-5">
                <div>Category</div>
                <select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  className="form-select mb-3"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="mb-3">
                <div>Name</div>

                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                <div>Description</div>

                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                <div>Long Description</div>

                  <textarea
                    type="text"
                    value={longDescription}
                    placeholder="write a Long description"
                    className="form-control"
                    onChange={(e) => setLongDescription(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                <div>Attributes</div>

                  <input
                    type="text"
                    value={attributes}
                    placeholder="write a Attributes"
                    className="form-control"
                    onChange={(e) => setAttributes(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                <div>Price</div>

                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                <div>Sale Price</div>

                  <input
                    type="number"
                    value={salePrice}
                    placeholder="write a Sale Price"
                    className="form-control"
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                <div>Photo</div>

                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : " photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
  
                <div className="mb-3">
                <div>Stock</div>

                  <input
                    type="number"
                    value={stock}
                    placeholder="write a stock"
                    className="form-control"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                <div>Tax</div>

                  <input
                    type="number"
                    value={tax}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setTax(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <button className="btn bgcolor-2 text-light" onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CreateProduct;
  


  