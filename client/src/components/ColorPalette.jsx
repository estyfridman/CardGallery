import React, { useState } from "react";

const colors = [
    '#BFECFF',
    '#CDC1FF',
    '#FFF6E3',
    '#FFCCEA',
];

function ColorPalette({ colorSelection }) {
    const [isDisplay, setIsDisplay] = useState(true);

    function hundleChangeColor(color) {
        colorSelection(color);
        setIsDisplay(false);
    };

    function closePalette() {
        setIsDisplay(false);
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
                </div>)}
        </div>
    );
}

export default ColorPalette;