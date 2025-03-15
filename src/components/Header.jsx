import { useState, useEffect } from 'react';
import { FaRegSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

export function Header({ sendSearch }) {
    const [search, setSearch] = useState('');
    const [theme, setTheme] = useState('light');
    const [menuActive, setMenuActive] = useState(false);

    let changeSearch = (e) => {
        e.preventDefault();
        sendSearch(search.toLocaleLowerCase());
    };

    const handleSunClick = () => {
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
    };

    const handleMoonClick = () => {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    };

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.menu') && !event.target.closest('.icon-button-menu')) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className={`header ${menuActive ? 'menu-active' : ''}`}>
            <img 
                src="https://e7.pngegg.com/pngimages/173/464/png-clipart-pokemon-ball-pokeball-area-wiki-thumbnail.png" 
                className="logo"
                alt="Pokeball"
            />
            <form className="form" onSubmit={(e) => changeSearch(e)}>
                <input 
                    className='input'
                    type="text" 
                    placeholder="Buscar por nombre o id"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="search-button">Buscar</button> 
            </form>
            <div className="icons">
                {theme === 'dark' ? (
                    <button onClick={handleSunClick} className="icon-button">
                        <FaRegSun size={24} className="icon" />
                    </button>
                ) : (
                    <button onClick={handleMoonClick} className="icon-button">
                        <FaMoon size={24} className="icon" />
                    </button>
                )}
            </div>
            { !menuActive && <>
            <Link to="/genero" className="filter-button hide-on-mobile">Filtrar por Género</Link>
            <Link to="/tipos" className="filter-button hide-on-mobile">Filtrar por Tipos</Link>
            <button className="icon-button-menu icon" onClick={toggleMenu}><FaBars size={24}/></button>
            </>}
            <div className={`menu ${menuActive ? 'active' : ''}`}>
                <button className="close-button icon" onClick={closeMenu}><FaTimes /></button>
                <Link to="/genero" className="filter-button">Filtrar por Género</Link>
                <Link to="/tipos" className="filter-button">Filtrar por Tipos</Link>
            </div>
        </header>
    );
}