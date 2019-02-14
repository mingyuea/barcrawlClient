import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MapCont from './MapTest.js';
import MapEmpty from './MapEmpty.js';

const fetchURL = '';

const contStyle = {
	height: "100%",
	width: "100%",
	maxWidth: "100%",
	margin: "0",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontFamily: "Oswald", 
	padding: "0"
}


const testObj1 = {
            "name": "Pappy's Grill & Sports Bar",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/geR-9TmCt7t458euuW7W9Q/o.jpg",
            "rating": 3,
            "coordinates": {
                "latitude": 37.8674684464931,
                "longitude": -122.258890941739
            },
            "price": "$$",
            "location": {
                "address1": "2367 Telegraph Ave",
                "address2": "",
                "address3": "",
                "city": "Berkeley",
                "zip_code": "94704",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "2367 Telegraph Ave",
                    "Berkeley, CA 94704"
                ]
            },
            "display_phone": "(510) 405-1000",
        }
const testObj2 = {
            "id": "TaAC3o8tXtjAZRhkiK8Weg",
            "alias": "tap-haus-berkeley",
            "name": "Tap Haus",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/SF-u4S73s8p7xl1LNQK4sg/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/tap-haus-berkeley?adjust_creative=1J4JVuQ7KgKxu24nf-tlBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=1J4JVuQ7KgKxu24nf-tlBg",
            "review_count": 100,
            "categories": [
                {
                    "alias": "bars",
                    "title": "Bars"
                },
                {
                    "alias": "german",
                    "title": "German"
                }
            ],
            "rating": 3.5,
            "coordinates": {
                "latitude": 37.8678736756068,
                "longitude": -122.258263640106
            },
            "transactions": [],
            "price": "$$",
            "location": {
                "address1": "2518 Durant Ave",
                "address2": "Ste C",
                "address3": "",
                "city": "Berkeley",
                "zip_code": "94704",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "2518 Durant Ave",
                    "Ste C",
                    "Berkeley, CA 94704"
                ]
            },
            "phone": "+15102805000",
            "display_phone": "(510) 280-5000",
            "distance": 37.71765208750554
        }

const testObj3 = {
            "id": "PkSoDMwb3y3-lRsqaKqSGw",
            "alias": "kimchi-garden-berkeley",
            "name": "Kimchi Garden",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/bHrby0ezN0EQXkbloymetw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/kimchi-garden-berkeley?adjust_creative=1J4JVuQ7KgKxu24nf-tlBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=1J4JVuQ7KgKxu24nf-tlBg",
            "review_count": 302,
            "categories": [
                {
                    "alias": "korean",
                    "title": "Korean"
                },
                {
                    "alias": "asianfusion",
                    "title": "Asian Fusion"
                },
                {
                    "alias": "beerbar",
                    "title": "Beer Bar"
                }
            ],
            "rating": 3.5,
            "coordinates": {
                "latitude": 37.86818,
                "longitude": -122.25826
            },
            "transactions": [
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "2517 Durant Ave",
                "address2": "Ste B",
                "address3": "",
                "city": "Berkeley",
                "zip_code": "94704",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "2517 Durant Ave",
                    "Ste B",
                    "Berkeley, CA 94704"
                ]
            },
            "phone": "+15108485968",
            "display_phone": "(510) 848-5968",
            "distance": 72.43474806906218
        }

const testObj4 ={
            "id": "0JeXmrEdTrPaOsoj2axTQg",
            "alias": "kips-bar-and-grill-berkeley-4",
            "name": "Kip's Bar & Grill",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/m0-JVHtkyi36LsZMxXvGTw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/kips-bar-and-grill-berkeley-4?adjust_creative=1J4JVuQ7KgKxu24nf-tlBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=1J4JVuQ7KgKxu24nf-tlBg",
            "review_count": 338,
            "categories": [
                {
                    "alias": "burgers",
                    "title": "Burgers"
                },
                {
                    "alias": "sportsbars",
                    "title": "Sports Bars"
                },
                {
                    "alias": "tradamerican",
                    "title": "American (Traditional)"
                }
            ],
            "rating": 3,
            "coordinates": {
                "latitude": 37.86802,
                "longitude": -122.25957
            },
            "transactions": [
                "delivery",
                "pickup"
            ],
            "price": "$",
            "location": {
                "address1": "2439 Durant Ave",
                "address2": "",
                "address3": "",
                "city": "Berkeley",
                "zip_code": "94704",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "2439 Durant Ave",
                    "Berkeley, CA 94704"
                ]
            },
            "phone": "+15108484181",
            "display_phone": "(510) 848-4181",
            "distance": 121.98752539469083
        }




class RootTest extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			renderPhase: 1,
			//locationArr: [],
			locationArr: [testObj1, testObj2, testObj3],
			collBool: null,
			drawRoute: false,
			searchState: {
				startAdd: "",
				endVal: "",
				numVal: ""
			},
			locInd: null,
			viewInd: 0,
			playState: "play",
			error: null,
			delBool: false,
		}

		this.handleMapClick = this.handleMapClick.bind(this);
		this.handleFinishRender = this.handleFinishRender.bind(this);
		this.handleReorder = this.handleReorder.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDraw = this.handleDraw.bind(this);
		this.deleteRoute = this.deleteRoute.bind(this);
		this.delFin = this.delFin.bind(this);
	}

	handleMapClick(ind){
		if(this.state.renderPhase == 1){
			this.listToggle(ind);
		}
		else if(this.state.renderPhase == 2){
			this.setState({
				playState: "pause",
				viewInd: ind
			})
		}
	}

	handleReorder(orderArr){
		let currState = this.state.locationArr
		let copyState = [...currState];
		let initPoint = copyState.shift();
		let arrLen = orderArr.length;
		let stateLen = currState.length

		for(let i = 0; i < stateLen; i++){
			if(i == arrLen){
				this.setState({
					locationArr: [initPoint, ...copyState]
				});
				break;
			}
			else{
				let newInd = orderArr[i];
				copyState[newInd] = currState[i + 1]
			}
		}

	}

	handleFinishRender(){
		this.setState({
			drawRoute: false
		})
	}

	handleDelete(){
		this.setState({
			drawRoute: false,
			phase: 0,
		})
	}

	handleDraw(){
		this.setState({
			drawRoute: true,
			renderPhase: 1
		})
	}

	deleteRoute(){
		/*console.log(this.mapCont.state);
		let directionsDisplay = this.mapCont.state.directionsDisplay;
		directionsDisplay.set('map', null);*/
		this.setState({
			delBool: true,
			drawRoute: false
		})
	}

	delFin(){
		let copyLoc = [...this.state.locationArr];
		copyLoc.shift()
		copyLoc.push(testObj4);
		this.setState({
			delBool: false,
			locationArr:  copyLoc
		})
	}

	reshowRoute(){
		let directionsDisplay = this.mapCont.directionsDisplay;
		directionsDisplay.set(map, "null");
	}

	render(){
		let mapRend
		if(this.state.renderPhase == 0){
			mapRend = <MapEmpty />
		}
		else{
			mapRend = <MapCont
					ref={(mapCont) => {this.mapCont = mapCont}}
					phase={this.state.renderPhase}
					drawRoute={this.state.drawRoute} 
					markerArr={this.state.locationArr}
					locInd={this.state.locInd} 
					onClick={this.handleMapClick}
					onReorder={this.handleReorder}
					finishRender={this.handleFinishRender} 
					endDest={this.state.searchState.endVal}
					delBool={this.state.delBool}
					delFin={this.delFin}
				/>
		}
		return(
		<Container className="w-100 h-100" style={contStyle}>
				<Row className="h-100 w-100">
					<Col xs="3" sm="4" md="5" lg="4" className="h-100 d-flex align-items-center justify-content-center overflow-auto">
						<button onClick={this.deleteRoute}>Delete Route</button>
						<button onClick={this.handleDraw}>Draw Route</button>
					</Col>
				<Col xs="9" sm="6" md="7" lg="8" className="h-100 px-0 d-flex align-items-center justify-content-center overflow-auto">
					{mapRend}
				</Col>
				</Row>
			</Container>
	)}
}

export default RootTest