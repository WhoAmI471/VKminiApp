import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Group, ButtonGroup, Button, Calendar, Panel, PanelHeader, PanelHeaderBack, Text, Spacing, Separator } from '@vkontakte/vkui';
import { Icon28WriteSquareOutline } from '@vkontakte/icons';
import './Affairs.css';

import AffiarList from '../components/Affairs/AffairList';
import AffairModal from '../components/Affairs/AffairModal';

const Affairs = props => {

	const [modalOpened, setModalOpened] = useState('');

	const [dateNow, setDateNow] = useState(() => new Date());


	useEffect(() => {
		setDateNow(dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear());
	}, [])


	const closeModal = () => {
		setModalOpened('');
	}

	const removeAffair = (affair) => {
		props.setUserAffairs(props.userAffairs.filter(a => a.id !== affair.id))
		const responseRemove = fetch(`/removeAffair?userId=${props.fetchedUser.id}&affairId=${affair.id}&date=${props.serverDate}`, {
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
			
			<div className='affairs-container'>
				<div className='affairs-new'>
					<Calendar
						value={props.date}
						onChange={props.setDate}
						showNeighboringMonth={true}
					/>
					
					<Spacing style={{width: '100%'}} size={24}>
						<Separator />
					</Spacing>

					{ props.userAffairs['length'] !== 0
						? <Group className={'affair-list'}>
							<AffiarList  remove={removeAffair} affairs={props.userAffairs}/>
						  </Group>
						:   <div className='begin-affair'>
								<Icon28WriteSquareOutline width={56} height={56} color='#99A2AD'/>
								<Text className='new-text' weight="1">Начните своё дело</Text>
							</div>
					}
						
				</div>
				
				{ dateNow == props.serverDate ?
					(
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
					) : (

						<ButtonGroup className='aff-btns' stretched>
							<Button 
								className='wrt-btn' 
								appearance=''
								onClick={() => setModalOpened('write-affair')}
							>
								Записать дело
							</Button>
						</ButtonGroup>
					)
				}
				
			</div>
			<AffairModal 
				id={modalOpened}
				go={props.go}
				duration={props.duration}
				setDuration={props.setDuration}
				affair={props.affair}
				setAffair={props.setAffair}
				category={props.category}
				setCategory={props.setCategory}
				isTimerActive={props.isTimerActive}
				setIsTimerActive={props.setIsTimerActive}
				userId={props.fetchedUser.id}
				closeModal={closeModal}
				selectedDate={props.date.getDate() + " " + props.date.toLocaleString("default", 
				{ month: "long" }) + " " + props.date.getFullYear()} 
				serverDate={props.serverDate}
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
