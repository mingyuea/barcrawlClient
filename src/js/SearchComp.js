import React from 'react';
import { Row, Card, CardText, CardTitle, CardBody, CardFooter, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { bodyFont, subtitleFontFam, cardColor } from './StyleObj.js'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

class SearchComp extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			startAdd: "",
			endVal: "",
			numVal: "",
			dropdown: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.ddToggle = this.ddToggle.bind(this);
		this.handleDDItemClick = this.handleDDItemClick.bind(this);
		this.handleItemDel = this.handleItemDel.bind(this);
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

	handleDDItemClick(e){
		let ind = e.currentTarget.id;
		this.props.onDDClick(ind);
	}

	handleItemDel(e){
		let ind = e.currentTarget.parentNode.id;
		this.props.onDDDel(ind);
	}

	ddToggle(){
		this.setState(prevState =>({
			dropdown: !prevState.dropdown
		}))
	}

	render(){
		let errMsg, dropMenu;
		if(this.props.error){
			errMsg = <p className="text-danger">Error: {this.props.error}</p>
		}

		if(this.props.saveList && this.props.saveList.length > 0){
			let saveList = this.props.saveList;	
			dropMenu = saveList.map((title, ind) => <DropdownItem key={"dropdown"+ind} id={ind} onClick={this.handleDDItemClick}>{title} <Button color="danger" className="py-1 px-2 float-right" onClick={this.handleItemDel}>X</Button></DropdownItem>)
		}
		else{
			dropMenu = <DropdownItem id="nothing" className="px-1">Nothing saved</DropdownItem>
		}

		return(
				<Card body style={cardColor} className="text-center text-white pb-2 pt-3">
					<PerfectScrollbar>
					<CardTitle className="text-left mb-1">
						<ButtonDropdown isOpen={this.state.dropdown} toggle={this.ddToggle}>
							<DropdownToggle caret className="px-5">
					        	Your Saved Bar Crawls
					        </DropdownToggle>
					        <DropdownMenu>
					        	{dropMenu}
        					</DropdownMenu>
						</ButtonDropdown>
					</CardTitle>
					<CardBody className="py-1">
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
								<Input onChange={this.handleChange} type="number" min="1" max="10" id="numVal" value={this.state.numVal} placeholder="How many bars?" />
								<Input className="mt-3" onChange={this.handleChange} type="text" id="endVal" value={this.state.endVal} placeholder="Enter in an ending address" />
							</FormGroup>

							<FormGroup>
								{errMsg}
								<Button color="info" onClick={this.handleSubmit}>FIND ME A ROUTE!</Button>
							</FormGroup>
						</Form>
						</CardBody>
						<CardFooter className="pt-1 pb-0">
							<a href="/auth/logout" color="info">Logout</a>
						</CardFooter>
					</PerfectScrollbar>
				</Card>
		);
	}
}

export default SearchComp;