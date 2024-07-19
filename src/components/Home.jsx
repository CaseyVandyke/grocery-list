import React, { useState, useRef } from 'react';
import { useReward } from 'react-rewards';
import '../styles/home.scss';

const Home = () => {
    const [groceryItem, setGroceryItem] = useState('');
    const [groceryList, setGroceryList] = useState([]);
    const [crossedOffItems, setCrossedOffItems] = useState([]);
    const { reward: confettiReward, isAnimating: isConfettiAnimating } = useReward('confettiReward', 'confetti');
    const inputRef = useRef(null);
    const pre = 'grocery';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groceryItem) {
            setGroceryList([...groceryList, groceryItem.trim()]);
            setGroceryItem('');
            inputRef.current.focus();
        }
        
    }

    const handleItemClick = (index) => {
        // Update the state of crossedOffIndices
        setCrossedOffItems((prev) => {
            // Check if the clicked index is already in the crossedOffIndices array
            if (prev.includes(index)) {
                // If the index is already crossed off, remove it from the array
                // Use the filter method to create a new array without the clicked index
                return prev.filter((i) => i !== index);
            } else {
                // If the index is not crossed off, add it to the array
                // Use the spread operator to create a new array with the clicked index added
                return [...prev, index];
            }
        });
    };

    const crossedOutStyle = {
        textDecoration: 'line-through',
        textDecorationColor: 'red',
        textDecorationThickness: '3px'
    }

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
                <button className={`${pre}-add-btn`}type="submit">Add Item</button>
            </form>
            <ul className={`${pre}-list`}>
                {groceryList.map((g, i) => {
                    return (
                        <div className={`${pre}-item-container`}>
                            <li onClick={() => handleItemClick(i)} className={`${pre}-item`} key={i} style={crossedOffItems.includes(i) ? crossedOutStyle : {}}>{g}</li>
                            <button onClick={() => {confettiReward(); handleItemClick(i)}}>Check</button>
                        </div>
                    )
                })}
            </ul>
            <span className={`${pre}-confetti`} id="confettiReward" />
        </section>
    );
};

export default Home;