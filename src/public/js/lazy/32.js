webpackJsonp([32],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    // this.$router.push(this.$route.path+'?page=1&count=10')
    this.searchForm.product_name = this.$route.query.name || '';

    new Promise(function (resolve, reject) {
      _this.$http.post("/api/user/list").then(function (response) {
        // console.log(response.data);
        _this.userList = response.data.data;
        resolve();
      });
    }).then(function () {
      // this.onSearch()
      _this.$http.post("/api/translate/list", qs.stringify({ product_id: _this.$route.query.id || '', product_name: _this.searchForm.product_name, key: _this.searchForm.key, status: _this.searchForm.status, page: _this.currentPage, count: _this.pageSize })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this.$set(item, 'translate_users_name', "");
          _this.$set(item, 'translators', []);
        });
        if (response.data.data.length > 0) {
          response.data.data.forEach(function (item) {
            JSON.parse(item.translate_users).forEach(function (item1) {
              _this.userList.forEach(function (item2) {
                if (item1 === item2.id) {
                  item.translators.push(item2);
                  return false;
                }
              });
            });
          });
        }
        _this.allocationListTable = response.data.data;
        _this.total = response.data.total;
      });
    });
  },
  data: function data() {
    return _defineProperty({
      product_id: this.$route.query.id || null,
      loading: false,
      searchForm_raw: {
        product_name: this.$route.query.name || '',
        key: this.$route.query.key || '',
        status: this.$route.query.status || 'Unassigned'
      },
      searchForm: {
        product_name: this.$route.query.name || '',
        key: this.$route.query.key || '',
        status: this.$route.query.status || 'Unassigned'
      },
      // searchFlag:false,
      sort: [],
      userList: [],
      rules: {},
      translators: [],
      allocationListTable: [],
      total: 0,
      multipleSelection: [],
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: Number(this.$route.query.count) || 10,
      selectRowIndex: [],
      dialogVisible: false,
      batchTranslatorForm: {
        batch_translator_name: ''
      }
    }, "rules", {
      batch_translator_name: [{
        required: true,
        message: 'Please select a translator.'
      }]
    });
  },

  watch: {
    'multipleSelection': {
      handler: function handler(val) {
        var _this2 = this;

        this.selectRowIndex = [];
        if (val.length > 0) {
          val.forEach(function (item, index) {
            // console.log(this.allocationListTable.indexOf(item))
            _this2.selectRowIndex.push(_this2.allocationListTable.indexOf(item));
            _this2.tableRowClassName({ item: item });
          });
        }
      },

      deep: true
    }
  },
  methods: {
    tableRowClassName: function tableRowClassName(_ref2) {
      var row = _ref2.row,
          rowIndex = _ref2.rowIndex;

      // console.log(this.selectRowIndex)
      if (this.selectRowIndex.includes(rowIndex)) {
        // console.log(222)
        return 'success-row';
      }
    },
    onSearch: function onSearch() {
      var _this3 = this;

      this.$refs.allocationTable.clearSort();
      this.sort = [];

      this.currentPage = 1;
      this.product_id = null;

      this.searchForm.product_name = this.searchForm_raw.product_name;
      this.searchForm.key = this.searchForm_raw.key;
      this.searchForm.status = this.searchForm_raw.status;

      // this.searchForm.product_name===''&&this.searchForm.key===''&&this.searchForm.status===''?this.searchFlag = false:this.searchFlag = true
      this.$http.post("/api/translate/list", qs.stringify({ product_id: '', product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this3.$set(item, 'translate_users_name', "");
          _this3.$set(item, 'translators', []);
        });
        if (response.data.data.length > 0) {
          response.data.data.forEach(function (item) {
            JSON.parse(item.translate_users).forEach(function (item1) {
              _this3.userList.forEach(function (item2) {
                if (item1 === item2.id) {
                  item.translators.push(item2);
                  return false;
                }
              });
            });
          });
        }
        _this3.allocationListTable = response.data.data;
        _this3.total = response.data.total;
      });
    },
    sortChange: function sortChange(event) {
      var _this4 = this;

      var order = "";
      event.order === "ascending" ? order = 'ASC' : null;
      event.order === "descending" ? order = 'DESC' : null;
      this.sort[0] = event.prop;
      this.sort[1] = order;
      this.currentPage = 1;

      this.$http.post("/api/translate/list", qs.stringify(event.prop ? { product_id: this.$route.query.id || '', product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize, sort: this.sort } : { product_id: this.$route.query.id || '', product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this4.$set(item, 'translate_users_name', "");
          _this4.$set(item, 'translators', []);
        });
        if (response.data.data.length > 0) {
          response.data.data.forEach(function (item) {
            JSON.parse(item.translate_users).forEach(function (item1) {
              _this4.userList.forEach(function (item2) {
                if (item1 === item2.id) {
                  item.translators.push(item2);
                  return false;
                }
              });
            });
          });
        }
        _this4.allocationListTable = response.data.data;
        _this4.total = response.data.total;
      });
    },
    visibleSelect: function visibleSelect(row) {
      document.getElementById("selectTranslator" + row.id).style.border = "1px solid #DCDFE6";
    },
    submit: function submit(row) {
      var _this5 = this;

      // console.log(row)
      if (row.translate_users_name) {
        document.getElementById("selectTranslator" + row.id).style.border = "1px solid #DCDFE6";
        var submitObj = {};
        submitObj.translate_in_id = JSON.stringify([row.id]);
        submitObj.translate_users_name = row.translate_users_name;
        // console.log(submitObj);
        this.$http.post('/api/translate/assign', qs.stringify(submitObj)).then(function (response) {
          setTimeout(function () {
            _this5.$store.state.taskList.Unassigned_nums -= 1;
            _this5.handleCurrentChange(_this5.currentPage);
            // console.log(this.searchForm.status)
          }, 1000);
        });
      } else {
        document.getElementById("selectTranslator" + row.id).style.border = "1px solid #E6A23C";
        this.$message({
          message: 'Translator is required.',
          type: 'warning'
        });
      }
    },
    batchSubmitOpen: function batchSubmitOpen() {
      var _this6 = this;

      if (this.multipleSelection.length === 0) {
        this.$message({
          message: 'No entries are selected for bulk allocation.',
          type: 'warning'
        });
        return false;
      }
      // Determine if it is the same project
      var flag = false;
      var projectName = this.multipleSelection[0].product;
      this.multipleSelection.forEach(function (item) {
        if (item.product !== projectName) {
          flag = true;
          _this6.$message({
            message: 'Batch allocation only works for entries from same project.',
            type: 'warning'
          });
          return false;
        }
      });
      if (!flag) {
        this.translators = this.multipleSelection[0].translators;
        this.dialogVisible = true;
      }
    },
    batchSubmit: function batchSubmit() {
      var _this7 = this;

      this.$refs.batchTranslatorForm.validate(function (valid) {
        if (valid) {
          var IDS = [];
          $.each(_this7.multipleSelection, function (i, ele) {
            IDS.push(ele.id);
          });
          var submitObj = {};
          submitObj.translate_in_id = JSON.stringify(IDS);
          submitObj.translate_users_name = _this7.batchTranslatorForm.batch_translator_name;
          // console.log(submitObj);
          _this7.$http.post('/api/translate/assign', qs.stringify(submitObj)).then(function (response) {
            setTimeout(function () {
              _this7.$store.state.taskList.Unassigned_nums -= IDS.length;
              _this7.batchTranslatorForm.batch_translator_name = '';
              _this7.dialogVisible = false;
              _this7.handleCurrentChange(_this7.currentPage);
            }, 1000);
          });
        }
      });
    },
    checkboxT: function checkboxT(row, index) {
      // console.log(row)
      if (row.status === "Unassigned") {
        return true;
      } else {
        return false;
      }
    },
    handleSelectionChange: function handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange: function handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var _this8 = this;

      // console.log(`当前页: ${val}`)
      // console.log(this.currentPage)
      this.currentPage = val;

      // if(this.searchFlag){
      this.$http.post("/api/translate/list", qs.stringify(this.sort[0] ? { product_id: this.$route.query.id || '', product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize, sort: this.sort } : { product_id: this.$route.query.id || '', product_name: this.searchForm.product_name, key: this.searchForm.key, status: this.searchForm.status, page: this.currentPage, count: this.pageSize })).then(function (response) {
        // console.log(response.data);
        response.data.data.forEach(function (item) {
          _this8.$set(item, 'translate_users_name', "");
          _this8.$set(item, 'translators', []);
        });
        if (response.data.data.length > 0) {
          response.data.data.forEach(function (item) {
            JSON.parse(item.translate_users).forEach(function (item1) {
              _this8.userList.forEach(function (item2) {
                if (item1 === item2.id) {
                  item.translators.push(item2);
                  return false;
                }
              });
            });
          });
        }
        _this8.allocationListTable = response.data.data;
        _this8.total = response.data.total;
      }).catch(function (err) {
        throw err;
      });
      // }else{
      //   this.$http.post("/api/translate/list",qs.stringify(this.sort[0]?{product_id:this.product_id||'',status:'Unassigned',page:this.currentPage,count:this.pageSize,sort:this.sort}:{product_id:this.product_id||'',status:'Unassigned',page:this.currentPage,count:this.pageSize})).then(response=>{
      //     // console.log(response.data);
      //     response.data.data.forEach(item=>{
      //       this.$set(item,'translate_users_name',"")
      //       this.$set(item,'translators',[])
      //     })
      //     if(response.data.data.length>0){
      //       response.data.data.forEach(item=>{
      //         JSON.parse(item.translate_users).forEach(item1=>{
      //           this.userList.forEach(item2=>{
      //             if(item1===item2.id){
      //               item.translators.push(item2)
      //               return false;
      //             }
      //           })
      //         })
      //       })

      //     }
      //     this.allocationListTable = response.data.data;
      //     this.total = response.data.total;
      //   })
      // }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ff975f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-72ff975f\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "missionListMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [_c("el-breadcrumb-item", [_vm._v("Assignment")])],
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
                  { attrs: { label: "Status:" } },
                  [
                    _c(
                      "el-select",
                      {
                        attrs: {
                          clearable: "",
                          placeholder: "please select status"
                        },
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
                        _c("el-option", {
                          attrs: { label: "Unassigned", value: "Unassigned" }
                        }),
                        _vm._v(" "),
                        _c("el-option", {
                          attrs: {
                            label: "Untranslated",
                            value: "Untranslated"
                          }
                        }),
                        _vm._v(" "),
                        _c("el-option", {
                          attrs: {
                            label: "Unretranslated",
                            value: "Unretranslated"
                          }
                        }),
                        _vm._v(" "),
                        _c("el-option", {
                          attrs: { label: "Unreviewed", value: "Unreviewed" }
                        }),
                        _vm._v(" "),
                        _c("el-option", {
                          attrs: { label: "Qualified", value: "Qualified" }
                        })
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
              ref: "allocationTable",
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.allocationListTable,
                "row-class-name": _vm.tableRowClassName
              },
              on: {
                "selection-change": _vm.handleSelectionChange,
                "sort-change": _vm.sortChange
              }
            },
            [
              _c("el-table-column", {
                attrs: {
                  type: "selection",
                  width: "35",
                  align: "center",
                  selectable: _vm.checkboxT
                }
              }),
              _vm._v(" "),
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
                              [_vm._v(_vm._s(item))]
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
              }),
              _vm._v(" "),
              _c("el-table-column", {
                key: "UnassignedKey",
                attrs: { label: "Translator", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return scope.row.status === "Unassigned"
                        ? [
                            _c(
                              "el-select",
                              {
                                attrs: {
                                  id: "selectTranslator" + scope.row.id,
                                  placeholder: "required"
                                },
                                on: {
                                  "visible-change": function($event) {
                                    _vm.visibleSelect(scope.row)
                                  }
                                },
                                model: {
                                  value: scope.row.translate_users_name,
                                  callback: function($$v) {
                                    _vm.$set(
                                      scope.row,
                                      "translate_users_name",
                                      $$v
                                    )
                                  },
                                  expression: "scope.row.translate_users_name"
                                }
                              },
                              _vm._l(scope.row.translators, function(
                                item,
                                index
                              ) {
                                return _c("el-option", {
                                  key: index,
                                  attrs: { label: item.name, value: item.name }
                                })
                              })
                            )
                          ]
                        : undefined
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
                        scope.row.status === "Unassigned"
                          ? _c(
                              "el-button",
                              {
                                attrs: {
                                  type: "text",
                                  size: "medium",
                                  title: "Assign"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.submit(scope.row)
                                  }
                                }
                              },
                              [_vm._v("Assign")]
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
          _c(
            "div",
            { attrs: { id: "batchSelected" } },
            [
              _vm._v(
                "\n      " +
                  _vm._s(_vm.multipleSelection.length) +
                  " " +
                  _vm._s(
                    _vm.multipleSelection.length > 1 ? "entries" : "entry"
                  ) +
                  " selected\n      "
              ),
              _c(
                "el-button",
                {
                  staticStyle: { color: "rgb(255, 208, 75)" },
                  attrs: { type: "text" },
                  on: { click: _vm.batchSubmitOpen }
                },
                [_vm._v("Bulk Allocation")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("el-pagination", {
            attrs: {
              background: "",
              "current-page": _vm.currentPage,
              "page-sizes": [10, 20, 50, 100, 200],
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
                title: "Assignment",
                visible: _vm.dialogVisible,
                width: "40%",
                top: "40vh"
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogVisible = $event
                }
              }
            },
            [
              _c("div", { staticClass: "dialog_warning_text" }, [
                _c("i", { staticClass: "el-message__icon el-icon-warning" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v("Batch assign these selected entries to translator.")
                ])
              ]),
              _vm._v(" "),
              _c(
                "el-form",
                {
                  ref: "batchTranslatorForm",
                  staticClass: "demo-ruleForm",
                  attrs: { model: _vm.batchTranslatorForm, rules: _vm.rules },
                  nativeOn: {
                    submit: function($event) {
                      $event.preventDefault()
                    }
                  }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        prop: "batch_translator_name",
                        label: "Please select a translator:"
                      }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { placeholder: "" },
                          model: {
                            value:
                              _vm.batchTranslatorForm.batch_translator_name,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.batchTranslatorForm,
                                "batch_translator_name",
                                $$v
                              )
                            },
                            expression:
                              "batchTranslatorForm.batch_translator_name"
                          }
                        },
                        _vm._l(_vm.translators, function(item, index) {
                          return _c("el-option", {
                            key: index,
                            attrs: { label: item.name, value: item.name }
                          })
                        })
                      )
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
                      on: { click: _vm.batchSubmit }
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
    require("vue-hot-reload-api")      .rerender("data-v-72ff975f", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ff975f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ff975f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("136511e2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ff975f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AllocationList.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ff975f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AllocationList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/projectList/AllocationList.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ff975f\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-72ff975f\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/projectList/AllocationList.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-72ff975f"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\projectList\\AllocationList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72ff975f", Component.options)
  } else {
    hotAPI.reload("data-v-72ff975f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});