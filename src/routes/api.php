<?php

use Illuminate\Http\Request;

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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::auth();*/

Route::post('create/uploadFile&responseType=json','API\CkController@uploadFile');

Route::post('login', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');
Route::post('logout', 'API\PassportController@logout');

Route::middleware(['auth:api'])->group(function () {

	Route::post('getDetails', 'API\PassportController@getDetails');
	Route::post('changepwd', 'API\PassportController@changepwd');

	Route::post('product/create','API\ProductController@add');
	Route::post('product/list','API\ProductController@list');
	Route::post('product/details','API\ProductController@product_details');
	Route::post('product/add_t_ap','API\ProductController@add_t_ap');
	Route::post('product/edit_product','API\ProductController@edit_product');
	Route::post('product/delete_p','API\ProductController@delete_p');

	Route::post('product/lang_list','API\ProductController@lang_list');
	
	Route::post('user/list','API\ProductController@list_users');

	Route::post('translate/download','API\ProductController@download_csv');
	Route::post('translate/import','API\TranslateController@Translate_import');

	Route::post('translate/trans_pro_list','API\TranslateController@trans_pro_list');
	Route::post('translate/list','API\TranslateController@list');
	Route::post('translate/assign','API\TranslateController@assign');

	Route::post('translate/translate_list','API\TranslateController@translate_list');
	Route::post('translate/translate','API\TranslateController@translate');
	Route::post('translate/google','API\TranslateController@translate_bygoogle');
	Route::post('translate/history','API\TranslateController@translate_history');

	Route::post('approve/list','API\ApproveController@list');
	Route::post('approve/approve','API\ApproveController@approve');
	Route::post('approve/list_conflict','API\ApproveController@list_conflict');
	Route::post('approve/approve_conflict','API\ApproveController@approve_conflict');

	Route::post('export/qualifiedexport','API\ExportController@qualified_export');
	Route::post('export/oldversion','API\ExportController@export_by_version');

	Route::post('view/list_project','API\ViewedController@list_project');
	Route::post('view/list_version','API\ViewedController@list_version');
	Route::post('view/list_items','API\ViewedController@list_items');
	Route::post('view/advise','API\ViewedController@advise');
	Route::post('view/list_conflict_mine','API\ViewedController@list_conflict_mine');
	Route::post('view/list_conflict_all','API\ViewedController@list_conflict_all');

	Route::post('version/list_items','API\VersionController@list_items');

	Route::post('User/list','API\UserManagementController@UserList');
	Route::post('User/ChangeUserPwd','API\UserManagementController@ChangePwd_byuid');
   	Route::post('User/addUser','API\UserManagementController@addUser');
   	Route::post('User/close_open','API\UserManagementController@close_open_user');

   	Route::post('Statistic/ProductAccount','API\StatisticController@ProductAccount');
   	Route::post('Statistic/Accout_list_p','API\StatisticController@Accout_list_p');
   	//Route::post('Statistic/Accout_task','API\StatisticController@Accout_task');
    Route::post('Statistic/Accout_task_p','API\StatisticController@Accout_task_p');
    Route::post('Statistic/Accout_task_nums','API\StatisticController@Accout_task_nums');
	Route::post('Statistic/Products_Conflict','API\StatisticController@Products_Conflict');

    Route::post('Import/import_list','API\ImportController@import_list');
	Route::post('Import/export_import','API\ImportController@export_import');

});



/*Route::group(['middleware' => 'auth:api'], function(){
    Route::post('get-details', 'API\PassportController@getDetails');
    Route::post('logout', 'API\PassportController@logout');
});*/



