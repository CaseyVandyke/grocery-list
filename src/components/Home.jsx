import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReward } from 'react-rewards';
import '../styles/home.scss';

const Home = () => {
    const [groceryItem, setGroceryItem] = useState('');
    const [groceryList, setGroceryList] = useState([]);
    const [crossedOffItems, setCrossedOffItems] = useState([]);
    const { reward: confettiReward, isAnimating: isConfettiAnimating } = useReward('confettiReward', 'confetti');
    const inputRef = useRef(null);
    const pre = 'grocery';

    useEffect(() => {
        axios.get('http://localhost:3000/grocery-items')
            .then(response => setGroceryList(response.data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groceryItem) {
            // Check if item already exists in the list
            const existingItem = groceryList.find(item => item.name.toLowerCase() === groceryItem.trim().toLowerCase());
            if (!existingItem) {
                axios.post('http://localhost:3000/grocery-items', { name: groceryItem.trim(), quantity: 1 })
                    .then(response => {
                        setGroceryList([...groceryList, response.data]);
                        setGroceryItem('');
                        inputRef.current.focus();
                    })
                    .catch(error => console.error('Error adding item:', error));
            } else {
                console.error('Item already exists');
            }
        }
    };

    const handleItemClick = (id) => {
        setCrossedOffItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((itemId) => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3000/grocery-items/${id}`)
            .then(() => {
                setGroceryList(groceryList.filter(item => item.id !== id));
                setCrossedOffItems(crossedOffItems.filter(itemId => itemId !== id));
            })
            .catch(error => console.error('Error deleting item:', error));
    };

    const crossedOutStyle = {
        textDecoration: 'line-through',
        textDecorationColor: 'red',
        textDecorationThickness: '3px'
    };

    return (
        <section className={`${pre}-container`}>
            <h1>Grocery List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={groceryItem}
                    onChange={(e) => setGroceryItem(e.target.value)}
                    placeholder='Enter grocery item...'
                    className={`${pre}-input`}
                    ref={inputRef}
                    required
                />
                <button className={`${pre}-add-btn`} type="submit">Add Item</button>
            </form>
            <ul className={`${pre}-list`}>
                {groceryList.map((g) => (
                    <div className={`${pre}-item-container`} key={g.id}>
                        <li onClick={() => handleItemClick(g.id)} className={`${pre}-item`} style={crossedOffItems.includes(g.id) ? crossedOutStyle : {}}>{g.name}</li>
                        <button onClick={() => { confettiReward(); handleItemClick(g.id); deleteItem(g.id); }}>Check</button>
                    </div>
                ))}
            </ul>
            <span className={`${pre}-confetti`} id="confettiReward" />
        </section>
    );
};

export default Home;
