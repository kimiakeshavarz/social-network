<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
class AuthController extends Controller
{
    function checkLogin($username,$password)
    {
    	$users = User::where('username',$username)->where('password',$password)->get();
    	if(count($users) == 1)
    	{
            session(['user_id'=>$users[0]->id]);
            return redirect('dashboard');
    	}
    	else
    	{
    		return 'false';
    	}
    }

    function checkRegister($firstname,$lastname,$email,$username,$password,$profile)
    {

    	$users = User::where('username',$username)->orwhere('email',$email);

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
            session(['username'=>$new_user->id]);
    		return redirect('dashboard');
    	}
    	else
    	{
    		return 'false';
    	}
    }
}
