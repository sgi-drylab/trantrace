<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeWriting;
use DB;
use Maatwebsite\Excel\Sheet;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Shared\Date;

use App\Models\Translate_approve;
use App\Models\Export_version;

class QualifiedExport implements FromArray,WithHeadings,WithColumnFormatting,WithEvents
{	
	use Exportable;
	protected $invoices;
  protected $version;
  protected $field_num;
  protected $heads = array();

	public function headings(): array
    {
        
        return $this->heads;
    }

     public function registerEvents(): array
       {
           return [
               /*AfterSheet::class => function(AfterSheet $event) {

               		// 设置单元格内容居中
                   $event->sheet->getDelegate()->getStyle('A1:J1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);                  
                   $event->sheet->getDelegate()->getStyle('A1:J1')->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);


                   $event->sheet->getDelegate()->getStyle('A1:J1')->getFont()->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('00FFFFFF',false,false));
                    $event->sheet->getDelegate()->getStyle('A1:J1')->getFont()->setSize(12);

                    $event->sheet->getDelegate()->getStyle('A1:J1')->getFont()->setName('新宋体');

                   //var_dump($event->sheet->getDelegate()->getStyles());
                   $event->sheet->getStyle('A1:J1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                   ->getStartColor()->setRGB('1da5a3');//getTabColor
               		
                   // 定义列宽度
                   $widths = ['A' => 25, 'B' => 25, 'C' => 25,'D' => 45,'E' => 45,'F' => 35,'G' => 25,'H' => 25,'I' => 25,'J' => 25];
                   foreach ($widths as $k => $v) {
                   	// 设置列宽度
                      $event->sheet->getDelegate()->getColumnDimension($k)->setWidth($v);
                                       
                   }

               },*/

               BeforeWriting::class => function(BeforeWriting $event){
                $event->writer->getActiveSheet()->getDefaultRowDimension()->setRowHeight(20);
                //$event->writer->getActiveSheet()->getRowDimension('1')->setRowHeight(20);
                $event->writer->getActiveSheet()->getDefaultColumnDimension()->setWidth(20);

                /*$event->writer->getActiveSheet()->getRowDimension('1')->setRowHeight(50);
               
                $event->writer->getActiveSheet()->getStyle('E1')->getAlignment()->setWrapText(true);
                $event->writer->getActiveSheet()->getStyle('D1')->getAlignment()->setWrapText(true);
           
                $event->writer->getActiveSheet()->getProtection()->setSheet(true);
                $event->writer->getActiveSheet()->getProtection()->setPassword(time().rand(100,999).'Ace');

                $widths = ['A' => 25, 'B' => 25, 'C' => 25,'D' => 25,'E' => 25,'F' => 35,'G' => 25,'H' => 25,'I' => 25,'J' => 25];
                $begin_row = '2';
                $over_row = (string)($this->count+1);

                foreach ($widths as $k => $v) {
                      if($k !== 'A'){                       
                        $field_protect = $k.$begin_row.':'.($k.$over_row);                      
                        $event->writer->getActiveSheet()->getStyle($field_protect)
                          ->getProtection()
                          ->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);
                      }               
                }
                $over_row2 = (string)($this->count+2);
                $event->writer->getActiveSheet()->freezePane('A2');
                

      					for($i=2;$i <= ($this->count+1);$i++) {
      						# code...
      						$event->writer->getActiveSheet()->getStyle('E'.$i)->getAlignment()->setWrapText(true);
                  $event->writer->getActiveSheet()->getStyle('D'.$i)->getAlignment()->setWrapText(true);
      					}*/

              },
                   
           ];
      }


    

     public function columnFormats(): array
    {	
	    	//$data_format = NumberFormat::FORMAT_DATE_YYYYMMDD2;
	    
	    	$data_format = NumberFormat::FORMAT_TEXT;
	    
        return [
        	'A' => NumberFormat::FORMAT_TEXT,
            'B' => NumberFormat::FORMAT_TEXT,
            'C' => $data_format,
            'E' => $data_format,
        ];
    }

	 public function __construct($version,$field_num,$Import_head=NULL)
    {   
        $this->version = $version;
        $this->field_num = $field_num;// e、g 5
        $this->Import_head = $Import_head;

        $heads = array();
        $heads[] = 'ProjectName';

        if($this->Import_head !== NULL){
          $import_array =json_decode($this->Import_head,TRUE);
          $heads[] = $import_array[0];
          $heads[] = $import_array[0].'_translate';
          for($i=1;$i<=$this->field_num;$i++) {
            $heads[] =$import_array[$i];
            $heads[] = $import_array[$i].'_translate';
          }
        }else{          
          $heads[] = 'Key';
          $heads[] = 'Key_translate';
          for($i=1;$i<=$this->field_num;$i++) {
            $heads[] ='Value'.$i;
            $heads[] = 'Value_translate'.$i;
          }
        }
        //$heads[] =  'Status';
        $heads[] =  'Owner';
        $heads[] =  'Translator';
        $heads[] =  'Reviewer';
        $heads[] =  'Review Time';
        $this->heads = $heads;

        $this->invoices = Export_version::select('product.product','product.field_num','translate_approve.key','translate_approve.translate','translate_approve.status','translate_approve.allocate_users_name','translate_approve.translate_users_name','translate_approve.approve_users_name','translate_approve.created_at','translate_approve.updated_at')
                ->leftjoin('translate_approve','translate_approve.id','=','export_version.t_appove_id')
                ->join('product','product.id','=','translate_approve.product_id')
                ->where('export_version.version_id','=',$this->version)
                ->get()
                ->toArray();

        foreach ($this->invoices as $KEY => $VALUE) {

          $tmp_array = array();

          $tmp_array['ProjectName'] = $VALUE['product'];

          $key = $VALUE['key'];//json e.g: [{"AKT1 E17K KRAS":"测试1"}]
          $translate = $VALUE['translate'];
          $key_array = json_decode($key,true);//to array
          $translate_array = json_decode($translate,true);

          $Key_key = array_keys($key_array[0])[0];//key and key_t
          $key_values = array_values($key_array[0])[0];
          
          $tmp_array['Key'] = $Key_key;
          $tmp_array['Key_translate'] = $key_values;

          $tran_v_1 = '';
          $tran_v_2 = '';

          $i = 1;
          foreach ($translate_array as $KEY_t => $VALUE_t) {//t and t_t
            if(empty($VALUE_t)){
              $tmp_array['Value'.$i] = '';
               $tmp_array['Value_translate'.$i] ='';
            }else{
              $tmp_array['Value'.$i] = array_keys($VALUE_t)[0];
              $tmp_array['Value_translate'.$i] = array_values($VALUE_t)[0];
            }                     
            $i++;
          }

          $k = $i -1;//not null nums
          if($k<$field_num){
            $null_num = $field_num - $k;//null nums
            for($j=1;$j<=$null_num;$j++) {
                $tmp_array['Value'.($k+$j)] = '';
                $tmp_array['Value_translate'.($k+$j)] = '';
              }
          }
          
          //$tmp_array['Status'] = $VALUE['status'];
          $tmp_array['Allocate_users_name'] = $VALUE['allocate_users_name'];
          $tmp_array['Translate_users_name'] = $VALUE['translate_users_name'];
          $tmp_array['Approve_users_name'] = $VALUE['approve_users_name'];
          $tmp_array['Time'] = $VALUE['updated_at'];

          $this->invoices[$KEY] = $tmp_array;
        }
        /*$count = count($this->invoices);
        $num = $count;
        while($num < 10000){
          $this->invoices[$num] = $this->invoices[0];
          $num++;
        }*/
        $this->count = DB::table('translate_approve')->where('status','Qualified')->count();
    }


    public function array(): array
    {
        return $this->invoices;
    }

}