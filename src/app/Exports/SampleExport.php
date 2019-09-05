<?php

namespace App\Exports;

//use App\Http\Controllers\API\SampleController;
use App\Models\Sample;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
//use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeWriting;
use DB;
use Maatwebsite\Excel\Sheet;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class SampleExport implements FromQuery,WithHeadings,WithColumnFormatting,WithEvents
{	
	use Exportable;
	
	public function headings(): array
    {	
      if($this->status == '待取样'){
        return [
            //'条目ID(禁止编辑此列)',
            '申请单号(禁止编辑此列)',
            '样本名称(可修改)',
            '取样日期',//sample_date
            //'sample_shipping_date',
            //'样本类型',//sample_type
            '样本量(0.1-99ml)',//sample_quantity
            //'样本量单位()',//sample_unit
            //'recipients_user',
            '收样日期',//received_date
            '采血管类型',//bct_type(Streck管,EDTA抗凝管（采血之后，4小时内必须分离血浆)）
            '样本状态',//received_status
            '异常描述(可不填)',//abnormal
            '样本所属实验室负责人',//lab_admin
            '物流方式',//logistics_type
            '物流公司',//logistics_company
            '物流单号',//logistics_number
            //'created_at',
            //'updated_at'
        ];
      }else{
        return [
            //'条目ID(禁止编辑此列)',
            '申请单号(禁止编辑此列)',
            '样本名称(可修改)',
            '取样日期',//sample_date
            //'sample_shipping_date',
            //'样本类型',//sample_type
            '样本量(0.1-99ml)',//sample_quantity
            //'样本量单位()',//sample_unit
            //'recipients_user',
            '收样日期',//received_date
            '采血管类型',//bct_type(Streck管,EDTA抗凝管（采血之后，4小时内必须分离血浆)）
            '样本状态',//received_status
            '异常描述(可不填)',//abnormal
            '样本所属实验室负责人',//lab_admin
            '物流方式',//logistics_type
            '物流公司',//logistics_company
            '物流单号',//logistics_number
            //'created_at',
            //'updated_at'
            '审核结果',//sample_status
        ];
      }
    }
     public function registerEvents(): array
       {
           return [
               AfterSheet::class => function(AfterSheet $event) {

               		// 设置单元格内容居中
                   $event->sheet->getDelegate()->getStyle('A1:L1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);                  
                   $event->sheet->getDelegate()->getStyle('A1:L1')->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);

                   $event->sheet->getDelegate()->getStyle('A1:L1')->getFont()->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('00FFFFFF',false,false));
                    $event->sheet->getDelegate()->getStyle('A1:L1')->getFont()->setSize(12);

                    $event->sheet->getDelegate()->getStyle('A1:L1')->getFont()->setName('新宋体');

                   //var_dump($event->sheet->getDelegate()->getStyles());
                   $event->sheet->getStyle('A1:L1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                   ->getStartColor()->setRGB('1da5a3');//getTabColor
               		
                   // 定义列宽度
                   $widths = ['A' => 25, 'B' => 25, 'C' => 25,'D' => 25,'E' => 25,'F' => 35,'G' => 25,'H' => 25,'I' => 25,'J' => 25,'K' => 25,'L'=>25];
                   foreach ($widths as $k => $v) {
                   	// 设置列宽度
                      $event->sheet->getDelegate()->getColumnDimension($k)->setWidth($v);
                                       
                   }

               },

               BeforeWriting::class => function(BeforeWriting $event){
                $event->writer->getActiveSheet()->getRowDimension('1')->setRowHeight(50);
                if($this->status == '待取样'){
                  $event->writer->getActiveSheet()->getStyle('C1')->getAlignment()->setWrapText(true);
                  $event->writer->getActiveSheet()->getStyle('E1')->getAlignment()->setWrapText(true);
                  $event->writer->getActiveSheet()->getCell('C1')->setValue("取样日期\n(格式:2018/12/6)");
                  $event->writer->getActiveSheet()->getCell('E1')->setValue("收样日期\n(格式:2018/12/7)");
                }
                $event->writer->getActiveSheet()->getStyle('A1')->getAlignment()->setWrapText(true);
                $event->writer->getActiveSheet()->getStyle('B1')->getAlignment()->setWrapText(true);
                $event->writer->getActiveSheet()->getStyle('D1')->getAlignment()->setWrapText(true);

                $event->writer->getActiveSheet()->getCell('A1')->setValue("申请单号\n(禁止编辑此列)");
                $event->writer->getActiveSheet()->getCell('B1')->setValue("样本名称\n(可修改)");
                $event->writer->getActiveSheet()->getCell('D1')->setValue("样本量\n(0.1-99ml)");                

                $event->writer->getActiveSheet()->getProtection()->setSheet(true);
                $event->writer->getActiveSheet()->getProtection()->setPassword(time().rand(100,999).'Ace');

                $widths = ['A' => 25, 'B' => 25, 'C' => 25,'D' => 25,'E' => 25,'F' => 35,'G' => 25,'H' => 25,'I' => 25,'J' => 25,'K' => 25,'L'=>25];
                $begin_row = '2';
                $over_row = (string)($this->count+1);

                foreach ($widths as $k => $v) {
                      if($k !== 'A'){                       
                        $field_protect = $k.$begin_row.':'.($k.$over_row);
                        /*var_dump($field_protect);*/
                        $event->writer->getActiveSheet()->getStyle($field_protect)//"'".$field_protect."'" //"'".$k.(int)$begin_row."'"
                          ->getProtection()
                          ->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);
                      }               
                }
                $over_row2 = (string)($this->count+2);
                $event->writer->getActiveSheet()->freezePane('A2');
                 

               		$validation = $event->writer->getDelegate()->getActiveSheet()->getCell('F2')
							    ->getDataValidation();
					$validation->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_LIST );
							$validation->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_INFORMATION );
							$validation->setAllowBlank(false);
							$validation->setShowInputMessage(true);
							$validation->setShowErrorMessage(true);
							$validation->setShowDropDown(true);
							$validation->setErrorTitle('输入不满足要求');
							$validation->setError('数据不在列表中');
							$validation->setPromptTitle('请选择采血管类型');
							$validation->setPrompt('请从下拉列表选择');
							$validation->setFormula1('"Streck管,EDTA抗凝管（采血之后，4小时内必须分离血浆)"');

					$validation2 = $event->writer->getDelegate()->getActiveSheet()->getCell('G2')
							    ->getDataValidation();
					$validation2->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_LIST );
							$validation2->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_INFORMATION );
							$validation2->setAllowBlank(false);
							$validation2->setShowInputMessage(true);
							$validation2->setShowErrorMessage(true);
							$validation2->setShowDropDown(true);
							$validation2->setErrorTitle('输入不满足要求');
							$validation2->setError('数据不在列表中');
							$validation2->setPromptTitle('请选择样本状态');
							$validation2->setPrompt('请从下拉列表选择');
							$validation2->setFormula1('"合格,不合格"');

					$validation3 = $event->writer->getDelegate()->getActiveSheet()->getCell('J2')
							    ->getDataValidation();
					$validation3->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_LIST );
							$validation3->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_INFORMATION );
							$validation3->setAllowBlank(false);
							$validation3->setShowInputMessage(true);
							$validation3->setShowErrorMessage(true);
							$validation3->setShowDropDown(true);
							$validation3->setErrorTitle('输入不满足要求');
							$validation3->setError('数据不在列表中');
							$validation3->setPromptTitle('请选择快递方式');
							$validation3->setPrompt('请从下拉列表选择');
							$validation3->setFormula1('"自取,闪送,快递"');

          $validation4 = $event->writer->getDelegate()->getActiveSheet()->getCell('D2')
                  ->getDataValidation();
          $validation4->setType( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::TYPE_DECIMAL );
              $validation4->setErrorStyle( \PhpOffice\PhpSpreadsheet\Cell\DataValidation::STYLE_STOP );
              $validation4->setAllowBlank(true);
              $validation4->setShowInputMessage(true);
              $validation4->setShowErrorMessage(true);
              $validation4->setErrorTitle('输入不满足要求');
              $validation4->setError('数据不在范围内');
              $validation4->setPromptTitle('请输入样本量(不要输入单位)');
              $validation4->setPrompt('请输入范围内数字');
              $validation4->setFormula1(0.1);
              $validation4->setFormula2(99);

					for($i=3;$i <= ($this->count+1);$i++) {
						# code...
						$event->writer->getDelegate()->getActiveSheet()->getCell('F'.$i)->setDataValidation(clone $validation);
						$event->writer->getDelegate()->getActiveSheet()->getCell('G'.$i)->setDataValidation(clone $validation2);
						$event->writer->getDelegate()->getActiveSheet()->getCell('J'.$i)->setDataValidation(clone $validation3);
            $event->writer->getDelegate()->getActiveSheet()->getCell('D'.$i)->setDataValidation(clone $validation4);
					}
            /*$i = '3';
            $imax = (string)($this->count+1);
            $event->writer->getDelegate()->getActiveSheet()->getCell('F'.$i.':'.'F'.$imax)->setDataValidation(clone $validation);
            /*$event->writer->getDelegate()->getActiveSheet()->getCell('G'.$i)->setDataValidation(clone $validation2);
            $event->writer->getDelegate()->getActiveSheet()->getCell('J'.$i)->setDataValidation(clone $validation3);
            $event->writer->getDelegate()->getActiveSheet()->getCell('D'.$i)->setDataValidation(clone $validation3);*/

               },
                   
           ];
      }


    

     public function columnFormats(): array
    {	
    	if($this->status == '待取样'){
	    	$data_format = NumberFormat::FORMAT_DATE_YYYYMMDD2;
	    }else{
	    	$data_format = NumberFormat::FORMAT_TEXT;
	    }
        return [
        	'A' => NumberFormat::FORMAT_TEXT,
            'B' => NumberFormat::FORMAT_TEXT,
            'C' => $data_format,
            'E' => $data_format,
        ];
    }

	 public function __construct(string $status)
    {
        $this->status = $status;
        $this->count = DB::table('sample')->where('sample_status',$this->status)->count();
    }



    public function query()
    {	
    	if($this->status == '待取样'){
    		return DB::table('sample')->select('order_id',DB::raw('CONCAT("ACE-PL",SUBSTRING(order_id,5)) as sample_name'),'sample_date','sample_quantity','received_date','bct_type',DB::raw('"" as received_status'),'abnormal','lab_admin','logistics_type','logistics_company','logistics_number')
    		->where('sample_status',$this->status)->orderBy('updated_at');
    	}else{
    		return DB::table('sample')->select('order_id',DB::raw('CONCAT("ACE-PL",SUBSTRING(order_id,5)) as sample_name'),'sample_date','sample_quantity','received_date','bct_type','received_status','abnormal','lab_admin','logistics_type','logistics_company','logistics_number','sample_status')//合格 不合格 增加审核结果字段
    		->where('sample_status',$this->status)->orderBy('updated_at');
    	}
    	

        //return Sample::query()->where('sample_status',$this->status);
    }
}