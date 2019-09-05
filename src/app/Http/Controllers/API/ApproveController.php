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
use Illuminate\Validation\Rule;
use App\Models\Advices;

class ApproveController extends Controller 
{

	public function list(Request $request){//list owner items
        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);
        $key = $request->get('key');
        $status = $request->get('status');
        $product_id = $request->get('product_id');
        $product_name = $request->get('product_name');
        $id = $request->get('id');

        $priority = $request->get('priority');
        $deadline = $request->get('deadline');
        $sort=$request->get('sort');

        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;

        //product_id
        $where[] = array('translate_approve.id','>',0);
        //key status
        if(!empty($id)){
        	$where[] = array('translate_approve.id','=',$id);
        }
        if(!empty($product_id)){
        	$where[] = array('translate_approve.product_id','=',$product_id);
        }
        if(!empty($product_name)){
        	$where[] = array('product.product','like','%'.$product_name.'%');
        }
        if(!empty($key)){
            $where[] = array('translate_approve.key','like','%'.$key.'%');
        }
        if(!empty($status)){
            $where[] = array('translate_approve.status','=',$status);
        }else{
            $where[] = array('translate_approve.status','<>','Unreviewed');
        }
        if(!empty($priority)){
            if(!in_array($priority,array(1,2,3))){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
            $where[] = array('product.priority','=',$priority);
        }
        if(!empty($deadline)){
            $where[] = array('product.deadline', '<=', $deadline);
        }
        if(empty($sort) || (!is_array($sort))){
            $sort[] = 'product.deadline';
            $sort[] = 'ASC';
            $sort[] = 'product.priority';
            $sort[] = 'DESC';
        }else{
            $sort[2] = 'product.priority';
            $sort[3] = 'DESC';
        }
        
        return Translate_approve::select('translate_approve.id','translate_approve.translate_id','translate_approve.product_id','translate_approve.key','translate_approve.translate','translate_approve.status','translate_approve.tips','translate_approve.created_at','translate_approve.updated_at')
                ->addselect('translate_approve.translate_users_name','translate_approve.allocate_users_name','translate_approve.approve_users_name')
                ->addselect('product.translate_users','product.lang','product.product','product.priority','product.deadline')
                ->join('product','translate_approve.product_id','=','product.id')
                ->whereJsonContains('product.approve_users',$user_id)
                ->where($where)
                ->orderBy($sort[0],$sort[1])
                ->orderBy($sort[2],$sort[3])
                ->paginate($count,['*'],'page',$page);
                  
    }

    public function approve(Request $request){

    	$validator = Validator::make($request->all(), [
            'translate_approve_id' => 'required',// ["1","2","3"]
            'approved' => 'required',//1 OK 0 re-translate
            'tips' => 'present',     
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();

        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;

        $approved = $input['approved'];
        $translate_approve_id = $input['translate_approve_id'];
        $tips = $input['tips'];

        $translate_approve_find = Translate_approve::select('translate_approve.status','translate_approve.translate_id','product.approve_users','translate_approve.translate_job_id')
        							->where('translate_approve.id',$translate_approve_id)
        							->join('product','translate_approve.product_id','=','product.id')
        							->get()
        							->toArray();
        
        if($translate_approve_find[0]['status'] !== 'Unreviewed'){
        	return response()->json(['error' => 'Failed'], 200);
        }

        $approve_users_find = json_decode($translate_approve_find[0]['approve_users'],TRUE);
        if(!in_array($user_id, $approve_users_find)){
        	return response()->json(['error' => 'Failed'], 200);
        }

        $translate_id = $translate_approve_find[0]['translate_id'];
        $translate_job_id = $translate_approve_find[0]['translate_job_id'];

        $res1 = $res2 = $res3 = TRUE;
        if($approved){
        	$status_update = 'Qualified';      	
        }else{
        	if($tips === NULL){
        		return response()->json(['error' => 'If not, please note the reason'], 200);
        	}
        	$status_update = 'Unretranslated';
        }

        $res1 = Translate_approve::where('id',$translate_approve_id)->update(['status'=>$status_update,'approve_users_name'=>$users_name,'tips'=>$tips]);
        $res2 = Translate_job::where('id','=',$translate_job_id)->update(['status'=>$status_update]);
        $res3 = Translate_in::where('id',$translate_id)->update(['status'=>$status_update]);

        if($res1 & $res2 & $res3){
            return response()->json(['success' => 'Success'], 200);           
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }
    }

    public function list_conflict(Request $request){

        $input = $request->all();
       
        $product_name = $request->get('product_name');
        $is_done = $request->get('is_done');
        //get data
        $page=$request->get('page',1);
        $count=$request->get('count',10);
     
        //$status = $request->get('status');
        $key = $request->get('key');
        $id = $request->get('id');
        $sort = $request->get('sort');
        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;

        if($product_name !== NULL){
            /*if(!preg_match("/^[1-9][0-9]*$/" ,$product_id)){//not empty must be int
                return response()->json(['error' => 'Failed'], 200);
            }*/
            //make sure user have access to viewed
            $users_name_get = Product::where('product',$product_name)
                                ->value('users_name');
            if($users_name_get !== $users_name){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
            $where[] = array('product.product','=',$product_name);
        }else{
            $where[] = array('product.users_name','=',$users_name);
        }   
        //below
        if($is_done !== NULL){//all 1
            if((int)$is_done !== 3){
                $where[] = array('advices.approved','=',(int)$is_done);
            }
        }      
        //conflict is 1 and status is Qualified             
        //other conditions 
        if(!empty($key)){
            $where[] = array('translate_approve.key','like','%'.$key.'%');
        }
        if(!empty($id)){
            $where[] = array('advices.id','=',$id);
        }
        if(empty($sort) || (!is_array($sort))){
            $sort[] = 'advices.id';
            $sort[] = 'DESC';
        }
        

        return Advices::select('advices.id','advices.t_app_id','advices.user_name','advices.approved','advices.created_at as advice_created_at','advices.updated_at as advice_updated_at')
                ->addselect('translate_approve.translate_id','translate_approve.product_id','translate_approve.key','translate_approve.translate','translate_approve.tips','translate_approve.created_at','translate_approve.updated_at','translate_approve.objection')
                ->addselect('translate_approve.translate_users_name','translate_approve.allocate_users_name','translate_approve.approve_users_name')
                ->addselect('product.translate_users','product.lang','product.product')
                ->join('translate_approve','translate_approve.id','=','advices.t_app_id')
                ->join('product','translate_approve.product_id','=','product.id')
                ->where($where)
                ->orderBy($sort[0],$sort[1])
                ->paginate($count,['*'],'page',$page);

    }

    public function approve_conflict(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required | integer',
            'approved'=>'required',//1 Error 0 refused and Qualified
            'translate_users_name'=>'present',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $id = $input['id'];//id of item in table 'advices'
        $approved = $input['approved'];
        $translate_users_name = $input['translate_users_name'];
        //get permission by user 
        $user = Auth::user();
        $users_name = $user->name;
        $user_id = $user->id;
        //make sure user have access to viewed and status and confict is right
        $condition_get = Advices::where('advices.id',$id)
                                            ->select('translate_approve.id','translate_approve.translate_id','translate_approve.translate_job_id','translate_approve.status','translate_approve.conflict','product.users_name','product.translate_users')
                                            ->addselect('advices.approved')
                                            ->join('translate_approve','translate_approve.id','=','advices.t_app_id')
                                            ->join('product','product.id','=','translate_approve.product_id')
                                            ->first();
        $t_approve_id = $condition_get->id;
        $users_name_get = $condition_get->users_name;
        $conflict_get = $condition_get->conflict;
        $status_get = $condition_get->status;
        $approved_get = $condition_get->approved;

        $translate_users_get = $condition_get->translate_users;
        $translate_id = $condition_get->translate_id;
        $translate_job_id = $condition_get->translate_job_id;
        $res1 = $res2 = $res3 = $res4 = $res5 = true;

        if(($users_name_get !== $users_name)||($conflict_get !== 1)||($status_get !== 'Qualified') || ($approved_get !== 0)){
            return response()->json(['error' => 'Failed'], 200);
            die();
        }
        //logic processing
        if($approved){ //approved is 1
            if(empty($translate_users_name)){
                return response()->json(['error' => 'Failed'], 200);
                die();
            }
            //find user_id by translate_users_name
            $translate_users_id = User::where('name','=',$translate_users_name)->value('id'); 
            if(empty($translate_users_id)){
                return response()->json(['error' => 'Failed'], 200);
            }
            //get translate_users of product
            $translate_users_get = json_decode($translate_users_get,TRUE);
            if(!in_array($translate_users_id, $translate_users_get)){
                return response()->json(['error' => 'Failed'], 200);
            }
            //assign and update 
            //get items
            $translate_in = Translate_in::select('translate_in.id','translate_in.users_name','translate_in.product_id','translate_in.key','translate_in.translate','translate_in.status')
                        ->addselect('product.lang')                      
                        ->join('product','translate_in.product_id','=','product.id')
                        ->join('translate_approve','translate_approve.translate_id','=','translate_in.id')
                        ->where('translate_approve.id',$t_approve_id)
                        ->get()
                        ->toArray();
            $insert = $translate_in[0];
            $date_time = date("Y-m-d H:i:s");

            $insert = array_except($insert, ['users_name']);
            $insert['translate_id'] = $insert['id'];
            $insert = array_except($insert, ['id']);   
            $insert['translate_users_name'] = $translate_users_name;
            $insert['allocate_users_name'] = $users_name;
            $insert['status'] = 'Untranslated';
            $insert['created_at'] = $date_time;
            $insert['updated_at'] = $date_time;
            //insert and update db          
            if(!empty($insert)){
                DB::beginTransaction();
                try{
                    $res1 = DB::table('translate_job')->insert($insert);
                    $res2 = DB::table('translate_in')->where('id',$translate_id)->update(['status'=>'Untranslated','updated_at'=>$date_time]);
                    $res3 = DB::table('translate_approve')->where('id',$t_approve_id)->update(['status'=>'Error','updated_at'=>$date_time]);
                    $res4 = DB::table('translate_job')->where('id',$translate_job_id)->update(['status'=>'Error','updated_at'=>$date_time]);
                    $res5 = DB::table('advices')->where('id',$id)->update(['approved'=>1,'updated_at'=>$date_time]);

                    DB::commit();
                }catch(Exception $e){
                    DB::rollBack();
                    return response()->json(['error' => 'Failed'], 200);
                }                      
            }
        }else{
            $date_time = date("Y-m-d H:i:s");
            DB::beginTransaction();
                try{
                    $res1= DB::table('translate_approve')->where('id',$t_approve_id)->update(['status'=>'Qualified','conflict'=>0,'updated_at'=>$date_time]);
                    $res2 = DB::table('advices')->where('id',$id)->update(['approved'=>2]);
                    DB::commit();
                }catch(Exception $e){
                    DB::rollBack();
                    return response()->json(['error' => 'Failed'], 200);
                }
            
        }

        if($res1&$res2&$res3&$res4){
            return response()->json(['success' => 'Success'], 200);
        }else{
            return response()->json(['error' => 'Failed'], 200);
        }

    }

}