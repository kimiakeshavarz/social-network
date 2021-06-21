import React from 'react';
import ReactDOM from 'react-dom';
import {Container,Card,Image,Row,Col,Nav,Form,Button    } from 'react-bootstrap';

class Myposts extends React.Component{

	constructor(props){
        super(props);
        this.state = {user_id:1,posts:[]};
        this.getMyPosts();
    }
    getMyPosts(){

        var self = this;
        axios.get('/api/getposts/'+this.state.user_id).then(
        function(response){
            self.setState({posts:response.data});
        });
    }
    sendPost(){

    	var caption = $('#caption').val();
    	var image = $('#uploadimage').val();
    	axios.post('/api/addpost',{caption:caption,image:image}).then(function(response){
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
	render(){

        var self = this;
		return(            
		<Container>
            <Card>
                <Card.Body>
                    <Card>
                        <Card.Body>
                            <Form.Group className='d-flex justify-content-center'>
                            <Form.File id='uploadimage' label='upload post image'/>
                            </Form.Group>
                            <Form.Control id='caption' as='textarea' rows='4'/>
                            <Form.Group className='mt-2 d-flex justify-content-end'>
                                <Button onClick='sendPost'>Send Post</Button>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    {self.state.posts.map(
                        function(post){
                            return(
                            <Card className='mt-3'>
                                <Card.Header>
                                    <Button className="btn-danger btn-close" aria-label="Close" onClick={()=>this.deletePost(post.id)}></Button>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group className='d-flex justify-content-center'>
                                        <img src='images/1.jpg' height='200' width='200'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <p>{post.caption}</p>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            );
                        }
                    )}
                </Card.Body>
            </Card>

            </Container>);
	}
}

export default Myposts;
ReactDOM.render(<Myposts/>,document.getElementById('index'));