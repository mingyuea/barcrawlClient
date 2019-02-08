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
			route: ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5", "Place 6", "Place 7"]
		}

		this.handleCancel = this.handleCancel.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	handleCancel(e){
		let ind = e.currentTarget.id;
		let routeCopy = [...this.state.route];

		routeCopy.splice(ind, 1);

		this.setState({
			route: routeCopy
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
		let routeArr = this.state.route;
		let routeLen = routeArr.length;

		if(routeLen > 0){
			for(let i = 0; i < routeLen; i++){
				listRender.push(
					<ListGroupItem>
						<Row>
						<Col xs="9" className="px-0">
						{routeArr[i]}
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
			<Col xs="12" sm="6" md="5" lg="4" className="h-100 d-flex align-items-center justify-content-center overflow-auto" style={colColor}>
				<Card body style={cardColor} className="text-center text-white overflow-auto">
					<h3 className="mb-1" style={subtitleFontFam}>Your Intenerary</h3>
					<hr className="mb-3"></hr>
					<PerfectScrollbar>
					<ListGroup style={listStyle}>
						{listRender}
					</ListGroup>
					</PerfectScrollbar>
					<Button className="mt-1 btn-info" onClick={this.handleConfirm}>START THE BAR CRAWL!</Button>
					<Button className="mt-1 btn-danger" onClick={this.handleBack}> GO BACK </Button>
				</Card>
			</Col>
		)
	}
}

export default ListComp;