import React, { useEffect, useState } from 'react';
import './History.css';
import { IoIosStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import Not from '../Not';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(data);

    const onStorage = () => setHistory(JSON.parse(localStorage.getItem('history') || '[]'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Функция удаления фильма из истории
  const removeFromHistory = (e, filmId) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    const updatedHistory = history.filter(film => film.kinopoiskId !== filmId);
    setHistory(updatedHistory);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  return (
    <div className="history" id="history" >
      <Not />
      <h2>История просмотров</h2>
      <div className="cards-movie history-scroll">
        {history.map(film => (
          <Link to={`/about/${film.kinopoiskId}`} key={film.kinopoiskId}>
            <div className="card-movie">
              <img src={film.posterUrl || "/image.png"} alt={film.nameRu || film.nameOriginal || 'Movie'} />
              <div className="text-movie">
                <h3>{film.nameRu || film.nameOriginal || '-'}</h3>
                <p className='raiting-min'>{
                  film.ratingKinopoisk !== undefined && film.ratingKinopoisk !== null
                    ? Number(film.ratingKinopoisk).toFixed(1)
                    : '0.0'
                }<span><IoIosStar /></span></p>
              </div>
              <button 
                className="triangle-btn" 
                onClick={(e) => removeFromHistory(e, film.kinopoiskId)}
                title="Удалить из истории">
                <FaXmark className='x-icon'/>
              </button>
            </div>
          </Link>
        ))}
      </div>
      <Not />
    </div>
  );
}

export default History;
