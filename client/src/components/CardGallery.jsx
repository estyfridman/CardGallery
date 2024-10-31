import { useState, useEffect } from 'react';
import Card from './Card';
import { getAllCards, createCard, deleteCard, patchCardField } from '../Services/cardService';
import LoadingAnim from './LoadingAnim';

function CardGallery() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
  
    async function renderData(){
        try { setCards(await getAllCards());
        } catch (err) {
            console.log('Error fetching data:', err);
            setError(err);
        }
    }
    
    useEffect(() => {
        setIsLoading(true);
        try { renderData();
        } catch (err) { setError(err);
        } finally { setIsLoading(false); }
    }, []);

    async function handleAddCard(){
        try {
            const cardToAdd = {color: '#CDC1FF', text: 'Add Text'}
            const updatedCards = await createCard(cardToAdd);
            setCards(updatedCards);
        } catch (err) {
            console.log('Error adding card:', err);
            setError(err);
        }
    };

    async function handleDeleteCard(cardId){
        try {
            const updatedCards = await deleteCard(cardId);
            setCards(updatedCards);
        } catch (err) {
            console.log('Error deleting card:', err);
            setError(err);
        }
    };

    async function updateCardField(id, dataToUpdate){
        try {
            const updatedCards = await patchCardField(id, dataToUpdate);
            setCards(updatedCards);
        } catch (err) {
            console.log('Error updating card:', err);
            setError(err);
        }
    };
    
    return (
      <div className='gallery-page'>
        {isLoading ? (
            <LoadingAnim/>
        ) : error ? (
            <p>Error fetching cards: {error.message}</p>
        ) : (
            <>
            {cards?.map(card => {
                return (
                    <div className='cards-container' key={card.id} >
                        <Card key={card.id} cardObject={card} deleteCard={handleDeleteCard} changeField={updateCardField}/>
                    </div>
                )
            })}
            <button onClick={handleAddCard} className='add-card-button'> + Add Card </button>
            </>        
        )}
      </div>
    );
  }
  
  export default CardGallery;