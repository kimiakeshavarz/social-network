import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { Redirect } from "react-router-dom";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {Redirect:true};
    }

    onSubmit(){
        
        var username = $('#username').val();
        var password = $('#password').val();

        axios.post('/api/login',{username:username,password:password}).then(
            function(response){
                
                if(response.data.toString() == "true")
                {
                    alert(this.state.Redirect);
                    this.setState({Redirect:true});
                }
        });   
    }

    render() {

        return (<Redirect to='/' />);  
    
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
