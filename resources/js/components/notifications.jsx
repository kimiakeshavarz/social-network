import React from 'react';
import ReactDOM from 'react-dom';
import { Container,Row,Col,Button,Card,InputGroup,Form,FormControl,Alert }from 'react-bootstrap';

class Notifs extends React.Component{

constructor(props)
{
	super(props);
	this.state = {requests:[],lastuser:0,user_id:1};
}

getUserInfo(user_id){
	
	for(let i=0;i<this.state.requests.length;i++)
	{
		if(this.state.requests[i].user_id == user_id)
			return this.state.requests[i];
	}
}

getRequests(user_id){

	var self = this;
	axios.get("/api/getrequests/"+user_id).then(
			function(response){
				self.setState({requests:response.data});
			});
}

follow(follower_id,followed_id){
	
	axios.post("/api/follow/",{follower_id:follower_id,followed_id:followed_id}).then(
	function(response){
		return response.data; 
	});
}

render()
{
	const user_id = this.state.user_id;

	this.getRequests(user_id);

	var self = this;

	return (self.state.requests.map(function(request){
		var user = self.getUserInfo(self.state.user_id); 
		return(<Card>
		<Card.Body>
		<h3>ss</h3>
		</Card.Body>
		</Card>);
	}));
}
}
export default Notifs;