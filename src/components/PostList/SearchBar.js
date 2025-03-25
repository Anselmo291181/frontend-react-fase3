import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <SearchInput
      type="text"
      placeholder="Buscar posts..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchBar;
