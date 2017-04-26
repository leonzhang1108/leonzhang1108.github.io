/**
 * Created by leon on 2016/7/29.
 */
define(function (require, exports, module) {


    var widgetDefine = {}

    widgetDefine.init = function (config) {
        return wrapWidget(config).then(function (res) {
            return res
        }, function (err) {
            console.log(err)
        })
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function wrapWidget(config) {
        var tagName = document.querySelector("#" + config.id).tagName.toLowerCase()
        if (!tagName.split('-')[1]) return
        var widgetName = tagName.split('-')[1]
        var id = 'es-' + getRandomInt(1, 10000)
        var dom = document.querySelector("#" + config.id)
        dom.id = id
        config.id = id
        var el = $(dom)
        var template = Handlebars.compile($('#' + tagName).html())
        var html = template(_.merge(config, {
            key: el.attr('name') || ''
        }))
        el.after(html).remove()

        //Form
        if (config.items) {
            var innerHTML = []
            var promises = []
            _(el.children()).each(function (item) {
                innerHTML.push(item.outerHTML)
            })

            $('#' + config.id).html(innerHTML.join(''))
            _(el.children()).each(function (item, index) {
                if ('es' == item.tagName.toLowerCase().split('-')[0]) {
                    promises.push(widgetDefine.init(_.merge(config.items[index], {
                        id: $(item.outerHTML).attr('id')
                    })))
                }
            })
            Promise.all(promises).then(function (items) {
                _(items).each(function (item, index) {
                    config.items[index] = item
                })
            })
        }
        return new Promise(function (resolve, reject) {
            if (widgetName) {
                require(['../../widget/'+widgetName], function (widget) {
                    resolve(widget(config))
                })
            } else {
                reject("error")
            }
        })
    }

    return widgetDefine
})
