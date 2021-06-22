<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LikeController extends Controller
{
    function like(Request $request){
    	
        $user_id = $request->user_id;
        $post_id = $request->post_id;

    	$like = new Like;
    	$like->user_id = $user_id;
    	$like->post_id = $post_id;
    	$like->save();
    	return redirect('dashboard.php');
    }

    function unlike(Request $request){

        $user_id = $request->user_id;
        $post_id = $request->post_id;
    	Like::where('user_id',$user_id)::where('post_id',$post_id)->first()->forceDelete();
    }
}
