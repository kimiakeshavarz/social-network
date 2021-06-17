<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follower;
class FollowController extends Controller
{
    function follow(Request $request)
    {   
        $follower_id = $request->follower_id;
        $following_id = $request->following_id;

    	$follower = new Follower;
    	$follower->follower = $follower_id;
    	$follower->followed = $followed_id;
    	$follower->save();
    }

    function unfollow(Request $request)
    {
        $follower_id = $request->follower_id;
        $following_id = $request->following_id;
    	$follower = Follower::where('follower',$follower_id)->where('followed',$followed_id)->first();
    	$follower->forceDelete();
    }

    function getFollowers(Request $request)
    {
        $user_id = $request->user_id;
    	return Follower::where('followed',$user_id)->get()->toJson();
    }

    function getFollowings(Request $request)
    {
        $user_id = $request->user_id;
    	return Follower::where('followed',$user_id)->get()->toJson();
    }
}

