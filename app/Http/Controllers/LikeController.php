<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LikeController extends Controller
{
    function like($user_id,$post_id){
    	
    	$like = new Like;
    	$like->user_id = $user_id;
    	$like->post_id = $post_id;
    	$like->save();
    	return redirect('dashboard.php');
    }

    function unlike($user_id,$post_id){
    	Like::where('user_id',$user_id)::where('post_id',$post_id)->first()->forceDelete();
    }
}
