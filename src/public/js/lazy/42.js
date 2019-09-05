webpackJsonp([42],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Register.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    $("#formCon").get(0).style.minHeight = window.innerHeight - 30 + "px";
    $("#formCon").get(0).style.height = $("#register").height() + 10 + "px";
    window.onresize = function () {
      $("#formCon").get(0).style.minHeight = window.innerHeight - 30 + "px";
    };
    // this.registerForm.name=""
    // this.registerForm.email=""
    // this.registerForm.password=""
    // this.registerForm.c_password=""
    document.getElementById("agreeCheckbox").setCustomValidity(agreeCheckbox.validity.valueMissing ? "Please check this box if you want to proceed." : "");
  },
  data: function data() {
    return {
      // showAlert:false,
      // alertTitle:'',
      registerForm: {
        name: '',
        email: '',
        password: '',
        c_password: '',
        agree: ''
      }
    };
  },

  computed: {
    registerDisabled: function registerDisabled() {
      if (this.emailState && this.nameState && this.pwdState && this.c_passwordState) {
        return false;
      } else {
        return true;
      }
    },
    emailState: function emailState() {
      var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!this.registerForm.email) {
        return null;
      } else if (!reg.test(this.registerForm.email)) {
        return false;
      } else {
        return true;
      }
    },
    nameState: function nameState() {
      // let nameReg =  /^[A-Za-z]{2,20}$|^[\u4e00-\u9fa5]{2,20}$/;
      var nameReg = /^[A-Za-z0-9-_.]{1,50}$/;
      if (!this.registerForm.name) {
        return null;
      } else if (!nameReg.test(this.registerForm.name)) {
        return false;
      } else {
        return true;
      }
    },
    pwdState: function pwdState() {
      if (!this.registerForm.password) {
        return null;
      } else if (this.registerForm.password.length < 6) {
        return false;
      } else {
        return true;
      }
    },
    c_passwordState: function c_passwordState() {
      if (!this.registerForm.c_password) {
        return null;
      } else {
        return this.registerForm.c_password === this.registerForm.password ? true : false;
      }
    }
  },
  methods: {
    changeCheckbox: function changeCheckbox() {
      document.getElementById("agreeCheckbox").setCustomValidity(agreeCheckbox.validity.valueMissing ? "Please check this box if you want to proceed." : "");
    },
    onSubmit: function onSubmit(evt) {
      var _this = this;

      evt.preventDefault();
      // console.log(this.registerForm)
      this.$http.post("/api/register", qs.stringify(this.registerForm)).then(function (response) {
        // console.log(response.data)
        if (response.data.success.token) {
          _this.$cookies.set('Authorization', 'Bearer ' + response.data.success.token, 60 * 60 * 12);
          _this.$cookies.set('email', _this.registerForm.email, 60 * 60 * 12);
          _this.$cookies.set('tname', Base64.encode(response.data.success.name), 60 * 60 * 12);
          _this.$cookies.set("tp", Base64.encode(_this.registerForm.password), 60 * 60 * 12);
          _this.$cookies.set('role', Base64.encode(response.data.success.role), 60 * 60 * 12);
          _this.$cookies.set('id', Base64.encode(response.data.success.id), 60 * 60 * 12);
          _this.$cookies.get('loginStatus') ? _this.$cookies.remove('loginStatus') : null;
          _this.$router.push("/dashboard");
        }
        _this.$nextTick(function () {
          //设置请求头
          _this.$http.defaults.headers.common['Authorization'] = _this.$cookies.get('Authorization') || '';
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e24368cc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Register.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e24368cc\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Register.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "register" } }, [
    _c(
      "div",
      { attrs: { id: "formCon" } },
      [
        _c(
          "b-form",
          {
            attrs: { id: "registerForm", method: "post" },
            on: { submit: _vm.onSubmit }
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
                _c("div", { staticClass: "modeTitle" }, [_vm._v("Sign Up")])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              { attrs: { label: "Email:", "label-for": "emailRegister" } },
              [
                _c("b-form-input", {
                  attrs: {
                    id: "emailRegister",
                    type: "email",
                    state: _vm.emailState,
                    required: "",
                    oninvalid: "setCustomValidity('Email is required.');",
                    oninput: "setCustomValidity('');",
                    placeholder: "enter Email",
                    title: "Email is required."
                  },
                  model: {
                    value: _vm.registerForm.email,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.registerForm,
                        "email",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "registerForm.email"
                  }
                }),
                _vm._v(" "),
                _c(
                  "b-form-invalid-feedback",
                  { attrs: { id: "emailRegisterFeedback" } },
                  [_vm._v("\n          Email address is invalid.\n        ")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              { attrs: { label: "User Name:", "label-for": "nameRegister" } },
              [
                _c("b-form-input", {
                  attrs: {
                    id: "nameRegister",
                    state: _vm.nameState,
                    required: "",
                    oninvalid: "setCustomValidity('User Name is required.');",
                    oninput: "setCustomValidity('');",
                    placeholder: "enter user name",
                    title: "User Name is required."
                  },
                  model: {
                    value: _vm.registerForm.name,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.registerForm,
                        "name",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "registerForm.name"
                  }
                }),
                _vm._v(" "),
                _c(
                  "b-form-invalid-feedback",
                  { attrs: { id: "nameRegisterFeedback" } },
                  [
                    _vm._v(
                      "\n          Only letters (A-Za-z), numbers (0-9), dot (.), underscore (_), hyphen (-) are supported and maximum length is 50 characters.\n        "
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              { attrs: { label: "Password:", "label-for": "pwdRegister" } },
              [
                _c("b-form-input", {
                  attrs: {
                    id: "pwdRegister",
                    type: "password",
                    state: _vm.pwdState,
                    required: "",
                    oninvalid: "setCustomValidity('Password is required.');",
                    oninput: "setCustomValidity('');",
                    placeholder: "enter password",
                    title: "Password is required."
                  },
                  model: {
                    value: _vm.registerForm.password,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.registerForm,
                        "password",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "registerForm.password"
                  }
                }),
                _vm._v(" "),
                _c(
                  "b-form-invalid-feedback",
                  { attrs: { id: "pwdRegisterFeedback" } },
                  [
                    _vm._v(
                      "\n          Password length cannot be less than 6.\n        "
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-form-group",
              {
                attrs: {
                  label: "Repeat the password:",
                  "label-for": "c_pwdRegister"
                }
              },
              [
                _c("b-form-input", {
                  attrs: {
                    type: "password",
                    id: "c_pwdRegister",
                    state: _vm.c_passwordState,
                    required: "",
                    oninvalid:
                      "setCustomValidity('Repeat the password is required.');",
                    oninput: "setCustomValidity('');",
                    placeholder: "enter password again",
                    title: "Repeat the password is required."
                  },
                  model: {
                    value: _vm.registerForm.c_password,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.registerForm,
                        "c_password",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "registerForm.c_password"
                  }
                }),
                _vm._v(" "),
                _c(
                  "b-form-invalid-feedback",
                  { attrs: { id: "c_pwdRegisterFeedback" } },
                  [
                    _vm._v(
                      "\n          The passwords you typed do not match.\n        "
                    )
                  ]
                )
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
                      id: "agreeCheckbox",
                      value: "accepted",
                      "unchecked-value": "not_accepted",
                      required: "",
                      title: "Please check this box if you want to proceed."
                    },
                    on: { change: _vm.changeCheckbox },
                    model: {
                      value: _vm.registerForm.agree,
                      callback: function($$v) {
                        _vm.$set(
                          _vm.registerForm,
                          "agree",
                          typeof $$v === "string" ? $$v.trim() : $$v
                        )
                      },
                      expression: "registerForm.agree"
                    }
                  },
                  [
                    _vm._v("\n          I accept \n          "),
                    _c(
                      "b-link",
                      {
                        staticClass: "userTerm",
                        attrs: {
                          href: "https://opensource.org/licenses/MIT",
                          target: "_blank"
                        }
                      },
                      [_vm._v("the Term of Service")]
                    ),
                    _vm._v(".\n        ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "formLink" },
                  [
                    _vm._v("\n          Registered account?"),
                    _c(
                      "b-link",
                      {
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.$router.push("/login")
                          }
                        }
                      },
                      [_vm._v("Sign In")]
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
                    staticClass: "registerBtn",
                    attrs: {
                      type: "submit",
                      variant: _vm.registerDisabled ? "#aaa" : "info",
                      disabled: _vm.registerDisabled
                    }
                  },
                  [_vm._v("Sign Up")]
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
    require("vue-hot-reload-api")      .rerender("data-v-e24368cc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e24368cc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Register.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e24368cc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Register.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("2d5d96e6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e24368cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Register.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e24368cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Register.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/Register.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e24368cc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Register.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\",[\"import\",{\"libraryName\":\"iview\",\"libraryDirectory\":\"src/components\"}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Register.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e24368cc\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Register.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e24368cc"
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
Component.options.__file = "resources\\assets\\js\\components\\Register.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e24368cc", Component.options)
  } else {
    hotAPI.reload("data-v-e24368cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});