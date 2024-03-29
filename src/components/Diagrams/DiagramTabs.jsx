import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Group, Tabs, HorizontalScroll, TabsItem } from '@vkontakte/vkui';

import { Icon16Dropdown } from '@vkontakte/icons';


const DiagramTabs = ({ diagramView, setDiagramView }) => {

    console.log(diagramView)

    return (
        <Group style={{margin: "0 16px"}}>
            <Tabs>
                <HorizontalScroll arrowSize="m">
                    <TabsItem
                        selected={diagramView === 'doughnut'}
                        onClick={() => setDiagramView('doughnut')}
                    >
                        Кольцевая
                    </TabsItem>
                    <TabsItem
                        selected={diagramView === 'bar'}
                        onClick={() => setDiagramView('bar')}
                    >
                        Гистограмма
                    </TabsItem>
                </HorizontalScroll>
            </Tabs>
        </Group>
    );
};


export default DiagramTabs;