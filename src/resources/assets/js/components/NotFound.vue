<template>
  <div id="notFoundMain">
    <p class="title">Not Found</p>
    <p>Sorry, the request path <span>{{path}}</span> does not exist, please check if the path is correct! <a @click="back" title="Click to return to the previous page">Go back to the previous page.</a></p>
  </div>

</template>

<script>
export default {
  mounted(){
    
  },
  data(){
    return {
      path:location.hash.substring(1,location.hash.length)
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
 
</style>

