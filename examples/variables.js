
var lire = require('..')

var ctx = lire.context({
    '+': function (a, b) {
        return a + b
    },
    '-': function (a, b) {
        return a - b
    },
    ':let': function (args, evaluate, ctx) {
        var assignments  = args[0],
            body         = args.slice(1);

        for(var i = 0, scope = {}; i < assignments.length; i++) scope[assignments[i][0]] = evaluate(assignments[i][1], ctx)

        var actx = lire.context(scope, ctx)
        
        for(var j = 0, rv; j < body.length; j++) rv = evaluate(body[j], actx)
        return rv
    },
    ':get': function (args, evaluate, ctx) {
        return ctx(args[0])
    }
})


console.log(lire.evaluate([':let', [['a', 4], ['b', 5]], ['+', [':get', 'a'], [':get', 'b']]], ctx))