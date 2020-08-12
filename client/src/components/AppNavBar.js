import React, { Component } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	toggleNavbar = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<React.Fragment>
				<NavItem>
					<span className="navbar-text mr-3">
						<strong>{user ? `Welcome ${user.name}` : ""}</strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</React.Fragment>
		);
		const guestLinks = (
			<React.Fragment>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</React.Fragment>
		);
		return (
			<Navbar color="dark" dark expand="sm" className="mb-5">
				<Container>
					<NavbarBrand href="/">Shopping List</NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{isAuthenticated ? authLinks : guestLinks}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavBar);
