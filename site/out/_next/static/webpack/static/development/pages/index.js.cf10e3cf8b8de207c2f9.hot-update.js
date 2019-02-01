webpackHotUpdate("static/development/pages/index.js",{

/** */ "./pages/index.js":
/* !************************!*\
  !*** ./pages/index.js ***!
  \************************/
/* ! exports provided: default */
/** */ (function(module, __webpack_exports__, __webpack_require__) {


__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ const _components_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! ./../components/Layout */ "./components/Layout.js");
/* harmony import */ const next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! next/link */ "./node_modules/next/link.js");
/* harmony import */ const next_link__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ const react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/* ! react */ "./node_modules/react/index.js");
/* harmony import */ const react__WEBPACK_IMPORTED_MODULE_2___default = /* #__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ const react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/* ! react-syntax-highlighter */ "./node_modules/react-syntax-highlighter/dist/esm/index.js");
const _jsxFileName = "/Users/william/Sync/nativemodels/site/pages/index.js";



 // import { dark } from 'react-syntax-highlighter/dist/styles/prism';

const example = "const { createModel } = require('nativemodels');\nconst { computed, string } = require('nativemodels/datatypes');\nconst { email } = require('nativemodels/customtypes');\n\nconst data = {\n\tfistName: 'John',\n\tlastName: 'Smith',\n\temail: 'john.smith@example.com',\n};\n\nconst schema = {\n\tfistName: string(),\n\tlastName: string(),\n\tfullName: computed((record) => {\n\t\treturn firstName + ' ' + lastName\n\t}),\n\temail: email(),\n};\n\nconst user = createModel(schema)(data);\n";

const Index = function Index() {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_0__.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "bg-grey-dark h-screen",
    style: {
      backgroundImage: 'linear-gradient(135deg, #B8C2CC, #3D4852)'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "text-center container mx-auto pt-10",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h1", {
    className: "text-white font-hairline tracking-wide mb-5 text-5xl",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, "Native Models"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
    className: "text-white text-xl",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, "Runtime type checking for Javascript Objects"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "mt-10",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "https://github.com/Prefinem/nativemodels",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    className: "font-normal text-white no-underline border border-white rounded-full py-2 px-10 tracking-wide mx-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, "Github")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/getting-started",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    className: "font-normal text-black no-underline border border-white rounded-full rounded-full py-2 px-10 bg-white mx-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, "Get Started"))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "m-5 mt-10",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_3__.Prism, {
    className: "rounded",
    language: "javascript",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, example)))));
};

/* harmony default export */ __webpack_exports__.default = (Index);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      const components = next.router.components

      for (const r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/* ! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/** */ })

})
// # sourceMappingURL=index.js.cf10e3cf8b8de207c2f9.hot-update.js.map