import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Group, ButtonGroup, Button, Calendar, Panel, PanelHeader, PanelHeaderBack, Text } from '@vkontakte/vkui';
import { Icon28AddOutline, Icon28WriteSquareOutline } from '@vkontakte/icons';
import './Affairs.css';

import AffiarList from '../components/AffairList';
import AffairModal from '../components/AffairModal';

const Affairs = props => {

	const [modalOpened, setModalOpened] = useState('');

	const closeModal = () => {
		setModalOpened('');
	}
	
	const [value, setValue] = useState(() => new Date());


	const removeAffair = (affair) => {
		props.setUserAffairs(props.userAffairs.filter(a => a.id !== affair.id))

		const responseRemove = fetch('/removeAffair', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(affair),
		});
		
		console.log(responseRemove);
	}

	return(
		<Panel id={props.id}>
			<PanelHeader
				before={
					<PanelHeaderBack onClick={props.go} data-to="mainHome"/>
				}
			>
				Мои дела
			</PanelHeader>
			
			<div className={'affairs-container'}>
				<div className='affairs-new'>
					<Calendar
						value={value}
						onChange={setValue}
						showNeighboringMonth={true}
					/>
						{props.userAffairs !== 0
							? <AffiarList remove={removeAffair} affairs={props.userAffairs}/>
							:   <div className='begin-affair'>
									<Icon28WriteSquareOutline width={56} height={56} color='#99A2AD'/>
									<Text className='new-text' weight="1">Начните своё первое дело</Text>
								</div>
						}
						
				</div>
				
				<ButtonGroup className='aff-btns' stretched>
					<Button 
						className='new-btn' 
						appearance=''
						onClick={() => setModalOpened('create-affair')}
					>
						Начать дело
					</Button>

					<Button 
						className='wrt-btn' 
						appearance=''
						onClick={() => setModalOpened('write-affair')}
					>
						Записать дело
					</Button>
				</ButtonGroup>
				
			</div>
			<AffairModal 
				id={modalOpened}
				userId={props.fetchedUser.id}
				closeModal={closeModal}
				selectedDate={value.getDate() + " " + value.toLocaleString("default", 
				{ month: "long" }) + " " + value.getFullYear()} 
				affairs={props.userAffairs} 
				setAffairs={props.setUserAffairs}
			/>
		</Panel>
	)
};

Affairs.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Affairs;
