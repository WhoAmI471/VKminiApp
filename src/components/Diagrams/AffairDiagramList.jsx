import React from 'react';

import AffairDiagramItem from './AffairDiagramItem';

export const AffairDiagramList = ({categoryStats}) => {
  	return (
		<div style={{width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			{categoryStats && Object.keys(categoryStats).map(key => 
				console.log(key) ||
				<AffairDiagramItem post={categoryStats[key]} postKey={key}/>
			)}
		</div>
  	)
}

export default AffairDiagramList;