import React from 'react';
import { Container, Row, Col } from 'reactstrap';
//import Auth from './Auth.js'
import SideContainer from './SideContainer.js';
import MapCont from './MapCont.js';


const fetchURL = 'http://localhost:5000/'

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

class Root extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			renderPhase: 0,
			locationArr: [testObj1, testObj2, testObj3],
			collBool: null,
			drawRoute: false,
			searchState: {}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.listCancel = this.listCancel.bind(this);
		this.listToggle = this.listToggle.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
	}

	handleSubmit(stateObj){
		let { startAdd, numVal, endVal } = stateObj;
		//console.log(startAdd);
		this.setState({
			renderPhase: 1,
			searchState: stateObj
		})
	}

	handlePhaseChange(phase){
		if(phase == 2){
			console.log("phase 2");
			this.setState({
				renderPhase: phase,
				drawRoute: true
			});
		}
		else{
			this.setState({
				renderPhase: phase
			})
		}
	}

	listCancel(ind){
		let locCopy = [...this.state.locationArr];
		let toggCopy = [...this.state.collBool];

		toggCopy.splice(ind, 1);
		locCopy.splice(ind, 1);

		this.setState({
			collBool: toggCopy,
			locationArr: locCopy
		});
	}

	handleMapClick(ind){
		//let ind = e.currentTarget.id;
		this.listToggle(ind); 
		//console.log(ind);
	}

	listToggle(ind){
		let copyArr = [...this.state.collBool];
		let newBool = this.state.collBool[ind];

		copyArr.splice(ind, 1, !newBool);

		this.setState({
			collBool: copyArr
		});

		//this.props.onSelect(ind);
	}

	componentDidMount(){
		let locArr = this.state.locationArr;
		let locLen = locArr.length;
		let tmpArr = [];

		for(let i = 0; i < locLen; i++){
			tmpArr.push(false);
		}

		this.setState({
			collBool: tmpArr
		});
	}

	render(){
		return(
			<Container className="w-100 h-100" style={contStyle}>
				<Row className="h-100 w-100">
				<SideContainer 
					renderPhase={this.state.renderPhase}
					collBool={this.state.collBool}
					onSubmit={this.handleSubmit}
					onPhase={this.handlePhaseChange}
					onCancel={this.listCancel}
					onSelect={this.listToggle}
					locations={this.state.locationArr}
				/>
				<Col xs="12" sm="6" md="7" lg="8" className="h-100 px-0 d-flex align-items-center justify-content-center overflow-auto">
				<MapCont
					drawRoute={this.state.drawRoute} 
					markerArr={this.state.locationArr} 
					onClick={this.handleMapClick} 
					endDest={this.state.searchState.endVal}
				/>
				</Col>
				</Row>
			</Container>
		)
	}

}

export default Root;