import React, { useState } from "react";

const colors = [
    '#BFECFF',
    '#CDC1FF',
    '#FFF6E3',
    '#FFCCEA',
];

function ColorPalette({ colorSelection, cardId }) {
    const [isDisplay, setIsDisplay] = useState(false);

    function hundleChangeColor(color) {
        colorSelection(cardId, color);
        setIsDisplay(false);
    };

    function closePalette() {
        setIsDisplay(false);
    }

    return (
        <div>
            {isDisplay && (
                <div>
                    <button onClick={() => closePalette()}>X</button>
                    <div >
                        {colors.map((color, index) => (
                            <button key={index} onClick={() => hundleChangeColor(color)}>
                                <div className="color" style={{ backgroundColor: color }}></div>
                            </button>
                        ))}
                    </div>
                </div>)}
        </div>
    );
}

export default ColorPalette;