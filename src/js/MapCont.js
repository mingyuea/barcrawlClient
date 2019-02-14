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

		this.state ={
			directionsService: null,
			directionsDisplay: null,
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleClearMap = this.handleClearMap.bind(this);
	}

	handleClick(props, marker, e){
		let ind2 = marker.id;
		this.props.onClick(ind2);
	}

	handleClearMap(){
		let directionsDisplay = this.state.directionsDisplay;
		directionsDisplay.setDirections({routes: []})
		directionsDisplay.set('map', null);
		console.log("set map to null");
		this.props.delFin()
	}

	componentDidMount(){
		let directionsService = new google.maps.DirectionsService();
		let directionsDisplay = new google.maps.DirectionsRenderer();

		this.setState({
			directionsService: directionsService,
			directionsDisplay: directionsDisplay
		})
	}

	componentDidUpdate(){
		let locInd = this.props.locInd;
		let mArr = this.props.markerArr;
		let newCenter;
		console.log("map updated", this.props.delBool, this.props.drawRoute, mArr)
		if(this.props.delBool){
			console.log("delBool true")
			this.handleClearMap();
		}

		if(this.props.drawRoute){
			//console.log("rerendering...");
			let mapObj = this.childMap.map;
			let directionsService = this.state.directionsService;
			let directionsDisplay = this.state.directionsDisplay;

			directionsDisplay.setDirections({routes: []});
			
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
				let tmpObj = {
					location: {
						lat: mArr[mLen].coordinates.latitude,
						lng: mArr[mLen].coordinates.longitude
					},
					stopover :true
				}
				coorArr.push(tmpObj)

			}
			else{
				endDest = {
					lat: mArr[mLen].coordinates.latitude,
					lng: mArr[mLen].coordinates.longitude
				}
			}

			let routeObj = {
				travelMode: "WALKING",
				origin: startDest,
				destination: endDest,
				waypoints: coorArr,
				optimizeWaypoints: true
			}

			let renderOptions = {
				suppressMarkers: true
			}


			directionsDisplay.setMap(mapObj);
			directionsDisplay.setOptions(renderOptions);

			directionsService.route(routeObj, (result, status) => {
				if(status == 'OK'){
					let wpOrder = result.routes[0].waypoint_order;

					this.props.onReorder(wpOrder);
					directionsDisplay.setDirections(result);
				}
				else{
					console.log("Google Maps Error: " + status);
				}
			})
		
			this.props.finishRender();
		}

		if(mArr.length > 0){
			if(locInd){
				newCenter ={
						lat: Number(mArr[locInd].coordinates.latitude),
						lng: Number(mArr[locInd].coordinates.longitude)
				}
			}
			else{
				newCenter = {
						lat: Number(mArr[0].coordinates.latitude),
						lng: Number(mArr[0].coordinates.longitude)
				}
			}
			let mapObj = this.childMap.map;
			mapObj.panTo(newCenter);
		}
	}


	render(){
		let rendArr;
		let currLoc;
		let initCenter = {lat: 37.8670247, lng:-122.2660986};
		

		if(this.props.markerArr.length > 0){
			let mArr = this.props.markerArr;
			let alph = "ABCDEFGHIJK";

			rendArr = mArr.map((elem, ind) => <Marker key={"marker"+ind} onClick={this.handleClick} label={alph[ind]} id={ind} position={{lat: Number(elem.coordinates.latitude), lng: Number(elem.coordinates.longitude)}} title={elem.name} />);
		}

		if(this.props.locInd != null){
			let locObj = this.props.markerArr[this.props.locInd];
			let posit = {lat: Number(locObj.coordinates.latitude), lng: Number(locObj.coordinates.longitude)}

			currLoc = <Marker key="personPNG" id="person" icon={{url: require("./drink2.png"), scaledSize: new google.maps.Size(40,40), anchor: new google.maps.Point(20,20)}} position={posit} title="Currently Drinking Here!" />
			rendArr.splice(this.props.locInd, 1, currLoc);
		}
		
		return(
			<div style={mapDiv}>
		        <Map style={mapStyles} google={this.props.google} ref={(newRef )=> this.childMap = newRef} zoom={16} initialCenter={initCenter} >
					{rendArr}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
  //apiKey: ('')
  apiKey: ('AIzaSyDuKS_Z1jVp443behy4qKsyJUw2T0N78X8')
})(MapCont);

//export default MapCont;
