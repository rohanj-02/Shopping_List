import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
	state = {
		modal: false,
		name: "",
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const newItem = {
			name: this.state.name,
		};
		this.props.addItem(newItem);
		this.toggleModal();
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		return (
			<div>
				{this.props.isAuthenticated ? (
					<Button
						color="dark"
						style={{ marginBottom: "2rem" }}
						onClick={this.toggleModal}
					>
						Add Item
					</Button>
				) : (
					<h4 className="mb-3 ml-4">Please login to manage items</h4>
				)}
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						Add to Shopping List
					</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label htmlFor="item">Item</Label>
								<Input
									type="text"
									id="item"
									name="name"
									placeholder="Add shopping item"
									onChange={this.handleChange}
								/>
								<Button
									color="dark"
									style={{ marginTop: "2rem" }}
									block
								>
									Add Item
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
