import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';
import { Redirect } from "react-router-dom";
import Router from '../router.js';
import
{ Container,Row,Col,Button,Card,InputGroup,Form,FormControl,Alert } 
from 'react-bootstrap';

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {Redirect:false};
    }

    validatePassword(){
        var password = $("#password").val();
        var password2 = $("#password2").val();
        if(password != password2)
        {
            ReactDOM.render(<Alert>passwords not matched</Alert>,document.getElementById('alert'));
        }
        if(len(password) < 8){
            ReactDOM.render(<Alert>password must be </Alert>,document.getElementById('alert'));

        }
    }
    onSubmit(){
        
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var email = $('#e-mail').val();
        var profile = $('#picture').val();

        axios.post('/api/register',{firstname:firstname,lastname:lastname,email:email,username:username,password:password,profile:profile}).then(
            function(response){
                alert(response.date);
                if(response.data.toString() == "true")
                {
                    alert("DASD");
                    this.setState({Redirect:true});
                }
        });   
    }

    render() {    
        return (
            <Container fluid className='bg-secondary w-100 h-100 p-5'>
                <Row className="d-flex justify-content-center p-5 h-75">
                <div id='alert'></div>
                    <Col md='5'>
                        <Card className='bg-light'>
                            <Card.Body>
                            <Card.Title><h5>please fill inputs.</h5></Card.Title>
                            <Form.Group className='mt-5'>
                            <Row>
                            <Col md='6'>
                            <Form.Control id='firstname' placeholder='Firstname' required/>
                            </Col>
                            <Col md='6'>
                            <Form.Control id='lastname' placeholder='Lastname' required/>
                            </Col>
                            </Row>
                            </Form.Group>

                            <Form.Group className='mt-4'>
                            <Form.Control id='username' placeholder='Username'required />
                            </Form.Group>

                            <Form.Group className='mt-4'>
                            <Form.Control id='e-mail' placeholder='Email address' requreid/>
                            </Form.Group>

                            <Form.Group className='mt-4 '  >
                            <Row className='d-flex justify-content-center'>
                            <Col sm='5'>
                            <Form.Control id='password' type='password' placeholder='Password' required/>
                            </Col>
                            <Col sm='5'>
                            <FormControl id='password2' type='password' placeholder='re-type password' required/>
                            </Col>
                            </Row>
                            </Form.Group>

                            <Form.Group className='m-4 d-flex justify-content-end'>
                            <Form.Label for='picture' className=' btn btn-sm btn-warning'>Select profile</Form.Label >
                            <Form.Control type='file' id='picture' required hidden/>
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-center'>
                                <button className='btn btn-success btn-lg' onClick={this.onSubmit}>Sign    up</button>
                            </Form.Group>
                            <Card.Link className='mt-3 d-flex justify-content-center'>
                            <a href='/login'>already has an account?</a>
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        );
    }
}
export default Register;

ReactDOM.render(<Register/>, document.getElementById('index'));
