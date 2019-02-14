import React from 'react';
import { Container, Row, Col } from 'reactstrap';
//import Auth from './Auth.js'
import SideContainer from './SideContainer.js';
import MapCont from './MapCont.js';


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


/*const testObj1 = {
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
        }*/

class Root extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			renderPhase: 0,
			locationArr: [],
			//locationArr: [testObj1, testObj2, testObj3],
			collBool: null,
			drawRoute: false,
			searchState: {},
			locInd: null,
			viewInd: 0,
			playState: "play",
			error: null,
			testSort: [{a: 0}, {e: 0}, {d: 0}, {c: 0}, {b: 0}],
			delBool: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.listCancel = this.listCancel.bind(this);
		this.listToggle = this.listToggle.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
		this.handlePlayToggle = this.handlePlayToggle.bind(this);
		this.handleFinishRender = this.handleFinishRender.bind(this);
		this.handleReorder = this.handleReorder.bind(this);
		this.mapDelFin = this.mapDelFin.bind(this);
	}

	handleSubmit(stateObj){
		let { startAdd, numVal, endVal } = stateObj;
		let searchObj = {
			startAdd: startAdd,
			endAdd: endVal,
			limitNum: numVal
		}

		/*fetch to make yelp API call and save then return the location*/

		fetch(fetchURL+'/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(searchObj)
		})
		.then(res => res.json())
		.then(data => {
			if(data.actionSuccess){
				let locArr = data.locations;
				let locLen = locArr.length;
				let tmpArr = [];

				for(let i = 0; i < locLen; i++){
					tmpArr.push(false);
				}

				this.setState({
						locationArr: locArr,
						renderPhase: 1,
						searchState: stateObj,
						collBool: tmpArr, 
						error: null
				});
			}
			else{
				this.setState({
					error: data.error
				})
			}
		})
	}

	handlePhaseChange(phase){
		if(phase == 0){
			this.setState({
				renderPhase: phase,
				locInd: null,
				locationArr: [],
				viewInd: 0,
				collBool: null,
				playState: "play",
				drawRoute: false,
				delBool: true
			});
		}
		else if(phase == 2){
			this.setState({
				renderPhase: phase,
				drawRoute: true,
				locInd: 0,
			});
		}
		else{
			this.setState({
				renderPhase: phase
			});
		}
	}

	listCancel(ind){
		let locCopy = [...this.state.locationArr];
		let toggCopy = [...this.state.collBool];

		toggCopy.splice(ind, 1);
		locCopy.splice(ind, 1);

		this.setState({
			collBool: toggCopy,
			locationArr: locCopy,
			delBool: true
		});

		/*fetch() update locationArr*/
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

	listToggle(ind){
		let copyArr = [...this.state.collBool];
		let newBool = this.state.collBool[ind];

		copyArr.splice(ind, 1, !newBool);

		this.setState({
			collBool: copyArr
		});

	}

	handlePlayToggle(action, ind = 0){
		if(action == "play"){
			this.setState({
				playState: action
			})
		}
		else if(action == "pause"){
			this.setState({
				viewInd: ind,
				playState: action
			})
		}
		else if(action == "next"){
			let currInd = this.state.locInd;
			let newInd = currInd + 1;
			
			if (currInd != this.state.locationArr.length - 1){
				this.setState({
					locInd: newInd
				})
			}
			/*fetch() update index*/
		}
		else if(action == "back"){
			let currInd = this.state.locInd;
			let newInd = currInd - 1;

			if(currInd != 0){
				this.setState({
					locInd: newInd
				})
			}
			/*fetch() update index*/
		}
		else{
			this.setState({
				renderPhase: 1,
				locInd: null
			});
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

	mapDelFin(){
		this.setState({
			delBool: false
		})
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
					onPlayToggle={this.handlePlayToggle}
					locations={this.state.locationArr}
					locInd={this.state.locInd}
					viewInd={this.state.viewInd}
					playState={this.state.playState}
					error={this.state.error}
				/>
				<Col xs="12" sm="6" md="7" lg="8" className="h-100 px-0 d-flex align-items-center justify-content-center overflow-auto">
				<MapCont
					drawRoute={this.state.drawRoute} 
					markerArr={this.state.locationArr}
					locInd={this.state.locInd} 
					onClick={this.handleMapClick}
					onReorder={this.handleReorder}
					finishRender={this.handleFinishRender} 
					endDest={this.state.searchState.endVal}
					delBool={this.state.delBool}
					delFin={this.mapDelFin}
				/>
				</Col>
				</Row>
			</Container>
		)
	}

}

export default Root;