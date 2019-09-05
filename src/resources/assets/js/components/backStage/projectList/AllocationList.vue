<template>
  <div id="missionListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Assignment</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm_raw" ref="searchForm_raw" :rules="rules" label-position="left" label-width="120px" class="demo-form-inline" size="small">
          <el-form-item label="Project Name:">
            <el-input v-model="searchForm_raw.product_name" placeholder="enter project name"></el-input>
          </el-form-item>
          <el-form-item label="Keyword:">
            <el-input v-model="searchForm_raw.key" placeholder="enter keyword"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
            <el-select v-model="searchForm_raw.status" clearable placeholder="please select status">        
              <el-option label="All" value=""></el-option>
              <el-option label="Unassigned" value="Unassigned"></el-option>
              <el-option label="Untranslated" value="Untranslated"></el-option>
              <el-option label="Unretranslated" value="Unretranslated"></el-option>
              <el-option label="Unreviewed" value="Unreviewed"></el-option>
              <el-option label="Qualified" value="Qualified"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showTransList">
     <el-table ref="allocationTable" :data="allocationListTable" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange" :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="35" align="center" :selectable='checkboxT'>
        </el-table-column>
        <el-table-column label="Source" align="center" type="expand" width="75">
          <template slot-scope="scope">
            <ol style="padding-left: 20px;">
              <li v-for="(item,index) in JSON.parse(scope.row.translate)" :key="index" style="margin:10px 0;padding:5px 0;border-bottom:1px dashed #ccc;">{{item}}</li>
            </ol>
          </template>
        </el-table-column>
        <el-table-column prop="product" label="Project Name" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="key" label="Keyword" align="center" sortable="custom" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center" sortable="custom">
          <template slot-scope="scope">
            <div>{{scope.row.status}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Translator" align="center" key="UnassignedKey" v-if="(searchForm.status==='Unassigned')||(searchForm.status==='')">
          <template slot-scope="scope" v-if="scope.row.status==='Unassigned'">
            <el-select v-model="scope.row.translate_users_name" :id="'selectTranslator'+scope.row.id" placeholder="required" @visible-change="visibleSelect(scope.row)">
              <el-option v-for="(item,index) in scope.row.translators" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center" v-if="(searchForm.status==='Unassigned')||(searchForm.status==='')">
          <template slot-scope="scope">
            <el-button type="text" size="medium" title="Assign" @click="submit(scope.row)" v-if="scope.row.status==='Unassigned'">Assign</el-button>
            <!--<el-button type="text" size="medium" title="remove" @click="deleteCurrent(scope.row)" icon="el-icon-delete">Delete</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div id="batchSelected">
        {{multipleSelection.length}} {{multipleSelection.length>1?'entries':'entry'}} selected
        <el-button type="text" style="color:rgb(255, 208, 75);" @click="batchSubmitOpen">Bulk Allocation</el-button>
      </div>
      <el-pagination background  @current-change="handleCurrentChange" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <el-dialog
      title="Assignment"
      :visible.sync="dialogVisible"
      width="40%" top="40vh">
        <div class="dialog_warning_text">
          <i class="el-message__icon el-icon-warning"></i>
          <span>Batch assign these selected entries to translator.</span>
        </div>
        <el-form :model="batchTranslatorForm" :rules="rules" ref="batchTranslatorForm" class="demo-ruleForm" @submit.native.prevent>
          <el-form-item prop="batch_translator_name" label="Please select a translator:">
            <el-select v-model="batchTranslatorForm.batch_translator_name" placeholder="" style="width:100%;">
              <el-option v-for="(item,index) in translators" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <div id="batchModal">
          <div>Please select a translator:</div>
          <el-select v-model="batch_translator_name" placeholder="select translator">
            <el-option v-for="(item,index) in translators" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="batchSubmit">Yes</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$router.push(this.$route.path+'?page=1&count=10')
    this.searchForm.product_name = this.$route.query.name||''

    new Promise((resolve,reject)=>{
      this.$http.post("/api/user/list").then(response=>{
        // console.log(response.data);
        this.userList=response.data.data;
        resolve()
      })
    }).then(()=>{
      // this.onSearch()
      this.$http.post("/api/translate/list",qs.stringify({product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
          this.$set(item,'translators',[])
        })
        if(response.data.data.length>0){
          response.data.data.forEach(item=>{
            JSON.parse(item.translate_users).forEach(item1=>{
              this.userList.forEach(item2=>{
                if(item1===item2.id){
                  item.translators.push(item2)
                  return false;
                }
              })
            })
          })
          
        }
        this.allocationListTable = response.data.data;
        this.total = response.data.total;
      })
    })
    
  },
  data() {
    return {
      product_id:this.$route.query.id||null,
      loading:false, 
      searchForm_raw: {
        product_name:this.$route.query.name||'',
        key: this.$route.query.key||'',
        status:this.$route.query.status||'Unassigned',
      },
      searchForm: {
       product_name:this.$route.query.name||'',
        key: this.$route.query.key||'',
        status:this.$route.query.status||'Unassigned',
      },
      // searchFlag:false,
      sort:[],
      userList:[],
      rules: {},
      translators:[],
      allocationListTable: [],
      total:0,
      multipleSelection: [],
      currentPage: Number(this.$route.query.page)||1,
      pageSize: Number(this.$route.query.count)||10,
      selectRowIndex:[],
      dialogVisible: false,
      batchTranslatorForm:{
        batch_translator_name:''
      },
      rules:{
        batch_translator_name: [
          {
            required: true,
            message: 'Please select a translator.'
          }
        ],
      }
    }
  },
  watch:{
    'multipleSelection':{
      handler(val){
        this.selectRowIndex=[]
        if(val.length>0){
          val.forEach((item,index)=>{
            // console.log(this.allocationListTable.indexOf(item))
            this.selectRowIndex.push(this.allocationListTable.indexOf(item))
            this.tableRowClassName({item})
          })
        }
      },
      deep:true
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      // console.log(this.selectRowIndex)
      if(this.selectRowIndex.includes(rowIndex)){
        // console.log(222)
        return 'success-row'
      }
    },
    onSearch() {
      this.$refs.allocationTable.clearSort()
      this.sort = []

      this.currentPage = 1
      this.product_id = null


      this.searchForm.product_name = this.searchForm_raw.product_name
      this.searchForm.key = this.searchForm_raw.key
      this.searchForm.status = this.searchForm_raw.status


      // this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.status===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/translate/list",qs.stringify({product_id:'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
          this.$set(item,'translators',[])
        })
        if(response.data.data.length>0){
          response.data.data.forEach(item=>{
            JSON.parse(item.translate_users).forEach(item1=>{
              this.userList.forEach(item2=>{
                if(item1===item2.id){
                  item.translators.push(item2)
                  return false;
                }
              })
            })
          })
          
        }
        this.allocationListTable = response.data.data;
        this.total = response.data.total;
      })
    },
    sortChange(event){
     let order=""
      event.order==="ascending"?order='ASC':null
      event.order==="descending"?order='DESC':null
      this.sort[0] = event.prop
      this.sort[1] = order
      this.currentPage = 1

      this.$http.post("/api/translate/list",qs.stringify(event.prop?{product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'translate_users_name',"")
          this.$set(item,'translators',[])
        })
        if(response.data.data.length>0){
          response.data.data.forEach(item=>{
            JSON.parse(item.translate_users).forEach(item1=>{
              this.userList.forEach(item2=>{
                if(item1===item2.id){
                  item.translators.push(item2)
                  return false;
                }
              })
            })
          })
          
        }
        this.allocationListTable = response.data.data;
        this.total = response.data.total;
      })
    },
    visibleSelect(row){
      document.getElementById("selectTranslator"+row.id).style.border = "1px solid #DCDFE6";
    },
    submit(row) {
      // console.log(row)
      if (row.translate_users_name) {
        document.getElementById("selectTranslator"+row.id).style.border = "1px solid #DCDFE6";
        let submitObj = {};
        submitObj.translate_in_id = JSON.stringify([row.id]);
        submitObj.translate_users_name = row.translate_users_name;
        // console.log(submitObj);
        this.$http
          .post(
            '/api/translate/assign',
            qs.stringify(submitObj)
          )
          .then(response => {
            setTimeout(()=>{
              this.$store.state.taskList.Unassigned_nums -= 1
              this.handleCurrentChange(this.currentPage);
              // console.log(this.searchForm.status)
            },1000)
          })
      } else {
        document.getElementById("selectTranslator"+row.id).style.border = "1px solid #E6A23C";
        this.$message({
          message: 'Translator is required.',
          type: 'warning'
        })
      }
    },
    batchSubmitOpen(){
      if(this.multipleSelection.length===0){
        this.$message({
          message: 'No entries are selected for bulk allocation.',
          type: 'warning'
        })
        return false;
      }
      // Determine if it is the same project
      let flag = false
      let projectName = this.multipleSelection[0].product
      this.multipleSelection.forEach(item=>{
        if(item.product!==projectName){
          flag=true
          this.$message({
            message: 'Batch allocation only works for entries from same project.',
            type: 'warning'
          })
          return false
        }
      })
      if(!flag){
        this.translators = this.multipleSelection[0].translators
        this.dialogVisible = true;
      }
    },
    batchSubmit(){
      this.$refs.batchTranslatorForm.validate((valid) => {
        if (valid) {
          let IDS = [];
          $.each(this.multipleSelection, function(i, ele) {
            IDS.push(ele.id)
          })
          let submitObj = {};
          submitObj.translate_in_id = JSON.stringify(IDS);
          submitObj.translate_users_name = this.batchTranslatorForm.batch_translator_name;
          // console.log(submitObj);
          this.$http
            .post(
              '/api/translate/assign',
              qs.stringify(submitObj)
            )
            .then(response => {
              setTimeout(()=>{
                this.$store.state.taskList.Unassigned_nums -= IDS.length
                this.batchTranslatorForm.batch_translator_name = '';
                this.dialogVisible = false;
                this.handleCurrentChange(this.currentPage);
              },1000)
            })
        }
      })
    },
    checkboxT(row,index){
      // console.log(row)
        if (row.status === "Unassigned") {
          return true
        }else{
          return false
        }
      },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // console.log(this.currentPage)
      this.currentPage = val

      // if(this.searchFlag){
        this.$http.post("/api/translate/list",qs.stringify(this.sort[0]?{product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_id:this.$route.query.id||'',product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          response.data.data.forEach(item=>{
            this.$set(item,'translate_users_name',"")
            this.$set(item,'translators',[])
          })
          if(response.data.data.length>0){
            response.data.data.forEach(item=>{
              JSON.parse(item.translate_users).forEach(item1=>{
                this.userList.forEach(item2=>{
                  if(item1===item2.id){
                    item.translators.push(item2)
                    return false;
                  }
                })
              })
            })
            
          }
          this.allocationListTable = response.data.data;
          this.total = response.data.total;
        }).catch((err)=>{
          throw err;
        })
      // }else{
      //   this.$http.post("/api/translate/list",qs.stringify(this.sort[0]?{product_id:this.product_id||'',status:'Unassigned',page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_id:this.product_id||'',status:'Unassigned',page:this.currentPage,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     response.data.data.forEach(item=>{
      //       this.$set(item,'translate_users_name',"")
      //       this.$set(item,'translators',[])
      //     })
      //     if(response.data.data.length>0){
      //       response.data.data.forEach(item=>{
      //         JSON.parse(item.translate_users).forEach(item1=>{
      //           this.userList.forEach(item2=>{
      //             if(item1===item2.id){
      //               item.translators.push(item2)
      //               return false;
      //             }
      //           })
      //         })
      //       })
            
      //     }
      //     this.allocationListTable = response.data.data;
      //     this.total = response.data.total;
      //   })
      // }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
