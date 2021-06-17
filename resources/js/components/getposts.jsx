
function Getposts(props){
	axios.get("/getposts/"+props.user_id).then(
	function(response){
		json = response.data.json;
	});
}
export default Getposts;