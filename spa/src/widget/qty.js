/**
 * Created by leon on 2016/8/8.
 */
define(function (require, exports, module) {
    var qty = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'qty',
            init: function () {
                this.defaultInit()
                this.defaultChangeEvt()
                var res = this.bindValidation()

                //绑定加减按钮
                this.el.parent().find('.minus').on('click', function () {
                    var input = $(this).parent().find('.qty')
                    var num = Number(input.val()) - 1
                    input.val(num > 0 ? num : 1)
                    res.validate.call(res.scope)
                })
                this.el.parent().find('.plus').on('click', function () {
                    var input = $(this).parent().find('.qty')
                    input.val(Number(input.val()) + 1)
                    res.validate.call(res.scope)
                })

                return this
            }
        }, config)
        return opt.init()
    }
    return qty
})
