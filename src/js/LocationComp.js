import React from 'react';
import { Row, Col, Card, CardText, CardBody, Button, Spinner, Tooltip } from 'reactstrap';
import { SkipBack, SkipForward, PlayCircle, PauseCircle, StopCircle } from 'react-feather';
import { playerBtn, playerBtnVoid } from './StyleObj.js'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

class LocationComp extends React.Component{
	constructor(props){
		super(props);

		this.state = {
				playPause: false,
				stop: false,
				back: false,
				next: false
		}

		this.toggleStopTip = this.toggleStopTip.bind(this);
		this.togglePPTip = this.togglePPTip.bind(this);
		this.handlePlayToggle = this.handlePlayToggle.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
	}

	toggleStopTip(){
		this.setState({
			stop: !this.state.stop
		})
	}

	togglePPTip(){
		this.setState({
			playPause: !this.state.playPause
		});
	}

	handlePlayToggle(e){
		let action = e.currentTarget.id;
		this.props.onPlayToggle(action);
	}

	handleEnd(){
		console.log("to phase 3");
		this.props.onPhase(3);
	}

	render(){
		const alph = "ABCDEFGHIJK";
		let ppTooltip, playRend, currInd, currMsg;
		let place, prevPlace, nextPlace, prevBtn, nextBtn; //= this.props.locations[this.props.locInd];

		if(this.props.playState == "pause"){
			currInd = this.props.viewInd;
			place = this.props.locations[currInd];
			ppTooltip = "Resume from Stop " + alph[this.props.locInd];
			currMsg = "Currently viewing Stop " + alph[currInd]
			playRend = <PlayCircle onClick={this.handlePlayToggle} id="play" style={playerBtn} />
		}
		else{
			currInd = this.props.locInd;
			place = this.props.locations[currInd];
			ppTooltip = "Pause for a second";
			currMsg = "Currently at Stop " + alph[this.props.locInd];
			playRend = <PauseCircle onClick={this.handlePlayToggle} id="pause" style={playerBtn} />
		}

		if(currInd != 0){
			prevPlace = this.props.locations[currInd - 1].name;
			prevBtn = <SkipBack onClick={this.handlePlayToggle} id="back" style={playerBtn} />;
		}
		else if(currInd == 0){
			prevBtn = <SkipBack id="back" style={playerBtnVoid} />
		}

		if(currInd != this.props.locations.length - 1){
			nextPlace = this.props.locations[currInd + 1].name;
			nextBtn = <SkipForward onClick={this.handlePlayToggle} id="next" style={playerBtn} />
		}
		else if(currInd == this.props.locations.length - 1){
			nextPlace = "THE END!";
			nextBtn = <SkipForward onClick={this.handleEnd} id="next" style={playerBtn} />
		}


		return(
			<Card className="bg-transparent" style={{maxHeight: "95%",color:"rgba(55, 60, 71, 1)", borderColor:"rgba(55, 60, 71, 1)"}}>
				<PerfectScrollbar>
				<img className="card-img-top p-1" style={{maxHeight: "220px"}} src={place.image_url} />
				<CardBody>
					<Col xs="12 text-center">
						<CardText className="mb-1" style={{fontSize:"0.65em"}}>{currMsg}</CardText>
						<CardText className="mb-2" style={{fontSize:"1.2em"}}>{place.name}</CardText>
						<CardText className="mb-2" style={{fontSize:"0.8em"}}>{place.location.address1}</CardText>
						<CardText style={{fontSize:"0.8em"}}>Rating: {place.rating} / 5</CardText>
					</Col>
					<hr className="my-3" style={{borderColor:"rgba(55, 60, 71, 1)"}}></hr>
					<Row>
						<Col id="playPause" xs={{size: 2, offset: 4}}>
							{playRend}
							<Tooltip placement="bottom" isOpen={this.state.playPause} target="playPause" toggle={this.togglePPTip}>{ppTooltip}</Tooltip>
						</Col>
						<Col xs="2">
							<StopCircle onClick={this.handlePlayToggle} id="stop" style={playerBtn} />
							<Tooltip placement="bottom" isOpen={this.state.stop} target="stop" toggle={this.toggleStopTip}>Stop and go back to your list</Tooltip>
						</Col>
					</Row>
					<Row>
							<Col xs={{size: 2, offset: 2}}>
								{prevBtn}
							</Col>
							<Col xs="4">
							</Col>				
							<Col xs="2">
								{nextBtn}
							</Col>
							
					</Row>
					<Row>
						<Col xs="6" className="text-center" style={{fontSize:"0.65em"}}>
								{prevPlace}
						</Col>

						<Col xs="6" className="text-center" style={{fontSize:"0.65em"}}>
								{nextPlace}
						</Col>
					</Row>
				</CardBody>
				</PerfectScrollbar>
			</Card>
		)
	}
}

export default LocationComp;