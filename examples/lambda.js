
var lire = require('..')

var ctx = lire.context({
    '+': function (a, b) {
        return a + b
    },
    '-': function (a, b) {
        return a - b
    },
    ':lambda': function (args, evaluate, ctx) {
        var parameters = args[0],
            body       = args.slice(1);

        return function () {
            for(var i = 0, scope = {}; i < parameters.length; i++) scope[parameters[i]] = evaluate(arguments[i], ctx)

            var actx = lire.context(scope, ctx)

            for(var j = 0, rv; j < body.length; j++) rv = evaluate(body[j], actx)

            return rv
        }
    },
    ':define': function (args, evaluate, ctx) {
        var name  = evaluate(args[0], ctx),
            value = evaluate(args[1], ctx);

        ctx.set(name, value)
        return name
    },
    ':do': function (args, evaluate, ctx) {
        for(var i = 0, rv; i < args.length; i++) rv = evaluate(args[i], ctx)
        
        return rv
    }
})

console.log(lire.evaluate([':do', [':define', 'x', [':lambda', ['a'], ['+', 4, 5]]], ['x']], ctx))

