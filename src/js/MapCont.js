import React from 'react';
import { findDOMNode } from 'react-dom';
//import GoogleMapReact from 'google-map-react';

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

class MapCont extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(props, marker, e){
		//let ind = e.currentTarget.id;
		let ind2 = marker.id;
		this.props.onClick(ind2);
	}

	componentDidMount(){
		console.log("MAP MOUNTED");
	}

	componentDidUpdate(){
		console.log("map updated");

		if(this.props.drawRoute){
			let mArr = this.props.markerArr;
			let mLen = mArr.length - 1;
			let coorArr = [];
			let startDest, endDest;

			startDest = {
				lat: mArr[0].coordinates.latitude,
				lng: mArr[0].coordinates.longitude
			}

			for(let i = 1; i < mLen; i++){
				let tmpObj = {
					location: {
						lat: mArr[i].coordinates.latitude,
						lng: mArr[i].coordinates.longitude
					},
					stopover :true
				}

				coorArr.push(tmpObj);
			}

			if(this.props.endDest.length>0){
				endDest = this.props.endDest;
			}
			else{
				endDest = {
					lat: mArr[mLen].coordinates.latitude,
					lng: mArr[mLen].coordinates.longitude
				}
			}

			let optionsObj = {
				travelMode: "WALKING",
				origin: startDest,
				destination: endDest,
				waypoints: coorArr,
				optimizeWaypoints: true
			}

			let mapObj = this.childMap.map;
			//console.log(testObj, "is mapNode");

			let directionsService = new google.maps.DirectionsService();
			let directionsDisplay = new google.maps.DirectionsRenderer();

			directionsDisplay.setMap(mapObj);
			directionsService.route(optionsObj, (result, status) => {
				if(status == 'OK'){
					console.log(result);
					directionsDisplay.setDirection(result);
				}
				else{
					console.log("Google Maps Error: " + status);
				}
			})
			
		}
	}

	render(){
		let rendArr;
		if(this.props.markerArr){
			let mArr = this.props.markerArr;
			//let rendArr = [];
			let alph = "ABCDEFGHIJK";

			rendArr = mArr.map((elem, ind) => <Marker onClick={this.handleClick} label={alph[ind]} id={ind} position={{lat: Number(elem.coordinates.latitude), lng: Number(elem.coordinates.longitude)}} title={elem.name} />);
			//console.log(rendArr.length);
		}

		

		return(
			<div style={mapDiv}>
		        <Map style={mapStyles} google={this.props.google} ref={(newRef )=> this.childMap = newRef} zoom={16} initialCenter={{lat: 37.8670247, lng:-122.2660986}} >
					<Marker label="2" position={{lat: 37.8670246, lng: -122.2660985}} />
					{rendArr}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
  apiKey: ('')
})(MapCont);

//export default MapCont;
