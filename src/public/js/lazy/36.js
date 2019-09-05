webpackJsonp([36],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    new Promise(function (resolve, reject) {
      resolve('success');
    }).then(function (data) {
      // 这里的data是上面resolve()里的值
      // console.log(data);
      // this.onSearch()
      // !this.$route.query.name?this.searchFlag = false:this.searchFlag = true
      _this.$http.post("/api/view/list_project", qs.stringify({ product_name: _this.$route.query.name, page: _this.$route.query.page, count: _this.$route.query.count })).then(function (response) {
        // console.log(response.data);
        _this.viewProjectListTable = response.data.result.data;
        _this.total = response.data.result.total;
      });
    }, function (error) {
      // 这里的error是上面reject()里的值
      // console.log(error);
    });
  },
  data: function data() {
    return {
      searchForm_raw: {
        product_name: this.$route.query.name || ''
      },
      searchForm: {
        product_name: this.$route.query.name || ''
      },
      userList: [],
      loading: false,
      versionLoading: false,
      // searchFlag:false,
      sort: [],
      dialogTableVisible: false,
      currentProjectId: null,
      uploadFile: {},
      rules: {},
      versionList: [],
      versionTotal: 0,
      versionCurrentPage: 1,
      versionPageSize: 10,
      viewProjectListTable: [],
      total: 0,
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: Number(this.$route.query.count) || 10
    };
  },

  methods: {
    onSearch: function onSearch() {
      var _this2 = this;

      this.$refs.viewTable.clearSort();
      this.sort = [];

      this.currentPage = 1;

      var obj = {};
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.$router.push({ path: this.$route.path, query: obj });

      this.searchForm.product_name = this.searchForm_raw.product_name;

      // this.searchForm.product_name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_project", qs.stringify(this.searchForm)).then(function (response) {
        // console.log(response.data);
        _this2.viewProjectListTable = response.data.result.data;
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

      this.$http.post("/api/view/list_project", qs.stringify(event.prop ? { product_name: this.searchForm.product_name, count: this.pageSize, sort: this.sort } : { product_name: this.searchForm.product_name, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this3.viewProjectListTable = response.data.result.data;
        _this3.total = response.data.result.total;
      });
    },
    rowDblClick: function rowDblClick(row, column, event) {
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.transItem(row);
    },
    transItem: function transItem(row) {
      var obj = {
        id: row.id
      };
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.$router.push({ path: '/viewentry', query: obj });
    },
    openUploadModal: function openUploadModal(row) {
      var _this4 = this;

      this.versionLoading = true;
      this.dialogTableVisible = true;
      this.currentProjectId = row.id;
      this.$http.post("/api/view/list_version", qs.stringify({ product_id: row.id })).then(function (response) {
        _this4.versionList = response.data.data;
        _this4.activities = _this4.versionList;
        _this4.versionTotal = response.data.total;
        _this4.versionLoading = false;
      });
    },
    closeUploadModal: function closeUploadModal() {
      this.versionList = [];
      this.versionTotal = 0;
      this.versionCurrentPage = 1;
      this.versionLoading = false;
    },
    selectVersion: function selectVersion(versionName) {
      var obj = {
        id: this.currentProjectId
      };
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      versionName ? obj.v = versionName : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.$router.push({ path: '/viewentry', query: obj });
    },
    versionHandleCurrentChange: function versionHandleCurrentChange(val) {
      var _this5 = this;

      this.$http.post("/api/view/list_version", qs.stringify({ page: val, product_id: this.currentProjectId })).then(function (response) {
        _this5.versionList = response.data.data;
        _this5.versionTotal = response.data.total;
      });
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this6 = this;

      this.currentPage = val;
      var obj = {};
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.pageSize ? obj.count = this.pageSize : null;
      val ? obj.page = val : null;
      this.$router.push({ path: this.$route.path, query: obj });

      // if(this.searchFlag){
      this.$http.post("/api/view/list_project", qs.stringify(this.sort[0] ? { product_name: this.searchForm.product_name, page: val, count: this.pageSize, sort: this.sort } : { product_name: this.searchForm.product_name, page: val, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this6.viewProjectListTable = response.data.result.data;
        _this6.total = response.data.result.total;
      });
      // }else{
      //   this.$http.post("/api/view/list_project",qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.viewProjectListTable = response.data.result.data;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33af995b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-33af995b\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "clearfix", attrs: { id: "viewProjectMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [_c("el-breadcrumb-item", [_vm._v("Projects")])],
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
                    return _vm.onSearch($event)
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
              ref: "viewTable",
              staticStyle: { width: "100%" },
              attrs: { data: _vm.viewProjectListTable },
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
                attrs: { label: "Versions", align: "center" },
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
                              size: "small",
                              title: "View"
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                _vm.openUploadModal(scope.row)
                              }
                            }
                          },
                          [_vm._v("View")]
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
                              title: "Entries"
                            },
                            on: {
                              click: function($event) {
                                _vm.transItem(scope.row)
                              }
                            }
                          },
                          [_vm._v("Entries")]
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
          }),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              attrs: {
                title: "Versions",
                width: "450px",
                visible: _vm.dialogTableVisible,
                "close-on-click-modal": false
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogTableVisible = $event
                },
                close: _vm.closeUploadModal
              }
            },
            [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.versionLoading,
                      expression: "versionLoading"
                    }
                  ],
                  staticClass: "requestLoadingCon"
                },
                [
                  _c("i", { staticClass: "el-icon-loading" }),
                  _vm._v(" Requesting...\n      ")
                ]
              ),
              _vm._v(" "),
              !_vm.versionLoading && _vm.versionList.length === 0
                ? _c(
                    "div",
                    { staticStyle: { color: "#aaa", "text-align": "center" } },
                    [_vm._v("[ No Version ]")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "el-timeline",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.versionLoading,
                      expression: "!versionLoading"
                    }
                  ]
                },
                _vm._l(_vm.versionList, function(item, index) {
                  return _c("el-timeline-item", { key: index }, [
                    _c(
                      "div",
                      {
                        staticClass: "timestampCon",
                        on: {
                          click: function($event) {
                            _vm.selectVersion(item.version_name)
                          }
                        }
                      },
                      [
                        _c("span", { staticClass: "versionNameCon" }, [
                          _vm._v(_vm._s(item.version_name))
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "versionIdCon" }, [
                          _vm._v(_vm._s(" ------ " + item.created_at))
                        ])
                      ]
                    )
                  ])
                })
              ),
              _vm._v(" "),
              _c("el-pagination", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.versionLoading && _vm.versionList.length > 0,
                    expression: "!versionLoading&&versionList.length>0"
                  }
                ],
                attrs: {
                  small: "",
                  "current-page": _vm.versionCurrentPage,
                  "page-size": _vm.versionPageSize,
                  layout: "total, prev, pager, next, jumper",
                  total: _vm.versionTotal
                },
                on: { "current-change": _vm.versionHandleCurrentChange }
              })
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
    require("vue-hot-reload-api")      .rerender("data-v-33af995b", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33af995b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33af995b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("f1a4482a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33af995b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewList.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33af995b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/brow/ViewList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33af995b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-33af995b\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/brow/ViewList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-33af995b"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\brow\\ViewList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33af995b", Component.options)
  } else {
    hotAPI.reload("data-v-33af995b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});