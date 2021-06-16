import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard.js';
import Login from './components/login.jsx';
import Example from './components/Example';
import Register from './components/register.jsx';
function App(){
	return(
		<div>
		<BrowserRouter>
			<Switch>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/' component={Example} />
			</Switch>
		</BrowserRouter>
		</div>
		);

}

export default App;
ReactDOM.render(<App/>,document.getElementById('index'));