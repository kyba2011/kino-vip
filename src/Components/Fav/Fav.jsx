import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import './Fav.css';
import Not from '../Not';

function Fav() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(favs);
    }, []);

    return (
        <div className="fav">
            <Not />
            <h2>Избранное</h2>
            {favorites.length === 0 ? (
                <p className='not-a' style={{ display: 'block' }}>Нет избранных фильмов.</p>
            ) : (

                <div className="cards-movie">
                    {favorites.map(film => (
                        <Link to={`/about/${film.kinopoiskId}`} key={film.kinopoiskId}>
                            <div className="card-movie">
                                <img src={film.posterUrl || film.posterUrlPreview || "/image.png"} alt={film.nameRu || film.nameEn || film.nameOriginal || '-'} />
                                <div className="text-movie">
                                    <h3 className="movie-title-ellipsis">{film.nameRu || film.nameEn || film.nameOriginal || '-'}</h3>
                                    <p className='raiting-min'>{
                                        film.ratingKinopoisk !== undefined && film.ratingKinopoisk !== null
                                            ? Number(film.ratingKinopoisk).toFixed(1)
                                            : '0.0'
                                    }<span><IoIosStar /></span></p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            )}
        </div>
    );
}

export default Fav
