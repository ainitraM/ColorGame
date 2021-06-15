import React, {Component, useEffect, useState} from 'react';
import './Timer.css';


const Timer = (props) => {
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState("");

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter])

    const startGame = () => {
        if(name) {
            setIsActive(true);
            props.handleInput(name);
        }
    }

    const handleNameInput = e => {
        setName(e.target.value);
    };

    return (
        <div className="container">
            <div className="time">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            <h1>Whats your name?</h1>
            <div className="buttons">
                <input
                    className="login"
                    type="name"
                    onChange={handleNameInput}
                />
                <button onClick={startGame} className="start">Start</button>
            </div>
        </div>
    )
};

export default Timer;