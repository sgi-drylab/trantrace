<template>
  <el-container>
    <el-header height="60px" id="header">
      <div class="homeLogo">
        <img src="/images/logo.png" alt="Trantrace Logo" style="cursor:pointer;" title="Trantrace" @click="role=='2'?selectMenu('userinfo'):selectMenu('dashboard')">
      </div>
      <div class="homeLogin">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <span style="display:inline-block;max-width:300px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;vertical-align: middle;">{{loginName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- <el-badge :value="newTaskSum" :max="99" v-show="newTaskSum>0" style="transform:translate(-33px,-10px)"></el-badge> -->
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item>
              <span size="small" @click="taskVisible=true">My Task</span>
              <el-badge :value="newTaskSum" :max="99" v-show="newTaskSum>0"></el-badge>
            </el-dropdown-item>-->
            <el-dropdown-item>
              <div size="small" @click="myDetail">Profile</div>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logOut">Sign Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" type="text" plain @click.native="help" style="padding:5px;font-size:16px;color:#e6a23c"><i class="el-icon-question">Help</i></el-button>
      </div>
    </el-header>
    <el-container id="back_section">
      <el-aside width="220px">
        <el-row class="tac">
          <el-menu class="el-menu-vertical-demo" id="asideUl" height="700px" router background-color="#41babc" text-color="#fff" active-text-color="#ffd04b" :default-openeds="asidedefaultOpened">
            <el-menu-item index="dashboard" :route="{path:'/dashboard',query:{tab:'allocation',count:10,page:1}}" v-if="role=='1'">
              <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-submenu index="projectManagement" v-if="role=='1'">
              <template slot="title">
                <span>Project Management</span>
              </template>
              <el-menu-item index="projectlist" :route="{path:'/projectlist',query:{count:10,page:1}}">
                <span slot="title" id="projectlist">Overview</span>
              </el-menu-item>
              <el-menu-item index="assignment" :route="{path:'/assignment'}">
                <span slot="title" id="assignment">Assignment</span>
              </el-menu-item>
              <!-- <el-menu-item index="feedback" :route="{path:'/feedback',query:{is_done:'3',count:10,page:1}}">
                <span slot="title" id="feedback">Reply</span>
              </el-menu-item> -->
            </el-submenu>
            <el-submenu index="translationManagement" v-if="role=='1'">
              <template slot="title">
                <span>Translation Management</span>
              </template>
              <el-menu-item index="t_overview" :route="{path:'/t_overview',query:{count:10,page:1}}">
                <span slot="title" id="t_overview">Overview</span>
              </el-menu-item>
              <el-menu-item index="translation" :route="{path:'/translation',query:{count:10,page:1}}">
                <span slot="title" id="translation">Translation</span>
              </el-menu-item>
              <el-menu-item index="retranslation" :route="{path:'/retranslation',query:{count:10,page:1}}">
                <span slot="title" id="retranslation">Retranslation</span>
              </el-menu-item>
              <el-menu-item index="t_history" :route="{path:'/t_history',query:{count:10,page:1}}">
                <span slot="title" id="t_history">History</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="reviewManagement" v-if="role=='1'">
              <template slot="title">
                <span>Review Management</span>
              </template>
              <el-menu-item index="a_overview" :route="{path:'/a_overview',query:{count:10,page:1}}">
                <span slot="title" id="a_overview">Overview</span>
              </el-menu-item>
              <el-menu-item index="review" :route="{path:'/review',query:{count:10,page:1}}">
                <span slot="title" id="review">Review</span>
              </el-menu-item>
              <el-menu-item index="a_history" :route="{path:'/a_history',query:{count:10,page:1}}">
                <span slot="title" id="a_history">History</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="viewManagement" v-if="role=='1'">
              <template slot="title">
                <span>Released Projects</span>
              </template>
              <el-menu-item index="viewlist" :route="{path:'/viewlist',query:{count:10,page:1}}">
                <span slot="title" id="viewlist">Overview</span>
              </el-menu-item>
              <el-menu-item index="v_history" :route="{path:'/v_history',query:{count:10,page:1}}">
                <span slot="title" id="v_history">Issues</span>
              </el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="personalstatistics" @click="selectMenu('personalstatistics')" v-if="role=='1'">
              <span slot="title" id="personalstatistics">Personal Statistics</span>
            </el-menu-item>
            <el-menu-item index="selfuserinfo" @click="selectMenu('selfuserinfo')" >
              <span slot="title">Personal Information</span>
            </el-menu-item>-->
            <el-menu-item index="userinfo" :route="{path:'/userinfo',query:{count:10,page:1}}" v-if="role=='2'">
              <span slot="title" id="userinfo">User Management</span>
            </el-menu-item>
            <!--<el-menu-item index="desc" @click="selectMenu('desc')">
              <span slot="title">Help</span>
            </el-menu-item>-->
          </el-menu>
        </el-row>
      </el-aside>
      <el-container>
        <el-main id="main" style="padding-bottom:100px;">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
      <el-footer id="footer">Copyright {{new Date().getFullYear()}} ( Recommend Using <img src="/images/chrome.jpg" style="display:inline-block;width:15px;height:15px;vertical-align:middle;"/> Chrome Browser )</el-footer>

    <!--<el-dialog width="25%" title="My Task" :visible.sync="taskVisible" :close-on-click-modal="false">
      <div style="padding-left:50px;font-size:16px;">
        <div>Unallocated: <b>{{$store.state.taskList.Unassigned_nums}}</b></div>
        <div>Untranslated: <b>{{$store.state.taskList.Untranslated_nums}}</b></div>
        <div>Unreviewed: <b>{{$store.state.taskList.Approve_nums}}</b></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </el-dialog>-->

    <el-dialog width="40%" title="Profile" :visible.sync="myProfileOuterVisible" :close-on-click-modal="false">
      <p><span>Name: </span><span style="font-weight:bold;">{{personalInfo.name}}</span></p>
      <p><span>Email: </span><span style="font-weight:bold;">{{personalInfo.email}}</span></p>
      <p>
        <el-button type="primary" size="small" @click="innerVisible = true">Change Password</el-button>
      </p>
      
      <el-dialog width="40%" title="Change Password" :visible.sync="innerVisible" :close-on-click-modal="false" append-to-body>
        <el-form :model="modifyPasswordForm" status-icon :rules="passwordRules" ref="modifyPasswordForm" label-width="180px" class="demo-ruleForm">
          <el-form-item label="Old Password" prop="oldPass">
            <el-input type="password" v-model.trim="modifyPasswordForm.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="newPass">
            <el-input type="password" v-model.trim="modifyPasswordForm.newPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Repeat New Password" prop="checkPass">
            <el-input type="password" v-model.trim="modifyPasswordForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPassForm('modifyPasswordForm')">Change</el-button>
            <el-button @click="resetPassForm('modifyPasswordForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="myProfileOuterVisible = false">Close</el-button>
      </div>
    </el-dialog>
    <div id="taskListCon" v-if="role!=2">
      <el-card class="box-card" v-show="taskVisibleFlag" style="text-align:left;">
        <div class="per_task" @click="$router.push('/assignment')">Unassigned: <b>{{$store.state.taskList.Unassigned_nums}}</b></div>
        <div class="per_task" @click="$router.push('/translation?count=10&page=1')">Untranslated: <b>{{$store.state.taskList.Untranslated_nums}}</b></div>
        <div class="per_task" @click="$router.push('/retranslation?count=10&page=1')">Unretranslated: <b>{{$store.state.taskList['Unretranslated_nums']}}</b></div>
        <div class="per_task" @click="$router.push('/review?count=10&page=1')">Unreviewed: <b>{{$store.state.taskList.Approve_nums}}</b></div>
        <div class="per_task" @click="$router.push('/dashboard?tab=objection&count=10&page=1')">Unresolved: <b>{{$store.state.taskList.Conflict_nums}}</b></div>
      </el-card>
      <el-button round size="small" type="warning" @click="taskVisibleFlag=!taskVisibleFlag">My Task<el-badge :value="$store.state.taskList.Unassigned_nums+$store.state.taskList.Conflict_nums+$store.state.taskList.Untranslated_nums+$store.state.taskList['Unretranslated_nums']+$store.state.taskList.Approve_nums" :max="99" v-show="$store.state.taskList.Unassigned_nums+$store.state.taskList.Conflict_nums+$store.state.taskList.Untranslated_nums+$store.state.taskList['Unretranslated_nums']+$store.state.taskList.Approve_nums>0"></el-badge></el-button>
    </div>

  </el-container>
</template>

<script>
export default {
  mounted() {
    // var asideItem = $('.el-menu-vertical-demo .el-menu-item')
    // console.log(asideItem)
    // 防止用户手动刷新页面后侧边栏当前选中效果消失
    let currentPage = location.hash.split('/')[1]
    currentPage.split("?")?currentPage = currentPage.split("?")[0]:null
    this.selectMenu(currentPage)

    //根据当前浏览器的大小，动态生成侧边栏的高度和main的高度
    let winHeight = $(window).innerHeight()
    let headerHeight = parseInt($('#header').outerHeight())
    $('#asideUl').css('minHeight', winHeight-headerHeight+ 'px')
    // $('#main').css('height', backSection + 'px')
    // $('#main').css('minHeight',  winHeight-headerHeight-footerHeight + 'px')
    window.onresize = function(){
      // console.log(111)
      let winHeight = $(window).innerHeight()
      let headerHeight = parseInt($('#header').outerHeight())
      $('#asideUl').css('minHeight', winHeight-headerHeight+ 'px')
    }

    if(this.role!=='2'){
      // console.log(this.role)
      this.myMessage()
      // 启动任务检查定时器
      this.$taskListTimer = setInterval(() => {
        this.myMessage()
      }, 60000)
    }

  },
  beforeDestroy() {
  // 页面销毁时关闭消息定时器
    clearInterval(this.$taskListTimer)
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value != ''){
        if(this.modifyPasswordForm.newPass.length<6){
          callback(new Error('Password length cannot be less than 6.'))
        }else if (this.modifyPasswordForm.checkPass !== '') {
          this.$refs.modifyPasswordForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.modifyPasswordForm.newPass) {
        callback(new Error('The new password you typed twice do not match.'));
      } else {
        callback();
      }
    };
    return {
      role: Base64.decode(this.$cookies.get('role')),
      loginName: Base64.decode(this.$cookies.get('tname')),
      exitModal: false,
      asidedefaultOpened: ['projectManagement','translationManagement','reviewManagement','viewManagement'],
      // taskVisible: false,
      taskVisibleFlag:false,
      myProfileOuterVisible: false,
      innerVisible: false,
      personalInfo: {
        name: '',
        email: ''
      },
      personalInfoRules: {
        email: [
          { required: true, trigger: 'blur' }
        ],
        name: [
          { required: true, trigger: 'blur' }
        ]
      },
      modifyPasswordForm: {
        oldPass: '',
        newPass: '',
        checkPass: '',
      },
      passwordRules: {
        oldPass: [
          { required:true, trigger: 'blur', message: 'Old password is required.' }
        ],
        newPass: [
          { required:true, trigger: 'blur', message: 'New password is required.' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required:true, trigger: 'blur', message: 'New password is required.' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  computed:{
    newTaskSum(){
      return this.$store.state.taskList.Unassigned_nums+this.$store.state.taskList.Conflict_nums+this.$store.state.taskList.Untranslated_nums+this.$store.state.taskList['Unretranslated_nums']+this.$store.state.taskList.Approve_nums
    }
  },
  watch:{
    '$route.path':{
      handler(val,oldVal){
        // console.log(val)
        this.selectMenu(val.split('/')[1])
      },
      deep:true
    },
    '$store.state.taskList':{
      handler(val,oldVal){
        // console.log(val)
        // this.selectMenu(val.split('/')[1])
      },
      deep:true
    }
  },
  methods: {
    myMessage(){
      this.$http.post('/api/Statistic/Accout_task_nums').then(response=>{
        // console.log(response.data.result)
        // this.$store.state.taskList = response.data.result
        this.$store.state.taskList = response.data.result
        if((response.data.result.Unassigned_nums+response.data.result.Conflict_nums+response.data.result.Untranslated_nums+response.data.result.Unretranslated_nums+response.data.result.Approve_nums)!==0){
          // console.log(222)
          this.$message.info({
            customClass:'intervalNotifyWidth',
            dangerouslyUseHTMLString: true,
            message: `<div>
                <span style="display:inline-block;min-width:48%;">Unassigned: <b>${response.data.result.Unassigned_nums}</b>;</span>
                <span style="display:inline-block;min-width:48%;">Untranslated: <b>${response.data.result.Untranslated_nums}</b>;</span>
                <span style="display:inline-block;min-width:48%;">Unretranslated: <b>${response.data.result['Unretranslated_nums']}</b>;</span>
                <span style="display:inline-block;min-width:48%;">Unreviewed: <b>${response.data.result.Approve_nums}</b>;</span>
                <span style="display:inline-block;min-width:48%;">Unresolved: <b>${response.data.result.Conflict_nums}</b>;</span>
            </div>`,
          });
        }
      })
    },
    myDetail(){
      // this.$http.post('/api/getDetails').then(response=>{
      //   if(response.data.result){
      //     this.personalInfo.name=response.data.result.name
      //     this.personalInfo.email=response.data.result.email
      //   }
      // })

      this.personalInfo.name=Base64.decode(this.$cookies.get('tname'))
      this.personalInfo.email=this.$cookies.get('email')
      this.myProfileOuterVisible = true
    },
    submitPassForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/changepwd',qs.stringify({oldpassword:this.modifyPasswordForm.oldPass,newpassword:this.modifyPasswordForm.newPass})).then(response=>{
            if(response.data.success){
              this.innerVisible = false
              this.modifyPasswordForm.oldPass=''
              this.modifyPasswordForm.newPass=''
              this.modifyPasswordForm.checkPass=''
              this.$router.push('/login')
              this.$cookies.remove('pwd')
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetPassForm(formName) {
      this.$refs[formName].resetFields();
    },
    help(){
      window.open('/help/index.html','_blank')
      // window.open('','_blank').location.href = response.data.require
    },
    //退出登录
    logOut() {
      this.$confirm('Are you sure to sign out?', {
        title:'Sign Out',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose:false
      }).then(() => {
        this.$http.post('/api/logout').then(response=>{
          if(response.data.success){
            this.$cookies.get('Authorization') ? this.$cookies.remove('Authorization') : null
            this.$cookies.get('role') ? this.$cookies.remove('role') : null
            this.$cookies.get('tname') ? this.$cookies.remove('tname') : null
            this.$cookies.get('id') ? this.$cookies.remove('id') : null
            !this.$cookies.get('loginStatus')&&this.$cookies.get('tp') ? this.$cookies.remove('tp') : null
            this.$router.push('/login')
          }
        })
        
      })
    },
    //侧边栏菜单点击跳转页面
    selectMenu(index) {
      window.scrollTo(0,0);
      switch (index) {
        case 'dashboard':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/dashboard?tab='+(this.$route.query.tab||'allocation'))
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'projectlist':
          // this.$store.state.translateSearchForm = {}
          // console.log(this.$route)
          // console.log(JSON.stringify(this.$route.query)=='{}')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/projectlist?page=1'):this.$router.push({path:'/projectlist',query:this.$route.query})
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 1) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'addproject':
          // this.$router.push('/addproject')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 1) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'projectdetail':
          // this.$router.push('/addproject')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 1) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'assignment':
          // !this.$route.query.name?this.$router.push('/assignment'):this.$router.push('/assignment?id='+this.$route.query.id+'&name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/assignment'):this.$router.push({path:'/assignment',query:this.$route.query})
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 2) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        // case 'feedback':
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 3) {
        //       $(ele).css({'color': '#fff'}).children().css('color', '#fff')
        //     }else{
        //       $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        // case 'viewfeedback':
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 3) {
        //       $(ele).css({'color': '#fff'}).children().css('color', '#fff')
        //     }else{
        //       $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        case 't_overview':
          this.$router.push('/t_overview')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 3) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
          case 'translation':
          // !this.$route.query.name?this.$router.push('/translation'):this.$router.push('/translation?name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/translation?page=1'):this.$router.push({path:'/translation',query:this.$route.query})
          // this.$router.push('/translationlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 4) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
          case 'ontrans':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 4) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'retranslation':
          // !this.$route.query.name?this.$router.push('/retranslation'):this.$router.push('/retranslation?name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/retranslation?page=1'):this.$router.push({path:'/retranslation',query:this.$route.query})
          // this.$router.push('/retranslationlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 5) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'retrans':
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 5) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 't_history':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/t_history')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/t_history?page=1'):this.$router.push({path:'/t_history',query:this.$route.query})
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 6) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 't_browhistoryitem':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/t_browhistoryitem')
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 6) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'a_overview':
          // this.$store.state.translateSearchForm = {}
          this.$router.push('/a_overview')
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 7) {
              $(ele).css({'color': '#fff'}).children().css('color', '#fff')
            }else{
              $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
            }
          })
          break
        case 'review':
          // !this.$route.query.name?this.$router.push('/review'):this.$router.push('/review?name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/review?page=1'):this.$router.push({path:'/review',query:this.$route.query})
          // this.$router.push('/review')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 8) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'browreviewitem':
          // this.asidedefaultOpened.push('reviewManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 8) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'a_history':
          // this.asidedefaultOpened.push('reviewManagement')
          // this.$router.push('/a_history')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/a_history?page=1'):this.$router.push({path:'/a_history',query:this.$route.query})
          // this.$store.state.approveSearchForm = {}
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 9) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'a_browhistoryitem':
          // this.asidedefaultOpened.push('reviewManagement')
          // this.$router.push('/a_browhistoryitem')
          // this.$store.state.approveSearchForm = {}
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 9) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewlist':
          // this.$store.state.approveSearchForm = {}
          // console.log(this.$route.query)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/viewlist?page=1'):this.$router.push({path:'/viewlist',query:this.$route.query})
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewentry':
          // this.$store.state.approveSearchForm = {}
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'viewdetail':
          // this.$store.state.approveSearchForm = {}
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'v_history':
          // this.$store.state.approveSearchForm = {}
          // this.$router.push('/v_history')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/v_history?page=1'):this.$router.push({path:'/v_history',query:this.$route.query})
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
          case 'v_browhistoryitem':
          // this.$store.state.approveSearchForm = {}
          // this.$router.push('/v_browhistoryitem')
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        // case 'personalstatistics':
        //   this.$router.push('/personalstatistics?sta_pane='+(this.$route.query.sta_pane||'translator'))
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 13) {
        //       $(ele).css('color', '#fff').children().css('color', '#fff')
        //     }else{
        //       $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        case 'userinfo':
          // this.$router.push('/userinfo')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/userinfo?page=1'):this.$router.push({path:'/userinfo',query:this.$route.query})
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'adduser':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        case 'edituser':
          $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff')
            }else{
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
            }
          })
          break
        // case 'desc':
        //   this.$router.push('/desc')
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != $('.el-menu-vertical-demo .el-menu-item').length-1) {
        //       $(ele).css('color', '#fff').children().css('color', '#fff')
        //     }else{
        //       $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .sortMenu{
//   padding-left: 20px;
//   color:#fff;
//   font-weight:bold;
//   font-size:12px;
// }
</style>
