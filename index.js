// Lisp inspired rule expression/engine
// similar to https://github.com/tmcw-up-for-adoption/subscript

var type = Object.prototype.toString;

function evaluate(code, context) {
    if (type.call(code) !== '[object Array]') {
        return code;
    }

    var operator = evaluate(code[0], context);
    var fn = context(operator);

    if (type.call(fn) !== '[object Function]') {
        throw new Error('undefined operator: ' + operator);
    }

    if(operator[0] === ':') {
        return fn.call(null, code.slice(1), evaluate, context);
    }

    for (var operands = [], argi = 1; argi < code.length; argi++) {
        operands.push(evaluate(code[argi], context));
    }

    return fn.apply(null, operands);
}

function context(library, parent) {
    function cx(operator) {
        if(cx.has(operator)) return library[operator];

        if(type.call(parent) === '[object Function]') return parent(operator);
    }
    
    cx.has = function (operator) {
        return library && library.hasOwnProperty(operator);
    };
    
    cx.set = function (operator, fn) {
        library[operator] = fn;
    };

    cx.parent = function () {
        return parent;
    };
    
    return cx;
}

module.exports = {
    evaluate : evaluate,
    context  : context
};
