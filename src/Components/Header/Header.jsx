import React, { useState } from 'react';
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Header({
  genres = [],
  countries = [],
  selectedGenre,
  selectedCountry,
  setSelectedGenre,
  setSelectedCountry
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => setSearch(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/searched?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header>
      <Link to={'/'}><img src="/logo.png" alt="" className='logo' /><img src="/mobile.png" alt="" className='m-logo' /></Link>
      <form className="input-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleInput}
        />
        <button className='search-btn' type="submit"><FaSearch /></button>
      </form>


      <div className="selects">
        <select
          id="country"
          className='c-select select'
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Все страны</option>
          {countries.map((country, i) => (
            <option key={i} value={country}>{country}</option>
          ))}
        </select>

        <select
          id="genre"
          className='g-select select'
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Все жанры</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
