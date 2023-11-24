import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Group, Tabs, HorizontalScroll, TabsItem } from '@vkontakte/vkui';

import { Icon16Dropdown } from '@vkontakte/icons';

import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(...registerables);


const AffairDiagram = ({ categoryStats, diagramView}) => {
	const [categoryLabels, setCategoryLabels] = useState([]);
	const [categoryColors, setCategoryColors] = useState([]);
	const [categoryDurations, setCategoryDurations] = useState([]);
	// const [durationsInHours, setDurationsInHours] = useState([]);
	
	useEffect(() => {
	  if (categoryStats) {
		const labels = Object.keys(categoryStats);
		const colors = Object.values(categoryStats).map(category => category.color);
		const durations = Object.values(categoryStats).map(category => category.duration);
		
		setCategoryLabels(labels);
		setCategoryColors(colors);
		setCategoryDurations(durations);
	  }
	}, [categoryStats]);
	

	const doughnutChartData = {
		// labels: categoryLabels,
		datasets: [
			{
				label: ' ',
				data: categoryDurations,
				backgroundColor: categoryColors,
				fill: true,
			},
		],
		// options: {
		// 	scales: {
		// 		display: false
		// 	}
		// }
	};
	  
    const barChartData = {
		type: 'bar',
		labels: categoryLabels,
		datasets: [
			{
				label: '',
				data: categoryDurations,
				backgroundColor: categoryColors,
				fill: false, // Отключить заливку под столбцами
			},
		],
		options: {
			scales: {
				x: {
					display: false, // Скрыть ось X
				},
				y: {
					display: false, // Скрыть ось Y
				},
			},
		},
	};


	const switchDiagram = (diagramViewName) => {
		switch(diagramViewName) {
			case 'doughnut': 
				return (
					<div style={{width: '300px', height: '300px'}}>
						<Doughnut
							type="doughnut"
							width={130}
							height={130}
							data={doughnutChartData}
							options={doughnutChartData.options} // Передать опции
						/>
					</div>
				)
			case 'bar':
				return (
					<div style={{width: '600px', height: '300px'}}>
						<Bar
							type="bar"
							width={600}
							height={300}
							data={barChartData}
							options={barChartData.options} // Передать опции
						/>
					</div>
				)

			default:
				return (<p>Нету ничего(</p>)
		}
	}

    return (
		switchDiagram(diagramView)
    );
};


export default AffairDiagram;