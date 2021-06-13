import React from 'react';
import ReactDOM from 'react-dom';

function Login() {
    axios.get('/api/login').then(
        function(response){
            alert(response);
    });
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
                        <input id='username' class='form-control' />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

ReactDOM.render(<Login />, document.getElementById('index'));
