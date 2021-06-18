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

		return(<Posts user_id=''/>);
	}
}

export default Dashboard;
ReactDOM.render(<Dashboard/>,document.getElementById('index'));