import React from 'react';
import { Card, CardFooter, Button } from 'reactstrap';
import { cardColor } from './StyleObj.js'

class UserEnd extends React.Component{
	constructor(props){
		super(props);

		this.handleBack = this.handleBack.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}

	handleSave(){
		this.props.onPhase(4);
	}

	handleRestart(){
		let reqBody = {
			routeArr: [],
			routeInd: 0
		};

		fetch('/api/update/route', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqBody)
		})
		.then(res => this.props.onPhase(0));
	}

	handleBack(){
		this.props.onPhase(2);
	}

	render(){
		let btnRend;
		if(this.props.btnMode){
			btnRend = <Button className="mt-1 btn-success" onClick={this.handleSave}>Save This Barcrawl</Button>
		}
		else{
			btnRend = <Button className="mt-1 btn-danger" onClick={this.handleBack}>Wait, Go Back</Button>
		}

		return(
			<Card body style={cardColor} className="text-center text-white overflow-auto">
				<h3 className="mb-0">Congrats! You've Finished the Barcrawl!</h3>
				<hr className="mb-3 mt-2"></hr>
				<Button className="mt-1 btn-info" onClick={this.handleRestart}>Start Another Barcrawl!</Button>
				{btnRend}
				<CardFooter>
					<a href="/auth/logout" color="info">Logout</a>
				</CardFooter>
			</Card>
		);
	}
}

export default UserEnd;