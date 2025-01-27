import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import {  useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
           navigate(`/filteredProduct/${query}`);
        }
      
    };

    return (
        <form  onSubmit={handleSearch}className="searchBar" >
            <input
                type="text"
                className="searchInput"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
            />
            <button type="submit" className="searchButton">
                
                <IoSearchOutline className="searchIcon" />
                
            </button>
        </form>
    );
};

export default SearchBar;