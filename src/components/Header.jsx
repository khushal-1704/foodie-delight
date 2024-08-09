/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

import "./../styles/header.css";

import useDebounce from "../hooks/useDebounce";

import InputBox from "./InputBox";

const Header = ({ handleSearchInput }) => {
  const [searchInput, setSearchInput] = useState("");
  const searchQuery = useDebounce(searchInput);

  useEffect(() => {
      handleSearchInput(searchQuery)
  },[searchQuery])

  const handleSearchPress = () => {
    if (searchQuery.trim().length > 2) {
      handleSearchInput(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearchPress();
    }
  };

  const handleClearPress = () => {
    handleSearchInput('')
    setSearchInput('')
  }
 
  return (
    <header className="header-box">
      <div className="header-search">
        <InputBox
          inputBoxStyle="header-input-box"
          onInputChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          inputStyle="header-input"
          inputPlaceHolder="Search Restaurant"
          inputValue={searchInput}
        />
        {searchInput.length ? <ImCancelCircle className="cancel-icon" onClick={handleClearPress} /> : <FaMagnifyingGlass className="search-icon" onClick={handleSearchPress} />}
      </div>
    </header>
  );
};

export default Header;
