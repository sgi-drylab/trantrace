<template>
  <div id="viewDetailItemMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="backUrl2">Overview</el-breadcrumb-item>
      <el-breadcrumb-item :to="backUrl1">Entries</el-breadcrumb-item>
      <el-breadcrumb-item>View</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="viewDetailItemCon">
      <div>
        <el-tag type="info">Project Name:{{currentItem.product}}</el-tag>
        <el-tag type="info">Language:{{currentItem.lang}}</el-tag>
        <el-tag type="info">Status:{{currentItem.status}}</el-tag>
        <el-tag type="info">Version:{{currentItem.version_name}}</el-tag>
        <el-button type="warning" size="small" id="objectionBtn" @click='openAgreeModal' v-if="(currentItem.conflict===0)&&(this.newest_version_name===currentItem.version_name)">Open Issue</el-button>
        <span style="font-size:14px;color:red;margin-left:10px;" v-if="(currentItem.conflict===1)&&(this.newest_version_name===currentItem.version_name)&&(currentItem.status==='Qualified')">There is aleady an issue waiting for owner's reply.</span>
        <span style="font-size:14px;color:red;margin-left:10px;" v-if="(currentItem.conflict===1)&&(this.newest_version_name===currentItem.version_name)&&(currentItem.status==='Error')">The translation is being optimized.</span>
        <span style="font-size:14px;color:orange;margin-left:10px;" v-if="!(this.newest_version_name===currentItem.version_name)">Issue is only opened for latest version.</span>
      </div>
      <div id="viewDetailItemBox">
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
      <el-dialog title="Open Issue" :visible.sync="dialogVisible" width="30%">
        <div class="dialog_warning_text">
          <i class="el-message__icon el-icon-warning"></i>
          <span>Is this translation wrong?</span>
        </div>
        <el-form :model="tipsForm" :rules="rules" ref="tipsForm" class="demo-ruleForm">
          <el-form-item prop="tips" label="Please point out the error or submit your suggestion:">
            <el-input v-model="tipsForm.tips" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit">Yes</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery/dist/jquery.min.js'
export default {
  mounted(){
    let obj1 = {}
    this.$route.query.id?obj1.id = this.$route.query.id:null
    this.$route.query.key?obj1.key = this.$route.query.key:null
    this.$route.query.v?obj1.v = this.$route.query.v:null
    this.$route.query.page1?obj1.page1 = this.$route.query.page1:null
    this.$route.query.count1?obj1.count1 = this.$route.query.count1:null
    this.$route.query.name?obj1.name = this.$route.query.name:null
    this.$route.query.page?obj1.page = this.$route.query.page:null
    this.$route.query.count?obj1.count = this.$route.query.count:null
    this.backUrl1={path:'/viewentry',query:obj1}

    let obj2 = {}
    this.$route.query.name?obj2.name = this.$route.query.name:null
    this.$route.query.page?obj2.page = this.$route.query.page:null
    this.$route.query.count?obj2.count = this.$route.query.count:null
    this.backUrl2={path:'/viewlist',query:obj2}

    this.$http.post("/api/view/list_items",qs.stringify({
          product_id:this.$route.query.id,
          export_id:this.$route.query.eid
        })).then(response=>{
      // console.log(response.data);
      this.currentItem = response.data.result.data[0];
      this.newest_version_name = response.data.result.newest_version_name
    })
  },
  data() {
    return {
      backUrl1:'',
      backUrl2:'',
      currentItem: {
        key:'[{}]',
        translate:'[{}]'
      },
      newest_version_name:'',
      tipsForm:{
        tips:''
      },
      dialogVisible:false,
      rules:{
        tips: [
          {
            required: true,
            message: 'Please enter discription of issue.'
          }
        ],
      }
    }
  },
  methods: {
    openAgreeModal(){
      this.dialogVisible = true
    },
    submit(){
      this.$refs.tipsForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$http.post("/api/view/advise",qs.stringify({
            export_id: this.$route.query.eid,
            objection:this.tipsForm.tips
          })).then(response=>{
            // console.log(response.data);
            setTimeout(()=>{
              this.$router.push(this.backUrl1)
            }, 500)
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      })
      
    }
  }
}
</script>

<style lang="less" scoped>

</style>
