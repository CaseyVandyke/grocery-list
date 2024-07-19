import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.scss';

const App = () => {
	const pre = 'app';

	return (
		<Router basename={"/grocery-list/"}>
			<main className={`${pre}-container`}>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</main>
		</Router>
	);
};

export default App;
