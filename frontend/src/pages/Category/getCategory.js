import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([])

    const getAllCategory = async()=>{
        try{
            const {data} = await axios.get("http://localhost:8080/category/get-categories")
            setCategories(data.data)
            console.log(data.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategory()
    },[])


    const handleDelete = async (id) => {
        try {
          const { data } = await axios.delete(
            `http://localhost:8080/category/delete-category/${id}`
          );
          getAllCategory();
          alert("Product Deleted Successfully");
          
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
          <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 dash w-50 margin" style={{marginLeft:"32%"}}>
            <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">All Category</h1>
            <div className="w-100 px-0">
              <table className="table table-bordered my-5">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="hide">Category ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">description</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((u, i) => (
                    <>
                      <tr>
                        <td >{i++}</td>
                        <td className="hide">{u._id}</td>
                        <td>{u.name}</td>
                        <td>{u.image}</td>
                        <td>{u.description}</td>
                        <td>
                            <div className="text-center" style={{ fontSize: "25px" }}>
                            <Link to={`/update-category/${u._id}`} className="btn btn-info">Update</Link>
                              <div className="btn btn-danger" onClick={() => handleDelete(u._id)}> Delete</div>
                            </div>
                          </td>

                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
