<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Reply</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" label-width="120px" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Project Name:">
            <el-input v-model="searchForm.product" placeholder="enter project name"></el-input>
          </el-form-item>
          <el-form-item label="Keyword:">
            <el-input v-model="searchForm.key" placeholder="enter keyword"></el-input>
          </el-form-item>
          <el-form-item label="Status:">
            <el-select v-model="searchForm.is_done" placeholder="select status">
              <el-option label="All" value="3"></el-option>
              <el-option label="Unreplied" value="0"></el-option>
              <el-option label="Agreed" value="1"></el-option>
              <el-option label="Ignored" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showTransList">
      <el-table ref="replyTable" :data="approvalListTable" v-loading="loading" style="width: 100%" @row-dblclick="rowDblClick" @sort-change="sortChange">
        <el-table-column label="Issues" align="center" type="expand" width="100">
          <template slot-scope="scope">
            <div>{{scope.row.objection}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="product" label="Project Name" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="key" label="Keyword" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{Object.keys(JSON.parse(scope.row.key)[0])[0]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="created_at" label="Reply Time" align="center" sortable="custom">
          <template slot-scope="scope">
            <div :title="scope.row.created_at">{{scope.row.created_at}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="advice_updated_at" label="Issue Time" align="center" sortable="custom">
          <template slot-scope="scope">
            <div :title="scope.row.advice_updated_at">{{scope.row.advice_updated_at}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Status" align="center" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.approved===2">Ignored</div>
            <div v-else-if="scope.row.approved===1">Agreed</div>
            <div v-else-if="scope.row.approved===0" style="color:#E6A23C">Unreplied</div>
          </template>
        </el-table-column>
        <el-table-column label="Translation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="View" @click="transItem(scope.row)">View</el-button>
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
    // this.searchForm.product = this.$route.query.name||''
    // this.onSearch()
    // this.$router.push(this.$route.path+'?page=1&count=10')
    !this.$route.query.key&&!this.$route.query.product&&!this.$route.query.is_done?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/approve/list_conflict",qs.stringify({product_id:this.$route.query.id||'',is_done:this.$route.query.is_done,product:this.$route.query.name,key:this.$route.query.key,page:this.$route.query.page,count:this.$route.query.count})).then(response=>{
        // console.log(response.data);
        this.approvalListTable = response.data.data;
        this.total = response.data.total;
      })
  },
  data() {
    return {
      product_id:this.$route.query.id||null,
      searchForm: {
        product:this.$route.query.name||'',
        key: this.$route.query.key||'',
        is_done:this.$route.query.is_done||'3'
      },
      loading:false,
      searchFlag:false,
      sort:[],
      rules: {},
      approvalListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page)||1,
      pageSize: Number(this.$route.query.count)||10
    }
  },
  methods: {
    onSearch() {
      this.$refs.replyTable.clearSort()
      this.sort = []

      this.currentPage = 1
      this.product_id = null
      let obj = {}
      this.searchForm.product?obj.name = this.searchForm.product:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.is_done?obj.is_done = this.searchForm.is_done:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:'/feedback',query:obj})
      
      this.searchForm.key===''&&this.searchForm.product===''&&this.searchForm.is_done===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/approve/list_conflict",qs.stringify({is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.approvalListTable = response.data.data;
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

      this.$http.post("/api/approve/list_conflict",qs.stringify(event.prop?{is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:this.currentPage,count:this.pageSize,sort:this.sort}:{is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.approvalListTable = response.data.data;
        this.total = response.data.total;
      })
    },
    rowDblClick(row, column, event){
      this.transItem(row)
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      let obj = {
        id:row.id
      }
      this.searchForm.product?obj.name = this.searchForm.product:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.is_done?obj.is_done = this.searchForm.is_done:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:'/viewfeedback',query:obj})
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let obj = {}
      this.searchForm.product?obj.name = this.searchForm.product:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.is_done?obj.is_done = this.searchForm.is_done:null
      this.pageSize?obj.count = this.pageSize:null
      val?obj.page = val:null
      this.$router.push({path:'/feedback',query:obj})
      
      if(this.searchFlag){
        this.$http.post("/api/approve/list_conflict",qs.stringify(this.sort[0]?{is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:val,count:this.pageSize,sort:this.sort}:{is_done:this.searchForm.is_done,product:this.searchForm.product,key:this.searchForm.key,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.approvalListTable = response.data.data;
          this.total = response.data.total;
        })
      }else{
        this.$http.post("/api/approve/list_conflict",qs.stringify(this.sort[0]?{product_id:this.product_id,is_done:'3',page:val,count:this.pageSize,sort:this.sort}:{product_id:this.product_id,is_done:'3',page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.approvalListTable = response.data.data;
          this.total = response.data.total;
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
