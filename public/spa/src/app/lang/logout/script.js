define(function(require, exports, module) {
    var scope = {}
    scope.init = function() {
        console.log(this)
        this.foo()
    }
    scope.foo = function() {
        console.log('foo')
    }

    var ace = require("../../../module/script");
    console.log(ace.getName());

    return scope
})
