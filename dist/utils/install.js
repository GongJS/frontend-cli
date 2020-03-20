"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var spawn = require('cross-spawn');

var install = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (options) {
    var cwd = options.cwd;
    return new Promise((resolve, reject) => {
      var command = options.package;
      var args = ['install', '--save', '--save-exact', '--loglevel', 'error'];
      var child = spawn(command, args, {
        cwd,
        stdio: ['pipe', process.stdout, process.stderr]
      });
      child.once('close', code => {
        if (code !== 0) {
          reject({
            command: "".concat(command, " ").concat(args.join(' '))
          });
          return;
        }

        resolve();
      });
      child.once('error', reject);
    });
  });

  return function install(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.install = install;