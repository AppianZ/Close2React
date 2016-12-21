/**
 * Created by appian on 2016/12/14.
 */
import React from 'react';
import Axios from 'axios';

const List = React.createClass({
	initLi(value, idx) {
		return (
			<li className="li" key={idx}>
				<img className="img" src={value.avatar_url}/>
				<span className="span">{value.login}</span>
			</li>
		)
	},
	
	render (){
		return (
			<ul>
				{this.props.data.map(this.initLi)}
			</ul>
		)
	}
});

const PageB = React.createClass({
	getInitialState(){
		return {
			keyword: '',
			list: [],
			loading: false,
		}
	},
	
	handleSearchKey(event){
		this.setState({
			keyword: event.target.value
		})
	},
	
	handleKeyUp(event) {
		if (event.keyCode === 13)this.searchUserAxios();
	},
	
	searchUserAxios(){
		this.setState({
			loading: true
		});
		Axios.get(`https://api.github.com/search/users?q=${this.state.keyword}`)
		.then((res) => {
			this.setState({
				loading: false,
				list: res.data.items,
				keyword: ''
			}, ()=> {
				this.refs.searchIpt.value = '';
			});
		})
		.catch((error) => {
			console.log(error);
		});
	},
	
	render(){
		let targetTemp = null;
		if (this.state.loading) {
			targetTemp = '<h2 style="color: green;">we are searching.</h2>';
		} else if (this.state.list.length == 0) {
			targetTemp = '<h2 style="color: red;">nothing.</h2>';
		} else {
			targetTemp = ''
		}
		return (
			<article className="page">
				<h3 className="h3">利用axios发起请求,搜索github用户</h3>
				<input className="ipt" type="text"
					   defaultValue={this.keyword}
					   onChange={this.handleSearchKey}
					   ref="searchIpt"
					   onKeyUp={this.handleKeyUp}
					   placeholder="您可以在这里搜索github用户名"/>
				<button className="btn btn-save" onClick={this.searchUserAxios}>搜索</button>
				<div dangerouslySetInnerHTML={{ __html: targetTemp }}/>
				<List data={this.state.list}/>
			</article>
		)
	}
});

export default PageB;