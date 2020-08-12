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
	NavLink,
	Alert,
} from "reactstrap";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
	state = {
		modal: false,
		name: "",
		email: "",
		password: "",
		msg: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		register: PropTypes.func.isRequired,
		error: PropTypes.object.isRequired,
		clearErrors: PropTypes.func.isRequired,
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			if (error.id === "REGISTER_FAIL") {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}

		if (this.state.modal) {
			if (isAuthenticated) {
				this.toggleModal();
			}
		}
	}

	toggleModal = () => {
		this.props.clearErrors();
		this.setState({
			modal: !this.state.modal,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password } = this.state;
		const newUser = {
			name,
			email,
			password,
		};
		this.props.register(newUser);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggleModal} href="#">
					Register
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Register </ModalHeader>
					<ModalBody>
						{this.state.msg ? (
							<Alert color="danger">{this.state.msg}</Alert>
						) : null}
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label htmlFor="name">Name</Label>
								<Input
									type="text"
									id="name"
									name="name"
									placeholder="Name"
									className="mb-3"
									onChange={this.handleChange}
								/>
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									name="email"
									placeholder="Email"
									className="mb-3"
									onChange={this.handleChange}
								/>
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									id="password"
									name="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.handleChange}
								/>
								<Button
									color="dark"
									style={{ marginTop: "2rem" }}
									block
								>
									Register
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
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});
export default connect(mapStateToProps, { register, clearErrors })(
	RegisterModal
);
