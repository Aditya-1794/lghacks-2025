import Login from "../components/Login"
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import "./Menu.css";
function Menu() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 300); // Glow disappears after 300ms of no scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div>
      <div className={`menuContainer ${isScrolling ? 'scrolling' : ''}`}>
        <div className='logo'>
            <Link to='/'>
                <img src={logo}></img>
            </Link>
        </div>
        <div className='menuItems'>
                <Link to="/"><h3>Home</h3></Link>
                <Link to="/notes"><h3>Notes</h3></Link>
                <Link to="/search"><h3>Search</h3></Link>
                <Link to="/ai"><h3>AI QnA</h3></Link>
            </div>
            <div className='login'>
                <Login />
            </div>
      </div>
    </div>
  )
}

export default Menu
