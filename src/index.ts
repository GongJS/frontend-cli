import commander from 'commander'
import { VERSION } from './utils/constants'
const program = new commander.Command()

program
  .command('init <projectName>')
  .description('gong-cli init')
  .action(() => {
    require('./init')(...process.argv.slice(3))
  })

program.version(VERSION, '-v --version')

program.parse(process.argv)
