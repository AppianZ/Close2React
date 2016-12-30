# 你应该知道的React事件绑定

## 案例1：
### tab示例效果图
![](https://ohovav7hg.qnssl.com/reactws6.png)

### 错误示范
```javascript
// 父组件主要是为了实现tab的切换
const Content = React.createClass({
	getInitialState() {
		return {
			tabTxt: ['CURD', 'Axios', 'Others'],
			choice: 0, //目前激活的tab的下标
		}
	},
	
	switchChoice(idx){ // 设置choice
		this.setState({
			choice: idx
		})
	},
	
	renderTabInit(text, idx) {
		return (<Tab key={idx} idx={idx}
		              // 利用props的绑定，把switchChoice传到子组件中去，this.props.choose可以调用到这个方法
					 choose={this.switchChoice} 
					 choice={this.state.choice}
		>{text}</Tab>)
	},
	
	render() { ...... }
});
```

自以为把方法传入了子组件，就在Tab子组件中直接this.props.choose调用父组件的方法
```JavaScript
const Tab = React.createClass({
	render(){
		return (
			<span className={this.props.idx == this.props.choice? "tab on" : "tab"}
				  data-idx={this.props.idx}
				  // 本意是在点击的时候，能够直接调用父组件的方法
				  onClick={this.props.choose(this.props.idx)} 
			>{this.props.children}</span>
		)
	}
});
```

结果浏览器打开就爆炸了。boom
![](https://ohovav7hg.qnssl.com/reactws7.png)

> 大概意思就是说：
>我在父组件中的setState在渲染的时候导致了一个错误。React不能更新一个正在变化的state。
> 组件中的render应该是一个带有state和props的pure function（纯函数）。如果不是纯函数，构造器会产生一些副作用。
> 比如在render的时候（组件挂载的时候）会根据props指定的参数继续向下执行，则会在挂载的时候（还没发生点击事件）就直接执行了父组件的函数。

> 顺便解释一下pure function
> 1、给出同样的参数值，该函数总是求出同样的结果。该函数结果值不依赖任何隐藏信息或程序执行处理可能改变的状态或在程序的两个不同的执行，也不能依赖来自I/O装置的任何外部的输入
> 2、结果的求值不会促使任何可语义上可观察的副作用或输出，例如易变对象的变化或输出到I/O装置 

### 正确姿势
```javascript
const Tab = React.createClass({
	chooseTab() { // 子组件的中转函数
		this.props.choose(this.props.idx); //在这里调用父组件的函数
	},
	
	render(){
		return (
			<span className={this.props.idx == this.props.choice? "tab on" : "tab"}
				  data-idx={this.props.idx}
				  onClick={this.chooseTab} // 调用中转函数
			>{this.props.children}</span>
		)
	}
});
```

> 这个`中转函数`的名词是我自己取的，只是这样就能让点击事件的函数变成pure function，就不会在组件挂载的时候就沿着props继续向下执行，就能避免在挂载组件的时候就直接调用父组件的setState了。

- - - - --
## 案例2
### todolist 的 编辑 & 保存 示例效果图
![](https://ohovav7hg.qnssl.com/reactws8.png)

### 错误示范
```javascript
// 父组件
const PageA = React.createClass({
	getInitialState() { ... }, // 初始化todolist的数据
	componentDidMount(){ ... }, // 挂载组件时的函数
	initDidCount() { ... }, // 更新完成的进度
	
	handleTxtChange(event){ // 重点: 当input的输入值变化时调用这个函数
		let index = event.target.getAttribute('data-index'); // 强行得到todolist的index
		// 这里一定需要index这个参数作为修改this.state.list时候的下标
		this.state.list[index].text = event.target.value; // 把input的值更新到state上去
		this.setState({
			list: this.state.list
		});
		this.initDidCount(); // 更新完成进度
	},

	handleCheckChange(event,idx) { ... }, // checkbox的onChange,和input的onChange一样
	deleteItem(idx) { ... },  // 删除
	
	initListLi(val,idx) {
		return (
			<List {...val} key={idx} index={idx} // 绑定一些需要用到的props
			     // 利用props的绑定，把handleTxtChange传到子组件中去，
			     //子组件中用this.props.handleTxtChange可以调用到这个方法
			     //（handleCheckChange也是同理）
				  handleTxtChange={this.handleTxtChange}
				  handleCheckChange={this.handleCheckChange}
				  deleteItem={this.deleteItem}
			/>
		)
	},
	
	render() { ...... }
});
```
这里也会和案例1有同样的情况，父组件用props传入的方法里面有setState，如果在子组件的reader中直接用`this.props.handleTxtChange` 调用的话，会导致函数不纯。

### 错误姿势1
```javascript
// 错误的父组件1
...
 handleTxtChange(event,idx){ // 重点:【错误写法1】 强行传了两个参数
        console.log(event, idx); // 在控制台上输出结果
    		this.state.list[idx].text = event.target.value; // 把input的值更新到state上去
    		this.setState({
    			list: this.state.list
    		});
    		this.initDidCount(); // 更新完成进度
    	},
...


// 错误的子组件1
...
render (){
		return (
			<li className="li">
				...
        			{
					this.state.status?
                        // 重点代码开始
						<input type="text" className="ipt"
							   defaultValue={this.props.text}
							   //【错误写法1】 直接调用了父组件的函数，并且直接传了两个参数（框架的默认参数event和自定义参数index）
   							   onChange={this.props.handleTxtChange(event,this.props.index)}/>:    
					   // 重点代码结束
						<p className="p">{this.props.text}</p>
				}
				...
			</li>
		)
	}
...
```
你会发现，你想要给props的方法里传的自定义参数index能正常获取，
而框架自带参数event怎么都拿不到，
结果只能如下，event会变成undefined。
![](https://ohovav7hg.qnssl.com/reactws9.png)

### 错误姿势2
```javascript
// 错误的父组件2
...
 handleTxtChange(event){ // 重点:【错误写法2】 只有框架自带参数event
        console.log(event.target); // 在控制台上输出结果
         let index = event.target.getAttribute('data-index'); // 强行拿到标签上的自定义属性
    		this.state.list[index].text = event.target.value; // 把input的值更新到state上去
    		this.setState({
    			list: this.state.list
    		});
    		this.initDidCount(); // 更新完成进度
    	},
...


// 错误的子组件2
...
render (){
		return (
			<li className="li">
				...
				{
					this.state.status?
                        // 重点代码开始
						<input type="text" className="ipt"
							   defaultValue={this.props.text}
							   //【错误写法2】 直接调用父组件的函数，但是不传参数
							   // 自定义参数利用自定义属性的方式传入，
							   // 这次尝试，也只是为了能够拿到正确的event
							   data-index={this.props.index} // 强行使用了自定义属性
							   onChange={this.props.handleTxtChange}/>:    // 不带参数
					   // 重点代码结束
						<p className="p">{this.props.text}</p>
				}
				...
			</li>
		)
	}
...
```
当发现多传了参数，导致了框架自带的默认参数event怎么都取不到的时候，
决定不传参数，用其他歪门邪道（比如自定义属性）拿到想要的参数。
在input中输入内容，结果如下。虽然正确，但这样写感觉实在是不够智能。
![](https://ohovav7hg.qnssl.com/reactws10.png)
总之，这样写虽然解决了问题，但我还是觉得姿势还是不对。

### 正确姿势
```javascript
// 正确的父组件
...
    handleTxtChange(event,idx){// 重点:【正确姿势】 不仅带了框架默认参数event，还带了自定义参数
		this.state.list[idx].text = event.target.value;
		this.setState({ // 最正常的赋值写法
			list: this.state.list
		});
		this.initDidCount();
	},
...

// 正确的子组件
...
    handleTxt(event) {
        // 用一个中转函数来存onChange时会调用的父组件的函数
        // 并加上任意的参数
		this.props.handleTxtChange(event, this.props.index);
	},
	
	render (){
		return (
			<li className="li">
				...
				{
					this.state.status?
					    // 重点代码开始
						<input type="text" className="ipt"
							   defaultValue={this.props.text}
							   // 【正确姿势】调用子组件的中转函数
							   onChange={this.handleTxt}/>:
					     // 重点代码结束
						<p className="p">{this.props.text}</p>
				}
                    ...
			</li>
		)
	}
...
```

> 如果这样写的话，是达到了和案例1一样的效果。
> 即`中转函数`的效果，保证了render时的函数都是pure function
> 并且也防止了子组件在挂载时，render顺着this.props.function调用父组件的函数
> 从而避免了一系列错误。

## 案例3
案例3纯粹是为了演示一个增加操作，在增加一条记录后，需要清空input的内容时踩的坑
![](https://ohovav7hg.qnssl.com/reactws11.png)

```javascript
// 父组件
    addLiItem(obj) {
		this.state.list.push(obj); // 没啥好说，就是添加一个元素到list中去
		this.setState({
			list: this.state.list
		});
		this.initDidCount();
	},
```


```javascript
// 子组件
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
		this.setState({ //【重点部分】
			addValue: ''
		}, ()=>{
			this.refs.addIpt.value = ''; // 利用ref操作dom
		});
	},
	// 如果只是setState的时候发现完成没办法达到清空的效果
	// 这时候的【正确姿势】是去操作dom，一定要操作dom
	render() {
		return (
			<div>
			   // 定义了一个ref是addIpt的input标签
				<input className="ipt" onChange={this.handleAddChange} value={this.addStatus} ref="addIpt"/>
				<button className="btn btn-save" style={{float: 'left'}} onClick={this.add}>添加</button>
			</div>
		)
	}
});
```

- - - - --
## 究极正确形态
### 比如案例3
```html
// add子组件部分
render() {
	return (
		<div> 
		    // 利用箭头函数的形式的写法，但是调用的是子组件里的方法
			<input className="ipt" onChange={(e)=>this.handleAddChange(e)} value={this.addStatus} ref="addIpt"/>
			<button className="btn btn-save" style={{float: 'left'}} onClick={()=>this.add()}>添加</button>
		</div>
	)
}
	
// 父组件部分
// 需要一个参数obj，配合父组件的addLiItem方法的参数
// 第一个obj是指，子组件传递过来的参数，然后把子组件传递过来的参数传给父组件的addLiItem方法
<Add addLiItem={(obj)=>this.addLiItem(obj)}/>
```

## 案例2的todolist的编辑保存
```html
// 父组件中
// 修改input的值，则需要event和idx两个参数
handleTxtChange(event, idx){ 
	this.state.list[idx].text = event.target.value;
	this.setState({
		list: this.state.list
	});
	this.initDidCount();
}

// 修改checkbox的值，只需要idx
handleCheckChange(idx) { 
	this.state.list[idx].status = !this.state.list[idx].status;
	this.setState({
		list: this.state.list
	});
	this.initDidCount();
}

// 删除一条记录，只需要idx
deleteItem(idx) {
	var temp = this.state.list.splice(idx, 1);
	this.setState({
		list: this.state.list
	});
	this.initDidCount();
}

// 循环输出todolist
initListLi(val, idx) { 
	return (
		<List {...val} key={idx} index={idx}
	          // 把父组件的方法作为prop
			  handleTxtChange={(e)=>this.handleTxtChange(e,idx)}
			  handleCheckChange={()=>this.handleCheckChange(idx)}
			  // 调用父组件的删除方法需要传一个idx
			  deleteItem={()=>this.deleteItem(idx)}
		/>
	)
}

render() {
	return (
		<article className="page">
			...
			<ul className="ul">
			    // 在map中调用父组件本身的方法，并把map的参数传给initListLi
			    // 第一个(val,idx)是指，map方法自带的参数，然后把子组件传递过来的参数传给父组件的initListLi方法
				{  this.state.list.map((val,idx)=>this.initListLi(val,idx))  }
			</ul>
			...
		</article>
	)
}

// todolist的一条记录的子组件
render (){
	return (
		<li className="li">
			<input type="checkbox"
				   checked={this.props.status}
				   data-index={this.props.index}
				   // 不需要`中转函数` 直接调用props的handleCheckChange方法，
				   onChange={()=>this.props.handleCheckChange()}/>
			{
				this.state.status ?
					<input type="text" className="ipt"
						   defaultValue={this.props.text}
						   data-index={this.props.index}
					   	   // 不需要`中转函数` 直接调用props的handleTxtChange方法，带一个参数e
						   onChange={(e)=>this.props.handleTxtChange(e)}/> :
					<p className="p">{this.props.text}</p>
			}
             // 不需要`中转函数` 直接调用props的deleteItem方法
			<button className="btn btn-danger" onClick={()=>this.props.deleteItem()}>删除</button>
			{
				this.state.status ?
					<button className="btn btn-save" onClick={()=>this.saveLiValue()}>保存</button> :
					<button className="btn btn-save" onClick={()=>this.editLiValue()}>编辑</button>
			}
		</li>
	)
}
```
- - - - -
# 总结
为了尽可能使用pure function，也为了保证挂载的时候不要出问题

在子组件需要调用父组件的this.props.function的时候

尽可能使用`中转函数`，就像[page_a_1.js](/src/index/components/page_a_1.js)一样

但是如果你能够正确使用`箭头函数`，还是使用箭头函数，就像[page_a.js](/src/index/components/page_a.js)一样

你懂得~~