"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var downloadGit = require('download-git-repo');

var download = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (projectName, language) {
    // 这里先用了巨硬家的react模版
    var api = 'microsoft/';
    language === 'javaScript' ? api = api + 'vscode-react-sample' : api = api + 'TypeScript-React-Starter';
    return new Promise((resolve, reject) => {
      downloadGit(api, projectName, {}, err => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  });

  return function download(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.download = download;