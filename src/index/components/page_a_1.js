/**
 * Created by appian on 2016/12/14.
 */
import React, { Component } from 'react';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false, //true是修改
		}
	}
	
	saveLiValue() {
		this.setState({
			status: false
		})
	}
	
	editLiValue() {
		this.setState({
			status: true
		})
	}
	
	deleteLiValue() {
		this.props.deleteItem(this.props.index);
	}
	
	handleTxt(event) {
		this.props.handleTxtChange(event, this.props.index);
	}
	
	handleCheck(event) {
		this.props.handleCheckChange(event, this.props.index);
	}
	
	render() {
		return (
			<li className="li">
				<input type="checkbox"
					   checked={this.props.status}
					   data-index={this.props.index}
					   onChange={this.handleCheck.bind(this)}/>
				{
					this.state.status ?
						<input type="text" className="ipt"
							   defaultValue={this.props.text}
							   data-index={this.props.index}
							   onChange={this.handleTxt.bind(this)}/> :
						<p className="p">{this.props.text}</p>
				}
				<button className="btn btn-danger" onClick={this.deleteLiValue.bind(this)}>删除</button>
				{
					this.state.status ?
						<button className="btn btn-save" onClick={this.saveLiValue.bind(this)}>保存</button> :
						<button className="btn btn-save" onClick={this.editLiValue.bind(this)}>编辑</button>
				}
			</li>
		)
	}
}


class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addValue: '',
			addStatus: false
		}
	}
	
	handleAddChange(event) {
		this.setState({
			addValue: event.target.value
		})
	}
	
	add() {
		this.props.addLiItem({
			text: this.state.addValue,
			status: false
		});
		this.setState({
			addValue: ''
		}, ()=> {
			this.refs.addIpt.value = '';
		});
	}
	
	render() {
		return (
			<div>
				<input className="ipt" onChange={this.handleAddChange.bind(this)} value={this.addStatus} ref="addIpt"/>
				<button className="btn btn-save" style={{ float: 'left' }} onClick={this.add.bind(this)}>添加</button>
			</div>
		)
	}
}

class PageA extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [{
				text: 'this is todo lIST 0',
				status: false
			}, {
				text: 'this is todo lIST 1',
				status: true
			}, {
				text: 'this is todo lIST 2',
				status: true
			}],
			didCount: 0
		}
	}
	
	componentDidMount() {
		this.initDidCount();
	}
	
	initDidCount() {
		let count = 0;
		this.state.list.map((val, idx) => {
			if (val.status) {
				count++
			}
		});
		this.setState({
			didCount: count
		})
	}
	
	handleTxtChange(event, idx) {
		this.state.list[idx].text = event.target.value;
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	}
	
	handleCheckChange(event, idx) {
		this.state.list[idx].status = !this.state.list[idx].status;
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	}
	
	deleteItem(idx) {
		var temp = this.state.list.splice(idx, 1);
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	}
	
	addLiItem(obj) {
		this.state.list.push(obj);
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	}
	
	initListLi(val, idx) {
		return (
			<List {...val} key={idx} index={idx}
				  handleTxtChange={this.handleTxtChange.bind(this)}
				  handleCheckChange={this.handleCheckChange.bind(this)}
				  deleteItem={this.deleteItem.bind(this)}
			/>
		)
	}
	
	render() {
		return (
			<article className="page">
				<h3 className="h3">List总条数: {this.state.list.length}</h3>
				<h3 className="h3">目前完成条数: {this.state.didCount}</h3>
				<ul className="ul">
					{
						this.state.list.map(this.initListLi.bind(this))
					}
				</ul>
				<Add addLiItem={this.addLiItem.bind(this)}/>
			</article>
		)
	}
}

export default PageA;