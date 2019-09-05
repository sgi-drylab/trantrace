<template>
  <div id="notAuthMain">
    <p class="title">Not Authority</p>
    <p>Sorry, you do not have access to the website, please login first! <span>{{second}}</span>秒后 <a @click="login"  title="Click to jump to the login page">Jump to the login page.</a></p>
    
  </div>

</template>

<script>
export default {
  mounted(){
    this.timer = setInterval(()=>{
      this.second--
      // console.log(this.second)
      if(this.second===0){
        clearInterval(this.timer)
        this.$router.push("/login")
      }
    },1000)
    
  },
  beforeDestory(){
    clearInterval(this.timer)
  },
  data(){
    return {
      second:20,
      timer:null
    }
  },
  methods:{
    login(){
      clearInterval(this.timer)
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>
 
</style>

