import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
import { Link } from "react-router-dom";



const Products = () => {
  const [products, setProducts] = useState([]);
  
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/product/get-products`);
      setProducts(data.data);
      console.log(data.data)
    } catch (error) {
      console.log(error);
      alert("Someething Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);



  //delete a product
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/product/delete-product/${id}`
      );
      alert("Product Deleted Successfully");
      getAllProducts();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };


  return (
    <>
      <div className="row dashboard h-100">
        <div className="col-lg-2 col-md-7 justify-content-center dash-position">
          <Nav />
        </div>
        <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 dash w-75 margin" style={{marginLeft:"21%"}}>
          <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">All Products List</h1>
          {/* Search  */}

       
          <div className="d-flex flex-wrap justify-content-center px-5 py-3">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th className="text-center">Sr. No</th>
                  <th>Name</th>
                  <th className="hide">Description</th>
                  <th className="hide">Long Description</th>
                  <th className="text-center">Attributes</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Sale Price</th>
                  <th className="hide text-center">Stock</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Tax</th>
                  <th className="hide">Image</th>

                </tr>
              </thead>
              <tbody>
                {!products?.length
                  ?
                  <h4 className="mt-5">Products Not Found !</h4>
                  :
                  products?.map((p, i) => {
                    return (
                      <>
                        <tr>
                          <td className="text-center">{++i}</td>
                          <td>{p.name}</td>
                          <td className="hide" style={{ width: "30%" }}>{p.description}</td>
                          <td className="hide" style={{ width: "30%" }}>{p.longDescription}</td>
                          <td className="text-center">{p.attributes}</td>
                          <td className="text-center">{p.price}</td>
                          <td className="text-center">{p.salePrice}</td>
                          <td className="text-center">{p.stock}</td>
                          <td className="hide">{p?.category?.name}</td>
                          <td className="hide text-center">{p.tax}</td>
                          <td className="text-center"><img src={`http://localhost:8080/uploads/${p.photo}`} style={{ height: "60px", width: "60px" }} /></td>
                          <td>
                            <div className="text-center" style={{ fontSize: "25px" }}>
                              <Link to={`/update-product/${p._id}`} className="btn btn-info">Update</Link>

                              <div className="btn btn-danger" onClick={() => handleDelete(p._id)}> Delete</div>
                            </div>
                          </td>
                        </tr>
                      </>
                    )
                  })}     
              </tbody>              
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;


