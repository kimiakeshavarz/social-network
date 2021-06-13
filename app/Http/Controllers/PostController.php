<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    function addPost($image,$caption,$user_id){
    	$new_post = new Post;
    	$new_post->image = $image;
    	$new_post->caption = $caption;
    	$new_post->user_id = $user_id;

    	return redirect('dashboard');
    }

    function getAllPosts(){
    	return Post::get()->toJson();
    }

    function getUserPosts($user_id){
    	return Post::get()->where('user_id',$user_id)->toJson();
    }

}
