import React from 'react';
import InitForm from './InitForm.js';
import CreateForm from './CreateForm.js';

//const fetchURL = 'http://localhost:5000/'

class Root extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			"renderPhase": 0,
			"initSel": "regText",
			"gridDisp": {display: 'none'},
			"gridSize": ["", ""],
			"gridData": [],
			"formTextArea": "",
			"typeVal": "mcq",
			"sectionVal": "behav",
			"timeLimit": 5,
			"ansNum": 1,
			"ansArr": [""],
			"ansInd": null,
		}	

		this.handleInitSel = this.handleInitSel.bind(this);
		this.handleShowGrid = this.handleShowGrid.bind(this);
		this.handleInitSizeChange = this.handleInitSizeChange.bind(this);
		this.handleInitSubmit = this.handleInitSubmit.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSel = this.handleFormSel.bind(this);
		this.addFormAns = this.addFormAns.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleInitSel(name){
		this.setState({
			"initSel": name
		});
	}

	handleShowGrid(bool){
		if(bool){
			this.setState({
				"gridDisp": {display:'block'}
			});
		}
		else{
			this.setState({
				"gridDisp": {display:'none'}
			});
		}
	}

	handleInitSizeChange(id, val){
		let currSize = this.state.gridSize;
		currSize[Number(id)] = Number(val)

		this.setState({
			"gridSize": currSize
		});
	}

	handleInitSubmit(){
		let gridSize = this.state.gridSize;
		let choice = this.state.initSel;
		let matrix = [];
		//let promRes = False;

		let setProm = new Promise(function(resolve, reject){
			for(let i = 0; i < gridSize[0]; i++){
			let rowArr = [];
				for(let j=0; j < gridSize[1]; j++){
					rowArr.push("");
					//console.log("pushed")
				}
				//console.log("row is"+ rowArr)
				matrix.push(rowArr);
			}
			let promRes = true

			if(promRes){
				resolve(matrix)
			}
			else{
				reject('Something failed')
			}
		});

		setProm
		.then((matrix) => {
			this.setState({
				'gridData': matrix,
			});
			return;
		})
		.then(()=>{
			this.setState({
				"renderPhase": 1
			})
		})

		

		/**this.setState({
			"renderPhase": 1,
			"gridData": matrix
		});**/
	}

	handleFormChange(id, val, parentID){
		//console.log(id, val, gridBool);
		if(parentID == "tableData"){

			let gridData = this.state.gridData;
			let coord = id.split(",")
			gridData[Number(coord[1])][Number(coord[0])] = val;

			this.setState({
				'gridData': gridData
			})
		}
		else if(parentID == "ansArr"){
			console.log(parentID);
			let ansArr = this.state.ansArr;
			ansArr[Number(id)] = val;
			this.setState({
				"ansArr": ansArr
			})
		}
		else{
			//console.log(id, val);

			let stateObj = {};
			stateObj[id] = val;
			this.setState(stateObj);
		}
	}

	handleFormSel(parentID, selVal){
		let stateObj = {};
		stateObj[parentID] = selVal;
		this.setState(stateObj);
	}

	addFormAns(e){
		e.preventDefault();
		let ansNum = this.state.ansNum;
		let ansArr = this.state.ansArr;

		ansNum += 1
		ansArr.push("")

		this.setState({
			"ansNum": ansNum,
			"ansArr": ansArr
		})
	}

	handleFormSubmit(e){
		e.preventDefault();
		let questionObj = {
			"qInputType": this.state.initSel,
			"questionType": this.state.typeVal,
			"financeSection": this.state.sectionVal,
			"maxTimeAllowed": this.state.timeLimit,
			"answer": this.state.ansInd 
		};

		if(this.state.initSel == "regText"){
			questionObj["questionBody"] = this.state.formTextArea;
		}
		else{
			questionObj["questionBody"] = this.state.gridData;
		}

		console.log(questionObj);

		fetch('/qcrud/submit', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(questionObj)
		})
	}

	render(){
		let rendDiv;
		if(this.state.renderPhase == 0){
			rendDiv = <InitForm onSubmit={this.handleInitSubmit} onInChange={this.handleInitSizeChange} onSel={this.handleInitSel} showGrid={this.handleShowGrid} gridStyle={this.state.gridDisp} gridSize={this.state.gridSize} selVal={this.state.initSel} />
		}
		else if(this.state.renderPhase == 1){
			rendDiv = <CreateForm inStyle={this.state.initSel} onChange={this.handleFormChange} gridSize={this.state.gridSize} inArr={this.state.gridData} textArea={this.state.formTextArea} ansArr={this.state.ansArr} typeVal={this.state.typeVal} sectionVal={this.state.sectionVal} onSel={this.handleFormSel} addAns={this.addFormAns} ansNum={this.state.ansNum} onSubmit={this.handleFormSubmit} />
		}

		return(
			<div>
				Create a Question
				{rendDiv}
			</div>
		)
	}

}

export default Root;