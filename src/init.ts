import { download } from './utils/downloadGitRepo'
import { install } from './utils/install'
import { promisify } from 'util'
import ora from 'ora'
import inquirer from 'inquirer'
import fs from 'fs'
import chalk from 'chalk'
import path from 'path'

const exist = promisify(fs.stat)

const init = async (projectName: string) => {
  const projectExist = await exist(projectName).catch(err => {
    // 处理除文件已存在之外的其他错误
    if (err.code !== 'ENOENT') {
      console.log(chalk.redBright.bold(err))
    }
  })
  // 文件已存在
  if (projectExist) {
    console.log(chalk.redBright.bold('The file has exited！'))
    return
  }
  // 接收用户命令
  inquirer
    .prompt([
      {
        name: 'description',
        message: 'Please enter the project description',
      },
      {
        name: 'author',
        message: 'Please enter the project author',
      },
      {
        type: 'list',
        name: 'language',
        message: 'select the develop language',
        choices: ['javaScript', 'typeScript'],
      },
      {
        type: 'list',
        name: 'package',
        message: 'select the package management',
        choices: ['npm', 'yarn'],
      },
    ])
    .then(async answer => {
      // 下载模板 配置相关信息
      let loading = ora('downloading template...')
      loading.start()
      loading.color = 'yellow'
      download(projectName, answer.language).then(
        async () => {
          loading.succeed()
          const fileName = `${projectName}/package.json`
          if (await exist(fileName)) {
            const data = fs.readFileSync(fileName).toString()
            let json = JSON.parse(data)
            json.name = projectName
            json.author = answer.author
            json.description = answer.description
            fs.writeFileSync(
              fileName,
              JSON.stringify(json, null, '\t'),
              'utf-8',
            )
            console.log(chalk.green('Project initialization finished!'))
            console.log()
            console.log(chalk.yellowBright('start install dependencies...'))
            // 安装依赖
            await install({
              cwd: path.join(process.cwd(), projectName),
              package: answer.package,
            }).then(() => {
              console.log()
              console.log('We suggest that you begin by typing:')
              console.log()
              console.log(chalk.cyan('  cd'), projectName)
              console.log(`  ${chalk.cyan(`${answer.package} start`)}`)
            })
          }
        },
        () => {
          loading.fail()
        },
      )
    })
}

module.exports = init
