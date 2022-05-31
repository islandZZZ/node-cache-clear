#!/usr/bin/env node

const { Command } = require('commander');
const { runTask } = require('./src/run');
const { getConfig, setConfig, isMacOS } = require('./src/util');
const colors = require('colors')

const program = new Command();

program
    .name('iclear')
    .description('a tool for clearing dns & sockets pool & htsts cache')
    .action(async () => {
        const configArr = await getConfig()
        if (!configArr.length) {
            console.log(colors.red('tips: empty config. please add domain to config at first.'));
            return
        }

        if (!isMacOS()) {
            console.log(colors.red('error: only macOS system is supported.'));
            return
        }
        runTask()
    })

program.command('show')
    .description('show your config info')
    .action(async () => {
        const configArr = await getConfig()
        console.log(colors.green(configArr.map(v => '- ' + v).join('\n')));
    })

program.command('add')
    .description('add your domain: iclear add domain1 domain2 ')
    .arguments('[string...]', 'domain to input')
    .action(async (domainArr) => {
        const baseArr = await getConfig()
        domainArr.length && await setConfig(domainArr.concat(baseArr))
    })

program.command('remove')
    .description('remove your domain: iclear remove domain1 ')
    .arguments('[string]', 'domain to input')
    .action(async (domain) => {
        const domainArr = await getConfig()
        const filterList = domainArr.filter(v => v !== domain)
        await setConfig(filterList)
    })

program.command('clear')
    .description('clear your domain: iclear clear')
    .arguments('[string]', 'domain to input')
    .action(async () => {
        await setConfig([])
    })
program.parse();

