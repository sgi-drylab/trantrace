<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',  
  // 和inject一起使用可以刷新页面（UploadBigFile.vue）
  provide(){
    return {
      reload:this.reload
    }
  },
  mounted(){
    // 文本溢出没有效果
  // $(".imitate_ellipsis").each(function(i){
  //   let divH = $(this).height();
  //   let $p = $("p",$(this)).eq(0)
  //   while ($p.outerHeight()>divH){
  //     $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\w)(\.\.\.)?$/,"..."))
  //   }
  // })
    // if(this.$cookies.get("role")==='1'&&this.$cookies.get("Authorization")){
    //   this.$router.push("/")
    // }else if(this.$cookies.get("role")==='4'&&this.$cookies.get("Authorization")){
    //   this.$router.push('/authority')
    // }else if(this.$cookies.get("role")==='3'&&this.$cookies.get("Authorization")){
    //   this.$router.push('/addsubject')
    // }else{
    //   this.$router.push('/'+location.hash.split('/')[1])
    // }
  },
  beforeUpdate(){
    this.$http.defaults.headers.common['Authorization'] = window.$cookies.get("Authorization")||'';
  },
  data(){
    return {
      
    }
  },
  methods:{
    
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#444;
  min-width:1180px;
}
body .el-table colgroup.gutter{
    display: table-cell!important;
}

</style>