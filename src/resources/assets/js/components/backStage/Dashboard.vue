<template>
  <div id="overviewMain" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="overviewHeader">
      <!-- <el-card class="box-card" :shadow="currentMenu==='project'?'always':'hover'">
        <div class="menuCon" @click="selectMenu('project')">
          <span>
            <i class="el-icon-menu" :style="currentMenu==='project'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='project'?'color:#000;':''">
            Project
          </div>
        </div>
      </el-card> -->
      <el-card class="box-card" :shadow="currentMenu==='allocation'?'always':'hover'" :style="currentMenu==='allocation'?'background-color:rgba(65,186,188,.2);':''">
        <div class="menuCon" @click="selectMenu('allocation')">
          <span>
            <i class="el-icon-rank" :style="currentMenu==='allocation'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='allocation'?'color:#000;':''">
            Assignment
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='translation'?'always':'hover'" :style="currentMenu==='translation'?'background-color:rgba(65,186,188,.2);':''">
        <div class="menuCon" @click="selectMenu('translation')">
          <span>
            <i class="el-icon-edit-outline" :style="currentMenu==='translation'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='translation'?'color:#000;':''">
            Translation
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='approval'?'always':'hover'" :style="currentMenu==='approval'?'background-color:rgba(65,186,188,.2);':''">
        <div class="menuCon" @click="selectMenu('approval')">
          <span>
            <i class="el-icon-tickets" :style="currentMenu==='approval'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='approval'?'color:#000;':''">
            Review
          </div>
        </div>
      </el-card>
      <el-card class="box-card" :shadow="currentMenu==='objection'?'always':'hover'" :style="currentMenu==='objection'?'background-color:rgba(65,186,188,.2);':''">
        <div class="menuCon" @click="selectMenu('objection')">
          <span>
            <i class="el-icon-bell" :style="currentMenu==='objection'?'opacity:1;':'opacity:0.5;'"></i>
          </span>
          <div :style="currentMenu==='objection'?'color:#000;':''">
            Issues
          </div>
        </div>
      </el-card>
    </div>

    <div class="showUserInfo">
      <el-table ref="dashboardTable" :data="overviewTable" v-loading="loading" style="width: 100%" @sort-change="sortChange" :row-class-name="deadlineHighlight">
        <el-table-column prop="product" label="Project Name" align="center" sortable="custom">
          <template slot-scope="scope">
            <div :style="currentMenu==='project'?'cursor:pointer;color:#41babc;':''" @click="currentMenu==='project'?$router.push('/projectdetail?id='+scope.row.id):null">{{scope.row.product}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lang" label="Language" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="deadline" label="Deadline" align="center" sortable="custom">
          <template slot-scope="scope">
            <div>{{scope.row.deadline&&scope.row.deadline.split(" ")[1]?scope.row.deadline.split(" ")[0]:scope.row.deadline}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="Priority" align="center" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.priority=='1'">Low</div>
            <div v-if="scope.row.priority=='2'">Normal</div>
            <div v-if="scope.row.priority=='3'" style="color:red">High</div>
          </template>
        </el-table-column>
        <el-table-column key='aotaTotal' prop="total_nums" label="Total" align="center" v-if="currentMenu==='allocation'" sortable="custom">
        </el-table-column>
        <el-table-column key='aotaTotal' prop="total_nums" label="Total" align="center" v-if="(currentMenu!=='allocation')&&(currentMenu!=='objection')" sortable="custom">
        </el-table-column>
        <el-table-column key="oTotal" prop="total_conflict" label="Total" align="center" v-if="currentMenu==='objection'" sortable="custom">
        </el-table-column>
        <el-table-column key="assignCompleted" prop="Completed" label="Completed" align="center" v-if="currentMenu==='allocation'" sortable="custom">
          <template slot-scope="scope">
            <div :style="scope.row.completed==='0.00%'?'color:red':''">
              {{scope.row.CompletedPercentage}}
            </div>
          </template>
        </el-table-column>
          <el-table-column key="objectCompleted" prop="completed" label="Completed" align="center" v-if="currentMenu==='objection'" sortable="custom">
          <template slot-scope="scope">
            <div :style="scope.row.CompletedPercentage==='0.00%'?'color:red':''">
              {{scope.row.CompletedPercentage}}
            </div>
          </template>
          </el-table-column>
          <el-table-column key="transCompleted" prop="completed" label="Completed" align="center" v-if="currentMenu==='translation'" sortable="custom">
          <template slot-scope="scope">
            <div :style="scope.row.CompletedPercentage==='0.00%'?'color:red':''">
              {{scope.row.CompletedPercentage}}
            </div>
          </template>
          </el-table-column>
          <el-table-column key="approvalCompleted" prop="completed" label="Completed" align="center" v-if="currentMenu==='approval'" sortable="custom">
          <template slot-scope="scope">
            <div :style="scope.row.CompletedPercentage==='0.00%'?'color:red':''">
              {{scope.row.CompletedPercentage}}
            </div>
          </template>
        </el-table-column>
        <el-table-column key="aUnssign" prop="Unassigned_nums" label="Not Finished" align="center" v-if="currentMenu==='allocation'" sortable="custom">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/assignment?id='+scope.row.id+'&name='+scope.row.product)">Assignment: {{scope.row.Unassigned_nums}}</div>
          </template>
        </el-table-column>
        <el-table-column key="oUnconflict" prop="task_conflict" label="Not Finished" align="center" v-if="currentMenu==='objection'" sortable="custom">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/v_history?name='+scope.row.product+'&status=0&count=10&page=1')">Issues: {{scope.row.task_conflict}}</div>
          </template>
        </el-table-column>
        <el-table-column key="tUntranslate" prop="not_finished" label="Not Finished" align="center" v-if="currentMenu==='translation'" sortable="custom">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/translation?name='+scope.row.product+'&count=10&page=1')">Translation: {{scope.row.Untranslated}}</div>
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/retranslation?name='+scope.row.product+'&count=10&page=1')">Retranslation: {{scope.row['Unretranslated']}}</div>
          </template>
        </el-table-column>
        <el-table-column key="aUnreviewed" prop="not_finished" label="Not Finished" align="center" v-if="currentMenu==='approval'" sortable="custom">
          <template slot-scope="scope">
            <div style="cursor:pointer;color:#41babc;" @click="$router.push('/review?name='+scope.row.product+'&count=10&page=1')">Review: {{scope.row.Unreviewed}}</div>
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
    if(this.$route.query.tab){
      this.selectMenu(this.$route.query.tab)
    }else{
      // this.$router.push('/dashboard?tab=allocation&page=1&count=10')
      this.selectMenu('allocation')
    }
  },
  data() {
    return {
      currentMenu:'allocation',
      sort:[],
      loading:false,
      overviewTable: [],
      total:0,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch:{
    '$route.query':{
      handler(val, oldVal){
        if(val.tab!==oldVal.tab){
          this.selectMenu(val.tab)
        }

      },
      deep:true
    }
  },
  methods: {
    deadlineHighlight({row, rowIndex}) {
      if ((new Date().valueOf() > new Date(row.deadline.replace(/-/g,'/')).valueOf())&&(row.CompletedPercentage!=="100.00%")) {
        return 'deadlineOverdueHighlight';
      }
      return '';
    },
    selectMenu(menu){
      // console.log(menu)
      // console.log(this.$refs)
      this.$refs.dashboardTable.clearSort()
      this.sort = []

      this.currentMenu = menu
      this.currentPage = 1
      switch (menu){
        case 'allocation':
          this.$router.push('/dashboard?tab=allocation')
          this.$http.post("/api/product/list",qs.stringify({is_static:1})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.Completed*100) + '%')
            //   let c ;
            //   if(item.total_nums===0){
            //     c = "0.00%"
            //   }else{
            //     if(item.Unassigned_nums===0){
            //       c="100.00%"
            //     }else{
            //       c = this.$formatPercentage((10000-parseInt(Math.round(item.Unassigned_nums*10000/item.total_nums)))/100)+'%'
            //     }
            //   }
            //   this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        break;
        case 'objection':
          this.$router.push('/dashboard?tab=objection')
          this.$http.post("/api/Statistic/Products_Conflict").then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
            //   let c ;
            //   if(item.total_conflict===0){
            //     c = "0.00%"
            //   }else{
            //     if(item.task_conflict===0){
            //       c = "100.00%"
            //     }else{
            //       c = this.$formatPercentage((10000-parseInt(Math.round(item.task_conflict*10000/item.total_conflict)))/100)+'%'
            //     }
            //   }
            //   this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        break;
        case 'translation':
          this.$router.push('/dashboard?tab=translation')
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              this.$set(item,'total_nums',item.Qualified+item['Unretranslated']+item.Unreviewed+item.Untranslated)
              // let c ;
              // if((item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified)===0){
              //   c = "0.00%"
              // }else{
              //   if((item.Untranslated+item['Unretranslated'])===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt((Math.round((item.Untranslated+item['Unretranslated'])*10000)/(item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified))))/100)+'%'
              //   }
                
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
        case 'approval':
          this.$router.push('/dashboard?tab=approval')
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              this.$set(item,'total_nums',item.Qualified+item.Unreviewed)
              // let c ;
              // if((item.Qualified+item.Unreviewed)===0){
              //   c = "0.00%"
              // }else{
              //   if((item['Unretranslated']+item.Unreviewed)===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage(parseInt((Math.round((item.Qualified)*10000)/(item.Unreviewed+item.Qualified)))/100)+'%'
              //   }
                
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
      }
    },
    sortChange(event){
      // console.log(event)
      let order=""
      event.order==="ascending"?order='ASC':null
      event.order==="descending"?order='DESC':null
      this.sort[0] = event.prop
      this.sort[1] = order
      this.currentPage = 1

      switch (this.currentMenu){
        case 'allocation':
          this.$router.push('/dashboard?tab=allocation')
          this.$http.post("/api/product/list",qs.stringify(event.prop?{is_static:1,count:this.pageSize,sort:this.sort}:{is_static:1,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              // console.log(this.$formatPercentage(item.Completed*100))
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.Completed*100) + '%')
            //   let c ;
            //   if(item.total_nums===0){
            //     c = "0.00%"
            //   }else{
            //     if(item.Unassigned_nums===0){
            //       c="100.00%"
            //     }else{
            //       c = this.$formatPercentage((10000-parseInt(Math.round(item.Unassigned_nums*10000/item.total_nums)))/100)+'%'
            //     }
            //   }
            //   this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        break;
        case 'objection':
          this.$router.push('/dashboard?tab=objection')
          this.$http.post("/api/Statistic/Products_Conflict",qs.stringify(event.prop?{count:this.pageSize,sort:this.sort}:{count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              // let c ;
              // if(item.total_conflict===0){
              //   c = "0.00%"
              // }else{
              //   if(item.task_conflict===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt(Math.round(item.task_conflict*10000/item.total_conflict)))/100)+'%'
              //   }
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        break;
        case 'translation':
          this.$router.push('/dashboard?tab=translation')
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(event.prop?{Role:'translator',count:this.pageSize,sort:this.sort}:{Role:'translator',count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              this.$set(item,'total_nums',item.Qualified+item['Unretranslated']+item.Unreviewed+item.Untranslated)
              // let c ;
              // if((item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified)===0){
              //   c = "0.00%"
              // }else{
              //   if((item.Untranslated+item['Unretranslated'])===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt((Math.round((item.Untranslated+item['Unretranslated'])*10000)/(item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified))))/100)+'%'
              //   }
                
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
        case 'approval':
          this.$router.push('/dashboard?tab=approval')
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(event.prop?{Role:'reviewer',count:this.pageSize,sort:this.sort}:{Role:'reviewer',count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              this.$set(item,'total_nums',item.Qualified+item.Unreviewed)
              // let c ;
              // if((item.Qualified+item.Unreviewed)===0){
              //   c = "0.00%"
              // }else{
              //   if((item['Unretranslated']+item.Unreviewed)===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage(parseInt((Math.round((item.Qualified)*10000)/(item.Unreviewed+item.Qualified)))/100)+'%'
              //   }
                
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
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
      this.currentMenu?obj.tab = this.currentMenu:null
      val?obj.page = val:null
      this.pageSize?obj.count = this.pageSize:null
      this.$router.push({path:'/dashboard',query:obj})

      switch (this.currentMenu){
        // case 'project':
        //   this.$http.post("/api/product/list",qs.stringify({page:val})).then(response=>{
        //     this.overviewTableAll = response.data.result.data;
        //     this.total = response.data.result.total;
        //     this.loading = false
        //   })
        // break;
        case 'allocation':
          this.$http.post("/api/product/list",qs.stringify(this.sort[0]?{is_static:1,page:val,count:this.pageSize,sort:this.sort}:{is_static:1,page:val,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.Completed*100) + '%')

              // let c ;
              // if(item.total_nums===0){
              //   c = "0.00%"
              // }else{
              //   if(item.Unassigned_nums===0){
              //     c="100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt(Math.round(item.Unassigned_nums*10000/item.total_nums)))/100)+'%'
              //   }
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        break;
        case 'objection':
          this.$http.post("/api/Statistic/Products_Conflict",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              // let c ;
              // if(item.total_conflict===0){
              //   c = "0.00%"
              // }else{
              //   if(item.task_conflict===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt(Math.round(item.task_conflict*10000/item.total_conflict)))/100)+'%'
              //   }
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total;
          })
        break;
        case 'translation':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'translator',page:val,count:this.pageSize,sort:this.sort}:{Role:'translator',page:val,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              this.$set(item,'total_nums',item.Error+item.Qualified+item['Unretranslated']+item.Unreviewed+item.Untranslated)
              // let c ;
              // if((item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified+item.Error)===0){
              //   c = "0.00%"
              // }else{
              //   if((item.Untranslated+item['Unretranslated'])===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt((Math.round((item.Untranslated+item['Unretranslated'])*10000)/(item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified+item.Error))))/100)+'%'
              //   }
                
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
        case 'approval':
          this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'reviewer',page:val,count:this.pageSize,sort:this.sort}:{Role:'reviewer',page:val,count:this.pageSize})).then(response=>{
            response.data.result.data.forEach(item=>{
              this.$set(item,'CompletedPercentage',this.$formatPercentage(item.completed*100) + '%')
              this.$set(item,'total_nums',item.Qualified+item.Unreviewed)
              // let c ;
              // if((item.Qualified+item.Unreviewed)===0){
              //   c = "0.00%"
              // }else{
              //   if((item['Unretranslated']+item.Unreviewed)===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage(parseInt((Math.round((item.Qualified)*10000)/(item.Unreviewed+item.Qualified)))/100)+'%'
              //   }
                
              // }
              // this.$set(item,'completed',c)
            })
            this.overviewTable = response.data.result.data;
            this.total = response.data.result.total
          })
        break;
      }
      
    }
  }
}
</script>


<style lang="less" scoped>


</style>
