import React, { useState } from 'react'
import Nav from '../../components/Nav';
import axios from "axios";
import {  useNavigate, useParams } from 'react-router-dom';

const AddCategoryForm = () => {
  const params = useParams();
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/category/add-category", { name, image, description });
      setName("");
      setImage("");
      setDescription("");
      alert("Category added successfully!");
      navigate("/get-category");
    } catch (error) {
      console.error(error);
      alert(error)
     
    }
  };

  return (
    <div className="container-fluid dashboard h-100">
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position" >
            <Nav />
          </div>
          <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 w-50 dash margin" style={{marginLeft:"32%"}}>
            <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Add Category</h1>

            <form className='p-4 mx-auto w-50' onSubmit={handleSubmit}>
              <div className="mb-3">
                <div>Name</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new category"
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <div>Image</div>
                <input
                  type="file"
                  className="form-control"
                  placeholder="upload image"
                  name='image'
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
                <div>Description</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter description"
                  name='description'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <button type="submit" className="btn bgcolor-2 text-light d-flex mx-auto w-50 justify-content-center">
                Submit
              </button>
            </form>

           
          </div>
        </div>
      </div>
  );
};

export default AddCategoryForm;



