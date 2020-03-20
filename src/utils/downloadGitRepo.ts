const downloadGit = require('download-git-repo')

export const download = async (projectName: string, language: string) => {
  // 这里先用了巨硬家的react模版
  let api = 'microsoft/'
  language === 'javaScript'
    ? (api = api + 'vscode-react-sample')
    : (api = api + 'TypeScript-React-Starter')
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, {}, (err: any) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
