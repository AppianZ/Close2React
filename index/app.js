/**
 * Created by appian on 2016/12/14.
 */
import React from 'react';
import Tab from './components/tab';
import PageA from './components/page_a';
import PageB from './components/page_b';
import PageC from './components/page_c';

const Content = React.createClass({
	getInitialState() {
		return {
			tabTxt: ['About A', 'About B', 'About C'],
			choice: 0,
		}
	},
	
	switchChoice(idx){
		this.setState({
			choice: idx
		})
	},
	
	renderTabInit(text, idx) {
		return (<Tab key={idx} idx={idx}
					 choose={this.switchChoice}
					 choice={this.state.choice}
		>{text}</Tab>)
	},
	
	render() {
		let currentPage = null;
		if(this.state.choice == 0) {
			currentPage = <PageA />
		} else if (this.state.choice == 1){
			currentPage = <PageB />
		} else {
			currentPage = <PageC />
		}
		return (
			<div id="content">
				<div id="navBox">
					{this.state.tabTxt.map(this.renderTabInit)}
				</div>
				<div id="pageBox">
					{currentPage}
				</div>
			</div>
		)
	}
});


const App = React.createClass({
	  render(){
		  return (
			<Content />
		  )
	  }
});

export default App;