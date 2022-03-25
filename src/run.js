const { exec } = require('child_process')
const { readFile, writeFile } = require('fs')
const path = require('path')
const { getConfig } = require('./util')
const filePath = path.join(__dirname,'../clear.scpt')
const shell = `sudo osascript ${filePath}`
require('colors')

const runTask = () => {
    return new Promise((resolve, reject) => {
        readFile(filePath, async (err, data) => {
            if (err) {
                console.log(err);
                return
            }
            const fileStr = data.toString()
            const startStr = '-- dynamic_insert_js_script_start'
            const endStr = '-- dynamic_insert_js_script_end'
            const start = fileStr.indexOf(startStr)
            const end = fileStr.indexOf(endStr)
            const arr = await getConfig()
            const arrStr = arr.reduce((total, cur, index) => {
                return total + `'${cur}'` + (index < arr.length - 1 ? ',' : '')
            }, '')

            const insertScript = `
            execute newTab javascript "
			const el = document.getElementById('domain-security-policy-view-delete-input');
            el.addEventListener('click',(e)=>{console.log(e.target.value)});
			[${arrStr}].forEach((v,i)=>{
                setTimeout(()=>{ 
                    el.value= v
                    el.click()
                },300*i)
            })"`
            let replaceStr = ''
            replaceStr = fileStr.substring(0, start + startStr.length) + '\n\t\t\t' + insertScript + '\n\t\t\t' + fileStr.substring(end)

            const delayStartStr = '-- dynamic_insert_js_delay_start'
            const delayEndStr = '-- dynamic_insert_js_delay_end'
            const delayStart = replaceStr.indexOf(delayStartStr)
            const delayEnd = replaceStr.indexOf(delayEndStr)
            const delayText = `delay ${((arr.length) * 0.3) + 0.3}`
            replaceStr = replaceStr.substring(0, delayStart + delayStartStr.length) + '\n\t\t\t' + delayText + '\n\t\t\t' + replaceStr.substring(delayEnd)
            writeFile(filePath, replaceStr, (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('node-cache-clear: Dynamically generate the script and prepare to clean up the domain name cache.'.green);
                runShellTask(shell)
                resolve()
            })

        })
    })
}

const runShellTask = (shell) => {
    exec(shell, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            return
        }
        stdout && console.log(stdout)
        console.log('node-cache-clear: Cleanup succeeded!'.green)
    })
}

module.exports = {
    runTask
}

