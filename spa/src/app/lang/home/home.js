define(function () {
    var scope = {}
    scope.init = function () {
        console.log(this)
        this.foo()
    }
    scope.foo = function () {
        console.log('foo')
    }
    return scope
})