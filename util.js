const fs = require('fs');
const chalk = require('chalk');
const symbol = require('log-symbols');

/**
 * 检查是否存在该文件或目录
 * @param {String} path
 */
const isExist = (path) => new Promise((resolve, reject) => {
    fs.access(path, (err) => {
        resolve(!err);
    });
});

const success = (msg) => {
    console.log(symbol.success, chalk.green(msg));
}
const warn = (msg) => {
    console.log(symbol.warning, chalk.yellow(msg));
}
const error = (msg) => {
    console.log(symbol.error, chalk.red(msg));
}

// 转驼峰
const toCamel = (string) => string.replace(/[_|/]([a-z]|[A-Z])/g, (match, p1) => {
    return p1.toUpperCase();
});

module.exports = {
    isExist,
    success,
    warn,
    error,
    toCamel,
};
