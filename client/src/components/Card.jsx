import { useState } from 'react';
import ColorPalette from './ColorPalette';

function Card({cardObject, deleteCard, changeField}){
    const [localCardColor, setLocalCardColor] = useState('');
    const [localCardText, setLocalCardText] = useState('');
    const [colorSchemaStyle, setColorSchemaStyle] = useState('displayColorSchema');

    function changeDisplayColorSchema(){
        (colorSchemaStyle === 'hideColorSchema' ? setColorSchemaStyle('displayColorSchema') : setColorSchemaStyle('hideColorSchema'));
    };

    function colorSelection(){
        setLocalCardColor(localCardColor);
    };

    return (
        <div className='card' style={{ backgroundColor: cardObject.color }}>
            <input type='text'
                value=''
                placeholder={cardObject.text}
                onChange={(e) => setLocalCardText(e.target.value)}
            ></input> 
            <div className='buttons'>
                <button onClick={()=>changeDisplayColorSchema()}> <img src="/icons/artist-color-palette-svgrepo-com.svg" alt="Open Color schema"/></button>
                <button onClick={()=>deleteCard(cardObject.id)}><img src="/icons/delete-button-svgrepo-com.svg" alt="delete"/></button>
                <button onClick={()=>changeField(cardObject.id, {text: localCardText})}><img src="/icons/save-svgrepo-com.svg" alt="save"/>save text</button>
            </div>
            
            <ColorPalette colorSelection={colorSelection} cardId={cardObject.id} className={colorSchemaStyle}/>
        </div>
    )
}

export default Card;