import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Group, Tabs, HorizontalScroll, TabsItem } from '@vkontakte/vkui';

import { Icon16Dropdown } from '@vkontakte/icons';

import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(...registerables);


const AffairDiagram = ({ categoryStats }) => {
	const [categoryLabels, setCategoryLabels] = useState([]);
	const [categoryColors, setCategoryColors] = useState([]);
	const [categoryDurations, setCategoryDurations] = useState([]);
	const [durationsInHours, setDurationsInHours] = useState([]);
	
	useEffect(() => {
	  if (categoryStats) {
		const labels = Object.keys(categoryStats);
		const colors = Object.values(categoryStats).map(category => category.color);
		const durations = Object.values(categoryStats).map(category => category.duration);
		// const durationsInHours = categoryDurations.map(duration => (Math.round(duration / 3600 * 100) / 100));

		setCategoryLabels(labels);
		setCategoryColors(colors);
		setCategoryDurations(durations);
		// setDurationsInHours(durationsInHours);
		// console.log(categoryDurations);
		// console.log(durationsInHours);
	  }
	}, [categoryStats]);
	

    const barChartData = {
        labels: categoryLabels,
        datasets: [
			{
				data: categoryDurations,
				backgroundColor: categoryColors,
				fill: true
			},
        ]
    };

    return (
        <Group style={{width: '400px', height: '400px'}}>
            <Doughnut
                type="doughnut"
                width={130}
                height={130}
                data={barChartData}
				
            />
        </Group>
    );
};


export default AffairDiagram;