import React from 'react';

import { Col } from 'reactstrap';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
	width: '100%',
	height: '100%',
}

const mapDiv = {
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%'
}

class MapEmpty extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log("Empty map mounted");
	}

	render(){
		return(
			<div style={mapDiv}>
			<Map style={mapStyles} google={this.props.google} />
			</div>
			)
	}
}

export default GoogleApiWrapper({
  apiKey: ('')
  //apiKey: ('AIzaSyDuKS_Z1jVp443behy4qKsyJUw2T0N78X8')
})(MapEmpty);


let obj = {a: 1}
let obj2 = {a: 2}
let obj3 = {a: 3}

let arr1 = [obj, obj2, obj3];
let arr2 = [...arr1];

arr2.splice(2, 1);


console.log(arr1[0] == arr2[0])