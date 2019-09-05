<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;

use App\Models\Translate_in;
use App\Models\Translate_job;
use App\Models\Translate_approve;
use App\Models\Product;

use App\Models\Export_version;
use App\Models\Version;

use Illuminate\Support\Facades\Storage;

class VersionController extends Controller 
{	
	public function list_items(Request $request) 
    {
    	
    	$validator = Validator::make($request->all(), [
    		'product_id'=>'required',
            //'version_name' => 'required',// int
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
		//paginate
        $page=$request->get('page',1); 
        $count=$request->get('count',10);
        // query 
        $version_name = $request->get('version_name');
        $key = $request->get('key');

        $where[] = array('version.product_id','=',$input['product_id']);
        if(!empty($version_name)){
        	$where[] = array('version.version_name','=',$version_name);
        }
        if($key !== NULL){
        	$where[] = array('translate_approve.key','like','%'.$key.'%');
        }

        return Version::select('version.version_name')
        		->addselect('export_version.version_id','export_version.user_name','export_version.created_at')
        		->addselect('translate_approve.id','translate_approve.translate_id','translate_approve.product_id','translate_approve.key','translate_approve.translate','translate_approve.status','translate_approve.tips','translate_approve.created_at','translate_approve.updated_at')
                ->addselect('product.lang','product.product')
                ->leftjoin('export_version','version.version_id','=','export_version.version_id')//join export_version
                ->leftjoin('translate_approve','translate_approve.id','=','export_version.t_appove_id')
                ->join('product','version.product_id','=','product.id')
                ->where($where)
                ->orderBy('version.id','DESC')
                ->paginate($count,['*'],'page',$page);

    }

}