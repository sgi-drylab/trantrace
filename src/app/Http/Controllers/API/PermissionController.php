<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Validator;
//use Validator;

class PermissionController extends Controller
{

    public function setPermission(Request $request){
        $id=$request->get('id');
        $permission=$request->get('permission');
         $validator = $request->validate([
            'id' => 'required|integer',
            'permission' => '',
        ]);

        $user=User::find($id);
        $user->permission=$permission;
        $mem_perkey = 'user'.$user->email.'permission';
        Cache::forever($mem_perkey,$permission);
        $res=$user->save();
        if($res){
            return response()->json(['successr' => '成功'], 200);
        }else{
            return response()->json(['error' => '失败'], 200);
        }

    }

    public function resetpwd(Request $request){
       
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $id=$input['id'];
        $user=User::find($id);
        if($user->email === 'admin@sgi.com'){
            return response()->json(['error' => '禁止修改管理员密码'], 200);
            die();
        }
        $user->password=bcrypt('123456');
        $res=$user->save();

        if($res){
            return response()->json(['success' => '该用户密码已重置为初始密码'], 200);
        }else{
            return response()->json(['error' => '失败'], 200);
        }
    }

}
?>