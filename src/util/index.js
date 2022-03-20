const format = number => String(number).length < 2 ? `0${number}` : number
const path = require('path')
const fs = require('fs')


const defaultFilePath = path.resolve(process.cwd(), './clear.script')
const defaultConfigPath = path.resolve(process.cwd(), './config.json')

const getTime = () => {
    const f = format
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const hour = now.getHours();
    const day = now.getDate();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${year}-${f(month)}-${f(day)} ${f(hour)}:${f(minute)}:${f(second)}`
}

const logger = (data) => {
    const { src, dst } = data[0]
    console.log(`[DONE] ${getTime()}\n查询: ${src}\n返回: ${dst}  `.green); // outputs green text
}

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
        console.log(fileStr);
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
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

module.exports = {
    getTime,
    logger,
    readFile,
    writeFile,
    getConfig,
    setConfig
}