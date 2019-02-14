import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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

class Root extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			renderPhase: 0,
			locationArr: [],
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