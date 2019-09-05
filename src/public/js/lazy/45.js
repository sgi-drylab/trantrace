webpackJsonp([45],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Login.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.myBrowser();
    $("#formCon").get(0).style.minHeight = window.innerHeight - 30 + "px";
    $("#formCon").get(0).style.height = $("#login").height() + 10 + "px";
    window.onresize = function () {
      $("#formCon").get(0).style.minHeight = window.innerHeight - 30 + "px";
    };

    if (this.$cookies.get('loginStatus') === 'remember') {
      this.$cookies.get('email') ? this.loginForm.email = this.$cookies.get('email') : this.loginForm.email = '';
      this.$cookies.get('tp') ? this.loginForm.password = Base64.decode(this.$cookies.get('tp')) : this.loginForm.password = '';
    } else {
      this.$cookies.remove('Authorization');
      this.$cookies.remove('permissionvue');
      this.$cookies.get('email') ? this.loginForm.email = this.$cookies.get('email') : this.loginForm.email = '';
    }
  },
  data: function data() {
    return {
      submitDisabled: false,
      loginForm: {
        email: '',
        password: '',
        status: 'remember'
      }
    };
  },

  methods: {
    myBrowser: function myBrowser() {
      // console.log(navigator.userAgent)
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
      var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
      var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
      var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

      // this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), Edge (>=44), IE11.', {
      //     type:'warning',
      //     confirmButtonText: 'OK'
      //   });

      if (isOpera) {
        this.$message({
          message: 'Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).',
          type: 'warning'
        });
        // return "Opera";
      } else if (isEdge) {
        if (userAgent.match(/Edge\/([\d.]+)/)[1].split('.')[0] < 18) {
          this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).', {
            type: 'warning',
            confirmButtonText: 'OK'
          });
        }
      } else if (isFF) {
        if (userAgent.match(/Firefox\/([\d.]+)/)[1].split('.')[0] < 67) {
          this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).', {
            type: 'warning',
            confirmButtonText: 'OK'
          });
        }
      } else if (isSafari) {
        if (userAgent.match(/Safari\/([\d.]+)/)[1].split('.')[0] < 12) {
          this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).', {
            type: 'warning',
            confirmButtonText: 'OK'
          });
        }
      } else if (isChrome) {
        if ((userAgent.match(/Chrome\/([\d.]+)/) || userAgent.match(/CriOS\/([\d.]+)/))[1].split('.')[0] < 70) {
          this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).', {
            type: 'warning',
            confirmButtonText: 'OK'
          });
        }
      } else if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
        this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).', {
          type: 'warning',
          confirmButtonText: 'OK'
        });
      } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
        // return "IE11"
      } else {
        // return userAgent
        this.$alert('Your browser may have incompatiblity issues with Trantrace. Please update to latest stable version of Google Chrome (>=70), Firefox (>=67), safari (>=12), Edge (>=18), IE (>=11).', {
          type: 'warning',
          confirmButtonText: 'OK'
        });
      }
    },
    onSubmit: function onSubmit(evt) {
      var _this = this;

      evt.preventDefault();
      this.submitDisabled = true;
      this.$http.post("/api/login", qs.stringify(this.loginForm)).then(function (response) {
        // console.log(response.data)
        if (response.data.success) {
          if (_this.loginForm.status === 'remember') {
            _this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12);
            _this.$cookies.set('email', _this.loginForm.email, 60 * 60 * 12);
            _this.$cookies.set('tname', Base64.encode(response.data.success.name), 60 * 60 * 12);
            _this.$cookies.set('tp', Base64.encode(_this.loginForm.password), 60 * 60 * 12);
            _this.$cookies.set('loginStatus', _this.loginForm.status, 60 * 60 * 12);
            _this.$cookies.set('role', Base64.encode(response.data.success.role), 60 * 60 * 12);
            _this.$cookies.set('id', Base64.encode(response.data.success.id), 60 * 60 * 12);
          } else {
            _this.$cookies.set('email', _this.loginForm.email, 60 * 60 * 12);
            _this.$cookies.set('tname', Base64.encode(response.data.success.name), 60 * 60 * 12);
            _this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12);
            _this.$cookies.set('role', Base64.encode(response.data.success.role), 60 * 60 * 12);
            _this.$cookies.set('id', Base64.encode(response.data.success.id), 60 * 60 * 12);
            _this.$cookies.remove('tp');
            _this.$cookies.get('loginStatus') ? _this.$cookies.remove('loginStatus') : null;
          }
          _this.$nextTick(function () {
            //设置请求头
            _this.$http.defaults.headers.common['Authorization'] = _this.$cookies.get('Authorization') || '';
          });
          // 1用户  2管理员
          if (response.data.success.role == 2) {
            _this.$router.push("/userinfo");
          } else {
            _this.$router.push("/dashboard");
          }
        }
        _this.submitDisabled = false;
      }).catch(function (error) {
        // console.log(error)
        _this.submitDisabled = false;
      });
    },
    onReset: function onReset(evt) {
      evt.preventDefault();
      this.loginForm.email = '';
      this.loginForm.password = '';
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-01e7f602\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Login.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-01e7f602\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Login.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "login" } }, [
    _c(
      "div",
      { attrs: { id: "formCon" } },
      [
        _c(
          "b-form",
          {
            attrs: { id: "loginForm" },
            on: { submit: _vm.onSubmit, reset: _vm.onReset }
          },
          [
            _c(
              "b-form-group",
              [
                _c("b-link", [
                  _c("img", {
                    attrs: {
                      src: "/images/logo.png",
                      title: "Trantrace",
                      height: "50",
                      width: "180",
                      alt: "Trantrace Logo"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modeTitle" }, [_vm._v("Sign In")])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              { attrs: { label: "Email:", "label-for": "emailLogin" } },
              [
                _c("b-form-input", {
                  attrs: {
                    id: "emailLogin",
                    required: "",
                    oninvalid: "setCustomValidity('Email is required.');",
                    oninput: "setCustomValidity('');",
                    placeholder: "enter email",
                    title: "Email is required."
                  },
                  model: {
                    value: _vm.loginForm.email,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.loginForm,
                        "email",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "loginForm.email"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              { attrs: { label: "Password:", "label-for": "pwdLogin" } },
              [
                _c("b-form-input", {
                  attrs: {
                    id: "pwdLogin",
                    type: "password",
                    required: "",
                    oninvalid: "setCustomValidity('Password is required.');",
                    oninput: "setCustomValidity('');",
                    placeholder: "enter password",
                    title: "Password is required."
                  },
                  model: {
                    value: _vm.loginForm.password,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.loginForm,
                        "password",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "loginForm.password"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              [
                _c(
                  "b-form-checkbox",
                  {
                    staticClass: "rememberStatus",
                    attrs: {
                      plain: "",
                      id: "remembercheckbox",
                      value: "remember",
                      "unchecked-value": "forget"
                    },
                    model: {
                      value: _vm.loginForm.status,
                      callback: function($$v) {
                        _vm.$set(
                          _vm.loginForm,
                          "status",
                          typeof $$v === "string" ? $$v.trim() : $$v
                        )
                      },
                      expression: "loginForm.status"
                    }
                  },
                  [_vm._v("\n          Remember\n        ")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "formLink" },
                  [
                    _c(
                      "b-link",
                      {
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.$router.push("/register")
                          }
                        }
                      },
                      [_vm._v("Sign Up")]
                    ),
                    _c(
                      "b-link",
                      {
                        directives: [
                          {
                            name: "b-tooltip",
                            rawName: "v-b-tooltip.focus",
                            modifiers: { focus: true }
                          }
                        ],
                        attrs: {
                          title:
                            "Please contact administrator to reset your password."
                        }
                      },
                      [_vm._v("Forgot password?")]
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              [
                _c(
                  "b-button",
                  {
                    staticClass: "submitBtn",
                    attrs: {
                      type: "submit",
                      variant: "info",
                      disabled: _vm.submitDisabled
                    }
                  },
                  [_vm._v("Sign In")]
                ),
                _vm._v(" "),
                _c(
                  "b-button",
                  { staticClass: "resetBtn", attrs: { type: "reset" } },
                  [_vm._v("Reset")]
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c("footer", [
      _c("div", { staticClass: "sectionCenter" }, [
        _vm._v("Copyright " + _vm._s(new Date().getFullYear()))
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-01e7f602", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-01e7f602\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Login.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-01e7f602\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Login.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("ae38e57e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-01e7f602\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-01e7f602\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/Login.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-01e7f602\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Login.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Login.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-01e7f602\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Login.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-01e7f602"
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
Component.options.__file = "resources\\assets\\js\\components\\Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01e7f602", Component.options)
  } else {
    hotAPI.reload("data-v-01e7f602", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});