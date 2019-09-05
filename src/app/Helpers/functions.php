 <?php 
//该脚本文件为公公函数库
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use App\Models\Order;
use App\Models\Role;


function getLibfile($order_id){
	$tmp_dir = '/data/media/tmp/';
	//$tmp_dir = 'D:\php\uploadtest3'.DIRECTORY_SEPARATOR;
	$file_tmparray = array();
	$file_tmp = array();
	$tmp_num =0;
	if ($dh = opendir($tmp_dir)){
    		while (($file = readdir($dh)) !== false){
    			$file_tmparray[] = $file;
		}
    		closedir($dh);
  	}
	foreach($file_tmparray as $key=>$value){
		if( ($value == ($order_id.'_R1.fastq.gz')) || ($value == ($order_id.'_R2.fastq.gz')) ){
			$file_tmp[] = $value;
			$tmp_num++;
		}
	}
	if($tmp_num ===2){
		return true;
	}else{
		return false;
	}
}


function getTask($order_id){
	
	$k=Cache::get('ACE_pipeline_todo_list');

	if($k !== NULL){
		$exist = 0;
		foreach($k as $Molkey => $Stakey){
			if($order_id == $Stakey['order_id']){
				$exist = 1;
				break;
			}
		}
		if($exist == 1){//任务已存在
			return false;
		}
		if(sizeof($k)<8){//测试的时候并行任务数为1
			array_push($k,array('order_id'=>$order_id,'status'=>2,'starttime'=>time()));
			Cache::put('ACE_pipeline_todo_list', $k,43000 );
			//Cache::forever('ACE_pipeline_todo_list',$k);//
			return 2;//当前正在执行的任务数小于5
		}else{
			array_push($k,array('order_id'=>$order_id,'status'=>1,'starttime'=>''));
			Cache::put('ACE_pipeline_todo_list', $k,43000 );
			//Cache::forever('ACE_pipeline_todo_list',$k);
			return 1;//任务已饱和
		}
	}else{
		Cache::put('ACE_pipeline_todo_list',array(array('order_id'=>$order_id,'status'=>2,'starttime'=>time())),43000);//重启后变量未设置获取不到，接到任务设置任务数为1
		return 2;
	}
}

function Dotask($LibID){
	$text_over1 = "_R1_001.fastq.gz";
	$text_over2 = "_R2_001.fastq.gz";
	$file_lib1 = $LibID.$text_over1;
	$file_lib2 = $LibID.$text_over2;
	//$tmp_dir = 'D:\php\uploadtest3'.DIRECTORY_SEPARATOR;
	$tmp_dir = '/data/media/tmp/';
	$file_tmparray = array();
	$file_tmp = array();
	$tmp_num =0;
	if ($dh = opendir($tmp_dir)){
    		while (($file = readdir($dh)) !== false){
    			$file_tmparray[] = $file;
		}
    		closedir($dh);
  	}
	foreach($file_tmparray as $key=>$value){
		if( ($value == ($LibID.'_R1.fastq.gz')) || ($value == ($LibID.'_R2.fastq.gz')) ){
			$file_tmp[] = $value;
			$tmp_num++;
		}
	}
	if($tmp_num ===2 ){//两个测序文件已上传
		//$Data_dir = 'D:\php\Data'.DIRECTORY_SEPARATOR.$LibID;
		$Data_dir = '/data/media/Data/'.$LibID;
		if(!file_exists($Data_dir)){	
			$mk_Datadir=mkdir($Data_dir,0777,true);
			chmod($Data_dir, 0777);
		}else{
			$mk_Datadir = true;
		}
		
		if($mk_Datadir){//数据目录创建成功或已存在
			$file_Data1 = $Data_dir.'/'.substr($file_lib1,0,-9).'.fastq.gz';// '/'
			$file_Data2 = $Data_dir.'/'.substr($file_lib2,0,-9).'.fastq.gz';
		}else{
			return 2;
		}

		foreach ($file_tmp as $Key => $Value) {
			//# code...
			if($Value == $LibID.'_R1.fastq.gz'){
				$cp_Datadir = rename($tmp_dir.$Value,$file_Data1);
			}else{
				$cp_Datadir = rename($tmp_dir.$Value,$file_Data2);
			}
		}
				
		//$Anl_dir =  'D:\php\DataAnalysis'.DIRECTORY_SEPARATOR.$LibID;
		$Anl_dir = '/data/media/DataAnalysis/'.$LibID;
		if(!file_exists($Anl_dir)){
			$mk_Anldir = mkdir($Anl_dir,0777,true);
			chmod($Anl_dir, 0777);
		}else{
			$mk_Anldir = true;
		}
		if(!$mk_Anldir){
			return 4;
		}
		file_put_contents($Anl_dir.'/'.$LibID.'.samples_file.tsv',$LibID."\t".$file_Data1."\t".$file_Data2."\n");
		chmod($Anl_dir.'/'.$LibID.'.samples_file.tsv',0777);	
		return 1;
	}else{//上传的测序文件不完整
	    return 0;
	}	
}

function overTask($LibID){
	//$Analysis_dir = "/media/Results/".$LibID."/report/";
	$qc_dir = "/data/media/Results/".$LibID."/analysis/".$LibID."/";

	/*$Analysis_file1 = $Analysis_dir.'/__standard_edition_print_report.pdf';
	$Analysis_file2 = $Analysis_dir.'/__standard_edition_report.pdf';
	$Analysis_file3 = $Analysis_dir.'/__VIP_edition_print_report.pdf';
	$Analysis_file4 = $Analysis_dir.'/__VIP_edition_report.pdf';*/

	$QC_file = $qc_dir.$LibID."_QC.txt";

	if(file_exists($QC_file)){
		if(filesize($QC_file) > 0){
			//copydir($report_dir,'/media/Results/report_'.$LibID);
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function task_error($order_id){//任务执行失败:目录操作失败，调用分析失败，

	$k=Cache::get('ACE_pipeline_todo_list');
	if($k !== NULL){
		$key = NULL;
		foreach($k as $Molkey => $Stakey){
			if($order_id == $Stakey['order_id']){
				$key = $Molkey;
				break;
			}
		}
		if($key !== NULL){
			array_splice($k, $key, 1);
		}
		Cache::forever('ACE_pipeline_todo_list',$k);
	}
}

function completeTask($order_id){
	
	$k=Cache::get('ACE_pipeline_todo_list');
	if($k !== NULL){
		$key = NULL;
		foreach($k as $Molkey => $Stakey){
			if($order_id == $Stakey['order_id']){
				$key = $Molkey;
				break;
			}
		}
		if($key !== NULL){
			array_splice($k, $key, 1);//执行成功调用此方法时 移除完成的任务
		}
	}
	Cache::forever('ACE_pipeline_todo_list',$k);//更新队列
	$order_id_next = 0;
	$run_num = 0;//标识正在运行中的任务，避免错误情况下(比如多次回调等),导致并行任务超限
	if( ($k !== NULL) && (!empty($k)) ){
		foreach($k as $newk => $newv){//遍历新的任务队列
			if($newv['status'] === 1){//队列中有任务处于等待状态
				$order_id_next = $newv['order_id'];
				break;
			}elseif($newv['status'] === 2){
				$run_num++;
			}
		}
	}
	if($run_num < 8){
		return $order_id_next;//返回待执行的下一个任务
	}else{
		return 0;
	}
	
}


function getnextTask($order_id){

	$k=Cache::get('ACE_pipeline_todo_list');
	if($k !== false){
		foreach($k as $Molkey => $Stakey){
			if($order_id == $Stakey['order_id']){//找到该任务
				if($Stakey['status'] === 1){//该任务状态为1
					$k[$Molkey]['status'] = 2;
					$k[$Molkey]['starttime'] = time();
					Cache::forever('ACE_pipeline_todo_list',$k);
					return true;
					die();
				}else{
					return false;
					die();
				}				
			}
		}
	}
}

 function sendwechat($order_id,$data)
 {
 		$from = Order::where('order_id',$order_id)->value('from');
 		if($from !== 'wechat'){
 			return true;
 			die();
 		}
    	$client = new Client;
    	$url = 'http://singlera.zanhf.com/mobile/api/changeCardStatus';
    	//$url = 'http://kyjk.crmclick.com/v1/common/dataanalysis';
    	//$url = 'http://wap.panda.com';
       	try {

       		$bind_code = $order_id;
       		$data = $data;

		    $timestamp = time();
		    //$timestamp = '1537514771';

		    $str = $bind_code.','.$timestamp;
		    $key_str = 'ky2018key'.$str;
		    $sign = md5($key_str);//md5值
		  	
		  	$header = array('Origin'=>'*');
		    $POST_data = array('data' => $data,'bind_code' =>$bind_code,'timestamp'=>$timestamp,'sign'=>$sign);

		    /*print_r('bind_code:'.$POST_data['bind_code'].PHP_EOL);
		    print_r('timestamp:'.$POST_data['timestamp'].PHP_EOL);
		    print_r('sign:'.$POST_data['sign'].PHP_EOL);

			die();*/
		    $response = $client->request('POST',$url,['headers'=>$header,'form_params'=>$POST_data]);

		    //$response = $client->request('POST', $url,['json' => ['bind_code' => '2000001','data'=>$PDF]]);

		    $statusCode = $response->getStatusCode();
		    $rsp = $response->getBody()->getContents();
		   
		    /*print_r($statusCode);
		    print_r($rsp);*/
		    file_put_contents(storage_path('logs/wechat/send.log'), 'TIME:'.time().':return status is '.$statusCode.' rsp is '.$rsp.PHP_EOL,FILE_APPEND);
		} catch (\Exception $e) {

		    echo 'error:  ';
		    echo $e->getMessage();
		    file_put_contents(storage_path('logs/wechat/send.log'), 'TIME:'.time().':Wrong when send data error is '.$e->getMessage().PHP_EOL,FILE_APPEND);
		}

    }

    function uppermission_mem($uid,$email){//update permission in memcache by uid

    	$permission_get = Role::select('product_id','users_id','permission')
    					->where('users_id','=',$uid)
    					->orderBy('product_id', 'ASC')
    					->get()
    					->toArray();

    	$mem_perkey = 'user'.$email.'permission';
    	Cache::forever($mem_perkey, json_encode($permission_get));

    	return $permission_get;
    }

    function permission_get($uid,$product_id=false){//get permission by uid(and product_id)

    	$where[] = array('users_id','=',$uid);
    	if(!empty($product_id)){
    		$where[] = array('product_id','=',$product_id);
    	}

    	$permission_get = Role::select('product_id','users_id','permission')
    					->where($where)
    					->orderBy('product_id', 'ASC')
    					->get()
    					->toArray();

    	return $permission_get;
    }
    function sortBymany(){
    	//return '123';
    	$args = func_get_args();
		 if(empty($args)){
		  return null;
		 }
		 $arr = array_shift($args);
		 if(!is_array($arr)){
		  throw new Exception("第一个参数应为数组");
		 }
		 foreach($args as $key => $field){
		  if(is_string($field)){
		   $temp = array();
		   foreach($arr as $index=> $val){
		    $temp[$index] = $val[$field];
		   }
		   $args[$key] = $temp;
		  }
		 }
		 $args[] = &$arr;//引用值
		 call_user_func_array('array_multisort',$args);
		 return array_pop($args);
    }



?>
