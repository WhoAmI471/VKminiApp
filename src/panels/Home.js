import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Button, Group, Div, Text} from '@vkontakte/vkui';

import './Home.css';
import myImage from '../img/Logo.svg';
import backMes from '../img/BackMessage.svg';



const Home = ({ id, go}) =>   {

	const [data, setData] = useState(null);
	
	useEffect(() => {
		fetch('/api')
		.then(response => response.json())
		.then(response => setData(response[0]['message']))
	}, []);

	return (
		<div id={id}>
			<div></div>
			<Div className='main'>
				<img className='main-img' src={myImage}/>
				<Div className='main-message'>
					<img className='message-img' src={backMes}/>
					<Text className='message-text'>Правильно составленный рацион пищи улучшает качество и продолжительность жизни</Text>
				</Div>
			</Div>
			<Div>{
				!data ? "Loading..." : data
				}</Div>
			<Group className='bottom-buttons'>
				<Button 
					className='frt-btn' 
					stretched={true} 
					appearance=''
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
					Далее
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
