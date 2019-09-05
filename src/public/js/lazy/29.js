webpackJsonp([29],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue":
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

    // console.log(this.$route);
    var obj = {};
    this.$route.query.name ? obj.name = this.$route.query.name : null;
    this.$route.query.key ? obj.key = this.$route.query.key : null;
    this.$route.query.priority ? obj.priority = this.$route.query.priority : null;
    this.$route.query.deadline ? obj.deadline = this.$route.query.deadline : null;
    this.$route.query.page ? obj.page = this.$route.query.page : null;
    // console.log(this.backUrl)
    if (this.$route.path === '/ontrans') {
      this.backUrl = { path: '/translation', query: obj };
    }
    if (this.$route.path === '/retrans') {
      this.backUrl = { path: '/retranslation', query: obj };
    }

    this.$http.post("/api/translate/translate_list", qs.stringify({
      id: this.$route.query.id,
      status: this.status
    })).then(function (response) {
      // console.log(response.data)
      if (_this.status === 'Untranslated') {
        response.data.result.data.forEach(function (item) {
          _this.$set(item, 'target', []);
          _this.$set(item, 'targetKey', '');
        });
        // console.log(response.data.result.data[0].translate)
        JSON.parse(response.data.result.data[0].translate).forEach(function (item) {
          // console.log(item)
          response.data.result.data[0].target.push('');
        });
      }
      if (_this.status === 'Unretranslated') {
        response.data.result.data.forEach(function (item) {
          _this.$set(item, 'target', []);
          JSON.parse(item.approve.translate).forEach(function (item1, index) {
            item.target.push(item1[JSON.parse(item.translate)[index]]);
          });
          _this.$set(item, 'targetKey', JSON.parse(item.approve.key)[0][item.key]);
        });
      }

      // console.log(response.data.result.data)
      _this.currentItem = response.data.result.data[0];
    });
  },
  data: function data() {
    return {
      backUrl: '',
      copyFlag: false,
      currentItem: {
        translate: '[]',
        approve: {
          key: '[]',
          translate: '[]'
        }
      }
    };
  },

  computed: {
    status: function status() {
      if (this.$route.path === '/ontrans') {
        return 'Untranslated';
      } else if (this.$route.path === '/retrans') {
        return 'Unretranslated';
      } else {
        return null;
      }
    }
  },
  watch: {
    'currentItem.target': {
      handler: function handler(val, oldVal) {},

      deep: true
    }
  },
  methods: {
    googleTrans: function googleTrans(content, key) {
      var _this2 = this;

      // 判断内容中是否存在%，google不支持%

      if (content.includes('%') && !this.copyFlag) {
        // console.log(true)
        this.$message.warning("Please copy the text manually, since Google Translate site won't accept URLs with special characters.");
      } else {
        var c = void 0;
        var googleBtn = void 0;
        if (content.trim()) {
          if (key === 'k') {
            c = content.trim();
            googleBtn = $("#googleBtn1");
          } else {
            c = content.trim();
            googleBtn = $("#googleBtn" + (key + 2));
          }
        }

        googleBtn.html('Opening..');
        var slang = void 0;
        var tlang = void 0;
        this.$http.post('/api/product/lang_list', qs.stringify({ sl: this.currentItem.lang.split(" -> ")[0], tl: this.currentItem.lang.split(" -> ")[1] })).then(function (response) {
          slang = response.data.result.sl_code;
          tlang = response.data.result.tl_code;
        });
        setTimeout(function () {
          googleBtn.html('Google');
          window.open('https://translate.google.cn/#view=home&op=translate&sl=' + slang + '&tl=' + tlang + '&text=' + encodeURIComponent(c));
          _this2.copyFlag = false;
        }, 500);
      }
    },
    execClick: function execClick() {
      document.execCommand("copy");
    },
    execCopy: function execCopy(event, id) {
      var content = document.getElementById(id).textContent;
      if (this.isIE()) {
        if (window.clipboardData) {
          window.clipboardData.setData("Text", content);
          this.copyFlag = true;
          // alert(window.clipboardData.getData("Text")); 
          this.$message.success('Successful copy!');
        } else {
          this.copyFlag = true;
          this.$message.error('Please copy the content manually.');
        }
      } else {
        event.preventDefault();
        if (event.clipboardData) {
          event.clipboardData.setData("text/plain", content);
          this.copyFlag = true;
          // alert(event.clipboardData.getData("text")); 
          this.$message.success('Successful copy!');
        } else {
          this.copyFlag = true;
          this.$message.error('Please copy the content manually.');
        }
      }
    },
    isIE: function isIE() {
      var input = window.document.createElement("input");
      //"!window.ActiveXObject" is evaluated to true in IE11 
      if (window.ActiveXObject === undefined) return null;
      if (!window.XMLHttpRequest) return 6;
      if (!window.document.querySelector) return 7;
      if (!window.document.addEventListener) return 8;
      if (!window.atob) return 9;
      //"!window.document.body.dataset" is faster but the body is null when the DOM is not //ready. Anyway, an input tag needs to be created to check if IE is being //emulated 
      if (!input.dataset) return 10;
      return 11;
    },
    submit: function submit() {
      var _this3 = this;

      var flag1 = false;
      var flag2 = false;
      this.currentItem.target.forEach(function (item) {
        // !(item&&item.trim())?flag1 = true:null
        item && item.trim() ? null : flag1 = true;
      });
      this.currentItem.targetKey.trim() ? null : flag2 = true;
      // console.log(flag1);
      // console.log(flag2);
      if (flag1 || flag2) {
        this.$message({
          message: 'All fields must be translated before submission.',
          type: 'warning'
        });
        return false;
      }
      var obj = {};
      obj.translate_job_id = this.$route.query.id;
      var keyObj = {};
      keyObj[this.currentItem.key] = this.currentItem.targetKey;
      obj.key_translation = JSON.stringify([keyObj]);
      var transArr = [];
      JSON.parse(this.currentItem.translate).forEach(function (item, index) {
        var a = {};
        a[item] = _this3.currentItem.target[index];
        transArr.push(a);
      });
      obj.fields_translation = JSON.stringify(transArr);
      obj.status = this.currentItem.status;
      // console.log(obj);
      this.$http.post("/api/translate/translate", qs.stringify(obj)).then(function (response) {
        setTimeout(function () {
          if (_this3.$route.path === '/ontrans') {
            _this3.$store.state.taskList.Untranslated_nums -= 1;
            _this3.$router.push(_this3.backUrl);
          }
          if (_this3.$route.path === '/retrans') {
            _this3.$store.state.taskList['Unretranslated_nums'] -= 1;
            _this3.$router.push(_this3.backUrl);
          }
        }, 500);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d4a4eb40\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d4a4eb40\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "onTransTaskMain" } },
    [
      _c(
        "el-breadcrumb",
        { attrs: { "separator-class": "el-icon-arrow-right" } },
        [
          _vm.$route.path === "/ontrans"
            ? _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
                _vm._v("Translation")
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.$route.path === "/retrans"
            ? _c("el-breadcrumb-item", { attrs: { to: _vm.backUrl } }, [
                _vm._v("Retranslation")
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.$route.path === "/ontrans"
            ? _c("el-breadcrumb-item", [_vm._v("Translate")])
            : _vm._e(),
          _vm._v(" "),
          _vm.$route.path === "/retrans"
            ? _c("el-breadcrumb-item", [_vm._v("Retranslate")])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { attrs: { id: "onTransCon" } }, [
        _c(
          "div",
          [
            _c("el-tag", { attrs: { type: "info" } }, [
              _vm._v("Project Name: " + _vm._s(_vm.currentItem.product))
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
              _vm._v("Language: " + _vm._s(_vm.currentItem.lang))
            ]),
            _vm._v(" "),
            _c("el-tag", { attrs: { type: "info" } }, [
              _vm._v("Owner: " + _vm._s(_vm.currentItem.allocate_users_name))
            ]),
            _vm._v(" "),
            _c("el-tag", { attrs: { type: "info" } }, [
              _vm._v(
                "Deadline: " +
                  _vm._s(
                    _vm.currentItem.deadline &&
                    _vm.currentItem.deadline.split(" ")[1]
                      ? _vm.currentItem.deadline.split(" ")[0]
                      : _vm.currentItem.deadline
                  )
              )
            ]),
            _vm._v(" "),
            _vm.currentItem.status === "Untranslated" ||
            _vm.currentItem.status === "Unretranslated"
              ? _c(
                  "el-button",
                  {
                    attrs: { type: "success", size: "small", id: "submitBtn" },
                    on: { click: _vm.submit }
                  },
                  [_vm._v("Submit")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.path === "/retrans"
              ? _c(
                  "div",
                  [
                    _c("el-alert", {
                      attrs: {
                        title:
                          "Latest failed reason: " +
                          _vm.currentItem.approve.tips,
                        type: "warning",
                        closable: false
                      }
                    })
                  ],
                  1
                )
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { attrs: { id: "transBox" } },
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
                      attrs: {
                        id: "rawDataText1",
                        title: "click to copy content"
                      },
                      on: {
                        click: _vm.execClick,
                        copy: function($event) {
                          _vm.execCopy($event, "rawDataText1")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.currentItem.key))]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "btnCon" },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: {
                            type: "primary",
                            size: "small",
                            id: "googleBtn1"
                          },
                          on: {
                            click: function($event) {
                              _vm.googleTrans(_vm.currentItem.key, "k")
                            }
                          }
                        },
                        [_vm._v("Google")]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c(
                  "el-card",
                  { staticClass: "boxCard" },
                  [
                    _c("el-input", {
                      staticClass: "afterDataText",
                      attrs: {
                        id: "afterDataText1",
                        type: "textarea",
                        placeholder: "enter translation"
                      },
                      model: {
                        value: _vm.currentItem.targetKey,
                        callback: function($$v) {
                          _vm.$set(_vm.currentItem, "targetKey", $$v)
                        },
                        expression: "currentItem.targetKey"
                      }
                    })
                  ],
                  1
                )
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
                        attrs: {
                          id: "rawDataText" + (index + 2),
                          title: "click to copy content"
                        },
                        on: {
                          click: _vm.execClick,
                          copy: function($event) {
                            _vm.execCopy($event, "rawDataText" + (index + 2))
                          }
                        }
                      },
                      [_vm._v(_vm._s(item))]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "btnCon" },
                      [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "primary",
                              size: "small",
                              id: "googleBtn" + (index + 2)
                            },
                            on: {
                              click: function($event) {
                                _vm.googleTrans(item, index)
                              }
                            }
                          },
                          [_vm._v("Google")]
                        )
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-card",
                    { staticClass: "boxCard" },
                    [
                      _c("el-input", {
                        staticClass: "afterDataText",
                        attrs: {
                          id: "afterDataText" + (index + 2),
                          type: "textarea",
                          placeholder: "enter translation"
                        },
                        model: {
                          value: _vm.currentItem.target[index],
                          callback: function($$v) {
                            _vm.$set(_vm.currentItem.target, index, $$v)
                          },
                          expression: "currentItem.target[index]"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            })
          ],
          2
        )
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-d4a4eb40", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d4a4eb40\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d4a4eb40\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("11ec45aa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d4a4eb40\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OnTrans.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d4a4eb40\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OnTrans.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d4a4eb40\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d4a4eb40\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/backStage/tranlationManagement/OnTrans.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d4a4eb40"
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
Component.options.__file = "resources\\assets\\js\\components\\backStage\\tranlationManagement\\OnTrans.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d4a4eb40", Component.options)
  } else {
    hotAPI.reload("data-v-d4a4eb40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});