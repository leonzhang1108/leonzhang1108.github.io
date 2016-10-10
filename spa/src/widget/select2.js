/**
 * Created by leon on 2016/8/24.
 */
define(function (require, exports, module) {
    var select2 = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'select2',
            init: function () {
                this.defaultInit()
                this.bindValidation()
                this.defaultChangeEvt()
                if (this.isMultiple) this.el.attr('multiple', 'multiple')
                this.el.select2({
                    tags: this.creatable,                                     //多选时可编辑选项
                    maximumSelectionLength: this.maxLength || Infinity,     //多选时最大宽度
                    tokenSeparators: this.tokenSeparators,                     //多选时自定义终止符
                    minimumResultsForSearch: this.hideFilter ? Infinity : ''  //下拉是否需要过滤
                })
                this.el.val(null).trigger('change')
                return this
            },
            setValue: function (value) {
                if (this.isMultiple) {
                    if (!value || !value.length) return
                } else {
                    if (!value) return
                }
                this.el.val(value).trigger('change')
            }
        }, config)
        return opt.init()
    }
    return select2
})
