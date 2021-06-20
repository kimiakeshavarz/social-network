import React from 'react';
import ReactDOM from 'react-dom';
import {Container,Card,Image,Row,Col,Nav,Form} from 'react-bootstrap';
class Dashboard extends React.Component{

	constructor(props){
        super(props);
        this.state = {posts:[1],followings:[],user_id:1,followers:[]};
    }
	onSearchChanged(){
		var search = $("#search").val();

		axios.get('/api/searchuser/'+search).then(
            function(response){
            	var json = response.data.json;
            	const showData = json.map((data)=>{

            	});
        }); 

	}
    getUser(user_id){
        for(let i =0;i<this.state.followings.length;i++){
            if(this.state.followings[i].id = user_id)
            {
                return this.state.followings[i];
            }
        }
        return false;

    }
	render(){

        var self = this;
        var current_user = this.getUser(this.state.user_id);
        var user_profile = '/images/1.jpg';
        
        axios.get("/api/getposts/").then(function(response){
                self.setState({posts:response.data});
            });

        axios.get("/api/getfollowings/"+this.state.user_id).then(function(response){
                self.setState({followings:response.data});
            });
        axios.get("/api/getfollowers/"+this.state.user_id).then(function(response){
                self.setState({followers:response.data});
            });

		return(<Container fluid className='bg-secondary h-100 w-100 p-3 '>
        <Row>
        <Col>
        <Row className='w-100 d-flex justify-content-center'>
        <Form.Control type='text' placeholder='Search user...'/>
        </Row>
        <Row className='w-100 h-100 '> 
        {this.state.posts.map(
        function(post,index){

            var user = self.getUser(self.state.posts[index].user_id);
            var user_id = user.id;
            const profile = require('../profiles/'+1+'.jpg');
            return <Card className=' mt-3 d-flex justify-contents-center'>
            <Card.Header><Row>
            <Col md='2'>
            <Image src={'/images/1.jpg'} width='80' height='80' roundedCircle/>
            </Col>
            <Col className='h-50'>
            <Row className='h-50'>
            <Nav.Link href={'/profile/'+user.username}><b><h4 className='text-dark'>{user.firstname} {user.lastname}</h4></b></Nav.Link>
            </Row>
            </Col>
            </Row></Card.Header>
            <Card.Body>
            <Image src={post.image}
             thumbnail />
             <div className='mt-3'>
             <p>{post.caption}</p>
             </div></Card.Body>
            </Card>;
        }
        )}
        </Row></Col>
        <Col>
        <Card>
            <Card.Body>
                <Form.Group className='d-flex justify-content-center'>
                    <Image src='/images/1.jpg' height='200' width='200' roundedCircle />
                </Form.Group>
                <Form.Group className='mt-3 d-flex justify-content-center'>
                    <h1>{current_user.firstname} {current_user.lastname}</h1>
                </Form.Group>
                    <Form.Group className='mt-1 d-flex justify-content-center'>
                    <h4>@{current_user.username}</h4>
                    </Form.Group>
                <Form.Group className='mt-5'>
                    <h4>{current_user.bio}</h4>
                </Form.Group>

                <Row className='mt-3'>
                <Col>
                    <h4>{this.state.followers.length} Followers</h4>
                </Col>
                <Col>
                    <h4>{this.state.followings.length} Followings</h4>

                </Col>
                </Row>
            </Card.Body>
        </Card>
        </Col></Row></Container>);
	}
}

export default Dashboard;
ReactDOM.render(<Dashboard user_id='1'/>,document.getElementById('index'));