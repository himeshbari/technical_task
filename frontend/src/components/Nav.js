import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="text-center mx-auto z-1">
        <div className="list-group dashboard-menu" >
          <h4 className="d-flex align-items-center fs-5 justify-content-center font-fam my-0" style={{height:"100px"}}>DASHBOARD</h4>

          <NavLink
            to="/add-category"
            className="list-group-item list-group-item-action pt-3"
          >
            Add Category
          </NavLink>
          
          <NavLink
            to="/get-category"
            className="list-group-item list-group-item-action pt-3"
          >
            Get Category
          </NavLink>

          <NavLink
            to="/add-product"
            className="list-group-item list-group-item-action pt-3"
          >
            Create Product
          </NavLink>

          <NavLink
            to="/"
            className="list-group-item list-group-item-action pt-3"
          >
            Get Product
          </NavLink>
                        
        
          {/* <NavLink
          to="/"
            className="list-group-item border-1 hide-1"
            style={{height:"100vh", zIndex:"-2"}}
          > 
          </NavLink> */}
        
        </div>
      </div>
    </>
  );
};

export default Nav;
