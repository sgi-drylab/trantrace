<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\UploadedFile;
use App\Models\Log;

use App\Imports\TranslateImport;
use App\Models\Translate_in;
use App\Models\Translate_job;
use App\Models\Translate_approve;
use App\Models\Product;
use App\Models\Import_log;

use Illuminate\Support\Facades\Storage;

class ImportController extends Controller 
{

	public function import_list(Request $request){

		$validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',// ["1","2","3"]
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
        $page=$request->get('page',1); 
        $count=$request->get('count',10);

        $user = Auth::user();
        $user_id = $user->id;
        $users_name = $user->name;

        $product_id = $input['product_id'];

        return Import_log::where([['product_id','=',$product_id],['user_name','=',$users_name]])
        	->orderBy('id','DESC')
            ->paginate($count,['*'],'page',$page);
		
	}

	public function export_import(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required | integer',// ["1","2","3"]
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();
        $id = $input['id'];

        $user = Auth::user();
        $user_id = $user->id;
        $users_name = $user->name;
        //make sure user and id ,get file_name and product_id
        $Import_find = Import_log::where([['id','=',$id],['user_name','=',$users_name]])
                            ->select('file_name','product_id','created_at')
                            ->first();
        if($Import_find === NULL){
        	return response()->json(['error' => 'Failed'], 200);
            die();
        }
        //progress logic       
        ob_end_clean();
        ob_start();
        //return (new SampleExport($status))->download('Sample.xlsx',\Maatwebsite\Excel\Excel::XLSX);
        $file_name = $Import_find->file_name;
        $product_id = $Import_find->product_id;
        $time_import = $Import_find->created_at;
        $time_import = date("YmdHis",strtotime($time_import));

        $md5_array = Excel::toArray(new TranslateImport,$file_name,'translateimport');
        $count_md5 = count($md5_array[0]);

        if($count_md5 > 1){//export successful
        	//get product_name
        	$product_name = Product::where('id','=',$product_id)->value('product');
        	//get Times
        	$times_array = Import_log::where('product_id','=',$product_id)
        		->select('id')
        		->get()
        		->toArray();

        	$array_import = array();
        	foreach ($times_array as $key => $value) {
        		$array_import[] = $value['id'];
        	}
			$Times = array_search($id, $array_import);
			if($Times === false){
				return response()->json(['error' => 'Failed'], 200);
            	die();
			}
			$Times = $Times + 1;
			//logic
            $file_name_new = $product_name.'_'.$Times.'Import'.$time_import.'.csv';  
            $exists = Storage::disk('translateimport')->exists($file_name_new);
            if($exists){
                Storage::disk('translateimport')->delete($file_name_new);
            }
            Storage::disk('translateimport')->copy($file_name,$file_name_new);

            return response()->json(['require' => asset('storage/excel/translateimport/'.$file_name_new)], 200);
            die();

        }else{
            return response()->json(['error' => 'Error'], 200);
            die();
        }
    }


}