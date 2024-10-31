import { useState } from 'react';
import ColorPalette from './ColorPalette';

function Card({cardObject, deleteCard, changeField}){
    const [localCardText, setLocalCardText] = useState('');
    const [isPaletteDisplay, setIsPaletteDisplay] = useState(true);

    function changeDisplayColorSchema(){
        setIsPaletteDisplay(!isPaletteDisplay);
    };

    function colorSelection(selectedColor){
        changeField(cardObject.id, {color: selectedColor});
    };

    return (
        <div className='card' style={{ backgroundColor: cardObject.color }}>
            <input type='text'
                value={localCardText}
                placeholder={cardObject.text}
                onChange={(e) => setLocalCardText(e.target.value)}
            ></input> 
            <div className='buttons'>
                <button onClick={()=>changeDisplayColorSchema()}> <img src="/icons/artist-color-palette-svgrepo-com.svg" alt="Open Color schema"/></button>
                <button onClick={()=>deleteCard(cardObject.id)}><img src="/icons/delete-button-svgrepo-com.svg" alt="delete"/></button>
                <button onClick={()=>changeField(cardObject.id, {text: localCardText})}><img src="/icons/save-svgrepo-com.svg" alt="save"/>text</button>
            </div>
            
            <ColorPalette colorSelection={colorSelection} isDisplay={isPaletteDisplay} changeDisplay={changeDisplayColorSchema}/>
        </div>
    )
}

export default Card;