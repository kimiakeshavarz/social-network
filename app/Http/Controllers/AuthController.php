<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session; 
class AuthController extends Controller
{
    function checkLogin(Request $request)
    {   
        $username = $request->username;
        $password = $request->password;
    	$users = User::where('username',$username)->where('password',$password)->get();
    	if(count($users) == 1)
    	{

            $request->session()->put('user_id',$users[0]->id);
            return 'true';
    	}
    	else
    	{
    		return 'false';
    	}
    }

    function checkRegister(Request $request)
    {
        $firstname = $request->firstname;
        $lastname = $request->lastname;
        $username = $request->username;
        $password = $request->password;
        $profile = $request->profile;
        $email = $request->email;
    	$users = User::where('username',$username)->orwhere('email',$email)->get();

    	if(count($users) == 0)
    	{
    		$new_user = new User;
    		$new_user->firstname = $firstname;
    		$new_user->lastname = $lastname;
    		$new_user->username = $username;
    		$new_user->email = $email;
    		$new_user->password = $password;
    		$new_user->profile = $profile;
    		$new_user->save();
            $request->session()->put('user_id',$users[0]->id);
    		return 'true';
    	}
    	else
    	{
    		return 'false';
    	}
    }
}
