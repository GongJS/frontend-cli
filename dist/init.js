"use strict";

var _downloadGitRepo = require("./utils/downloadGitRepo");

var _install = require("./utils/install");

var _util = require("util");

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var exist = (0, _util.promisify)(_fs.default.stat);

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (projectName) {
    var projectExist = yield exist(projectName).catch(err => {
      // 处理除文件已存在之外的其他错误
      if (err.code !== 'ENOENT') {
        console.log(_chalk.default.redBright.bold(err));
      }
    }); // 文件已存在

    if (projectExist) {
      console.log(_chalk.default.redBright.bold('The file has exited！'));
      return;
    } // 接收用户命令


    _inquirer.default.prompt([{
      name: 'description',
      message: 'Please enter the project description'
    }, {
      name: 'author',
      message: 'Please enter the project author'
    }, {
      type: 'list',
      name: 'language',
      message: 'select the develop language',
      choices: ['javaScript', 'typeScript']
    }, {
      type: 'list',
      name: 'package',
      message: 'select the package management',
      choices: ['npm', 'yarn']
    }]).then( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (answer) {
        // 下载模板 配置相关信息
        var loading = (0, _ora.default)('downloading template...');
        loading.start();
        loading.color = 'yellow';
        (0, _downloadGitRepo.download)(projectName, answer.language).then( /*#__PURE__*/_asyncToGenerator(function* () {
          loading.succeed();
          var fileName = "".concat(projectName, "/package.json");

          if (yield exist(fileName)) {
            var data = _fs.default.readFileSync(fileName).toString();

            var json = JSON.parse(data);
            json.name = projectName;
            json.author = answer.author;
            json.description = answer.description;

            _fs.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');

            console.log(_chalk.default.green('Project initialization finished!'));
            console.log();
            console.log(_chalk.default.yellowBright('start install dependencies...')); // 安装依赖

            yield (0, _install.install)({
              cwd: _path.default.join(process.cwd(), projectName),
              package: answer.package
            }).then(() => {
              console.log();
              console.log('We suggest that you begin by typing:');
              console.log();
              console.log(_chalk.default.cyan('  cd'), projectName);
              console.log("  ".concat(_chalk.default.cyan("".concat(answer.package, " start"))));
            });
          }
        }), () => {
          loading.fail();
        });
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = init;