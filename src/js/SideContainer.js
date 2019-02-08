import React from 'react';
import { Row, Col } from 'reactstrap';

import { colColor } from './StyleObj.js';
import SearchComp from './SearchComp.js';
import ListComp from './ListComp.js';

class SideContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			renderPhase: 0
		}

		this.handlePhaseChange = this.handlePhaseChange.bind(this);
	}

	handlePhaseChange(phase){
		this.setState({
			renderPhase: phase
		});
	}

	render(){
		let phase = this.state.renderPhase;
		let renderBlock;
		if(phase == 0){
			renderBlock = <SearchComp onPhase={this.handlePhaseChange} />
		}
		else if(phase == 1){
			renderBlock = <ListComp onPhase={this.handlePhaseChange} />
		}

		return(
			<Col xs="12" sm="6" md="5" lg="4" className="h-100 d-flex align-items-center justify-content-center overflow-auto" style={colColor}>
				{renderBlock}
			</Col>
		);
	}
}

export default SideContainer;