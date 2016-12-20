/**
 * Created by appian on 2016/12/14.
 */
import React from 'react';
import Axios from 'axios';

const List = React.createClass({
	initLi(value, idx) {
		return(
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

var PageB = React.createClass({
	getInitialState(){
		return {
			keyword: '',
			list: [],
			loading: false,
			loadTemp: '<h2 style="color: green;">we are loading</h2>'
		}
	},
	
	handleSearchKey(event){
		this.setState({
			keyword: event.target.value
		})
	},
	
	handleKeyUp(event) {
		if(event.keyCode === 13)this.searchUserAxios();
	},
	
	searchUserAxios(){
		this.setState({
			loading: true
		});
		Axios.get(`https://api.github.com/search/users?q=${this.state.keyword}`)
		.then((res) => {
			this.setState({
				loading:false,
				list: res.data.items,
				keyword: ''
			}, ()=>{
				this.refs.searchIpt.value = '';
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	
	render(){
		let targetTemp = null;
		if(this.state.loading) {
			targetTemp = this.state.loadTemp;
		} else if(this.state.list.length == 0) {
			targetTemp = '<h2 style="color: red;">nothing</h2>'
		} else {
			targetTemp = ''
		}
		return (
			<article className="page">
				<input className="ipt" type="text" defaultValue={this.keyword} onChange={this.handleSearchKey} ref="searchIpt" onKeyUp={this.handleKeyUp}/>
				<button className="btn btn-save" onClick={this.searchUserAxios}>搜索</button>
				<div dangerouslySetInnerHTML={{__html: targetTemp}}/>
				<List data={this.state.list}/>
			</article>
		)
	}
});

export default PageB;