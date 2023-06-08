import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="container mt-4">
      <input
        className="search-bar"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Buscar por nombre de bug"
      />
    </div>
  );
};

export default SearchBar;
