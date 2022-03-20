#!/usr/bin/env node

const { Command } = require('commander')

const program = new Command();
program
    .name('iclear')
    .description('a tool for clearing dns & sockets pool & htsts cache')
    .action(async () => {
        
    })

program.command('show')
    .description('show your config info')
    .action(async () => {

    })

program.command('config')
    .description('config your info like this: fy confing -a xxx -k xxx or fy confing --appid xxx --key xxx')
    .arguments('[string]', 'info to input')
    .arguments('[string]', 'info to input')
    .option('-a,--appid', 'input your appid')
    .option('-k,--key', 'input your key')
    .action((appid, key, options) => {
        setConfig({ appid, key, options })
    })



program.parse();

