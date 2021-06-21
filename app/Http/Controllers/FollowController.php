<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follower;
use App\Models\User;

class FollowController extends Controller
{
    function follow(Request $request)
    {   
        $follower_id = $request->follower_id;
        $following_id = $request->following_id;

    	$follower = new Follower;
    	$follower->follower = $follower_id;
    	$follower->followed = $followed_id;
        $follower->accepted = 1;
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
        if($user_id == Null)
            $user_id = $request->session->get('user_id');
        $followers = Follower::where('follower',$user_id)->where('accepted',1)->get();
        $follower_infos = array();
        foreach ($followers as $follower) {
            $info = User::where('id',$user_id)->get()[0];
            array_push($follower_infos,$info);
        }
    	return json_encode($follower_infos);
    }

    function getFollowings(Request $request)
    {
        $user_id = $request->user_id;
        if($user_id == Null)
            $user_id = $request->session->get('user_id');
        $followers = Follower::where('followed',$user_id)->where('accepted',1)->get();
        $follower_infos = array();
        foreach ($followers as $follower) {
            $info = User::where('id',$user_id)->get()[0];
            array_push($follower_infos,$info);
        }
        return json_encode($follower_infos);
    }

    function getRequests(Request $request)
    {
        $user_id = $request->user_id;

        if($user_id == Null)
            $user_id = $request->session->get('user_id');

        return Follower::where('followed',$user_id)->where('accepted',0)->get()->toJson();
    }

    function requestFollow(Request $request)
    {
        $followed_id = $request->followed_id;
        $follower_id = $request->follower_id;

        Follower::where("followed",$followed_id)->where("follower",$follower_id)->update(['accepted' => 1]);
    }
}

