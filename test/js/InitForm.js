import React from 'react';

class initForm extends React.Component{
	constructor(props){
		super(props);

		this.handleSel = this.handleSel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInChange = this.handleInChange.bind(this);
	}

	handleSel(e){
		let selID = e.currentTarget.value;
		if(selID == "grid"){
			this.props.showGrid(true);
		}
		else{
			this.props.showGrid(false);
		}
		this.props.onSel(selID);
	}

	handleInChange(e){
		let id = e.currentTarget.id;
		let val = e.currentTarget.value;

		this.props.onInChange(id, val);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSubmit();
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<select value={this.props.selVal} onChange={this.handleSel}>
					<option value="regText">Regular Text</option>
					<option value="grid">Grid</option>
				</select>
				<div style={this.props.gridStyle}>
					<input id="0" type="number" value={this.props.gridSize[0]} onChange={this.handleInChange} /> Rows
					<input id="1" type="number" value={this.props.gridSize[1]} onChange={this.handleInChange} /> Columns
				</div>
				<input type="submit" value="Submit" />
			</form>
		);
	}

}

export default initForm