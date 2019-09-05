<template>
  <div id="historyItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-if="$route.path !== '/v_browhistoryitem'" :to="backUrl">History</el-breadcrumb-item>
      <el-breadcrumb-item v-else :to="backUrl">Issues</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="historyItemCon">
      <div>
        <el-tag type="info">Project Name: {{currentItem.product}}</el-tag>
        <el-tag type="info">Language: {{currentItem.lang}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/t_browhistoryitem')||($route.path === '/a_browhistoryitem')">Status:
          <span v-if="currentItem.status==='Qualified'">Passed</span>
          <span v-else-if="currentItem.status==='Unretranslated'">Failed</span>
          <span v-else>{{currentItem.status}}</span>
        </el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">Status:
          <span v-if="currentItem.approved===2">Ignored</span>
          <span v-if="currentItem.approved===1">Agreed</span>
          <span v-if="currentItem.approved===0">Unresolved</span>
        </el-tag>
        <el-tag type="info" v-if="($route.path === '/t_browhistoryitem')">Translation Time: {{currentItem.created_at}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/a_browhistoryitem')">Review Time: {{currentItem.updated_at}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">Owner: {{currentItem.users_name}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">Creation Time: {{currentItem.created_at}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')&&(currentItem.approved!==0)">Reply Time: {{currentItem.advice_updated_at}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">Version: {{currentItem.version_name}}</el-tag>
        <el-tag type="info" v-if="($route.path === '/v_browhistoryitem')">Creator: {{currentItem.user_name}}</el-tag>

        <div style="display:inline-block;margin-bottom:5px;" v-if="($route.path === '/v_browhistoryitem')&&(currentItem.users_name===userName)&&(currentItem.approved===0)">
          <el-button type="success" size="small" id="redistributeBtn" @click='openAgreeModal(1)' v-if="currentItem.approved===0">Agree</el-button>
          <el-button type="danger" size="small" id="ignoreBtn" @click='openAgreeModal(0)' v-if="currentItem.approved===0">Ignore</el-button>
        </div>
      </div>
      <div v-if="($route.path === '/t_browhistoryitem')&&(currentItem.status==='Unretranslated')">
        <el-alert :title="'Failed reason: '+currentItem.tips" type="warning" :closable="false"></el-alert>
      </div>
      <div v-if="($route.path === '/a_browhistoryitem')&&(currentItem.status==='Unretranslated')">
        <el-alert :title="'Failed reason: '+currentItem.tips" type="warning" :closable="false"></el-alert>
      </div>
      <div v-if="($route.path === '/v_browhistoryitem')&&currentItem.objection">
        <el-alert :title="'Issue description: '+currentItem.objection" type="warning" :closable="false"></el-alert>
      </div>
      <div id="historyItemBox">
        <div class='boxTitleCon'>
          <p>Source</p>
          <p>Translation</p>
        </div>
        <div class="st_con">
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{Object.keys(JSON.parse(currentItem.key)[0])[0]}}</div>
          </el-card>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{JSON.parse(currentItem.key)[0][Object.keys(JSON.parse(currentItem.key)[0])[0]]}}</div>
          </el-card>
        </div>
        <div v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2" class="st_con">
          <el-card class="boxCard">
            <div :id="'rawDataText'+(index+2)" class="rawDataText">{{Object.keys(item)[0]}}</div>
          </el-card>
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText">{{item[Object.keys(item)[0]]}}</div>
          </el-card>
        </div>
      </div>
    </div>
    <el-dialog :title="agreeFlag===1?'Agree on Issue':'Ignore Issue'" width="35%" :visible.sync="dialogVisible">
        <div class="dialog_warning_text" v-if="agreeFlag===0">
          <i class="el-message__icon el-icon-warning"></i>
          <span>Are you sure to ignore this issue?</span>
        </div>
        <div class="dialog_warning_text" v-if="agreeFlag===1">
          <i class="el-message__icon el-icon-warning"></i>
          <span>You agree that translation is wrong and reassign it to translator.</span>
        </div>
        <!-- <b v-if="agreeFlag===0">Are you sure to ignore this issue?</b>
        <b v-if="agreeFlag===1">You agree that translation is wrong and reassign it to translator. <div>Please select a translator:</div></b> -->
        <el-form :model="distributeForm" :rules="rules" ref="distributeForm" class="demo-ruleForm" v-if="agreeFlag===1" @submit.native.prevent>
          <el-form-item prop="translate_users_name" label="Please select a translator:">
            <el-select v-model="distributeForm.translate_users_name" placeholder="" style="width:100%;">
              <el-option v-for="(item,index) in translators" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit">Yes</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route.query.id)

    new Promise((resolve,reject)=>{
      this.$route.path === '/t_browhistoryitem'?this.prePath = '/t_history':null
      this.$route.path === '/a_browhistoryitem'?this.prePath = '/a_history':null
      this.$route.path === '/v_browhistoryitem'?this.prePath = '/v_history':null

      this.$route.path === '/t_browhistoryitem'?this.url = '/api/translate/history':null
      this.$route.path === '/a_browhistoryitem'?this.url = '/api/approve/list':null
      this.$route.path === '/v_browhistoryitem'?this.url = '/api/view/list_conflict_all':null

      let obj = {}
      this.$route.query.name?obj.name = this.$route.query.name:null
      this.$route.query.key?obj.key = this.$route.query.key:null
      this.$route.query.status?obj.status = this.$route.query.status:null
      this.$route.query.page?obj.page = this.$route.query.page:null
      // console.log(this.backUrl)
      this.backUrl={path:this.prePath,query:obj}
      

      resolve()
    }).then(data=>{
      // console.log(this.url)
      this.$http.post(this.url,qs.stringify({
        id: this.$route.query.id,
        })).then(response=>{
        // console.log(response.data);
        this.currentItem = response.data.data[0];
        this.total = response.data.total;
      })
    })

    this.$http.post("/api/user/list").then(response=>{
      // console.log(response.data);
      this.userList=response.data.data;
    })
    

  },
  data() {
    return {
      userName:Base64.decode(this.$cookies.get('tname')),
      backUrl:'',
      prePath:'',
      url:'',
      currentItem: {
        key:'[{}]',
        translate:'[{}]'
      },
      dialogVisible:false,
      agreeFlag:null,
      userList:[],
      translators:[],
      distributeForm:{
        translate_users_name:'',
      },
      rules:{
        translate_users_name: [
          {
            required: true,
            message: 'Please select a translator.'
          }
        ],
      }
    }
  },
  methods: {
    openAgreeModal(agree){
      this.dialogVisible = true
      this.agreeFlag = agree
      if(agree===1){
        JSON.parse(this.currentItem.translate_users).forEach(item1=>{
          this.userList.forEach(item2=>{
            if(item1===item2.id){
              this.translators.push(item2)
              return false;
            }
          })
        })
      }
    },
    submit(){
      // 通过
      if(this.agreeFlag===1){
        this.$refs.distributeForm.validate((valid) => {
          if (valid) {
            // console.log(1111);
            this.$http.post("/api/approve/approve_conflict",qs.stringify({
              id: this.$route.query.id,
              approved: this.agreeFlag,
              translate_users_name:this.distributeForm.translate_users_name
            })).then(response=>{
              // console.log(response.data);
              setTimeout(()=>{
                this.$store.state.taskList.Conflict_nums -= 1
                this.$router.push(this.backUrl)
              }, 500)
            })
          }else{
            // console.log('error submit!!');
            return false;
          }
        })
      }
      //拒绝
      if(this.agreeFlag===0){
        this.$http.post("/api/approve/approve_conflict",qs.stringify({
          id: this.$route.query.id,
          approved: this.agreeFlag,
          translate_users_name:''
        })).then(response=>{
          // console.log(response.data);
          setTimeout(()=>{
            this.$store.state.taskList.Conflict_nums -= 1
            this.$router.push(this.backUrl)
          }, 500)
        })
      }
      
      
      
    }
  }
}
</script>

<style lang="less" scoped>

</style>
