webpackJsonp([25],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    // this.$router.push('/userinfo?page=1&count=10')
    this.$http.post("/api/User/list", qs.stringify({ page: this.currentPage, count: this.pageSize })).then(function (response) {
      // console.log(response.data);
      response.data.data.forEach(function (item) {
        _this.$set(item, 'statusSwitch', item.status == '1' ? true : false);
      });
      _this.userListTable = response.data.data;
      _this.total = response.data.total;
    });
  },
  data: function data() {
    return {
      searchForm_raw: {
        email: this.$route.query.email || '',
        name: this.$route.query.name || ''
      },
      searchForm: {
        email: this.$route.query.email || '',
        name: this.$route.query.name || ''
      },
      rules: {},
      loading: false,
      // searchFlag:false,
      sort: [],
      statusSwitch: true,
      userListTable: [],
      total: 0,
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: Number(this.$route.query.count) || 10
    };
  },

  methods: {
    onSearch: function onSearch() {
      var _this2 = this;

      this.$refs.userTable.clearSort();
      this.sort = [];

      this.currentPage = 1;
      var obj = {};
      this.searchForm.email ? obj.email = this.searchForm.email : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.$router.push({ path: '/userinfo', query: obj });

      this.searchForm.email = this.searchForm_raw.email;
      this.searchForm.name = this.searchForm_raw.name;

      // this.searchForm.email===''&&this.searchForm.name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/User/list", qs.stringify({ email: this.searchForm.email, name: this.searchForm.name })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this2.$set(item, 'statusSwitch', item.status == '1' ? true : false);
        });
        _this2.userListTable = response.data.data;
        _this2.total = response.data.total;
      });
    },
    sortChange: function sortChange(event) {
      var _this3 = this;

      var order = "";
      event.order === "ascending" ? order = 'ASC' : null;
      event.order === "descending" ? order = 'DESC' : null;
      this.sort[0] = event.prop;
      this.sort[1] = order;
      this.currentPage = 1;

      this.$http.post("/api/User/list", qs.stringify(event.prop ? { email: this.searchForm.email, name: this.searchForm.name, count: this.pageSize, sort: this.sort } : { email: this.searchForm.email, name: this.searchForm.name, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this3.$set(item, 'statusSwitch', item.status == '1' ? true : false);
        });
        _this3.userListTable = response.data.data;
        _this3.total = response.data.total;
      });
    },
    addUser: function addUser() {
      this.$router.push({ path: '/adduser', query: { email: this.searchForm.email } });
    },
    changeSwitch: function changeSwitch(row) {
      var _this4 = this;

      this.$confirm(row.statusSwitch ? 'Are you sure to open this account?' : 'Are you sure to shut down this account?', {
        title: row.statusSwitch ? 'Open' : 'Shut Down',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false
      }).then(function () {
        _this4.$http.post("/api/User/close_open", qs.stringify({
          uid: row.id,
          status: row.statusSwitch ? '1' : '0'
        })).then(function (response) {
          if (response.data.success) {}
        });
      }).catch(function () {
        row.statusSwitch = !row.statusSwitch;
      });
    },
    resetPwd: function resetPwd(row) {
      var _this5 = this;

      this.$confirm('Are you sure to reset password?', {
        title: 'Reset Password',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false
      }).then(function () {
        _this5.$http.post("/api/User/ChangeUserPwd", qs.stringify({
          uid: row.id,
          newpassword: '123456'
        })).then(function (response) {
          if (response.data.success) {
            _this5.$message({
              message: 'Password has been reset to 123456 successfully.',
              type: 'success'
            });
          }
        });
      });
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this6 = this;

      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      var obj = {};
      this.searchForm.email ? obj.email = this.searchForm.email : null;
      this.pageSize ? obj.count = this.pageSize : null;
      val ? obj.page = val : null;
      this.$router.push({ path: '/userinfo', query: obj });

      // if(this.searchFlag){
      this.$http.post("/api/User/list", qs.stringify(this.sort[0] ? { email: this.searchForm.email, name: this.searchForm.name, page: val, count: this.pageSize, sort: this.sort } : { email: this.searchForm.email, name: this.searchForm.name, page: val, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this6.$set(item, 'statusSwitch', item.status == '1' ? true : false);
        });
        _this6.userListTable = response.data.data;
        _this6.total = response.data.total;
      });
      // }else{
      //   this.$http.post("/api/User/list",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     response.data.data.forEach(item=>{
      //       this.$set(item,'statusSwitch',item.status=='1'?true:false)
      //     })
      //     this.userListTable = response.data.data;
      //     this.total = response.data.total;
      //   })
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77799c44\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-77799c44\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "clearfix", attrs: { id: "userMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [_c("el-breadcrumb-item", [_vm._v("User Management")])],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "addSearch clearfix" }, [
        _c(
          "div",
          { attrs: { id: "searchCon" } },
          [
            _c(
              "el-form",
              {
                ref: "searchForm_raw",
                staticClass: "demo-form-inline",
                attrs: {
                  inline: true,
                  model: _vm.searchForm_raw,
                  rules: _vm.rules,
                  "label-position": "left",
                  "label-width": "90px",
                  size: "small"
                },
                nativeOn: {
                  submit: function($event) {
                    $event.preventDefault()
                  }
                }
              },
              [
                _c(
                  "el-form-item",
                  { attrs: { label: "Email:", prop: "email" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "enter email" },
                      model: {
                        value: _vm.searchForm_raw.email,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm_raw, "email", $$v)
                        },
                        expression: "searchForm_raw.email"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "User Name:", prop: "name" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "enter user name" },
                      model: {
                        value: _vm.searchForm_raw.name,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm_raw, "name", $$v)
                        },
                        expression: "searchForm_raw.name"
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
                        staticClass: "searchBtn",
                        attrs: { type: "primary" },
                        on: { click: _vm.onSearch }
                      },
                      [
                        _c("i", { staticClass: "el-icon-search" }, [
                          _vm._v("Search")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary", id: "addUser" },
                        on: { click: _vm.addUser }
                      },
                      [_vm._v("New User")]
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
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "showUserInfo" },
        [
          _c(
            "el-table",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.loading,
                  expression: "loading"
                }
              ],
              ref: "userTable",
              staticStyle: { width: "100%" },
              attrs: { data: _vm.userListTable },
              on: { "sort-change": _vm.sortChange }
            },
            [
              _c("el-table-column", {
                attrs: {
                  prop: "email",
                  label: "Email",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "name",
                  label: "User Name",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "created_at",
                  label: "Creation Time",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { prop: "status", label: "Status", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c("el-switch", {
                          attrs: { "active-color": "#41babc" },
                          on: {
                            change: function($event) {
                              _vm.changeSwitch(scope.row)
                            }
                          },
                          model: {
                            value: scope.row.statusSwitch,
                            callback: function($$v) {
                              _vm.$set(scope.row, "statusSwitch", $$v)
                            },
                            expression: "scope.row.statusSwitch"
                          }
                        }),
                        _vm._v(" "),
                        scope.row.statusSwitch
                          ? _c("span", { staticClass: "themeColor" }, [
                              _vm._v("Active")
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        !scope.row.statusSwitch
                          ? _c("span", { staticClass: "red" }, [
                              _vm._v("Inactive")
                            ])
                          : _vm._e()
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "Password", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c(
                          "el-button",
                          {
                            staticStyle: { "font-size": "14px" },
                            attrs: { type: "text", title: "reset password" },
                            on: {
                              click: function($event) {
                                _vm.resetPwd(scope.row)
                              }
                            }
                          },
                          [_vm._v("Reset")]
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("el-pagination", {
            attrs: {
              background: "",
              "current-page": _vm.currentPage,
              "page-size": _vm.pageSize,
              layout: "total, sizes, prev, pager, next, jumper",
              total: _vm.total
            },
            on: {
              "current-change": _vm.handleCurrentChange,
              "size-change": _vm.handleSizeChange
            }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-77799c44", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77799c44\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77799c44\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("1906a51e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77799c44\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UserInfo.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77799c44\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UserInfo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/user/UserInfo.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77799c44\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-77799c44\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/user/UserInfo.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-77799c44"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\user\\UserInfo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-77799c44", Component.options)
  } else {
    hotAPI.reload("data-v-77799c44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});