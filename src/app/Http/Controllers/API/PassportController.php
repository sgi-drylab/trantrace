<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class PassportController extends Controller
{

    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {   
        if (Auth::attempt(['email' => request('email'), 'password' => request('password'),'status'=>1])) {
            $user = Auth::user();

            $success['msg'] = 'Sign in successfully.';
            $tokenResult = $user->createToken('MyApp');
            $success['token'] = $tokenResult->accessToken;
            //set expires_at
            $token = $tokenResult->token;
            $token->expires_at = Carbon::now()->addHour(1);
            $token->save();

            $success['id']  =$user->id;
            $success['role'] = $user->role;
            $success['name']  =$user->name;
            //update time for user login
            $date_time = date("Y-m-d H:i:s");
            User::where('id',$user->id)->update(['last_time'=>$date_time]);           
            //$new_permission = uppermission_mem($user->id,$user->email);//get permission ,put in memcache and return

            //$success['permission'] = $new_permission ? $new_permission : '';

            return response()->json(['success' => $success], $this->successStatus);
        } else {
            return response()->json(['error' => 'Invalid email or password.'], 200);
        }
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {   
        $messages = [
            'required' => 'The :attribute is required.',
            'email'=>'Please enter the correct email.',
            'same'=>'The passwords do not match twice.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ],$messages);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 202);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user_name_find = User::where('name',$input['name'])->first();
        if($user_name_find !== NULL){
            return response()->json(['error' => 'User name is already taken.'], $this->successStatus);
        }
        
        $user_email_find = User::where('email',$input['email'])->first();
        if($user_email_find !== NULL){
            return response()->json(['error' => 'Email is already taken.'], $this->successStatus);
        }
        
        $user = User::create($input);
        
        $success['uid'] = $user->id;
        $success['msg'] = 'Sign up successfully.';
        //$success['token'] = $user->createToken('MyApp')->accessToken;

        $tokenResult = $user->createToken('MyApp');
        $success['token'] = $tokenResult->accessToken;
        //set expires_at
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addHour(1);
        $token->save();

        $success['name']=$user->name;
        $success['role']=User::where('id',$user->id)->value('role');
        //update time for user login
        $date_time = date("Y-m-d H:i:s");
        User::where('id',$user->id)->update(['last_time'=>$date_time]);      
        
        /*$mem_perkey = 'user'.$user->email.'permission';       
        Cache::forever($mem_perkey, '');*/
        /*$test=Cache::get($mem_perkey);
        var_dump($test);*/

        return response()->json(['success' => $success], $this->successStatus);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetails()
    {
        //return response()->json(['success' => '1'], $this->successStatus);
        $user = Auth::user(); 
        return response()->json(['result' => $user], $this->successStatus);
    }
   
    public function logout()
    {
        if (Auth::guard('api')->check()) {
            Auth::guard('api')->user()->token()->delete();
        }

        return response()->json(['success' => 'Sign out successfully.'], $this->successStatus);
    }

    public function changepwd(Request $request){
        $validator = Validator::make($request->all(), [
            'oldpassword' => 'required',
            'newpassword' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        } 

        $input = $request->all();
        $user = Auth::user();
        /*if($user->email === 'Admin'){
            return response()->json(['error' => 'Do not change administrator password'], $this->successStatus);
            die();
        }*/

        $id = $user->id;
        $password_now = DB::table('users')->where('id','=',$id)->value('password');
        $isCheck = Hash::check($input['oldpassword'],$password_now);
        if($isCheck){
            $update = array(
              'password'  =>bcrypt($input['newpassword']),
            );
            DB::table('users')->where('id',$id)->update($update);
            Auth::guard('api')->user()->token()->delete();
            return response()->json(['success' => 'Your password has been changed successfully, please log in again.'], $this->successStatus);
        }else{
            return response()->json(['error' => 'The old password you have entered is incorrect.'], $this->successStatus);
        }

    }
}
?>