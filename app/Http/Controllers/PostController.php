<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Follower;
class PostController extends Controller
{
    function addPost(Request $request){
    	$new_post = new Post;
    	$new_post->image = $request->image;
    	$new_post->caption = $request->caption;
    	$new_post->user_id = $request->session()->get('user_id');

        if(!$new_post->save())
            return 'false';
        return $new_post->toJson();
    	
    }

    function getAllPosts(Request $request){
        $user_id = $request->session()->get('user_id');
        $followings = Follower::where('Follower',$user_id);
        $ids = array();
        foreach ($followings as $following) {
            array_push($ids,$following->followed);
        }
    	return Post::all()->toJson();
    }

    function getUserPosts(Request $request){
        $user_id = $request->user_id;
    	return Post::where('user_id',$user_id)->get()->toJson();
    }

    function removePost(Request $request)
    {
        $user_id = $request->session()->get('user_id');
        $post_id = $request->post_id;

        $result = Post::where('user_id',$user_id)->where('post_id',$post_id)->delete();
        
        return $result;
    }
    function getSession(Request $request)
    {
        return var_dump($request->session()->all());
    }
}
