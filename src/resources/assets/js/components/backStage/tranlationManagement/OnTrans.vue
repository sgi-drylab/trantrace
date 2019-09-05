<template>
  <div id="onTransTaskMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="backUrl" v-if="$route.path==='/ontrans'">Translation</el-breadcrumb-item>
      <el-breadcrumb-item :to="backUrl" v-if="$route.path==='/retrans'">Retranslation</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path==='/ontrans'">Translate</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path==='/retrans'">Retranslate</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="onTransCon">
      <div>
        <el-tag type="info">Project Name: {{currentItem.product}}</el-tag>
        <el-tag type="info">Priority:
          <span v-if="currentItem.priority=='1'">Low</span>
          <span v-if="currentItem.priority=='2'">Normal</span>
          <span v-if="currentItem.priority=='3'" style="color:red">High</span>
        </el-tag>
        <el-tag type="info">Language: {{currentItem.lang}}</el-tag>
        <el-tag type="info">Owner: {{currentItem.allocate_users_name}}</el-tag>
        <el-tag type="info">Deadline: {{currentItem.deadline&&(currentItem.deadline.split(" ")[1])?currentItem.deadline.split(" ")[0]:currentItem.deadline}}</el-tag>
        <el-button type="success" size="small" id="submitBtn" @click='submit' v-if="currentItem.status==='Untranslated'||currentItem.status==='Unretranslated'">Submit</el-button>
        <div v-if="($route.path === '/retrans')">
        <el-alert :title="'Latest failed reason: '+currentItem.approve.tips" type="warning" :closable="false"></el-alert>
      </div>

      </div>
      <div id="transBox">
        <div class='boxTitleCon'>
          <p>Source</p>
          <p>Translation</p>
        </div>
        <div class="st_con">
          <el-card class="boxCard">
            <div id="rawDataText1" class="rawDataText" @click="execClick" @copy="execCopy($event,'rawDataText1')" title="click to copy content">{{currentItem.key}}</div>
            <div class="btnCon">
              <el-button type="primary" size="small" id="googleBtn1" @click="googleTrans(currentItem.key,'k')">Google</el-button>
            </div>
          </el-card>
          <el-card class="boxCard">
            <el-input id="afterDataText1" class="afterDataText" v-model="currentItem.targetKey" type="textarea" placeholder="enter translation"></el-input>
          </el-card>
        </div>
        <div v-for="(item,index) in JSON.parse(currentItem.translate)" :key="index" :name="index+2" class="st_con">
          <el-card class="boxCard">
            <div :id="'rawDataText'+(index+2)" class="rawDataText" @click="execClick" @copy="execCopy($event,'rawDataText'+(index+2))" title="click to copy content">{{item}}</div>
              <div class="btnCon">
                <el-button type="primary" size="small" :id="'googleBtn'+(index+2)" @click="googleTrans(item,index)">Google</el-button>
              </div>
            </el-card>
            <el-card class="boxCard">
              <el-input :id="'afterDataText'+(index+2)" class="afterDataText" v-model="currentItem.target[index]" type="textarea" placeholder="enter translation"></el-input>
            </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route);
    let obj = {}
    this.$route.query.name?obj.name = this.$route.query.name:null
    this.$route.query.key?obj.key = this.$route.query.key:null
    this.$route.query.priority?obj.priority = this.$route.query.priority:null
    this.$route.query.deadline?obj.deadline = this.$route.query.deadline:null
    this.$route.query.page?obj.page = this.$route.query.page:null
    // console.log(this.backUrl)
    if(this.$route.path==='/ontrans'){
      this.backUrl={path:'/translation',query:obj}
    }
    if(this.$route.path==='/retrans'){
      this.backUrl={path:'/retranslation',query:obj}
    }

    this.$http.post("/api/translate/translate_list",qs.stringify({
          id: this.$route.query.id,
          status:this.status
        })).then(response=>{
      // console.log(response.data)
      if(this.status==='Untranslated'){
        response.data.result.data.forEach(item=>{
          this.$set(item,'target',[])
          this.$set(item,'targetKey','')
        })
        // console.log(response.data.result.data[0].translate)
        JSON.parse(response.data.result.data[0].translate).forEach(item=>{
          // console.log(item)
          response.data.result.data[0].target.push('')
        })
      }
      if(this.status==='Unretranslated'){
        response.data.result.data.forEach(item=>{
          this.$set(item,'target',[])
          JSON.parse(item.approve.translate).forEach((item1,index)=>{
            item.target.push(item1[JSON.parse(item.translate)[index]])
          })
          this.$set(item,'targetKey',JSON.parse(item.approve.key)[0][item.key])
        })
      }
      
      // console.log(response.data.result.data)
      this.currentItem = response.data.result.data[0];
    })
  },
  data() {
    return {
      backUrl:'',
      copyFlag:false,
      currentItem: {
        translate:'[]',
        approve:{
          key:'[]',
          translate:'[]'
        }
      },
    }
  },
  computed:{
    status(){
      if(this.$route.path==='/ontrans'){
        return 'Untranslated'
      }else if(this.$route.path==='/retrans'){
        return 'Unretranslated'
      }else{
        return null
      }
    }
  },
  watch:{
    'currentItem.target':{
      handler(val,oldVal){
        
      },
      deep:true
    }
  },
  methods: {
    googleTrans(content,key) {

      // 判断内容中是否存在%，google不支持%

      if(content.includes('%')&&!this.copyFlag){
        // console.log(true)
        this.$message.warning("Please copy the text manually, since Google Translate site won't accept URLs with special characters.")
      }else{
        let c;
        let googleBtn;
        if(content.trim()){
          if(key==='k'){
            c = content.trim()
            googleBtn = $("#googleBtn1")
          }else{
            c = content.trim()
            googleBtn = $("#googleBtn"+(key+2))
          }
        }
        
        googleBtn.html('Opening..')
        let slang;
        let tlang;
        this.$http.post('/api/product/lang_list',qs.stringify({sl:this.currentItem.lang.split(" -> ")[0],tl:this.currentItem.lang.split(" -> ")[1]})).then(response=>{
          slang=response.data.result.sl_code
          tlang=response.data.result.tl_code
        })
        setTimeout(()=> {
          googleBtn.html('Google')
          window.open(
            'https://translate.google.cn/#view=home&op=translate&sl='+slang+'&tl='+tlang+'&text='+encodeURIComponent(c)
          )
          this.copyFlag = false
        }, 500)
      }
    },
    execClick(){
      document.execCommand("copy"); 
    },
    execCopy(event,id){
      let content = document.getElementById(id).textContent
      if(this.isIE()){ 
        if(window.clipboardData){ 
          window.clipboardData.setData("Text", content); 
          this.copyFlag = true
          // alert(window.clipboardData.getData("Text")); 
          this.$message.success('Successful copy!')
        } else{
          this.copyFlag = true
          this.$message.error('Please copy the content manually.')
        }
      }else{ 
        event.preventDefault(); 
        if (event.clipboardData) { 
          event.clipboardData.setData("text/plain",content); 
          this.copyFlag = true
          // alert(event.clipboardData.getData("text")); 
          this.$message.success('Successful copy!')
        }else{
          this.copyFlag = true
          this.$message.error('Please copy the content manually.')
        }
      } 
    }, 
    isIE(){ 
      var input = window.document.createElement ("input"); 
      //"!window.ActiveXObject" is evaluated to true in IE11 
      if (window.ActiveXObject === undefined) return null; 
      if (!window.XMLHttpRequest) return 6; 
      if (!window.document.querySelector) return 7; 
      if (!window.document.addEventListener) return 8; 
      if (!window.atob) return 9; 
      //"!window.document.body.dataset" is faster but the body is null when the DOM is not //ready. Anyway, an input tag needs to be created to check if IE is being //emulated 
      if (!input.dataset) return 10; 
      return 11; 
    },
    submit(){
      let flag1 = false
      let flag2 = false
      this.currentItem.target.forEach(item=>{
        // !(item&&item.trim())?flag1 = true:null
        item&&item.trim()?null:flag1 = true
      })
      this.currentItem.targetKey.trim()?null:flag2 = true
      // console.log(flag1);
      // console.log(flag2);
      if(flag1||flag2){
        this.$message({
          message: 'All fields must be translated before submission.',
          type: 'warning'
        })
        return false;
      }
      let obj = {}
      obj.translate_job_id = this.$route.query.id
      let keyObj={}
      keyObj[this.currentItem.key] = this.currentItem.targetKey
      obj.key_translation = JSON.stringify([keyObj])
      let transArr = []
      JSON.parse(this.currentItem.translate).forEach((item,index)=>{
        let a = {}
        a[item] = this.currentItem.target[index]
        transArr.push(a)
      })
      obj.fields_translation = JSON.stringify(transArr)
      obj.status = this.currentItem.status
      // console.log(obj);
      this.$http.post("/api/translate/translate",qs.stringify(obj)).then(response=>{
        setTimeout(()=>{
          if(this.$route.path==='/ontrans'){
            this.$store.state.taskList.Untranslated_nums -= 1
            this.$router.push(this.backUrl)
          }
          if(this.$route.path==='/retrans'){
            this.$store.state.taskList['Unretranslated_nums'] -= 1
            this.$router.push(this.backUrl)
          }
        }, 500)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
