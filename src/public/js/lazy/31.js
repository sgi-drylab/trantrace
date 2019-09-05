webpackJsonp([31],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue":
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

    var obj = {};
    this.$route.query.name ? obj.name = this.$route.query.name : null;
    this.$route.query.priority ? obj.priority = this.$route.query.priority : null;
    this.$route.query.deadline ? obj.deadline = this.$route.query.deadline : null;
    this.$route.query.page ? obj.page = this.$route.query.page : null;
    // console.log(this.backUrl)
    this.backUrl = { path: '/projectlist', query: obj };

    switch (this.$route.query.pane) {
      case 'info':
        this.activeName = 'info';
        break;
      case 'schedule':
        this.activeName = 'schedule';
        break;
      case 'upload':
        this.activeName = 'upload';
        break;
      case 'export':
        this.activeName = 'export';
        break;
    }
    // console.log(this)
    new Promise(function (resolve, reject) {
      _this.$http.post("/api/user/list").then(function (response) {
        // console.log(response.data);
        _this.userList = response.data.data;
        resolve('success');
      }).catch(function (err) {
        reject('Request failed!');
      });
    }).then(function (data) {
      _this.projectDetail();
    }, function (error) {
      // 这里的error是上面reject()里的值
      // console.log(error);
    });
    this.$http.post("/api/Statistic/ProductAccount", qs.stringify({ product_id: this.$route.query.id })).then(function (response) {
      // console.log((response.data.result.total_nums-response.data.result.Unassigned)/response.data.result.total_nums)
      response.data.result.allocationPercentage = response.data.result.total_nums ? parseInt((response.data.result.total_nums - response.data.result.Unassigned) / response.data.result.total_nums * 10000) / 100 : 0;
      response.data.result.translationPercentage = response.data.result.total_nums ? parseInt((response.data.result.Qualified + response.data.result.Unreviewed) / response.data.result.total_nums * 10000) / 100 : 0;
      response.data.result.approvalPercentage = response.data.result.total_nums ? parseInt(response.data.result.Qualified / response.data.result.total_nums * 10000) / 100 : 0;
      _this.statisticInfo = response.data.result;
    });
    this.$http.post('/api/Statistic/Accout_task_p', qs.stringify({ product_id: this.$route.query.id })).then(function (response) {
      _this.translatorsStatistics = response.data.result['static_t'];
      var total = 0;
      for (var k in response.data.result['static_a']) {
        if (k !== "Unreviewed") {
          for (var aa in response.data.result['static_a'][k]) {
            // console.log(response.data.result['static_a'][k][aa])
            if (aa === 'Qualified') {

              total += response.data.result['static_a'][k][aa];
            }
          }
          _this.approversStatistics[k] = response.data.result['static_a'][k];
          // this.approversStatistics[k].Unreviewed = response.data.result.Unreviewed?response.data.result.Unreviewed:0
        }
      }
      total += response.data.result['static_a'].Unreviewed ? response.data.result['static_a'].Unreviewed : 0;
      _this.reviewerTotal = total;
      // console.log(this.approversStatistics)
    });
    this.$http.post("/api/Import/import_list", qs.stringify({ product_id: this.$route.query.id })).then(function (response) {
      // console.log(response.data.data)
      _this.importList = response.data.data;
      _this.importVersionLoading = false;
    });
  },
  data: function data() {
    var _this2 = this;

    var validateProject = function validateProject(rule, value, callback) {
      // console.log(this)
      var nameReg = /^[A-Za-z0-9-_]{2,20}$/;
      if (!nameReg.test(value)) {
        callback(new Error("Only letters (A-Za-z), numbers (0-9), underscore (_), hyphen (-) are supported."));
      } else if (value.length < 2) {
        callback(new Error("Cannot be less than two characters in length."));
      } else if (value.length > 20) {
        callback(new Error("Cannot exceed 20 characters in length."));
      } else {
        callback();
      }
    };
    var validateLang = function validateLang(rule, value, callback) {
      // console.log(this)
      if (_this2.editProjectForm.slang === '') {
        callback(new Error("Please select source language."));
      } else if (_this2.editProjectForm.tlang === '') {
        callback(new Error("Please select target language."));
      } else if (_this2.editProjectForm.slang === _this2.editProjectForm.tlang) {
        callback(new Error("Source and target language can't be the same."));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate: function disabledDate(date) {
          // console.log(date)
          return date && date.valueOf() <= Date.now();
        }
      },
      backUrl: '',
      ownInfoObj: {},
      editDialogVisible: false,
      langList: [],
      langCurrentPage: 1,
      langPageSize: 30,
      langTotal: 0,
      langList2: [],
      langCurrentPage2: 1,
      langPageSize2: 30,
      langTotal2: 0,
      editProjectForm: {
        product: '',
        attribute: '',
        priority: '',
        deadline: '',
        lang: '',
        slang: '',
        tlang: '',
        product_desc: ''
      },
      activeName: 'info',
      statisticsFlag: false,
      translatorsStatistics: {},
      approversStatistics: {},
      importVersionLoading: true,
      importList: [],
      importTotal: 0,
      exportVersionLoading: true,
      versionList: [{ version_name: '' }],
      versionsTotal: 0,
      currentProject: {},
      userList: [],
      // remainingUserList:[],
      statisticInfo: {
        allocationPercentage: 0,
        translationPercentage: 0,
        approvalPercentage: 0
      },
      reviewerTotal: 0,
      // translatorList:[],
      // approverList:[],
      // viewerList:[],
      translatorMembersFlag: false,
      approverMembersFlag: false,
      viewerMembersFlag: false,
      addMembersForm: {
        translate_users: [],
        approve_users: [],
        viewed_users: []
      },
      dialogVisible: false,
      newVersionID: 1.0,
      dialogUploadVisible: false,
      resultVisible: false,
      uploadLoadingFlag: false,
      uploadResult: {
        success_nums: 0,
        Duplicate_key: [],
        nullkey: [],
        overmuch: []
      },
      uploadProjectId: null,
      uploadFile: {},
      rules: {
        product: [{
          required: true,
          message: 'Please enter product name.'
        }, { validator: validateProject, trigger: 'blur' }],
        attribute: [{
          required: true,
          message: 'Please enter attribute.'
        }],
        priority: [{
          required: true,
          message: 'Please enter priority.'
        }],
        lang: [{
          required: true,
          message: 'Please select language.'
        }, { validator: validateLang, trigger: 'blur' }],
        deadline: [{
          required: true,
          message: 'Please select deadline.'
        }]
      }
    };
  },

  watch: {
    'versionList': {
      handler: function handler(val) {},

      deep: true
    },
    'currentProject': {
      handler: function handler(val) {},

      deep: true
    },
    'editProjectForm.slang': {
      handler: function handler(val, oldVal) {
        this.editProjectForm.lang = this.editProjectForm.slang + ' -> ' + this.editProjectForm.tlang;
      },

      deep: true
    },
    'editProjectForm.tlang': {
      handler: function handler(val, oldVal) {
        this.editProjectForm.lang = this.editProjectForm.slang + ' -> ' + this.editProjectForm.tlang;
      },

      deep: true
    },
    'translatorsStatistics': {
      handler: function handler(val) {},

      deep: true
    },
    'approversStatistics': {
      handler: function handler(val) {},

      deep: true
    }
    // 'addMembersForm.translate_users':{
    //   handler(val,oldVal){
    //     // console.log(val,oldVal);
    //     //增加
    //     if(val.length>oldVal.length){
    //       this.currentProject.remainingUserList.forEach(item=>{
    //         if((val[val.length-1]===item.id)&&(item.email!=this.$cookies.get('email'))){
    //           item.status='t'
    //         }
    //       })
    //     }else{ //减少
    //       //找出减少的哪个id
    //       let id ;
    //       oldVal.forEach((item,index)=>{
    //         val.indexOf(item)<0?id = item:null
    //       })
    //       // console.log(id);
    //       this.currentProject.remainingUserList.forEach(item=>{
    //         if(id===item.id){
    //           item.status=''
    //         }
    //       })
    //     }
    //   },
    //   deep:true
    // },
    // 'addMembersForm.approve_users':{
    //   handler(val,oldVal){
    //     // console.log(val);
    //     //增加
    //     if(val.length>oldVal.length){
    //       this.currentProject.remainingUserList.forEach(item=>{
    //         if((val[val.length-1]===item.id)&&(item.email!=this.$cookies.get('email'))){
    //           item.status='a'
    //         }
    //       })
    //     }else{ //减少
    //       //找出减少的哪个id
    //       let id ;
    //       oldVal.forEach((item,index)=>{
    //         val.indexOf(item)<0?id = item:null
    //       })
    //       // console.log(id);
    //       this.currentProject.remainingUserList.forEach(item=>{
    //         if(id===item.id){
    //           item.status=''
    //         }
    //       })
    //     }

    //   },
    //   deep:true
    // },
    // 'addMembersForm.viewed_users':{
    //   handler(val,oldVal){
    //     // console.log(val);
    //     //增加
    //     if(val.length>oldVal.length){
    //       this.currentProject.remainingUserList.forEach(item=>{
    //         if((val[val.length-1]===item.id)&&(item.email!=this.$cookies.get('email'))){
    //           item.status='v'
    //         }
    //       })
    //     }else{ //减少
    //       //找出减少的哪个id
    //       let id ;
    //       oldVal.forEach((item,index)=>{
    //         val.indexOf(item)<0?id = item:null
    //       })
    //       // console.log(id);
    //       this.currentProject.remainingUserList.forEach(item=>{
    //         if(id===item.id){
    //           item.status=''
    //         }
    //       })
    //     }

    //   },
    //   deep:true
    // }
  },
  methods: {
    projectDetail: function projectDetail() {
      var _this3 = this;

      this.$http.post("/api/product/details", qs.stringify({ product_id: this.$route.query.id })).then(function (response) {
        // console.log(response.data.data;
        response.data.data.forEach(function (item) {
          _this3.$set(item, 'translatorName', []);
          _this3.$set(item, 'approverName', []);
          _this3.$set(item, 'viewerName', []);
          _this3.$set(item, 'remainingTranslatorList', []);
          _this3.$set(item, 'remainingApproverList', []);
          _this3.$set(item, 'remainingViewerList', []);
          // console.log(object);
          JSON.parse(item.translate_users).forEach(function (item1) {
            _this3.userList.forEach(function (item2) {
              item1 === item2.id ? item.translatorName.push(item2.name) : null;
            });
          });
          JSON.parse(item.approve_users).forEach(function (item11) {
            _this3.userList.forEach(function (item22) {
              item11 === item22.id ? item.approverName.push(item22.name) : null;
            });
          });
          if (!item.viewed_users) {
            item.viewed_users = '[]';
          }
          JSON.parse(item.viewed_users).forEach(function (item111) {
            _this3.userList.forEach(function (item222) {
              item111 === item222.id ? item.viewerName.push(item222.name) : null;
            });
          });

          _this3.userList.forEach(function (item00) {
            var flag1 = false;
            var flag2 = false;
            var flag3 = false;
            // 分别排除已存在
            JSON.parse(item.translate_users).forEach(function (item11) {
              // console.log(item11)
              item00.id === item11 ? flag1 = true : null;
            });
            !flag1 ? item.remainingTranslatorList.push(item00) : null;

            JSON.parse(item.approve_users).forEach(function (item22) {
              // console.log(item11)
              item00.id === item22 ? flag2 = true : null;
            });
            !flag2 ? item.remainingApproverList.push(item00) : null;

            JSON.parse(item.viewed_users).forEach(function (item33) {
              // console.log(item11)
              item00.id === item33 ? flag3 = true : null;
            });
            !flag3 ? item.remainingViewerList.push(item00) : null;

            // console.log(item00.email)
            //排除已存在
            // let flag = false
            // if(item00.email!=this.$cookies.get('email')){
            //   JSON.parse(item.translate_users).forEach(item11=>{
            //     // console.log(item11)
            //     item00.id === item11?flag = true:null
            //   })
            //   JSON.parse(item.approve_users).forEach(item11=>{
            //     item00.id === item11?flag = true:null
            //   })
            //   JSON.parse(item.viewed_users).forEach(item11=>{
            //     item00.id === item11?flag = true:null
            //   })
            //   if(!flag){
            //     item00.status = ''
            //     // 此时remainingUserList是没有own的，需要在visibleChange方法中判断要不要添加或者删除own
            //     item.remainingUserList.push(item00)
            //   }
            // }else{
            //   item00.status = ''
            //   this.ownInfoObj=item00
            // }
          });
        });

        _this3.versionList = response.data.data;
        _this3.versionsTotal = response.data.total;
        _this3.currentProject = response.data.data[0];
        _this3.exportVersionLoading = false;
      });
    },
    handleClick: function handleClick(tab, event) {
      // console.log(tab.name);
      this.$router.push({ path: '/projectdetail', query: { id: this.$route.query.id, pane: tab.name } });
    },
    deleteProject: function deleteProject() {
      var _this4 = this;

      this.$confirm('Are you sure to delete this project?', {
        title: 'Delete',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false
      }).then(function () {
        _this4.$http.post("/api/product/delete_p", qs.stringify({
          id: _this4.$route.query.id
        })).then(function (response) {
          if (response.data.success) {
            _this4.$router.push(_this4.backUrl);
          } else {
            _this4.$message('Failed to delete!');
          }
        });
      }).catch(function () {});
    },
    openEditProject: function openEditProject() {
      var _this5 = this;

      this.editDialogVisible = true;
      this.editProjectForm.product = this.currentProject.product;
      this.editProjectForm.attribute = this.currentProject.attribute;
      this.editProjectForm.priority = this.currentProject.priority;
      this.editProjectForm.deadline = this.currentProject.deadline;
      this.editProjectForm.product_desc = this.currentProject.product_desc;
      this.editProjectForm.slang = this.currentProject.lang.split(' -> ')[0];
      this.editProjectForm.tlang = this.currentProject.lang.split(' -> ')[1];
      this.$http.post("/api/product/lang_list", qs.stringify({ count: 30 })).then(function (response) {
        _this5.langList = response.data.data;
        _this5.langList2 = response.data.data;
        _this5.langTotal = response.data.total;
        _this5.langTotal2 = response.data.total;
      });
    },
    handleCurrentPage: function handleCurrentPage(val) {
      var _this6 = this;

      // console.log(val)
      this.langCurrentPage = val;
      this.$http.post("/api/product/lang_list", qs.stringify({ page: val, count: this.langPageSize })).then(function (response) {
        _this6.langList = response.data.data;
        _this6.langTotal = response.data.total;
      });
    },
    handleCurrentPage2: function handleCurrentPage2(val) {
      var _this7 = this;

      // console.log(val)
      this.langCurrentPage2 = val;
      this.$http.post("/api/product/lang_list", qs.stringify({ page: val, count: this.langPageSize2 })).then(function (response) {
        _this7.langList2 = response.data.data;
        _this7.langTotal2 = response.data.total;
      });
    },
    remoteMethod1: function remoteMethod1(query) {
      var _this8 = this;

      // console.log(query)
      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage, count: this.langPageSize, query_l: query })).then(function (response) {
        _this8.langList = response.data.data;
        _this8.langTotal = response.data.total;
      });
    },
    blurMethod1: function blurMethod1() {
      var _this9 = this;

      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage, count: this.langPageSize })).then(function (response) {
        _this9.langList = response.data.data;
        _this9.langTotal = response.data.total;
      });
    },
    remoteMethod2: function remoteMethod2(query) {
      var _this10 = this;

      // console.log(query)
      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage2, count: this.langPageSize2, query_l: query })).then(function (response) {
        _this10.langList2 = response.data.data;
        _this10.langTotal2 = response.data.total;
      });
    },
    blurMethod2: function blurMethod2() {
      var _this11 = this;

      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage2, count: this.langPageSize2 })).then(function (response) {
        _this11.langList2 = response.data.data;
        _this11.langTotal2 = response.data.total;
      });
    },
    submitProject: function submitProject(formName) {
      var _this12 = this;

      this.$refs[formName].validate(function (valid) {
        // console.log(this.editProjectForm);
        if (valid) {
          var obj = {
            id: _this12.$route.query.id,
            product: _this12.editProjectForm.product,
            attribute: _this12.editProjectForm.attribute,
            priority: _this12.editProjectForm.priority,
            deadline: _this12.editProjectForm.deadline,
            product_desc: _this12.editProjectForm.product_desc,
            lang: _this12.editProjectForm.slang + ' -> ' + _this12.editProjectForm.tlang
            // console.log(obj);
          };_this12.$http.post("/api/product/edit_product", qs.stringify(obj)).then(function (response) {
            if (response.data.success) {
              _this12.editDialogVisible = false;
              _this12.projectDetail();
            }
          });
        }
      });
    },
    membersEdit: function membersEdit() {
      this.translatorMembersFlag = true;
      this.approverMembersFlag = true;
      this.viewerMembersFlag = true;
    },
    memberCancel: function memberCancel() {
      this.translatorMembersFlag = false;
      this.approverMembersFlag = false;
      this.viewerMembersFlag = false;
    },
    allSubmitMembers: function allSubmitMembers() {
      var _this13 = this;

      var arr = [];
      var obj = {};
      obj.id = this.$route.query.id;
      if (this.addMembersForm.translate_users.length !== 0) {
        obj.users = JSON.stringify(this.addMembersForm.translate_users);
        obj.role = 'translator';
        arr.push(obj);
      }
      var obj1 = {};
      obj1.id = this.$route.query.id;
      if (this.addMembersForm.approve_users.length !== 0) {
        obj1.users = JSON.stringify(this.addMembersForm.approve_users);
        obj1.role = 'reviewer';
        arr.push(obj1);
      }
      var obj2 = {};
      obj2.id = this.$route.query.id;
      if (this.addMembersForm.viewed_users.length !== 0) {
        obj2.users = JSON.stringify(this.addMembersForm.viewed_users);
        obj2.role = 'viewer';
        arr.push(obj2);
      }
      if (arr.length === 0) {
        this.translatorMembersFlag = false;
        this.approverMembersFlag = false;
        this.viewerMembersFlag = false;
      } else {
        arr.forEach(function (item, index) {
          _this13.$http.post('/api/product/add_t_ap', qs.stringify({ id: _this13.$route.query.id, users: item.users, role: item.role })).then(function (response) {
            // if(response.data.success){
            //   this.translatorMembersFlag=false
            //   this.approverMembersFlag=false
            //   this.viewerMembersFlag=false
            //   this.addMembersForm.translate_users=[]
            //   this.addMembersForm.approve_users=[]
            //   this.addMembersForm.viewed_users=[]
            //   this.projectDetail()
            // }
            if (response.data.success) {
              _this13.translatorMembersFlag = false;
              _this13.approverMembersFlag = false;
              _this13.viewerMembersFlag = false;
              switch (item.role) {
                case 'translator':
                  _this13.addMembersForm.translate_users = [];
                  break;
                case 'reviewer':
                  _this13.addMembersForm.approve_users = [];
                  break;
                case 'viewer':
                  _this13.addMembersForm.viewed_users = [];
                  break;
              }
              if (index === arr.length - 1) {
                _this13.projectDetail();
              }
            }
          });
        });
      }
    },
    submitMembers: function submitMembers(role) {
      var _this14 = this;

      var obj = {};
      obj.id = this.$route.query.id;
      switch (role) {
        case 'translator':
          if (this.addMembersForm.translate_users.length !== 0) {
            obj.users = JSON.stringify(this.addMembersForm.translate_users);
            obj.role = role;
          }
          break;
        case 'reviewer':
          if (this.addMembersForm.approve_users.length !== 0) {
            obj.users = JSON.stringify(this.addMembersForm.approve_users);
            obj.role = role;
          }
          break;
        case 'viewer':
          if (this.addMembersForm.viewed_users.length !== 0) {
            obj.users = JSON.stringify(this.addMembersForm.viewed_users);
            obj.role = role;
          }
          break;
      }
      if (JSON.parse(obj.users).length !== 0) {
        this.$http.post('/api/product/add_t_ap', qs.stringify(obj)).then(function (response) {
          if (response.data.success) {
            switch (role) {
              case 'translator':
                _this14.translatorMembersFlag = false;
                _this14.addMembersForm.translate_users = [];
                _this14.projectDetail();
                break;
              case 'reviewer':
                _this14.approverMembersFlag = false;
                _this14.addMembersForm.approve_users = [];
                _this14.projectDetail();
                break;
              case 'viewer':
                _this14.viewerMembersFlag = false;
                _this14.addMembersForm.viewed_users = [];
                _this14.projectDetail();
                break;
            }
          }
        });
      } else {
        switch (role) {
          case 'translator':
            this.translatorMembersFlag = false;
            this.addMembersForm.translate_users = [];
            this.projectDetail();
            break;
          case 'reviewer':
            this.approverMembersFlag = false;
            this.addMembersForm.approve_users = [];
            this.projectDetail();
            break;
          case 'viewer':
            this.viewerMembersFlag = false;
            this.addMembersForm.viewed_users = [];
            this.projectDetail();
            break;
        }
        this.$message({
          message: 'No one is selected!',
          type: 'warning'
        });
      }
    },
    visibleChange: function visibleChange(mode, event) {
      // console.log(event)
      // 判断当前条目要不要添加或者删除own
      // if(event){
      //   switch(mode){
      //     case 't':
      //       let flag1=false
      //       JSON.parse(this.currentProject.translate_users).forEach(item=>{
      //         Base64.decode(this.$cookies.get('id'))==item?flag1=true:null
      //       })
      //       flag1?(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?this.currentProject.remainingUserList.splice(this.currentProject.remainingUserList.indexOf(this.ownInfoObj),1):null):(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?null:this.currentProject.remainingUserList.push(this.ownInfoObj))
      //     break;
      //     case 'a':
      //       let flag2=false
      //       JSON.parse(this.currentProject.approve_users).forEach(item=>{
      //         Base64.decode(this.$cookies.get('id'))==item?flag2=true:null
      //       })
      //       flag2?(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?this.currentProject.remainingUserList.splice(this.currentProject.remainingUserList.indexOf(this.ownInfoObj),1):null):(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?null:this.currentProject.remainingUserList.push(this.ownInfoObj))
      //     break;
      //     case 'v':
      //       let flag3=false
      //       JSON.parse(this.currentProject.viewed_users).forEach(item=>{
      //         Base64.decode(this.$cookies.get('id'))==item?flag3=true:null
      //       })
      //       flag3?(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?this.currentProject.remainingUserList.splice(this.currentProject.remainingUserList.indexOf(this.ownInfoObj),1):null):(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?null:this.currentProject.remainingUserList.push(this.ownInfoObj))
      //     break;
      //   }
      // }

    },
    changeUser: function changeUser(mode, list) {
      // switch(mode){
      //   case 't':
      //     list.forEach(item=>{
      //       this.currentProject.remainingUserList.forEach(item1=>{
      //         if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
      //           item1.status='t'
      //         }
      //       })
      //     })
      //   break;
      //   case 'a':
      //     list.forEach(item=>{
      //       this.currentProject.remainingUserList.forEach(item1=>{
      //         if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
      //           item1.status='a'
      //         }
      //       })
      //     })
      //   break;
      //   case 'v':
      //     list.forEach(item=>{
      //       this.currentProject.remainingUserList.forEach(item1=>{
      //         if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
      //           item1.status='v'
      //         }
      //       })
      //     })
      //   break;
      // }
    },
    downloadImportFile: function downloadImportFile(item) {
      var _this15 = this;

      var winDowload = window.open('', '_self');
      this.$confirm('Are you sure to download this file uploaded at ' + item.updated_at + '?', {
        title: 'Download',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false
      }).then(function () {
        _this15.$http.post("/api/Import/export_import", qs.stringify({ id: item.id })).then(function (response) {
          if (response.data.require) {

            var timer = setTimeout(winDowload.location.href = response.data.require, 800);
            clearTimeout(timer);
          }
          if (response.data.error) {
            _this15.$message.warning("Download failed!" + response.data.error);
          }
        });
      });
    },
    openExportVersionModal: function openExportVersionModal() {
      if (this.currentProject.version_name) {
        this.newVersionID = Number(this.currentProject.version_name.substr(1)) + 0.1;
      } else {
        this.newVersionID = 1.0;
      }
      this.dialogVisible = true;
    },
    exportQualified: function exportQualified() {
      var _this16 = this;

      var winDowload = window.open('', '_self');
      this.$http.post("/api/export/qualifiedexport", qs.stringify({ product_id: this.$route.query.id, version_name: Number.isInteger(this.newVersionID) ? 'V' + this.newVersionID + '.0' : 'V' + this.newVersionID })).then(function (response) {
        // console.log(response.data.result.file)
        if (response.data.result.file) {
          // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
          // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
          // winDowload.location.href = response.data.require
          var timer = setTimeout(winDowload.location.href = response.data.result.file, 800);
          clearTimeout(timer);
          _this16.versionList.unshift(response.data.result.getbyversion[0]);
          if (_this16.versionList.length > 10) {
            _this16.versionList.splice(_this16.versionList.length - 1, 1);
          }
          _this16.versionsTotal = _this16.versionsTotal + 1;
          _this16.currentProject = response.data.result.getbyversion[0];

          _this16.dialogVisible = false;
        }
        if (response.data.error) {
          _this16.$Message.warning("Export failed!" + response.data.error);
        }
      });
    },
    exportHistoryVersion: function exportHistoryVersion(version_name) {
      var _this17 = this;

      // console.log(version_name)
      var winDowload = window.open('', '_self');
      this.$confirm('Are you sure to download ' + version_name + '?', {
        title: 'Download',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false
      }).then(function () {
        _this17.$http.post("/api/export/oldversion", qs.stringify({ product_id: _this17.$route.query.id, version_name: version_name })).then(function (response) {
          if (response.data.require) {
            // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
            // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
            // window.open('','_self').location.href = response.data.require
            var timer = setTimeout(winDowload.location.href = response.data.require, 800);
            clearTimeout(timer);
          }
          if (response.data.error) {
            _this17.$message.warning("Export failed!" + response.data.error);
          }
        });
      });
    },
    importCurrentChange: function importCurrentChange(val) {
      var _this18 = this;

      this.$http.post("/api/Import/import_list", qs.stringify({ product_id: this.$route.query.id, page: val })).then(function (response) {
        // console.log(response.data.data)
        _this18.importList = response.data.data;
        _this18.importVersionLoading = false;
      });
    },
    versionCurrentChange: function versionCurrentChange(val) {
      var _this19 = this;

      this.$http.post("/api/product/details", qs.stringify({ product_id: this.$route.query.id, page: val })).then(function (response) {
        // console.log(response.data.data;
        _this19.versionList = response.data.data;
        _this19.versionsTotal = response.data.total;
      });
    },
    downloadFileFormat: function downloadFileFormat() {
      var _this20 = this;

      this.$http.post("/api/translate/download").then(function (response) {
        if (response.data.require) {
          // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
          // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
          window.open('', '_self').location.href = response.data.require;
        } else {
          _this20.$message.warning("Export failed, please try again later.");
        }
      });
    },
    openUploadModal: function openUploadModal() {
      this.dialogUploadVisible = true;
      this.uploadProjectId = this.$route.query.id;
    },
    closeResultModal: function closeResultModal() {
      this.resultVisible = false;
      this.dialogUploadVisible = false;
      this.uploadResult = {
        success_nums: 0,
        Duplicate_key: [],
        nullkey: [],
        overmuch: []
      };
    },
    closeUploadModal: function closeUploadModal() {
      this.uploadProjectId = null;
      this.dialogUploadVisible = false;
      $("#translateUpload").val("");
      this.uploadFile = {};
    },
    viewAllocationList: function viewAllocationList() {
      this.$router.push({ path: '/assignment', query: { id: this.$route.query.id, name: this.currentProject.product, status: 'Unassigned', count: 10, page: 1 } });
    },
    viewIssuesList: function viewIssuesList() {
      this.$router.push({ path: '/v_history', query: { name: this.currentProject.product, status: '0', count: 10, page: 1 } });
    },
    changeImportFile: function changeImportFile(event) {
      // console.log(event.target.files[0]);
      if (/\.csv$|\.tsv$|\.xls$|\.xlsx$/.test(event.target.files[0].name)) {
        if (/^[A-Za-z0-9-_.]/.test(event.target.files[0].name.split('.')[0])) {
          this.uploadFile = event.target.files[0];
          this.uploadLoadingFlag = true;
          this.submitUpload();
        } else {
          // 清除file的value
          this.uploadFile = {};
          $("#translateUpload").val('');
          this.$message.warning("File name is limited to letters (A-Za-z), numbers (0-9), dot (.), hypen (-), and underscore (_).");
        }
      } else {
        // 清除file的value
        this.uploadFile = {};
        $("#translateUpload").val('');
        this.$message.warning("File type is limited to csv, tsv, xls, and xlsx.");
      }
    },
    procductImport: function procductImport() {
      $("#translateUpload").trigger("click");
    },
    submitUpload: function submitUpload() {
      var _this21 = this;

      // this.$refs.upload.submit();
      // let formFileData = new FormData(document.getElementById("translateUpload"))
      // console.log(document.getElementById("translateUpload"))
      // console.log($("#translateUpload")[0])
      var formFileData = new FormData();
      formFileData.append("translate_import", this.uploadFile);
      formFileData.append("product_id", this.uploadProjectId);
      // console.log(formFileData.get('translate_import'));
      this.$http.post("/api/translate/import", formFileData, { headers: {
          'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata
        } }).then(function (response) {
        _this21.uploadLoadingFlag = false;
        _this21.uploadFile = '';
        if (response.data.result) {
          _this21.resultVisible = true;
          _this21.uploadResult = response.data.result;
          // 刷新导入历史列表
          _this21.$http.post("/api/Import/import_list", qs.stringify({ product_id: _this21.$route.query.id, page: 1 })).then(function (response) {
            // console.log(response.data.data)
            _this21.importList = response.data.data;
            _this21.importVersionLoading = false;
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-800d61ce\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-800d61ce\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "projectDetailMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
            _vm._v("Overview")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("Detail")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "projectDetailCon" } },
        [
          _c(
            "el-tabs",
            {
              on: { "tab-click": _vm.handleClick },
              model: {
                value: _vm.activeName,
                callback: function($$v) {
                  _vm.activeName = $$v
                },
                expression: "activeName"
              }
            },
            [
              _c(
                "el-tab-pane",
                { attrs: { label: "Setting", name: "info" } },
                [
                  _c(
                    "el-card",
                    { staticClass: "box-card", attrs: { shadow: "always" } },
                    [
                      _c(
                        "div",
                        { attrs: { slot: "header" }, slot: "header" },
                        [
                          _c("span", { staticClass: "cardTitle" }, [
                            _vm._v("Setting")
                          ]),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              staticClass: "operationBtn",
                              attrs: { size: "large", type: "text" },
                              on: { click: _vm.openEditProject }
                            },
                            [_vm._v("Edit")]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              staticClass: "operationBtn",
                              staticStyle: { color: "orange" },
                              attrs: { size: "large", type: "text" },
                              on: { click: _vm.deleteProject }
                            },
                            [_vm._v("Delete")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "infoItemCon" }, [
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Project Name: "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.currentProject.product))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Owner: "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.currentProject.users_name))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Priority: \n              "),
                          _vm.currentProject.priority == "1"
                            ? _c("span", [_vm._v("Low")])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.currentProject.priority == "2"
                            ? _c("span", [_vm._v("Normal")])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.currentProject.priority == "3"
                            ? _c("span", { staticStyle: { color: "red" } }, [
                                _vm._v("High")
                              ])
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Visibility: "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.currentProject.attribute))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Creation Date: "),
                          _c("span", [
                            _vm._v(
                              _vm._s(
                                _vm.currentProject.created_at &&
                                _vm.currentProject.created_at.split(" ")[1]
                                  ? _vm.currentProject.created_at.split(" ")[0]
                                  : _vm.currentProject.created_at
                              )
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Deadline: "),
                          _c("span", [
                            _vm._v(
                              _vm._s(
                                _vm.currentProject.deadline &&
                                _vm.currentProject.deadline.split(" ")[1]
                                  ? _vm.currentProject.deadline.split(" ")[0]
                                  : _vm.currentProject.deadline
                              )
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Language: "),
                          _c("span", [_vm._v(_vm._s(_vm.currentProject.lang))])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "infoItem" }, [
                          _vm._v("Description: "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.currentProject.product_desc))
                          ])
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-card",
                    { staticClass: "box-card", attrs: { shadow: "always" } },
                    [
                      _c(
                        "div",
                        { attrs: { slot: "header" }, slot: "header" },
                        [
                          _c("span", { staticClass: "cardTitle" }, [
                            _vm._v("Add Member")
                          ]),
                          _vm._v(" "),
                          !_vm.translatorMembersFlag &&
                          !_vm.approverMembersFlag &&
                          !_vm.viewerMembersFlag
                            ? _c(
                                "el-button",
                                {
                                  staticClass: "operationBtn",
                                  attrs: { size: "large", type: "text" },
                                  on: { click: _vm.membersEdit }
                                },
                                [_vm._v("Edit")]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.translatorMembersFlag ||
                          _vm.approverMembersFlag ||
                          _vm.viewerMembersFlag
                            ? _c(
                                "el-button",
                                {
                                  staticClass: "operationBtn submitBtn",
                                  attrs: { size: "large", type: "text" },
                                  on: { click: _vm.allSubmitMembers }
                                },
                                [_vm._v("Submit All")]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.translatorMembersFlag ||
                          _vm.approverMembersFlag ||
                          _vm.viewerMembersFlag
                            ? _c(
                                "el-button",
                                {
                                  staticClass: "operationBtn cancelBtn",
                                  attrs: { size: "large", type: "text" },
                                  on: { click: _vm.memberCancel }
                                },
                                [_vm._v("Cancel")]
                              )
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form",
                        {
                          ref: "addMembersForm",
                          attrs: {
                            model: _vm.addMembersForm,
                            "label-position": "left",
                            "label-width": "100px"
                          }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                prop: "translate_users",
                                label: "Translator"
                              }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "membersInput" },
                                [
                                  _c(
                                    "div",
                                    _vm._l(
                                      _vm.currentProject.translatorName,
                                      function(item, index) {
                                        return _c(
                                          "span",
                                          {
                                            key: index,
                                            staticStyle: {
                                              "margin-right": "6px"
                                            }
                                          },
                                          [_vm._v(_vm._s(item))]
                                        )
                                      }
                                    )
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      attrs: {
                                        disabled: !_vm.translatorMembersFlag,
                                        placeholder: "select translator",
                                        multiple: "",
                                        filterable: ""
                                      },
                                      on: {
                                        "visible-change": function($event) {
                                          _vm.visibleChange("t", $event)
                                        },
                                        change: function($event) {
                                          _vm.changeUser("t", $event)
                                        }
                                      },
                                      model: {
                                        value:
                                          _vm.addMembersForm.translate_users,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.addMembersForm,
                                            "translate_users",
                                            $$v
                                          )
                                        },
                                        expression:
                                          "addMembersForm.translate_users"
                                      }
                                    },
                                    _vm._l(
                                      _vm.currentProject
                                        .remainingTranslatorList,
                                      function(item, index) {
                                        return _c("el-option", {
                                          key: "Translator" + index,
                                          attrs: {
                                            label: item.name,
                                            value: item.id
                                          }
                                        })
                                      }
                                    )
                                  ),
                                  _vm._v(" "),
                                  _vm.translatorMembersFlag
                                    ? _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            size: "medium",
                                            type: "warning"
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.submitMembers("translator")
                                            }
                                          }
                                        },
                                        [_vm._v("Submit")]
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                prop: "approve_users",
                                label: "Reviewer"
                              }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "membersInput" },
                                [
                                  _c(
                                    "div",
                                    _vm._l(
                                      _vm.currentProject.approverName,
                                      function(item, index) {
                                        return _c(
                                          "span",
                                          {
                                            key: index,
                                            staticStyle: { margin: "6px" }
                                          },
                                          [_vm._v(_vm._s(item))]
                                        )
                                      }
                                    )
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      attrs: {
                                        disabled: !_vm.approverMembersFlag,
                                        placeholder: "select reviewer",
                                        multiple: "",
                                        filterable: ""
                                      },
                                      on: {
                                        "visible-change": function($event) {
                                          _vm.visibleChange("a", $event)
                                        },
                                        change: function($event) {
                                          _vm.changeUser("a", $event)
                                        }
                                      },
                                      model: {
                                        value: _vm.addMembersForm.approve_users,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.addMembersForm,
                                            "approve_users",
                                            $$v
                                          )
                                        },
                                        expression:
                                          "addMembersForm.approve_users"
                                      }
                                    },
                                    _vm._l(
                                      _vm.currentProject.remainingApproverList,
                                      function(item, index) {
                                        return _c("el-option", {
                                          key: "approver" + index,
                                          attrs: {
                                            label: item.name,
                                            value: item.id
                                          }
                                        })
                                      }
                                    )
                                  ),
                                  _vm._v(" "),
                                  _vm.approverMembersFlag
                                    ? _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            size: "medium",
                                            type: "warning"
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.submitMembers("reviewer")
                                            }
                                          }
                                        },
                                        [_vm._v("Submit")]
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            { attrs: { prop: "viewed_users", label: "Guest" } },
                            [
                              _c(
                                "div",
                                { staticClass: "membersInput" },
                                [
                                  _c(
                                    "div",
                                    _vm._l(
                                      _vm.currentProject.viewerName,
                                      function(item, index) {
                                        return _c(
                                          "span",
                                          {
                                            key: index,
                                            staticStyle: { margin: "6px" }
                                          },
                                          [_vm._v(_vm._s(item))]
                                        )
                                      }
                                    )
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      attrs: {
                                        disabled:
                                          _vm.currentProject.attribute ===
                                            "public" || !_vm.viewerMembersFlag,
                                        placeholder: "select guest",
                                        multiple: "",
                                        filterable: ""
                                      },
                                      on: {
                                        "visible-change": function($event) {
                                          _vm.visibleChange("v", $event)
                                        },
                                        change: function($event) {
                                          _vm.changeUser("v", $event)
                                        }
                                      },
                                      model: {
                                        value: _vm.addMembersForm.viewed_users,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.addMembersForm,
                                            "viewed_users",
                                            $$v
                                          )
                                        },
                                        expression:
                                          "addMembersForm.viewed_users"
                                      }
                                    },
                                    _vm._l(
                                      _vm.currentProject.remainingViewerList,
                                      function(item, index) {
                                        return _c("el-option", {
                                          key: "Viewer" + index,
                                          attrs: {
                                            label: item.name,
                                            value: item.id
                                          }
                                        })
                                      }
                                    )
                                  ),
                                  _vm._v(" "),
                                  _vm.currentProject.attribute === "private" &&
                                  _vm.viewerMembersFlag
                                    ? _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            size: "medium",
                                            type: "warning"
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.submitMembers("viewer")
                                            }
                                          }
                                        },
                                        [_vm._v("Submit")]
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ]
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
                "el-tab-pane",
                { attrs: { label: "Schedule", name: "schedule" } },
                [
                  _c(
                    "el-card",
                    { staticClass: "box-card", attrs: { shadow: "always" } },
                    [
                      _c(
                        "div",
                        { attrs: { slot: "header" }, slot: "header" },
                        [
                          _c("span", { staticClass: "cardTitle" }, [
                            _vm._v("Project Schedule")
                          ]),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              staticClass: "operationBtn",
                              attrs: { size: "large", type: "text" },
                              on: { click: _vm.viewAllocationList }
                            },
                            [_vm._v("Assignment")]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              staticClass: "operationBtn",
                              attrs: { size: "large", type: "text" },
                              on: { click: _vm.viewIssuesList }
                            },
                            [_vm._v("Issues")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "statisticsCon" }, [
                        _c(
                          "span",
                          { staticStyle: { "margin-right": "10px" } },
                          [
                            _vm._v(
                              "Total number of entries: " +
                                _vm._s(_vm.statisticInfo.total_nums)
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", [
                          _c("span", [_vm._v("Assignment:")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c("el-progress", {
                                staticStyle: {
                                  display: "inline-block",
                                  width: "90%"
                                },
                                attrs: {
                                  "stroke-width": 4,
                                  "text-inside": "",
                                  percentage:
                                    _vm.statisticInfo.allocationPercentage
                                }
                              }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$formatPercentage(
                                      _vm.statisticInfo.allocationPercentage
                                    ) + "%"
                                  )
                                )
                              ])
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", [
                          _c("span", [_vm._v("Translation:")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c("el-progress", {
                                staticStyle: {
                                  display: "inline-block",
                                  width: "90%"
                                },
                                attrs: {
                                  "stroke-width": 4,
                                  "text-inside": "",
                                  percentage:
                                    _vm.statisticInfo.translationPercentage
                                }
                              }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$formatPercentage(
                                      _vm.statisticInfo.translationPercentage
                                    ) + "%"
                                  )
                                )
                              ])
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", [
                          _c("span", [_vm._v("Review:")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c("el-progress", {
                                staticStyle: {
                                  display: "inline-block",
                                  width: "90%"
                                },
                                attrs: {
                                  "stroke-width": 4,
                                  "text-inside": "",
                                  percentage:
                                    _vm.statisticInfo.approvalPercentage
                                }
                              }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$formatPercentage(
                                      _vm.statisticInfo.approvalPercentage
                                    ) + "%"
                                  )
                                )
                              ])
                            ],
                            1
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-card",
                    { staticClass: "box-card", attrs: { shadow: "always" } },
                    [
                      _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                        _c("span", { staticClass: "cardTitle" }, [
                          _vm._v("Member Schedule")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "statisticsCon" }, [
                        _c("div", { staticClass: "progressItem" }, [
                          _c("span", [
                            _vm._v("Owner:\n                "),
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-size": "14px",
                                  "font-weight": "bold",
                                  "margin-left": "10px"
                                }
                              },
                              [
                                _vm._v(
                                  "(Total: " +
                                    _vm._s(
                                      _vm.statisticInfo.total_nums
                                        ? _vm.statisticInfo.total_nums
                                        : 0
                                    ) +
                                    ")"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticStyle: { margin: "6px 20px" } }, [
                              _vm._v(
                                "\n                  " +
                                  _vm._s(_vm.currentProject.users_name) +
                                  "\n                  "
                              ),
                              _c(
                                "div",
                                [
                                  _c("el-progress", {
                                    staticStyle: {
                                      display: "inline-block",
                                      width: "90%"
                                    },
                                    attrs: {
                                      "stroke-width": 4,
                                      "text-inside": "",
                                      percentage:
                                        _vm.statisticInfo.allocationPercentage
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$formatPercentage(
                                          _vm.statisticInfo.allocationPercentage
                                        ) + "%"
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "progressItem" }, [
                          _c(
                            "span",
                            [
                              _vm._v("Translator:\n                "),
                              _vm._l(
                                _vm.currentProject.translatorName,
                                function(item, index) {
                                  return _c(
                                    "div",
                                    {
                                      key: index,
                                      staticStyle: { margin: "6px 20px" }
                                    },
                                    [
                                      _vm._v(_vm._s(item) + " "),
                                      _c(
                                        "span",
                                        {
                                          staticStyle: {
                                            "font-size": "14px",
                                            "font-weight": "bold",
                                            "margin-left": "10px"
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "(Total: " +
                                              _vm._s(
                                                _vm.translatorsStatistics[item]
                                                  ? _vm.translatorsStatistics[
                                                      item
                                                    ].Qualified +
                                                    _vm.translatorsStatistics[
                                                      item
                                                    ]["Unretranslated"] +
                                                    _vm.translatorsStatistics[
                                                      item
                                                    ].Unreviewed +
                                                    _vm.translatorsStatistics[
                                                      item
                                                    ].Untranslated
                                                  : 0
                                              ) +
                                              ")"
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        [
                                          _vm.translatorsStatistics[item]
                                            ? _c("el-progress", {
                                                staticStyle: {
                                                  display: "inline-block",
                                                  width: "90%"
                                                },
                                                attrs: {
                                                  "stroke-width": 4,
                                                  "text-inside": "",
                                                  percentage:
                                                    _vm.translatorsStatistics[
                                                      item
                                                    ] &&
                                                    _vm.translatorsStatistics[
                                                      item
                                                    ].Qualified +
                                                      _vm.translatorsStatistics[
                                                        item
                                                      ]["Unretranslated"] +
                                                      _vm.translatorsStatistics[
                                                        item
                                                      ].Unreviewed +
                                                      _vm.translatorsStatistics[
                                                        item
                                                      ].Untranslated
                                                      ? parseInt(
                                                          ((_vm
                                                            .translatorsStatistics[
                                                            item
                                                          ].Qualified +
                                                            _vm
                                                              .translatorsStatistics[
                                                              item
                                                            ].Unreviewed) *
                                                            10000) /
                                                            (_vm
                                                              .translatorsStatistics[
                                                              item
                                                            ].Qualified +
                                                              _vm
                                                                .translatorsStatistics[
                                                                item
                                                              ][
                                                                "Unretranslated"
                                                              ] +
                                                              _vm
                                                                .translatorsStatistics[
                                                                item
                                                              ].Unreviewed +
                                                              _vm
                                                                .translatorsStatistics[
                                                                item
                                                              ].Untranslated)
                                                        ) / 100
                                                      : 0
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm.translatorsStatistics[item]
                                            ? _c("span", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.$formatPercentage(
                                                      _vm.translatorsStatistics[
                                                        item
                                                      ] &&
                                                      _vm.translatorsStatistics[
                                                        item
                                                      ].Qualified +
                                                        _vm
                                                          .translatorsStatistics[
                                                          item
                                                        ]["Unretranslated"] +
                                                        _vm
                                                          .translatorsStatistics[
                                                          item
                                                        ].Unreviewed +
                                                        _vm
                                                          .translatorsStatistics[
                                                          item
                                                        ].Untranslated
                                                        ? parseInt(
                                                            ((_vm
                                                              .translatorsStatistics[
                                                              item
                                                            ].Qualified +
                                                              _vm
                                                                .translatorsStatistics[
                                                                item
                                                              ].Unreviewed) *
                                                              10000) /
                                                              (_vm
                                                                .translatorsStatistics[
                                                                item
                                                              ].Qualified +
                                                                _vm
                                                                  .translatorsStatistics[
                                                                  item
                                                                ][
                                                                  "Unretranslated"
                                                                ] +
                                                                _vm
                                                                  .translatorsStatistics[
                                                                  item
                                                                ].Unreviewed +
                                                                _vm
                                                                  .translatorsStatistics[
                                                                  item
                                                                ].Untranslated)
                                                          ) / 100
                                                        : 0
                                                    ) + "%"
                                                  )
                                                )
                                              ])
                                            : _vm._e(),
                                          _vm._v(" "),
                                          !_vm.translatorsStatistics[item]
                                            ? _c("el-progress", {
                                                staticStyle: {
                                                  display: "inline-block",
                                                  width: "90%"
                                                },
                                                attrs: {
                                                  "stroke-width": 4,
                                                  "text-inside": "",
                                                  percentage: 0
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          !_vm.translatorsStatistics[item]
                                            ? _c("span", [_vm._v("0.00%")])
                                            : _vm._e()
                                        ],
                                        1
                                      )
                                    ]
                                  )
                                }
                              )
                            ],
                            2
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "progressItem" }, [
                          _c(
                            "span",
                            [
                              _vm._v("Reviewer:\n                "),
                              _c(
                                "span",
                                {
                                  staticStyle: {
                                    "font-size": "14px",
                                    "font-weight": "bold",
                                    "margin-left": "10px"
                                  }
                                },
                                [
                                  _vm._v(
                                    "(Total: " + _vm._s(_vm.reviewerTotal) + ")"
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _vm._l(_vm.currentProject.approverName, function(
                                item,
                                index
                              ) {
                                return _c(
                                  "div",
                                  {
                                    key: index,
                                    staticStyle: { margin: "6px 20px" }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(item) + "\n                  "
                                    ),
                                    _c(
                                      "div",
                                      [
                                        JSON.stringify(
                                          _vm.approversStatistics
                                        ) != "{}"
                                          ? _c("el-progress", {
                                              staticStyle: {
                                                display: "inline-block",
                                                width: "90%"
                                              },
                                              attrs: {
                                                "stroke-width": 4,
                                                "text-inside": "",
                                                percentage:
                                                  _vm.approversStatistics[
                                                    item
                                                  ] && _vm.reviewerTotal
                                                    ? parseInt(
                                                        (_vm
                                                          .approversStatistics[
                                                          item
                                                        ].Qualified *
                                                          10000) /
                                                          _vm.reviewerTotal
                                                      ) / 100
                                                    : 0
                                              }
                                            })
                                          : _vm._e(),
                                        _vm._v(" "),
                                        JSON.stringify(
                                          _vm.approversStatistics
                                        ) != "{}"
                                          ? _c("span", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$formatPercentage(
                                                    _vm.approversStatistics[
                                                      item
                                                    ] && _vm.reviewerTotal
                                                      ? parseInt(
                                                          (_vm
                                                            .approversStatistics[
                                                            item
                                                          ].Qualified *
                                                            10000) /
                                                            _vm.reviewerTotal
                                                        ) / 100
                                                      : 0
                                                  ) + "%"
                                                )
                                              )
                                            ])
                                          : _vm._e(),
                                        _vm._v(" "),
                                        JSON.stringify(
                                          _vm.approversStatistics
                                        ) == "{}"
                                          ? _c("el-progress", {
                                              staticStyle: {
                                                display: "inline-block",
                                                width: "90%"
                                              },
                                              attrs: {
                                                "stroke-width": 4,
                                                "text-inside": "",
                                                percentage: 0
                                              }
                                            })
                                          : _vm._e(),
                                        _vm._v(" "),
                                        JSON.stringify(
                                          _vm.approversStatistics
                                        ) == "{}"
                                          ? _c("span", [_vm._v("0.00%")])
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        ])
                      ])
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-tab-pane",
                { attrs: { label: "Upload", name: "upload" } },
                [
                  _c(
                    "el-card",
                    { staticClass: "box-card", attrs: { shadow: "always" } },
                    [
                      _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                        _c("span", { staticClass: "cardTitle" }, [
                          _vm._v("Upload")
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "small" },
                              on: { click: _vm.downloadFileFormat }
                            },
                            [_vm._v("Download Template")]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "small" },
                              on: { click: _vm.openUploadModal }
                            },
                            [_vm._v("Upload File")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "recordListCon" },
                        [
                          _vm._v("Upload history:\n            "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.importVersionLoading,
                                  expression: "importVersionLoading"
                                }
                              ],
                              staticStyle: { color: "#41babc" }
                            },
                            [
                              _c("i", { staticClass: "el-icon-loading" }),
                              _vm._v(" Requesting...\n            ")
                            ]
                          ),
                          _vm._v(" "),
                          !_vm.importVersionLoading &&
                          _vm.importList.length === 0
                            ? _c("span", { staticStyle: { color: "#ccc" } }, [
                                _vm._v("[ No Record ]")
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.importList.length > 0
                            ? _c(
                                "div",
                                {
                                  staticStyle: {
                                    padding: "6px 30px",
                                    "font-weight": "bold"
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      staticStyle: {
                                        display: "inline-block",
                                        width: "200px",
                                        "text-align": "center"
                                      }
                                    },
                                    [_vm._v("Total Number of Entries")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    {
                                      staticStyle: {
                                        display: "inline-block",
                                        width: "260px",
                                        "text-align": "center"
                                      }
                                    },
                                    [_vm._v("Upload Time")]
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.importList, function(item, index) {
                            return _vm.importList.length > 0
                              ? _c(
                                  "div",
                                  {
                                    key: index,
                                    staticClass: "versionHistoryItem",
                                    attrs: {
                                      title: "Click to download this file"
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.downloadImportFile(item)
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          display: "inline-block",
                                          width: "200px",
                                          "text-align": "center"
                                        }
                                      },
                                      [_vm._v(_vm._s(item.nums))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          display: "inline-block",
                                          width: "260px",
                                          "text-align": "center"
                                        }
                                      },
                                      [_vm._v(_vm._s(item.updated_at))]
                                    )
                                  ]
                                )
                              : _vm._e()
                          }),
                          _vm._v(" "),
                          _vm.importList.length > 0
                            ? _c("el-pagination", {
                                attrs: {
                                  total: _vm.importTotal,
                                  layout: "prev, pager, next"
                                },
                                on: {
                                  "current-change": _vm.importCurrentChange
                                }
                              })
                            : _vm._e()
                        ],
                        2
                      )
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-tab-pane",
                { attrs: { label: "Release", name: "export" } },
                [
                  _c(
                    "el-card",
                    { staticClass: "box-card", attrs: { shadow: "always" } },
                    [
                      _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                        _c("span", { staticClass: "cardTitle" }, [
                          _vm._v("Release")
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { size: "small", type: "primary" },
                              on: { click: _vm.openExportVersionModal }
                            },
                            [_vm._v("New Version")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "recordListCon" },
                        [
                          _vm._v("Release history:\n            "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.exportVersionLoading,
                                  expression: "exportVersionLoading"
                                }
                              ],
                              staticStyle: { color: "#41babc" }
                            },
                            [
                              _c("i", { staticClass: "el-icon-loading" }),
                              _vm._v(" Requesting...\n            ")
                            ]
                          ),
                          _vm._v(" "),
                          !_vm.exportVersionLoading &&
                          !_vm.versionList[0].version_name
                            ? _c("span", { staticStyle: { color: "#ccc" } }, [
                                _vm._v("[ No Record ]")
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.exportVersionLoading &&
                          _vm.versionList[0].version_name
                            ? _c(
                                "div",
                                {
                                  staticStyle: {
                                    padding: "6px 30px",
                                    "font-weight": "bold"
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    {
                                      staticStyle: {
                                        display: "inline-block",
                                        width: "100px",
                                        "text-align": "center"
                                      }
                                    },
                                    [_vm._v("Version")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    {
                                      staticStyle: {
                                        display: "inline-block",
                                        width: "200px",
                                        "text-align": "center"
                                      }
                                    },
                                    [_vm._v("Release Time")]
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.versionList, function(item, index) {
                            return !_vm.exportVersionLoading &&
                              _vm.versionList[0].version_name
                              ? _c(
                                  "div",
                                  {
                                    key: index,
                                    staticClass: "versionHistoryItem",
                                    attrs: {
                                      title: "Click to download this version"
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.exportHistoryVersion(
                                          item.version_name
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          display: "inline-block",
                                          width: "100px",
                                          "text-align": "center"
                                        }
                                      },
                                      [_vm._v(_vm._s(item.version_name))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          display: "inline-block",
                                          width: "200px",
                                          "text-align": "center"
                                        }
                                      },
                                      [_vm._v(_vm._s(item.version_created_at))]
                                    )
                                  ]
                                )
                              : _vm._e()
                          }),
                          _vm._v(" "),
                          _vm.versionList[0].version_name
                            ? _c("el-pagination", {
                                attrs: {
                                  total: _vm.versionsTotal,
                                  layout: "prev, pager, next"
                                },
                                on: {
                                  "current-change": _vm.versionCurrentChange
                                }
                              })
                            : _vm._e()
                        ],
                        2
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              attrs: {
                title: "Release New Version",
                visible: _vm.dialogVisible,
                width: "30%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogVisible = $event
                }
              }
            },
            [
              _c("span", [_vm._v("Version ID: ")]),
              _vm._v(" "),
              _c("el-input-number", {
                attrs: {
                  size: "small",
                  step: 0.1,
                  precision: 1,
                  min: _vm.currentProject.version_name
                    ? (Number(this.currentProject.version_name.substr(1)) * 10 +
                        1) /
                      10
                    : 0.1,
                  max: _vm.currentProject.version_name
                    ? Math.floor(
                        Number(this.currentProject.version_name.substr(1)) + 1.0
                      )
                    : 1.0
                },
                model: {
                  value: _vm.newVersionID,
                  callback: function($$v) {
                    _vm.newVersionID = $$v
                  },
                  expression: "newVersionID"
                }
              }),
              _vm._v(" "),
              _c(
                "span",
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
                          _vm.dialogVisible = false
                        }
                      }
                    },
                    [_vm._v("Cancel")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: { click: _vm.exportQualified }
                    },
                    [_vm._v("Yes")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              attrs: {
                title: "Upload File",
                visible: _vm.dialogUploadVisible,
                "close-on-click-modal": false,
                "close-on-press-escape": false,
                "show-close": !_vm.uploadLoadingFlag
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogUploadVisible = $event
                },
                close: _vm.closeUploadModal
              }
            },
            [
              _c(
                "div",
                {
                  staticStyle: { "font-size": "12px", "margin-bottom": "20px" }
                },
                [
                  _c("div", { staticStyle: { "padding-left": "20px" } }, [
                    _vm._v("Supported file types:")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v(
                      "- comma-delimited or tab-delimited text file (.csv or .tsv)."
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v(
                      "- Single-page spreadsheet from Microsoft Excel (.xls or .xlsx)."
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: { "font-size": "12px", "margin-bottom": "20px" }
                },
                [
                  _c("div", { staticStyle: { "padding-left": "20px" } }, [
                    _vm._v("File name:")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v(
                      "-  Only support letters (A-Za-z), numbers (0-9), dot (.), hypen (-), and underscore (_)."
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v("-  Make sure the extension is correct.")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: { "font-size": "12px", "margin-bottom": "20px" }
                },
                [
                  _c("div", { staticStyle: { "padding-left": "20px" } }, [
                    _vm._v("File size:")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v("- 10MB or less.")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: { "font-size": "12px", "margin-bottom": "20px" }
                },
                [
                  _c("div", { staticStyle: { "padding-left": "20px" } }, [
                    _vm._v("Content:")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v("- The first line must be the header.")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "padding-left": "40px" } }, [
                    _vm._v("- The first column must be unique.")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { size: "small", type: "primary" },
                  on: { click: _vm.procductImport }
                },
                [_vm._v("Select File")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticStyle: { "font-size": "14px", margin: "8px 0" } },
                [
                  _vm._v("File Name：\n        "),
                  _c("span", { staticStyle: { "font-weight": "bold" } }, [
                    _vm._v(
                      _vm._s(_vm.uploadFile.name ? _vm.uploadFile.name : "")
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.uploadLoadingFlag,
                          expression: "uploadLoadingFlag"
                        }
                      ],
                      staticStyle: { color: "#41babc", "font-size": "12px" }
                    },
                    [
                      _c("i", { staticClass: "el-icon-loading" }),
                      _vm._v(" Start uploading, please do not close it.")
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c("input", {
                staticStyle: { visibility: "hidden" },
                attrs: { type: "file", id: "translateUpload" },
                on: { change: _vm.changeImportFile }
              }),
              _vm._v(" "),
              _c(
                "el-dialog",
                {
                  attrs: {
                    width: "70%",
                    title: "Upload Completed",
                    visible: _vm.resultVisible,
                    "append-to-body": "",
                    "close-on-click-modal": false,
                    "close-on-press-escape": false
                  },
                  on: {
                    "update:visible": function($event) {
                      _vm.resultVisible = $event
                    },
                    close: _vm.closeResultModal
                  }
                },
                [
                  _c(
                    "div",
                    {
                      staticStyle: { "max-height": "500px", overflow: "auto" }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticStyle: {
                            "margin-bottom": "20px",
                            color: "#28a745"
                          }
                        },
                        [
                          _c("i", {
                            staticClass: "el-message__icon el-icon-success",
                            staticStyle: { "font-size": "24px" }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v("Counts of uploaded entries:")]),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticStyle: { "font-weight": "bold" } },
                            [_vm._v(_vm._s(_vm.uploadResult.success_nums))]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _vm.uploadResult.Duplicate_key.length > 0 ||
                      _vm.uploadResult.nullkey.length > 0 ||
                      _vm.uploadResult.overmuch.length > 0
                        ? _c("div", [
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  "margin-bottom": "10px",
                                  "font-weight": "bold"
                                }
                              },
                              [_vm._v("Reasons for entries failed to upload:")]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticStyle: { "margin-left": "20px" } },
                              [
                                _c(
                                  "div",
                                  {
                                    staticStyle: {
                                      display: "flex",
                                      "flex-direction": "row",
                                      "border-top": "1px solid #eee",
                                      "border-bottom": "1px solid #eee"
                                    }
                                  },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          "box-sizing": "border-box",
                                          padding: "5px",
                                          "font-weight": "bold",
                                          width: "30%",
                                          "border-left": "1px solid #eee"
                                        }
                                      },
                                      [_vm._v("Reasons")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          "box-sizing": "border-box",
                                          padding: "5px",
                                          "font-weight": "bold",
                                          width: "70%",
                                          "border-left": "1px solid #eee",
                                          "border-right": "1px solid #eee"
                                        }
                                      },
                                      [_vm._v("Row ID")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _vm.uploadResult.Duplicate_key.length > 0
                                  ? _c(
                                      "div",
                                      {
                                        staticStyle: {
                                          display: "flex",
                                          "flex-direction": "row",
                                          "flex-wrap": "wrap",
                                          "border-bottom": "1px solid #eee"
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "box-sizing": "border-box",
                                              padding: "5px",
                                              width: "30%",
                                              "overflow-wrap": "break-word",
                                              "border-left": "1px solid #eee"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "The first column is not unique or other unpredicted error."
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "box-sizing": "border-box",
                                              padding: "5px",
                                              width: "70%",
                                              "overflow-wrap": "break-word",
                                              "border-left": "1px solid #eee",
                                              "border-right": "1px solid #eee"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.uploadResult.Duplicate_key
                                                  .length > 0
                                                  ? _vm.uploadResult.Duplicate_key.join(
                                                      ","
                                                    )
                                                  : ""
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.uploadResult.nullkey.length > 0
                                  ? _c(
                                      "div",
                                      {
                                        staticStyle: {
                                          display: "flex",
                                          "flex-direction": "row",
                                          "flex-wrap": "wrap",
                                          "border-bottom": "1px solid #eee"
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "box-sizing": "border-box",
                                              padding: "5px",
                                              width: "30%",
                                              "overflow-wrap": "break-word",
                                              "border-left": "1px solid #eee"
                                            }
                                          },
                                          [_vm._v("The first column is null.")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "box-sizing": "border-box",
                                              padding: "5px",
                                              width: "70%",
                                              "overflow-wrap": "break-word",
                                              "border-left": "1px solid #eee",
                                              "border-right": "1px solid #eee"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.uploadResult.nullkey
                                                  .length > 0
                                                  ? _vm.uploadResult.nullkey.join(
                                                      ","
                                                    )
                                                  : ""
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.uploadResult.overmuch.length > 0
                                  ? _c(
                                      "div",
                                      {
                                        staticStyle: {
                                          display: "flex",
                                          "flex-direction": "row",
                                          "flex-wrap": "wrap",
                                          "border-bottom": "1px solid #eee"
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "box-sizing": "border-box",
                                              padding: "5px",
                                              width: "30%",
                                              "overflow-wrap": "break-word",
                                              "border-left": "1px solid #eee"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "Inconsistent column counts with the first uploaded file."
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "box-sizing": "border-box",
                                              padding: "5px",
                                              width: "70%",
                                              "overflow-wrap": "break-word",
                                              "border-left": "1px solid #eee",
                                              "border-right": "1px solid #eee"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.uploadResult.overmuch
                                                  .length > 0
                                                  ? _vm.uploadResult.overmuch.join(
                                                      ","
                                                    )
                                                  : ""
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _vm.uploadResult.success_nums > 0
                    ? _c(
                        "span",
                        {
                          staticClass: "dialog-footer",
                          attrs: { slot: "footer" },
                          slot: "footer"
                        },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary" },
                              on: {
                                click: function($event) {
                                  _vm.$router.push(
                                    "/assignment?id=" +
                                      _vm.$route.query.id +
                                      "&name=" +
                                      _vm.currentProject.product +
                                      "&status=Unassigned&page=1&count=10"
                                  )
                                }
                              }
                            },
                            [_vm._v("Go to Assign")]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              attrs: {
                title: "Edit",
                visible: _vm.editDialogVisible,
                width: "40%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.editDialogVisible = $event
                }
              }
            },
            [
              _c(
                "el-form",
                {
                  ref: "editProjectForm",
                  staticClass: "demo-ruleForm",
                  attrs: {
                    model: _vm.editProjectForm,
                    rules: _vm.rules,
                    "label-width": "140px"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { prop: "product", label: "Project Name:" } },
                    [
                      _c("el-input", {
                        staticStyle: { width: "100%" },
                        attrs: { placeholder: "enter project name" },
                        model: {
                          value: _vm.editProjectForm.product,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.editProjectForm,
                              "product",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "editProjectForm.product"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "attribute", label: "Visibility:" } },
                    [
                      _c(
                        "el-radio-group",
                        {
                          model: {
                            value: _vm.editProjectForm.attribute,
                            callback: function($$v) {
                              _vm.$set(_vm.editProjectForm, "attribute", $$v)
                            },
                            expression: "editProjectForm.attribute"
                          }
                        },
                        [
                          _c("el-radio", { attrs: { label: "public" } }, [
                            _vm._v("Public")
                          ]),
                          _vm._v(" "),
                          _c(
                            "el-radio",
                            { attrs: { label: "private", disabled: "" } },
                            [_vm._v("Private")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "priority", label: "Priority:" } },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { placeholder: "select priority" },
                          model: {
                            value: _vm.editProjectForm.priority,
                            callback: function($$v) {
                              _vm.$set(_vm.editProjectForm, "priority", $$v)
                            },
                            expression: "editProjectForm.priority"
                          }
                        },
                        [
                          _c("el-option", {
                            attrs: { label: "High", value: 3 }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { label: "Normal", value: 2 }
                          }),
                          _vm._v(" "),
                          _c("el-option", { attrs: { label: "Low", value: 1 } })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "lang", label: "Language:" } },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "49%" },
                          attrs: {
                            filterable: "",
                            remote: "",
                            "remote-method": _vm.remoteMethod1,
                            placeholder: "source language"
                          },
                          on: { blur: _vm.blurMethod1 },
                          model: {
                            value: _vm.editProjectForm.slang,
                            callback: function($$v) {
                              _vm.$set(_vm.editProjectForm, "slang", $$v)
                            },
                            expression: "editProjectForm.slang"
                          }
                        },
                        [
                          _vm._l(_vm.langList, function(item) {
                            return _c(
                              "el-option",
                              {
                                key: item.code,
                                attrs: {
                                  label: item.language,
                                  value: item.language
                                }
                              },
                              [
                                _c("span", { staticStyle: { float: "left" } }, [
                                  _vm._v(_vm._s(item.language))
                                ]),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      float: "right",
                                      color: "#8492a6",
                                      "font-size": "13px"
                                    }
                                  },
                                  [_vm._v(_vm._s(item.code))]
                                )
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c("el-pagination", {
                            attrs: {
                              small: "",
                              layout: "prev, pager, next",
                              "current-page": _vm.langCurrentPage,
                              "page-size": _vm.langPageSize,
                              total: _vm.langTotal
                            },
                            on: { "current-change": _vm.handleCurrentPage }
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "49%" },
                          attrs: {
                            filterable: "",
                            remote: "",
                            "remote-method": _vm.remoteMethod2,
                            placeholder: "target language"
                          },
                          on: { blur: _vm.blurMethod2 },
                          model: {
                            value: _vm.editProjectForm.tlang,
                            callback: function($$v) {
                              _vm.$set(_vm.editProjectForm, "tlang", $$v)
                            },
                            expression: "editProjectForm.tlang"
                          }
                        },
                        [
                          _vm._l(_vm.langList2, function(item) {
                            return _c(
                              "el-option",
                              {
                                key: item.code,
                                attrs: {
                                  label: item.language,
                                  value: item.language
                                }
                              },
                              [
                                _c("span", { staticStyle: { float: "left" } }, [
                                  _vm._v(_vm._s(item.language))
                                ]),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      float: "right",
                                      color: "#8492a6",
                                      "font-size": "13px"
                                    }
                                  },
                                  [_vm._v(_vm._s(item.code))]
                                )
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c("el-pagination", {
                            attrs: {
                              small: "",
                              layout: "prev, pager, next",
                              "current-page": _vm.langCurrentPage2,
                              "page-size": _vm.langPageSize2,
                              total: _vm.langTotal2
                            },
                            on: { "current-change": _vm.handleCurrentPage2 }
                          })
                        ],
                        2
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "deadline", label: "Deadline:" } },
                    [
                      _c("el-date-picker", {
                        staticStyle: { width: "100%" },
                        attrs: {
                          type: "date",
                          "default-value": new Date(),
                          "value-format": "yyyy-MM-dd",
                          "picker-options": _vm.pickerOptions,
                          placeholder: "select deadline"
                        },
                        model: {
                          value: _vm.editProjectForm.deadline,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.editProjectForm,
                              "deadline",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "editProjectForm.deadline"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "product_desc", label: "Description:" } },
                    [
                      _c("el-input", {
                        staticStyle: { width: "100%" },
                        attrs: {
                          type: "textarea",
                          placeholder: "enter description"
                        },
                        model: {
                          value: _vm.editProjectForm.product_desc,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.editProjectForm,
                              "product_desc",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "editProjectForm.product_desc"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
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
                          _vm.editDialogVisible = false
                        }
                      }
                    },
                    [_vm._v("Cancel")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          _vm.submitProject("editProjectForm")
                        }
                      }
                    },
                    [_vm._v("Yes")]
                  )
                ],
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
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-800d61ce", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-800d61ce\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-800d61ce\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("5beada4a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-800d61ce\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectDetail.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-800d61ce\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/projectList/ProjectDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-800d61ce\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-800d61ce\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/ProjectDetail.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-800d61ce"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\projectList\\ProjectDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-800d61ce", Component.options)
  } else {
    hotAPI.reload("data-v-800d61ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});