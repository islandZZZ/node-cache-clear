const format = number => String(number).length < 2 ? `0${number}` : number
const path = require('path')
const fs = require('fs')
const homeDir =  require('os').homedir //系统的home目录 home dir
const home = process.env.HOME || homedir // 系统配置的home环境变量 home variable

const defaultFilePath = path.resolve(process.cwd(), './clear.script')
const defaultConfigPath = path.join(home, 'node-cache-clear.config.json')

const readFile = (path = defaultFilePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: 'a+' }, (err, data) => {
            if (err) return reject(console.log(`read file ${path} failed`));
            resolve(data.toString())
        })
    })

}

const writeFile = (fileStr, path = defaultFilePath) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, fileStr, (err) => {
            if (err) {
                reject(err)
                return
            }
            resolve(config)
        })
    })
}

const getConfig = (path = defaultConfigPath) => {
    return new Promise(async (resolve, reject) => {
        const fileStr = await readFile(path)
        let config = null
        try {
            config = JSON.parse(fileStr)
        } catch (error) {
            config = []
        }
        resolve(config)
    })
}

const setConfig = (arr, path = defaultConfigPath) => {
    const data = JSON.stringify(arr)
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                console.log(err);
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

module.exports = {
    readFile,
    writeFile,
    getConfig,
    setConfig
}