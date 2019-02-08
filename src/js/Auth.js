import React from 'react';
//import { Connect } from 'react-redux';
import { Row, Col, Card, CardTitle, CardBody, CardFooter, Form, FormGroup, Input, Label, Button } from 'reactstrap';


class Auth extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			login: true,
			uInput: "",
			p1Input: "",
			p2Input: ""
		}

		this.handleInput = this.handleInput.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAnon = this.handleAnon.bind(this);
	}

	handleInput(e){
		let elem = e.currentTarget.id;
		let val = e.currentTarget.value;
		let tmpObj = {}
		tmpObj[elem] = val;

		this.setState(tmpObj);
	}

	toggleLogin(){
		this.setState(prevState => ({
			login: !(prevState.login)
		}));
	}

	handleSubmit(e){
		e.preventDefault();
		console.log(this.state);
	}

	handleAnon(){
		console.log("Anon use");
	}

	render(){
		let p2Render = null;
		let titleText = "Login";
		let buttonText = "Login";
		let btn2Text = "Sign up";
		if(!(this.state.login)){
			titleText = "Register";
			buttonText = "Sign Up";
			btn2Text = "Login";
			p2Render = <FormGroup>
	                   		<Col md="12">
	                    		<Input type="password" id="p2Input" placeholder="Retype Password" value={this.state.p2Input} onChange={this.handleInput} required />
	                    	</Col>
                    	</FormGroup>
		}

		return(
			<Row className="full-height-vh">
				<Col xs="12" className="d-flex align-items-center justify-content-center">
					<Card className="text-center width-350">
                    	<CardBody>
                    		<CardTitle><h4>{titleText}</h4></CardTitle>
                    			<Form className="pt-3" onSubmit={this.handleSubmit} >
                    				<FormGroup>
	                    				<Col md="12">
	                    					<Input type="text" id="uInput" placeholder="Username" value={this.state.uInput} onChange={this.handleInput} required />
	                    				</Col>
                    				</FormGroup>

                    				<FormGroup>
	                    				<Col md="12">
	                    					<Input type="password" id="p1Input" placeholder="Password" value={this.state.p1Input} onChange={this.handleInput} required />
	                    				</Col>
                    				</FormGroup>

                    				{p2Render}

                    				<FormGroup>
                    					<Col md="12">
                    						<Button type="info" color="primary" className="btn-raised">
                    							{buttonText}
                    						</Button>
                    						<Button type="button" color="success" className="ml-2 btn-raised" onClick={this.toggleLogin} >
                    							{btn2Text}
                    						</Button>
	                    				</Col>
                    				</FormGroup>
                    			</Form>
                    	</CardBody>
                    	<CardFooter>
                    		<Col md="12" className="d-flex align-items-center justify-content-center">
                    			<Button type="button" color="secondary" block className="btn-raised" onClick={this.handleAnon} >
                    				Use Anonymously
                    			</Button>
                    		</Col>
                    	</CardFooter>
                    </Card>
				</Col>
			</Row>
		)
	}
}

export default Auth;