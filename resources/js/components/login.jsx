import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.jsx';
import { Redirect } from "react-router-dom";
import Router from '../router.js';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {Redirect:true};
    }

    onSubmit(){
        
        var username = $('#username').val();
        var password = $('#password').val();

        axios.post('/login',{username:username,password:password}).then(
            function(response){
                alert('dasda');
                if(response.data.toString() == "true")
                {
                    alert(this.state.Redirect);
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
                            <div className='form-group m-4'>
                            <input id='username' class='form-control' />
                            </div>
                            <div className='form-group m-4'>
                            <input id='password' type='password' class='form-control' />
                            </div>
                            <div className='card-foother justify-content-center'>
                                <button className='btn btn-primary' onClick={this.onSubmit}>Login</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;

ReactDOM.render(<Login />, document.getElementById('index'));
