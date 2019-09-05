webpackJsonp([37],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    // this.$route.query.v?this.searchForm.version_name=this.$route.query.v:this.searchForm.version_name=''
    var obj = {};
    this.$route.query.name ? obj.name = this.$route.query.name : null;
    this.$route.query.page ? obj.page = this.$route.query.page : null;
    this.$route.query.count ? obj.count = this.$route.query.count : null;
    this.backUrl = { path: '/viewlist', query: obj
      // console.log(this.backUrl)
      // !this.$route.query.key&&!this.$route.query.v?this.searchFlag = false:this.searchFlag = true
    };this.$http.post("/api/view/list_items", qs.stringify({ key: this.searchForm.key, version_name: this.$route.query.v, product_id: this.$route.query.id, page: this.$route.query.page1, count: this.$route.query.count1 })).then(function (response) {
      // console.log(response.data);
      _this.viewItemListTable = response.data.result.data;
      _this.total = response.data.result.total;
    });

    // this.onSearch()
    // this.$http.post("/api/view/list_items",qs.stringify({product_id:this.$route.query.id,version_name:this.$route.query.v})).then(response=>{
    //   // console.log(response.data);
    //   this.viewItemListTable = response.data.result.data;
    //   this.total = response.data.result.total;
    //   this.loading = false
    // })
  },
  data: function data() {
    return {
      backUrl: '',
      searchForm_raw: {
        key: this.$route.query.key || '',
        version_name: this.$route.query.v || ''
      },
      searchForm: {
        key: this.$route.query.key || '',
        version_name: this.$route.query.v || ''
      },
      loading: false,
      // searchFlag:false,
      sort: [],
      rules: {},
      viewItemListTable: [],
      total: 0,
      currentPage: Number(this.$route.query.page1) || 1,
      pageSize: Number(this.$route.query.count1) || 10
    };
  },

  methods: {
    onSearch: function onSearch() {
      var _this2 = this;

      this.$refs.entryTable.clearSort();
      this.sort = [];

      this.currentPage = 1;
      var obj = {};
      this.$route.query.id ? obj.id = this.$route.query.id : null;
      this.$route.query.name ? obj.name = this.$route.query.name : null;
      this.$route.query.page ? obj.page = this.$route.query.page : null;
      this.$route.query.count ? obj.count = this.$route.query.count : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.version_name ? obj.v = this.searchForm.version_name : null;
      this.currentPage ? obj.page1 = this.currentPage : null;
      this.pageSize ? obj.count1 = this.pageSize : null;
      this.$router.push({ path: this.$route.path, query: obj });

      this.searchForm.key = this.searchForm_raw.key;
      this.searchForm.version_name = this.searchForm_raw.version_name;

      // this.searchForm.key===''&&this.searchForm.version_name===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/view/list_items", qs.stringify({ key: this.searchForm.key, version_name: this.searchForm.version_name, product_id: this.$route.query.id, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this2.viewItemListTable = response.data.result.data;
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

      this.$http.post("/api/view/list_items", qs.stringify(event.prop ? { key: this.searchForm.key, version_name: this.searchForm.version_name, product_id: this.$route.query.id, page: this.currentPage, count: this.pageSize, sort: this.sort } : { key: this.searchForm.key, version_name: this.searchForm.version_name, product_id: this.$route.query.id, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this3.viewItemListTable = response.data.result.data;
        _this3.total = response.data.result.total;
      });
    },
    rowDblClick: function rowDblClick(row, column, event) {
      var obj = {
        id: row.product_id,
        eid: row.export_id
      };
      this.$route.query.name ? obj.name = this.$route.query.name : null;
      this.$route.query.page ? obj.page = this.$route.query.page : null;
      this.$route.query.count ? obj.count = this.$route.query.count : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.version_name ? obj.v = this.searchForm.version_name : null;
      this.currentPage ? obj.page1 = this.currentPage : null;
      this.pageSize ? obj.count1 = this.pageSize : null;
      this.$router.push({ path: '/viewdetail', query: obj });
    },
    transItem: function transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      var obj = {
        id: row.product_id,
        eid: row.export_id
      };
      this.$route.query.name ? obj.name = this.$route.query.name : null;
      this.$route.query.page ? obj.page = this.$route.query.page : null;
      this.$route.query.count ? obj.count = this.$route.query.count : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.version_name ? obj.v = this.searchForm.version_name : null;
      this.currentPage ? obj.page1 = this.currentPage : null;
      this.pageSize ? obj.count1 = this.pageSize : null;
      this.$router.push({ path: '/viewdetail', query: obj });
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this4 = this;

      this.currentPage = val;
      var obj = {
        id: this.$route.query.id
      };
      this.$route.query.name ? obj.name = this.$route.query.name : null;
      this.$route.query.page ? obj.page = this.$route.query.page : null;
      this.$route.query.count ? obj.count = this.$route.query.count : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.version_name ? obj.key = this.searchForm.version_name : null;
      val ? obj.page1 = val : null;
      this.pageSize ? obj.count1 = this.pageSize : null;
      this.$router.push({ path: this.$route.path, query: obj });

      // if(this.searchFlag){
      this.$http.post("/api/view/list_items", qs.stringify(this.sort[0] ? { key: this.searchForm.key, version_name: this.searchForm.version_name, product_id: this.$route.query.id, page: val, count: this.pageSize, sort: this.sort } : { key: this.searchForm.key, version_name: this.searchForm.version_name, product_id: this.$route.query.id, page: val, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this4.viewItemListTable = response.data.result.data;
        _this4.total = response.data.result.total;
      });
      // }else{
      //   this.$http.post("/api/view/list_items",qs.stringify(this.sort[0]?{product_id:this.$route.query.id,page:val,count:this.pageSize,sort:this.sort}:{product_id:this.$route.query.id,page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.viewItemListTable = response.data.result.data;
      //     this.total = response.data.result.total;
      //   })
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71472185\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-71472185\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "transListMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
            _vm._v("Projects")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("Entries")])
        ],
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
                  { attrs: { label: "Keyword:" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "enter keyword" },
                      model: {
                        value: _vm.searchForm_raw.key,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm_raw, "key", $$v)
                        },
                        expression: "searchForm_raw.key"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { attrs: { label: "Version:" } },
                  [
                    _c("el-input", {
                      attrs: { placeholder: "enter version" },
                      model: {
                        value: _vm.searchForm_raw.version_name,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm_raw, "version_name", $$v)
                        },
                        expression: "searchForm_raw.version_name"
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
        { staticClass: "showTransList" },
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
              ref: "entryTable",
              staticStyle: { width: "100%" },
              attrs: { data: _vm.viewItemListTable },
              on: {
                "row-dblclick": _vm.rowDblClick,
                "sort-change": _vm.sortChange
              }
            },
            [
              _c("el-table-column", {
                attrs: {
                  label: "Source",
                  align: "center",
                  type: "expand",
                  width: "75"
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c(
                          "ol",
                          { staticStyle: { "padding-left": "20px" } },
                          _vm._l(JSON.parse(scope.row.translate), function(
                            item,
                            index
                          ) {
                            return _c(
                              "li",
                              {
                                key: index,
                                staticStyle: {
                                  margin: "10px 0",
                                  padding: "5px 0",
                                  "border-bottom": "1px dashed #ccc"
                                }
                              },
                              [_vm._v(_vm._s(Object.keys(item)[0]))]
                            )
                          })
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
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
                  prop: "key",
                  label: "Keyword",
                  align: "center",
                  sortable: "custom",
                  "show-overflow-tooltip": ""
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c("div", [
                          _vm._v(
                            _vm._s(Object.keys(JSON.parse(scope.row.key)[0])[0])
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
                  prop: "lang",
                  label: "Language",
                  align: "center",
                  sortable: "custom"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "version_name",
                  label: "Version",
                  align: "center"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "Operation", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        scope.row.status !== "Untranslated"
                          ? _c(
                              "el-button",
                              {
                                attrs: {
                                  type: "text",
                                  size: "medium",
                                  title: "View"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.transItem(scope.row)
                                  }
                                }
                              },
                              [_vm._v("View")]
                            )
                          : _vm._e()
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
              "page-sizes": [10, 20, 50],
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
    require("vue-hot-reload-api")      .rerender("data-v-71472185", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71472185\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71472185\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("e5a62b14", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71472185\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewEntry.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71472185\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewEntry.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/brow/ViewEntry.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71472185\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-71472185\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/brow/ViewEntry.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-71472185"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\brow\\ViewEntry.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71472185", Component.options)
  } else {
    hotAPI.reload("data-v-71472185", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});