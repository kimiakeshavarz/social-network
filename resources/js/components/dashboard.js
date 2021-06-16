import React from 'react';
import ReactDOM from 'react-dom';
class Dashboard extends React.Component{

	onSearchChanged(){
		var search = $("#search").val();

		axios.post('/searchuser/'+search).then(
            function(response){
            	var json = response.data.json;
            	const showData = json.map((data)=>{
            		
            	});
        }); 

	}
	render(){
		return();
	}
}

export default Dashboard;
ReactDOM.render(<Dashboard/>,document.getElementById('index'));