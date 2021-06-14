import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Example from './components/Example';
function App(){
	return(
		<div>
		<BrowserRouter>
			<Switch>
			<Route path='/login'>
			<Login/>
			</Route>
			<Route path='/'>
			<Example/>
			</Route>
			</Switch>
		</BrowserRouter>
		</div>
		);

}

export default App;
ReactDOM.render(<App/>,document.getElementById('index'));