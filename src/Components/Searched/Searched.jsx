//
// Searched.jsx
// Компонент страницы поиска фильмов

import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import './Searched.css';
import { Link, useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import Not from '../Not';
import History from '../History/History';

const API_KEY = '851ad9e5-8041-4065-9b1c-1e9948b7ebac';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Searched() {
  const { hidden } = useOutletContext() || {};
  const query = useQuery().get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    const API_KEYS = [
      '851ad9e5-8041-4065-9b1c-1e9948b7ebac',
      '24de35a5-1338-4bfd-a607-290a9ff9e450',
      '246e66a2-dbd0-4924-96c7-d78b996e7c60',
      '123fa0e0-c556-48aa-b69b-d958d1d052e4',
      '31bf3fdc-d4cb-41ae-abf1-72636617caa3'
    ];

    (async () => {
      let lastErr = null;
      const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}&page=1`;
      for (const key of API_KEYS) {
        try {
          const res = await fetch(url, {
            headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' }
          });
          if (!res.ok) throw new Error('Ошибка поиска: ' + res.status);
          const data = await res.json();
          const films = data.films || [];
          setResults(films);

          // Получаем уникальные жанры и страны
          const genresSet = new Set();
          const countriesSet = new Set();
          films.forEach(film => {
            film.genres?.forEach(g => genresSet.add(g.genre));
            film.countries?.forEach(c => countriesSet.add(c.country));
          });

          setGenres([...genresSet]);
          setCountries([...countriesSet]);
          setLoading(false);
          return;
        } catch (err) {
          lastErr = err;
        }
      }
      setError('Сетевая или CORS ошибка: ' + (lastErr ? lastErr.message : 'Не удалось получить данные'));
      setLoading(false);
    })();
  }, [query]);

  const filteredResults = results.filter(film => {
    let genreOk = true;
    let countryOk = true;
    if (selectedGenre) {
      genreOk = film.genres?.some(g => g.genre === selectedGenre);
    }
    if (selectedCountry) {
      countryOk = film.countries?.some(c => c.country === selectedCountry);
    }
    return genreOk && countryOk;
  });

  return (
    <>
      <div className={hidden ? 'header-hidden' : ''}>
        <Header
          genres={genres}
          countries={countries}
          selectedGenre={selectedGenre}
          selectedCountry={selectedCountry}
          setSelectedGenre={setSelectedGenre}
          setSelectedCountry={setSelectedCountry}
        />
      </div>

      <div className='searchPage'>
        <Not />
        {loading && <div className="not-a"><p>Загрузка...</p></div>}
        {error && <div className="not-a"><p>Ошибка: {error}</p></div>}
        {!loading && !error && filteredResults.length === 0 && (
          <div className="not-a">
            <p>Нет результатов</p>
          </div>
        )}
        {!loading && !error && filteredResults.length > 0 && (
          <div className="results">
            
            <h2>Результаты поиска: {query}</h2>
            <div className="selects selects-mob">
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
            <div className="cards-movie cards-movie-s">
              {filteredResults.map(film => (
                <Link to={`/about/${film.filmId}`} key={film.filmId}>
                  <div className="card-movie card-movie-s">
                    <img src={film.posterUrlPreview || "/image.png"} alt={film.nameRu || film.nameEn || 'Movie'} />
                    <div className="text-movie text-movie-s">
                      <h3 className="movie-title-ellipsis">{film.nameRu || film.nameEn || '-'}</h3>
                      <p>{film.countries?.map(c => c.country).join(', ') || '-'}, {film.genres?.map(g => g.genre).join(', ') || '-'}</p>
                      <p className='raiting-min raiting-min-s'>{
                        film.rating !== undefined && film.rating !== null && !isNaN(Number(film.rating))
                          ? Number(film.rating).toFixed(1)
                          : '0.0'
                      }<span><IoIosStar /></span></p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
      </div>
      <History />
      <Not />
    </>
  );
}

export default Searched;
