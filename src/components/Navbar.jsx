import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const pre = 'navbar';
    
    return (
        <nav>
            <div className={`${pre}-logo`}>

            </div>
            <ul>
                <li>
                    <Link to="/home" className={`${pre}-nav-link`}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className={`${pre}-nav-link`}>About</Link>
                </li>
                <li>
                    <Link to="/contact" className={`${pre}-nav-link`}>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;