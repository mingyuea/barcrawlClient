import React from 'react';
import { Row, Col } from 'reactstrap';

import { colColor } from './StyleObj.js';
import SearchComp from './SearchComp.js';
import ListComp from './ListComp.js';
import LocationComp from './LocationComp.js';
import EndCard from './EndCard.js';


class SideContainer extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let phase = this.props.renderPhase;
		let renderBlock;
		if(phase == 0){
			renderBlock = <SearchComp 
							error={this.props.error} 
							onSubmit={this.props.onSubmit} />
		}
		else if(phase == 1){
			renderBlock = <ListComp
							locations={this.props.locations}
							collBool={this.props.collBool}
							onSelect={this.props.onSelect} 
							onCancel={this.props.onCancel} 
							onPhase={this.props.onPhase} />
		}
		else if(phase == 2){
			renderBlock = <LocationComp 
							locations={this.props.locations} 
							locInd={this.props.locInd} 
							viewInd={this.props.viewInd} 
							playState={this.props.playState} 
							onPlayToggle={this.props.onPlayToggle}
							onPhase={this.props.onPhase} />
		}
		else{
			renderBlock = <EndCard onPhase={this.props.onPhase} />
		}

		return(
			<Col xs="12" sm="6" md="5" lg="4" className="h-100 d-flex align-items-center justify-content-center overflow-auto" style={colColor}>
				{renderBlock}
			</Col>
		);
	}
}

export default SideContainer;