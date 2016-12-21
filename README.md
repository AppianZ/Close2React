# 一段人人都应该知道的从vue到react的过渡史

## 写在前面
以前写Vue写惯了，心血来潮，写起了react。

目前该项目有两个分支, `half-es6` + `master`

half-es6和master实现的功能一样, 实现了**CURD + Axios + Others**

[half-es6](https://github.com/AppianZ/Close2React/tree/half-es6)的写法并没有完全使用es6的class的概念, [master](https://github.com/AppianZ/Close2React)是完善了它



## 环境配置
写react就需要先配置webpack还有jsx
首先，新建一个项目，npm init
然后在package中加入下面这些依赖

```json
  "dependencies": {
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^5.0.1",
    "react-router": "^3.0.0"
  },
  "devDependencies": {
    "axios": "^0.15.3",
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.8",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "babel-preset-react-hmre": "^1.1.1",
    "bootstrap": "^4.0.0-alpha.2",
    "css-loader": "^0.26.1",
    "file-loader": "^0.9.0",
    "html-webpack-plugin": "^2.24.1",
    "node-sass": "^3.13.0",
    "open-browser-webpack-plugin": "0.0.3",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.3",
    "webpack-dev-server": "^1.16.2"
  }
```

有两个比较重要的指令

```json
  "scripts": {
    "dev": "webpack-dev-server --progress --profile --hot",
    "build": "webpack --progress --profile --colors"
  },

```

### webpack.config
在webpack的配置中，我想要的目录结构是横向目录，目的是达到，我在src下编辑我想要的文件，打包后生成到public下去。
写在配置最前面的是路径的配置

```javascript
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'Public');
```

配合着入口文件和输出文件的配置

```javascript
entry: {
	index: path.resolve(SRC_PATH, 'index/index.js'),
},
output: {
	path: PUBLIC_PATH,
	filename: '[name].bundle.js',
},
```

主要的插件就是这个html生成的插件和自动打开浏览器的插件，还有babel的配置，不管三七二十一都把他们的等级开到最大

```javascript
plugins: [
	new HtmlwebpackPlugin({
		title: 'My first react-webpack'
	}),
	new OpenBrowserPlugin({
		url: 'http://localhost:8200'
	})
],
babel: { //配置babel
	"presets": ["es2015",'stage-0', 'react'],
},
```

npm run dev，就可以在浏览器上看到初始化的页面


### jsx
当你开始要写js的时候发现，怎么这么多警告，
不用担心 google 一下都能解决。
在这里下载react 和 react-native：
![](https://ohovav7hg.qnssl.com/reactws1.png)

并勾选对应项，保存：
![](https://ohovav7hg.qnssl.com/reactws2.png)

警告会少很多，但是还是有一些警告，怎么办呢
点击这个小灯泡，然后选择configure
![](https://ohovav7hg.qnssl.com/reactws3.png)

把这两项勾选掉，保存，就一片清净了。

![](https://ohovav7hg.qnssl.com/reactws4.png)

### 项目描述
Public是打包后生成的目录，src是写目录
src采用横向目录结构，所有index页面要用到的东西，包括sass和js都写在index目录下。

![](https://ohovav7hg.qnssl.com/reactws5.png)

### 指令运行项目
> npm i
>
> npm run build 生成打包后的文件
>
> npm run dev


## 数据绑定
### 1 文本插值 
> \<span>{text}\</span>

### 2 html 插值 
> \<div dangerouslySetInnerHTML={{__html: "\<p>balabalabalabala.......\</p>"}} />

### 3 属性赋值
> \<span id = {this.props.idName}>\</span>
>
> \<span className = "nav-box">\</span>

### 4 带js表达式的插值 xxx = {三元表达式}
>  \<span className={this.props.idx == this.props.choice? "tab on" : "tab"} >\</span>

### 5 事件绑定
事件绑定和属性绑定一样
```javascript
getInitialState() {
	return {
		tabTxt: ['CURD', 'Axios', 'Others'],
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
			 choose={this.switchChoice} // 绑定了switchChoice方法
			 choice={this.state.choice} // 数据data的绑定，this.state可以获取到整个state 
		 	>{text}</Tab>)
},
```
有可能会遇到一些BOOM爆炸的bug，请看[react父子组件间的事件绑定](https://github.com/AppianZ/Close2React/blob/master/conponents_events.md)
<br/>

## css和style的绑定
### 1 className
> className={this.props.idx == this.props.choice? "tab on" : "tab"}

### 2 style 
> 第一个括号是插值，第二个括号表示style对象
>
> style={{color: '#FEC264', fontSize: '40px'}}

<br/>

## 列表渲染 & 条件渲染
在getInitalState中定义了一个数组tabTxt
```javascript
getInitialState() {
		return {
			tabTxt: ['CURD', 'Axios', 'Others'],
			choice: 0,
		}
	},
```
循环渲染这个子组件，每个子组件有自己的唯一的key，作用和track-by（或v-bind:key）的作用类似


```javascript
renderTabInit(text, idx) {
		return (<Tab key={idx} idx={idx}
					 choose={this.switchChoice}
					 choice={this.state.choice}
		>{text}</Tab>)
	},
```
列表渲染 使用map
v-if 的条件渲染可用三元，如复杂则需要在return前写逻辑代码
```javascript
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
```


## 表单控件
表单组件有几个受用户影响的属性：
> value，用于input、textarea组件
>
> checked， 用于类型为 checkbox 或者 radio 的 input 组件
>
> selected，用于option组件

每个表单控件都有一个onChange事件用来监听组件的变化:
> 当 input 或 textarea 的value 发生变化时
>
> input 的 checked 状态改变时
>
> option 的 selected 状态改变时

### 受限组件： 
```javescript
	//es5
    render: function() {
        return <input type="text" value="Hello!" />;
     }
    // 在渲染出来的元素里输入任何值都不起作用，因为 React 已经赋值为 Hello!
```

如果要让用户修改的值有用，则需要：
```javascript
  getInitialState() {
    return {value: 'Hello!'};
  },
  handleChange(event) {
    this.setState({value: event.target.value});
  },
  render() {
    let value = this.state.value;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }
```

### 不受限组件：
```javescript
	//es5
   render: function() {
      return (
          <div>
            <input type="radio" name="opt" defaultChecked /> Option 1
            <input type="radio" name="opt" /> Option 2
            <select defaultValue="C">
              <option value="A">Apple</option>
              <option value="B">Banana</option>
              <option value="C">Cranberry</option>
            </select>
          </div>
      );
    }    
    // 用户输入将立即反应到元素上。
    // 和受限元素一样，使用 onChange 事件可以监听值的变化。
    // default 有一个初始值，但这个值用户可以改变并会反应到界面上。  
```


##  父子组件通信
### 父子组件通信
```javascript
// 父组件，相当于最大的组件
// 子组件是一个tab，和三个page，切换tab 就能切换 page
const Content = React.createClass({
	getInitialState() {
		return {
			tabTxt: ['CURD', 'Axios', 'Others'],
			choice: 0, // 当前选中的tab下标
		}
	},
	
	switchChoice(idx){
		this.setState({ // 修改state    
			choice: idx
		})
	},
	
	renderTabInit(text, idx) {
		return (<Tab key={idx} idx={idx}
				 choice={this.state.choice}  // key\idx\choice 分别都是作为props传入tab子组件的参数名
				 choose={this.switchChoice}  // choose 作为props作为传入tab子组件的方法名
		      >{text}</Tab>)
	},
	
	render() {
		let currentPage = null;
		if(this.state.choice == 0) { // 条件判断
			currentPage = <PageA />
		} else if (this.state.choice == 1){
			currentPage = <PageB />
		} else {
			currentPage = <PageC />
		}
		return (
			<div id="content">
				<div id="navBox">
					{this.state.tabTxt.map(this.renderTabInit)} //循环输出
				</div>
				<div id="pageBox">
					{currentPage}
				</div>
			</div>
		)
	}
});
```

> 在使用事件绑定choose={this.switchChoice} 的时候，因为没有采用class的学法所以不用bind
>
> class的写法的时候需要bind: choose={this.switchChoice.bind(this)}
>
> 不用class的写法的时候不绑定不会导致子组件的this指向错误，如果绑定了还会报错（如绑定this会有警告） 
>
> 使用了class的写法的时候则需要手动bind, 这个在文章最后会详细解说 

```javascript
// tab 子组件
const Tab = React.createClass({
	chooseTab() {
		this.props.choose(this.props.idx); //一定要将父组件的方法在子组件中做一个中转
	},
	
	render(){
		return (
			<span className={this.props.idx == this.props.choice? "tab on" : "tab"}
				  style={{color: '#FEC264', fontSize: '40px'}}
				  data-idx={this.props.idx}
				  onClick={this.chooseTab} // 调用子组件的方法
			>{this.props.children}</span>
		)
	}
});
```

## 获取dom元素
> 当你的组件还没有挂载在容器上，可以用this.refs访问
>
> 已经挂载完毕，通过react-dom提供findDOMNode方法拿到组件对应的dom
>
> 另外：
>
> 如果ref是设置在原生HTML元素上，它拿到的就是DOM元素;
>
> 如果设置在自定义组件上，它拿到的就是组件实例，这时候就需要通过 findDOMNode来拿到组件的DOM元素。

```javascript
//es5
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.getDOMNode().focus(); // 通过this.refs.xxxxx拿到元素
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" /> // 给输入框命名ref 
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});
```


## 几个常用api
### componentDidMount (组件挂载完成后)
### componentWillReceiveProps(nextProps)（当传入的props有变化）

- - - - --

# 花一分钟,改成正统的class写法
## 第一步，把所有createClass 换成 class xxx extends Component
我们用一半的es6的姿势写出来的代码如下：
```javascript
// half-es6
import React from 'react';
const List = React.createClass({ // 用createdClass创建一个组件
	getInitialState() { // 初始化数据state    
		return { // 在函数的return里定义state
			status: false, 
		}
	}, // 这里一定写逗号
	saveLiValue() { // 组件内要调用的function
		this.setState({
			status: false
		})
	},
	....
})
```

我们用完整的es6的姿势写出来的代码如下：

```javascript
// 利用class姿势的es6
import React, {Component} from 'react';
class List extends Component{
	constructor(props){
		super(props);
		this.state = { 
			status: false, 
		}
	} // 没有逗号
	
	saveLiValue() {
		this.setState({
			status: false
		})
	}
	....
}		
```

## 第二步，在父组件中，给所有需要传递给子组件的方法加bind(this)
> 这句话有点绕口，但一定要理解。
> 1、第一层意思是在父组件上加bind(this)
> 2、加的目的是防止子组件在调用方法的时候this指向错误

例如下面这个初始化列表的函数
```javascript
// half-es6
// 如果在这种写法下bind(this)，编译后的页面会报警告
// 大概是说react已经提供了丰富的方法可以避免指向错误，不需要手动bind
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
```
但是使用了class的写法之后，就可能会出现警告说 props 是null
这个时候就需要手动bind(this)
```javascript
// es6的class写法下的函数的时间绑定，
// 如果子组件会需要调用函数，则在父组件中手动向子组件中bind(this)
initListLi(val, idx) {
	return (
		<List {...val} key={idx} index={idx}
              // 以下三个方法都是在向List组件中绑定this
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
					this.state.list.map(this.initListLi.bind(this)) //子组件中会需要调用函数
				}
			</ul>
			<Add addLiItem={this.addLiItem.bind(this)}/>
		</article>
	)
}
```

