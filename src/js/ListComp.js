import React from 'react';
import { Row, Col, Card, Button, Spinner, ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import { XCircle, ChevronRight, ChevronDown } from 'react-feather';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { bodyFont, titleFontFam, subtitleFontFam, colColor, cardColor, listGroupItem, listIcon, listIcon2, listStyle } from './StyleObj.js'

class ListComp extends React.Component {
	constructor(props){
		super(props);


		this.handleSelect = this.handleSelect.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	handleSelect(e){
		let ind = e.currentTarget.id;
		this.props.onSelect(ind);
	}

	handleCancel(e){
		let ind = e.currentTarget.id;
		this.props.onCancel(ind);
	}

	handleConfirm(){
		console.log("Starting");
		//this.props.onConfirm();
		this.props.onPhase(2);
	}

	handleBack(){
		this.props.onPhase(0);
	}

	componentDidMount(){
		let locArr = this.props.locations;
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
		let listRender = [];
		let locArr = this.props.locations;
		let routeLen = locArr.length;
		let alph = "ABCDEFGHIJK";

		if(routeLen > 0){
			for(let i = 0; i < routeLen; i++){
				let chev;
				let locObj = locArr[i];
				let collBool = this.props.collBool[i];

				if(collBool){
					chev = <ChevronDown style={listIcon2} />
				}
				else{
					chev = <ChevronRight style={listIcon2} />
				}

				listRender.push(
					<ListGroupItem key={'lgroupItem'+i} style={listGroupItem} >
						<Row>
						<Col xs="2" className="px-0" id={i} onClick={this.handleSelect}>
							{chev}
						</Col>
						<Col xs="7" className="px-0 text-left" id={i} onClick={this.handleSelect}>
							{alph[i] + "). " +locObj.name}
						</Col>
						<Col xs="3" className="px-0">
							<Button className="btn-danger" id={i} onClick={this.handleCancel}><XCircle style={listIcon} /></Button>
						</Col>
						</Row>

						<Collapse isOpen={collBool}>
							<Row className="pt-2">
							<Col xs="5" className="px-0">
								<img style={{width: "100%", height: "100%", borderRadius: '10px'}} src={locArr[i].image_url} />
							</Col>
							<Col xs="7" className="pl-1 pr-0 text-left" style={{fontSize: "0.8em"}}>
								Rating: {locObj.rating} / 5
								<br />
								Price Range: {locObj.price}
								<br />
								Address: {locObj.location.address1}
								<br />
								Phone: {locObj.display_phone}
							</Col>
							</Row>
						</Collapse>
					</ListGroupItem>
				);
			}
		}

		return(
				<Card body style={cardColor} className="text-center text-white overflow-auto">
					<h4 className="mb-0" style={subtitleFontFam}>Your Bar List</h4>
					<hr className="mb-3 mt-2"></hr>
					<PerfectScrollbar>
					<ListGroup style={listStyle}>
						{listRender}
					</ListGroup>
					</PerfectScrollbar>
					<Button className="mt-1 btn-info" onClick={this.handleConfirm}>START THE BAR CRAWL!</Button>
					<Button className="mt-1 btn-danger" onClick={this.handleBack}> GO BACK </Button>
				</Card>
		)
	}
}

export default ListComp;