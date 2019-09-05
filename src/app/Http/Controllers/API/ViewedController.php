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
use App\Models\Export_version;
use App\Models\Version;
use App\Models\Advices;


class ViewedController extends Controller 
{

	public function list_project(Request $request){

		$page=$request->get('page',1);
        $count=$request->get('count',10);
        
        $product_name = $request->get('product_name');

        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        $user_id = "'".$user_id."'";
        $users_name = "'".$users_name."'";
        $sort = $request->get('sort');
        //product_id
        $where[] = array('id','>',0);
		if(!empty($product_name)){
            $where[] = array('product','like','%'.$product_name.'%');
        }
        if(empty($sort) || (!is_array($sort))){
            $sort[] = 'product';
            $sort[] = 'ASC';
        }

        $sqlTmp = sprintf("json_contains(`product`.`viewed_users`,%s)", $user_id);
        $sqlTmp2 = sprintf("json_contains(`product`.`translate_users`,%s)", $user_id);
        $sqlTmp3 = sprintf("json_contains(`product`.`approve_users`,%s)", $user_id);
        $sqlTmp4 = sprintf("`product`.`attribute` = 'public'");
        $sql_where = sprintf("(%s OR %s OR %s OR product.users_name=%s OR %s)",$sqlTmp,$sqlTmp2,$sqlTmp3,$users_name,$sqlTmp4);

        $product_get= Product::where($where)
                            ->select('id');

        $version_get = Version::select('product_id',DB::raw('COUNT(`version`.id) as version_nums'))
                                ->JoinSub($product_get, 'latest_posts', function($join) {
                                    $join->on('version.product_id', '=', 'latest_posts.id');
                                })
                                ->groupBy('version.product_id')
                                ->get()
                                ->toArray();

        $version_array = array();
        if(!empty($version_get)){
            foreach ($version_get as $key => $value) {
                $version_array[$value['product_id']] = $value['version_nums'];
            }
        }

        $query_get =  DB::table('product')
                ->select('*')
                ->where($where)
                ->WhereRaw($sql_where)
                ->orderBy($sort[0],$sort[1])
                ->get()
                ->toArray();

        $query_get_data = $query_data_return = array();
        if(count($query_get) >0){
            $query_get_data = $query_get;
            foreach ($query_get as $key2 => $value2) {
                if(!array_key_exists($value2->id, $version_array)){
                    unset($query_get_data[$key2]);
                }
            }
        }
        
        $query_data_return = array_slice($query_get_data,($page-1)*$count,$count);
        $total = count($query_get_data);
        
        $data_return = array();
        $data_return['total'] = $total;
        $data_return['data'] = $query_data_return;

        return response()->json(['result' => $data_return], 200);
	}

	public function list_version(Request $request){

		$validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',// int
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $page=$request->get('page',1);
        $count=$request->get('count',10);

        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //make sure user have access to viewed
        $viewed_users_get = Product::where('id',$input['product_id'])
        					->select('users_name','viewed_users','translate_users','approve_users','attribute')
                            ->get()
                            ->toArray();
        $viewed_users_get = $viewed_users_get[0];
        
        if($viewed_users_get['attribute'] === 'private'){
            $users_name_get = $viewed_users_get['users_name'];
            $translate_users = json_decode($viewed_users_get['translate_users']);
            $viewed_users = json_decode($viewed_users_get['viewed_users']);
            $approve_users = json_decode($viewed_users_get['approve_users']);

            if(($users_name !== $users_name_get)&&(!in_array($user_id,$translate_users))&&(!in_array($user_id,$viewed_users))&&(!in_array($user_id,$approve_users))){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
        }

        return Version::select('version.id','version.version_id','version_name','version.created_at')
        					->where('version.product_id',$input['product_id'])
                            ->leftjoin('export_version','version.version_id','=','export_version.version_id')	
        					->groupBy('version.version_id')
                            ->orderBy('version.id','DESC')
        					->paginate($count,['*'],'page',$page);
        					        					      						      					
	}

	public function list_items(Request $request){
		
        $validator = Validator::make($request->all(), [
            'product_id'=>'required',
            //'version_name' => 'required',// int
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //make sure user have access to viewed
        $viewed_users_get = Product::where('id',$input['product_id'])
                            ->select('users_name','viewed_users','translate_users','approve_users','attribute')
                            ->get()
                            ->toArray();
        $viewed_users_get = $viewed_users_get[0];
        
        if($viewed_users_get['attribute'] === 'private'){      
            $users_name_get = $viewed_users_get['users_name'];
            $translate_users = json_decode($viewed_users_get['translate_users']);
            $viewed_users = json_decode($viewed_users_get['viewed_users']);
            $approve_users = json_decode($viewed_users_get['approve_users']);

            if(($users_name !== $users_name_get)&&(!in_array($user_id,$translate_users))&&(!in_array($user_id,$viewed_users))&&(!in_array($user_id,$approve_users))){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
        }
        //paginate
        $page=$request->get('page',1); 
        $count=$request->get('count',10);
        // query 
        $version_name = $request->get('version_name');
        $key = $request->get('key');
        $export_id = $request->get('export_id');

        $where[] = array('version.product_id','=',$input['product_id']);
        if(!empty($version_name)){
            $where[] = array('version.version_name','=',$version_name);
        }
        if($key !== NULL){
            $where[] = array('translate_approve.key','like','%'.$key.'%');
        }
        if($export_id !== NULL){
            $where[] = array('export_version.id','=',$export_id);
        }


        $data =  Version::select('version.version_name')
                ->addselect('export_version.id as export_id','export_version.version_id','export_version.user_name','export_version.created_at')
                ->addselect('translate_approve.id','translate_approve.translate_id','translate_approve.product_id','translate_approve.key','translate_approve.translate','translate_approve.status','translate_approve.tips','translate_approve.created_at','translate_approve.updated_at','translate_approve.conflict','translate_approve.objection')
                ->addselect('translate_approve.translate_users_name','translate_approve.allocate_users_name','translate_approve.approve_users_name')
                ->addselect('product.lang','product.product')
                ->leftjoin('export_version','version.version_id','=','export_version.version_id')//join export_version
                ->leftjoin('translate_approve','translate_approve.id','=','export_version.t_appove_id')
                ->join('product','version.product_id','=','product.id')
                ->where($where)
                ->orderBy('version.id','DESC')
                ->paginate($count,['*'],'page',$page)
                ->toArray();
                
        if($data['total'] ===0){
            $data['newest_version_name'] = null;
            $data['newest_version_id'] = null;
            return response()->json(['result' => $data], 200); 
            die();
        }
        //get newest version for front pages
        $newest_version = Export_version::where([['export_version.product_id','=',$input['product_id']],['status','=',1]])
                            ->select('export_version.version_id','version_name')
                            ->join('version','version.version_id','=','export_version.version_id')
                            ->orderBy('export_version.id','DESC')
                            ->first();
                          
        $newest_version_name = $newest_version->version_name;
        $newest_version_id = $newest_version->version_id;
        $data['newest_version_name'] = $newest_version_name;
        $data['newest_version_id'] = $newest_version_id;

        return response()->json(['result' => $data], 200);
	}

    public function advise(Request $request){

        $validator = Validator::make($request->all(), [
            'export_id'=>'required | integer',//export_id
            'objection' => 'required',// varchar
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //make sure user have access to viewed
        $viewed_users_get = Product::select('users_name','viewed_users','translate_users','approve_users','attribute')
                            ->addselect('export_version.product_id')
                            ->join('export_version','export_version.product_id','=','product.id')
                            ->where('export_version.id','=',$input['export_id'])
                            ->get()
                            ->toArray();
        if(empty($viewed_users_get)){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }
        $viewed_users_get = $viewed_users_get[0];
        if($viewed_users_get['attribute'] === 'private'){
            $users_name_get = $viewed_users_get['users_name'];
            $translate_users = json_decode($viewed_users_get['translate_users']);
            $viewed_users = json_decode($viewed_users_get['viewed_users']);
            $approve_users = json_decode($viewed_users_get['approve_users']);

            if(($users_name !== $users_name_get)&&(!in_array($user_id,$translate_users))&&(!in_array($user_id,$viewed_users))&&(!in_array($user_id,$approve_users))){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
        }
        //make sure the version is newest
        $version_id_find = Export_version::where('id',$input['export_id'])
                            ->value('version_id');
        $product_id = $viewed_users_get['product_id'];
        $newest_version = Export_version::where([['product_id','=',$product_id],['status','=',1]])
                            ->orderBy('id','DESC')
                            ->value('version_id');
        if($version_id_find !== $newest_version){
            return response()->json(['error' => 'Comment only on the latest version'], 200);
            die();
        }
        //make sure status
        $items_find = Export_version::where('export_version.id',$input['export_id'])
                            ->select('translate_approve.status','export_version.t_appove_id','translate_approve.conflict')
                            ->join('translate_approve','translate_approve.id','=','export_version.t_appove_id')
                            ->get()
                            ->toArray();

        if($items_find[0]['status'] !== 'Qualified'){
            return response()->json(['error' => 'Comment only on qualified entries'], 200);
            die();
        }
        if($items_find[0]['conflict'] !== 0){
            return response()->json(['error' => 'The entry has been commented on'], 200);
            die();
        }
        //logic processing
        $t_appove_id = $items_find[0]['t_appove_id'];
        $items_update = Translate_approve::where('id',$t_appove_id)->update(['conflict'=>1,'objection'=>$input['objection'],'advise_user'=>$users_name]);

        $insert_advices = new Advices;
        $insert_advices->t_app_id = $t_appove_id;
        $insert_advices->user_name = $users_name;
        $insert_advices->version_id = $version_id_find;
        $insert_advices->objection = $input['objection'];
        $insert_advices->save();

        if($items_update){
            return response()->json(['success' => 'Success'], 200);           
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }
        

    }

    public function list_conflict_mine(Request $request){

        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);
     
        //$status = $request->get('status');
        $key = $request->get('key');
        $id = $request->get('id');
        $product_name = $request->get('product_name');
        $status = $request->get('status');
        $sort = $request->get('sort');
        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
 
        //below
        $where[] = array('advices.user_name','=',$users_name);     
        //conflict is 1 and status is Qualified             
        //other conditions 
        if(!empty($id)){
            $where[] = array('advices.id','=',$id);
        }
        if(!empty($key)){
            $where[] = array('translate_approve.key','like','%'.$key.'%');
        }
        if(!empty($product_name)){
            $where[] = array('product.product','like','%'.$product_name.'%');
        }

        if($status !== NULL){
            $where[] = array('advices.approved','=',$status);
        }
        if(empty($sort) || (!is_array($sort))){
            $sort[] = 'translate_approve.id';
            $sort[] = 'DESC';
        }

        return Advices::select('translate_approve.id','translate_approve.key','translate_approve.translate')
                ->addselect('translate_approve.translate_users_name','translate_approve.allocate_users_name','translate_approve.approve_users_name')//
                ->addselect('product.lang','product.product')//product
                ->addselect('advices.id','advices.user_name','advices.objection','advices.approved','advices.created_at')//advices
                ->join('translate_approve','translate_approve.id','=','advices.t_app_id')
                ->join('product','translate_approve.product_id','=','product.id')
                ->where($where)
                ->orderBy($sort[0],$sort[1])
                ->paginate($count,['*'],'page',$page);

    }
    public function list_conflict_all(Request $request){

        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);
     
        //$status = $request->get('status');
        $key = $request->get('key');
        $id = $request->get('id');
        $product_name = $request->get('product_name');
        $status = $request->get('status');
        $sort = $request->get('sort');
        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        $users_name_js = "'".$users_name."'";
        $user_id_js = "'".$user_id."'";

        $sqlTmp = sprintf("json_contains(`product`.`viewed_users`,%s)", $user_id_js);
        $sqlTmp2 = sprintf("json_contains(`product`.`translate_users`,%s)", $user_id_js);
        $sqlTmp3 = sprintf("json_contains(`product`.`approve_users`,%s)", $user_id_js);
        $sqlTmp4 = sprintf("`product`.`attribute` = 'public'");
        $sql_where = sprintf("(%s OR %s OR %s OR product.users_name=%s OR %s)",$sqlTmp,$sqlTmp2,$sqlTmp3,$users_name_js,$sqlTmp4);//"'".

        $product_get= Product::WhereRaw($sql_where)
                            ->select('id')
                            ->get()
                            ->toArray();
        $i = 0;
        $product_id_array = array();
        while ( $i < count($product_get)) {
            $product_id_array[] = $product_get[$i]['id'];
            $i++;
        }

        //below
        //$where[] = array('advices.user_name','=',$users_name);     
        //conflict is 1 and status is Qualified             
        //other conditions 
        if(!empty($id)){
            $where[] = array('advices.id','=',$id);
        }else{
            $where[] = array('advices.id','>',0);
        }
        if(!empty($key)){
            $where[] = array('translate_approve.key','like','%'.$key.'%');
        }
        if(!empty($product_name)){
            $where[] = array('product.product','like','%'.$product_name.'%');
        }

        if($status !== NULL){
            $where[] = array('advices.approved','=',$status);
        }
        if(empty($sort) || (!is_array($sort))){
            $sort[] = 'translate_approve.id';
            $sort[] = 'DESC';
        }

        return Advices::select('advices.id','advices.t_app_id','advices.user_name','advices.approved','advices.objection','advices.created_at as advice_created_at','advices.updated_at as advice_updated_at')
                ->addselect('translate_approve.translate_id','translate_approve.product_id','translate_approve.key','translate_approve.translate','translate_approve.tips','translate_approve.created_at','translate_approve.updated_at','translate_approve.objection')
                ->addselect('translate_approve.translate_users_name','translate_approve.allocate_users_name','translate_approve.approve_users_name')
                ->addselect('product.users_name','product.translate_users','product.lang','product.product','product.attribute')
                ->addselect('version.version_name')
                ->join('translate_approve','translate_approve.id','=','advices.t_app_id')
                ->join('product','translate_approve.product_id','=','product.id')
                ->leftjoin('version','version.version_id','=','advices.version_id')
                ->whereIn('product.id',$product_id_array)
                ->where($where)
                ->orderBy($sort[0],$sort[1])
                ->paginate($count,['*'],'page',$page);

    }



}