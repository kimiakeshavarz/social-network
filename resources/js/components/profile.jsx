import React from 'react';
import ReactDOM from 'react-dom';
import {Container,Card,Image,Row,Col,Nav,Form,Button,Tab,Tabs} from 'react-bootstrap';
import Select from 'react-select';
import MyPosts from './myposts.jsx';
import Notifs from './notifications.jsx';
import { withRouter,Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/fontawesome-free-solid';

class Profile extends React.Component{

	constructor(props){
        super(props);

        const cookies = new Cookies();
        this.state = {posts:[1],followings:[],followers:[],options:[],current_user:[],logged_user:cookies.get('logged_user'),Redirect:false,likes:[],dislikes:[]};



    }

    componentDidMount(){

    	axios.interceptors.request.use(function (config) {

    		const cookies = new Cookies();
    		config.headers.Authorization =  "Bearer "+cookies.get('token');

   			return config;
		});

		if(this.state.logged_user.enabled == false){
			alert('You have to activate your account');
			this.setState({Redirect:true});

		}
        if(this.state.logged_user === undefined){

            this.setState({Redirect:true});
	
        }
        else
        {
        	this.getAllUsers();
	        this.getCurrentUser();
	        this.getPosts();
	        this.getFollowings();
	        this.getFollowers();
        }
    }
	getAllUsers(){
	
		var self = this;
        axios.get("/api/searchuser/").then(function(response){

        self.setState({options:response.data});
    }).catch(function(error){

       			self.setState({Redirect:true})
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


	goUserProfile(e){
		window.location.href = '../'+e.value;	
	}
    getPosts(){

    	var self = this;
    	var url_parts = window.location.href.split('/');
    	var last_part = (url_parts[url_parts.length-1]);
    	if(last_part == 'dashboard')
    	{
        	axios.get("/api/getposts/").then(function(response){
                self.setState({posts:response.data[0]});
                self.setState({likes:response.data[1]});
                self.setState({dislikes:response.data[2]});

            }).catch(function(error){

       			self.setState({Redirect:true})
        });
        }
        else
        {
        	axios.get("/api/getposts/"+last_part).then(function(response){
                self.setState({posts:response.data[0]});
                self.setState({likes:response.data[1]});
                self.setState({dislikes:response.data[2]});

            }).catch(function(error){

       			self.setState({Redirect:true})
        }); 
        }
    }

    getFollowings(){

        var self = this;
        axios.get("/api/getfollowings/"+this.state.logged_user.id).then(function(response){

                self.setState({followings:response.data});
 																																																																																											          ;
    }).catch(function(error){

       			self.setState({Redirect:true})
        });
    }

    getFollowers(){

        var self = this;
        axios.get("/api/getfollowers/"+this.state.logged_user.id).then(function(response){
                self.setState({followers:response.data});
            }).catch(function(error){

       			self.setState({Redirect:true})
        });
    }

    getCurrentUser(){

    	var self = this;

    	var url_parts = window.location.pathname.split('/');
        if(url_parts[url_parts.length-2] == 'profile')
        {
        	var username = (url_parts[url_parts.length-1]);

        	if(username == this.state.logged_user.username){
        		window.location.href = '/dashboard';
        	}
        	axios.get("/api/getuserinfo/"+username).then(function(response){
                self.setState({current_user:response.data});
            }).catch(function(error){

       			self.setState({Redirect:true})
        });		

        }
        else
        {
            this.setState({current_user:this.state.logged_user});

        }


    }

    getFollowingUser(user_id){
        for(let i =0;i<this.state.followings.length;i++){
            if(this.state.followings[i].id == user_id)
            {
                return this.state.followings[i];
            }
        }
        return false;
    }

   	follow(){

   		var self = this;
   		axios.post('/api/follow/',{followed_id:this.state.current_user.id,following_id:this.state.logged_user.id}).then(
   		function(response){
   						self.setState({options:self.state.options});

   		}).catch(function(error){

       			self.setState({Redirect:true})
        });
	}

	unfollow(){

		var self = this;



		axios.post('/api/unfollow/',{followed_id:this.state.current_user.id,following_id:this.state.logged_user.id}).then(
   		function(response){
			self.setState({options:self.state.options});

   		}).catch(function(error){

       			self.setState({Redirect:true})
        });
	}

	like(e){

		var self = this; 
		var post_id = e.target.id.split('_')[1];

		axios.post('/api/like',{post_id:post_id,user_id:this.state.logged_user.id}).then(
		function(response){
			self.setState({options:self.state.options});
		}).catch(function(error){

       			self.setState({Redirect:true})
        });
	}

	dislike(e){

		var self = this; 
		var post_id = e.target.id.split(' ')[1];
		axios.post('/api/dislike',{post_id:post_id,user_id:this.state.logged_user.id}).then(
		function(response){
			self.setState({options:self.state.options});
		}).catch(function(error){

       			self.setState({Redirect:true})
        });
	}

	isLiked(index){

		for(let i=0;i<this.state.likes.length;i++){
			if(this.state.likes[index][i].user_id == this.state.logged_user.id)
				return <small>You liked this post!</small>;
		}

		for(let i=0;i<this.state.dislikes.length;i++){
			if(this.state.dislikes[index][i].user_id == this.state.logged_user.id)
				return <small>You disliked this post!</small>;
		}
		return false;
	}
	render(){
		if(this.state.Redirect == true)
		{
			return <Redirect to='/login' />;
		}   

        var self = this;
        var current_user = this.state.current_user;
        var user_profile = this.state.current_user.profile;
		 

		return(<Container fluid className='bg-secondary h-100 w-100 p-3 '>
        <Row>
<Row className='w-100 d-flex justify-content-center '>
			<Select onChange={this.goUserProfile.bind(this)} options={this.state.options} id='search-select' value="sv"   placeholder="Search user..." />
        </Row>

        <Row className='w-50 h-100 mt-2 '> 
        {this.state.current_user.id == this.state.logged_user.id ? <MyPosts/> :this.state.posts.map(
        function(post,index){
        	var likes = self.state.likes[index];
        	var dislikes = self.state.dislikes[index];

            var user = self.getFollowingUser(post.user_id);
            var image = post.image;

            return <Card className=' mt-3 d-flex justify-contents-center'>
            <Card.Header><Row>
            <Col md='2'>
            <Image src={image} width='80' height='80' roundedCircle/>
            </Col>
            <Col className='h-50'>
            <Row className='h-50'>
            <Nav.Link href={user.profile}><b><h4 className='text-dark'>{user.firstname} {user.lastname}</h4></b></Nav.Link>
            </Row>
            </Col>
            </Row></Card.Header>
            <Card.Body>
            <Image src={post.image}
             thumbnail />
             <div className='mt-3'>
             <p>{post.caption}</p>
             </div>                                                
             <Card.Footer>
                                    <Row>
                                        <Col lg='10' >
                                        <Button className='btn-success' onClick={self.like.bind(self)} id={'like_'+post.id}>
                                            <FontAwesomeIcon  icon='thumbs-up'  size="lg"/>
                                            </Button>
                                        </Col>

                                        <Col >
                                        <Button className='btn-danger' onClick={self.dislike.bind(self)} id={'dislike '+post.id}>
                                            <FontAwesomeIcon  icon='thumbs-down'  size="lg"/>
                                            </Button>
                                        </Col>
                                    </Row>
            </Card.Footer>
                            </Card.Body>
            </Card>;
        }
        )}
        </Row>
                       <Card className='w-50 m-2'>
            <Card.Body className='bg-light'>
			  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
			  <Tab eventKey="profile" title="Profile">
                <Form.Group className='mt-3 d-flex justify-content-center'>
                    <Image src={user_profile}  height='170' width='170' roundedCircle/>
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

                <Row className='mt-5'>
                <Col>
                    <h4>{this.state.followers.length} Followers</h4>
                </Col>
                <Col>
                    <h4>{this.state.followings.length} Followings</h4>

                </Col>
                </Row>
                {this.state.current_user.id == this.state.logged_user.id?<div></div>:
                <Form.Group>
                	{this.isFollowed()?<Button id='unfollow' onClick={this.unfollow.bind(this)}>UnFollow</Button>:<Button id='follow' onClick={this.follow.bind(this)}>Follow</Button>}
                </Form.Group>}

                </Tab>
              		<Tab eventKey="home" title="Requests">
    					<Notifs />
  					</Tab>
            	</Tabs>
            </Card.Body>

        </Card>
      </Row></Container>);
	}
}

export default withRouter(Profile);
