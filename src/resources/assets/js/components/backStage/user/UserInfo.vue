<template>
  <div id="userMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>User Management</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="addSearch clearfix">
      <div id="searchCon">
        <el-form :inline="true" :model="searchForm_raw" ref="searchForm_raw" :rules="rules" label-position="left" label-width="90px" class="demo-form-inline" size="small" @submit.native.prevent>
          <el-form-item label="Email:" prop="email">
            <el-input v-model="searchForm_raw.email" placeholder="enter email"></el-input>
          </el-form-item>
          <el-form-item label="User Name:" prop="name">
            <el-input v-model="searchForm_raw.name" placeholder="enter user name"></el-input>
          </el-form-item>
            <el-form-item>
            <el-button type="primary" class="searchBtn" @click="onSearch">
              <i class="el-icon-search">Search</i></el-button>
            <el-button  type="primary" id="addUser" @click="addUser">New User</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="showUserInfo">
      <el-table ref="userTable" :data="userListTable" v-loading="loading" style="width: 100%" @sort-change="sortChange">
        <el-table-column prop="email" label="Email" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="name" label="User Name" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="created_at" label="Creation Time" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.statusSwitch" active-color="#41babc"@change="changeSwitch(scope.row)"></el-switch>
            <span v-if="scope.row.statusSwitch" class="themeColor">Active</span>
            <span v-if="!scope.row.statusSwitch" class="red">Inactive</span>
          </template>
        </el-table-column>
        <el-table-column label="Password" align="center">
          <template slot-scope="scope">
            <el-button type="text" title="reset password" @click="resetPwd(scope.row)" style="font-size:14px;">Reset</el-button>
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
    // this.$router.push('/userinfo?page=1&count=10')
    this.$http.post("/api/User/list",qs.stringify({page:this.currentPage,count:this.pageSize})).then(response=>{
      // console.log(response.data);
      response.data.data.forEach(item=>{
        this.$set(item,'statusSwitch',item.status=='1'?true:false)
      })
      this.userListTable = response.data.data;
      this.total = response.data.total;
    })
  },
  data() {
    return {
      searchForm_raw: {
        email: this.$route.query.email||'',
        name: this.$route.query.name||'',
      },
      searchForm: {
        email: this.$route.query.email||'',
        name: this.$route.query.name||'',
      },
      rules: {},
      loading:false,
      // searchFlag:false,
      sort:[],
      statusSwitch:true,
      userListTable: [],
      total:0,
      currentPage: Number(this.$route.query.page)||1,
      pageSize:  Number(this.$route.query.count)||10
    }
  },
  methods: {
    onSearch() {
      this.$refs.userTable.clearSort()
      this.sort = []

      this.currentPage = 1
      let obj = {}
      this.searchForm.email?obj.email = this.searchForm.email:null
      this.currentPage?obj.page = this.currentPage:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:'/userinfo',query:obj})

      this.searchForm.email = this.searchForm_raw.email
      this.searchForm.name = this.searchForm_raw.name

      // this.searchForm.email===''&&this.searchForm.name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/User/list",qs.stringify({email:this.searchForm.email,name:this.searchForm.name})).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'statusSwitch',item.status=='1'?true:false)
        })
        this.userListTable = response.data.data;
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

      this.$http.post("/api/User/list",qs.stringify(event.prop?{email:this.searchForm.email,name:this.searchForm.name,count:this.pageSize,sort:this.sort}:{email:this.searchForm.email,name:this.searchForm.name,count:this.pageSize})).then(response=>{
        // console.log(response.data);
        response.data.data.forEach(item=>{
          this.$set(item,'statusSwitch',item.status=='1'?true:false)
        })
        this.userListTable = response.data.data;
        this.total = response.data.total;
      })
    },
    addUser() {
      this.$router.push({path:'/adduser',query:{email:this.searchForm.email}})
    },
    changeSwitch(row){
      this.$confirm(row.statusSwitch?'Are you sure to open this account?':'Are you sure to shut down this account?', {
        title:row.statusSwitch?'Open':'Shut Down',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose:false
      }).then(() => {
        this.$http.post("/api/User/close_open",qs.stringify({
          uid:row.id,
          status:row.statusSwitch?'1':'0'
        })).then(response=>{
          if(response.data.success){

          }
        })
      }).catch(() => {
        row.statusSwitch = !row.statusSwitch
      })
    },
    resetPwd(row) {
      this.$confirm('Are you sure to reset password?', {
        title:'Reset Password',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose:false
      }).then(() => {
        this.$http.post("/api/User/ChangeUserPwd",qs.stringify({
          uid : row.id,
          newpassword:'123456'
        })).then(response=>{
          if(response.data.success){
            this.$message({
              message: 'Password has been reset to 123456 successfully.',
              type: 'success'
            })
          }
        })
      })
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
      this.searchForm.email?obj.email = this.searchForm.email:null
      this.pageSize?obj.count = this.pageSize:null
      val?obj.page = val:null
      this.$router.push({path:'/userinfo',query:obj})

      // if(this.searchFlag){
        this.$http.post("/api/User/list",qs.stringify(this.sort[0]?{email:this.searchForm.email,name:this.searchForm.name,page:val,count:this.pageSize,sort:this.sort}:{email:this.searchForm.email,name:this.searchForm.name,page:val,count:this.pageSize})).then(response=>{
          // console.log(response.data);
          response.data.data.forEach(item=>{
            this.$set(item,'statusSwitch',item.status=='1'?true:false)
          })
          this.userListTable = response.data.data;
          this.total = response.data.total;
        })
      // }else{
      //   this.$http.post("/api/User/list",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     response.data.data.forEach(item=>{
      //       this.$set(item,'statusSwitch',item.status=='1'?true:false)
      //     })
      //     this.userListTable = response.data.data;
      //     this.total = response.data.total;
      //   })
      // }
    }
  }
}
</script>


<style lang="less" scoped>

</style>
