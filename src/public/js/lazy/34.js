webpackJsonp([34],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    // console.log(this.$route.path);
    this.$route.path === '/t_history' ? this.url = '/api/translate/history' : null;
    this.$route.path === '/a_history' ? this.url = '/api/approve/list' : null;
    this.$route.path === '/v_history' ? this.url = '/api/view/list_conflict_all' : null;

    // this.$router.push(this.$route.path+'?page=1&count=10')
    // this.onSearch()
    // !this.$route.query.name&&!this.$route.query.key&&!this.$route.query.status?this.searchFlag = false:this.searchFlag = true
    this.$http.post(this.url, qs.stringify({ product_name: this.$route.query.name, key: this.$route.query.key, status: this.$route.query.status, page: this.$route.query.page, count: this.$route.query.count })).then(function (response) {
      // console.log(response.data);
      _this.historyListTable = response.data.data;
      _this.total = response.data.total;
    });
  },
  data: function data() {
    return {
      url: '',
      searchForm_raw: {
        product_name: this.$route.query.name || '',
        key: this.$route.query.key || '',
        status: this.$route.query.status || ''
      },
      searchForm: {
        product_name: this.$route.query.name || '',
        key: this.$route.query.key || '',
        status: this.$route.query.status || ''
      },
      listUrl: '',
      loading: false,
      // searchFlag:false,
      sort: [],
      rules: {},
      historyListTable: [],
      total: 0,
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: Number(this.$route.query.count) || 10
    };
  },

  watch: {
    '$route.path': {
      handler: function handler(val, oldVal) {
        if (val !== oldVal) {
          // console.log(val,oldVal)
          this.searchForm_raw.product_name = "";
          this.searchForm_raw.key = "";
          this.searchForm_raw.status = "";

          this.searchForm.product_name = "";
          this.searchForm.key = "";
          this.searchForm.status = "";

          // this.currentPage = 1
          this.pageSize = 10;
          val === '/t_history' ? this.url = '/api/translate/history' : null;
          val === '/a_history' ? this.url = '/api/approve/list' : null;
          val === '/v_history' ? this.url = '/api/view/list_conflict_all' : null;
          this.onSearch();
        }

        // this.loading = true
        // this.$http.post(this.url).then(response=>{
        //   // console.log(response.data);
        //   this.historyListTable = response.data.data;
        //   this.total = response.data.total;
        //   this.loading = false
        // })
      },

      deep: true
    }
  },
  methods: {
    onSearch: function onSearch() {
      var _this2 = this;

      this.$refs.historyListTable.clearSort();
      this.sort = [];

      this.currentPage = 1;
      var obj = {};
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.status ? obj.status = this.searchForm.status : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.$router.push({ path: this.$route.path, query: obj });

      this.searchForm.product_name = this.searchForm_raw.product_name;
      this.searchForm.key = this.searchForm_raw.key;
      this.searchForm.status = this.searchForm_raw.status;

      // this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.status===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post(this.url, qs.stringify({ product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this2.historyListTable = response.data.data;
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

      this.$http.post(this.url, qs.stringify(event.prop ? { product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize, sort: this.sort } : { product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this3.historyListTable = response.data.data;
        _this3.total = response.data.total;
      });
    },
    rowDblClick: function rowDblClick(row, column, event) {
      // console.log(row);
      // console.log(column);
      // console.log(event);
      this.transItem(row);
    },
    transItem: function transItem(row) {
      // console.log(row);
      // this.$store.state.translateSearchForm = this.searchForm;
      var path = '';
      this.$route.path === '/t_history' ? path = '/t_browhistoryitem' : null;
      this.$route.path === '/a_history' ? path = '/a_browhistoryitem' : null;
      this.$route.path === '/v_history' ? path = '/v_browhistoryitem' : null;

      var obj = {
        id: row.id
      };
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.status ? obj.status = this.searchForm.status : null;
      this.currentPage ? obj.page = this.currentPage : null;
      this.pageSize ? obj.count = this.pageSize : null;

      this.$router.push({ path: path, query: obj });
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this4 = this;

      this.currentPage = val;
      var obj = {};
      this.searchForm.product_name ? obj.name = this.searchForm.product_name : null;
      this.searchForm.key ? obj.key = this.searchForm.key : null;
      this.searchForm.status ? obj.status = this.searchForm.status : null;
      this.pageSize ? obj.count = this.pageSize : null;
      val ? obj.page = val : null;
      this.$router.push({ path: this.$route.path, query: obj });

      // if(this.searchFlag){
      this.$http.post(this.url, qs.stringify(this.sort[0] ? { product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: val, count: this.pageSize, sort: this.sort } : { product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: val, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        _this4.historyListTable = response.data.data;
        _this4.total = response.data.total;
      });
      // }else{
      //   this.$http.post(this.url,qs.stringify(this.sort[0]?{page:val,count:this.pageSize,sort:this.sort}:{page:val,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     this.historyListTable = response.data.data;
      //     this.total = response.data.total;
      //   })
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d413d48\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-8d413d48\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "historyListMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _vm.$route.path !== "/v_history"
            ? _c("el-breadcrumb-item", [_vm._v("History")])
            : _c("el-breadcrumb-item", [_vm._v("Issues")])
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
                }
              },
              [
                _c(
                  "el-form-item",
                  { attrs: { label: "Project Name:" } },
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
                  { key: "ta_statusSearch", attrs: { label: "Status:" } },
                  [
                    _c(
                      "el-select",
                      {
                        attrs: { clearable: "", placeholder: "select status" },
                        model: {
                          value: _vm.searchForm_raw.status,
                          callback: function($$v) {
                            _vm.$set(_vm.searchForm_raw, "status", $$v)
                          },
                          expression: "searchForm_raw.status"
                        }
                      },
                      [
                        _c("el-option", { attrs: { label: "All", value: "" } }),
                        _vm._v(" "),
                        _vm.$route.path === "/t_history"
                          ? _c("el-option", {
                              attrs: {
                                label: "Unreviewed",
                                value: "Unreviewed"
                              }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/t_history"
                          ? _c("el-option", {
                              attrs: { label: "Fail", value: "Unretranslated" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/t_history"
                          ? _c("el-option", {
                              attrs: { label: "Pass", value: "Qualified" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/a_history"
                          ? _c("el-option", {
                              attrs: { label: "Pass", value: "Qualified" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/a_history"
                          ? _c("el-option", {
                              attrs: { label: "Fail", value: "Unretranslated" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/t_history" ||
                        _vm.$route.path === "/a_history"
                          ? _c("el-option", {
                              attrs: { label: "Error", value: "Error" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/v_history"
                          ? _c("el-option", {
                              attrs: { label: "Unresolved", value: "0" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/v_history"
                          ? _c("el-option", {
                              attrs: { label: "Agreed", value: "1" }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.$route.path === "/v_history"
                          ? _c("el-option", {
                              attrs: { label: "Ignored", value: "2" }
                            })
                          : _vm._e()
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
        { staticClass: "showHistoryList" },
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
              ref: "historyListTable",
              staticStyle: { width: "100%" },
              attrs: { data: _vm.historyListTable },
              on: {
                "row-dblclick": _vm.rowDblClick,
                "sort-change": _vm.sortChange
              }
            },
            [
              _vm.$route.path === "/v_history"
                ? _c("el-table-column", {
                    key: "o_historySource",
                    attrs: {
                      label: "Issues",
                      align: "center",
                      type: "expand",
                      width: "100"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c("div", [_vm._v(_vm._s(scope.row.objection))])
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/t_history" ||
              _vm.$route.path === "/a_history"
                ? _c("el-table-column", {
                    key: "ta_histiorySource",
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
                  })
                : _vm._e(),
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
              _vm.$route.path === "/t_history" ||
              _vm.$route.path === "/a_history"
                ? _c("el-table-column", {
                    key: "ta_historyStatus",
                    attrs: {
                      prop: "status",
                      label: "Status",
                      align: "center",
                      sortable: "custom"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            scope.row.status === "Qualified"
                              ? _c("div", [_vm._v("Pass")])
                              : scope.row.status === "Unretranslated"
                                ? _c("div", [_vm._v("Fail")])
                                : _c("div", [_vm._v(_vm._s(scope.row.status))])
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/v_history"
                ? _c("el-table-column", {
                    key: "v_historyStatus",
                    attrs: {
                      label: "Status",
                      align: "center",
                      sortable: "custom"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            scope.row.approved === 2
                              ? _c("div", [_vm._v("Ignored")])
                              : scope.row.approved === 1
                                ? _c("div", [_vm._v("Agreed")])
                                : scope.row.approved === 0
                                  ? _c(
                                      "div",
                                      { staticStyle: { color: "#E6A23C" } },
                                      [_vm._v("Unresolved")]
                                    )
                                  : _vm._e()
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/t_history"
                ? _c("el-table-column", {
                    key: "t_historyCreate_at",
                    attrs: {
                      prop: "created_at",
                      label: "Translation Time",
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
                              { attrs: { title: scope.row.created_at } },
                              [_vm._v(_vm._s(scope.row.created_at))]
                            )
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/a_history"
                ? _c("el-table-column", {
                    key: "a_historyUpdated_at",
                    attrs: {
                      prop: "updated_at",
                      label: "Review Time",
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
                              { attrs: { title: scope.row.updated_at } },
                              [_vm._v(_vm._s(scope.row.updated_at))]
                            )
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/v_history"
                ? _c("el-table-column", {
                    key: "v_historyCreate_at",
                    attrs: {
                      prop: "created_at",
                      label: "Creation Time",
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
                              { attrs: { title: scope.row.created_at } },
                              [_vm._v(_vm._s(scope.row.created_at))]
                            )
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.$route.path === "/v_history"
                ? _c("el-table-column", {
                    key: "v_historyAdvice_updated_at",
                    attrs: {
                      prop: "advice_updated_at",
                      label: "Reply Time",
                      align: "center",
                      sortable: "custom"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            scope.row.approved !== 0
                              ? _c(
                                  "div",
                                  {
                                    attrs: {
                                      title:
                                        scope.row.approved !== 0
                                          ? scope.row.advice_updated_at
                                          : ""
                                    }
                                  },
                                  [_vm._v(_vm._s(scope.row.advice_updated_at))]
                                )
                              : _vm._e()
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "Translation", align: "center" },
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
    require("vue-hot-reload-api")      .rerender("data-v-8d413d48", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d413d48\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d413d48\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("fd6b466a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d413d48\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./HistoryList.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d413d48\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./HistoryList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/historyList/HistoryList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d413d48\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-8d413d48\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/historyList/HistoryList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8d413d48"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\historyList\\HistoryList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d413d48", Component.options)
  } else {
    hotAPI.reload("data-v-8d413d48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});