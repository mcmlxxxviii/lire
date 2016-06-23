
var lire = require('..')

var ctx = lire.context({
    '+': function (a, b) {
        return a + b
    },
    '-': function (a, b) {
        return a - b
    },
    '*': function (a, b) {
        return a * b
    },
    '/': function (a, b) {
        return a / b
    }
})


console.log(lire.evaluate(['+', ['-', 4, 3], ['*', 2, ['/', 11, 100]]], ctx))