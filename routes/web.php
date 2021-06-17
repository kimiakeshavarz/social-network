<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware'=>'checklogin'],function(){
	Route::get('/dashboard',function(){return view('index');})->name('dashboard');
	Route::get('/addpost',function(){return view('index');})->name('addpost');
	Route::get('/profile',function(){return view('index');})->name('profile');
	Route::get('/',function(){return view('index');})->name('main');


});

Route::get('/{path?}',function(){return view('index');});


