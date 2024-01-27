// MultipleRangeSliders.js
import React, { useState } from 'react';
// import './MultipleRangeSliders.css';

const MultipleRangeSliders = () => {
    const [sliderValues, setSliderValues] = useState({
        slider1: 0,
        slider2: 0,
        slider3: 0,
        slider4: 0,
        slider5: 0,
    });

    const handleSliderChange = (sliderName, event) => {
        setSliderValues({
            ...sliderValues,
            [sliderName]: parseInt(event.target.value, 10),
        });
    };

    return (
        <div className="multiple-range-sliders">
            <h2>Multiple Range Sliders</h2>
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="slider-container">
                    <label htmlFor={`slider${index}`}>{`Slider ${index}:`}</label>
                    <input
                        type="range"
                        id={`slider${index}`}
                        min={-5}
                        max={5}
                        step={1}
                        value={sliderValues[`slider${index}`]}
                        onChange={(e) => handleSliderChange(`slider${index}`, e)}
                    />
                    <span>{sliderValues[`slider${index}`]}</span>
                </div>
            ))}
        </div>
    );
};

export default MultipleRangeSliders;



