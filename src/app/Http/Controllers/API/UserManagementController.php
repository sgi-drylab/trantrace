<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserManagementController extends Controller
{

    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function UserList(Request $request)
    {
        $page=$request->get('page',1);
        $count=$request->get('count',10);
        
        $user_id = $request->get('user_id');
        $email = $request->get('email');
        $name = $request->get('name');
        $sort = $request->get('sort');

        //get permission by user 
        $user = Auth::user();
        $role = $user->role;
        if($role !== 2){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }
        //user_id
        $where[] = array('role','=',1);
        if(!empty($user_id)){
            $where[] = array('id','=',$user_id);
        }
        if(!empty($email)){
            $where[] = array('email','like','%'.$email.'%');
        }
        if(!empty($name)){
            $where[] = array('name','like','%'.$name.'%');
        }
        if(empty($sort) || (!is_array($sort))){
            $sort[] = 'id';
            $sort[] = 'DESC';
        }
        return User::where($where)
                    ->orderBy($sort[0],$sort[1])
                    ->paginate($count,['*'],'page',$page);
    }

    public function ChangePwd_byuid(Request $request){

        $validator = Validator::make($request->all(), [
            'uid' => 'required',
            'newpassword' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        } 
        $input = $request->all();

        $user = Auth::user();
        if($user->role !== 2){//
            return response()->json(['error' => 'Only the administrator has this permission'], $this->successStatus);
            die();
        }

        $uid = $input['uid'];
        $user_find = User::where('id',$uid)->first();
        if(empty($user_find) || ($user_find->name === 'Admin')){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }

        $newpassword  = bcrypt($input['newpassword']); 
        $user_find->password = $newpassword;
        $user_find->save();

        //DB::table('users')->where('id',$uid)->update($update);           
        return response()->json(['success' => 'Password changed successfully'], $this->successStatus);
        
        
    }

    public function addUser(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            /*'password' => 'required',
            'c_password' => 'required|same:password',*/
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
        $input['password'] = bcrypt('123456');

        $user = Auth::user();
        if($user->role !== 2){//
            return response()->json(['error' => 'Only the administrator has this permission'], $this->successStatus);
            die();
        }

        $user_name_find = User::where('name',$input['name'])->first();
        if($user_name_find !== NULL){
            return response()->json(['error' => 'User name is already taken.'], $this->successStatus);
        }

        $user_email_find = User::where('email',$input['email'])->first();
        if($user_email_find !== NULL){
            return response()->json(['error' => 'Email is already taken.'], $this->successStatus);
        }
        
        User::create($input);
        return response()->json(['success' => 'Add account successfully and the default password is 123456.'], $this->successStatus);
    }

    public function close_open_user(Request $request){

        $validator = Validator::make($request->all(), [
            'uid' => 'required',
            'status' => 'required | boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        } 
        $input = $request->all();
        $uid = $input['uid'];

        $user = Auth::user();
        if($user->role !== 2){//
            return response()->json(['error' => 'Only the administrator has this permission'], $this->successStatus);
            die();
        }

        $user_find = User::where('id',$uid)->first();
        if(empty($user_find) || ($user_find->name === 'Admin')){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }
        $input['status'] ? ($status = 1) : ($status =0);
        $user_find->status = $status;
        $user_find->save();

        DB::table('oauth_access_tokens')->where('user_id','=',$uid)->delete();
        if($status){
            return response()->json(['success' => 'Open the account successfully.'], $this->successStatus);
        }else{
            return response()->json(['success' => 'Shut down the account successfully.'], $this->successStatus);
        }
    }

}