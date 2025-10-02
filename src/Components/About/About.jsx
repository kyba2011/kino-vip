//
// About.jsx
// Компонент страницы информации о фильме (About)

import React, { useEffect, useState } from 'react';
import { IoIosStar } from "react-icons/io";
import './About.css';
import '../Player/Player.css';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Not from '../Not';
import Toast from './Toast';

const API_KEY = '851ad9e5-8041-4065-9b1c-1e9948b7ebac';

function About() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const cacheKey = `film_${id}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                setMovie(JSON.parse(cached));
                setLoading(false);
                return;
            } catch { }
        }

        
        const apis = [
            {
                url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                headers: {
                    'X-API-KEY': '851ad9e5-8041-4065-9b1c-1e9948b7ebac',
                    'Content-Type': 'application/json',
                }
            },
            {
                url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                headers: {
                    'X-API-KEY': '24de35a5-1338-4bfd-a607-290a9ff9e450', 
                    'Content-Type': 'application/json',
                }
            },
           
            {
                url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                headers: {
                    'X-API-KEY': '246e66a2-dbd0-4924-96c7-d78b996e7c60',
                    'Content-Type': 'application/json',
                }
            },
            {
                url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                headers: {
                    'X-API-KEY': '123fa0e0-c556-48aa-b69b-d958d1d052e4',
                    'Content-Type': 'application/json',
                }
            },
            {
                url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                headers: {
                    'X-API-KEY': '31bf3fdc-d4cb-41ae-abf1-72636617caa3',
                    'Content-Type': 'application/json',
                }
            },
            
        ];

        (async () => {
            let lastError = null;
            for (const api of apis) {
                try {
                    const res = await fetch(api.url, { headers: api.headers });
                    if (!res.ok) throw new Error('Ошибка загрузки');
                    const data = await res.json();
                    setMovie(data);
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                    setLoading(false);
                    return;
                } catch (err) {
                    lastError = err;
                }
            }
            setError(lastError ? lastError.message : 'Не удалось загрузить данные');
            setLoading(false);
        })();
    }, [id]);

    useEffect(() => {
        if (!movie) return;
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favs.some(f => f.kinopoiskId === movie.kinopoiskId));
    }, [movie]);

    const handleFavorite = () => {
        if (!movie) return;
        let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            favs = favs.filter(f => f.kinopoiskId !== movie.kinopoiskId);
            setToast({ isVisible: true, message: 'Удалено из избранных', type: 'info' });
        } else {
            favs.unshift({
                kinopoiskId: movie.kinopoiskId,
                nameRu: movie.nameRu,
                nameOriginal: movie.nameOriginal,
                posterUrl: movie.posterUrl,
                ratingKinopoisk: movie.ratingKinopoisk,
            });
            setToast({ isVisible: true, message: 'Добавлено в избранные', type: 'success' });
        }
        localStorage.setItem('favorites', JSON.stringify(favs.slice(0, 30)));
        setIsFavorite(!isFavorite);
    };

    const closeToast = () => {
        setToast({ ...toast, isVisible: false });
    };

    if (loading) return <div className="aboutPage"><p>Загрузка...</p></div>;
    if (error) return <div className="aboutPage"><p>Ошибка: {error}</p></div>;
    if (!movie) return null;

    const handleWatch = () => {
        if (!movie) return;
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        if (!history.find(f => f.kinopoiskId === movie.kinopoiskId)) {
            const film = {
                kinopoiskId: movie.kinopoiskId,
                nameRu: movie.nameRu,
                nameOriginal: movie.nameOriginal,
                posterUrl: movie.posterUrl,
                ratingKinopoisk: movie.ratingKinopoisk,
            };
            history.unshift(film);
            localStorage.setItem('history', JSON.stringify(history.slice(0, 30)));
        }
        navigate(`/watch/${movie.kinopoiskId}`);
    };

    return (
        <div className='aboutPage' >
            
            <Not />
            <Toast 
                message={toast.message} 
                type={toast.type} 
                isVisible={toast.isVisible} 
                onClose={closeToast} 
            />
            <div className="name">
                <div className="poster">
                    <img src={movie.posterUrl || movie.posterUrlPreview} alt={movie.nameRu || "Постер"} />
                </div>
                <div className="text-about">
                    <div className="text-about-text">
                        <h1 className='ruName'>{movie.nameRu || movie.nameOriginal || '-'}</h1>
                        <p className='origName'>{movie.nameOriginal || ''} <span>{movie.ratingAgeLimits ? movie.ratingAgeLimits.replace('age', '') + '+' : '0+'}</span></p>
                        <p className='origName raiting-min'>{
                        movie.ratingKinopoisk !== undefined && movie.ratingKinopoisk !== null
                            ? Number(movie.ratingKinopoisk).toFixed(1)
                            : '0.0'
                    }<span className='raiting-span'><IoIosStar /></span></p>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '35px 0' }}>
                            <button className="watch" onClick={handleWatch}>Смотреть</button>
                            <button className="favorite-btn" onClick={handleFavorite} title={isFavorite ? 'Убрать из избранного' : 'В избранное'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 8px 0 8px' }}>
                                {isFavorite ? <FaBookmark size={24} color="#ffffffff" /> : <FaRegBookmark size={24} color="#fff" />}
                            </button>
                        </div>
                    </div>

                    <div className="about-film">
                        <h2>О фильме</h2>
                        <ul className="list about-list">
                          <li><span className="about-label">Год производства</span><span className="about-value">{movie.year || '-'}</span></li>
                          <li><span className="about-label">Страна</span><span className="about-value ellipsis-list">{movie.countries && movie.countries.length > 0 ? movie.countries.map(c => c.country).join(', ') : '-'}</span></li>
                          <li><span className="about-label">Жанр</span><span className="about-value ellipsis-list">{movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.genre).join(', ') : '-'}</span></li>
                          <li><span className="about-label">Слоган</span><span className="about-value">{movie.slogan ? movie.slogan : '-'}</span></li>
                          <li><span className="about-label">Возраст</span><span className="about-value age">{movie.ratingAgeLimits ? movie.ratingAgeLimits.replace('age', '') + '+' : '0+'}</span></li>
                        </ul>
                        <h2 style={{marginTop: '40px'}}>Описание</h2>
                        <p className='desc'>{movie.shortDescription || '-'}</p>
                        <p className='desc'>{movie.description || '-'}</p>
                    </div>
                </div>
                <p className='raiting'>{
                    movie.ratingKinopoisk !== undefined && movie.ratingKinopoisk !== null
                        ? Number(movie.ratingKinopoisk).toFixed(1)
                        : '0.0'
                }<span className='raiting-span'><IoIosStar /></span></p>
            </div>
            <Not />
        </div>
    );
}

export default About;
