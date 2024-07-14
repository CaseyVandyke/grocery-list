import React, { useState } from 'react';
import '../styles/home.scss';

const Home = () => {
    const [groceryItem, setGroceryItem] = useState('');
    const [groceryList, setGroceryList] = useState([]);
    const pre = 'home';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groceryItem) {
            setGroceryList([...groceryList, groceryItem.trim()]);
            setGroceryItem('');
        }
    }

    const handleChange = () => {

    }

    return (
        <section className={`${pre}-container`}>
            <h1>Grocery List</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value={groceryItem} onChange={(e) => setGroceryItem(e.target.value)} placeholder='Enter grocery item...' className='input' />
                <button type="submit">Add Item</button>
            </form>
            <ul>
                {groceryList.map((g, i) => {
                    return (
                        <li key={i}>{g}</li>
                    )
                })}
            </ul>
        </section>
    );
};

export default Home;