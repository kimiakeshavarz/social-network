<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
	function startsWith ($string, $startString)
	{
    	$len = strlen($startString);
    	return (substr($string, 0, $len) === $startString);
	}

    function getUserInfo(Request $request){
        $user_id = $request->user_id;
    	return User::where('id',$user_id)->get()->toJson();
    }

    function getUsers(){
    	return User::all()->toJson();
    }

    function searchUser(Request $request){
        $str = $request->str;
    	$users = User::all();
    	$matched_users = array();
    	foreach ($users as $user) {
    		
    		if(startsWith($user->username,$str) || startsWith($user->username,$str) || startsWith($user->username,$str)){

    			array_push($matched_users,$user);
    		}
    	}

    	return $matched_users->toJson();
    }
}
