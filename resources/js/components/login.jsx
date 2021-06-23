import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Container,Button,Card,InputGroup,Form,FormControl,Alert } 
from 'react-bootstrap';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {Redirect:false};
    }

    onSubmit(){
        
        var username = $('#username').val();
        var password = $('#password').val();

        axios.post('/api/login',{email:username,password:password}).then(
            function(response){
                if(response.data.toString() == "true")
                {
                    this.setState({Redirect:true});
                }
                else
                {
                    ReactDOM.render(<Alert variant='danger'>Username or password is incorrect.</Alert>,document.getElementById('alert'));
                }
        });   
    }

    render() {
        return (
            <Container fluid className="pb-5 w-100 h-100 bg-secondary ">
            <div className='row pt-5 d-flex justify-content-center w-100 h-100'>
                                        <div id='alert'></div>
                        <Card className='mt-4 pb-5 bg-light col-md-4 h-75 '>
                            <Card.Body className='mt-4'>
                            <Card.Title><h5>please fill the inputs.</h5></Card.Title>
                            <Form.Group className='mt-5'>
                            <Form.Control id='username'  placeholder='Username or email' required/>
                            </Form.Group>
                            <Form.Group className='mt-4'>
                            <Form.Control id='password' type='password' placeholder='Password' required/>
                            </Form.Group>
                            <Form.Group className='mt-5 d-flex justify-content-center'>
                                <Button className='btn btn-primary btn-lg' onClick={this.onSubmit}>Login</Button>
                            </Form.Group>
                            <div className='mt-4'>
                            <Card.Link href='/register'>Not have account?</Card.Link>
                            </div>
                            </Card.Body>
                        </Card>
                        </div>
            </Container>
        );
    }
}
export default withRouter(Login);

