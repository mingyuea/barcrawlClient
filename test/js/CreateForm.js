import React from 'react';

class CreateForm extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			"ansChoices": 1
		}

		this.handleInChange = this.handleInChange.bind(this);
		this.handleSel = this.handleSel.bind(this);
	}

	handleInChange(e){
		let val = e.currentTarget.value;
		let id = e.currentTarget.id;
		let parentID = e.currentTarget.parentNode.id;

		/*if(gridBool == "grid"){
			gridBool = true;
		}
		else{
			gridBool = false
		}*/
		//console.log(id, parentID == "tableData", parentID == "ansArr");
		this.props.onChange(id, val, parentID);
	}

	handleSel(e){
		let selVal = e.currentTarget.value;
		let parentID = e.currentTarget.id;
		console.log(selVal, parentID)
		this.props.onSel(parentID, selVal);
	}

	render(){
		let inRend;
		if(this.props.inStyle == "regText"){
			inRend = <textarea id="formTextArea" value={this.props.textArea} onChange={this.handleInChange} />
		}
		else{
			let gridMatrix = []
			let inArr = this.props.inArr;
			for(let j = 0; j < this.props.gridSize[0];j++){
				let gridRow = [];
				for(let i = 0;i < this.props.gridSize[1];i++){
					gridRow.push(<td id="tableData"><input type="text" value={inArr[j][i]} id={i+","+j} onChange={this.handleInChange} /></td>)
				}
				gridMatrix.push(<tr>{gridRow}</tr>)
			}
			inRend = <table id="grid"><tbody>{gridMatrix}</tbody></table>
		}

		let ansArr = [];
		for(let i = 0; i < this.props.ansNum; i++){
			ansArr.push(<div id="ansArr">{i} ). <input type="text" onChange={this.handleInChange} value={this.props.ansArr[i]} id={i} /></div>)
		}

		return(
			<div>
				<form onSubmit={this.props.onSubmit}>
					{inRend}

					<div>
						Select the type of question: 
						<select id="typeVal" value={this.props.typeVal} onChange={this.handleSel}>
							<option value="mcq">Multiple Choice</option>
							<option value="openEnd">Open Ended</option>
							<option value="calc">Calculation</option>
							<option value="allApplies">All that applies</option>
						</select>
						<br />
						Select question category: 
						<select id="sectionVal" value={this.props.sectionVal} onChange={this.handleSel}>
							<option value="behav">Behavioral</option>
							<option value="fin">Financial</option>
							<option value="finModel">Financial Modeling</option>
							<option value="paperLBO">Paper LBO</option>
							<option value="probSolv">Problem Solving</option>
							<option value="investApt">Investment Aptitude</option>
						</select>
						<br />
						<label id="timeLimit">
							Max Time Allowed in Minutes (Default is 5): 
							<input type="number" id="timeLimit" value={this.props.timeLimit} onChange={this.handleInChange} />
						</label>
						<br />
						<div>
							Enter in your answer choices:
							{ansArr}
							<button onClick={this.props.addAns}>Add another answer choice</button>
						</div>
						<div>
							Enter in the number that corresponds to the right answer:
							<input id="ansInd" type="text" value={this.props.ansInd} onChange={this.handleInChange} />
						</div>
						<div>
							<input type="submit" value="Submit Question" />
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default CreateForm;