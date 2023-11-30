import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Button, Group, Div, Text} from '@vkontakte/vkui';

import './Home.css';
import myImage from '../img/Logo.svg';
import backMes from '../img/BackMessage.svg';



const Home = ({ id, go, userId, advice, setAdvice }) =>   {


	const nextAdvice = () => {
		fetch(`/getNextAdvice?userId=${userId.id}`)
		.then(response => response.json())
		.then(response => {
			console.log("MESSAGE:------" + response);
			setAdvice(response);
		});
	}

	return (
		<div id={id}>
			<div></div>
			<Div className='main'>
				<img className='main-img' src={myImage}/>
				<Div className='main-message'>
					<div className='triangle'></div>
					<div className='message-bacground'>
						<p className='message-text'>{advice}</p>
					</div>
				</Div>
			</Div>
			<Group className='bottom-buttons'>
				<Button 
					className='frt-btn' 
					stretched={true} 
					appearance=''
					onClick={() => nextAdvice()}
				>
					<span className='text-btn' >Показать еще</span> 2 р.
				</Button>

				<Button 
					className='scd-btn' 
					stretched={true} 
					appearance='' 
					onClick={go}
					data-to='mainHome'
				>
					На главную
				</Button>
			</Group>
		</div>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
