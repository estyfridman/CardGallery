import express, { json } from 'express';
import cors from 'cors';
// import Card from './dump.js';

const app = express();
const port = 8080;

app.use(cors());
app.use(json());

const Card = {
    id: 0,
    text: '',
    color: ''
};
  
let cards = [
    { id: 1, text: "Add text to the first card", color: "#BFECFF" },
    { id: 2, text: "Add text to the second card", color: "#CDC1FF" },
    { id: 3, text: "Add text to the third card", color: "#FFF6E3" },
    { id: 4, text: "Add text to the fourth card", color: "#FFCCEA" },
    { id: 5, text: "Add text to the fiftt card", color: "#D76C82" }
];

//testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/cards', (req, res) => {
    res.json(cards);
});

app.get('/cards/:id', (req, res) => {
    const id = req.params.id;
    const card = cards.find(card => card.id === id);
    res.json(cards);
});

function updateDB(array, id, update){
    return array.map(card => {
        if(card.id === id) {
            return {
                ...card,
                ...update 
            };
        }
        return card;
    })
};

app.post('/cards', (req, res) => {
    const newCard = { ...Card, ...req.body, 
        id: cards.length + 1,
        color: '#FFCCEA',
        text: 'Add text',
    };
    cards.push(newCard);
    res.json(newCard);
});

app.put('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cardIndex = cards.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      cards[cardIndex] = { ...cards[cardIndex], ...req.body };
      res.json(cards[cardIndex]);
    } else {
      res.status(404).send('Card not found');
    }
});

app.patch('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let updatedCard = cards.find(c => c.id === id);
    if (!updatedCard) {
      return res.status(404).send('Card id not found');
    }
    updatedCard = {
       ...updatedCard,
       ...req.body
    };
    cards = updateDB(cards, id, updatedCard);
    res.json(updatedCard);
});

app.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(card => card.id === id);
    if (index !== -1) {
        cards.splice(index, 1);
        console.log(cards);
        res.status(204).send();
    } else {
        res.status(404).send('Card not found');
    }
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});