import Vue from 'vue'
import router from './router';
import axios from 'axios'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.prototype.$http = axios
window.qs = require('qs')

// 请求拦截器
axios.interceptors.request.use(config=> {
  NProgress.start();
  return config;
}, err=> {
  // console.log(err)
    Message.error({ message: 'Request timed out!'});
  return Promise.resolve(err);
})

// 返回拦截器
axios.interceptors.response.use(data=> {
  NProgress.done();
  // token 已过期，重定向到登录页面
  if (data.data.code == 4){
    localStorage.clear()
    router.push('/401')
  }
  // console.log(data)
  if (data.status && data.status === 200) {
    // console.log(data.data)
    if(data.data.error){
      Message.error({message: JSON.stringify(data.data.error).replace(/'|"|{|}|\[|\]/g,'')});
    }else if (data.data.success) {  //判断类型为了防止重要数据外泄，比如登录成功会返回用户的信息
      Message.success({ message: data.data.success.msg ? data.data.success.msg : data.data.success});
    } else if (typeof (data.data.message) === "string") {
      Message.info({ message: data.data.message});
    }else{
      return data;
    }
    // return data;
  }
  if (data.status && data.status === 202) {
    // console.log(data.data)
    // console.log(Object.values(data.data.error))
    if(data.data.error){
      Message.error({ message:Object.values(data.data.error)[0][0]})
    }else{
      return data;
    }
    // return data;
  }
  return data;
}, err=> {
  if (err && err.response) {
    // console.log(err.response.data)
    switch (err.response.status) {
      case 400:
        Message.error({ message:'Request error!'})
        break;
      case 401:
        if(err.response.data.error.translate_import){
          if(err.response.data.error.translate_import.onstructor===Array){
            Message.error({ message:err.response.data.error.translate_import.join()})
          }else{
            Message.error({ message:err.response.data.error.translate_import})
          }
        }else if(err.response.data.error==='Unauthenticated.'||err.response.data.message==='Unauthenticated.'){
          Message.error({ message:'No access, please login!'})
          router.push('/401')
        }else if(err.response.data.error){
          Message.error({message:JSON.stringify(err.response.data.error).replace(/'|"|{|}|\[|\]/g,'')})
        }else{
          Message.error({ message: JSON.stringify(err.response.data.message).replace(/'|"|{|}|\[|\]/g, '') ||'Request failed!'})
        }
        break;
      case 403:
        Message.error({ message:'Server denied access!'})
        router.push('/401')
        break;
      case 404:
        Message.error({ message:`Requested address error: ${err.response.config.url}`})
        router.push('/404')
        break;
      case 408:
        Message.error({ message:'Request timed out!'})
        break;
      case 500:
        Message.error({ message:'Server internal error!'})
        break;
      case 501:
        Message.error({ message:'Service not implemented!'})
        break;
      case 502:
        Message.error({ message:'Gateway error!'})
        break;
      case 503:
        Message.error({ message:'Service is not available!'})
        break;
      case 504:
        Message.error({ message:'Gateway timeout!'})
        break;
      case 505:
        Message.error({ message:'HTTP version is not supported!'})
        break;
      default:
    }
  }

  return Promise.resolve(err);

})

// 后台返回的token
axios.defaults.headers.common['Authorization'] = window.$cookies.get("Authorization")||'';
// 用户权限（字符串格式）
// axios.defaults.headers.common['permissionvue'] = window.$cookies.get("permissionvue")||'';

