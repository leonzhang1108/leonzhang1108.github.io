/**
 * Created by leon on 2016/8/17.
 */
define(function (require, exports, module) {
    var geo = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'geo',
            displayValue: [],
            value: '',
            nonempty: true,
            _loadChildItem: function (id) {
                //do ajax
                console.log('do ajax: '+id)
                var template = Handlebars.compile($('#geo-items').html())
                return template(window.esapp.demoGeo[id] || [])
            },
            _renderCurrentDisplay: function () {
                $('.modal-title').html(this.displayValue.join(' - '))
            },
            _bindClickEvt: function () {
                var scope = this
                //item点击
                $('#tabContent').delegate('.geo-item', 'click', function () {
                    var isChosen = $(this).hasClass('geo-item-chosen')
                    var index = $('#tab .active').index()
                    scope.value = $(this).data('value')
                    scope.displayValue[index] = this.innerHTML
                    if(!isChosen) scope.displayValue = scope.displayValue.slice(0, index + 1)
                    $(this).siblings().removeClass('geo-item-chosen')
                    $(this).addClass('geo-item-chosen')
                    var $next = $('#tab').find('.active').next()
                    if ($next.length) {
                        $next.children().click()
                        if(!isChosen){
                            $('#tabContent .tab-pane')[$('#tab .active').index()].innerHTML = scope._loadChildItem(scope.value)
                            $($('#tabContent').find('.tab-pane')[$('#tab').find('.active').index()]).nextAll().html('')
                        }
                    } else {
                        scope.setDisplayValue(scope.displayValue.join('-'))
                        scope.setValue(scope.value)
                        scope.validate()
                        $('#es-modal').modal('hide')
                    }
                    scope._renderCurrentDisplay()
                })
            },
            getValue: function () {
                return this.el.data('value')
            },
            setValue: function (value) {
                this.el.data('value', value)
            },
            setDisplayValue: function (value) {
                this.el.val(value)
            },
            getDisplayValue: function () {
                return this.displayValue.join('-')
            },
            clearValue: function(){
                this.el.val('')
                this.el.data('value','')
                this.validate()
            },
            init: function () {
                var scope = this
                this.defaultInit()
                this.bindValidation()
                this.defaultChangeEvt()

                this.el.on('focus', function () {
                    scope.displayValue = []
                    scope.value = ''
                    _.initConfirm({
                        label: 'geo-demo',
                        width: '600px',
                        content: Handlebars.compile($('#geo-tab-template').html()),
                        beforeShow: function () {
                            scope._bindClickEvt.call(scope)
                        },
                        success: function () {
                            scope.setDisplayValue(scope.displayValue.join('-'))
                            scope.setValue(scope.value)
                            return scope.validate()
                        },
                        fail: function () {
                            console.log('fail')
                        }
                    })
                })
                return this
            }
        }, config)
        return opt.init()
    }
    return geo
})
