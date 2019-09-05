webpackJsonp([0],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Home.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_GhCarousel_vue__ = __webpack_require__("./resources/assets/js/components/common/GhCarousel.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_GhCarousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_GhCarousel_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import GhHeader from './common/GhHeader.vue'

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    // GhHeader,
    GhCarousel: __WEBPACK_IMPORTED_MODULE_0__common_GhCarousel_vue___default.a
  }

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/common/GhCarousel.vue":
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      slide: 0,
      sliding: null
    };
  },

  methods: {
    onSlideStart: function onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd: function onSlideEnd(slide) {
      this.sliding = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85ef4954\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Home.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nmain .row[data-v-85ef4954] {\n  padding-bottom: 20px;\n}\nmain .row .infoList[data-v-85ef4954] {\n  padding: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-657700cb\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/common/GhCarousel.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "sectionCenter" },
    [
      _c(
        "b-carousel",
        {
          staticStyle: { "text-shadow": "1px 1px 2px #333" },
          attrs: {
            id: "carousel",
            controls: "",
            indicators: "",
            background: "#ababab",
            interval: 4000,
            "img-width": "1024",
            "img-height": "480"
          },
          on: {
            "sliding-start": _vm.onSlideStart,
            "sliding-end": _vm.onSlideEnd
          },
          model: {
            value: _vm.slide,
            callback: function($$v) {
              _vm.slide = $$v
            },
            expression: "slide"
          }
        },
        [
          _c("b-carousel-slide", {
            attrs: {
              caption: "First slide",
              text:
                "Nulla vitae elit libero, a pharetra augue mollis interdum.",
              "img-src": "https://picsum.photos/1024/480/?image=52"
            }
          }),
          _vm._v(" "),
          _c(
            "b-carousel-slide",
            {
              attrs: { "img-src": "https://picsum.photos/1024/480/?image=54" }
            },
            [_c("h1", [_vm._v("Hello world!")])]
          ),
          _vm._v(" "),
          _c("b-carousel-slide", {
            attrs: { "img-src": "https://picsum.photos/1024/480/?image=58" }
          }),
          _vm._v(" "),
          _c("b-carousel-slide", [
            _c("img", {
              staticClass: "d-block img-fluid w-100",
              attrs: {
                slot: "img",
                width: "1024",
                height: "480",
                src: "https://picsum.photos/1024/480/?image=55",
                alt: "image slot"
              },
              slot: "img"
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-657700cb", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-85ef4954\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Home.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    [
      _c("gh-carousel"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "bv-example-row" },
        [
          _c(
            "b-row",
            { staticClass: "sectionCenter" },
            [
              _c(
                "b-col",
                { staticClass: "infoList", attrs: { cols: "12" } },
                [
                  _c("b-img", {
                    attrs: {
                      src: "images/img1.jpg",
                      "fluid-grow": "",
                      alt: "Responsive image"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { staticClass: "infoList", attrs: { cols: "12" } },
                [
                  _c("b-img", {
                    attrs: {
                      src: "images/img1.jpg",
                      "fluid-grow": "",
                      alt: "Responsive image"
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
            "b-row",
            { staticClass: "sectionCenter" },
            [
              _c(
                "b-col",
                {
                  staticClass: "infoList",
                  staticStyle: { "padding-left": "17px" },
                  attrs: { cols: "12", sm: "6" }
                },
                [
                  _vm._v("\n      新闻热点\n        "),
                  _c(
                    "b-list-group",
                    [
                      _c("b-list-group-item", [_vm._v("Cras justo odio")]),
                      _vm._v(" "),
                      _c("b-list-group-item", [
                        _vm._v("Dapibus ac facilisis in")
                      ]),
                      _vm._v(" "),
                      _c("b-list-group-item", [_vm._v("Morbi leo risus")]),
                      _vm._v(" "),
                      _c("b-list-group-item", [
                        _vm._v("Porta ac consectetur ac")
                      ]),
                      _vm._v(" "),
                      _c("b-list-group-item", [_vm._v("Vestibulum at eros")])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { staticClass: "infoList", attrs: { cols: "12", sm: "6" } },
                [
                  _vm._v("\n      新闻热点\n        "),
                  _c(
                    "b-list-group",
                    [
                      _c("b-list-group-item", [_vm._v("Cras justo odio")]),
                      _vm._v(" "),
                      _c("b-list-group-item", [
                        _vm._v("Dapibus ac facilisis in")
                      ]),
                      _vm._v(" "),
                      _c("b-list-group-item", [_vm._v("Morbi leo risus")]),
                      _vm._v(" "),
                      _c("b-list-group-item", [
                        _vm._v("Porta ac consectetur ac")
                      ]),
                      _vm._v(" "),
                      _c("b-list-group-item", [_vm._v("Vestibulum at eros")])
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
    require("vue-hot-reload-api")      .rerender("data-v-85ef4954", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85ef4954\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Home.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85ef4954\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Home.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("abf48f5c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85ef4954\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85ef4954\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/components/Home.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85ef4954\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/Home.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Home.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-85ef4954\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Home.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-85ef4954"
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
Component.options.__file = "resources\\assets\\js\\components\\Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-85ef4954", Component.options)
  } else {
    hotAPI.reload("data-v-85ef4954", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/common/GhCarousel.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/common/GhCarousel.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-657700cb\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/common/GhCarousel.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
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
Component.options.__file = "resources\\assets\\js\\components\\common\\GhCarousel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-657700cb", Component.options)
  } else {
    hotAPI.reload("data-v-657700cb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});