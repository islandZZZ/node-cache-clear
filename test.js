

const filePath = './clear.scpt'

const runTask = (configArr) => {
    return new Promise((resolve, reject) => {
        readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return
            }
            const fileStr = data.toString()
            const startStr = '-- dynamic_insert_js_script_start'
            const endStr = '-- dynamic_insert_js_script_end'
            const start = fileStr.indexOf(startStr)
            const end = fileStr.indexOf(endStr)
            const arr = ['aaaa.com', 'bbbb.com', 'ccasdz.com']
            const arrStr = arr.reduce((total, cur, index) => {
                return total + `'${cur}'` + (index < arr.length - 1 ? ',' : '')
            }, '')

            const insertScript = `
            execute newTab javascript "[${arrStr}].forEach((v,i)=>{
                const el = document.getElementById('domain-security-policy-view-delete-input')
                el.addEventListener('clcik,'(e)=>{console.log(e);})
                setTimeout(()=>{ 
                    el.value= v;
                    el.click()
                },200*i)
            })"
            `
            const replaceStr = fileStr.substring(0, start + startStr.length) + '\n\t\t\t' + insertScript + '\n \t\t\t' + fileStr.substring(end)
            console.log(replaceStr, '~~~');
            writeFile(filePath, replaceStr, (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('写入成功');
                resolve()
            })

        })
    })
}



