import React from 'react';
import PropTypes from 'prop-types';

import { CellButton, Panel, PanelHeader } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28UserOutline } from '@vkontakte/icons';

import workSvg from '../img/Group17.svg';


const MainHome = props =>  {

	return (
		<Panel id={props.id}>
			<PanelHeader>Не Теряю Времени!</PanelHeader>
			<div>
				<CellButton onClick={props.go} data-to='home'> 
					<div className='home-btn'>
						<Icon28HomeOutline/>
						<p className='home-btns'>Главная</p>
					</div>
				</CellButton>
				<CellButton onClick={props.go} data-to='affairs'> 
					<div className='home-btn'>
						<Icon28UserOutline/>
						<p className='home-btns'>Мои дела</p>
					</div>
				</CellButton>
				<CellButton onClick={props.go} data-to='home'> 
					<div className='home-btn work-btn'>
						<img src={workSvg}/>
						<p className='home-btns'>Анализ дел</p>
					</div>
				</CellButton>
			</div>
		</Panel>
	)
};

MainHome.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default MainHome;

