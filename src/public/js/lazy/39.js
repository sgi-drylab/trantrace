webpackJsonp([39],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue":
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

    // console.log(this.$route);
    var obj = {};
    this.$route.query.name ? obj.name = this.$route.query.name : null;
    this.$route.query.key ? obj.key = this.$route.query.key : null;
    this.$route.query.priority ? obj.priority = this.$route.query.priority : null;
    this.$route.query.deadline ? obj.deadline = this.$route.query.deadline : null;
    this.$route.query.page ? obj.page = this.$route.query.page : null;
    // console.log(this.backUrl)
    this.backUrl = { path: '/review', query: obj };

    this.$http.post("/api/approve/list", qs.stringify({
      status: 'Unreviewed',
      id: this.$route.query.id
    })).then(function (response) {
      // console.log(response.data);
      _this.currentItem = response.data.data[0];
    });
  },
  data: function data() {
    return {
      backUrl: '',
      currentItem: {
        key: '[{}]',
        translate: '[{}]'
      },
      agreeFlag: null,
      tipsForm: {
        tips: ''
      },
      dialogVisible: false,
      rules: {
        tips: [{
          required: true,
          message: 'Please enter your reason.'
        }]
      }
    };
  },

  methods: {
    openAgreeModal: function openAgreeModal(agree) {
      this.dialogVisible = true;
      this.agreeFlag = agree;
    },
    submit: function submit() {
      var _this2 = this;

      //不通过
      if (this.agreeFlag === 0) {
        this.$refs.tipsForm.validate(function (valid) {
          if (valid) {
            // alert('submit!');
            _this2.$http.post("/api/approve/approve", qs.stringify({
              translate_approve_id: _this2.$route.query.id,
              approved: _this2.agreeFlag,
              tips: _this2.tipsForm.tips.trim()
            })).then(function (response) {
              // console.log(response.data);
              setTimeout(function () {
                _this2.$store.state.taskList.Approve_nums -= 1;
                _this2.$router.push(_this2.backUrl);
              }, 500);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      //通过
      if (this.agreeFlag === 1) {
        this.$http.post("/api/approve/approve", qs.stringify({
          translate_approve_id: this.$route.query.id,
          approved: this.agreeFlag,
          tips: this.tipsForm.tips
        })).then(function (response) {
          // console.log(response.data);
          setTimeout(function () {
            _this2.$store.state.taskList.Approve_nums -= 1;
            _this2.$router.push(_this2.backUrl);
          }, 500);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-815a7750\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-815a7750\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "approvalItemMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
            _vm._v("Review")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("View")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "approvalItemCon" } },
        [
          _c(
            "div",
            [
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v("Project Name:" + _vm._s(_vm.currentItem.product))
              ]),
              _vm._v(" "),
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v("Priority:\n        "),
                _vm.currentItem.priority == "1"
                  ? _c("span", [_vm._v("Low")])
                  : _vm._e(),
                _vm._v(" "),
                _vm.currentItem.priority == "2"
                  ? _c("span", [_vm._v("Normal")])
                  : _vm._e(),
                _vm._v(" "),
                _vm.currentItem.priority == "3"
                  ? _c("span", { staticStyle: { color: "red" } }, [
                      _vm._v("High")
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v("Language:" + _vm._s(_vm.currentItem.lang))
              ]),
              _vm._v(" "),
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v("Owner:" + _vm._s(_vm.currentItem.allocate_users_name))
              ]),
              _vm._v(" "),
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v(
                  "Deadline:" +
                    _vm._s(
                      _vm.currentItem.deadline &&
                      _vm.currentItem.deadline.split(" ")[1]
                        ? _vm.currentItem.deadline.split(" ")[0]
                        : _vm.currentItem.deadline
                    )
                )
              ]),
              _vm._v(" "),
              _vm.currentItem.status === "Unreviewed"
                ? _c(
                    "el-button",
                    {
                      attrs: { type: "success", size: "small", id: "agreeBtn" },
                      on: {
                        click: function($event) {
                          _vm.openAgreeModal(1)
                        }
                      }
                    },
                    [_vm._v("Pass")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.currentItem.status === "Unreviewed"
                ? _c(
                    "el-button",
                    {
                      attrs: { type: "danger", size: "small", id: "refuseBtn" },
                      on: {
                        click: function($event) {
                          _vm.openAgreeModal(0)
                        }
                      }
                    },
                    [_vm._v("Fail")]
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "approvalItemBox" } },
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
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.agreeFlag === 1 ? "Pass Review" : "Fail Review",
                visible: _vm.dialogVisible,
                width: "30%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogVisible = $event
                }
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
                      value: _vm.agreeFlag === 1,
                      expression: "agreeFlag===1"
                    }
                  ],
                  staticClass: "dialog_warning_text"
                },
                [
                  _c("i", { staticClass: "el-message__icon el-icon-warning" }),
                  _vm._v(" "),
                  _c("span", [_vm._v("Is this translation correct?")])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.agreeFlag === 0,
                      expression: "agreeFlag===0"
                    }
                  ],
                  staticClass: "dialog_warning_text"
                },
                [
                  _c("i", { staticClass: "el-message__icon el-icon-warning" }),
                  _vm._v(" "),
                  _c("span", [_vm._v("Is this translation wrong?")])
                ]
              ),
              _vm._v(" "),
              _c(
                "el-form",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.agreeFlag === 0,
                      expression: "agreeFlag===0"
                    }
                  ],
                  ref: "tipsForm",
                  staticClass: "demo-ruleForm",
                  attrs: { model: _vm.tipsForm, rules: _vm.rules }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        prop: "tips",
                        label: "Please enter your reason:"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { placeholder: "" },
                        model: {
                          value: _vm.tipsForm.tips,
                          callback: function($$v) {
                            _vm.$set(_vm.tipsForm, "tips", $$v)
                          },
                          expression: "tipsForm.tips"
                        }
                      })
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
    require("vue-hot-reload-api")      .rerender("data-v-815a7750", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-815a7750\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-815a7750\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("dde27d62", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-815a7750\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BrowApprovalItem.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-815a7750\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BrowApprovalItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-815a7750\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-815a7750\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/approvalManagement/BrowApprovalItem.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-815a7750"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\approvalManagement\\BrowApprovalItem.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-815a7750", Component.options)
  } else {
    hotAPI.reload("data-v-815a7750", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});