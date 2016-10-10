define(function (require, exports, module) {
    var input = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'form',
            items: [],
            init: function () {
                this.el = $('#' + this.id)
                return this
            },
            getName: function () {
                return this.name
            },
            getId: function () {
                return this.id
            },
            show: function () {
            },
            hide: function () {
            },
            enable: function () {
            },
            disable: function () {
            },
            setReadonly: function (readonly) {
            },
            getValue: function () {
                var obj = {}
                _(this.items).each(function (item) {
                    obj[item.el.attr('name') || item.id] = item.getValue()
                })
                return obj
            },
            setValue: function (obj) {
                _(this.items).each(function (item) {
                    item.setValue(obj[item.el.attr('name') || item.id])
                })
            },
            showErrorMsg: function (msg) {
            },
            hideErrorMsg: function () {
            },
            showWarningMsg: function (msg) {
            },
            hideWarningMsg: function () {
            },
            showInfoMsg: function (msg) {
            },
            hideInfoMsg: function () {
            },
            showSuccessMsg: function (msg) {
            },
            hideSuccessMsg: function () {
            },
            clearError: function () {
            },
            clearValue: function (allowBlank) {
                _(this.items).each(function (item) {
                    item.clearValue()
                })
            },
            validate: function () {
                var res = true
                _(this.items).each(function (item) {
                    return res = item.validate() && res
                })
                return res
            },
            clearInvalid: function () {
            },
            setNonempty: function () {
            }
        }, config)
        return opt.init()
    }
    return input
})
