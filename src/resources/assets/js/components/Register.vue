<template>
  <div id="register">
    <div id="formCon">
      <b-form id="registerForm" method="post" @submit="onSubmit">
        <b-form-group style="position:relative;">
          <b-link>
            <img src="/images/logo.png" title="Trantrace" height="50" width="180" alt="Trantrace Logo">
          </b-link>
          <div class="modeTitle">Sign Up</div>
          <div style="position:absolute;top:-40px;right:-40px;">
            <el-button size="small" type="text" plain @click.native="help" style="padding:5px;font-size:16px;color:#e6a23c"><i class="el-icon-question">Help</i></el-button>
          </div>
        </b-form-group>
        <b-form-group label="Email:" label-for="emailRegister">
          <b-form-input id="emailRegister" type="email" v-model.trim="registerForm.email" :state="emailState" required oninvalid="setCustomValidity('Email is required.');" oninput="setCustomValidity('');" placeholder="enter Email" title="Email is required.">
          </b-form-input>
          <b-form-invalid-feedback id="emailRegisterFeedback">
            Email address is invalid.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="User Name:" label-for="nameRegister">
          <b-form-input id="nameRegister" v-model.trim="registerForm.name" :state="nameState" required oninvalid="setCustomValidity('User Name is required.');" oninput="setCustomValidity('');" placeholder="enter user name" title="User Name is required.">
          </b-form-input>
          <b-form-invalid-feedback id="nameRegisterFeedback">
            Only letters (A-Za-z), numbers (0-9), dot (.), underscore (_), hyphen (-) are supported and maximum length is 50 characters.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Password:" label-for="pwdRegister">
          <b-form-input id="pwdRegister" type="password" v-model.trim="registerForm.password" :state="pwdState" required oninvalid="setCustomValidity('Password is required.');" oninput="setCustomValidity('');" placeholder="enter password" title="Password is required."></b-form-input>
          <b-form-invalid-feedback id="pwdRegisterFeedback">
            Password length cannot be less than 6.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Repeat the password:" label-for="c_pwdRegister">
          <b-form-input type="password" id="c_pwdRegister" v-model.trim="registerForm.c_password" :state="c_passwordState" required oninvalid="setCustomValidity('Repeat the password is required.');" oninput="setCustomValidity('');" placeholder="enter password again" title="Repeat the password is required."></b-form-input>
          <b-form-invalid-feedback id="c_pwdRegisterFeedback">
            The passwords you typed do not match.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox class="rememberStatus" plain id="agreeCheckbox" v-model.trim="registerForm.agree" value="accepted" unchecked-value="not_accepted" required @change="changeCheckbox" title="Please check this box if you want to proceed.">
            I accept 
            <b-link class="userTerm" href="https://opensource.org/licenses/MIT" target="_blank">the Term of Service</b-link>.
          </b-form-checkbox>
          <div class="formLink">
            Registered account?<b-link @click.prevent="$router.push('/login')">Sign In</b-link>
          </div>
          <!-- <div v-show="showAlert" style="color:#dc3545;font-size:14px;">
            {{alertTitle}}
          </div> -->
        </b-form-group>
        <b-form-group>
          <b-button class="registerBtn" type="submit" :variant="registerDisabled?'#aaa':'info'" :disabled="registerDisabled">Sign Up</b-button>
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
    $("#formCon").get(0).style.minHeight=window.innerHeight-30+"px"
    $("#formCon").get(0).style.height=$("#register").height()+10+"px"
    window.onresize = function(){
      $("#formCon").get(0).style.minHeight=window.innerHeight-30+"px"
    }
    // this.registerForm.name=""
    // this.registerForm.email=""
    // this.registerForm.password=""
    // this.registerForm.c_password=""
    document.getElementById("agreeCheckbox").setCustomValidity(document.getElementById("agreeCheckbox").validity.valueMissing ? "Please check this box if you want to proceed.":"");
  },
  data(){
    return{
      // showAlert:false,
      // alertTitle:'',
      registerForm: {
        name:'',
        email:'',
        password:'',
        c_password:'',
        agree:''
      }
    }
  },
  computed:{
    registerDisabled(){
      if((this.emailState&&this.nameState&&this.pwdState&&this.c_passwordState)){
        return false
      }else{
        return true
      }
    },
    emailState(){
      let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if(!this.registerForm.email){
        return null
      }else if(!reg.test(this.registerForm.email)){
        return false
      }else{
        return true
      }
    },
    nameState(){
      // let nameReg =  /^[A-Za-z]{2,20}$|^[\u4e00-\u9fa5]{2,20}$/;
      let nameReg =  /^[A-Za-z0-9-_.]{1,50}$/;
      if(!this.registerForm.name){
        return null
      }else if(!nameReg.test(this.registerForm.name)){
        return false
      }else{
        return true
      }
    },
    pwdState(){
      if(!this.registerForm.password){
        return null
      }else if(this.registerForm.password.length<6){
        return false
      }else{
        return true
      }
    },
    c_passwordState(){
      if(!this.registerForm.c_password){
        return null
      }else{
        return this.registerForm.c_password===this.registerForm.password?true : false
      }
    },
  },
  methods: {
    help(){
      window.open('/help/index.html','_blank')
      // window.open('','_blank').location.href = response.data.require
    },
    changeCheckbox(){
      document.getElementById("agreeCheckbox").setCustomValidity(document.getElementById("agreeCheckbox").validity.valueMissing ? "Please check this box if you want to proceed.":"");
    },
    onSubmit (evt) {
      evt.preventDefault();
      // console.log(this.registerForm)
      this.$http.post("/api/register",qs.stringify(this.registerForm)).then(response=>{
        // console.log(response.data)
        if(response.data.success.token){
          this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12)
          this.$cookies.set('email', this.registerForm.email, 60 * 60 * 12)
          this.$cookies.set('tname',Base64.encode(response.data.success.name),60*60*12)
          this.$cookies.set("tp",Base64.encode(this.registerForm.password), 60 * 60 * 12)
          this.$cookies.set('role',Base64.encode(response.data.success.role),60 * 60 * 12)
          this.$cookies.set('id',Base64.encode(response.data.success.id),60*60*12)
          this.$cookies.get('loginStatus')?this.$cookies.remove('loginStatus'):null
          this.$router.push("/dashboard")
        }
        this.$nextTick(()=>{
          //设置请求头
          this.$http.defaults.headers.common['Authorization'] = this.$cookies.get('Authorization')||'';
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  #emailRegister,
  #nameRegister,
  #pwdRegister,
  #c_pwdRegister {
    outline: none;
  }
</style>