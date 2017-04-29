/**
 * Created by leon on 2016/8/8.
 */
define(function (require, exports, module) {

    var widgetDefine = {}
    
    function getWidget(conf) {
        var tagName = document.querySelector("#" + conf.id).tagName.toLowerCase()
        var separateTagName = tagName.split('-')
        if (separateTagName[0] != 'es') return null
        var widgetName = separateTagName.slice(1).join('-')
        var esId = 'es-' + _.getRandomId(1, 999999999)
        var dom = document.querySelector("#" + conf.id)
        dom.id = conf.id = esId
        var el = $(dom)
        var template = Handlebars.compile($('#' + tagName).html())
        var html = template(_.merge(conf, {
            key: el.attr('name') || '',
            cls: el.attr('class') || ''
        }))
        el.after(html).remove()
        return {
            widgetName: '../../widget/' + widgetName,
            el: el
        }
    }
    
    widgetDefine.initBtn = function (config) {
        var dtd = $.Deferred()
        require(['../../widget/button'], function (widget) {
            dtd.resolve(widget(config))
        })
        return dtd
    }

    widgetDefine.init = function (config) {
        var dtd = $.Deferred()
        var requireList = []
        var obj = getWidget(config)
        requireList.push(obj.widgetName)

        //Form
        if (config.items) {
            _(obj.el.children()).each(function (item, index) {
                $('#' + config.id).before(item.outerHTML)
                if (item.tagName.toLowerCase().split('-')[0] == 'es') {
                    var obj = getWidget(_.merge(config.items[index], {
                        id: $(item.outerHTML).attr('id')
                    }))
                    if (obj) requireList.push(obj.widgetName)
                }
            })
        }
        require(requireList, function () {
            var para = _.realArray(arguments)
            var form = para[0]
            var widgetForm = form(config)
            var subWidgetList = para.slice(1)
            _(subWidgetList).each(function (widget, index) {
                widgetForm.items[index] = widget(config.items[index])
                widgetForm.items[index].setWidth(config.items[index].width)
            })
            if (config.defaultValue) widgetForm.setValue(config.defaultValue)
            widgetForm.setWidth(config.width)
            dtd.resolve(widgetForm)
        })

        return dtd
    }

    return widgetDefine
})
