import React from 'react';
import { Row, Col, Card, Button, Spinner, ListGroup, ListGroupItem } from 'reactstrap';
import { XCircle } from 'react-feather';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { bodyFont, titleFontFam, subtitleFontFam, colColor, cardColor, listIcon, listStyle } from './StyleObj.js'


class ListComp extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			locations: ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5", "Place 6", "Place 7"]
		}

		this.handleCancel = this.handleCancel.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	handleCancel(e){
		let ind = e.currentTarget.id;
		let routeCopy = [...this.state.locations];

		routeCopy.splice(ind, 1);

		this.setState({
			locations: routeCopy
		})
		console.log(ind);
	}

	handleConfirm(){
		console.log("Starting");
	}

	handleBack(){
		this.props.onPhase(0);
	}

	render(){
		let listRender = [];
		let locArr = this.state.locations;
		let routeLen = locArr.length;

		if(routeLen > 0){
			for(let i = 0; i < routeLen; i++){
				listRender.push(
					<ListGroupItem>
						<Row>
						<Col xs="9" className="px-0">
						{locArr[i]}
						</Col>
						<Col xs="3" className="px-0">
						<Button className="btn-danger" id={i} onClick={this.handleCancel}><XCircle style={listIcon} /></Button>
						</Col>
						</Row>
					</ListGroupItem>
				);
			}
		}

		return(
				<Card body style={cardColor} className="text-center text-white overflow-auto">
					<h3 className="mb-1" style={subtitleFontFam}>Your Bar List</h3>
					<hr className="mb-3"></hr>
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