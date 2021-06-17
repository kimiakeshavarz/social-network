<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware'=>'web'],function(){
	Route::post('login', [AuthController::class,"checkLogin"]);
	Route::post('register', [AuthController::class,"checkRegister"]);
	
	Route::get('getsession',[PostController::class,"getSession"]);

	Route::group(['middleware'=>'checklogin'],function(){
		
		Route::group(['middleware'=>'checkuser'],function(){
			
			Route::post('addpost',[PostController::class,"addPost"]);
			
			Route::post('follow',[FollowerController::class,"follow"]);
			Route::post('unfollow',[FollowerController::class,"unfollow"]);
			
			Route::post('like',[LikeController::class,"like"]);
			Route::post('unlike',[LikeController::class,"unlike"]);


		});

		Route::get('getposts/{user_id}',[PostController::class,"getUserPosts"]);
		
		Route::get('getposts',[PostController::class,"getAllPosts"]);

		Route::get('getfollowers/{user_id?}',[FollowController::class,"getfollowers"]);
		Route::get('getfollowings/{user_id?}',[FollowController::class,"getfollowings"]);

		Route::get('getusers',[UserController::class,"getUsers"]);
		Route::get('getuserinfo/{user_id}',[UserController::class,"getUserInfo"]);
		Route::get('getuserinfo/{user_id}',[UserController::class,"getUserInfo"]);

		Route::get('searchuser/{search}',[UserController::class,"searchUser"]);

	});
});