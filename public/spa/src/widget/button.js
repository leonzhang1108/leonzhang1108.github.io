/**
 * Created by leon on 2016/8/4.
 */
define(function (require, exports, module) {

    var button = function (config) {
        var opt = {}
        _.merge(opt, {
            name: 'button',
            id: null,
            el: null,
            click: function(){
                this.el.click()
            },
            init: function(){
                var dom = document.querySelector("#" + config.id)
                var esId = 'es-' + _.getRandomId(1, 999999999)
                dom.id = this.id = esId
                this.el = $(dom)
                this.el.append(dom)
                if(config.onclick){
                    this.el.on('click', config.onclick)
                }
                return this
            }
        }, config)
        return opt.init()
    }
    return button
})