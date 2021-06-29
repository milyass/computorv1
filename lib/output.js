const chalk = require('chalk');
const log = console.log;

module.exports = { 
    output: (str, color) => log(chalk`{${color} ${str}}`),
    chalk
} 
