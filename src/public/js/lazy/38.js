webpackJsonp([38],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue":
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

// import $ from 'jquery/dist/jquery.min.js'
/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    var obj1 = {};
    this.$route.query.id ? obj1.id = this.$route.query.id : null;
    this.$route.query.key ? obj1.key = this.$route.query.key : null;
    this.$route.query.v ? obj1.v = this.$route.query.v : null;
    this.$route.query.page1 ? obj1.page1 = this.$route.query.page1 : null;
    this.$route.query.count1 ? obj1.count1 = this.$route.query.count1 : null;
    this.$route.query.name ? obj1.name = this.$route.query.name : null;
    this.$route.query.page ? obj1.page = this.$route.query.page : null;
    this.$route.query.count ? obj1.count = this.$route.query.count : null;
    this.backUrl1 = { path: '/viewentry', query: obj1 };

    var obj2 = {};
    this.$route.query.name ? obj2.name = this.$route.query.name : null;
    this.$route.query.page ? obj2.page = this.$route.query.page : null;
    this.$route.query.count ? obj2.count = this.$route.query.count : null;
    this.backUrl2 = { path: '/viewlist', query: obj2 };

    this.$http.post("/api/view/list_items", qs.stringify({
      product_id: this.$route.query.id,
      export_id: this.$route.query.eid
    })).then(function (response) {
      // console.log(response.data);
      _this.currentItem = response.data.result.data[0];
      _this.newest_version_name = response.data.result.newest_version_name;
    });
  },
  data: function data() {
    return {
      backUrl1: '',
      backUrl2: '',
      currentItem: {
        key: '[{}]',
        translate: '[{}]'
      },
      newest_version_name: '',
      tipsForm: {
        tips: ''
      },
      dialogVisible: false,
      rules: {
        tips: [{
          required: true,
          message: 'Please enter discription of issue.'
        }]
      }
    };
  },

  methods: {
    openAgreeModal: function openAgreeModal() {
      this.dialogVisible = true;
    },
    submit: function submit() {
      var _this2 = this;

      this.$refs.tipsForm.validate(function (valid) {
        if (valid) {
          // alert('submit!');
          _this2.$http.post("/api/view/advise", qs.stringify({
            export_id: _this2.$route.query.eid,
            objection: _this2.tipsForm.tips
          })).then(function (response) {
            // console.log(response.data);
            setTimeout(function () {
              _this2.$router.push(_this2.backUrl1);
            }, 500);
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cc58b64\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1cc58b64\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "viewDetailItemMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl2 } }, [
            _vm._v("Projects")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl1 } }, [
            _vm._v("Entries")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("View")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "viewDetailItemCon" } },
        [
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
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v("Status:" + _vm._s(_vm.currentItem.status))
              ]),
              _vm._v(" "),
              _c("el-tag", { attrs: { type: "info" } }, [
                _vm._v("Version:" + _vm._s(_vm.currentItem.version_name))
              ]),
              _vm._v(" "),
              _vm.currentItem.conflict === 0 &&
              this.newest_version_name === _vm.currentItem.version_name
                ? _c(
                    "el-button",
                    {
                      attrs: {
                        type: "warning",
                        size: "small",
                        id: "objectionBtn"
                      },
                      on: { click: _vm.openAgreeModal }
                    },
                    [_vm._v("Open Issue")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.currentItem.conflict === 1 &&
              this.newest_version_name === _vm.currentItem.version_name &&
              _vm.currentItem.status === "Qualified"
                ? _c(
                    "span",
                    {
                      staticStyle: {
                        "font-size": "14px",
                        color: "red",
                        "margin-left": "10px"
                      }
                    },
                    [
                      _vm._v(
                        "There is aleady an issue waiting for owner's reply."
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.currentItem.conflict === 1 &&
              this.newest_version_name === _vm.currentItem.version_name &&
              _vm.currentItem.status === "Error"
                ? _c(
                    "span",
                    {
                      staticStyle: {
                        "font-size": "14px",
                        color: "red",
                        "margin-left": "10px"
                      }
                    },
                    [_vm._v("The translation is being optimized.")]
                  )
                : _vm._e(),
              _vm._v(" "),
              !(this.newest_version_name === _vm.currentItem.version_name)
                ? _c(
                    "span",
                    {
                      staticStyle: {
                        "font-size": "14px",
                        color: "orange",
                        "margin-left": "10px"
                      }
                    },
                    [_vm._v("Issue is only opened for latest version.")]
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "viewDetailItemBox" } },
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
                title: "Open Issue",
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
              _c("div", { staticClass: "dialog_warning_text" }, [
                _c("i", { staticClass: "el-message__icon el-icon-warning" }),
                _vm._v(" "),
                _c("span", [_vm._v("Is this translation wrong?")])
              ]),
              _vm._v(" "),
              _c(
                "el-form",
                {
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
                        label:
                          "Please point out the error or submit your suggestion:"
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
    require("vue-hot-reload-api")      .rerender("data-v-1cc58b64", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cc58b64\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cc58b64\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("0e22de11", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cc58b64\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewDetail.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cc58b64\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/brow/ViewDetail.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cc58b64\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1cc58b64\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/brow/ViewDetail.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1cc58b64"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\brow\\ViewDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cc58b64", Component.options)
  } else {
    hotAPI.reload("data-v-1cc58b64", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});