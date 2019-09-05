webpackJsonp([41],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/Dashboard.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    if (this.$route.query.tab) {
      this.selectMenu(this.$route.query.tab);
    } else {
      // this.$router.push('/dashboard?tab=allocation&page=1&count=10')
      this.selectMenu('allocation');
    }
  },
  data: function data() {
    return {
      currentMenu: 'allocation',
      sort: [],
      loading: false,
      overviewTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
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
    selectMenu: function selectMenu(menu) {
      var _this = this;

      // console.log(menu)
      // console.log(this.$refs)
      this.$refs.dashboardTable.clearSort();
      this.sort = [];

      this.currentMenu = menu;
      this.currentPage = 1;
      switch (menu) {
        case 'allocation':
          this.$router.push('/dashboard?tab=allocation');
          this.$http.post("/api/product/list", qs.stringify({ is_static: 1 })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this.$set(item, 'CompletedPercentage', _this.$formatPercentage(item.Completed * 100) + '%');
              //   let c ;
              //   if(item.total_nums===0){
              //     c = "0.00%"
              //   }else{
              //     if(item.Unassigned_nums===0){
              //       c="100.00%"
              //     }else{
              //       c = this.$formatPercentage((10000-parseInt(Math.round(item.Unassigned_nums*10000/item.total_nums)))/100)+'%'
              //     }
              //   }
              //   this.$set(item,'completed',c)
            });
            _this.overviewTable = response.data.result.data;
            _this.total = response.data.result.total;
          });
          break;
        case 'objection':
          this.$router.push('/dashboard?tab=objection');
          this.$http.post("/api/Statistic/Products_Conflict").then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this.$set(item, 'CompletedPercentage', _this.$formatPercentage(item.Completed * 100) + '%');
              //   let c ;
              //   if(item.total_conflict===0){
              //     c = "0.00%"
              //   }else{
              //     if(item.task_conflict===0){
              //       c = "100.00%"
              //     }else{
              //       c = this.$formatPercentage((10000-parseInt(Math.round(item.task_conflict*10000/item.total_conflict)))/100)+'%'
              //     }
              //   }
              //   this.$set(item,'completed',c)
            });
            _this.overviewTable = response.data.result.data;
            _this.total = response.data.result.total;
          });
          break;
        case 'translation':
          this.$router.push('/dashboard?tab=translation');
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify({ Role: 'translator', page: this.currentPage, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this.$set(item, 'CompletedPercentage', _this.$formatPercentage(item.completed * 100) + '%');
              _this.$set(item, 'total_nums', item.Qualified + item['Unretranslated'] + item.Unreviewed + item.Untranslated);
              // let c ;
              // if((item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified)===0){
              //   c = "0.00%"
              // }else{
              //   if((item.Untranslated+item['Unretranslated'])===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt((Math.round((item.Untranslated+item['Unretranslated'])*10000)/(item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified))))/100)+'%'
              //   }

              // }
              // this.$set(item,'completed',c)
            });
            _this.overviewTable = response.data.result.data;
            _this.total = response.data.result.total;
          });
          break;
        case 'approval':
          this.$router.push('/dashboard?tab=approval');
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify({ Role: 'reviewer', page: this.currentPage, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this.$set(item, 'CompletedPercentage', _this.$formatPercentage(item.completed * 100) + '%');
              _this.$set(item, 'total_nums', item.Qualified + item.Unreviewed);
              // let c ;
              // if((item.Qualified+item.Unreviewed)===0){
              //   c = "0.00%"
              // }else{
              //   if((item['Unretranslated']+item.Unreviewed)===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage(parseInt((Math.round((item.Qualified)*10000)/(item.Unreviewed+item.Qualified)))/100)+'%'
              //   }

              // }
              // this.$set(item,'completed',c)
            });
            _this.overviewTable = response.data.result.data;
            _this.total = response.data.result.total;
          });
          break;
      }
    },
    sortChange: function sortChange(event) {
      var _this2 = this;

      // console.log(event)
      var order = "";
      event.order === "ascending" ? order = 'ASC' : null;
      event.order === "descending" ? order = 'DESC' : null;
      this.sort[0] = event.prop;
      this.sort[1] = order;
      this.currentPage = 1;

      switch (this.currentMenu) {
        case 'allocation':
          this.$router.push('/dashboard?tab=allocation');
          this.$http.post("/api/product/list", qs.stringify(event.prop ? { is_static: 1, count: this.pageSize, sort: this.sort } : { is_static: 1, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              // console.log(this.$formatPercentage(item.Completed*100))
              _this2.$set(item, 'CompletedPercentage', _this2.$formatPercentage(item.Completed * 100) + '%');
              //   let c ;
              //   if(item.total_nums===0){
              //     c = "0.00%"
              //   }else{
              //     if(item.Unassigned_nums===0){
              //       c="100.00%"
              //     }else{
              //       c = this.$formatPercentage((10000-parseInt(Math.round(item.Unassigned_nums*10000/item.total_nums)))/100)+'%'
              //     }
              //   }
              //   this.$set(item,'completed',c)
            });
            _this2.overviewTable = response.data.result.data;
            _this2.total = response.data.result.total;
          });
          break;
        case 'objection':
          this.$router.push('/dashboard?tab=objection');
          this.$http.post("/api/Statistic/Products_Conflict", qs.stringify(event.prop ? { count: this.pageSize, sort: this.sort } : { count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this2.$set(item, 'CompletedPercentage', _this2.$formatPercentage(item.Completed * 100) + '%');
              // let c ;
              // if(item.total_conflict===0){
              //   c = "0.00%"
              // }else{
              //   if(item.task_conflict===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt(Math.round(item.task_conflict*10000/item.total_conflict)))/100)+'%'
              //   }
              // }
              // this.$set(item,'completed',c)
            });
            _this2.overviewTable = response.data.result.data;
            _this2.total = response.data.result.total;
          });
          break;
        case 'translation':
          this.$router.push('/dashboard?tab=translation');
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(event.prop ? { Role: 'translator', count: this.pageSize, sort: this.sort } : { Role: 'translator', count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this2.$set(item, 'CompletedPercentage', _this2.$formatPercentage(item.completed * 100) + '%');
              _this2.$set(item, 'total_nums', item.Qualified + item['Unretranslated'] + item.Unreviewed + item.Untranslated);
              // let c ;
              // if((item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified)===0){
              //   c = "0.00%"
              // }else{
              //   if((item.Untranslated+item['Unretranslated'])===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt((Math.round((item.Untranslated+item['Unretranslated'])*10000)/(item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified))))/100)+'%'
              //   }

              // }
              // this.$set(item,'completed',c)
            });
            _this2.overviewTable = response.data.result.data;
            _this2.total = response.data.result.total;
          });
          break;
        case 'approval':
          this.$router.push('/dashboard?tab=approval');
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(event.prop ? { Role: 'reviewer', count: this.pageSize, sort: this.sort } : { Role: 'reviewer', count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this2.$set(item, 'CompletedPercentage', _this2.$formatPercentage(item.completed * 100) + '%');
              _this2.$set(item, 'total_nums', item.Qualified + item.Unreviewed);
              // let c ;
              // if((item.Qualified+item.Unreviewed)===0){
              //   c = "0.00%"
              // }else{
              //   if((item['Unretranslated']+item.Unreviewed)===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage(parseInt((Math.round((item.Qualified)*10000)/(item.Unreviewed+item.Qualified)))/100)+'%'
              //   }

              // }
              // this.$set(item,'completed',c)
            });
            _this2.overviewTable = response.data.result.data;
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
      this.currentMenu ? obj.tab = this.currentMenu : null;
      val ? obj.page = val : null;
      this.pageSize ? obj.count = this.pageSize : null;
      this.$router.push({ path: '/dashboard', query: obj });

      switch (this.currentMenu) {
        // case 'project':
        //   this.$http.post("/api/product/list",qs.stringify({page:val})).then(response=>{
        //     this.overviewTableAll = response.data.result.data;
        //     this.total = response.data.result.total;
        //     this.loading = false
        //   })
        // break;
        case 'allocation':
          this.$http.post("/api/product/list", qs.stringify(this.sort[0] ? { is_static: 1, page: val, count: this.pageSize, sort: this.sort } : { is_static: 1, page: val, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this3.$set(item, 'CompletedPercentage', _this3.$formatPercentage(item.Completed * 100) + '%');

              // let c ;
              // if(item.total_nums===0){
              //   c = "0.00%"
              // }else{
              //   if(item.Unassigned_nums===0){
              //     c="100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt(Math.round(item.Unassigned_nums*10000/item.total_nums)))/100)+'%'
              //   }
              // }
              // this.$set(item,'completed',c)
            });
            _this3.overviewTable = response.data.result.data;
            _this3.total = response.data.result.total;
          });
          break;
        case 'objection':
          this.$http.post("/api/Statistic/Products_Conflict", qs.stringify(this.sort[0] ? { page: val, count: this.pageSize, sort: this.sort } : { page: val, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this3.$set(item, 'CompletedPercentage', _this3.$formatPercentage(item.Completed * 100) + '%');
              // let c ;
              // if(item.total_conflict===0){
              //   c = "0.00%"
              // }else{
              //   if(item.task_conflict===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt(Math.round(item.task_conflict*10000/item.total_conflict)))/100)+'%'
              //   }
              // }
              // this.$set(item,'completed',c)
            });
            _this3.overviewTable = response.data.result.data;
            _this3.total = response.data.result.total;
          });
          break;
        case 'translation':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(this.sort[0] ? { Role: 'translator', page: val, count: this.pageSize, sort: this.sort } : { Role: 'translator', page: val, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this3.$set(item, 'CompletedPercentage', _this3.$formatPercentage(item.completed * 100) + '%');
              _this3.$set(item, 'total_nums', item.Error + item.Qualified + item['Unretranslated'] + item.Unreviewed + item.Untranslated);
              // let c ;
              // if((item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified+item.Error)===0){
              //   c = "0.00%"
              // }else{
              //   if((item.Untranslated+item['Unretranslated'])===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage((10000-parseInt((Math.round((item.Untranslated+item['Unretranslated'])*10000)/(item.Untranslated+item['Unretranslated']+item.Unreviewed+item.Qualified+item.Error))))/100)+'%'
              //   }

              // }
              // this.$set(item,'completed',c)
            });
            _this3.overviewTable = response.data.result.data;
            _this3.total = response.data.result.total;
          });
          break;
        case 'approval':
          this.$http.post('/api/Statistic/Accout_list_p', qs.stringify(this.sort[0] ? { Role: 'reviewer', page: val, count: this.pageSize, sort: this.sort } : { Role: 'reviewer', page: val, count: this.pageSize })).then(function (response) {
            response.data.result.data.forEach(function (item) {
              _this3.$set(item, 'CompletedPercentage', _this3.$formatPercentage(item.completed * 100) + '%');
              _this3.$set(item, 'total_nums', item.Qualified + item.Unreviewed);
              // let c ;
              // if((item.Qualified+item.Unreviewed)===0){
              //   c = "0.00%"
              // }else{
              //   if((item['Unretranslated']+item.Unreviewed)===0){
              //     c = "100.00%"
              //   }else{
              //     c = this.$formatPercentage(parseInt((Math.round((item.Qualified)*10000)/(item.Unreviewed+item.Qualified)))/100)+'%'
              //   }

              // }
              // this.$set(item,'completed',c)
            });
            _this3.overviewTable = response.data.result.data;
            _this3.total = response.data.result.total;
          });
          break;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c839c5b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c839c5b0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "clearfix", attrs: { id: "overviewMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [_c("el-breadcrumb-item", [_vm._v("Dashboard")])],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "overviewHeader" },
        [
          _c(
            "el-card",
            {
              staticClass: "box-card",
              style:
                _vm.currentMenu === "allocation"
                  ? "background-color:rgba(65,186,188,.2);"
                  : "",
              attrs: {
                shadow: _vm.currentMenu === "allocation" ? "always" : "hover"
              }
            },
            [
              _c(
                "div",
                {
                  staticClass: "menuCon",
                  on: {
                    click: function($event) {
                      _vm.selectMenu("allocation")
                    }
                  }
                },
                [
                  _c("span", [
                    _c("i", {
                      staticClass: "el-icon-rank",
                      style:
                        _vm.currentMenu === "allocation"
                          ? "opacity:1;"
                          : "opacity:0.5;"
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      style:
                        _vm.currentMenu === "allocation" ? "color:#000;" : ""
                    },
                    [_vm._v("\n          Assignment\n        ")]
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              staticClass: "box-card",
              style:
                _vm.currentMenu === "translation"
                  ? "background-color:rgba(65,186,188,.2);"
                  : "",
              attrs: {
                shadow: _vm.currentMenu === "translation" ? "always" : "hover"
              }
            },
            [
              _c(
                "div",
                {
                  staticClass: "menuCon",
                  on: {
                    click: function($event) {
                      _vm.selectMenu("translation")
                    }
                  }
                },
                [
                  _c("span", [
                    _c("i", {
                      staticClass: "el-icon-edit-outline",
                      style:
                        _vm.currentMenu === "translation"
                          ? "opacity:1;"
                          : "opacity:0.5;"
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      style:
                        _vm.currentMenu === "translation" ? "color:#000;" : ""
                    },
                    [_vm._v("\n          Translation\n        ")]
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              staticClass: "box-card",
              style:
                _vm.currentMenu === "approval"
                  ? "background-color:rgba(65,186,188,.2);"
                  : "",
              attrs: {
                shadow: _vm.currentMenu === "approval" ? "always" : "hover"
              }
            },
            [
              _c(
                "div",
                {
                  staticClass: "menuCon",
                  on: {
                    click: function($event) {
                      _vm.selectMenu("approval")
                    }
                  }
                },
                [
                  _c("span", [
                    _c("i", {
                      staticClass: "el-icon-tickets",
                      style:
                        _vm.currentMenu === "approval"
                          ? "opacity:1;"
                          : "opacity:0.5;"
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      style: _vm.currentMenu === "approval" ? "color:#000;" : ""
                    },
                    [_vm._v("\n          Review\n        ")]
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              staticClass: "box-card",
              style:
                _vm.currentMenu === "objection"
                  ? "background-color:rgba(65,186,188,.2);"
                  : "",
              attrs: {
                shadow: _vm.currentMenu === "objection" ? "always" : "hover"
              }
            },
            [
              _c(
                "div",
                {
                  staticClass: "menuCon",
                  on: {
                    click: function($event) {
                      _vm.selectMenu("objection")
                    }
                  }
                },
                [
                  _c("span", [
                    _c("i", {
                      staticClass: "el-icon-bell",
                      style:
                        _vm.currentMenu === "objection"
                          ? "opacity:1;"
                          : "opacity:0.5;"
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      style:
                        _vm.currentMenu === "objection" ? "color:#000;" : ""
                    },
                    [_vm._v("\n          Issues\n        ")]
                  )
                ]
              )
            ]
          )
        ],
        1
      ),
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
              ref: "dashboardTable",
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.overviewTable,
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
                              _vm.currentMenu === "project"
                                ? "cursor:pointer;color:#41babc;"
                                : "",
                            on: {
                              click: function($event) {
                                _vm.currentMenu === "project"
                                  ? _vm.$router.push(
                                      "/projectdetail?id=" + scope.row.id
                                    )
                                  : null
                              }
                            }
                          },
                          [_vm._v(_vm._s(scope.row.product))]
                        )
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
              _vm.currentMenu === "allocation"
                ? _c("el-table-column", {
                    key: "aotaTotal",
                    attrs: {
                      prop: "total_nums",
                      label: "Total",
                      align: "center",
                      sortable: "custom"
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.currentMenu !== "allocation" &&
              _vm.currentMenu !== "objection"
                ? _c("el-table-column", {
                    key: "aotaTotal",
                    attrs: {
                      prop: "total_nums",
                      label: "Total",
                      align: "center",
                      sortable: "custom"
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.currentMenu === "objection"
                ? _c("el-table-column", {
                    key: "oTotal",
                    attrs: {
                      prop: "total_conflict",
                      label: "Total",
                      align: "center",
                      sortable: "custom"
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.currentMenu === "allocation"
                ? _c("el-table-column", {
                    key: "assignCompleted",
                    attrs: {
                      prop: "Completed",
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
                                  scope.row.completed === "0.00%"
                                    ? "color:red"
                                    : ""
                              },
                              [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(scope.row.CompletedPercentage) +
                                    "\n          "
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
              _vm.currentMenu === "objection"
                ? _c("el-table-column", {
                    key: "objectCompleted",
                    attrs: {
                      prop: "completed",
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
                                  "\n            " +
                                    _vm._s(scope.row.CompletedPercentage) +
                                    "\n          "
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
              _vm.currentMenu === "translation"
                ? _c("el-table-column", {
                    key: "transCompleted",
                    attrs: {
                      prop: "completed",
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
                                  "\n            " +
                                    _vm._s(scope.row.CompletedPercentage) +
                                    "\n          "
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
              _vm.currentMenu === "approval"
                ? _c("el-table-column", {
                    key: "approvalCompleted",
                    attrs: {
                      prop: "completed",
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
                                  "\n            " +
                                    _vm._s(scope.row.CompletedPercentage) +
                                    "\n          "
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
              _vm.currentMenu === "allocation"
                ? _c("el-table-column", {
                    key: "aUnssign",
                    attrs: {
                      prop: "Unassigned_nums",
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
                                      "/assignment?id=" +
                                        scope.row.id +
                                        "&name=" +
                                        scope.row.product
                                    )
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "Assignment: " +
                                    _vm._s(scope.row.Unassigned_nums)
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
              _vm.currentMenu === "objection"
                ? _c("el-table-column", {
                    key: "oUnconflict",
                    attrs: {
                      prop: "task_conflict",
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
                                      "/v_history?name=" +
                                        scope.row.product +
                                        "&status=0&count=10&page=1"
                                    )
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "Issues: " + _vm._s(scope.row.task_conflict)
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
              _vm.currentMenu === "translation"
                ? _c("el-table-column", {
                    key: "tUntranslate",
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
                                        "&count=10&page=1"
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
                                        "&count=10&page=1"
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
              _vm.currentMenu === "approval"
                ? _c("el-table-column", {
                    key: "aUnreviewed",
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
                                        "&count=10&page=1"
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
    require("vue-hot-reload-api")      .rerender("data-v-c839c5b0", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c839c5b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c839c5b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/Dashboard.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("62e9eafc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c839c5b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c839c5b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/less-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c839c5b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/Dashboard.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/Dashboard.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-c839c5b0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/Dashboard.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c839c5b0"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c839c5b0", Component.options)
  } else {
    hotAPI.reload("data-v-c839c5b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});