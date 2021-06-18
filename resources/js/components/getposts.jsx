
function Getposts(props){

	axios.get("/api/getposts/"+props.user_id).then(
	function(response){
		json = response.data.json;
		return (
		<div>
		json.map(function(post){
			<h3>{post.id}</h3>
			})
		</div>);
	});
}
export default Getposts;