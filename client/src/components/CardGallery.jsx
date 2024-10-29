import { useState, useEffect } from 'react';
import Card from './Card';
import { getAllCards, createCard, deleteCard, patchCardField } from '../Services/cardService';

function CardGallery() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllCards();
                setCards(data);
                console.log('Data fetched successfully:', data);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    
    async function handleAddCard(){
        try {
            const cardToAdd = {color: 'FFF6E3', text: 'Add Text'}
            const newCard = await createCard(cardToAdd );
            setCards([...cards, newCard]);
            console.log('Card added successfully:', newCard);
        } catch (err) {
            console.log('Error adding card:', err);
        }
    };

    async function handleDeleteCard(cardId){
        try {
            await deleteCard(cardId);
            const deletedCards = cards.filter(card => card.id!== cardId);
            console.log('Card deleted successfully:', deletedCards);
        } catch (err) {
            console.log('Error deleting card:', err);
        }
    };

    async function updateCardField(id, dataToUpdate){
        try {
            await patchCardField(id, dataToUpdate);
            const updatedCards = cards.map(card => 
                card.id === id ? { ...card, ...dataToUpdate } : card
            );
            setCards(updatedCards);
            console.log('Card updated successfully:', id, updatedCards);
        } catch (err) {
            console.log('Error updating card:', err);
        }
    };
    
    return (
      <div>
      <button onClick={handleAddCard} > + Add Card </button>

        {cards.map(card => {
          return (
                <div>
                    <Card key={card.id} cardObject={card} deleteCard={handleDeleteCard} changeField={updateCardField}/>
                </div>
          )
        })}
      </div>
    );
  }
  
  export default CardGallery;