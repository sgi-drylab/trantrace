<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;
use Illuminate\Support\Facades\Cache;

class Taskerror extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Taskerror_check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
            $time_right = date("Y-m-d H:i:s",(time()-300));
            $order_id = DB::table('seqlist')->where([
                            ['seq_status', '=', '7'],
                            ['seq_starttime', '<', $time_right],
                        ])->pluck('order_id');
            
            foreach ($order_id as $value) {
                DB::table('seqlist')->where('order_id',$value)->update(['seq_status' => 4]);
                DB::table('libseq')->where('order_id',$value)->update(['in_list' => '分析失败已移除']);
		
		        $k = NULL;
                $k=Cache::get('ACE_pipeline_todo_list');

                if($k !== NULL){
                    $key = NULL;
                    foreach($k as $Molkey => $Stakey){
                        if($value == $Stakey['order_id']){
                            $key = $Molkey;
                            break;
                        }
                    }
                	file_put_contents('/data/media/testcron.log',time().':'.'key is '.$key.PHP_EOL,FILE_APPEND);
                    if($key !== NULL){
                        array_splice($k, $key, 1);
                        Cache::forever('ACE_pipeline_todo_list',$k);
                    }   
                	if(empty($k)){
				        file_put_contents('/data/media/testcron.log',time().':'.'array is '.json_encode($k).PHP_EOL,FILE_APPEND);
			         }
                }

	   }
    }

}

       
        

