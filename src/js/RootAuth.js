import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auth from './Auth.js'


const fetchURL = '';

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

class RootAuth extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={contStyle}>
				<Auth />
			</div>
		)
	}
}

export default RootAuth;