<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\FollowerController;

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

Route::post('login', [AuthController::class,"checkLogin"]);
Route::post('register', [AuthController::class,"checkRegister"]);

Route::group(['middleware'=>'checklogin'],function(){
	
	Route::group(['middleware'=>'checkuser'],function(){
		
		Route::post('addPost',[PostController::class,"addPost"]);
		Route::post('follow',[FollowerController::class,"follow"]);
		Route::post('unfollow',[FollowerController::class,"unfollow"]);

	});

	Route::get('getuserposts/{user_id}',[PostController::class,"getUserPosts"]);
	
	Route::get('getposts',[PostController::class,"getAllPosts"]);

	Route::get('getfollowers',[FollowerController::class,"getfollowers"]);

	Route::get('getfollowings',[FollowerController::class,"getfollowings"]);

});