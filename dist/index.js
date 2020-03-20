"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _constants = require("./utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var program = new _commander.default.Command();
program.command('init <projectName>').description('miniCli init').action(() => {
  require('./init')(...process.argv.slice(3));
});
program.version(_constants.VERSION, '-v --version');
program.parse(process.argv);