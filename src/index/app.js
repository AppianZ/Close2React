/**
 * Created by appian on 2016/12/14.
 */
import React, { Component } from 'react';
import Tab from './components/tab';
import PageA from './components/page_a';
import PageB from './components/page_b';
import PageC from './components/page_c';


class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabTxt: ['CURD', 'Axios', 'Others'],
			choice: 0,
		};
		
	}
	
	switchChoice(idx) {
		this.setState({
			choice: idx
		})
	}
	
	renderTabInit(text, idx) {
		return (<Tab key={idx} idx={idx}
					 choose={this.switchChoice.bind(this)}
					 choice={this.state.choice}
		>{text}</Tab>)
	}
	
	render() {
		let currentPage = null;
		if (this.state.choice == 0) {
			currentPage = <PageA />
		} else if (this.state.choice == 1) {
			currentPage = <PageB />
		} else {
			currentPage = <PageC />
		}
		return (
			<div id="content">
				<div id="navBox">
					{this.state.tabTxt.map(this.renderTabInit.bind(this))}
				</div>
				<div id="pageBox">
					{currentPage}
				</div>
			</div>
		)
	}
	
}


class App extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Content />
		)
	}
}

export default App;