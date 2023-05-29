import React, { useState, useEffect } from 'react'
import Nav from '../../components/Nav';
import axios from "axios";
import {  useNavigate, useParams } from 'react-router-dom';

const UpdateCategory = () => {
    const params = useParams();
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

//   const [categories, setCategories] = useState([])

  const getAllCategory = async()=>{
    try{
        const {data} = await axios.get(`http://localhost:8080/category/get-categories/${params._id}`)
        console.log(data)
        setName(data?.data?.name)
        // setImage(data?.data?.image)
        setDescription(data?.data?.description)
     
    }
    catch(error){
        console.log(error)
    }
}

useEffect(()=>{
    getAllCategory()
},[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/category/update-category/${params._id}`, { name, image, description });
      setName("");
      setImage("");
      setDescription("");
      alert("Category updated successfully!");
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
            <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Update Category</h1>

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
                Update
              </button>
            </form>

           
          </div>
        </div>
      </div>
  );
};

export default UpdateCategory;



