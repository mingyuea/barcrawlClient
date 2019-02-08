import React from 'react';
import { Container, Row } from 'reactstrap';
//import Auth from './Auth.js'
import SideContainer from './SideContainer.js';
import MapCont from './MapCont.js';


const fetchURL = 'http://localhost:5000/'

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
	/*constructor(props){
		super(props);

		this.state ={
			"serverMsg": ""
		}

		this.getCookie = this.getCookie.bind(this);
		this.sendCookie = this.sendCookie.bind(this);
	}

	getCookie(){
		let url = fetchURL + 'cookie';
		fetch(url, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			header: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => console.log(data))
	}

	sendCookie(){
		let url = fetchURL + 'cookie';
		let req = {'includedCookie': true}

		fetch(url, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			header: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(req)
		})
		.then(res => res.json())
		.then(data => console.log(data))
	}

	componentDidMount(){
		console.log('mounted')

		fetch(fetchURL)
		.then(res => res.json())
		.then(data => console.log(data))
	}

	render(){
		return(
			<div>Works
			<button onClick={this.getCookie}> Click </button>
			<button onClick={this.sendCookie}> Send </button>
			</div>
		)
	}*/
	render(){
		return(
			<Container className="w-100 h-100" style={contStyle}>
				<Row className="h-100 w-100">
				<SideContainer />
				<MapCont />
				</Row>
			</Container>
		)
	}

}

export default Root;