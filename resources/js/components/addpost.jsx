import React from 'react';
import ReactDOM from 'react-dom';
class Addpost extends React.Component{

	constructor(props){
        super(props);
    }
    onSubmit(){

    	var caption = $('#caption').val();
    	var image = '';
    	axios.post('/api/addpost',{caption:caption,image:image}).then(function(response){
    		if(response.data.toString() != 'false'){
    			var json = response.data.json;
    		}
    	});
    }
	render(){

		return(            
		<div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="m-3 col-md-6">
                        <div className="card">
                            <div className="card-header">login</div>

                            <div className="card-body">
                            <div className='form-group m-4'>
                            <img src='' id='image'  class='form-control' />
                            <input id='uploadimage' type='file' class='form-control' />
                            </div>
                            <div className='form-group m-4'>
                            <input id='caption' type='text' class='form-control' />
                            </div>
                            <div className='card-foother justify-content-center'>
                                <button className='btn btn-primary' onClick={this.onSubmit}>Add post</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
	}
}

export default Addpost;
