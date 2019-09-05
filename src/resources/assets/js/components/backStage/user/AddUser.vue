<template>
  <div id="addUserMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userinfo?page=1' }">User Management</el-breadcrumb-item>
      <el-breadcrumb-item>Add New User</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="addUserDetail" class="clearfix">
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-position="left" label-width="120px" class="demo-addUserForm">
        <el-form-item type='Email' prop="email" label="Email">
          <div class="namePwdInp">
            <el-input v-model.trim="addUserForm.email"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="name" label="User Name">
          <div class="namePwdInp">
            <el-input v-model.trim="addUserForm.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addUserForm')">Submit</el-button>
          <el-button @click="resetForm('addUserForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log(this.$route.query.email)
    this.addUserForm.email=this.$route.query.email?this.$route.query.email:''
  },
  data() {
    return {
      addUserForm: {
        email: '',
        name:''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Email is required.',
            trigger: 'blur'
          },
          {
            validator:function(rule,value,callback){
              if(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value) == false){
                  callback(new Error("Email address is invalid."));
              }else{
                  callback();
              }
            }, trigger: 'blur'}
        ],
        name: [
          {
            required: true,
            message: 'User name is required.'
          },
          {
            validator:function(rule,value,callback){
              if(/^[A-Za-z0-9-_.]{1,50}$/.test(value) == false){
                  callback(new Error("Only letters (A-Za-z), numbers (0-9), dot (.), underscore (_), hyphen (-) are supported and maximum length is 50 characters."));
              }else{
                  callback();
              }
            }, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let addSubmitObj = {};
          addSubmitObj.name = this.addUserForm.name
          addSubmitObj.email = this.addUserForm.email
          this.$http.post("/api/User/addUser",qs.stringify(addSubmitObj)).then(response=>{
            // console.log(addSubmitObj);
             if(response.data.success){
               this.$router.push('/userinfo?page=1')
             }
          })
        } else {
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item{
  margin-bottom:30px;
}
</style>


