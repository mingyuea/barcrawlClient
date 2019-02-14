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
			searchState: {
				startAdd: "",
				numVal: "",
				endVal: ""
			},
			locInd: null,
			viewInd: 0,
			playState: "play",
			error: null,
			delBool: false,
			modalState: false,
			endBtnBool: true,
			savedRoutes: null
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
		this.toggleModal = this.toggleModal.bind(this);
		this.modalSave = this.modalSave.bind(this);
		this.handleDDClick = this.handleDDClick.bind(this);
		this.handleDDDel = this.handleDDDel.bind(this);
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
		else if(phase == 4){
			this.setState({
				renderPhase: phase,
				modalState: true
			})
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
				fetch('/api/update/ind',{
					method: "POST",

				})
				this.setState({
					locInd: newInd
				})
			}
			/*fetch post and update index*/
			fetch('/api/update/ind', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({"currInd": newInd})
			})
			.then(res => res.json())
			.then(data => {
				if(!data.actionSuccess){
					this.setState({
						error: data.error
					});
				}
			});
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

			fetch('/api/update/ind', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({"currInd": newInd})
			})
			.then(res => res.json())
			.then(data => {
				if(!data.actionSuccess){
					this.setState({
						error: data.error
					});
				}
			});
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
				let newOrder = [initPoint, ...copyState]

				fetch('/api/update/route', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({"routeArr": newOrder})
				})
				.then(res => res.json())
				.then(data =>{
					if(data.actionSuccess){
						this.setState({
							locationArr: newOrder
						});
					}
					else{
						console.log(data.error);
					}
				})
		
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

	handleDDClick(ind){
		let reqObj = {
			routeInd: ind
		}

		fetch('/api/routes/get', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		})
		.then(res => res.json())
		.then(data => {
			if(data.actionSuccess){
				let tmpArr = [];
				let arrLen = data.routeArr.length;

				for(let i = 0; i < arrLen; i++){
					tmpArr.push(false);
				}

				this.setState({
					collBool: tmpArr,
					locationArr: data.routeArr,
					drawRoute: true,
					locInd: 0,
					renderPhase: 2
				})
			}
			else{
				this.setState({
					error: data.error
				})
			}
		})
	}

	handleDDDel(ind){
		let copyList = [...this.state.savedRoutes]
		let reqObj = {
			routeName: copyList[ind]
		}

		fetch('/api/routes/delete', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		})
		.then(res => res.json())
		.then(data => {
			if(data.actionSuccess){
				copyList.splice(ind, 1);
				this.setState({
					savedRoutes: copyList
				})
			}
			else{
				this.setState({
					error: data.error
				})
			}
		})
	}

	mapDelFin(){
		this.setState({
			delBool: false
		})
	}

	modalSave(inVal){
		let reqObj = {
			"routeArr": this.state.locationArr,
			"routeName": inVal
		}

		fetch('/api/routes/save', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqObj)
		})
		.then(res => res.json())
		.then(data => this.setState({
					modalState: false,
					endBtnBool: false
		}))
	}

	toggleModal(){
		this.setState(prevState => ({
				modalState: !prevState.modalState
		}))
	}

	componentDidMount(){
		fetch('/api/init')
		.then(res => res.json())
		.then(data => {
			if(data.actionSuccess){
				let routeLen = data.routeArr.length;
				let tmpArr = []
				for(let i = 0; i < routeLen; i++){
					tmpArr.push(false);
				}

				this.setState({
					locationArr: data.routeArr,
					locInd: data.currentInd,
					drawRoute: true,
					collBool: tmpArr,
					renderPhase: 2,
					savedRoutes: data.savedRoutes
				})
			}
			else{
				this.setState({
					savedRoutes: data.savedRoutes
				})
			}
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
					onDDClick={this.handleDDClick}
					onDDDel={this.handleDDDel}
					locations={this.state.locationArr}
					locInd={this.state.locInd}
					viewInd={this.state.viewInd}
					playState={this.state.playState}
					error={this.state.error}
					btnMode={this.state.endBtnBool}
					modalState={this.state.modalState}
					toggleModal={this.toggleModal}
					modalSave={this.modalSave}
					saveList={this.state.savedRoutes}
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