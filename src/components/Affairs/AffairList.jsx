import React, { useState } from 'react';
import { ButtonGroup, Button, Calendar, Panel, PanelHeader, PanelHeaderBack, Text } from '@vkontakte/vkui';

import AffairItem from './AffairItem';

export const AffairList = ({affairs, remove}) => {
  return (
    <div style={{width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {affairs.map(affair => 
            <AffairItem remove={remove} post={affair} key={affair.id}/>
        )}
    </div>
  )
}

export default AffairList;