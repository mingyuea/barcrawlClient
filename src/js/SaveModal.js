import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { cardColor } from './StyleObj.js';

class SaveModal extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			modalName: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSave(){
		let nameVal = this.state.modalName;
		this.props.onSave(nameVal);
	}

	handleCancel(){
		this.props.toggleModal()
	}

	handleChange(e){
		let id = e.currentTarget.id;
		let val = e.currentTarget.value;
		let stateObj = {}
		stateObj[id] = val

		this.setState(stateObj);
	}


	render(){
		return(
			<Modal isOpen={this.props.modalState} toggle={this.props.toggleModal}>
				<ModalHeader toggle={this.props.toggleModal}>
					Save This Route
				</ModalHeader>
				<ModalBody>
					Give this route a name:
					<br />
					<Input onChange={this.handleChange} type="text" id="modalName" value={this.state.modalName} placeholder="e.g. A good Saturday" />
				</ModalBody>
				<ModalFooter>
					<Button className="mt-1 btn-info" onClick={this.handleSave}>Save</Button>
					<Button className="mt-1 btn-danger" onClick={this.handleCancel}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

export default SaveModal;