<template>
  <div id="transListMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="backUrl">Overview</el-breadcrumb-item>
      <el-breadcrumb-item>Entries</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm_raw" ref="searchForm_raw" :rules="rules" label-position="left" label-width="120px" class="demo-form-inline" size="small" @submit.native.prevent="onSearch">
          <el-form-item label="Keyword:">
            <el-input v-model="searchForm_raw.key" placeholder="enter keyword"></el-input>
          </el-form-item>
          <el-form-item label="Version:">
            <el-input v-model="searchForm_raw.version_name" placeholder="enter version"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="showTransList">
      <el-table ref="entryTable" :data="viewItemListTable" v-loading="loading" style="width: 100%" @row-dblclick="rowDblClick" @sort-change="sortChange">
        <el-table-column label="Source" align="center" type="expand" width="75">
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
        <el-table-column prop="lang" label="Language" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="version_name" label="Version" align="center">
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
          <el-button type="text" size="medium" title="View" @click="transItem(scope.row)" v-if="scope.row.status !== 'Untranslated'">View</el-button>
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
    // this.$route.query.v?this.searchForm.version_name=this.$route.query.v:this.searchForm.version_name=''
    let obj = {}
    this.$route.query.name?obj.name = this.$route.query.name:null
    this.$route.query.page?obj.page = this.$route.query.page:null
    this.$route.query.count?obj.count = this.$route.query.count:null
    this.backUrl={path:'/viewlist',query:obj}
    // console.log(this.backUrl)
    // !this.$route.query.key&&!this.$route.query.v?this.searchFlag = false:this.searchFlag = true
    this.$http.post("/api/view/list_items",qs.stringify({key:this.searchForm.key,version_name:this.$route.query.v,product_id:this.$route.query.id,page:this.$route.query.page1,count:this.$route.query.count1})).then(response=>{
        // console.log(response.data);
        this.viewItemListTable = response.data.result.data;
        this.total = response.data.result.total;
      })

    // this.onSearch()
    // this.$http.post("/api/view/list_items",qs.stringify({product_id:this.$route.query.id,version_name:this.$route.query.v})).then(response=>{
    //   // console.log(response.data);
    //   this.viewItemListTable = response.data.result.data;
    //   this.total = response.data.result.total;
    //   this.loading = false
    // })
  },
  data() {
    return {
      backUrl:'',
      searchForm_raw: {
        key: this.$route.query.key||'',
        version_name: this.$route.query.v||''
      },
      searchForm: {
        key: this.$route.query.key||'',
        version_name: this.$route.query.v||''
      },
      loading:false,
      // searchFlag:false,
      sort:[],
      rules: {},
      viewItemListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page1)||1,
      pageSize: Number(this.$route.query.count1)||10
    }
  },
  methods: {
    onSearch() {
      this.$refs.entryTable.clearSort()
      this.sort = []

      this.currentPage = 1
      let obj = {}
      this.$route.query.id?obj.id = this.$route.query.id:null
      this.$route.query.name?obj.name = this.$route.query.name:null
      this.$route.query.page?obj.page = this.$route.query.page:null
      this.$route.query.count?obj.count = this.$route.query.count:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.version_name?obj.v = this.searchForm.version_name:null
      this.currentPage?obj.page1 = this.currentPage:null
      this.pageSize?obj.count1 = this.pageSize:null
      this.$router.push({path:this.$route.path,query:obj})

      this.searchForm.key = this.searchForm_raw.key
      this.searchForm.version_name = this.searchForm_raw.version_name

      // this.searchForm.key===''&&this.searchForm.version_name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_items",qs.stringify({key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.viewItemListTable = response.data.result.data;
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

      this.$http.post("/api/view/list_items",qs.stringify(event.prop?{key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:this.currentPage,count:this.pageSize,sort:this.sort}:{key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:this.currentPage,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        this.viewItemListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    },
    rowDblClick(row, column, event){
      let obj = {
        id:row.product_id,
        eid:row.export_id
      }
      this.$route.query.name?obj.name = this.$route.query.name:null
      this.$route.query.page?obj.page = this.$route.query.page:null
      this.$route.query.count?obj.count = this.$route.query.count:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.version_name?obj.v = this.searchForm.version_name:null
      this.currentPage?obj.page1 = this.currentPage:null
      this.pageSize?obj.count1 = this.pageSize:null
      this.$router.push({path:'/viewdetail',query:obj})
    },
    transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      let obj = {
        id:row.product_id,
        eid:row.export_id
      }
      this.$route.query.name?obj.name = this.$route.query.name:null
      this.$route.query.page?obj.page = this.$route.query.page:null
      this.$route.query.count?obj.count = this.$route.query.count:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.version_name?obj.v = this.searchForm.version_name:null
      this.currentPage?obj.page1 = this.currentPage:null
      this.pageSize?obj.count1 = this.pageSize:null
      this.$router.push({path:'/viewdetail',query:obj})
    },
    handleSizeChange(size){
      this.pageSize = size
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      let obj = {
        id:this.$route.query.id
      }
      this.$route.query.name?obj.name = this.$route.query.name:null
      this.$route.query.page?obj.page = this.$route.query.page:null
      this.$route.query.count?obj.count = this.$route.query.count:null
      this.searchForm.key?obj.key = this.searchForm.key:null
      this.searchForm.version_name?obj.key = this.searchForm.version_name:null
      val?obj.page1 = val:null
      this.pageSize?obj.count1 = this.pageSize:null
      this.$router.push({path:this.$route.path,query:obj})

      // if(this.searchFlag){
        this.$http.post("/api/view/list_items",qs.stringify(this.sort[0]?{key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:val,count:this.pageSize,sort:this.sort}:{key:this.searchForm.key,version_name:this.searchForm.version_name,product_id:this.$route.query.id,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          this.viewItemListTable = response.data.result.data;
          this.total = response.data.result.total;
        })
      // }else{
      //   this.$http.post("/api/view/list_items",qs.stringify(this.sort[0]?{product_id:this.$route.query.id,page:val,count:this.pageSize,sort:this.sort}:{product_id:this.$route.query.id,page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.viewItemListTable = response.data.result.data;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
