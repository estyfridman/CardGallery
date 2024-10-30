import { useState, useEffect } from 'react';
import Card from './Card';
import { getAllCards, createCard, deleteCard, patchCardField } from '../Services/cardService';

function CardGallery() {
    const [cards, setCards] = useState([]);

    async function renderData(){
        try { setCards(await getAllCards());
        } catch (err) {
            console.log('Error fetching data:', err);
        }
    }
    
    useEffect(() => {
        renderData();
    }, []);

    async function handleAddCard(){
        try {
            const cardToAdd = {color: '#CDC1FF', text: 'Add Text'}
            await createCard(cardToAdd );
            renderData()
        } catch (err) {
            console.log('Error adding card:', err);
        }
    };

    async function handleDeleteCard(cardId){
        try {
            await deleteCard(cardId);
            await renderData();
        } catch (err) {
            console.log('Error deleting card:', err);
        }
    };

    async function updateCardField(id, dataToUpdate){
        try {
            await patchCardField(id, dataToUpdate);
            await renderData();
        } catch (err) {
            console.log('Error updating card:', err);
        }
    };
    
    return (
      <div className='gallery-page'>

        {cards.map(card => {
            return (
                <div className='cards-container' key={card.id} >
                    <Card key={card.id} cardObject={card} deleteCard={handleDeleteCard} changeField={updateCardField}/>
                </div>
            )
        })}

        <button onClick={handleAddCard} className='add-card-button'> + Add Card </button>

      </div>
    );
  }
  
  export default CardGallery;