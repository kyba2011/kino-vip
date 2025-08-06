//
// Layout.jsx
// Главный компонент-обёртка приложения

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import History from './History/History';
import Panel from './Panel/Panel';
import Not from './Not';
import Hide from './Hide';
import './Loader.css';
import Rec from './Rec/Rec';

function Layout() {
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false); 
      window.scrollTo(0, 0); 
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      {loading ? (
        <div className="loader-wrapper">
          <img src="/logo.png" alt="Logo" className="loader-logo" />
          <div className="progress-bar">
            <div className="progress-bar-fill"></div>
          </div>
        </div>
      ) : (
        <div className="layout">
          <div className={hidden ? "header-hidden" : ""}>
            <Header />
          </div>
          
          <Hide hidden={hidden} setHidden={setHidden} />
          
          <Outlet context={{ hidden }}/>
          
          <History />
          <div className={hidden ? "panel-hidden" : ""}>
            <Panel />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
