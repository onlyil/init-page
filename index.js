#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const initPage = require('./initPage');
const {warn, error} = require('./util');

// 校验参数（文件名）
const argv = JSON.parse(process.env.npm_config_argv).original;
let fileName;
argv.forEach((item) => {
    if (item.indexOf('--') === 0) {
        fileName = item.replace('--', '');
    }
});
if (/[^\w-/]/g.test(fileName)) {
    error(`请输入正确的文件路径！\n${fileName}`);
    process.exit(0);
}

// 判断目录是否已存在
const bizDirPath = path.resolve(__dirname, '../../', 'src/biz')
let bizDir = fs.readdirSync(bizDirPath);
bizDir = bizDir.filter((item) => {
    if (item.indexOf('.') === 0) {
        return false;
    }
    return true;
});
if (!bizDir.includes(fileName.split('/')[0])) {
    warn(`src/biz 下没有该目录：${fileName.split('/')[0]}\n`);
    inquirer
        .prompt([
            {
                name: 'useDefault',
                message: '是否要加在 src/biz/xretail 目录下？(Y/n)'
            },
        ])
        .then((answer) => {
            let targetDirPath;
            if (answer.useDefault === '' || answer.useDefault === 'Y' || answer.useDefault === 'y') {
                targetDirPath = path.resolve(bizDirPath, 'xretail', fileName);
            } else {
                targetDirPath = path.resolve(bizDirPath, fileName);
            }
            initPage(targetDirPath, fileName);
        });
} else {
    const targetDirPath = path.resolve(bizDirPath, fileName);
    initPage(targetDirPath, fileName);
}
