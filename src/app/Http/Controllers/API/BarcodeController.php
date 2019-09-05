<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Barcode;
use App\User;
use Validator;
use DB;
class BarcodeController extends Controller{


	public function list(Request $request){
		$page=$request->get('page',1);
		$count=$request->get('count',10);
		return Barcode::where('is_delete', 1)->paginate($count,['*'],'page',$page);
		
	}

	public function add(Request $request){

		$input = $request->all();


		

		$Barcode=Barcode::where("barcode_name",$input["barcode_name"])
			->where("is_delete",2)
			->first();

		if($Barcode){
	        $Barcode->index_seqi7 = $input["index_seqi7"];
	        $Barcode->index_seqi5 = $input["index_seqi5"];
	        $Barcode->is_delete = 1;
	        $res1 = $Barcode->save();
	        if($res1){
				return response()->json(['success' => '成功'], 200);
			}else{
				return response()->json(['error' => '失败'], 200);
			}
		}

		$validator = Validator::make($request->all(), [
            'barcode_name' => 'required | unique :barcode,barcode_name',
            'index_seqi7' => 'required',
            'index_seqi5' => 'required'
         
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();


		$Barcode = new Barcode;

		$Barcode->barcode_name = $input["barcode_name"];
        $Barcode->index_seqi7 = $input["index_seqi7"];
        $Barcode->index_seqi5 = $input["index_seqi5"];
       
        

        $res1 = $Barcode->save();
        if($res1){
			return response()->json(['success' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}

	public function edit(Request $request){
		$validator = Validator::make($request->all(), [
            'index_seqi7' => 'required',
            'index_seqi5' => 'required'
           
            
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();

        $Barcode = Barcode::where('barcodeid', $input['barcodeid'])
                        ->first();
        if($Barcode === NULL){
        	return response()->json(['error' => '失败'], 200);
        	die();
        }
		


      
        $Barcode->index_seqi7 = $input["index_seqi7"];
        $Barcode->index_seqi5 = $input["index_seqi5"];
        

        $res1 = $Barcode->save();
        if($res1){
			return response()->json(['success' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}

	public function details(Request $request){
		$barcodeid=$request->get('barcodeid');
		$Barcode=Barcode::find($barcodeid);
		return $Barcode;

	}
	

	public function del(Request $request){
		$barcodeid=$request->get('barcodeid');
		
		$Barcode=Barcode::find($barcodeid);
		$Barcode->is_delete=2;
		$res=$Barcode->save();
		if($res){
			return response()->json(['successr' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}

}

?>