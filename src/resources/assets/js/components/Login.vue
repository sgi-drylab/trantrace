<template>
  <div id="login">
    <div id="formCon">
      <b-form id="loginForm" @submit="onSubmit" @reset="onReset">
        <b-form-group style="position:relative;">
          <b-link>
            <img src="/images/logo.png" title="Trantrace" height="50" width="180" alt="Trantrace Logo">
          </b-link>
          <div class="modeTitle">Sign In</div>
          <div style="position:absolute;top:-40px;right:-40px;">
            <el-button size="small" type="text" plain @click.native="help" style="padding:5px;font-size:16px;color:#e6a23c"><i class="el-icon-question">Help</i></el-button>
          </div>
        </b-form-group>
        <b-form-group label="Email:" label-for="emailLogin">
          <b-form-input id="emailLogin" v-model.trim="loginForm.email" required oninvalid="setCustomValidity('Email is required.');" oninput="setCustomValidity('');" placeholder="enter email" title="Email is required.">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="pwdLogin">
          <b-form-input id="pwdLogin" type="password" v-model.trim="loginForm.password" required oninvalid="setCustomValidity('Password is required.');" oninput="setCustomValidity('');" placeholder="enter password" title="Password is required.">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox class="rememberStatus" plain id="remembercheckbox" v-model.trim="loginForm.status" value="remember" unchecked-value="forget">
            Remember
          </b-form-checkbox>
          <div class="formLink">
            <b-link @click.prevent="$router.push('/register')">Sign Up</b-link><b-link v-b-tooltip.focus title="Please contact administrator to reset your password.">Forgot password?</b-link>
          </div>
        </b-form-group>
        <b-form-group>
          <b-button class="submitBtn" type="submit" variant="info" :disabled="submitDisabled">Sign In</b-button>
          <b-button class="resetBtn" type="reset">Reset</b-button>
        </b-form-group>
      </b-form>
    </div>
    <footer>
      <div class="sectionCenter">Copyright {{new Date().getFullYear()}}</div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted(){
    this.myBrowser()
    $("#formCon").get(0).style.minHeight=window.innerHeight-30+"px"
    $("#formCon").get(0).style.height=$("#login").height()+10+"px"
    window.onresize = function(){
      $("#formCon").get(0).style.minHeight=window.innerHeight-30+"px"
    }

    if(this.$cookies.get('loginStatus')==='remember'){
      this.$cookies.get('email')?this.loginForm.email = this.$cookies.get('email'):this.loginForm.email = ''
      this.$cookies.get('tp')?this.loginForm.password = Base64.decode(this.$cookies.get('tp')):this.loginForm.password = ''
    }else{
      this.$cookies.remove('Authorization')
      this.$cookies.remove('permissionvue')
      this.$cookies.get('email')?this.loginForm.email = this.$cookies.get('email'):this.loginForm.email = ''

    }
  },
  data(){
    return{
      submitDisabled:false,
      loginForm: {
        email:'',
        password:'',
        status:'remember'
      }
    }
  },
  methods: {
    help(){
      window.open('/help/index.html','_blank')
      // window.open('','_blank').location.href = response.data.require
    },
    myBrowser() {
      // console.log(navigator.userAgent)
      let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
      let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
      let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
      let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

      // this.$message('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Edge (>=44), IE11.', {
      //     type:'warning',
      //     confirmButtonText: 'OK'
      //   });

      if (isOpera) {
        this.$message({
          message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
          type: 'warning',
          duration: 6000
        });
        // return "Opera";
      }else if (isEdge) {
        if(userAgent.match( /Edge\/([\d.]+)/ )[1].split('.')[0]<18){
           this.$message({
            message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
            type: 'warning',
            duration: 6000
          });
         }
      }else if (isFF) {
        if(userAgent.match( /Firefox\/([\d.]+)/ )[1].split('.')[0]<67){
          this.$message({
            message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
            type: 'warning',
            duration: 6000
          });
         }
      }else if (isSafari) {
        if(userAgent.match( /Safari\/([\d.]+)/ )[1].split('.')[0]<12){
          this.$message({
            message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
            type: 'warning',
            duration: 6000
          });
         }
      }else if (isChrome) {
        if((userAgent.match( /Chrome\/([\d.]+)/ )||userAgent.match( /CriOS\/([\d.]+)/ ))[1].split('.')[0]<70){
          this.$message({
            message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
            type: 'warning',
            duration: 6000
          });
         }
      }else if(window.navigator.userAgent.indexOf("MSIE")>=1){
        this.$message({
          message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
          type: 'warning',
          duration: 6000
        });
        }else if(!!window.ActiveXObject || "ActiveXObject" in window){
          // return "IE11"
        }else{
        // return userAgent
        this.$message({
          message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Safari (>=12), Edge (>=18), IE (>=11).',
          type: 'warning',
          duration: 6000
        });
      }
      
    },
    onSubmit (evt) {
      evt.preventDefault();
      this.submitDisabled = true;
      this.$http.post("/api/login",qs.stringify(this.loginForm)).then(response=>{
        // console.log(response.data)
        if(response.data.success){
          if(this.loginForm.status === 'remember'){
            this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12)
            this.$cookies.set('email',this.loginForm.email,60*60*12)
            this.$cookies.set('tname',Base64.encode(response.data.success.name),60*60*12)
            this.$cookies.set('tp',Base64.encode(this.loginForm.password),60*60*12)
            this.$cookies.set('loginStatus',this.loginForm.status,60*60*12)
            this.$cookies.set('role',Base64.encode(response.data.success.role),60*60*12)
            this.$cookies.set('id',Base64.encode(response.data.success.id),60*60*12)
          }else{
            this.$cookies.set('email',this.loginForm.email,60*60*12)
            this.$cookies.set('tname',Base64.encode(response.data.success.name),60*60*12)
            this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12)
            this.$cookies.set('role',Base64.encode(response.data.success.role),60*60*12)
            this.$cookies.set('id',Base64.encode(response.data.success.id),60*60*12)
            this.$cookies.remove('tp')
            this.$cookies.get('loginStatus')?this.$cookies.remove('loginStatus'):null
          }
          this.$nextTick(()=>{
            //设置请求头
            this.$http.defaults.headers.common['Authorization'] = this.$cookies.get('Authorization')||'';
          })
          // 1用户  2管理员
          if(response.data.success.role==2){
            this.$router.push("/userinfo")
          }else{
            this.$router.push("/dashboard")
          }
        }
        this.submitDisabled = false;
      }).catch(error=>{
        // console.log(error)
        this.submitDisabled = false;
      })
    },
    onReset (evt) {
      evt.preventDefault();
      this.loginForm.email = '';
      this.loginForm.password = '';
    },
  }
}
</script>
<style lang="less" scoped>
  #emailLogin,
  #pwdLogin {
    outline: none;
  }
  
</style>