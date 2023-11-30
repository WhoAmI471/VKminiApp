import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack, Spacing, Separator, Button, Group, Div, Text} from '@vkontakte/vkui';

import CaseTabs from '../components/Diagrams/CaseTabs';
import DiagramTabs from '../components/Diagrams/DiagramTabs';
import AffairDiagram from '../components/Diagrams/AffairDiagram';
import AffairDiagramList from '../components/Diagrams/AffairDiagramList';

import './CaseAnalysis.css';

const CaseAnalysis = ({ id, go, dateRange, setDateRange, categoryStats }) =>   {

    const [diagramView, setDiagramView] = useState('doughnut');

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
                <AffairDiagram categoryStats={categoryStats} diagramView={diagramView} />
            </div>

            <Spacing size={2}>
                <Separator />
            </Spacing>

            <DiagramTabs diagramView={diagramView} setDiagramView={setDiagramView} />
            
            <Spacing size={2}>
                <Separator />
            </Spacing>

            <Spacing size={5} />
            <AffairDiagramList categoryStats={categoryStats}/>
		</Panel>
	)
};

CaseAnalysis.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default CaseAnalysis;
