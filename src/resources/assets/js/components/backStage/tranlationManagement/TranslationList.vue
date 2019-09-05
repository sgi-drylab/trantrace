<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-if="$route.path==='/translation'">Translation</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path==='/retranslation'">Retranslation</el-breadcrumb-item>
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
          <el-form-item label="Deadline:">
            <el-date-picker v-model="searchForm_raw.deadline" type="date" :default-value="new Date()" value-format="yyyy-MM-dd" placeholder="select deadline"></el-date-picker>
          </el-form-item>
          <el-form-item label="Priority:">
            <el-select v-model="searchForm_raw.priority" clearable placeholder="select priority">
              <el-option label="High" value="3"></el-option>
              <el-option label="Normal" value="2"></el-option>
              <el-option label="Low" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
         <!-- <el-form-item label="Status:">
            <el-select v-model="searchForm_raw.status" clearable placeholder="select status">
              <el-option label="Untranslated" value="Untranslated"></el-option>
              <el-option label="Unreviewed" value="Unreviewed"></el-option>
            </el-select>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>-->
        </el-form>
      </div>
    </div>
    <div class="showTransList">
      <el-table ref="translationTable" :data="TransListTable" v-loading="loading" style="width: 100%" @row-dblclick="rowDblClick" @sort-change="sortChange" :row-class-name="deadlineHighlight">
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
        <el-table-column prop="deadline" label="Deadline" align="center" sortable="custom">
          <template slot-scope="scope">
            <div>{{scope.row.deadline&&(scope.row.deadline.split(" ")[1])?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="Priority" align="center" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.priority=='1'">Low</div>
            <div v-if="scope.row.priority=='2'">Normal</div>
            <div v-if="scope.row.priority=='3'" style="color:red">High</div>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="Translate" @click="transItem(scope.row,'/ontrans')" v-if="scope.row.status === 'Untranslated'">Translate</el-button>
          <el-button type="text" size="medium" title="Retranslate" @click="transItem(scope.row,'/retrans')" v-if="scope.row.status === 'Unretranslated'">Retranslate</el-button>
          <el-button type="text" size="medium" title="View" @click="transItem(scope.row,'/viewqualified')" v-if="scope.row.status === 'Qualified'">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.searchForm.product_name = this.$route.query.name||''
    // this.onSearch()

    // this.$router.push(this.$route.path+'?page=1&count=10')


    // !this.$route.query.name&&!this.$route.query.key&&!this.$route.query.priority&&!this.$route.query.deadline?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/translate/translate_list",qs.stringify({product_name:this.$route.query.name,key:this.$route.query.key,priority:this.$route.query.priority,deadline:this.$route.query.deadline,status:this.status,page:this.$route.query.page,count:this.$route.query.count})).then(response=>{
        // console.log(response.data);
        this.TransListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
  },
  data() {
    return {
      searchForm_raw: {
        product_name:this.$route.query.name||'',
        key: this.$route.query.key||'',
        priority:this.$route.query.priority||'',
        deadline:this.$route.query.deadline||''
      },
      searchForm: {
        product_name:this.$route.query.name||'',
        key: this.$route.query.key||'',
        priority:this.$route.query.priority||'',
        deadline:this.$route.query.deadline||''
      },
      loading:false,
      // searchFlag:false,
      sort:[],
      rules: {},
      TransListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page)||1,
      pageSize: Number(this.$route.query.count)||10
    }
  },
  computed:{
    status(){
      if(this.$route.path==='/translation'){
        return 'Untranslated'
      }else if(this.$route.path==='/retranslation'){
        return 'Unretranslated'
      }else{
        return null
      }
    }
  },
  watch:{
    '$route.path':{
      handler(val,oldVal){
        // console.log(this.status)
        if(val!==oldVal){
          // console.log(val,oldVal)
          this.searchForm_raw.product_name=""
          this.searchForm_raw.key=""
          this.searchForm_raw.priority=""
          this.searchForm_raw.deadline=""

          this.searchForm.product_name=""
          this.searchForm.key=""
          this.searchForm.priority=""
          this.searchForm.deadline=""
          // this.currentPage = 1
          this.pageSize = 10
          // this.searchFlag=false

          this.$refs.translationTable.clearSort()
          this.sort = []

          this.$http.post("/api/translate/translate_list",qs.stringify({status:this.status})).then(response=>{
          // console.log(response.data);
            this.TransListTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        }
        
      },
      deep:true
    }
  },
  methods: {
    deadlineHighlight({row, rowIndex}) {
      // console.log(row)
      if (new Date().valueOf() > new Date(row.deadline.replace(/-/g,'/')).valueOf()) {
        return 'deadlineOverdueHighlight';
      }
      return '';
    },
    onSearch() {
      this.$refs.translationTable.clearSort()
      this.sort = []

      this.currentPage = 1
      let obj = {}
      this.searchForm_raw.product_name?obj.name = this.searchForm_raw.product_name:null
      this.searchForm_raw.key?obj.key = this.searchForm_raw.key:null
      this.searchForm_raw.priority?obj.priority = this.searchForm_raw.priority:null
      this.searchForm_raw.deadline?obj.deadline = this.searchForm_raw.deadline:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:this.$route.path,query:obj})

      this.searchForm.product_name = this.searchForm_raw.product_name
      this.searchForm.key = this.searchForm_raw.key
      this.searchForm.priority = this.searchForm_raw.priority
      this.searchForm.deadline = this.searchForm_raw.deadline

      // this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/translate/translate_list",qs.stringify({product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:this.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.TransListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    },
    sortChange(event){
      let order=""
      event.order==="ascending"?order='ASC':null
      event.order==="descending"?order='DESC':null
      this.sort[0] = event.prop
      this.sort[1] = order
      this.currentPage = 1

      this.$http.post("/api/translate/translate_list",qs.stringify(event.prop?{product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:this.status,page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:this.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.TransListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    },
    rowDblClick(row, column, event){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      let path = ''
      switch(this.status){
        case 'Untranslated':
          path='/ontrans'
        break;
        case 'Unretranslated':
          path='/retrans'
        break;
      }
      let obj = {
        id:row.id
      }
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.priority?obj.priority = this.searchForm.priority:null
      this.searchForm.deadline?obj.deadline = this.searchForm.deadline:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:path,query:obj})
    },
    transItem(row,path) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      let obj = {
        id:row.id
      }
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.priority?obj.priority = this.searchForm.priority:null
      this.searchForm.deadline?obj.deadline = this.searchForm.deadline:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:path,query:obj})
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let obj = {}
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.priority?obj.priority = this.searchForm.priority:null
      this.searchForm.deadline?obj.deadline = this.searchForm.deadline:null
      this.pageSize?obj.count = this.pageSize:null
      val?obj.page = val:null
      this.$router.push({path:this.$route.path,query:obj})
      // if(this.searchFlag){
        this.$http.post("/api/translate/translate_list",qs.stringify(this.sort[0]?{product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:this.status,page:val,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,key:this.searchForm.key,priority:this.searchForm.priority,deadline:this.searchForm.deadline,status:this.status,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.TransListTable = response.data.result.data;
          this.total = response.data.result.total;
        })
      // }else{
      //   this.$http.post("/api/translate/translate_list",qs.stringify(this.sort[0]?{status:this.status,page:val,count:this.pageSize,sort:this.sort}:{status:this.status,page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.TransListTable = response.data.result.data;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
