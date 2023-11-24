import React, { useState } from 'react';

import { Gallery, Tappable, Text, Button } from '@vkontakte/vkui';
import { Icon16DeleteOutline } from '@vkontakte/icons';

import '../Affairs/AffairItem.css';

const AffairDiagramItem = (props) => {
    
    
    const formattedUserAffairs = () => {
        const timerUnit = ['ч.', 'мин.', 'с.'];
        const duration = props.post['duration'];
    
        const formatSeconds = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
    
            let formattedTime = '';
            if (hours > 0) {
                formattedTime += `${hours} ${timerUnit[0]}` ;
            }
            if (minutes > 0) {
                formattedTime += ` ${minutes} ${timerUnit[1]}` ;
            }
            if (remainingSeconds > 0) {
                formattedTime += ` ${remainingSeconds} ${timerUnit[2]}`;
            }
    
            return formattedTime.trim();
        };
    
        const formattedDuration = formatSeconds(duration);
    
        return formattedDuration;
    };

    return ( 
        <Tappable className='card-diagram'>
            <div className='card-container'>
                <p className='card-header-diagram'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.1187 8.6126C17.1187 13.3398 13.2866 17.172 8.55937 17.172C3.83216 17.172 0 13.3398 0 8.6126C0 3.88539 3.83216 0.0532227 8.55937 0.0532227C13.2866 0.0532227 17.1187 3.88539 17.1187 8.6126Z" fill={props.post['color']}/>
                    </svg> 
                    {props.postKey.substr(2)} | {formattedUserAffairs()}
                </p>
            </div>
        </Tappable>

    );
}


export default AffairDiagramItem;