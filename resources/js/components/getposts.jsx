
function Getposts(props){
	axios.get("/api/getposts/1"+props.user_id).then(
	function(response){
		json = response.data.json;
	});
}
export default Getposts;