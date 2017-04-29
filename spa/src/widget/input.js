define(function (require, exports, module) {
    var input = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'input'
        }, config)
        return opt.init()
    }
    return input
})
