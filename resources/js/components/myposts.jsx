import React from 'react';
import ReactDOM from 'react-dom';
import {Container,Card,Image,Row,Col,Nav,Form,Button    } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/fontawesome-free-solid';
class Myposts extends React.Component{

	constructor(props){
        super(props);

        const cookies = new Cookies();
        this.state = {logged_user:cookies.get('logged_user'),posts:[],likes:[],unlikes:[]};
        this.getMyPosts();
    }
    getMyPosts(){

        var self = this;
        axios.get('/api/getposts/'+this.state.logged_user.username).then(
        function(response){
            self.setState({posts:response.data[0]});
            self.setState({likes:response.data[1][0]});
            self.setState({unlikes:response.data[2][0]});


        });
    }

    getLikes(post_id){
        var self = this;
        axios.get('/api/getlikes/'+post_id).then(
        function(response){
            
        });
    }
    sendPost(){

    	var caption = $('#caption').val();
    	var image = this.state.file;

        const formData = new FormData();
        formData.append('caption',caption);
        formData.append('image',image);

    	axios.post('/api/addpost',formData,{headers:{"Content-Type": "multipart/form-data"}}).then(function(response){
    		if(response.data.toString() != 'false'){
    			var json = response.data.json;
    		}
    	});
    }

    deletePost(post_id){
        axios.post('/api/removepost/',{post_id:post_id}).then(
            function(response){

            }
        );
    }

    onFileChanged(e){
            this.setState({file:e.target.files[0]});
    }



	render(){

        var self = this;
		return(<div>
                    <Card>
                        <Card.Body>
                            <Form.Group className='d-flex justify-content-center'>
                            <Form.File id='uploadimage' label='upload post image' onChange={this.onFileChanged.bind(this)}/>
                            </Form.Group>
                            <Form.Control id='caption' as='textarea' rows='4'/>
                            <Form.Group className='mt-2 d-flex justify-content-end'>
                                <Button onClick={this.sendPost.bind(this)}>Send Post</Button>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    {self.state.posts.map(
                        function(post,index){
                            var likes = self.state.likes[index];
                            if(likes == undefined)
                                likes = [0];

                            var unlikes = self.state.unlikes[index];
                            if(unlikes == undefined)
                                unlikes = [0];

                            return(
                            <Card className='mt-3'>
                                <Card.Header>
                                    <Button className="btn-danger btn-close" aria-label="Close" onClick={()=>this.deletePost(post.id)}></Button>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group className='d-flex justify-content-center'>
                                        <img src={post.image} height='200' width='200'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <p>{post.caption}</p>
                                    </Form.Group>
                                    <Card.Footer>
                                    <Row>
                                        <Col md='4'>
                                            <FontAwesomeIcon  icon='thumbs-up' size="lg"/>
                                            <small> {likes.length}</small>
                                        </Col>
                                        <Col>
                                            <FontAwesomeIcon icon='thumbs-down' size="lg"/>
                                            <small> {unlikes.length}</small>
                                        </Col>
                                    </Row>
                            </Card.Footer>
                                </Card.Body>
                            </Card>
                            );
                        }
                    )}

            </div>);
	}
}

export default Myposts;
