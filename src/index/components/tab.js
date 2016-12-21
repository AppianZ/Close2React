/**
 * Created by appian on 2016/12/14.
 */
import React from 'react';

const Tab = React.createClass({
	chooseTab() {
		this.props.choose(this.props.idx);
	},
	
	render(){
		return (
			<span className={this.props.idx == this.props.choice ? "tab on" : "tab"}
				  data-idx={this.props.idx}
				  onClick={this.chooseTab}
			>{this.props.children}</span>
		)
	}
});

export default Tab;