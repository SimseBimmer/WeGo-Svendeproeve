import React, { useState } from 'react';
import './FilterComponent.scss';

// image imports:
import fraImg from '../../assets/images/Fra.svg';
import tilImg from '../../assets/images/Til.svg';
import bytImg from '../../assets/images/Byt.svg';

export default function FilterComponent({ onSearch }) {
    // State til input felter
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    // Byt fra og til
    function swapInputs() {
        // Bytter værdierne
        setFromValue(toValue);
        setToValue(fromValue);
    }

    // Søg knap
    function handleSearch(e) {
        e.preventDefault();
        // Kalder evt. callback med værdier
        if (onSearch) onSearch({ from: fromValue, to: toValue });
        // Du kan tilføje filter logik her
        // console.log('Søger efter:', fromValue, toValue);
    }

    return (
        <section id="filterComponent">
            <div id='filterContentContainer'>
                <div className="row">
                    <div className='inputGroup'>
                        <img src={fraImg} alt="fra" />
                        <input
                            id='fromInput'
                            type="text"
                            placeholder='Hvor fra?'
                            value={fromValue}
                            onChange={e => setFromValue(e.target.value)}
                        />
                    </div>
                    <div id='swapIcon' onClick={swapInputs}>
                        <img src={bytImg} alt="byt" />
                    </div>
                </div>
                <div className="row">
                    <div className='inputGroup'>
                        <img src={tilImg} alt="til" />
                        <input
                            id='toInput'
                            type="text"
                            placeholder='Hvor til?'
                            value={toValue}
                            onChange={e => setToValue(e.target.value)}
                        />
                    </div>
                    <div id='submitGroup'>
                        <button id='searchBtn' onClick={handleSearch}>Søg</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
