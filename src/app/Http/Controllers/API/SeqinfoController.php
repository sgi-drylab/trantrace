<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Seqinfo;
use App\User;
use Validator;
use DB;
use Illuminate\Support\Facades\Auth;
class SeqinfoController extends Controller{


	public function list(Request $request){
		$page=$request->get('page',1);
		$count=$request->get('count',10);
		$project_user = $request->get('project_user');
		if(!empty($project_user)){
            $where = array('project_user','=',$project_user);
        }else{
            $where = array('seqinfoid','>',0);
        }
		return Seqinfo::where([$where])
			->orderBy('seqinfoid', 'desc')
			->paginate($count,['*'],'page',$page);		
	}

	public function add(Request $request){
		$validator = Validator::make($request->all(), [
            'seq_name_path' => 'present',
            'md5sum' => 'present',
            'analyst_user' => 'present',
            'project_notes'=>'present',
            'project_name'=>'present',     
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $input = $request->all();

        $user = Auth::user();
        $user_name = $user->name;

		$Seqinfo = new Seqinfo;

		$Seqinfo->seq_name_path = $input["seq_name_path"];
        $Seqinfo->md5sum = $input["md5sum"];
        $Seqinfo->analyst_user = $input["analyst_user"];
       	$Seqinfo->project_user = $user_name;
        $Seqinfo->project_notes = $input["project_notes"];
        $Seqinfo->project_name = $input["project_name"];

        $res1 = $Seqinfo->save();
        if($res1){
			return response()->json(['success' => '成功'], 200);
		}else{
			return response()->json(['error' => '失败'], 200);
		}
	}

	public function edit(Request $request){
		$validator = Validator::make($request->all(), [
            'seqinfoid' => 'required',
            'seq_name_path' => 'present',
            'md5sum' => 'present',
            'analyst_user' => 'present',                    
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