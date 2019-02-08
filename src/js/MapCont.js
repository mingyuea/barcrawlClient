import React from 'react';
import GoogleMapReact from 'google-map-react';

import { Col } from 'reactstrap';

class MapCont extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		console.log(e.currentTarget.id)
	}

	render(){
		return(
			<Col xs="12" sm="6" md="7" lg="8" className="h-100 px-0 d-flex align-items-center justify-content-center overflow-auto">
				<GoogleMapReact
		          defaultCenter={[37.8670247, -122.2660986]}
		          defaultZoom={15}
		        >
		        <div id="test1" lat={37.8670247} lng={-122.2660986} onClick={this.handleClick}>"test1"</div>
		        </GoogleMapReact>
			</Col>
		);
	}
}

export default MapCont;
