import React from 'react';
import ReactDOM from 'react-dom';
import {Container,Card,Image,Row,Col,Nav,Form,Button} from 'react-bootstrap';
import Select from 'react-select';
import MyPosts from './myposts.jsx';
import Notifs from './notifications.jsx';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Profile extends React.Component{

	constructor(props){
        super(props);
        this.state = {posts:[1],followings:[],followers:[],options:[],current_user:[],logged_user:[],user_id:1,token:props.token};
        const cookies = new Cookies();
        alert(cookies.get('user_id'));


    }

    componentDidMount(){
    	axios.interceptors.request.use(function (config) {

    		config.headers.Authorization =  this.state.token;

   			return config;
		});
        this.getLoggedUser();
        this.getCurrentUser();
        this.getPosts();
        this.getAllUsers();
        this.getFollowings();
        this.getFollowers();
    }
	getAllUsers(){
	
		var self = this;
		axios.get('/api/searchuser/').then(
            function(response){
            	self.setState({options:response.data});
            	
        }); 
	}

	isFollowed(){
		
		for(let i =0;i<this.state.followers.length;i++)
		{
			if(this.state.followers[i].follower == this.state.logged_user.id)
			{
				return true;
			}
		}
		return false;
	}


	goUserProfile(){

	}
    getPosts(){

        var self = this;
        axios.get("/api/getposts/").then(function(response){
                self.setState({posts:response.data});
            });
    }

    getFollowings(){

        var self = this;
        axios.get("/api/getfollowings/1").then(function(response){
                self.setState({followings:response.data});
 																																																																																											          ;
    });
    }

    getFollowers(){

        var self = this;
        axios.get("/api/getfollowers/1").then(function(response){
                self.setState({followers:response.data});
            });
    }

    getLoggedUser(){

    	var self = this;
        axios.get("/api/getloggeduser/").then(function(response){
                self.setState({logged_user:response.data});
            });

    }
    getCurrentUser(){

    	var self = this;

    	var url_parts = window.location.pathname.split('/');
        if(url_parts[url_parts.length-2] != 'profile')
        {
        	var user_id = (url_parts[url_parts.length-1]);

        	axios.get("/api/getuserinfo/"+this.state.user_id).then(function(response){
                self.setState({current_user:response.data});
            });		

        }
        else
        {
            this.setState({current_user:this.state.logged_user});

        }


    }

    getFollowingUser(user_id){
        for(let i =0;i<this.state.followings.length;i++){
            if(this.state.followings[i].id = user_id)
            {
                return this.state.followings[i];
            }
        }
        return false;
    }

   	follow(user_id){
   		axios.post('/api/follow/',{followed_id:user_id,following_id:this.state.logged_user.id}).then(
   		function(response){

   		});
	}

	unfollow(user_id){

		axios.post('/api/unfollow/',{followed_id:user_id,following_id:this.state.logged_user.id}).then(
   		function(response){

   		});
	}

	like(post_id){
		axios.post('/api/like',{post_id:post_id,user_id:this.state.logged_user.id}).then(
		function(response){
			
		});
	}

	unlike(post_id){
		axios.post('/api/unlike',{post_id:post_id,user_id:this.state.logged_user.id}).then(
		function(response){
			
		});
	}

	render(){

        var self = this;
        var current_user = this.state.current_user;
        var user_profile = '/images/1.jpg';

		return(<Container fluid className='bg-secondary h-100 w-100 p-3 '>
        <Row>
        <Col>
        <Row className='w-100 d-flex justify-content-center'>
			<Select onChange={this.goUserProfile()} options={this.state.options} id='search-select' value="sv"   placeholder="Search user..." />
        </Row>
        <Row className='w-100 h-100 '> 
        {this.state.current_user.id == this.state.logged_user.id ? <MyPosts/> :this.state.posts.map(
        function(post,index){

            var user = self.getFollowingUser(self.state.posts[index].user_id);
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
                {this.state.current_user.id == this.state.logged_user.id?<div></div>:
                <Form.Group>
                	{this.isFollowed()?<Button id='follow' onClick={this.follow()}>Follow</Button>:<Button id='unfollow' onClick={this.unfollow()}>UnFollow</Button>}
                </Form.Group>}
            </Card.Body>
        </Card>
        </Col></Row></Container>);
	}
}

export default withRouter(Profile);
