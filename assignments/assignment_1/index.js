function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const process = require('process');
    var name = process.argv;
    return name[name.length - 1];
}

function getNameFromEnv() {
    // Write your code here
    process.env.varName = "Yash";
    return process.env.varName;
}

function getNameFromReadLine() {
    // Write your code here
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question('Enter your name?', name => {
        console.log(name);
        rl.close();
    })
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}