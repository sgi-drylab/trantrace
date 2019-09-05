webpackJsonp([28],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    // this.$router.push(this.$route.path+'?page=1&count=10')
    this.onSearch();
  },
  data: function data() {
    return {
      searchForm_raw: {
        product_name: this.$route.query.name || '',
        priority: this.$route.query.priority || '',
        deadline: this.$route.query.deadline || ''
      },
      searchForm: {
        product_name: this.$route.query.name || '',
        priority: this.$route.query.priority || '',
        deadline: this.$route.query.deadline || ''
      },
      userList: [],
      loading: false,
      // searchFlag:false,
      sort: [],
      rules: {},
      overviewListTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },

  watch: {
    "$route.path": {
      handler: function handler(val) {
        // this.loading = true
        this.searchForm.product_name = "";
        this.searchForm.priority = "";
        this.searchForm.deadline = "";
        // this.searchFlag = false
        this.searchForm_raw.product_name = "";
        this.searchForm_raw.priority = "";
        this.searchForm_raw.deadline = "";
        // this.currentPage = 1
        this.pageSize = 10;
        this.onSearch();
        // switch (this.$route.path){
        //   case '/t_overviewlist':
        //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'translator',page:this.currentPage,count:this.pageSize})).then(response=>{
        //       this.overviewListTable = response.data.result.data;
        //       this.total = response.data.result.total
        //       this.loading = false
        //     })
        //   break;
        //   case '/a_overviewlist':
        //     this.$http.post('/api/Statistic/Accout_list_p',qs.stringify({Role:'reviewer',page:this.currentPage,count:this.pageSize})).then(response=>{
        //       this.overviewListTable = response.data.result.data;
        //       this.total = response.data.result.total
        //       this.loading = false
        //     })
        //   break;
        // }
      },

      deep: true
    }
  },
  methods: {
    deadlineHighlight: function deadlineHighlight(_ref) {
      var row = _ref.row,
          rowIndex = _ref.rowIndex;

      // console.log(row)
      if (new Date().valueOf() > new Date(row.deadline).valueOf()) {
        return 'deadlineOverdueHighlight';
      }
      return '';
    },
    onSearch: function onSearch() {
      var _this = this;

      this.$refs.overviewTable.clearSort();
      this.sort = [];

      this.currentPage = 1;

      this.searchForm.product_name = this.searchForm_raw.product_name;
      this.searchForm.priority = this.searchForm_raw.priority;
      this.searchForm.deadline = this.searchForm_raw.deadline;

      // this.searchForm.product_name===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      switch (this.$route.path) {
        case '/t_overview':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify({ Role: 'translator', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline })).then(function (response) {
            _this.overviewListTable = response.data.result.data;
            _this.total = response.data.result.total;
          });
          break;
        case '/a_overview':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify({ Role: 'reviewer', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline })).then(function (response) {
            _this.overviewListTable = response.data.result.data;
            _this.total = response.data.result.total;
          });
          break;
      }
    },
    sortChange: function sortChange(event) {
      var _this2 = this;

      var order = "";
      event.order === "ascending" ? order = 'ASC' : null;
      event.order === "descending" ? order = 'DESC' : null;
      this.sort[0] = event.prop;
      this.sort[1] = order;
      this.currentPage = 1;

      switch (this.$route.path) {
        case '/t_overview':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(event.prop ? { Role: 'translator', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, count: this.pageSize, sort: this.sort } : { Role: 'translator', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, count: this.pageSize })).then(function (response) {
            _this2.overviewListTable = response.data.result.data;
            _this2.total = response.data.result.total;
          });
          break;
        case '/a_overview':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(event.prop ? { Role: 'reviewer', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, count: this.pageSize, sort: this.sort } : { Role: 'reviewer', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, count: this.pageSize })).then(function (response) {
            _this2.overviewListTable = response.data.result.data;
            _this2.total = response.data.result.total;
          });
          break;
      }
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this3 = this;

      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      var obj = {};
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.searchForm.priority ? obj.priority = this.searchForm.priority : null;
      this.searchForm.deadline ? obj.deadline = this.searchForm.deadline : null;
      this.pageSize ? obj.count = this.pageSize : null;
      val ? obj.page = val : null;
      this.$router.push({ path: this.$route.path, query: obj });

      // if(this.searchFlag){
      switch (this.$route.path) {
        case '/t_overview':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(this.sort[0] ? { Role: 'translator', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, page: val, count: this.pageSize, sort: this.sort } : { Role: 'translator', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, page: val, count: this.pageSize })).then(function (response) {
            _this3.overviewListTable = response.data.result.data;
            _this3.total = response.data.result.total;
          });
          break;
        case '/a_overview':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(this.sort[0] ? { Role: 'reviewer', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, page: val, count: this.pageSize, sort: this.sort } : { Role: 'reviewer', product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, page: val, count: this.pageSize })).then(function (response) {
            _this3.overviewListTable = response.data.result.data;
            _this3.total = response.data.result.total;
          });
          break;
      }
      // }else{
      //   switch (this.$route.path){
      //     case '/t_overview':
      //       this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'translator',page:val,count:this.pageSize,sort:this.sort}:{Role:'translator',page:val,count:this.pageSize})).then(response=>{
      //         this.overviewListTable = response.data.result.data;
      //         this.total = response.data.result.total
      //       })
      //     break;
      //     case '/a_overview':
      //       this.$http.post('/api/Statistic/Accout_list_p',qs.stringify(this.sort[0]?{Role:'reviewer',page:val,count:this.pageSize,sort:this.sort}:{Role:'reviewer',page:val,count:this.pageSize})).then(response=>{
      //         this.overviewListTable = response.data.result.data;
      //         this.total = response.data.result.total
      //       })
      //     break;
      //   }
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1adb3ff0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1adb3ff0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "clearfix", attrs: { id: "overviewListMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [_c("el-breadcrumb-item", [_vm._v("Overview")])],
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
                  "label-width": "120px",
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
                  { attrs: { label: "Project Name:", prop: "product_name" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "enter project name" },
                      model: {
                        value: _vm.searchForm_raw.product_name,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm_raw, "product_name", $$v)
                        },
                        expression: "searchForm_raw.product_name"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "Deadline:", prop: "deadline" } },
                  [
                    _c("el-date-picker", {
                      attrs: {
                        type: "date",
                        "default-value": new Date(),
                        "value-format": "yyyy-MM-dd",
                        placeholder: "select deadline"
                      },
                      model: {
                        value: _vm.searchForm_raw.deadline,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm_raw, "deadline", $$v)
                        },
                        expression: "searchForm_raw.deadline"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "Priority:", prop: "priority" } },
                  [
                    _c(
                      "el-select",
                      {
                        attrs: { placeholder: "select priority" },
                        model: {
                          value: _vm.searchForm_raw.priority,
                          callback: function($$v) {
                            _vm.$set(_vm.searchForm_raw, "priority", $$v)
                          },
                          expression: "searchForm_raw.priority"
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
                        _c("el-option", { attrs: { label: "Low", value: "1" } })
                      ],
                      1
                    )
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
              ref: "overviewTable",
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.overviewListTable,
                "row-class-name": _vm.deadlineHighlight
              },
              on: { "sort-change": _vm.sortChange }
            },
            [
              _c("el-table-column", {
                attrs: {
                  prop: "product",
                  label: "Project Name",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "lang",
                  label: "Language",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "deadline",
                  label: "Deadline",
                  align: "center",
                  sortable: "custom"
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c("div", [
                          _vm._v(
                            _vm._s(
                              scope.row.deadline &&
                              scope.row.deadline.split(" ")[1]
                                ? scope.row.deadline.split(" ")[0]
                                : scope.row.deadline
                            )
                          )
                        ])
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "priority",
                  label: "Priority",
                  align: "center",
                  sortable: "custom"
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        scope.row.priority == "1"
                          ? _c("div", [_vm._v("Low")])
                          : _vm._e(),
                        _vm._v(" "),
                        scope.row.priority == "2"
                          ? _c("div", [_vm._v("Normal")])
                          : _vm._e(),
                        _vm._v(" "),
                        scope.row.priority == "3"
                          ? _c("div", { staticStyle: { color: "red" } }, [
                              _vm._v("High")
                            ])
                          : _vm._e()
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _vm.$route.path === "/t_overview"
                ? _c("el-table-column", {
                    key: "t_overview",
                    attrs: {
                      prop: "not_finished",
                      label: "Not Finished",
                      align: "center",
                      sortable: "custom"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  cursor: "pointer",
                                  color: "#41babc"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.$router.push(
                                      "/translation?name=" +
                                        scope.row.product +
                                        "&page=1"
                                    )
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "Translation: " +
                                    _vm._s(scope.row.Untranslated)
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  cursor: "pointer",
                                  color: "#41babc"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.$router.push(
                                      "/retranslation?name=" +
                                        scope.row.product +
                                        "&page=1"
                                    )
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "Retranslation: " +
                                    _vm._s(scope.row["Unretranslated"])
                                )
                              ]
                            )
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/a_overview"
                ? _c("el-table-column", {
                    key: "a_overview",
                    attrs: {
                      prop: "not_finished",
                      label: "Not Finished",
                      align: "center",
                      sortable: "custom"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  cursor: "pointer",
                                  color: "#41babc"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.$router.push(
                                      "/review?name=" +
                                        scope.row.product +
                                        "&page=1"
                                    )
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "Review: " + _vm._s(scope.row.Unreviewed)
                                )
                              ]
                            )
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-1adb3ff0", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1adb3ff0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1adb3ff0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("5d1c72da", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1adb3ff0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OverviewList.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1adb3ff0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OverviewList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1adb3ff0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1adb3ff0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/tranlationManagement/OverviewList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1adb3ff0"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\tranlationManagement\\OverviewList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1adb3ff0", Component.options)
  } else {
    hotAPI.reload("data-v-1adb3ff0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});