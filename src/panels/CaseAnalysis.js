import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack, Button, Group, Div, Text} from '@vkontakte/vkui';

import CaseTabs from '../components/CaseTabs';
import AffairDiagram from '../components/AffairDiagram';

import './CaseAnalysis.css';

const CaseAnalysis = ({ id, go, dateRange, setDateRange, categoryStats }) =>   {
    
    useEffect(() => {
        
    }, [])


	return (
		<Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderBack onClick={go} data-to="mainHome"/>
                }
            >
                Анализ дел
            </PanelHeader>
            
                <CaseTabs dateRange={dateRange} setDateRange={setDateRange} />
            <div className='diagram-container'>
                <AffairDiagram categoryStats={ categoryStats }/>
            </div>
		</Panel>
	)
};

CaseAnalysis.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default CaseAnalysis;
