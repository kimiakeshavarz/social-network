import React from 'react';
import ReactDOM from 'react-dom';
class Dashboard extends React.Component{

	constructor(props){
        super(props);
    }
	onSearchChanged(){
		var search = $("#search").val();

		axios.get('/api/searchuser/'+search).then(
            function(response){
            	var json = response.data.json;
            	const showData = json.map((data)=>{

            	});
        }); 

	}
	render(){
		var posts = '';
		axios.get('/api/getposts/').then(function(response){
			posts = response.data.json;
		});
		
		return();
	}
}

export default Dashboard;
ReactDOM.render(<Dashboard/>,document.getElementById('index'));