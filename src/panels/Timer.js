import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Panel, Button, ButtonGroup, Header, Div, Text} from '@vkontakte/vkui';

import './Timer.css';

const Timer = ({ id, go, affair, category, setDuration, setIsTimerActive}) =>   { 
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

    
    const lasdkjf =(   )=> {} ;

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
                <p className='timer-category'>{category[0]}</p>
                <p className='timer-time'>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')},{seconds.toString().padStart(2, '0')}</p>
            </div>
            <ButtonGroup>
                <button 
                    className='timer-btn btn-reset' 
                    onClick={() => resetTime()}
                >
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="70" height="70" rx="35" fill="#B5B5B5"/>
                        <path d="M13.3322 38.82C13.2846 38.571 13.287 38.315 13.3393 38.0669C13.3915 37.8188 13.4926 37.5836 13.6365 37.3749C13.7804 37.1662 13.9644 36.9882 14.1778 36.8512C14.3911 36.7143 14.6295 36.6211 14.8792 36.577C15.1289 36.533 15.3848 36.539 15.6321 36.5948C15.8795 36.6505 16.1132 36.7549 16.3199 36.9018C16.5265 37.0486 16.7019 37.2351 16.8359 37.4504C16.9698 37.6656 17.0596 37.9054 17.1001 38.1556C18.847 48.0627 28.2467 54.6445 38.1537 52.8976C48.0607 51.1507 54.6425 41.751 52.8956 31.8439C51.1487 21.9369 41.749 15.3551 31.842 17.102C26.6839 18.0115 22.4363 21.0022 19.7869 25.0553L23.4187 24.4149C23.6677 24.3673 23.9237 24.3698 24.1718 24.422C24.4199 24.4743 24.6551 24.5753 24.8638 24.7192C25.0725 24.8632 25.2505 25.0472 25.3875 25.2605C25.5245 25.4738 25.6177 25.7123 25.6617 25.962C25.7057 26.2116 25.6997 26.4676 25.6439 26.7149C25.5882 26.9622 25.4839 27.196 25.337 27.4026C25.1901 27.6093 25.0036 27.7847 24.7884 27.9186C24.5731 28.0525 24.3334 28.1424 24.0831 28.1829L13.7213 30.0099L11.8942 19.648C11.8466 19.399 11.849 19.143 11.9013 18.8949C11.9535 18.6468 12.0546 18.4116 12.1985 18.2029C12.3424 17.9942 12.5264 17.8162 12.7398 17.6792C12.9531 17.5423 13.1915 17.4491 13.4412 17.405C13.6909 17.361 13.9468 17.367 14.1941 17.4228C14.4415 17.4785 14.6752 17.5829 14.8819 17.7298C15.0885 17.8767 15.2639 18.0631 15.3979 18.2784C15.5318 18.4936 15.6216 18.7334 15.6621 18.9836L16.4138 23.2465C19.6119 18.1966 24.8402 14.4515 31.1776 13.334C43.1209 11.2281 54.5576 19.2362 56.6635 31.1795C58.7695 43.1229 50.7614 54.5596 38.8181 56.6656C26.8748 58.7715 15.4381 50.7634 13.3322 38.82Z" fill="black"/>
                        <path d="M13.3322 38.82C13.2846 38.571 13.287 38.315 13.3393 38.0669C13.3915 37.8188 13.4926 37.5836 13.6365 37.3749C13.7804 37.1662 13.9644 36.9882 14.1778 36.8512C14.3911 36.7143 14.6295 36.6211 14.8792 36.577C15.1289 36.533 15.3848 36.539 15.6321 36.5948C15.8795 36.6505 16.1132 36.7549 16.3199 36.9018C16.5265 37.0486 16.7019 37.2351 16.8359 37.4504C16.9698 37.6656 17.0596 37.9054 17.1001 38.1556C18.847 48.0627 28.2467 54.6445 38.1537 52.8976C48.0607 51.1507 54.6425 41.751 52.8956 31.8439C51.1487 21.9369 41.749 15.3551 31.842 17.102C26.6839 18.0115 22.4363 21.0022 19.7869 25.0553L23.4187 24.4149C23.6677 24.3673 23.9237 24.3698 24.1718 24.422C24.4199 24.4743 24.6551 24.5753 24.8638 24.7192C25.0725 24.8632 25.2505 25.0472 25.3875 25.2605C25.5245 25.4738 25.6177 25.7123 25.6617 25.962C25.7057 26.2116 25.6997 26.4676 25.6439 26.7149C25.5882 26.9622 25.4839 27.196 25.337 27.4026C25.1901 27.6093 25.0036 27.7847 24.7884 27.9186C24.5731 28.0525 24.3334 28.1424 24.0831 28.1829L13.7213 30.0099L11.8942 19.648C11.8466 19.399 11.849 19.143 11.9013 18.8949C11.9535 18.6468 12.0546 18.4116 12.1985 18.2029C12.3424 17.9942 12.5264 17.8162 12.7398 17.6792C12.9531 17.5423 13.1915 17.4491 13.4412 17.405C13.6909 17.361 13.9468 17.367 14.1941 17.4228C14.4415 17.4785 14.6752 17.5829 14.8819 17.7298C15.0885 17.8767 15.2639 18.0631 15.3979 18.2784C15.5318 18.4936 15.6216 18.7334 15.6621 18.9836L16.4138 23.2465C19.6119 18.1966 24.8402 14.4515 31.1776 13.334C43.1209 11.2281 54.5576 19.2362 56.6635 31.1795C58.7695 43.1229 50.7614 54.5596 38.8181 56.6656C26.8748 58.7715 15.4381 50.7634 13.3322 38.82Z" fill="white"/>
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
                    onClick={(hours == 0) && (minutes == 0) && (seconds == 0) ? (go) : ((e) => handleReset(e))}
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
