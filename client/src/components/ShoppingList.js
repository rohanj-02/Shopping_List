import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v1 as uuid } from "uuid";

class ShoppingList extends Component {
	state = {
		items: [
			{ id: uuid(), name: "Milk" },
			{ id: uuid(), name: "Dahi" },
			{ id: uuid(), name: "Cheese" },
			{ id: uuid(), name: "Extra" },
		],
	};

	render() {
		const { items } = this.state;
		return (
			<Container>
				<Button
					color="dark"
					style={{ marginBottom: "2rem" }}
					onClick={() => {
						const name = prompt("Enter Item");
						if (name) {
							this.setState((state) => ({
								items: [{ id: uuid(), name }, ...state.items],
							}));
						}
					}}
				>
					Add Item
				</Button>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ id, name }) => (
							<CSSTransition key={id} timeout={500} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={() => {
											this.setState((state) => ({
												items: state.items.filter(
													(item) => item.id !== id
												),
											}));
										}}
									>
										&times;
									</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

export default ShoppingList;
