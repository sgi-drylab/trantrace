<template>
  <div id="projectMain" class="clearfix">
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
            <el-button type="warning" size="small" @click="addProject">New Project</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="ProjectTable" :data="projectListTable" v-loading="loading" style="width: 100%" @row-dblclick="rowDblClick" @sort-change="sortChange" :row-class-name="deadlineHighlight">
        <el-table-column prop="product" label="Project Name" align="center" sortable>
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
        <el-table-column prop="total_nums" label="Total" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="Completed_Qualified" label="Completed" align="center" sortable="custom">
          <template slot-scope="scope">
            <div :style="scope.row.CompletedPercentage==='0.00%'?'color:red':''">{{scope.row.CompletedQualifiedPercentage}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="large" title="Detail" @click="transItem(scope.row)">Detail</el-button>
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
    // new Promise((resolve,reject)=>{
    //   this.$http.post("/api/user/list").then(response=>{
    //     // console.log(response.data);
    //     this.userList = response.data.data;
    //     resolve('success')
    //   }).catch(err=>{
    //     reject('Request failed!')
    //   })
    // }).then(data=>{
      // 这里的data是上面resolve()里的值
      // console.log(data);

      // this.$router.push(this.$route.path+'?page=1&count=10')
      
      // !this.$route.query.name&&!this.$route.query.priority&&!this.$route.query.deadline?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/product/list",qs.stringify({page:this.$route.query.page||1,count:this.$route.query.count||10,product_name:this.$route.query.name,priority:this.$route.query.priority,deadline:this.$route.query.deadline})).then(response=>{
        response.data.result.data.forEach(item=>{
          this.$set(item,'CompletedQualifiedPercentage',this.$formatPercentage(item.Completed_Qualified*100) + '%')
          // let p = '0%';
          // if(!item.total_nums){
          //   p="0%"
          // }else{
          //   if(!item.Qualified_nums){
          //     p="0%"
          //   }else{
          //     p = parseInt(item.Qualified_nums*10000/item.total_nums)/100+'%'
          //   }
          // }
          // this.$set(item,'CompletedPercentage',p)
        })
        this.projectListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    // },error=>{
    //   // 这里的error是上面reject()里的值
    //   console.log(error);
    // })
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
      sort:[],
      userList:[],
      loading:false,
      // searchFlag:false,
      rules: {},
      projectListTableAll: [],
      projectListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page)||1,
      pageSize: Number(this.$route.query.count)||10
    }
  },
  methods: {
    deadlineHighlight({row, rowIndex}) {
      // console.log(row)
      if ((new Date().valueOf() > new Date(row.deadline.replace(/-/g,'/')).valueOf())&&(row.CompletedPercentage!=='100.00%')) {
        return 'deadlineOverdueHighlight';
      }
      return '';
    },
    onSearch() {
      this.$refs.ProjectTable.clearSort()
      this.sort = []

      this.currentPage = 1
      let obj = {}
      this.searchForm_raw.product_name?obj.name = this.searchForm_raw.product_name:null
      this.searchForm_raw.priority?obj.priority = this.searchForm_raw.priority:null
      this.searchForm_raw.deadline?obj.deadline = this.searchForm_raw.deadline:null
      this.pageSize?obj.count = this.pageSize:null
      this.currentPage?obj.page = this.currentPage:null
      this.$router.push({path:'/projectlist',query:obj})

      this.searchForm.product_name = this.searchForm_raw.product_name
      this.searchForm.priority = this.searchForm_raw.priority
      this.searchForm.deadline = this.searchForm_raw.deadline
      
      // this.searchForm.product_name===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/product/list",qs.stringify(this.searchForm)).then(response=>{
        response.data.result.data.forEach(item=>{
          this.$set(item,'CompletedQualifiedPercentage',this.$formatPercentage(item.Completed_Qualified*100) + '%')
          // let p = '0%';
          // if(!item.total_nums){
          //   p="0%"
          // }else{
          //   if(!item.Qualified_nums){
          //     p="0%"
          //   }else{
          //     p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
          //   }
          // }
          // this.$set(item,'CompletedPercentage',p)
        })
        this.projectListTable = response.data.result.data;
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

      this.$http.post("/api/product/list",qs.stringify(event.prop?{product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,count:this.pageSize})).then(response=>{
        response.data.result.data.forEach(item=>{
          this.$set(item,'CompletedQualifiedPercentage',this.$formatPercentage(item.Completed_Qualified*100) + '%')
          // let p = '0%';
          // if(!item.total_nums){
          //   p="0%"
          // }else{
          //   if(!item.Qualified_nums){
          //     p="0%"
          //   }else{
          //     p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
          //   }
          // }
          // this.$set(item,'CompletedPercentage',p)
        })
        this.projectListTable = response.data.result.data;
        this.total = response.data.result.total;
      })
    },
    addProject() {
      this.$router.push(this.searchForm.product_name?'/addproject?name='+this.searchForm.product_name:'/addproject')
    },
    rowDblClick(row, column, event){
      this.transItem(row)
    },
    transItem(row){
      // console.log(row);
      // console.log(column);
      // console.log(event);
      let obj = {
        id:row.id
      }
      this.searchForm.product_name?obj.name = this.searchForm.product_name:null
      this.searchForm.priority?obj.priority = this.searchForm.priority:null
      this.searchForm.deadline?obj.deadline = this.searchForm.deadline:null
      this.pageSize?obj.count = this.pageSize:null
      this.currentPage?obj.page = this.currentPage:null
      this.$router.push({path:'/projectdetail',query:obj})
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
      this.$router.push({path:'/projectlist',query:obj})

      // if(this.searchFlag){
        this.$http.post("/api/product/list",qs.stringify(this.sort[0]?{product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val,count:this.pageSize,sort:this.sort}:{product_name:this.searchForm.product_name,priority:this.searchForm.priority,deadline:this.searchForm.deadline,page:val,count:this.pageSize,})).then(response=>{
          response.data.result.data.forEach(item=>{
            this.$set(item,'CompletedQualifiedPercentage',this.$formatPercentage(item.Completed_Qualified*100) + '%')
            // let p = '0%';
            // if(!item.total_nums){
            //   p="0%"
            // }else{
            //   if(!item.Qualified_nums){
            //     p="0%"
            //   }else{
            //     p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
            //   }
            // }
            // this.$set(item,'CompletedPercentage',p)
          })
          this.projectListTable = response.data.result.data;
          this.total = response.data.result.total;
        })
      // }else{
      //   this.$http.post("/api/product/list",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize,})).then(response=>{
      //     response.data.result.data.forEach(item=>{
      //     let p = '0%';
      //     if(!item.total_nums){
      //       p="0%"
      //     }else{
      //       if(!item.Qualified_nums){
      //         p="0%"
      //       }else{
      //         p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
      //       }
      //     }
      //     this.$set(item,'CompletedPercentage',p)
      //   })
      //     this.projectListTable = this.projectListTableAll;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
}
</script>


<style lang="less" scoped>


</style>
