import React from "react";

const colors = [
    '#BFECFF',
    '#CDC1FF',
    '#FFF6E3',
    '#FFCCEA',
];

function ColorPalette({ colorSelection, isDisplay, changeDisplay }) {

    function hundleChangeColor(color) {
        colorSelection(color);
        changeDisplay();
    };

    function closePalette() {
        changeDisplay();
    }

    return (
        <div>
             {isDisplay && ( 
                <div className="palette-container">
                    <button onClick={() => closePalette()}>X</button>
                        {colors.map((color, index) => (
                            <button key={index} onClick={() => hundleChangeColor(color)}>
                                <div className="color" style={{ backgroundColor: color }}></div>
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}

export default ColorPalette;