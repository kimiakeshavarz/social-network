import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.js';
import { Redirect } from "react-router-dom";
import Router from '../router.js';
class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {Redirect:true};
    }

    validatePassword(){
        var password = $("#password").val();
        var password2 = $("#password2").val();
        if(password != password2)
        {

        }
        if(len(password) < 8){

        }
    }
    onSubmit(){
        
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var email = $('#email').val();
        var profile = $('#profile').val();

        axios.post('/api/login',{firstname:firstname,lastname:lastname,email:email,username:username,password:password,profile:profile}).then(
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
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="m-3 col-md-6">
                        <div className="card">
                            <div className="card-header">login</div>

                            <div className="card-body">

                            <div className='form-group m-4 row'>
                            <input id='firstname' class='form-control col' />
                            <input id='lastname' class='form-control col' />
                            </div>

                            <div className='form-group m-4'>
                            <input id='username' class='form-control' />
                            </div>

                            <div className='form-group m-4'>
                            <input id='e-mail' class='form-control' />
                            </div>

                            <div className='form-group m-4'>
                            <input id='password' type='password' class='form-control' />
                            <input id='password2' type='password' class='form-control' />
                            </div>

                            <div className='form-group m-4'>
                            <input id='picture' class='form-control' />
                            </div>
                            <div className='card-foother justify-content-center'>
                                <button className='btn btn-primary' onClick={this.onSubmit}>Sign    up</button>
                            </div>
                            <div className='card-link justify-content-center'>
                            <a href='/login'>already has an account?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Register;

ReactDOM.render(<Register/>, document.getElementById('index'));
