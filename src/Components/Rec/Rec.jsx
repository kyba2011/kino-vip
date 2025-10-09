//
// Rec.jsx
// Компонент рекомендаций фильмов

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import './Rec.css';



const DEFAULT_RECOMMENDED_IDS = [4443734, 5377710, 935898, 6440213, 5203757, 4476147, 6059558, 478491];


function Rec() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        
        let ids = [];
        try {
            ids = JSON.parse(localStorage.getItem('recIds'));
            if (!Array.isArray(ids) || ids.length === 0) ids = DEFAULT_RECOMMENDED_IDS;
        } catch {
            ids = DEFAULT_RECOMMENDED_IDS;
        }
        localStorage.setItem('recIds', JSON.stringify(ids));

        async function fetchFilmsByIds(ids) {
            try {
                const results = await Promise.all(
                    ids.map(async (id) => {
                        
                        const cacheKey = `film_${id}`;
                        const cached = localStorage.getItem(cacheKey);
                        if (cached) {
                            try {
                                return JSON.parse(cached);
                            } catch {}
                        }
                        
                        const API_KEYS = [
                            '851ad9e5-8041-4065-9b1c-1e9948b7ebac',
                            '24de35a5-1338-4bfd-a607-290a9ff9e450',
                            '246e66a2-dbd0-4924-96c7-d78b996e7c60',
                            '123fa0e0-c556-48aa-b69b-d958d1d052e4',
                            '31bf3fdc-d4cb-41ae-abf1-72636617caa3'
                        ];
                        let lastErr = null;
                        for (const key of API_KEYS) {
                            try {
                                const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
                                    headers: {
                                        'X-API-KEY': key,
                                        'Content-Type': 'application/json',
                                    },
                                });
                                if (!res.ok) throw new Error('Ошибка загрузки');
                                const data = await res.json();
                                localStorage.setItem(cacheKey, JSON.stringify(data));
                                return data;
                            } catch (e) {
                                lastErr = e;
                            }
                        }
                        return null;
                    })
                );
                setFilms(results.filter(Boolean));
            } catch (e) {
                setFilms([]);
            }
        }
        fetchFilmsByIds(ids);
    }, []);

    return (
        <div className="Rec">
            <h2>Входит в топ 10 за месяц</h2>
            <div className="cards-movie history-scroll">
                {films.map(film => (
                    <Link to={`/about/${film.kinopoiskId || film.id}`} key={film.kinopoiskId || film.id}>
                        <div className="card-movie">
                            <img src={film.posterUrl || film.posterUrlPreview} alt={film.nameRu || film.nameEn || film.nameOriginal || 'Movie'} />
                            <div className="text-movie">
                                <h3>{film.nameRu || film.nameEn || film.nameOriginal || '-'}</h3>
                                <p className='raiting-min'>{
                                    film.ratingKinopoisk !== undefined && film.ratingKinopoisk !== null
                                        ? Number(film.ratingKinopoisk).toFixed(1)
                                        : (film.rating !== undefined && film.rating !== null ? Number(film.rating).toFixed(1) : '0.0')
                                }<span><IoIosStar /></span></p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Rec
