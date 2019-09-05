<template>
  <div id="viewProjectMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Overview</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm_raw" ref="searchForm_raw" :rules="rules" label-position="left" label-width="120px" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Project Name:" prop="product_name">
            <el-input v-model="searchForm_raw.product_name" placeholder="enter project name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="viewTable" :data="viewProjectListTable" v-loading="loading" style="width: 100%" @row-dblclick="rowDblClick" @sort-change="sortChange">
        <el-table-column prop="product" label="Project Name" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center" sortable="custom">
        </el-table-column>
        <el-table-column label="Versions" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" title="View" @click.stop="openUploadModal(scope.row)">View</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="large" title="Entries" @click="transItem(scope.row)">Entries</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <el-dialog title="Versions" width="450px" :visible.sync="dialogTableVisible" @close="closeUploadModal" :close-on-click-modal="false">
        <div class="requestLoadingCon" v-show="versionLoading">
          <i class="el-icon-loading"></i> Requesting...
        </div>
        <div style="color:#aaa;text-align:center;" v-if="!versionLoading&&(versionList.length===0)">[ No Version ]</div>
        <el-timeline v-show="!versionLoading">
          <el-timeline-item v-for="(item, index) in versionList" :key="index">
            <div @click="selectVersion(item.version_name)" class="timestampCon">
              <span class="versionNameCon">{{item.version_name}}</span>
              <span class="versionIdCon">{{' ------ ' +item.created_at}}</span>
            </div>
          </el-timeline-item>
        </el-timeline>
        <el-pagination small @current-change="versionHandleCurrentChange" :current-page="versionCurrentPage" :page-size="versionPageSize" layout="total, prev, pager, next, jumper" :total="versionTotal" v-show="!versionLoading&&versionList.length>0"></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    new Promise((resolve,reject)=>{
        resolve('success')
    }).then(data=>{
      // 这里的data是上面resolve()里的值
      // console.log(data);
      // this.onSearch()
      // !this.$route.query.name?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_project",qs.stringify({product_name:this.$route.query.name,page:this.$route.query.page,count:this.$route.query.count})).then(response=>{
        // console.log(response.data);
        this.viewProjectListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    },error=>{
      // 这里的error是上面reject()里的值
      // console.log(error);
    })
  },
  data() {
    return {
      searchForm_raw: {
        product_name: this.$route.query.name||''
      },
      searchForm: {
        product_name: this.$route.query.name||''
      },
      userList:[],
      loading:false,
      versionLoading:false,
      // searchFlag:false,
      sort:[],
      dialogTableVisible:false,
      currentProjectId:null,
      uploadFile:{},
      rules: {},
      versionList:[],
      versionTotal:0,
      versionCurrentPage: 1,
      versionPageSize: 10,
      viewProjectListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page)||1,
      pageSize:  Number(this.$route.query.count)||10
    }
  },
  methods: {
    onSearch() {
      this.$refs.viewTable.clearSort()
      this.sort = []

      this.currentPage = 1

      let obj = {}
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:this.$route.path,query:obj})

      this.searchForm.product_name = this.searchForm_raw.product_name

      // this.searchForm.product_name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_project",qs.stringify(this.searchForm)).then(response=>{
        // console.log(response.data);
        this.viewProjectListTable = response.data.result.data;
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

      this.$http.post("/api/view/list_project",qs.stringify(event.prop?{product_name:this.searchForm.product_name,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.viewProjectListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    },
    rowDblClick(row, column, event){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.transItem(row)
    },
    transItem(row){
      let obj = {
        id:row.id
      }
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.pageSize?obj.count = this.pageSize:null
      this.currentPage?obj.page = this.currentPage:null
      this.$router.push({path:'/viewentry',query:obj})
    },
    openUploadModal(row){
      this.versionLoading = true
      this.dialogTableVisible = true
      this.currentProjectId = row.id
      this.$http.post("/api/view/list_version",qs.stringify({product_id:row.id})).then(response=>{
        this.versionList = response.data.data;
        this.activities = this.versionList
        this.versionTotal = response.data.total;
        this.versionLoading = false
      })
    },
    closeUploadModal(){
      this.versionList = [];
      this.versionTotal = 0;
      this.versionCurrentPage=1;
      this.versionLoading = false
    },
    selectVersion(versionName){
      let obj = {
        id:this.currentProjectId
      }
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      versionName?obj.v = versionName:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:'/viewentry',query:obj})
    },
    versionHandleCurrentChange(val){
      this.$http.post("/api/view/list_version",qs.stringify({page:val,product_id:this.currentProjectId})).then(response=>{
        this.versionList = response.data.data;
        this.versionTotal = response.data.total;
      })
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      let obj = {}
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.pageSize?obj.count = this.pageSize:null
      val?obj.page = val:null
      this.$router.push({path:this.$route.path,query:obj})

      // if(this.searchFlag){
        this.$http.post("/api/view/list_project",qs.stringify(this.sort[0]?{product_name:this.searchForm.product_name,page:val,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.viewProjectListTable = response.data.result.data;
          this.total = response.data.result.total;
        })
      // }else{
      //   this.$http.post("/api/view/list_project",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.viewProjectListTable = response.data.result.data;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
}
</script>


<style lang="less" scoped>


</style>
