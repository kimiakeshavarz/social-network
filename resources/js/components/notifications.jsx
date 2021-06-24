import React from 'react';
import ReactDOM from 'react-dom';
import { Container,Row,Col,Button,Card,InputGroup,Form,FormControl,Alert }from 'react-bootstrap';

class Notifs extends React.Component{

constructor(props)
{
	super(props);
	this.state = {requests:[],lastuser:0,user_id:1};
	this.getRequests(this.state.user_id);

}

getUserInfo(user_id){
	
	for(let i=0;i<this.state.requests.length;i++)
	{
		if(this.state.requests[i].id == user_id)
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
	
	axios.post("/api/acceptfollow/",{follower_id:follower_id,followed_id:followed_id}).then(
	function(response){
		return response.data; 
	});
}

unfollow(follower_id,followed_id){
	
	axios.post("/api/unfollow/",{follower_id:follower_id,followed_id:followed_id}).then(
	function(response){
		return response.data; 
	});
}

render()
{
	var self = this;

	if(this.state.requests.length <= 0)
		return(<div className='mt-3'><h3>No requests yet</h3></div>);
	return (self.state.requests.map(function(request){
		var user = self.getUserInfo(self.state.user_id); 
		return(<Card className='bg-light'>
		<Card.Body>
		<Row>
		<Col>{user.firstname} {user.lastname} has requested to follow you.</Col>
		<Col md='2'><Button className='primary' onClick={()=>self.follow(user.id,self.state.user_id)} roundedCircle>Accept</Button></Col>
		<Col md='2'><Button className='primary' onClick={()=>self.unfollow(user.id,self.state.user_id)} roundedCircle>Reject</Button></Col>

		</Row>
		</Card.Body>
		</Card>);
	}));
}
}
export default Notifs;