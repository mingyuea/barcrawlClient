import React from 'react';
import { Card, CardText, CardFooter, Badge, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { bodyFont, subtitleFontFam, cardColor } from './StyleObj.js'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

class SearchComp extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			startAdd: "",
			endVal: "",
			numVal: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		let val = e.currentTarget.value;
		let field = e.currentTarget.id;
		let stateObj = {};

		stateObj[field] = val;

		this.setState(stateObj);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSubmit(this.state)
	}

	render(){
		let errMsg
		if(this.props.error){
			errMsg = <p className="text-danger">Error: {this.props.error}</p>
		}
		return(
				<Card body style={cardColor} className="text-center text-white">
					<PerfectScrollbar>
					<h4 className="mb-1" style={subtitleFontFam}>Plan a Bar Crawl</h4>
						<hr className="my-2"></hr>
						<Form>
							<FormGroup size="sm" className="mb-3">
								<Label style={subtitleFontFam} for="startAdd" className="font-italic">Pick a Starting Address</Label>
								<Input onChange={this.handleChange} type="text" id="startAdd" value={this.state.startAdd} placeholder="e.g. 2517 Durant Ave, Berkeley, CA 94704" required />
							</FormGroup>

							<FormGroup>
								<h6 className="font-italic" style={subtitleFontFam}>Optionals</h6>
								<CardText style={bodyFont}>Try and just enter in one or the other. You might get a weird route if fill out both (but does it really matter if you're drunk?)</CardText>
								<Input onChange={this.handleChange} type="number" min="1" max="9" id="numVal" value={this.state.numVal} placeholder="How many bars?" />
								<Input className="mt-3" onChange={this.handleChange} type="text" id="endVal" value={this.state.endVal} placeholder="Enter in an ending address" />
							</FormGroup>

							<FormGroup>
								{errMsg}
								<Button color="info" onClick={this.handleSubmit}>FIND ME A ROUTE!</Button>
							</FormGroup>
						</Form>
						<CardFooter className="pt-1 pb-0">
							<a href="/static/auth" color="info">Login/Signup</a>
						</CardFooter>
					</PerfectScrollbar>
				</Card>
		);
	}
}

export default SearchComp;