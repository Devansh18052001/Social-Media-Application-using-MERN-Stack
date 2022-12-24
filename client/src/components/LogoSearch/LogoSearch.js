import React from "react";
import Logo from "../../img/Untitled.png";
import './LogoSearch.css'
// import { UilSearch } from '@iconscout/react-unicons'
import {UilSearch} from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="search-icon">
                <UilSearch/>
          </div>
      </div>
    </div>
  );
};

export default LogoSearch;
