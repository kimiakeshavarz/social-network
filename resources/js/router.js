import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Addpost from './components/addpost.jsx';
import profile from './components/profile.jsx';
function App(){
	return(
		<div>
		<BrowserRouter>
			<Switch>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/profile' component={profile} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/' component={Dashboard} />
			</Switch>
		</BrowserRouter>
		</div>
		);

}

export default App;
ReactDOM.render(<App/>,document.getElementById('index'));