import express, { json } from 'express';
import cors from 'cors';
import cards from './dump.js';
import { generateUniqqueID } from './serverUtils.js';

const app = express();
const port = 8080;

app.use(cors());
app.use(json());

//testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/cards', (req, res) => {
    res.json(cards);
});

app.post('/cards', (req, res) => {
    const newCard = { 
        id: generateUniqqueID(),
        color: req.body.color,
        text: req.body.text,
    };
    cards.push(newCard);
    res.json(newCard);
});

app.put('/cards/:id', (req, res) => {
    const id = req.params.id;
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      cards[cardIndex] = { ...cards[cardIndex], ...req.body };
      res.json(cards[cardIndex]);
    } else {
      res.status(404).send('Card not found');
    }
});

app.patch('/cards/:id', (req, res) => {
    const cardIndex = cards.findIndex((c) => c.id === req.params.id);
    if (cardIndex === -1) return res.status(404).send('Card not found');
    const updatedCard = { ...cards[cardIndex], ...req.body };
    cards[cardIndex] = updatedCard;
    res.json(updatedCard);
});

app.delete('/cards/:id', (req, res) => {
    const id = (req.params.id);
    const index = cards.findIndex(card => card.id === id);
    if (index !== -1) {
        cards.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Card not found');
    }
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});