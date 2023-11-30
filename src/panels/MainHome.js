import React from 'react';
import PropTypes from 'prop-types';

import { CellButton, ButtonGroup, Panel, PanelHeader } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28UserOutline, Icon20ShoppingCartOutline } from '@vkontakte/icons';


const MainHome = props =>  {

	return (
		<Panel id={props.id}>
			<PanelHeader>Не теряю времени!</PanelHeader>
			<div className='main-home-btns'>
				{/* <CellButton 
					className='first-row-btns
					row-btns work-btn'
				>
					<div className='home-btn'>
						<p className='home-btns'>В разработке...</p>
					</div>
				</CellButton> */}

				<ButtonGroup className='first-row-btns'>
					<CellButton 
						className='row-btns'
						onClick={props.go} 
						data-to='home'
					> 
						<div className='home-btn'>
							<Icon28HomeOutline color='#FFFFFF'/>
							<p className='home-btns'>Советник</p>
						</div>
					</CellButton>

					<CellButton 
						className='row-btns'
						onClick={props.go} 
						data-to='affairs'
					> 
						<div className='home-btn'>
							<Icon28UserOutline color='#FFFFFF'/>
							<p className='home-btns'>Мои дела</p>
						</div>
					</CellButton>
				</ButtonGroup>

				<ButtonGroup className='first-row-btns'>
					<CellButton 
						className='row-btns'
						onClick={props.go} 
						data-to='caseAnalysis'
					> 
						<div className='home-btn'>
							<svg width="23" height="22" viewBox="0 0 23 22" fill='none' xmlns="http://www.w3.org/2000/svg">
									<g id="Group 17">
									<rect id="Rectangle 1424" x="1" y="1" width="4.76471" height="19.6471" stroke="#FFFFFF" stroke-width="2"/>
									<rect id="Rectangle 1425" x="9.11719" y="5.73535" width="4.76471" height="14.9118" stroke="#FFFFFF" stroke-width="2"/>
									<rect id="Rectangle 1426" x="17.2344" y="12.5" width="4.76471" height="8.14706" stroke="#FFFFFF" stroke-width="2"/>
									</g>
							</svg>
							<p className='home-btns'>Анализ дел</p>
						</div>
					</CellButton>
					
					{/* <CellButton 
						className='row-btns work-btn' 
						// onClick={props.go} 
						// data-to='home'
					> 
						<div className='home-btn'>
							<Icon20ShoppingCartOutline color='#FFFFFF'/>
							<p className='home-btns'>В разработке...</p>
						</div>
					</CellButton> */}
				</ButtonGroup>
			</div>
		</Panel>
	)
};

MainHome.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default MainHome;

