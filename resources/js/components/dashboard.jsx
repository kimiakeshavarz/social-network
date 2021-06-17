import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './getposts.jsx';
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
		return(<h1>salamu</h1>);
	}
}

export default Dashboard;
ReactDOM.render(<Dashboard/>,document.getElementById('index'));