import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GroceryItem, sequelize } from './models/groceryItems.mjs';

const app = express();
app.use(bodyParser.json());
app.use(cors());

(async () => {
    try {
        await sequelize.sync();  // Sync without force

        console.log('Database synchronized');

        app.post('/grocery-items', async (req, res) => {
            const { name, quantity } = req.body;
            const item = await GroceryItem.create({ name, quantity });
            res.json(item);
        });

        app.get('/grocery-items', async (req, res) => {
            const items = await GroceryItem.findAll();
            res.json(items);
        });

        app.put('/grocery-items/:id', async (req, res) => {
            const { id } = req.params;
            const { name, quantity } = req.body;
            const item = await GroceryItem.findByPk(id);
            if (item) {
                item.name = name;
                item.quantity = quantity;
                await item.save();
                res.json(item);
            } else {
                res.status(404).send('Item not found');
            }
        });

        app.delete('/grocery-items/:id', async (req, res) => {
            const { id } = req.params;
            const item = await GroceryItem.findByPk(id);
            if (item) {
                await item.destroy();
                res.json({ message: 'Item deleted' });
            } else {
                res.status(404).send('Item not found');
            }
        });

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error initializing database:', error);
    }
})();
