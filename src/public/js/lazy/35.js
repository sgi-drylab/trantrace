webpackJsonp([35],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    // console.log(this.$route.query.id)

    new Promise(function (resolve, reject) {
      _this.$route.path === '/t_browhistoryitem' ? _this.prePath = '/t_history' : null;
      _this.$route.path === '/a_browhistoryitem' ? _this.prePath = '/a_history' : null;
      _this.$route.path === '/v_browhistoryitem' ? _this.prePath = '/v_history' : null;

      _this.$route.path === '/t_browhistoryitem' ? _this.url = '/api/translate/history' : null;
      _this.$route.path === '/a_browhistoryitem' ? _this.url = '/api/approve/list' : null;
      _this.$route.path === '/v_browhistoryitem' ? _this.url = '/api/view/list_conflict_all' : null;

      var obj = {};
      _this.$route.query.name ? obj.name = _this.$route.query.name : null;
      _this.$route.query.key ? obj.key = _this.$route.query.key : null;
      _this.$route.query.status ? obj.status = _this.$route.query.status : null;
      _this.$route.query.page ? obj.page = _this.$route.query.page : null;
      // console.log(this.backUrl)
      _this.backUrl = { path: _this.prePath, query: obj };

      resolve();
    }).then(function (data) {
      // console.log(this.url)
      _this.$http.post(_this.url, qs.stringify({
        id: _this.$route.query.id
      })).then(function (response) {
        // console.log(response.data);
        _this.currentItem = response.data.data[0];
        _this.total = response.data.total;
      });
    });

    this.$http.post("/api/user/list").then(function (response) {
      // console.log(response.data);
      _this.userList = response.data.data;
    });
  },
  data: function data() {
    return {
      userName: Base64.decode(this.$cookies.get('tname')),
      backUrl: '',
      prePath: '',
      url: '',
      currentItem: {
        key: '[{}]',
        translate: '[{}]'
      },
      dialogVisible: false,
      agreeFlag: null,
      userList: [],
      translators: [],
      distributeForm: {
        translate_users_name: ''
      },
      rules: {
        translate_users_name: [{
          required: true,
          message: 'Please select a translator.'
        }]
      }
    };
  },

  methods: {
    openAgreeModal: function openAgreeModal(agree) {
      var _this2 = this;

      this.dialogVisible = true;
      this.agreeFlag = agree;
      if (agree === 1) {
        JSON.parse(this.currentItem.translate_users).forEach(function (item1) {
          _this2.userList.forEach(function (item2) {
            if (item1 === item2.id) {
              _this2.translators.push(item2);
              return false;
            }
          });
        });
      }
    },
    submit: function submit() {
      var _this3 = this;

      // 通过
      if (this.agreeFlag === 1) {
        this.$refs.distributeForm.validate(function (valid) {
          if (valid) {
            // console.log(1111);
            _this3.$http.post("/api/approve/approve_conflict", qs.stringify({
              id: _this3.$route.query.id,
              approved: _this3.agreeFlag,
              translate_users_name: _this3.distributeForm.translate_users_name
            })).then(function (response) {
              // console.log(response.data);
              setTimeout(function () {
                _this3.$store.state.taskList.Conflict_nums -= 1;
                _this3.$router.push(_this3.backUrl);
              }, 500);
            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      }
      //拒绝
      if (this.agreeFlag === 0) {
        this.$http.post("/api/approve/approve_conflict", qs.stringify({
          id: this.$route.query.id,
          approved: this.agreeFlag,
          translate_users_name: ''
        })).then(function (response) {
          // console.log(response.data);
          setTimeout(function () {
            _this3.$store.state.taskList.Conflict_nums -= 1;
            _this3.$router.push(_this3.backUrl);
          }, 500);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bdd6ca0e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-bdd6ca0e\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "historyItemMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _vm.$route.path !== "/v_browhistoryitem"
            ? _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
                _vm._v("History")
              ])
            : _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
                _vm._v("Issues")
              ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("View")])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { attrs: { id: "historyItemCon" } }, [
        _c(
          "div",
          [
            _c("el-tag", { attrs: { type: "info" } }, [
              _vm._v("Project Name:" + _vm._s(_vm.currentItem.product))
            ]),
            _vm._v(" "),
            _c("el-tag", { attrs: { type: "info" } }, [
              _vm._v("Language:" + _vm._s(_vm.currentItem.lang))
            ]),
            _vm._v(" "),
            _vm.$route.path === "/t_browhistoryitem" ||
            _vm.$route.path === "/a_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v("Status:" + _vm._s(_vm.currentItem.status))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/v_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v("Status:\n        "),
                  _vm.currentItem.approved === 2
                    ? _c("span", [_vm._v("Ignore")])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.currentItem.approved === 1
                    ? _c("span", [_vm._v("Agree")])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.currentItem.approved === 0
                    ? _c("span", [_vm._v("Unresolved")])
                    : _vm._e()
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/t_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v(
                    "Translation Time:" + _vm._s(_vm.currentItem.created_at)
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/a_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v("Review Time:" + _vm._s(_vm.currentItem.updated_at))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/v_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v("Issue Time:" + _vm._s(_vm.currentItem.created_at))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/v_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v("Version:" + _vm._s(_vm.currentItem.version_name))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/v_browhistoryitem"
              ? _c("el-tag", { attrs: { type: "info" } }, [
                  _vm._v("Creator:" + _vm._s(_vm.currentItem.user_name))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/v_browhistoryitem" &&
            _vm.currentItem.users_name === _vm.userName &&
            _vm.currentItem.approved === 0
              ? _c(
                  "div",
                  {
                    staticStyle: {
                      display: "inline-block",
                      "margin-bottom": "5px"
                    }
                  },
                  [
                    _vm.currentItem.approved === 0
                      ? _c(
                          "el-button",
                          {
                            attrs: {
                              type: "success",
                              size: "small",
                              id: "redistributeBtn"
                            },
                            on: {
                              click: function($event) {
                                _vm.openAgreeModal(1)
                              }
                            }
                          },
                          [_vm._v("Agree")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.currentItem.approved === 0
                      ? _c(
                          "el-button",
                          {
                            attrs: {
                              type: "danger",
                              size: "small",
                              id: "ignoreBtn"
                            },
                            on: {
                              click: function($event) {
                                _vm.openAgreeModal(0)
                              }
                            }
                          },
                          [_vm._v("Ignore")]
                        )
                      : _vm._e()
                  ],
                  1
                )
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _vm.$route.path === "/a_browhistoryitem" && _vm.currentItem.tips
          ? _c(
              "div",
              [
                _c("el-alert", {
                  attrs: {
                    title: _vm.currentItem.tips,
                    type: "warning",
                    "show-icon": "",
                    closable: false
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.$route.path === "/v_browhistoryitem" && _vm.currentItem.objection
          ? _c(
              "div",
              [
                _c("el-alert", {
                  attrs: {
                    title: "Issue description: " + _vm.currentItem.objection,
                    type: "warning",
                    closable: false
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { attrs: { id: "historyItemBox" } },
          [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "st_con" },
              [
                _c("el-card", { staticClass: "boxCard" }, [
                  _c(
                    "div",
                    {
                      staticClass: "rawDataText",
                      attrs: { id: "rawDataText1" }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          Object.keys(JSON.parse(_vm.currentItem.key)[0])[0]
                        )
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("el-card", { staticClass: "boxCard" }, [
                  _c(
                    "div",
                    {
                      staticClass: "rawDataText",
                      attrs: { id: "rawDataText1" }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          JSON.parse(_vm.currentItem.key)[0][
                            Object.keys(JSON.parse(_vm.currentItem.key)[0])[0]
                          ]
                        )
                      )
                    ]
                  )
                ])
              ],
              1
            ),
            _vm._v(" "),
            _vm._l(JSON.parse(_vm.currentItem.translate), function(
              item,
              index
            ) {
              return _c(
                "div",
                {
                  key: index,
                  staticClass: "st_con",
                  attrs: { name: index + 2 }
                },
                [
                  _c("el-card", { staticClass: "boxCard" }, [
                    _c(
                      "div",
                      {
                        staticClass: "rawDataText",
                        attrs: { id: "rawDataText" + (index + 2) }
                      },
                      [_vm._v(_vm._s(Object.keys(item)[0]))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("el-card", { staticClass: "boxCard" }, [
                    _c(
                      "div",
                      {
                        staticClass: "rawDataText",
                        attrs: { id: "rawDataText1" }
                      },
                      [_vm._v(_vm._s(item[Object.keys(item)[0]]))]
                    )
                  ])
                ],
                1
              )
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.agreeFlag === 1 ? "Agree on Issue" : "Ignore Issue",
            width: "35%",
            visible: _vm.dialogVisible
          },
          on: {
            "update:visible": function($event) {
              _vm.dialogVisible = $event
            }
          }
        },
        [
          _vm.agreeFlag === 0
            ? _c("div", { staticClass: "dialog_warning_text" }, [
                _c("i", { staticClass: "el-message__icon el-icon-warning" }),
                _vm._v(" "),
                _c("span", [_vm._v("Are you sure to ignore this issue?")])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.agreeFlag === 1
            ? _c("div", { staticClass: "dialog_warning_text" }, [
                _c("i", { staticClass: "el-message__icon el-icon-warning" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "You agree that translation is wrong and reassign it to translator."
                  )
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.agreeFlag === 1
            ? _c(
                "el-form",
                {
                  ref: "distributeForm",
                  staticClass: "demo-ruleForm",
                  attrs: { model: _vm.distributeForm, rules: _vm.rules },
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
                        prop: "translate_users_name",
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
                            value: _vm.distributeForm.translate_users_name,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.distributeForm,
                                "translate_users_name",
                                $$v
                              )
                            },
                            expression: "distributeForm.translate_users_name"
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
              )
            : _vm._e(),
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
                { attrs: { type: "primary" }, on: { click: _vm.submit } },
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
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "boxTitleCon" }, [
      _c("p", [_vm._v("Source")]),
      _vm._v(" "),
      _c("p", [_vm._v("Translation")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-bdd6ca0e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bdd6ca0e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bdd6ca0e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("9f0abcd8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bdd6ca0e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BrowHistoryItem.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bdd6ca0e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BrowHistoryItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bdd6ca0e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-bdd6ca0e\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/historyList/BrowHistoryItem.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bdd6ca0e"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\historyList\\BrowHistoryItem.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bdd6ca0e", Component.options)
  } else {
    hotAPI.reload("data-v-bdd6ca0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});