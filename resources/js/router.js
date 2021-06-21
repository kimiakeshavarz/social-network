import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Addpost from './components/addpost.jsx';
import Profile from './components/profile.jsx';

export const Context = React.createContext()

function App(){
	return(
		<div>
		<BrowserRouter>
			<Switch>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/profile' component={Profile} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/addpost' component={Addpost} />
			<Route path='/' component={Login} />
			</Switch>
		</BrowserRouter>
		</div>
		);

}

export default App;
ReactDOM.render(<App/>,document.getElementById('index'));