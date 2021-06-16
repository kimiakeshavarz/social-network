<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowController extends Controller
{
    function follow($follower_id,$followed_id)
    {
    	$follower = new Follower;
    	$follower->follower = $follower_id;
    	$follower->followed = $followed_id;
    	$follower->save();
    }

    function unfollow($follower_id,$followed_id)
    {
    	$follower = Follower::where('follower',$follower_id)->where('followed',$followed_id)->first();
    	$follower->forceDelete();
    }

    function getFollowers($user_id)
    {
    	return Follower::where('followed',$user_id)->get()->toJson();
    }

    function getFollowings($user_id)
    {
    	return Follower::where('followed',$user_id)->get()->toJson();
    }
}
}
