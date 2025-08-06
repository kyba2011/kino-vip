//
// Panel.jsx
// Компонент боковой панели навигации

import React from 'react'
import { useLocation } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
import { FaHistory } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import './Pannel.css'
import { Link } from 'react-router-dom';
function Panel() {
  const location = useLocation();
  const isFav = location.pathname === '/fav';
  const isHome = location.pathname === '/';
  const isSearch = location.pathname.startsWith('/searched');
  const isHistory = location.pathname.startsWith('/history');
  return (
    <div className='panel'>
      <nav className='panel-menu'>
        <ul>
          <li style={isHome ? {background: 'rgba(255,255,255,0.11)', borderRadius: '50%'} : {}}><Link to={'/'} href=''><FaHouse /></Link></li>
          <li style={isSearch ? {background: 'rgba(255,255,255,0.11)', borderRadius: '50%'} : {}}><Link to={'searched'} className='se'><FaSearch /></Link></li>
          <li style={isHistory ? {background: 'rgba(255,255,255,0.11)',borderRadius: '50%'} : {}}><Link to={'history'} ><FaHistory /></Link></li>
          <li style={isFav ? {background: 'rgba(255,255,255,0.11)',borderRadius: '50%'} : {}}><Link to={'fav'}>
            {isFav ? <FaBookmark className='fa-active' /> : <FaRegBookmark className='fa' />}
          </Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Panel
