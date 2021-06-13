import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App(){
	return(
		<BrowserRouter>
			<Switch>
				<Route path='/login'>
				</Route>
				<Route path='/dashboard'>
				</Route>
			</Switch>
		</BrowserRouter>
		);

}

export default App;