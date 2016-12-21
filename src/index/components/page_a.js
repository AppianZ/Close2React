/**
 * Created by appian on 2016/12/14.
 */
import React from 'react';

const List = React.createClass({
	getInitialState() {
		return {
			status: false, //true是修改
		}
	},
	
	saveLiValue() {
		this.setState({
			status: false
		})
	},
	
	editLiValue(){
		this.setState({
			status: true
		})
	},
	
	deleteLiValue(){
		this.props.deleteItem(this.props.index);
	},
	
	handleTxt(event) {
		this.props.handleTxtChange(event, this.props.index);
	},
	
	handleCheck(event) {
		this.props.handleCheckChange(event, this.props.index);
	},
	
	render (){
		return (
			<li className="li">
				<input type="checkbox"
					   checked={this.props.status}
					   data-index={this.props.index}
					   onChange={this.handleCheck}/>
				{
					this.state.status ?
						<input type="text" className="ipt"
							   defaultValue={this.props.text}
							   data-index={this.props.index}
							   onChange={this.handleTxt}/> :
						<p className="p">{this.props.text}</p>
				}
				<button className="btn btn-danger" onClick={this.deleteLiValue}>删除</button>
				{
					this.state.status ?
						<button className="btn btn-save" onClick={this.saveLiValue}>保存</button> :
						<button className="btn btn-save" onClick={this.editLiValue}>编辑</button>
				}
			</li>
		)
	}
});

const Add = React.createClass({
	getInitialState() {
		return {
			addValue: '',
			addStatus: false
		}
	},
	
	handleAddChange(event) {
		this.setState({
			addValue: event.target.value
		})
	},
	
	add(){
		this.props.addLiItem({
			text: this.state.addValue,
			status: false
		});
		this.setState({
			addValue: ''
		}, ()=>{
			this.refs.addIpt.value = '';
		});
	},
	
	render() {
		return (
			<div>
				<input className="ipt" onChange={this.handleAddChange} value={this.addStatus} ref="addIpt"/>
				<button className="btn btn-save" style={{float: 'left'}} onClick={this.add}>添加</button>
			</div>
		)
	}
});

const PageA = React.createClass({
	getInitialState() {
		return {
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
			didCount: 0,
		}
	},
	
	componentDidMount(){
		this.initDidCount();
	},
	
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
	},
	
	handleTxtChange(event, idx){
		this.state.list[idx].text = event.target.value;
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	},
	
	handleCheckChange(event, idx) {
		this.state.list[idx].status = !this.state.list[idx].status;
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	},
	
	deleteItem(idx) {
		var temp = this.state.list.splice(idx, 1);
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	},
	
	addLiItem(obj) {
		this.state.list.push(obj);
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	},
	
	initListLi(val, idx) {
		return (
			<List {...val} key={idx} index={idx}
				  handleTxtChange={this.handleTxtChange}
				  handleCheckChange={this.handleCheckChange}
				  deleteItem={this.deleteItem}
			/>
		)
	},
	
	render() {
		return (
			<article className="page">
				<h3 className="h3">List总条数: {this.state.list.length}</h3>
				<h3 className="h3">目前完成条数: {this.state.didCount}</h3>
				<ul className="ul">
					{
						this.state.list.map(this.initListLi)
					}
				</ul>
				<Add addLiItem={this.addLiItem}/>
			</article>
		)
	}
});

export default PageA;