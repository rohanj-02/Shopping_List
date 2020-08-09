import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";

import "./App.css";

function App() {
	return (
		<div className="App">
			<AppNavBar />
			<ShoppingList />
			<h1>Hey</h1>
		</div>
	);
}

export default App;
