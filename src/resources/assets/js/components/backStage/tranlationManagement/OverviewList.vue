<template>
  <div id="overviewListMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Overview</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm_raw" ref="searchForm_raw" :rules="rules" label-position="left" label-width="120px" class="demo-form-inline" size="small" @submit.native.prevent>
          <el-form-item label="Project Name:" prop="product_name">
            <el-input v-model="searchForm_raw.product_name" placeholder="enter project name"></el-input>
          </el-form-item>
          <el-form-item label="Deadline:" prop="deadline">
            <el-date-picker v-model="searchForm_raw.deadline" type="date" :default-value="new Date()" value-format="yyyy-MM-dd" placeholder="select deadline"></el-date-picker>
          </el-form-item>
          <el-form-item label="Priority:" prop="priority">
            <el-select v-model="searchForm_raw.priority" placeholder="select priority">
              <el-option label="High" value="3"></el-option>
              <el-option label="Normal" value="2"></el-option>
              <el-option label="Low" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="overviewTable" :data="overviewListTable" v-loading="loading" style="width: 100%" @sort-change="sortChange" :row-class-name="deadlineHighlight">
        <el-table-column prop="product" label="Project Name" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center" sortable="custom">
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
        <el-table-column key="t_overview" prop="not_finished" label="Not Finished" align="center" v-if="$route.path==='/t_overview'" sortable="custom">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/translation?name='+scope.row.product+'&page=1')">Translation: {{scope.row.Untranslated}}</div>
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/retranslation?name='+scope.row.product+'&page=1')">Retranslation: {{scope.row['Unretranslated']}}</div>
          </template>
        </el-table-column>
        <el-table-column key="a_overview" prop="not_finished" label="Not Finished" align="center" v-if="$route.path==='/a_overview'" sortable="custom">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/review?name='+scope.row.product+'&page=1')">Review: {{scope.row.Unreviewed}}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // this.$router.push(this.$route.path+'?page=1&count=10')
    this.onSearch()
  },
  data() {
    return {
      searchForm_raw: {
        product_name: this.$route.query.name||'',
        priority: this.$route.query.priority||'',
        deadline: this.$route.query.deadline||'',
      },
      searchForm: {
        product_name: this.$route.query.name||'',
        priority: this.$route.query.priority||'',
        deadline: this.$route.query.deadline||'',
      },
      userList:[],
      loading:false,
      // searchFlag:false,
      sort:[],
      rules: {},
      overviewListTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch:{
    "$route.path":{
      handler(val){
        // this.loading = true
        this.searchForm.product_name = ""
        this.searchForm.priority = ""
        this.searchForm.deadline = ""
        // this.searchFlag = false
        this.searchForm_raw.product_name = ""
        this.searchForm_raw.priority = ""
        this.searchForm_raw.deadline = ""
        // this.currentPage = 1
        this.pageSize = 10
        this.onSearch()
        // switch (this.$route.path){
        //   case '/t_overviewlist':
        //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
        //       this.overviewListTable = response.data.result.data;
        //       this.total = response.data.result.total
        //       this.loading = false
        //     })
        //   break;
        //   case '/a_overviewlist':
        //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
        //       this.overviewListTable = response.data.result.data;
        //       this.total = response.data.result.total
        //       this.loading = false
        //     })
        //   break;
        // }
      },
      deep:true
    }
  },
  methods: {
    deadlineHighlight({row, rowIndex}) {
      // console.log(row)
      if ((new Date().valueOf() > new Date(row.deadline.replace(/-/g,'/')).valueOf())&&(row.completed!=='1.0000')) {
        return 'deadlineOverdueHighlight';
      }
      return '';
    },
    onSearch() {
      this.$refs.overviewTable.clearSort()
      this.sort = []

      this.currentPage = 1


      this.searchForm.product_name = this.searchForm_raw.product_name
      this.searchForm.priority = this.searchForm_raw.priority
      this.searchForm.deadline = this.searchForm_raw.deadline


      // this.searchForm.product_name===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      switch (this.$route.path){
        case '/t_overview':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline})).then(response=>{
            this.overviewListTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
        case '/a_overview':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline})).then(response=>{
            this.overviewListTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
      }
    },
    sortChange(event){
      let order=""
      event.order==="ascending"?order='ASC':null
      event.order==="descending"?order='DESC':null
      this.sort[0] = event.prop
      this.sort[1] = order
      this.currentPage = 1

      switch (this.$route.path){
        case '/t_overview':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(event.prop?{Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,count:this.pageSize,sort:this.sort}:{Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,count:this.pageSize})).then(response=>{
            this.overviewListTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
        case '/a_overview':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(event.prop?{Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,count:this.pageSize,sort:this.sort}:{Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,count:this.pageSize})).then(response=>{
            this.overviewListTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
      }
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      let obj = {}
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.priority?obj.priority = this.searchForm.priority:null
      this.searchForm.deadline?obj.deadline = this.searchForm.deadline:null
      this.pageSize?obj.count = this.pageSize:null
      val?obj.page = val:null
      this.$router.push({path:this.$route.path,query:obj})

      // if(this.searchFlag){
        switch (this.$route.path){
          case '/t_overview':
            this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val,count:this.pageSize,sort:this.sort}:{Role:'translator',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val,count:this.pageSize})).then(response=>{
              this.overviewListTable = response.data.result.data;
              this.total = response.data.result.total
            })
          break;
          case '/a_overview':
            this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val,count:this.pageSize,sort:this.sort}:{Role:'reviewer',product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val,count:this.pageSize})).then(response=>{
              this.overviewListTable = response.data.result.data;
              this.total = response.data.result.total
            })
          break;
        }
      // }else{
      //   switch (this.$route.path){
      //     case '/t_overview':
      //       this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'translator',page:val,count:this.pageSize,sort:this.sort}:{Role:'translator',page:val,count:this.pageSize})).then(response=>{
      //         this.overviewListTable = response.data.result.data;
      //         this.total = response.data.result.total
      //       })
      //     break;
      //     case '/a_overview':
      //       this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'reviewer',page:val,count:this.pageSize,sort:this.sort}:{Role:'reviewer',page:val,count:this.pageSize})).then(response=>{
      //         this.overviewListTable = response.data.result.data;
      //         this.total = response.data.result.total
      //       })
      //     break;
      //   }
      // }
    }
  }
}
</script>


<style lang="less" scoped>


</style>
