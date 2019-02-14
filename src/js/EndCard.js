import React from 'react';
import { Card, CardFooter, Button } from 'reactstrap';
import { bodyFont, subtitleFontFam, cardColor } from './StyleObj.js'

class EndCard extends React.Component{
	constructor(props){
		super(props);

		this.handleBack = this.handleBack.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}

	handleBack(){
		this.props.onPhase(2);
	}

	handleRestart(){
		console.log("going to phase 0 again")
		this.props.onPhase(0);
	}

	render(){
		return(
			<Card body style={cardColor} className="text-center text-white overflow-auto">
				<h3 className="mb-0">Congrats! You've Finished the Barcrawl!</h3>
				<hr className="mb-3 mt-2"></hr>
				<Button className="mt-1 btn-info" onClick={this.handleRestart}>Start Another Barcrawl!</Button>
				<Button className="mt-1 btn-danger" onClick={this.handleBack}>Wait, Go Back</Button>
				<CardFooter>
					<a href="/static/auth" color="info">Login/Signup</a>
				</CardFooter>
			</Card>
		);
	}
}

export default EndCard;