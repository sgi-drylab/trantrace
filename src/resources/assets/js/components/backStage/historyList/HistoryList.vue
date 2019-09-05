<template>
  <div id="historyListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-if="$route.path !== '/v_history'">History</el-breadcrumb-item>
      <el-breadcrumb-item v-else>Issues</el-breadcrumb-item>
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
          <el-form-item key="ta_statusSearch" label="Status:">
            <el-select v-model="searchForm_raw.status" clearable placeholder="select status">
              <el-option label="All" value=""></el-option>
              <el-option label="Unreviewed" value="Unreviewed" v-if="$route.path === '/t_history'"></el-option>
              <el-option label="Passed" value="Qualified" v-if="$route.path === '/t_history'"></el-option>
              <el-option label="Failed" value="Unretranslated" v-if="$route.path === '/t_history'"></el-option>
              <el-option label="Passed" value="Qualified" v-if="$route.path === '/a_history'"></el-option>
              <el-option label="Failed" value="Unretranslated" v-if="$route.path === '/a_history'"></el-option>
              <el-option label="Error" value="Error" v-if="($route.path === '/t_history')||($route.path === '/a_history')"></el-option>
              <el-option label="Unresolved" value="0" v-if="$route.path === '/v_history'"></el-option>
              <el-option label="Agreed" value="1" v-if="$route.path === '/v_history'"></el-option>
              <el-option label="Ignored" value="2" v-if="$route.path === '/v_history'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showHistoryList">
      <el-table ref="historyListTable" :data="historyListTable" v-loading="loading" style="width: 100%" @row-dblclick="rowDblClick" @sort-change="sortChange">
        <el-table-column key="o_historySource" label="Issues" align="center" type="expand" width="100" v-if="$route.path === '/v_history'">
          <template slot-scope="scope">
            <div>{{scope.row.objection}}</div>
          </template>
        </el-table-column>
        <el-table-column key="ta_histiorySource" label="Source" align="center" type="expand" width="75" v-if="$route.path === '/t_history'||$route.path === '/a_history'">
          <template slot-scope="scope">
            <ol style="padding-left: 20px;">
              <li v-for="(item,index) in JSON.parse(scope.row.translate)" :key="index" style="margin:10px 0;padding:5px 0;border-bottom:1px dashed #ccc;">{{Object.keys(item)[0]}}</li>
            </ol>
          </template>
        </el-table-column>
        <el-table-column prop="product" label="Project Name" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="key" label="Keyword" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{Object.keys(JSON.parse(scope.row.key)[0])[0]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" key="ta_historyStatus" label="Status" align="center" v-if="$route.path === '/t_history'||$route.path === '/a_history'" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.status==='Qualified'">Passed</div>
            <div v-else-if="scope.row.status==='Unretranslated'">Failed</div>
            <div v-else>{{scope.row.status}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Status" key="v_historyStatus" align="center" v-if="$route.path === '/v_history'" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.approved===2">Ignored</div>
            <div v-else-if="scope.row.approved===1">Agreed</div>
            <div v-else-if="scope.row.approved===0" style="color:#E6A23C">Unresolved</div>
          </template>
        </el-table-column>
        <el-table-column key="t_historyCreate_at" prop="created_at" label="Translation Time" align="center" v-if="$route.path === '/t_history'" sortable="custom">
          <template slot-scope="scope">
            <div :title="scope.row.created_at">{{scope.row.created_at}}</div>
          </template>
        </el-table-column>
        <el-table-column key="a_historyUpdated_at" prop="updated_at" label="Review Time" align="center" v-if="$route.path === '/a_history'" sortable="custom">
          <template slot-scope="scope">
            <div :title="scope.row.updated_at">{{scope.row.updated_at}}</div>
          </template>
        </el-table-column>
        <el-table-column key="v_historyAdvice_created_at" prop="advice_created_at" label="Creation Time" align="center" v-if="$route.path === '/v_history'" sortable="custom">
          <template slot-scope="scope">
            <div :title="scope.row.created_at">{{scope.row.advice_created_at}}</div>
          </template>
        </el-table-column>
        <el-table-column key="v_historyAdvice_updated_at" prop="advice_updated_at" label="Reply Time" align="center" v-if="$route.path === '/v_history'" sortable="custom">
          <template slot-scope="scope">
            <div :title="scope.row.approved!==0?scope.row.advice_updated_at:''" v-if="scope.row.approved!==0">{{scope.row.advice_updated_at}}</div>
          </template>
        </el-table-column>
        <el-table-column key="ta_historyTranslation" label="Translation" align="center" v-if="$route.path !== '/v_history'">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="View" @click="transItem(scope.row)">View</el-button>
          </template>
        </el-table-column>
        <el-table-column key="v_historyOperation" label="Operation" align="center" v-if="$route.path === '/v_history'">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="View" @click="transItem(scope.row)">{{(scope.row.approved===0)&&(scope.row.users_name===userName)?'Resolve':'View'}}</el-button>
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
    // console.log(this.$route.path);
    this.$route.path === '/t_history'?this.url = '/api/translate/history':null
    this.$route.path === '/a_history'?this.url = '/api/approve/list':null
    this.$route.path === '/v_history'?this.url = '/api/view/list_conflict_all':null

    // this.$router.push(this.$route.path+'?page=1&count=10')
    // this.onSearch()
    // !this.$route.query.name&&!this.$route.query.key&&!this.$route.query.status?this.searchFlag = false:this.searchFlag = true
    this.$http.post(this.url,qs.stringify({product_name:this.$route.query.name,key:this.$route.query.key,status:this.$route.query.status,page:this.$route.query.page,count:this.$route.query.count})).then(response=>{
        // console.log(response.data);
        this.historyListTable = response.data.data;
        this.total = response.data.total;
      })
  },
  data() {
    return {
      url:'',
      userName:Base64.decode(this.$cookies.get('tname')),
      searchForm_raw: {
        product_name:this.$route.query.name||'',
        key: this.$route.query.key||'',
        status: this.$route.query.status||''
      },
      searchForm: {
        product_name:this.$route.query.name||'',
        key: this.$route.query.key||'',
        status: this.$route.query.status||''
      },
      listUrl:'',
      loading:false,
      // searchFlag:false,
      sort:[],
      rules: {},
      historyListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page)||1,
      pageSize: Number(this.$route.query.count)||10
    }
  },
  watch:{
    '$route.path':{
      handler(val,oldVal){
        if(val!==oldVal){
          // console.log(val,oldVal)
          this.searchForm_raw.product_name=""
          this.searchForm_raw.key=""
          this.searchForm_raw.status=""

          this.searchForm.product_name=""
          this.searchForm.key=""
          this.searchForm.status=""

          // this.currentPage = 1
          this.pageSize = 10
          val === '/t_history'?this.url = '/api/translate/history':null
          val === '/a_history'?this.url = '/api/approve/list':null
          val === '/v_history'?this.url = '/api/view/list_conflict_all':null
          this.onSearch()
        }
        
        // this.loading = true
        // this.$http.post(this.url).then(response=>{
        //   // console.log(response.data);
        //   this.historyListTable = response.data.data;
        //   this.total = response.data.total;
        //   this.loading = false
        // })
      },
      deep:true
    }
  },
  methods: {
    onSearch() {
      this.$refs.historyListTable.clearSort()
      this.sort = []
      
      this.currentPage = 1
      let obj = {}
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.status?obj.status = this.searchForm.status:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:this.$route.path,query:obj})

      this.searchForm.product_name = this.searchForm_raw.product_name
      this.searchForm.key = this.searchForm_raw.key
      this.searchForm.status = this.searchForm_raw.status

      // this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.status===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post(this.url,qs.stringify({product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.historyListTable = response.data.data;
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

      this.$http.post(this.url,qs.stringify(event.prop?{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.historyListTable = response.data.data;
        this.total = response.data.total;
      })
    },
    rowDblClick(row, column, event){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.transItem(row)
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      let path = ''
      this.$route.path === '/t_history'?path = '/t_browhistoryitem':null
      this.$route.path === '/a_history'?path = '/a_browhistoryitem':null
      this.$route.path === '/v_history'?path = '/v_browhistoryitem':null

      let obj = {
        id:row.id
      }
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.status?obj.status = this.searchForm.status:null
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
      this.searchForm.status?obj.status = this.searchForm.status:null
      this.pageSize?obj.count = this.pageSize:null
      val?obj.page = val:null
      this.$router.push({path:this.$route.path,query:obj})
      
      // if(this.searchFlag){
        this.$http.post(this.url,qs.stringify(this.sort[0]?{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:val,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,key:this.searchForm.key,status:this.searchForm.status,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.historyListTable = response.data.data;
          this.total = response.data.total;
        })
      // }else{
      //   this.$http.post(this.url,qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.historyListTable = response.data.data;
      //     this.total = response.data.total;
      //   })
      // }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
