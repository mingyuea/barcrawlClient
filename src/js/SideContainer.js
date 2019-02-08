import React from 'react';
import { Row } from 'reactstrap';

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
			<Row className="h-100 w-100">
				{renderBlock}
			</Row>
		);
	}
}

export default SideContainer;