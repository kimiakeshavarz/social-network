<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Session; 
class AuthController extends Controller
{

    function checkLogin(Request $request)
    {   
        $credentials = $request->only('email', 'password');
        $email = $request->email;
        $password = $request->password;
            //$request->session()->put('uer_id',$users[0]->id);
        $token = JWTAuth::attempt(['email'=>$email,'password'=>$password]);
        if($token){
            $user = Auth::user();
            return json_encode(array('user_id'=>$user->id,'token'=>$token));
        }
    else{
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
    		$new_user->password = Hash::make($password);
    		$new_user->profile = $profile;
    		$new_user->save();
            $token = JWTAuth::fromUser($new_user);
    		return json_encode(array('user_id'=>$new_user->id,'token'=>$new_user->token));
    	}
    	else
    	{
    		return 'exists';
    	}
    }
}
