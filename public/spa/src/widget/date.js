define(function (require, exports, module) {
    var date = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'date',
            init: function () {
                this.defaultInit()
                if(this.el){
                    this.el.bootstrapMaterialDatePicker(config)
                }else{
                    this.el.bootstrapMaterialDatePicker(config)
                }
                return this
            }
        }, config)
        return opt.init()
    }
    return date
})
