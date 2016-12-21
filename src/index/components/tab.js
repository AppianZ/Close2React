/**
 * Created by appian on 2016/12/14.
 */
import React, {Component}  from 'react';

class Tab extends Component{
	constructor(props){
		super(props);
	}
	
	chooseTab() {
		this.props.choose(this.props.idx);
	}
	
	render(){
		return (
			<span className={this.props.idx == this.props.choice? "tab on" : "tab"}
				  data-idx={this.props.idx}
				  onClick={this.chooseTab.bind(this)}
			>{this.props.children}</span>
		)
	}
}


export default Tab;