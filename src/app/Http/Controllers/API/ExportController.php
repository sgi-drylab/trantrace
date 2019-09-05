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

use App\Models\Translate_in;
use App\Models\Translate_job;
use App\Models\Translate_approve;
use App\Models\Product;

use App\Exports\QualifiedExport;
use App\Imports\QualifiedImport;

use App\Models\Export_version;
use Illuminate\Support\Facades\Storage;

class ExportController extends Controller 
{	
	public function qualified_export(Request $request) 
    {   
        $validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',// ["1","2","3"]
            'version_name' => ['required','regex:/^V[1-9]\d*\.[0-9]$/'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();
        $product_id = $input['product_id'];

        $user = Auth::user();
        $user_id = $user->id;
        $users_name = $user->name;
        //make sure user
        $Product_find = Product::select('users_name','field_num','product','import_head')
                            ->where('id',$product_id)
                            ->first();

        $product_name = $Product_find->product;
        $field_num = $Product_find->field_num;
        $Import_head = empty($Product_find->import_head) ? NULL: $Product_find->import_head;

        if($Product_find->users_name !== $users_name){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }
        //make sure version_name
        $version_name = $input['version_name'];
        $version_find = DB::table('version')->where('product_id','=',$product_id)
                                            ->pluck('version_name')
                                            ->toArray();
        if(empty($version_find)){
            if($version_name !== 'V1.0'){
                return response()->json(['error' => 'Wrong version number'], 200);
                die();
            }
        }else{
            if(in_array($version_name, $version_find)){
                return response()->json(['error' => 'Version number already exists'], 200);
                die();
            }
            $version_find_max = DB::table('version')->where('product_id','=',$product_id)
                                            ->orderBy('id','DESC')
                                            ->value('version_name');
            $version_num_max = (float)substr($version_find_max, 1);           
            $version_input = (float)substr($version_name, 1);
            if($version_input <= $version_num_max){
                return response()->json(['error' => 'Version too small'], 200);
                die();
            }
        }
        
        $where[] = array('product.id','=',$input['product_id']);
        $where[] = array('translate_approve.status','=','Qualified');
        
        $get_qualified = Translate_approve::select('translate_approve.id','product.id as product_id')
                ->join('product','translate_approve.product_id','=','product.id')
                ->where($where)
                ->get()
                ->toArray();

        if(empty($get_qualified)){
        	return response()->json(['error' => 'No entries are qualified in this project.'], 200);
            die();
        }
    				
		list($usec, $sec) = explode(" ", microtime());//from microtime
		
		$usec = sprintf("%.6f", $usec);
		$usec = substr($usec,2);//mcs

		$time_name = date('YmdHis',$sec);//time
		
		$version = $time_name.$usec.'u'.$user_id.'p'.$product_id;//version
		$file_name = $version.'.xlsx';//filename

        $date_time = date("Y-m-d H:i:s");

		foreach ($get_qualified as $key => $value) {
            $t_appove_id = $value['id'];
            $get_qualified[$key] = array_except($value, ['id']);
            
			$get_qualified[$key]['version_id'] = $version;
            $get_qualified[$key]['t_appove_id'] = $t_appove_id;
			$get_qualified[$key]['user_name'] = $users_name;
            $get_qualified[$key]['created_at'] = $date_time;
            $get_qualified[$key]['updated_at'] = $date_time;
		}

		$res = DB::table('export_version')->insert($get_qualified);
        
        if($res !== true){
            return response()->json(['error' => 'Database operation error'], 200);
            die();
        }
        
        ob_end_clean();
        ob_start();
 
       // return (new SampleExport($status))->download('Sample.xlsx',\Maatwebsite\Excel\Excel::XLSX);
        Excel::store(new QualifiedExport($version,$field_num,$Import_head),$file_name,'qualifiedexport');
        $md5_array = Excel::toArray(new QualifiedImport,$file_name,'qualifiedexport');

        $count_md5 = count($md5_array[0]);

        if($count_md5 > 1){//export successful
            $version_name_time = date("Y-m-d H:i:s");
            DB::table('version')->insert(['version_id'=>$version,'version_name'=>$version_name,
                'product_id'=>$product_id,'created_at'=>$version_name_time,'updated_at'=>$version_name_time]);

            $file_name_new = $product_name.'_'.$version_name.'.xlsx';
            Storage::disk('qualifiedexport')->move($file_name,$file_name_new);

            Export_version::where('version_id','=',$version)->update(['status'=>1]);

            $where_export[] = array('users_name','=',$users_name);
            if(!empty($product_id)){
                $where_export[] = array('product.id','=',$product_id);
            }
            $where_export[] = array('version.version_id','=',$version);

            $getbyversion =  Product::where($where_export)
                    ->select('product','users_name','lang','deadline','translate_users','approve_users','viewed_users',
                        'status','product.created_at','product.updated_at','attribute','priority','product_desc')
                    ->addselect('version_name','version_id','version.created_at as version_created_at')
                    ->leftjoin('version','product.id','=','version.product_id')
                    ->orderBy('version.id','DESC')
                    ->get()
                    ->toArray();
            $json_return = array();
            $json_return['getbyversion'] = $getbyversion;
            $json_return['file'] = asset('storage/excel/qualifiedexport/'.$file_name_new);

            return response()->json(['result' => $json_return], 200);
            die();

        }else{
            return response()->json(['error' => 'Error'], 200);
            die();
        }
                             
    }

    public function export_by_version(Request $request){
        $validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',// ["1","2","3"]
            'version_name' => ['required','regex:/^V[1-9]\d*\.[0-9]$/'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();
        $product_id = $input['product_id'];
        $version_name = $input['version_name'];

        $user = Auth::user();
        $user_id = $user->id;
        $users_name = $user->name;
        //make sure user
        $Product_find = Product::select('users_name','field_num','product','import_head')
                            ->where('id',$product_id)
                            ->first();

        $product_name = $Product_find->product;
        $field_num = $Product_find->field_num;
        $Import_head = empty($Product_find->import_head) ? NULL: $Product_find->import_head;

        if($Product_find->users_name !== $users_name){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }
        //make sure version_name and find version_id by version_name 
        $where[] = array('product_id','=',$product_id);
        $where[] = array('version_name','=',$version_name);
        
        $version_id = DB::table('version')->where($where)
                                            ->value('version_id');                                          
        if(empty($version_id)){
            return response()->json(['error' => 'Failed'], 200);
            die(); 
        }
        //progress logic       
        $file_name = $version_id.'.xlsx';//filename
        $date_time = date("Y-m-d H:i:s");
       
        ob_end_clean();
        ob_start();
        //return (new SampleExport($status))->download('Sample.xlsx',\Maatwebsite\Excel\Excel::XLSX);
        Excel::store(new QualifiedExport($version_id,$field_num,$Import_head),$file_name,'qualifiedexport');        
        $md5_array = Excel::toArray(new QualifiedImport,$file_name,'qualifiedexport');

        $count_md5 = count($md5_array[0]);

        if($count_md5 > 1){//export successful

            $file_name_new = $product_name.'_'.$version_name.'H_.xlsx';          
            $exists = Storage::disk('qualifiedexport')->exists($file_name_new);
            if($exists){
                Storage::disk('qualifiedexport')->delete($file_name_new);
            }
            Storage::disk('qualifiedexport')->move($file_name,$file_name_new);

            return response()->json(['require' => asset('storage/excel/qualifiedexport/'.$file_name_new)], 200);
            die();

        }else{
            return response()->json(['error' => 'Error'], 200);
            die();
        }
    }
}
