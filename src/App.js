import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import MainHome from './panels/MainHome';
import Affairs from './panels/Affairs';
import Timer from './panels/Timer';
import CaseAnalysis from './panels/CaseAnalysis';

import './App.css';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userAffairs, setUserAffairs] = useState([]);
    const [duration, setDuration] = useState('');
    const [affair, setAffair] = useState('');
    const [category, setCategory] = useState('');
	const [isTimerActive, setIsTimerActive] = useState(false);
	
	const [date, setDate] = useState(() => new Date());
	const [serverDate, setServerDate] = useState(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());

	const [dateRange, setDateRange] = useState('');
	const [categoryStats, setCategoryStats] = useState();


	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			console.log(user.id);
			setPopout(null);
		}
		fetchData();
	}, []);
	

	useEffect(() => {
		if (fetchedUser && fetchedUser.id) {
			console.log(fetchedUser);
		  	fetch(`/getAffairs?userId=${fetchedUser.id}&date=${serverDate}`)
				.then(response => response.json())
				.then(response => {
			  		getAffairs(response);
				});
			
			fetch(`/getCategoryStats?userId=${fetchedUser.id}&dateRange=${dateRange}`)
				.then(response => response.json())
				.then(response => {
					console.log(response);
					setCategoryStats(response);
				});
		}
		setDateRange('day')
	}, [fetchedUser]);
	
	
	useEffect(() => {
		if (fetchedUser && fetchedUser.id) {
			console.log(fetchedUser);
		  	fetch(`/getAffairs?userId=${fetchedUser.id}&date=${serverDate}`)
				.then(response => response.json())
				.then(response => {
			  		getAffairs(response);
				});
		}
	}, [serverDate]);


	useEffect(() => {
		setServerDate(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
	}, [date])

	
	useEffect(() => {
		if (fetchedUser && fetchedUser.id) {
		  	fetch(`/getCategoryStats?userId=${fetchedUser.id}&dateRange=${dateRange}`)
				.then(response => response.json())
				.then(response => {
			  		console.log(response);
					setCategoryStats(response);
				});
		}
	}, [dateRange]);

	const getAffairs = (response) => {
		
			// Отформатировать значения в userAffairs
			const formattedUserAffairs = response["affairs"][serverDate].map(affair => {
				const timerUnit = ['ч.', 'мин.', 'с.'];
				const durationArray = affair.duration.split(' ');
	
				// Удаляем элемент из массива, если его значение равно 0
				for (let index = durationArray.length - 1; index >= 0; index--) {
					if (parseInt(durationArray[index], 10) === 0) {
						durationArray.splice(index, 1);
						console.log('Удалён по индексу ' + index);
					} else {
						durationArray[index] += timerUnit[index];
						console.log('добавлено к элементу ' + durationArray[index]);
					}
				}
	
				return {
					...affair,
					duration: durationArray.join(' ')
				};
			});
			console.log(formattedUserAffairs)
			setUserAffairs(formattedUserAffairs);
	}

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout} >
						<SplitCol autoSpaced='true' stretchedOnMobile='true' >
							<View activePanel={activePanel}>
								<Home id='home' go={go}/>
								<MainHome id='mainHome' go={go}/>
								<Affairs 
									id='affairs'
									go={go} 
									duration={duration}
									setDuration={setDuration}
									affair={affair}
									setAffair={setAffair}
									category={category}
									setCategory={setCategory}
									isTimerActive={isTimerActive}
									setIsTimerActive={setIsTimerActive}
									fetchedUser={fetchedUser} 
									userAffairs={userAffairs} 
									setUserAffairs={setUserAffairs}
									date={date}
									setDate={setDate}
									serverDate={serverDate}
								/>
								<Timer 
									id='timer' 
									go={go} 
									affair={affair} 
									category={category} 
									setDuration={setDuration}
									isTimerActive={isTimerActive}
									setIsTimerActive={setIsTimerActive}
								/>
								<CaseAnalysis 
									id='caseAnalysis'
									go={go}
									dateRange={dateRange}
									setDateRange={setDateRange}
									categoryStats={categoryStats} 
								/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
