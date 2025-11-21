import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({onSideBarHide}) {
  return (
    
    <nav className="bg-blue-700 p-5 w-screen ">
      <div>
        <button
          onClick={() => {
            onSideBarHide();
          }}
        >
          <MenuIcon />
        </button>
        
      </div>
          
        <div className="text-2xl text-white flex justify-center py-2 ps-2">Mashaal Roasteries</div>
        
      
    </nav>
  );
}

export default Navbar;
