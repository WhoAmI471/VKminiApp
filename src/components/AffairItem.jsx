import React from 'react';

import { Gallery, Tappable, Text, Button } from '@vkontakte/vkui';

import './AffairItem.css';

const AffiarPost = (props) => {

    return ( 
        <Tappable className='card'>
            <div className='card-container'>
                <Button onClick={() => props.remove(props.post)}>удалить</Button>
                <Text className='emoji'>{props.post.emoji}</Text>
                <div className='card-content'>
                    <Text className='card-header'>{props.post.category} | Time</Text>
                    <Text className='card-affair'>{props.post.affair}</Text>
                </div>
            </div>
            {/* <Gallery slideWidth="90%" align="right">
                <div
                style={{
                    height: 150,
                    backgroundColor: 'var(--vkui--color_background_negative)',
                }}
                />
                <div style={{ backgroundColor: 'var(--vkui--color_background_positive)' }} />
                <div style={{ backgroundColor: 'var(--vkui--color_background_accent)' }} />
            </Gallery> */}
        </Tappable>

    );
}


export default AffiarPost;