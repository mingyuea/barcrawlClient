import React from 'react';
import { Row, Col } from 'reactstrap';

import { colColor } from './StyleObj.js';
import SearchComp from './SearchComp.js';
import ListComp from './ListComp.js';

class SideContainer extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let phase = this.props.renderPhase;
		let renderBlock;
		if(phase == 0){
			renderBlock = <SearchComp onSubmit={this.props.onSubmit} />
		}
		else if(phase == 1){
			renderBlock = <ListComp locations={this.props.locations} collBool={this.props.collBool} onSelect={this.props.onSelect} onCancel={this.props.onCancel} onPhase={this.props.onPhase} />
		}

		return(
			<Col xs="12" sm="6" md="5" lg="4" className="h-100 d-flex align-items-center justify-content-center overflow-auto" style={colColor}>
				{renderBlock}
			</Col>
		);
	}
}

export default SideContainer;