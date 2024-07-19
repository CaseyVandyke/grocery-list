import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
    const pre = 'navbar';
    
    return (
        <nav>
            <div className={`${pre}-logo`}>

            </div>
            <ul className={`${pre}-list`}>
                <li>
                    <Link to="/" className={`${pre}-link`}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className={`${pre}-link`}>About</Link>
                </li>
                <li>
                    <Link to="/contact" className={`${pre}-link`}>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;