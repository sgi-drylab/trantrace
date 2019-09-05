<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

use App\Models\Product;
use App\Models\Translate_in;
use App\Models\Lang_code;
//use App\Models\Role;
use App\User;
use Validator;
use DB;
use Illuminate\Validation\Rule;

class ProductController extends Controller{


	public function list(Request $request){

		$user = Auth::user();
		$user_id = $user->id;
		//add permisson controller
		/*$permission_get = permission_get($user_id);
		$product_id_array = array();
		foreach ($permission_get as $key => $value) {
			$product_id_array[] = $value['product_id'];
		}*/
		$users_name = $user->name;

		$product_name = $request->get('product_name');
		$page=$request->get('page',1);
		$count=$request->get('count',10);
		$priority = $request->get('priority');
		$deadline = $request->get('deadline');
		$is_static = $request->get('is_static',0);

		$sort = $request->get('sort');

		$where[] = array('product.users_name','=',$users_name);
		if(!empty($product_name)){
            $where[] = array('product','like','%'.$product_name.'%');
        }
        if(!empty($priority)){
        	$where[] = array('priority','=',$priority);
        }
        if(!empty($deadline)){
        	$where[] = array('deadline','<=',$deadline);
        }

		$for_product_get =  Product::where($where)
				->select('product.*',DB::raw("count(translate_in.status) as total_nums"))
				->leftjoin('translate_in','translate_in.product_id','=','product.id')
				->groupBy('product.id')
				//->orderBy($sort[0],$sort[1])
				//->paginate($count,['*'],'page',$page)
				->get()
				->toArray();

		$product_get = $for_product_get;
		if(!empty($for_product_get) && ($is_static)){
			foreach ($for_product_get as $product_get_k => $product_get_v) {
				# code...
				if($product_get_v['total_nums'] === 0){
					unset($product_get[$product_get_k]);
				}
			}
		}
		//get product_get_id as array
		$i = 0;
		$product_id_array = array();
	    if(!empty($product_get)){
	    	foreach ($product_get as $key_id => $value_id) {
	    		$product_id_array[] = $value_id['id'];
	    	}
	    }
	    $Count_status = array();
	    if(!empty($product_id_array)){
		    $Count_status = Translate_in::select(DB::raw("count(translate_in.status) as nums,translate_in.status"))
		    				->addselect('product_id')
		    				->join('product','product.id','=','translate_in.product_id')
			           		->where($where)
			            	->whereIn('product.id',$product_id_array)
			            	->groupBy('translate_in.product_id','translate_in.status')
			            	->get()
			            	->toArray();
		}
		
		$static = array();
		if(!empty($Count_status)){
			foreach ($Count_status as $key => $value) {
			    $static[$value['product_id']][$value['status']] = $value['nums'];
			   /* if(isset($static[$value['product_id']]['total_nums'])){
			    	$static[$value['product_id']]['total_nums'] += $value['nums'];
			    }else{
			    	$static[$value['product_id']]['total_nums'] = $value['nums'];
			    }*/			     
			}
		}

		if(!empty($product_get)){
			foreach ($product_get as $key_data => $value_data) {
				if(array_key_exists($value_data['id'],$static)){
					array_key_exists('Qualified',$static[$value_data['id']]) ? ($Qualified_nums_p = $static[$value_data['id']]['Qualified']) : ($Qualified_nums_p = 0);
					array_key_exists('Unassigned',$static[$value_data['id']]) ? ($Unassigned_nums_p = $static[$value_data['id']]['Unassigned']) : ($Unassigned_nums_p = 0);

			       	$product_get[$key_data]['Unassigned_nums'] = $Unassigned_nums_p;
			       	$product_get[$key_data]['Qualified_nums'] = $Qualified_nums_p;			   
				}else{
					$product_get[$key_data]['Unassigned_nums'] = $Unassigned_nums_p = 0;
					$product_get[$key_data]['Qualified_nums'] = 0;					
				}
					$product_get[$key_data]['Assignment'] = $value_data['total_nums']-$Unassigned_nums_p;
					$product_get[$key_data]['Completed'] = ($value_data['total_nums'] !== 0) ? bcdiv($product_get[$key_data]['Assignment'],$value_data['total_nums'],4) : 0;
					$product_get[$key_data]['Completed_Qualified'] = ($value_data['total_nums'] !== 0) ? bcdiv($product_get[$key_data]['Qualified_nums'],$value_data['total_nums'],4) : 0;
			}
		}
		/*$collection = collect($product_get);
		$sorted = $collection->sortBy('total_nums');
		$sorted->values()->all();
		$sorted = json_decode(json_encode($sorted), true);*/
		if(!empty($product_get)){
			if(empty($sort) || (!is_array($sort))){
	        	$sort_data = sortBymany($product_get,'deadline',SORT_ASC,'priority',SORT_DESC);//SORT_DESC SORT_ASC
	        }else{
	        	switch ($sort[1]) {
	        		case 'ASC':
	        			$sort_data = sortBymany($product_get,$sort[0],SORT_ASC);
	        			break;
	        		case 'DESC':
	        			$sort_data = sortBymany($product_get,$sort[0],SORT_DESC);;
	        			break;  		
	        		default:
	        			return response()->json(['error' => 'Failed'], 200);
	        			break;
	        	}
	        }
	        $query_data_return = array_slice($sort_data,($page-1)*$count,$count);
	        $total = count($sort_data);
		}else{
			$query_data_return = $product_get;
			$total = 0;
		}
		
		//$test = sortBymany($product_get,'deadline',SORT_ASC,'priority',SORT_DESC,'total_nums',SORT_DESC);
		/*foreach ($return_data as $test_key => $test_value) {
			# code...
			$return[$test_key]['product'] = $test_value['product'];
			$return[$test_key]['deadline'] = $test_value['deadline'];
			$return[$test_key]['priority'] = $test_value['priority'];
			$return[$test_key]['total_nums'] = $test_value['total_nums'];
		}*/

		$data_return = array();
        $data_return['total'] = $total;
        $data_return['data'] = $query_data_return;

        return response()->json(['result' => $data_return], 200);
		
	}

	public function add(Request $request){

		$messages = [
			'required' => 'The :attribute is required.',
            'max' => 'Upload file must be less than 10MB.',
            'unique'=>'The project name is already taken.',
        ];

		$validator = Validator::make($request->all(), [
            'product' => 'required | unique :product,product',
            'deadline' => 'required', 
            'lang' => 'required',
            'translate_users'=>'required | json',
            'approve_users'=>'required | json',
            'viewed_users'=>'present | json',
            'attribute'=>['required',Rule::in(['public','private'])],
            'priority'=>['required',Rule::in([1,2,3])],
            'product_desc' => 'present',
        ],$messages); 

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 202);
        }

        $input = $request->all();
        $user = Auth::user();

		$Product = new Product;

		$Product->product = $input['product'];
        $Product->deadline = $input['deadline'];
        $Product->lang = $input['lang'];
        $Product->users_name = $user->name;
        $Product->translate_users = $input['translate_users'];
        $Product->approve_users = $input['approve_users'];
        if($input['attribute'] === 'private'){
        	$Product->viewed_users = $input['viewed_users'];
        }
        $Product->attribute = $input['attribute'];
        $Product->priority = $input['priority'];
       /* $Product->product_desc = ($input['product_desc'] !== NULL) ? $input['product_desc'] : '';*/
        $Product->product_desc = $input['product_desc'];

        $res = $Product->save();
        /* $Role = new Role;

        $Role->users_id = $user->id;
        $Role->permission = json_encode(array('1','4'));
        $Role->product_id = $Product->id;

        $res2 = $Role->save();
        ///when create a new project,should update the role table and return new permission
        $new_permission = uppermission_mem($user->id,$user->email);*/
        $return = array();
        if($res){
        	$return['status'] = 'Successful';
        	$return['product_id'] = $Product->id;
		}else{
			$return['status'] = 'Failed';
        	$return['product_id'] = NULL;
		}
		return response()->json(['result' => $return], 200);
	}


	public function download_csv(Request $request){
		$file_name = 'Trantrace.upload_template.csv';
		return response()->json(['require' => asset('storage/excel/'.$file_name)], 200);
	}

	public function list_users(Request $request){

		$user_name = $request->get('user_name');
		$page=$request->get('page',1);
		$count=$request->get('count',1000);
		
		$where[] = array('role','=',1);
		$where[] = array('status','=',1);
		if(!empty($user_name)){
            $where[] = array('name','like','%'.$user_name.'%');
        }
		return User::where($where)
				->orderBy('name')
				->paginate($count,['*'],'page',$page);
	}

	public function product_details(Request $request){
		$validator = Validator::make($request->all(), [
            'product_id' => 'required | integer',
        ]); 

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();

		$user = Auth::user();
		$user_id = $user->id;	
		$users_name = $user->name;

		$product_id = $request->get('product_id');
		$page=$request->get('page',1);
		$count=$request->get('count',10);
		
		$where[] = array('users_name','=',$users_name);
		if(!empty($product_id)){
            $where[] = array('product.id','=',$product_id);
        }

		return Product::where($where)
				->select('product','users_name','lang','deadline','translate_users','approve_users','viewed_users',
					'status','product.created_at','product.updated_at','attribute','priority','product_desc')
				->addselect('version_name','version_id','version.created_at as version_created_at')
				->leftjoin('version','product.id','=','version.product_id')
				->orderBy('version.id','DESC')
				->paginate($count,['*'],'page',$page);
	}

	public function add_t_ap(Request $request){

		$validator = Validator::make($request->all(), [
            'id' => 'required | integer',          
            'users'=>'required | json',
            'role'=>['required',Rule::in(['translator','reviewer','viewer'])],
        ]); 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $id = $input['id'];
        $role = $input['role'];
        $users_add = $input['users'];

        $user = Auth::user();
        $uid = $user->id;
        $users_name = $user->name;

		$product_find = Product::where([['id','=',$id],['users_name','=',$users_name]])->first();
		if(empty($product_find)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		};
		if(($product_find->attribute === 'public') && ($role === 'viewer')){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}
		switch ($role) {
			case 'translator':
				$users_get = 'translate_users';
				break;
			case 'reviewer':
				$users_get = 'approve_users';
				break;
			case 'viewer':
				$users_get = 'viewed_users';
				break;
			default:
				return response()->json(['error' => 'Failed'], 200);
				die();
				break;
		}
		$users_get_array = json_decode($product_find->$users_get,TRUE);

		$users_add = json_decode($users_add,TRUE);
		foreach ($users_add as $key => $value) {
			$users_add[$key] = (int)$value;
		}
		$result=array_intersect($users_get_array,$users_add);
		if(!empty($result)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}

		$users_new = array_collapse([$users_get_array,$users_add]);
		array_multisort($users_new);
		/*var_dump($users_new);
		die();*/
		$product_find->$users_get = json_encode($users_new);
		$res = $product_find->save();

        if($res){
			return response()->json(['success' => 'Success'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}

	}

	public function edit_product(Request $request){

		$validator = Validator::make($request->all(), [
            'id' => 'required | integer',
            'product' =>'required',    
            'deadline'=>'required',
            'attribute'=>['required',Rule::in(['public','private'])],
            'priority'=>['required',Rule::in([1,2,3])],
            'product_desc' => 'present',
            'lang' => 'required',
        ]); 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();

        $id = $input['id'];
        $deadline = $input['deadline'];
        $attribute = $input['attribute'];
        $priority = $input['priority'];
        $product = $input['product'];
        $product_desc = $input['product_desc'];
        $lang = $input['lang'];

        $user = Auth::user();
        $uid = $user->id;
        $users_name = $user->name;

        $product_find = Product::where([['id','=',$id],['users_name','=',$users_name]])->first();
		if(empty($product_find)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}

		if($product_find->product !== $product){
			$product_find->product = $product;
		}
		if(($attribute === 'public') && ($product_find->attribute !== $attribute)){
			$product_find->attribute = $attribute;
		}				
		if($product_find->deadline !== $deadline){
			$product_find->deadline = $deadline;
		}
		if($product_find->priority !== $priority){
			$product_find->priority = $priority;
		}
		if($product_find->product_desc !== $product_desc){
			$product_find->product_desc = $product_desc;
		}
		if($product_find->lang !== $lang){
			$product_find->lang = $lang;
		}

		$res = $product_find->save();
		if($res){
			return response()->json(['success' => 'Success'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}

	}

	public function delete_p(Request $request){

		$validator = Validator::make($request->all(), [
            'id' => 'required | integer',
        ]); 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $input = $request->all();
        $id = $input['id'];

        $user = Auth::user();
        $uid = $user->id;
        $users_name = $user->name;

        $product_find = Product::where([['id','=',$id],['users_name','=',$users_name]])->first();
        if(empty($product_find)){
			return response()->json(['error' => 'Failed'], 200);
			die();
		}
		$translate_in_nums = Translate_in::where('product_id','=',$id)->count();
		if($translate_in_nums>0){
			return response()->json(['error' => 'Delete the project is only allowed before nothing is uploaded.'], 200);
			die();
		}
		$res = Product::find($id)->delete();
		if($res){
			return response()->json(['success' => 'Success'], 200);
		}else{
			return response()->json(['error' => 'Failed'], 200);
		}
	}

	public function lang_list(Request $request){

		$page=$request->get('page',1);
		$count=$request->get('count',10);
		$sl = $request->get('sl');
		$tl = $request->get('tl');
		$query_l = $request->get('query_l');
		if((!empty($sl))&&(!empty($tl))){
			$sl_code = Lang_code::where('language','=',$sl)->value('code');
			$tl_code = Lang_code::where('language','=',$tl)->value('code');
			$code = array();
			$code['sl_code'] = $sl_code;
			$code['tl_code'] = $tl_code;
			return response()->json(['result' => $code], 200);
		}
		$where = array();
		if(!empty($query_l)){
			$where[] = array('language','like','%'.$query_l.'%');
		}else{
			$where[] = array('id','>',0);
		}

		return Lang_code::where($where)
			->orderBy('language')
			->paginate($count,['*'],'page',$page);

	}
}

?>