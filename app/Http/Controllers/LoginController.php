<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class LoginController extends Controller
{
    function checkLogin($username,$password)
    {
    	$users = DB::select("select * from users where username='$username' and password='$password'");

    	if(count($users) == 1)
    	{

    	}
    	else
    	{
    	}
    	    		return view("index");

    }
}
