<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Salemail;
use App\User;
use Validator;
use Illuminate\Validation\Rule;
use DB;
class SaleDetailsController extends Controller{


	public function list(Request $request){
		$page=$request->get('page',1);
		$count=$request->get('count',200);
		return Salemail::where('is_delete', 1)->paginate($count,['*'],'page',$page);
		
	}

	public function add(Request $request){

		$input = $request->all();

		//--!--若添加的名字存在关闭的对应邮箱，则打开该条目不再重复添加
		$Salemail=Salemail::where("sale_name",$input["sale_name"])
			->where("is_delete",2)
			->first();

		if($Salemail){
			$Saleid_find = $Salemail->salemailid;
			//以下代码防止被关闭的试剂盒在打开时货号重复
			$Sale_mail_findbycode = Salemail::where("sale_email",$input["sale_email"])
				->first();
			if($Sale_mail_findbycode !== NULL){
				$salemailid_findbycode = $Sale_mail_findbycode->salemailid;
				if($Saleid_find !== $salemailid_findbycode){
					return response()->json(['error' => '邮箱地址重复'], 200);
					die();
				}
			}

			$Salemail->sale_name = $input["sale_name"];
	        $Salemail->sale_email = $input["sale_email"];
	        $Salemail->sale_phone = $input["sale_phone"];
	        $Salemail->is_delete = 1;
	        $res1 = $Salemail->save();
	        if($res1){
				return response()->json(['success' => '成功'], 200);
			}else{
				return response()->json(['error' => '失败'], 200);
			}
		}//--!--

		$validator = Validator::make($request->all(), [
            'sale_name' => 'required | unique :sale_mail,sale_name',
            'sale_email' => 'required | unique :sale_mail,sale_email',
            
            
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }


        $Salemail = new Salemail;

		$Salemail->sale_name = $input["sale_name"];
	    $Salemail->sale_email = $input["sale_email"];
		$Salemail->sale_phone = $input["sale_phone"];

        $res1 = $Salemail->save();
        if($res1){
			return response()->json(['success' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}
	
	public function edit(Request $request){
		

        $input = $request->all();

        $Salemail = Salemail::where('salemailid', $input['salemailid'])
                        ->first();
        if($Salemail === NULL){
        	return response()->json(['error' => '失败'], 200);
        	die();
        }
		
		$Salemail->sale_name = $input["sale_name"];
		$Salemail->sale_email = $input["sale_email"];
        $Salemail->sale_phone = $input["sale_phone"];

        $res1 = $Salemail->save();
        if($res1){
			return response()->json(['success' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}

	public function del(Request $request){
		$Salemailid=$request->get('salemailid');
		
		$Salemail=Salemail::find($Salemailid);
		$Salemail->is_delete=2;
		$res=$Salemail->save();
		if($res){
			return response()->json(['successr' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}
}

?>
