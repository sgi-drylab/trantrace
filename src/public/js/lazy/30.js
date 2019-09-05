webpackJsonp([30],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    // new Promise((resolve,reject)=>{
    //   this.$http.post("/api/user/list").then(response=>{
    //     // console.log(response.data);
    //     this.userList = response.data.data;
    //     resolve('success')
    //   }).catch(err=>{
    //     reject('Request failed!')
    //   })
    // }).then(data=>{
    // 这里的data是上面resolve()里的值
    // console.log(data);

    // this.$router.push(this.$route.path+'?page=1&count=10')

    // !this.$route.query.name&&!this.$route.query.priority&&!this.$route.query.deadline?this.searchFlag = false:this.searchFlag = true
    this.$http.post("/api/product/list", qs.stringify({ page: this.$route.query.page || 1, count: this.$route.query.count || 10, product_name: this.$route.query.name, priority: this.$route.query.priority, deadline: this.$route.query.deadline })).then(function (response) {
      response.data.result.data.forEach(function (item) {
        _this.$set(item, 'CompletedQualifiedPercentage', _this.$formatPercentage(item.Completed_Qualified * 100) + '%');
        // let p = '0%';
        // if(!item.total_nums){
        //   p="0%"
        // }else{
        //   if(!item.Qualified_nums){
        //     p="0%"
        //   }else{
        //     p = parseInt(item.Qualified_nums*10000/item.total_nums)/100+'%'
        //   }
        // }
        // this.$set(item,'CompletedPercentage',p)
      });
      _this.projectListTable = response.data.result.data;
      _this.total = response.data.result.total;
    });
    // },error=>{
    //   // 这里的error是上面reject()里的值
    //   console.log(error);
    // })
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
      sort: [],
      userList: [],
      loading: false,
      // searchFlag:false,
      rules: {},
      projectListTableAll: [],
      projectListTable: [],
      total: 0,
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: Number(this.$route.query.count) || 10
    };
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
      var _this2 = this;

      this.$refs.ProjectTable.clearSort();
      this.sort = [];

      this.currentPage = 1;
      var obj = {};
      this.searchForm_raw.product_name ? obj.name = this.searchForm_raw.product_name : null;
      this.searchForm_raw.priority ? obj.priority = this.searchForm_raw.priority : null;
      this.searchForm_raw.deadline ? obj.deadline = this.searchForm_raw.deadline : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.$router.push({ path: '/projectlist', query: obj });

      this.searchForm.product_name = this.searchForm_raw.product_name;
      this.searchForm.priority = this.searchForm_raw.priority;
      this.searchForm.deadline = this.searchForm_raw.deadline;

      // this.searchForm.product_name===''&&this.searchForm.priority===''&&this.searchForm.deadline===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/product/list", qs.stringify(this.searchForm)).then(function (response) {
        response.data.result.data.forEach(function (item) {
          _this2.$set(item, 'CompletedQualifiedPercentage', _this2.$formatPercentage(item.Completed_Qualified * 100) + '%');
          // let p = '0%';
          // if(!item.total_nums){
          //   p="0%"
          // }else{
          //   if(!item.Qualified_nums){
          //     p="0%"
          //   }else{
          //     p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
          //   }
          // }
          // this.$set(item,'CompletedPercentage',p)
        });
        _this2.projectListTable = response.data.result.data;
        _this2.total = response.data.result.total;
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

      this.$http.post("/api/product/list", qs.stringify(event.prop ? { product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, count: this.pageSize, sort: this.sort } : { product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, count: this.pageSize })).then(function (response) {
        response.data.result.data.forEach(function (item) {
          _this3.$set(item, 'CompletedQualifiedPercentage', _this3.$formatPercentage(item.Completed_Qualified * 100) + '%');
          // let p = '0%';
          // if(!item.total_nums){
          //   p="0%"
          // }else{
          //   if(!item.Qualified_nums){
          //     p="0%"
          //   }else{
          //     p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
          //   }
          // }
          // this.$set(item,'CompletedPercentage',p)
        });
        _this3.projectListTable = response.data.result.data;
        _this3.total = response.data.result.total;
      });
    },
    addProject: function addProject() {
      this.$router.push(this.searchForm.product_name ? '/addproject?name=' + this.searchForm.product_name : '/addproject');
    },
    rowDblClick: function rowDblClick(row, column, event) {
      this.transItem(row);
    },
    transItem: function transItem(row) {
      // console.log(row);
      // console.log(column);
      // console.log(event);
      var obj = {
        id: row.id
      };
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.searchForm.priority ? obj.priority = this.searchForm.priority : null;
      this.searchForm.deadline ? obj.deadline = this.searchForm.deadline : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.$router.push({ path: '/projectdetail', query: obj });
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this4 = this;

      // console.log(`当前页: ${val}`)
      this.currentPage = val;
      var obj = {};
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.searchForm.priority ? obj.priority = this.searchForm.priority : null;
      this.searchForm.deadline ? obj.deadline = this.searchForm.deadline : null;
      this.pageSize ? obj.count = this.pageSize : null;
      val ? obj.page = val : null;
      this.$router.push({ path: '/projectlist', query: obj });

      // if(this.searchFlag){
      this.$http.post("/api/product/list", qs.stringify(this.sort[0] ? { product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, page: val, count: this.pageSize, sort: this.sort } : { product_name: this.searchForm.product_name, priority: this.searchForm.priority, deadline: this.searchForm.deadline, page: val, count: this.pageSize })).then(function (response) {
        response.data.result.data.forEach(function (item) {
          _this4.$set(item, 'CompletedQualifiedPercentage', _this4.$formatPercentage(item.Completed_Qualified * 100) + '%');
          // let p = '0%';
          // if(!item.total_nums){
          //   p="0%"
          // }else{
          //   if(!item.Qualified_nums){
          //     p="0%"
          //   }else{
          //     p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
          //   }
          // }
          // this.$set(item,'CompletedPercentage',p)
        });
        _this4.projectListTable = response.data.result.data;
        _this4.total = response.data.result.total;
      });
      // }else{
      //   this.$http.post("/api/product/list",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize,})).then(response=>{
      //     response.data.result.data.forEach(item=>{
      //     let p = '0%';
      //     if(!item.total_nums){
      //       p="0%"
      //     }else{
      //       if(!item.Qualified_nums){
      //         p="0%"
      //       }else{
      //         p = parseInt(item.Qualified_nums*100/item.total_nums)+'%'
      //       }
      //     }
      //     this.$set(item,'CompletedPercentage',p)
      //   })
      //     this.projectListTable = this.projectListTableAll;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-571064e6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-571064e6\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "clearfix", attrs: { id: "projectMain" } },
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
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "warning", size: "small" },
                        on: { click: _vm.addProject }
                      },
                      [_vm._v("New Project")]
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
              ref: "ProjectTable",
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.projectListTable,
                "row-class-name": _vm.deadlineHighlight
              },
              on: {
                "row-dblclick": _vm.rowDblClick,
                "sort-change": _vm.sortChange
              }
            },
            [
              _c("el-table-column", {
                attrs: {
                  prop: "product",
                  label: "Project Name",
                  align: "center",
                  sortable: ""
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
              _c("el-table-column", {
                attrs: {
                  prop: "total_nums",
                  label: "Total",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "Completed_Qualified",
                  label: "Completed",
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
                            style:
                              scope.row.CompletedPercentage === "0.00%"
                                ? "color:red"
                                : ""
                          },
                          [
                            _vm._v(
                              _vm._s(scope.row.CompletedQualifiedPercentage)
                            )
                          ]
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "Operation", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "text",
                              size: "large",
                              title: "Detail"
                            },
                            on: {
                              click: function($event) {
                                _vm.transItem(scope.row)
                              }
                            }
                          },
                          [_vm._v("Detail")]
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
    require("vue-hot-reload-api")      .rerender("data-v-571064e6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-571064e6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-571064e6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("077b6ea2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-571064e6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectList.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-571064e6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/projectList/ProjectList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-571064e6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-571064e6\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/ProjectList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-571064e6"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\projectList\\ProjectList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-571064e6", Component.options)
  } else {
    hotAPI.reload("data-v-571064e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});