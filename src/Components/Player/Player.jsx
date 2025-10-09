import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Player.css';
import Not from '../Not';

function Player() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        (async () => {
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
                        headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' }
                    });
                    if (!res.ok) throw new Error('Ошибка загрузки');
                    const data = await res.json();
                    setMovie(data);
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                    setLoading(false);
                    return;
                } catch (e) {
                    lastErr = e;
                }
            }
            setError(lastErr ? lastErr.message : 'Не удалось загрузить данные');
            setLoading(false);
        })();
    }, [id]);

    if (loading) return <div className="player-page"><p>Загрузка...</p></div>;
    if (error) return <div className="player-page"><p>Ошибка: {error}</p></div>;
    if (!movie) return null;

    return (
        <div className='player-page'>
            <h1 className='player-film-name'>{movie.nameRu || movie.nameOriginal || '-'} • ({movie.year || ''} г.)</h1>
            <iframe
                src={`https://ddbb.lol/?id=${id}&n=0`}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                title="Player"
                className='player-iframe'
            ></iframe>
            <div className="player-info" style={{marginTop: '40px'}}>
                <h2 className='player-film-about'>Описание</h2>
                <p className='player-film-p' style={{color:'#cacaca'}}>{movie.year || '-'} • {movie.countries && movie.countries.length > 0 ? movie.countries.map(c => c.country).join(', ') : '-'} • {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.genre).join(', ') : '-'}</p>
                <p className='player-film-p' style={{marginTop:'10px', fontStyle:'italic', color:'#bdbdbd'}}>{movie.slogan ? `«${movie.slogan}»` : ''}</p>
                <p className='player-film-p' style={{marginTop:'10px'}}><b>Возраст:</b> <span className='age'style={{marginLeft : '5px'}}>{movie.ratingAgeLimits ? movie.ratingAgeLimits.replace('age', '') + '+' : '0+'}</span></p>
                <p className='player-film-p' style={{marginTop: '15px'}}>{movie.shortDescription || ''}</p>
                <p className='player-film-p' style={{marginTop: '10px'}}>{movie.description || ''}</p>
            </div>
            <Not />
        </div>
    );
}

export default Player;
