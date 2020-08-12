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
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class LoginModal extends Component {
	state = {
		modal: false,
		email: "",
		password: "",
		msg: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		login: PropTypes.func.isRequired,
		error: PropTypes.object.isRequired,
		clearErrors: PropTypes.func.isRequired,
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			if (error.id === "LOGIN_FAIL") {
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
		const { email, password } = this.state;
		const newUser = { email, password };
		this.props.login(newUser);
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
					Login
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Login </ModalHeader>
					<ModalBody>
						{this.state.msg ? (
							<Alert color="danger">{this.state.msg}</Alert>
						) : null}
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
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
									Login
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
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
