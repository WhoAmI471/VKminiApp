import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Group, Tabs, HorizontalScroll, TabsItem } from '@vkontakte/vkui';

import { Icon16Dropdown } from '@vkontakte/icons';


const CaseTabs = ({ dateRange, setDateRange }) => {

    return (
        <Group>
            <Tabs>
                <HorizontalScroll arrowSize="m">
                    <TabsItem
                        selected={dateRange === 'day'}
                        onClick={() => setDateRange('day')}
                    >
                        День
                    </TabsItem>
                    <TabsItem
                        selected={dateRange === 'week'}
                        onClick={() => setDateRange('week')}
                    >
                        Неделя
                    </TabsItem>
                    <TabsItem
                        selected={dateRange === 'month'}
                        onClick={() => setDateRange('month')}
                    >
                        Месяц
                    </TabsItem>
                    <TabsItem
                        selected={dateRange === 'year'}
                        onClick={() => setDateRange('year')}
                    >
                        Год
                    </TabsItem>
                </HorizontalScroll>
            </Tabs>
        </Group>
    );
};


export default CaseTabs;