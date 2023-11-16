import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Panel, Button, ButtonGroup, Header, Div, Text} from '@vkontakte/vkui';

import './Timer.css';

const Timer = ({ id, go, affair, category, setDuration, isTimerActive, setIsTimerActive}) =>   { 
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 59) {
                    setSeconds(0);
                    if (minutes === 59) {
                        setMinutes(0);
                        setHours(prevHours => prevHours + 1);
                    } else {
                        setMinutes(prevMinutes => prevMinutes + 1);
                    }
                } else {
                    setSeconds(prevSeconds => prevSeconds + 1);
                }
            }, 1000);
        } else {
        clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, hours, minutes, seconds]);

    

    const handleReset = e => {
        setDuration(hours + " " + minutes + " " +seconds); 
        setIsTimerActive(true);
        go(e);
    };

    const resetTime = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsActive(false);
    };

	return (
		<div id={id} className='timer'>
            
            <div className='timer-header'>
                <p className='timer-affair'>{affair}</p>
                <p className='timer-category'>{category}</p>
                <p className='timer-time'>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')},{seconds.toString().padStart(2, '0')}</p>
            </div>
            <ButtonGroup>
                <button 
                    className='timer-btn btn-reset' 
                    onClick={() => resetTime()}
                >
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className='btn-reset' width="70" height="70" rx="35" fill="#B5B5B5"/>
                        <circle cx="35" cy="35" r="14.5" stroke="white"/>
                        <path d="M17.0263 37.5326L20.8047 35.1259L23.8213 33.3102L27.1262 38.6287L20.3313 42.8511L17.0263 37.5326Z" fill="#B5B5B5"/>
                        <path d="M23.5046 32.9999L21.0039 35L21.0279 32.9976L23.5046 32.9999Z" fill="white"/>
                    </svg>

                </button>
                <button 
                    className='timer-btn' 
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? 
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="70" height="70" rx="35" fill="#00AA9F"/>
                            <path d="M28 23L28 47" stroke="white" stroke-width="5" stroke-linecap="round"/>
                            <path d="M42 23L42 47" stroke="white" stroke-width="5" stroke-linecap="round"/>
                        </svg>                        
                    : 
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="70" height="70" rx="35" fill="#00AA9F"/>
                            <path d="M24.3229 23.6535C24.3192 21.0051 27.1445 19.3122 29.4781 20.5647L50.1318 31.6496C52.5261 32.9347 52.6065 36.3392 50.2755 37.7359L29.655 50.0912C27.324 51.4879 24.3599 49.8112 24.3561 47.0939L24.3229 23.6535Z" fill="white"/>
                        </svg>
                    }
                </button>

                <button 
                    className='timer-btn btn-write' 
                    onClick={(e) => handleReset(e)}
                    data-to='affairs'
                >
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="70" height="70" rx="35" fill="#B5B5B5"/>
                        <rect x="21" y="21" width="28" height="28" fill="white"/>
                    </svg>

                </button>
            </ButtonGroup>
		</div>
	)
};

Timer.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
    addNewAffair: PropTypes.func.isRequired,
};

export default Timer;
