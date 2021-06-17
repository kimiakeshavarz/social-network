import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './getposts.jsx';
class Profile extends React.Component{

	constructor(props){
        super(props);
    }

	render(){
		var username = window.location.pathname.split('/').pop();

		axios.get('/api/getuserinfo/'+username).then(function(response){
			json = response.data.json;
		});

		axios.get('/api/getfollowings/').then(function(response){
			this.setState(function(state,props){
				return {followers : response.data.json};
			});
		});

		axios.get('/api/getfollowers/').then(function(response){
			this.setState(function(state,props){
				return {followers : response.data.json};
			});
		});

		return(<h1>3123</h1>);
	}
}

export default Profile;
ReactDOM.render(<Profile/>,document.getElementById('index'));