import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import logo from './logo.svg';
import './App.css';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleDrawerToggle = () => {
		this.setState({ open: !this.state.open });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar
						title="Music Services App"
						onLeftIconButtonClick={this.handleDrawerToggle}
					/>
					<Drawer
						open={this.state.open}
						onRequestChange={open => this.setState({ open })}
					>
						<MenuItem onClick={this.handleClose}>First Item</MenuItem>
						<MenuItem onClick={this.handleClose}>Second Item</MenuItem>
						<MenuItem onClick={this.handleClose}>Third Item</MenuItem>
					</Drawer>
					<p className="App-intro">
						To get started, edit <code>src/App.js</code> and save to reload.
					</p>
				</div>
			</MuiThemeProvider>
		);
	}
}
