webpackJsonp([33],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    this.addProjectForm.product = this.$route.query.name || '';
    this.$http.post("/api/product/lang_list", qs.stringify({ count: 30 })).then(function (response) {
      _this.langList = response.data.data;
      _this.langList2 = response.data.data;
      _this.langTotal = response.data.total;
      _this.langTotal2 = response.data.total;
    });
    this.$http.post("/api/user/list").then(function (response) {
      // console.log(response.data);
      response.data.data.forEach(function (item) {
        // item.mode='unSelect'
        item.status = '';
        _this.userList.push(item);
      });
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
      if (_this2.addProjectForm.slang === '') {
        callback(new Error("Please select source language."));
      } else if (_this2.addProjectForm.tlang === '') {
        callback(new Error("Please select target language."));
      } else if (_this2.addProjectForm.slang === _this2.addProjectForm.tlang) {
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
      langList: [],
      langCurrentPage: 1,
      langPageSize: 30,
      langTotal: 0,
      langList2: [],
      langCurrentPage2: 1,
      langPageSize2: 30,
      langTotal2: 0,
      userList: [],
      addProjectForm: {
        product: '',
        attribute: 'public',
        priority: '',
        deadline: '',
        lang: '',
        slang: '',
        tlang: '',
        translate_users: [],
        approve_users: [],
        viewed_users: [],
        product_desc: ''
      },
      rules: {
        product: [{
          required: true,
          message: 'Please enter project name.'
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
        }],
        translate_users: [{
          required: true,
          message: 'Please enter translator.'
        }],
        approve_users: [{
          required: true,
          message: 'Please enter reviewer.'
        }],
        viewed_users: [{
          required: true,
          message: 'Please enter viewer.'
        }]
      }
    };
  },

  watch: {
    'addProjectForm.slang': {
      handler: function handler(val, oldVal) {
        this.addProjectForm.lang = this.addProjectForm.slang + ' -> ' + this.addProjectForm.tlang;
      },

      deep: true
    },
    'addProjectForm.tlang': {
      handler: function handler(val, oldVal) {
        this.addProjectForm.lang = this.addProjectForm.slang + ' -> ' + this.addProjectForm.tlang;
      },

      deep: true
    }
    // 'addProjectForm.attribute':{
    //   handler(val,oldVal){
    //     val==='public'?this.addProjectForm.viewed_users = []:null
    //   },
    //   deep:true
    // },
    // 允许自己的项目，自己翻译，自己审批
    // 'addProjectForm.translate_users':{
    //   handler(val,oldVal){
    //     // console.log(val,oldVal);
    //     //增加
    //     if(val.length>oldVal.length){
    //       this.userList.forEach(item=>{
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
    //       this.userList.forEach(item=>{
    //         if(id===item.id){
    //           item.status=''
    //         }
    //       })
    //     }
    //   },
    //   deep:true
    // },
    // 'addProjectForm.approve_users':{
    //   handler(val,oldVal){
    //     // console.log(val);
    //     //增加
    //     if(val.length>oldVal.length){
    //       this.userList.forEach(item=>{
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
    //       this.userList.forEach(item=>{
    //         if(id===item.id){
    //           item.status=''
    //         }
    //       })
    //     }

    //   },
    //   deep:true
    // },
    // 'addProjectForm.viewed_users':{
    //   handler(val,oldVal){
    //     // console.log(val);
    //     //增加
    //     if(val.length>oldVal.length){
    //       this.userList.forEach(item=>{
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
    //       this.userList.forEach(item=>{
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
    handleCurrentPage: function handleCurrentPage(val) {
      var _this3 = this;

      // console.log(val)
      this.langCurrentPage = val;
      this.$http.post("/api/product/lang_list", qs.stringify({ page: val, count: this.langPageSize })).then(function (response) {
        _this3.langList = response.data.data;
        _this3.langTotal = response.data.total;
      });
    },
    handleCurrentPage2: function handleCurrentPage2(val) {
      var _this4 = this;

      // console.log(val)
      this.langCurrentPage2 = val;
      this.$http.post("/api/product/lang_list", qs.stringify({ page: val, count: this.langPageSize2 })).then(function (response) {
        _this4.langList2 = response.data.data;
        _this4.langTotal2 = response.data.total;
      });
    },
    remoteMethod1: function remoteMethod1(query) {
      var _this5 = this;

      // console.log(query)
      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage, count: this.langPageSize, query_l: query })).then(function (response) {
        _this5.langList = response.data.data;
        _this5.langTotal = response.data.total;
      });
    },
    blurMethod1: function blurMethod1() {
      var _this6 = this;

      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage, count: this.langPageSize })).then(function (response) {
        _this6.langList = response.data.data;
        _this6.langTotal = response.data.total;
      });
    },
    remoteMethod2: function remoteMethod2(query) {
      var _this7 = this;

      // console.log(query)
      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage2, count: this.langPageSize2, query_l: query })).then(function (response) {
        _this7.langList2 = response.data.data;
        _this7.langTotal2 = response.data.total;
      });
    },
    blurMethod2: function blurMethod2() {
      var _this8 = this;

      this.$http.post("/api/product/lang_list", qs.stringify({ page: this.langCurrentPage2, count: this.langPageSize2 })).then(function (response) {
        _this8.langList2 = response.data.data;
        _this8.langTotal2 = response.data.total;
      });
    },
    changeUser: function changeUser(mode, list) {
      // switch(mode){
      //   case 't':
      //     list.forEach(item=>{
      //       this.userList.forEach(item1=>{
      //         if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
      //           item1.status='t'
      //         }
      //       })
      //     })
      //   break;
      //   case 'a':
      //     list.forEach(item=>{
      //       this.userList.forEach(item1=>{
      //         if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
      //           item1.status='a'
      //         }
      //       })
      //     })
      //   break;
      //   case 'v':
      //     list.forEach(item=>{
      //       this.userList.forEach(item1=>{
      //         if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
      //           item1.status='v'
      //         }
      //       })
      //     })
      //   break;
      // }
    },
    submitForm: function submitForm(formName) {
      var _this9 = this;

      this.$refs[formName].validate(function (valid) {
        // console.log(this.addProjectForm);
        if (valid) {
          var obj = {
            product: _this9.addProjectForm.product.trim(),
            attribute: _this9.addProjectForm.attribute,
            priority: _this9.addProjectForm.priority,
            lang: _this9.addProjectForm.slang + ' -> ' + _this9.addProjectForm.tlang,
            translate_users: JSON.stringify(_this9.addProjectForm.translate_users),
            approve_users: JSON.stringify(_this9.addProjectForm.approve_users),
            viewed_users: _this9.addProjectForm.attribute === 'public' ? JSON.stringify([]) : JSON.stringify(_this9.addProjectForm.viewed_users),
            deadline: _this9.addProjectForm.deadline,
            product_desc: _this9.addProjectForm.product_desc.trim()
            // console.log(obj);
          };_this9.$http.post("/api/product/create", qs.stringify(obj)).then(function (response) {
            if (response.data.result.status === 'Successful') {
              _this9.$router.push('/projectdetail?id=' + response.data.result.product_id + '&pane=upload');
            } else {
              _this9.$message.warning("Add failed!");
            }
          });
        }
      });
    },
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a4d5479\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7a4d5479\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "addProjectMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [_c("el-breadcrumb-item", [_vm._v("Add New Project")])],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "clearfix", attrs: { id: "addProjectDetail" } },
        [
          _c(
            "el-form",
            {
              ref: "addProjectForm",
              attrs: {
                model: _vm.addProjectForm,
                rules: _vm.rules,
                "label-position": "left",
                "label-width": "120px"
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { prop: "product", label: "Project Name" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c("el-input", {
                        attrs: { placeholder: "enter project name" },
                        model: {
                          value: _vm.addProjectForm.product,
                          callback: function($$v) {
                            _vm.$set(_vm.addProjectForm, "product", $$v)
                          },
                          expression: "addProjectForm.product"
                        }
                      })
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { prop: "attribute", label: "Visibility" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c(
                        "el-radio-group",
                        {
                          model: {
                            value: _vm.addProjectForm.attribute,
                            callback: function($$v) {
                              _vm.$set(_vm.addProjectForm, "attribute", $$v)
                            },
                            expression: "addProjectForm.attribute"
                          }
                        },
                        [
                          _c("el-radio", { attrs: { label: "public" } }, [
                            _vm._v("Public")
                          ]),
                          _vm._v(" "),
                          _c("el-radio", { attrs: { label: "private" } }, [
                            _vm._v("Private")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { prop: "priority", label: "Priority" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: { placeholder: "select priority" },
                          model: {
                            value: _vm.addProjectForm.priority,
                            callback: function($$v) {
                              _vm.$set(_vm.addProjectForm, "priority", $$v)
                            },
                            expression: "addProjectForm.priority"
                          }
                        },
                        [
                          _c("el-option", {
                            attrs: { label: "High", value: "3" }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { label: "Normal", value: "2" }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { label: "Low", value: "1" }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { prop: "lang", label: "Language" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
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
                            value: _vm.addProjectForm.slang,
                            callback: function($$v) {
                              _vm.$set(_vm.addProjectForm, "slang", $$v)
                            },
                            expression: "addProjectForm.slang"
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
                            value: _vm.addProjectForm.tlang,
                            callback: function($$v) {
                              _vm.$set(_vm.addProjectForm, "tlang", $$v)
                            },
                            expression: "addProjectForm.tlang"
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
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "Deadline", prop: "deadline" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c("el-date-picker", {
                        attrs: {
                          type: "date",
                          "default-value": new Date(),
                          "value-format": "yyyy-MM-dd",
                          "picker-options": _vm.pickerOptions,
                          placeholder: "select deadline"
                        },
                        model: {
                          value: _vm.addProjectForm.deadline,
                          callback: function($$v) {
                            _vm.$set(_vm.addProjectForm, "deadline", $$v)
                          },
                          expression: "addProjectForm.deadline"
                        }
                      })
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { prop: "translate_users", label: "Translator" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: {
                            placeholder: "select translator",
                            multiple: "",
                            filterable: ""
                          },
                          on: {
                            change: function($event) {
                              _vm.changeUser("t", $event)
                            }
                          },
                          model: {
                            value: _vm.addProjectForm.translate_users,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.addProjectForm,
                                "translate_users",
                                $$v
                              )
                            },
                            expression: "addProjectForm.translate_users"
                          }
                        },
                        _vm._l(_vm.userList, function(item, index) {
                          return item.status === "t" || item.status === ""
                            ? _c("el-option", {
                                key: "Translator" + index,
                                attrs: { label: item.name, value: item.id }
                              })
                            : _vm._e()
                        })
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { prop: "approve_users", label: "Reviewer" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: {
                            placeholder: "select reviewer",
                            multiple: "",
                            filterable: ""
                          },
                          on: {
                            change: function($event) {
                              _vm.changeUser("a", $event)
                            }
                          },
                          model: {
                            value: _vm.addProjectForm.approve_users,
                            callback: function($$v) {
                              _vm.$set(_vm.addProjectForm, "approve_users", $$v)
                            },
                            expression: "addProjectForm.approve_users"
                          }
                        },
                        _vm._l(_vm.userList, function(item, index) {
                          return item.status === "a" || item.status === ""
                            ? _c("el-option", {
                                key: "approver" + index,
                                attrs: { label: item.name, value: item.id }
                              })
                            : _vm._e()
                        })
                      )
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
                    prop:
                      _vm.addProjectForm.attribute === "public"
                        ? ""
                        : "viewed_users",
                    label: "Guest"
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: {
                            placeholder: "select guest",
                            multiple: "",
                            filterable: "",
                            disabled: _vm.addProjectForm.attribute === "public"
                          },
                          on: {
                            change: function($event) {
                              _vm.changeUser("v", $event)
                            }
                          },
                          model: {
                            value: _vm.addProjectForm.viewed_users,
                            callback: function($$v) {
                              _vm.$set(_vm.addProjectForm, "viewed_users", $$v)
                            },
                            expression: "addProjectForm.viewed_users"
                          }
                        },
                        _vm._l(_vm.userList, function(item, index) {
                          return item.status === "v" || item.status === ""
                            ? _c("el-option", {
                                key: "Viewer" + index,
                                attrs: { label: item.name, value: item.id }
                              })
                            : _vm._e()
                        })
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { prop: "product_desc", label: "Description" } },
                [
                  _c(
                    "div",
                    { staticClass: "namePwdInp" },
                    [
                      _c("el-input", {
                        attrs: {
                          type: "textarea",
                          placeholder: "enter description"
                        },
                        model: {
                          value: _vm.addProjectForm.product_desc,
                          callback: function($$v) {
                            _vm.$set(_vm.addProjectForm, "product_desc", $$v)
                          },
                          expression: "addProjectForm.product_desc"
                        }
                      })
                    ],
                    1
                  )
                ]
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
                          _vm.submitForm("addProjectForm")
                        }
                      }
                    },
                    [_vm._v("Add")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.resetForm("addProjectForm")
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
    require("vue-hot-reload-api")      .rerender("data-v-7a4d5479", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a4d5479\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a4d5479\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("4feeec72", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a4d5479\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AddProject.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a4d5479\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AddProject.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/projectList/AddProject.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a4d5479\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7a4d5479\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/AddProject.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7a4d5479"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\projectList\\AddProject.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a4d5479", Component.options)
  } else {
    hotAPI.reload("data-v-7a4d5479", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});