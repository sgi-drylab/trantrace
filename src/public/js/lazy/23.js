webpackJsonp([23],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/BackStage.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    // var asideItem = $('.el-menu-vertical-demo .el-menu-item')
    // console.log(asideItem)
    // 防止用户手动刷新页面后侧边栏当前选中效果消失
    var currentPage = location.hash.split('/')[1];
    currentPage.split("?") ? currentPage = currentPage.split("?")[0] : null;
    this.selectMenu(currentPage);

    //根据当前浏览器的大小，动态生成侧边栏的高度和main的高度
    var winHeight = $(window).innerHeight();
    var headerHeight = parseInt($('#header').outerHeight());
    $('#asideUl').css('minHeight', winHeight - headerHeight + 'px');
    // $('#main').css('height', backSection + 'px')
    // $('#main').css('minHeight',  winHeight-headerHeight-footerHeight + 'px')
    window.onresize = function () {
      // console.log(111)
      var winHeight = $(window).innerHeight();
      var headerHeight = parseInt($('#header').outerHeight());
      $('#asideUl').css('minHeight', winHeight - headerHeight + 'px');
    };

    if (this.role !== '2') {
      // console.log(this.role)
      this.myMessage();
      // 启动任务检查定时器
      this.$taskListTimer = setInterval(function () {
        _this.myMessage();
      }, 60000);
    }
  },
  beforeDestroy: function beforeDestroy() {
    // 页面销毁时关闭消息定时器
    clearInterval(this.$taskListTimer);
  },
  data: function data() {
    var _this2 = this;

    var validatePass = function validatePass(rule, value, callback) {
      if (value != '') {
        if (_this2.modifyPasswordForm.newPass.length < 6) {
          callback(new Error('Password length cannot be less than 6.'));
        } else if (_this2.modifyPasswordForm.checkPass !== '') {
          _this2.$refs.modifyPasswordForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = function validatePass2(rule, value, callback) {
      if (value !== _this2.modifyPasswordForm.newPass) {
        callback(new Error('The new password you typed twice do not match.'));
      } else {
        callback();
      }
    };
    return {
      role: Base64.decode(this.$cookies.get('role')),
      loginName: Base64.decode(this.$cookies.get('tname')),
      exitModal: false,
      asidedefaultOpened: ['projectManagement', 'translationManagement', 'reviewManagement', 'viewManagement'],
      // taskVisible: false,
      taskVisibleFlag: false,
      myProfileOuterVisible: false,
      innerVisible: false,
      personalInfo: {
        name: '',
        email: ''
      },
      personalInfoRules: {
        email: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, trigger: 'blur' }]
      },
      modifyPasswordForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      passwordRules: {
        oldPass: [{ required: true, trigger: 'blur', message: 'Old password is required.' }],
        newPass: [{ required: true, trigger: 'blur', message: 'New password is required.' }, { validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, trigger: 'blur', message: 'New password is required.' }, { validator: validatePass2, trigger: 'blur' }]
      }
    };
  },

  computed: {
    newTaskSum: function newTaskSum() {
      return this.$store.state.taskList.Unassigned_nums + this.$store.state.taskList.Conflict_nums + this.$store.state.taskList.Untranslated_nums + this.$store.state.taskList['Unretranslated_nums'] + this.$store.state.taskList.Approve_nums;
    }
  },
  watch: {
    '$route.path': {
      handler: function handler(val, oldVal) {
        // console.log(val)
        this.selectMenu(val.split('/')[1]);
      },

      deep: true
    },
    '$store.state.taskList': {
      handler: function handler(val, oldVal) {
        // console.log(val)
        // this.selectMenu(val.split('/')[1])
      },

      deep: true
    }
  },
  methods: {
    myMessage: function myMessage() {
      var _this3 = this;

      this.$http.post('/api/Statistic/Accout_task_nums').then(function (response) {
        // console.log(response.data.result)
        // this.$store.state.taskList = response.data.result
        _this3.$store.state.taskList = response.data.result;
        if (response.data.result.Unassigned_nums + response.data.result.Conflict_nums + response.data.result.Untranslated_nums + response.data.result.Unretranslated_nums + response.data.result.Approve_nums !== 0) {
          // console.log(222)
          _this3.$message.info({
            customClass: 'intervalNotifyWidth',
            dangerouslyUseHTMLString: true,
            message: "<div>\n                <span style=\"display:inline-block;min-width:48%;\">Unassigned: <b>" + response.data.result.Unassigned_nums + "</b>;</span>\n                <span style=\"display:inline-block;min-width:48%;\">Untranslated: <b>" + response.data.result.Untranslated_nums + "</b>;</span>\n                <span style=\"display:inline-block;min-width:48%;\">Unretranslated: <b>" + response.data.result['Unretranslated_nums'] + "</b>;</span>\n                <span style=\"display:inline-block;min-width:48%;\">Unreviewed: <b>" + response.data.result.Approve_nums + "</b>;</span>\n                <span style=\"display:inline-block;min-width:48%;\">Unresolved: <b>" + response.data.result.Conflict_nums + "</b>;</span>\n            </div>"
          });
        }
      });
    },
    myDetail: function myDetail() {
      // this.$http.post('/api/getDetails').then(response=>{
      //   if(response.data.result){
      //     this.personalInfo.name=response.data.result.name
      //     this.personalInfo.email=response.data.result.email
      //   }
      // })

      this.personalInfo.name = Base64.decode(this.$cookies.get('tname'));
      this.personalInfo.email = this.$cookies.get('email');
      this.myProfileOuterVisible = true;
    },
    submitPassForm: function submitPassForm(formName) {
      var _this4 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this4.$http.post('/api/changepwd', qs.stringify({ oldpassword: _this4.modifyPasswordForm.oldPass, newpassword: _this4.modifyPasswordForm.newPass })).then(function (response) {
            if (response.data.success) {
              _this4.innerVisible = false;
              _this4.modifyPasswordForm.oldPass = '';
              _this4.modifyPasswordForm.newPass = '';
              _this4.modifyPasswordForm.checkPass = '';
              _this4.$router.push('/login');
              _this4.$cookies.remove('pwd');
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetPassForm: function resetPassForm(formName) {
      this.$refs[formName].resetFields();
    },
    help: function help() {
      window.open('/help/index.html', '_blank');
      // window.open('','_blank').location.href = response.data.require
    },

    //退出登录
    logOut: function logOut() {
      var _this5 = this;

      this.$confirm('Are you sure to sign out?', {
        title: 'Sign Out',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false
      }).then(function () {
        _this5.$http.post('/api/logout').then(function (response) {
          if (response.data.success) {
            _this5.$cookies.get('Authorization') ? _this5.$cookies.remove('Authorization') : null;
            _this5.$cookies.get('role') ? _this5.$cookies.remove('role') : null;
            _this5.$cookies.get('tname') ? _this5.$cookies.remove('tname') : null;
            _this5.$cookies.get('id') ? _this5.$cookies.remove('id') : null;
            !_this5.$cookies.get('loginStatus') && _this5.$cookies.get('tp') ? _this5.$cookies.remove('tp') : null;
            _this5.$router.push('/login');
          }
        });
      });
    },

    //侧边栏菜单点击跳转页面
    selectMenu: function selectMenu(index) {
      window.scrollTo(0, 0);
      switch (index) {
        case 'dashboard':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/dashboard?tab='+(this.$route.query.tab||'allocation'))
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 0) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'projectlist':
          // this.$store.state.translateSearchForm = {}
          // console.log(this.$route)
          // console.log(JSON.stringify(this.$route.query)=='{}')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/projectlist?page=1'):this.$router.push({path:'/projectlist',query:this.$route.query})
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 1) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'addproject':
          // this.$router.push('/addproject')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 1) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'projectdetail':
          // this.$router.push('/addproject')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 1) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'assignment':
          // !this.$route.query.name?this.$router.push('/assignment'):this.$router.push('/assignment?id='+this.$route.query.id+'&name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/assignment'):this.$router.push({path:'/assignment',query:this.$route.query})
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 2) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        // case 'feedback':
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 3) {
        //       $(ele).css({'color': '#fff'}).children().css('color', '#fff')
        //     }else{
        //       $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        // case 'viewfeedback':
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 3) {
        //       $(ele).css({'color': '#fff'}).children().css('color', '#fff')
        //     }else{
        //       $(ele).css({'color': '#ffd04b'}).children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        case 't_overview':
          this.$router.push('/t_overview');
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 3) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'translation':
          // !this.$route.query.name?this.$router.push('/translation'):this.$router.push('/translation?name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/translation?page=1'):this.$router.push({path:'/translation',query:this.$route.query})
          // this.$router.push('/translationlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 4) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'ontrans':
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 4) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'retranslation':
          // !this.$route.query.name?this.$router.push('/retranslation'):this.$router.push('/retranslation?name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/retranslation?page=1'):this.$router.push({path:'/retranslation',query:this.$route.query})
          // this.$router.push('/retranslationlist')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 5) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'retrans':
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 5) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 't_history':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/t_history')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/t_history?page=1'):this.$router.push({path:'/t_history',query:this.$route.query})
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 6) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 't_browhistoryitem':
          // this.$store.state.translateSearchForm = {}
          // this.$router.push('/t_browhistoryitem')
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 6) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'a_overview':
          // this.$store.state.translateSearchForm = {}
          this.$router.push('/a_overview');
          // this.asidedefaultOpened.push('translationManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 7) {
              $(ele).css({ 'color': '#fff' }).children().css('color', '#fff');
            } else {
              $(ele).css({ 'color': '#ffd04b' }).children().css('color', '#ffd04b');
            }
          });
          break;
        case 'review':
          // !this.$route.query.name?this.$router.push('/review'):this.$router.push('/review?name='+this.$route.query.name)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/review?page=1'):this.$router.push({path:'/review',query:this.$route.query})
          // this.$router.push('/review')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 8) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'browreviewitem':
          // this.asidedefaultOpened.push('reviewManagement')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 8) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'a_history':
          // this.asidedefaultOpened.push('reviewManagement')
          // this.$router.push('/a_history')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/a_history?page=1'):this.$router.push({path:'/a_history',query:this.$route.query})
          // this.$store.state.approveSearchForm = {}
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 9) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'a_browhistoryitem':
          // this.asidedefaultOpened.push('reviewManagement')
          // this.$router.push('/a_browhistoryitem')
          // this.$store.state.approveSearchForm = {}
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 9) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'viewlist':
          // this.$store.state.approveSearchForm = {}
          // console.log(this.$route.query)
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/viewlist?page=1'):this.$router.push({path:'/viewlist',query:this.$route.query})
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'viewentry':
          // this.$store.state.approveSearchForm = {}
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'viewdetail':
          // this.$store.state.approveSearchForm = {}
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 10) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'v_history':
          // this.$store.state.approveSearchForm = {}
          // this.$router.push('/v_history')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/v_history?page=1'):this.$router.push({path:'/v_history',query:this.$route.query})
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'v_browhistoryitem':
          // this.$store.state.approveSearchForm = {}
          // this.$router.push('/v_browhistoryitem')
          // this.asidedefaultOpened.push('transManage')
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 11) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        // case 'personalstatistics':
        //   this.$router.push('/personalstatistics?sta_pane='+(this.$route.query.sta_pane||'translator'))
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != 13) {
        //       $(ele).css('color', '#fff').children().css('color', '#fff')
        //     }else{
        //       $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
        case 'userinfo':
          // this.$router.push('/userinfo')
          // JSON.stringify(this.$route.query)=='{}'?this.$router.push('/userinfo?page=1'):this.$router.push({path:'/userinfo',query:this.$route.query})
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'adduser':
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        case 'edituser':
          $('.el-menu-vertical-demo .el-menu-item').each(function (i, ele) {
            if (i != 0) {
              $(ele).css('color', '#fff').children().css('color', '#fff');
            } else {
              $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b');
            }
          });
          break;
        // case 'desc':
        //   this.$router.push('/desc')
        //   $('.el-menu-vertical-demo .el-menu-item').each(function(i, ele) {
        //     if (i != $('.el-menu-vertical-demo .el-menu-item').length-1) {
        //       $(ele).css('color', '#fff').children().css('color', '#fff')
        //     }else{
        //       $(ele).css('color', '#ffd04b').children().css('color', '#ffd04b')
        //     }
        //   })
        //   break
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6eee7d70\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/BackStage.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6eee7d70\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/BackStage.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-container",
    [
      _c("el-header", { attrs: { height: "60px", id: "header" } }, [
        _c("div", { staticClass: "homeLogo" }, [
          _c("img", {
            staticStyle: { cursor: "pointer" },
            attrs: {
              src: "/images/logo.png",
              alt: "Trantrace Logo",
              title: "Trantrace"
            },
            on: {
              click: function($event) {
                _vm.role == "2"
                  ? _vm.selectMenu("userinfo")
                  : _vm.selectMenu("dashboard")
              }
            }
          })
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "homeLogin" },
          [
            _c(
              "el-dropdown",
              { attrs: { trigger: "click" } },
              [
                _c("span", { staticClass: "el-dropdown-link" }, [
                  _c(
                    "span",
                    {
                      staticStyle: {
                        display: "inline-block",
                        "max-width": "300px",
                        overflow: "hidden",
                        "white-space": "nowrap",
                        "text-overflow": "ellipsis",
                        "vertical-align": "middle"
                      }
                    },
                    [_vm._v(_vm._s(_vm.loginName))]
                  ),
                  _vm._v(" "),
                  _c("i", { staticClass: "el-icon-arrow-down el-icon--right" })
                ]),
                _vm._v(" "),
                _c(
                  "el-dropdown-menu",
                  { attrs: { slot: "dropdown" }, slot: "dropdown" },
                  [
                    _c("el-dropdown-item", [
                      _c(
                        "div",
                        {
                          attrs: { size: "small" },
                          on: { click: _vm.myDetail }
                        },
                        [_vm._v("Profile")]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: function($event) {
                            return _vm.logOut($event)
                          }
                        }
                      },
                      [_vm._v("Sign Out")]
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticStyle: {
                  padding: "5px",
                  "font-size": "16px",
                  color: "#e6a23c"
                },
                attrs: { size: "small", type: "text", plain: "" },
                nativeOn: {
                  click: function($event) {
                    return _vm.help($event)
                  }
                }
              },
              [_c("i", { staticClass: "el-icon-question" }, [_vm._v("Help")])]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "el-container",
        { attrs: { id: "back_section" } },
        [
          _c(
            "el-aside",
            { attrs: { width: "220px" } },
            [
              _c(
                "el-row",
                { staticClass: "tac" },
                [
                  _c(
                    "el-menu",
                    {
                      staticClass: "el-menu-vertical-demo",
                      attrs: {
                        id: "asideUl",
                        height: "700px",
                        router: "",
                        "background-color": "#41babc",
                        "text-color": "#fff",
                        "active-text-color": "#ffd04b",
                        "default-openeds": _vm.asidedefaultOpened
                      }
                    },
                    [
                      _vm.role == "1"
                        ? _c(
                            "el-menu-item",
                            {
                              attrs: {
                                index: "dashboard",
                                route: {
                                  path: "/dashboard",
                                  query: {
                                    tab: "allocation",
                                    count: 10,
                                    page: 1
                                  }
                                }
                              }
                            },
                            [
                              _c(
                                "span",
                                { attrs: { slot: "title" }, slot: "title" },
                                [_vm._v("Dashboard")]
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == "1"
                        ? _c(
                            "el-submenu",
                            { attrs: { index: "projectManagement" } },
                            [
                              _c("template", { slot: "title" }, [
                                _c("span", [_vm._v("Project Management")])
                              ]),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "projectlist",
                                    route: {
                                      path: "/projectlist",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: {
                                        slot: "title",
                                        id: "projectlist"
                                      },
                                      slot: "title"
                                    },
                                    [_vm._v("Overview")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "assignment",
                                    route: { path: "/assignment" }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: {
                                        slot: "title",
                                        id: "assignment"
                                      },
                                      slot: "title"
                                    },
                                    [_vm._v("Assignment")]
                                  )
                                ]
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == "1"
                        ? _c(
                            "el-submenu",
                            { attrs: { index: "translationManagement" } },
                            [
                              _c("template", { slot: "title" }, [
                                _c("span", [_vm._v("Translation Management")])
                              ]),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "t_overview",
                                    route: {
                                      path: "/t_overview",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: {
                                        slot: "title",
                                        id: "t_overview"
                                      },
                                      slot: "title"
                                    },
                                    [_vm._v("Overview")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "translation",
                                    route: {
                                      path: "/translation",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: {
                                        slot: "title",
                                        id: "translation"
                                      },
                                      slot: "title"
                                    },
                                    [_vm._v("Translation")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "retranslation",
                                    route: {
                                      path: "/retranslation",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: {
                                        slot: "title",
                                        id: "retranslation"
                                      },
                                      slot: "title"
                                    },
                                    [_vm._v("Retranslation")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "t_history",
                                    route: {
                                      path: "/t_history",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: { slot: "title", id: "t_history" },
                                      slot: "title"
                                    },
                                    [_vm._v("History")]
                                  )
                                ]
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == "1"
                        ? _c(
                            "el-submenu",
                            { attrs: { index: "reviewManagement" } },
                            [
                              _c("template", { slot: "title" }, [
                                _c("span", [_vm._v("Review Management")])
                              ]),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "a_overview",
                                    route: {
                                      path: "/a_overview",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: {
                                        slot: "title",
                                        id: "a_overview"
                                      },
                                      slot: "title"
                                    },
                                    [_vm._v("Overview")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "review",
                                    route: {
                                      path: "/review",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: { slot: "title", id: "review" },
                                      slot: "title"
                                    },
                                    [_vm._v("Review")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "a_history",
                                    route: {
                                      path: "/a_history",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: { slot: "title", id: "a_history" },
                                      slot: "title"
                                    },
                                    [_vm._v("History")]
                                  )
                                ]
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == "1"
                        ? _c(
                            "el-submenu",
                            { attrs: { index: "viewManagement" } },
                            [
                              _c("template", { slot: "title" }, [
                                _c("span", [_vm._v("Released Projects")])
                              ]),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "viewlist",
                                    route: {
                                      path: "/viewlist",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: { slot: "title", id: "viewlist" },
                                      slot: "title"
                                    },
                                    [_vm._v("Projects")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-menu-item",
                                {
                                  attrs: {
                                    index: "v_history",
                                    route: {
                                      path: "/v_history",
                                      query: { count: 10, page: 1 }
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      attrs: { slot: "title", id: "v_history" },
                                      slot: "title"
                                    },
                                    [_vm._v("Issues")]
                                  )
                                ]
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == "2"
                        ? _c(
                            "el-menu-item",
                            {
                              attrs: {
                                index: "userinfo",
                                route: {
                                  path: "/userinfo",
                                  query: { count: 10, page: 1 }
                                }
                              }
                            },
                            [
                              _c(
                                "span",
                                {
                                  attrs: { slot: "title", id: "userinfo" },
                                  slot: "title"
                                },
                                [_vm._v("User Management")]
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-container",
            [
              _c(
                "el-main",
                {
                  staticStyle: { "padding-bottom": "100px" },
                  attrs: { id: "main" }
                },
                [
                  _c(
                    "transition",
                    { attrs: { name: "fade", mode: "out-in" } },
                    [_c("router-view")],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("el-footer", { attrs: { id: "footer" } }, [
        _vm._v(
          "Copyright " +
            _vm._s(new Date().getFullYear()) +
            " ( Recommend Using "
        ),
        _c("img", {
          staticStyle: {
            display: "inline-block",
            width: "15px",
            height: "15px",
            "vertical-align": "middle"
          },
          attrs: { src: "/images/chrome.jpg" }
        }),
        _vm._v(" Chrome Browser )")
      ]),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            width: "40%",
            title: "Profile",
            visible: _vm.myProfileOuterVisible,
            "close-on-click-modal": false
          },
          on: {
            "update:visible": function($event) {
              _vm.myProfileOuterVisible = $event
            }
          }
        },
        [
          _c("p", [
            _c("span", [_vm._v("Name: ")]),
            _c("span", { staticStyle: { "font-weight": "bold" } }, [
              _vm._v(_vm._s(_vm.personalInfo.name))
            ])
          ]),
          _vm._v(" "),
          _c("p", [
            _c("span", [_vm._v("Email: ")]),
            _c("span", { staticStyle: { "font-weight": "bold" } }, [
              _vm._v(_vm._s(_vm.personalInfo.email))
            ])
          ]),
          _vm._v(" "),
          _c(
            "p",
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: "small" },
                  on: {
                    click: function($event) {
                      _vm.innerVisible = true
                    }
                  }
                },
                [_vm._v("Change Password")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              attrs: {
                width: "40%",
                title: "Change Password",
                visible: _vm.innerVisible,
                "close-on-click-modal": false,
                "append-to-body": ""
              },
              on: {
                "update:visible": function($event) {
                  _vm.innerVisible = $event
                }
              }
            },
            [
              _c(
                "el-form",
                {
                  ref: "modifyPasswordForm",
                  staticClass: "demo-ruleForm",
                  attrs: {
                    model: _vm.modifyPasswordForm,
                    "status-icon": "",
                    rules: _vm.passwordRules,
                    "label-width": "180px"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "Old Password", prop: "oldPass" } },
                    [
                      _c("el-input", {
                        attrs: { type: "password", autocomplete: "off" },
                        model: {
                          value: _vm.modifyPasswordForm.oldPass,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.modifyPasswordForm,
                              "oldPass",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "modifyPasswordForm.oldPass"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "New Password", prop: "newPass" } },
                    [
                      _c("el-input", {
                        attrs: { type: "password", autocomplete: "off" },
                        model: {
                          value: _vm.modifyPasswordForm.newPass,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.modifyPasswordForm,
                              "newPass",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "modifyPasswordForm.newPass"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: { label: "Repeat New Password", prop: "checkPass" }
                    },
                    [
                      _c("el-input", {
                        attrs: { type: "password", autocomplete: "off" },
                        model: {
                          value: _vm.modifyPasswordForm.checkPass,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.modifyPasswordForm,
                              "checkPass",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "modifyPasswordForm.checkPass"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.submitPassForm("modifyPasswordForm")
                            }
                          }
                        },
                        [_vm._v("Change")]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          on: {
                            click: function($event) {
                              _vm.resetPassForm("modifyPasswordForm")
                            }
                          }
                        },
                        [_vm._v("Reset")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.myProfileOuterVisible = false
                    }
                  }
                },
                [_vm._v("Close")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.role != 2
        ? _c(
            "div",
            { attrs: { id: "taskListCon" } },
            [
              _c(
                "el-card",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.taskVisibleFlag,
                      expression: "taskVisibleFlag"
                    }
                  ],
                  staticClass: "box-card",
                  staticStyle: { "text-align": "left" }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "per_task",
                      on: {
                        click: function($event) {
                          _vm.$router.push("/assignment")
                        }
                      }
                    },
                    [
                      _vm._v("Unassigned: "),
                      _c("b", [
                        _vm._v(
                          _vm._s(_vm.$store.state.taskList.Unassigned_nums)
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "per_task",
                      on: {
                        click: function($event) {
                          _vm.$router.push("/translation?count=10&page=1")
                        }
                      }
                    },
                    [
                      _vm._v("Untranslated: "),
                      _c("b", [
                        _vm._v(
                          _vm._s(_vm.$store.state.taskList.Untranslated_nums)
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "per_task",
                      on: {
                        click: function($event) {
                          _vm.$router.push("/retranslation?count=10&page=1")
                        }
                      }
                    },
                    [
                      _vm._v("Unretranslated: "),
                      _c("b", [
                        _vm._v(
                          _vm._s(
                            _vm.$store.state.taskList["Unretranslated_nums"]
                          )
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "per_task",
                      on: {
                        click: function($event) {
                          _vm.$router.push("/Review?count=10&page=1")
                        }
                      }
                    },
                    [
                      _vm._v("Unreviewed: "),
                      _c("b", [
                        _vm._v(_vm._s(_vm.$store.state.taskList.Approve_nums))
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "per_task",
                      on: {
                        click: function($event) {
                          _vm.$router.push(
                            "/dashboard?tab=objection&count=10&page=1"
                          )
                        }
                      }
                    },
                    [
                      _vm._v("Unresolved: "),
                      _c("b", [
                        _vm._v(_vm._s(_vm.$store.state.taskList.Conflict_nums))
                      ])
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { round: "", size: "small", type: "warning" },
                  on: {
                    click: function($event) {
                      _vm.taskVisibleFlag = !_vm.taskVisibleFlag
                    }
                  }
                },
                [
                  _vm._v("My Task"),
                  _c("el-badge", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          _vm.$store.state.taskList.Unassigned_nums +
                            _vm.$store.state.taskList.Conflict_nums +
                            _vm.$store.state.taskList.Untranslated_nums +
                            _vm.$store.state.taskList["Unretranslated_nums"] +
                            _vm.$store.state.taskList.Approve_nums >
                          0,
                        expression:
                          "$store.state.taskList.Unassigned_nums+$store.state.taskList.Conflict_nums+$store.state.taskList.Untranslated_nums+$store.state.taskList['Unretranslated_nums']+$store.state.taskList.Approve_nums>0"
                      }
                    ],
                    attrs: {
                      value:
                        _vm.$store.state.taskList.Unassigned_nums +
                        _vm.$store.state.taskList.Conflict_nums +
                        _vm.$store.state.taskList.Untranslated_nums +
                        _vm.$store.state.taskList["Unretranslated_nums"] +
                        _vm.$store.state.taskList.Approve_nums,
                      max: 99
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6eee7d70", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6eee7d70\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/BackStage.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6eee7d70\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/BackStage.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("4a8aef9e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6eee7d70\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BackStage.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6eee7d70\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BackStage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/BackStage.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6eee7d70\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/BackStage.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/BackStage.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6eee7d70\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/BackStage.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6eee7d70"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\BackStage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6eee7d70", Component.options)
  } else {
    hotAPI.reload("data-v-6eee7d70", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});