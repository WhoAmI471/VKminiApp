import React, { useState } from 'react';

import { Gallery, Tappable, Text, Button } from '@vkontakte/vkui';
import { Icon16DeleteOutline } from '@vkontakte/icons';

import './AffairItem.css';

const AffiarPost = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
      setIsExpanded(!isExpanded);
    };

    return ( 
        <Tappable className='card' onClick={handleCardClick}>
            <div className='card-container'>
                <div className={`card-content ${isExpanded ? 'expanded' : ''}`}>
                    <p className='card-header'>{props.post.category[0]} | {props.post.duration} <span className='card-affair'>{props.post.affair} </span></p>
                </div>

                <button 
                    className='btn-del' 
                    onClick={() => props.remove(props.post)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Icon16DeleteOutline fill={!isHovered ? '#00AA9F' : '#FFFFFF'} />
                </button>
            </div>
        </Tappable>

    );
}


export default AffiarPost;