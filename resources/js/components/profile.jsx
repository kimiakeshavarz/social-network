import React from 'react';
import ReactDOM from 'react-dom';
class Profile extends React.Component{

	constructor(props){
        super(props);
    }

	render(){
		var username = window.location.pathname.split('/').pop();
		return(<h1>3123</h1>);
	}
}

export default Profile;
