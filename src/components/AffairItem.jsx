import React, { useState } from 'react';

import { Gallery, Tappable, Text, Button } from '@vkontakte/vkui';
import { Icon16DeleteOutline } from '@vkontakte/icons';

import './AffairItem.css';

const AffiarPost = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return ( 
        <Tappable className='card'>
            <div className='card-container'>
                <p className='card-header'>{props.post.category} | {props.post.duration} <span className='card-affair'>{props.post.affair}</span></p>
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