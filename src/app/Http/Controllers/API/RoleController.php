<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\User;
use DB;
class RoleController extends Controller{
	public function list(){
		
		
		$Role=Role::all();
		return $Role;
	}

	public function userList(Request $request){
		$page=$request->get('page',1);
		return User::paginate(10,['*'],'page',$page);
		//return User::all();
		
	}
	public function setRole(Request $request){
		$id=$request->get('id');
		$role=$request->get('role');
		$user=User::find($id);
		$user->role=$role;
		$res=$user->save();
		if($res){
			return response()->json(['successr' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}

	}
	public function setAccountSwitch(Request $request){
		$id=$request->get('id');
		$status=$request->get('status');
		$user=User::find($id);
		$user->status=$status;
		$res=$user->save();
		if($res){
			return response()->json(['successr' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}

}

?>