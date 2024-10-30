import { useState, useEffect } from 'react';
import Card from './Card';
import { getAllCards, createCard, deleteCard, patchCardField } from '../Services/cardService';


const localcards = [
    { id: '1', text: "Add text to the first card", color: "#BFECFF" },
    { id: '2', text: "Add text to the second card", color: "#CDC1FF" },
    { id: '3', text: "Add text to the third card", color: "#FFF6E3" },
    { id: '4', text: "Add text to the fourth card", color: "#FFCCEA" },
    { id: '5', text: "Add text to the fiftt card", color: "#D76C82" }
];

function CardGallery() {
    const [cards, setCards] = useState(localcards);

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
      <button onClick={handleAddCard} className='add-card-button'> + Add Card </button>

        {cards.map(card => {
          return (
                <div className='cards-container' key={card.id} >
                    <Card key={card.id} cardObject={card} deleteCard={handleDeleteCard} changeField={updateCardField}/>
                </div>
          )
        })}
      </div>
    );
  }
  
  export default CardGallery;