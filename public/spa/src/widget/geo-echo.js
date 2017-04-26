/**
 * Created by leon on 2016/8/17.
 */
define(function (require, exports, module) {
    var geoEcho = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'geo-echo',
            displayValue: [],
            tabTitles: ['国家', '省份', '城市', '区县', '乡镇'],
            initId: undefined,
            value: [],
            orderList: [{label: 'A-G', value: 'ABCDEFG'}, {label: 'H-K', value: 'HIJK'}, {label: 'L-S', value: 'LMNOPQRS'}, {label: 'T-Z', value: 'TUVWXYZ'}, {label: '*', value: '*'}],
            _frameTemplate: Handlebars.compile($('#geo-tab-template').html()),
            _itemTemplate: Handlebars.compile($('#geo-items').html()),
            _orderedTemplate: Handlebars.compile($('#geo-ordered').html()),
            _allItems: {},
            nonempty: false,
            _setLoadingHTML: function (config) {
                if($('#tabContent .tab-pane')[config.index]) $('#tabContent .tab-pane')[config.index].innerHTML = 'loading...'
            },
            _setItemHTML: function (config) {
                var html = ''
                var $index = $('#tabContent .tab-pane')[config.index]
                if (config.list.length > 0) {
                    if (navigator.language.toLowerCase() == 'zh-cn' && this.orderList ) {
                        var scope = this
                        var resObj = {}
                        var htmlList = []
                        var orderedList = _.pySegSort(config.list, true, 'name')
                        _(this.orderList).each(function (order) {
                            _(orderedList).each(function (item) {
                                if (order.value.indexOf(item.letter.toUpperCase()) >= 0) {
                                    if (resObj[order.label]) {
                                        resObj[order.label] = resObj[order.label].concat(item.data)
                                    } else {
                                        resObj[order.label] = item.data
                                    }
                                }
                            })
                        })
                        _.forEach(resObj, function(item, key) {
                            if (item.length) {
                                htmlList.push({
                                    orderLabel: key,
                                    orderHTML: scope._itemTemplate(item)
                                })
                            }
                        })
                        html = this._orderedTemplate(htmlList)
                    } else {
                        html = this._itemTemplate(config.list)
                    }
                } else {
                    html = 'nothing'
                }
                if($index) $index.innerHTML = html
            },
            _initDefaultGeoItems: function () {
                var value = [this.initId].concat(this.value)
                var scope = this
                var dtd = $.Deferred()
                var count = 0
                var length = value.length
                _(value).each(function (item, index) {
                    scope._setLoadingHTML.call(scope, {index: index})
                    scope._loadChildItem(item).done(function (list) {
                        count++
                        scope._setItemHTML.call(scope, {
                            index: index,
                            list: list
                        })
                        if (length == count) dtd.resolve()
                    })
                })
                return dtd
            },
            _getFrameHTML: function () {
                var tabs = []
                _(this.tabTitles).each(function (item, index) {
                    tabs.push({
                        name: item,
                        id: 'es-tab-' + index
                    })
                })
                return this._frameTemplate(tabs)
            },
            _initBindClass: function () {
                _(this.value).each(function (item, index) {
                    _($('#tabContent .tab-pane:eq(' + index + ')').find('.geo-item')).each(function (div) {
                        if ($(div).data('value') == item) $(div).addClass('geo-item-chosen')
                    })
                })
                $('#tab .tab-item:eq(' + ((this.value.length > 0) ? (this.value.length - 1) : 0) + ') a').click()
                _.resizeModal('#es-geo-modal')
            },
            _loadChildItem: function (id) {
                //do ajax
                var dtd = $.Deferred()
                var scope = this
                console.log('do ajax: ' + id)
                setTimeout(function () {
                    console.log('ajax done: ' + id)
                    var list = window.esapp.demoGeo[id || scope.initId] || []
                    _(list).each(function (item) {
                        scope._allItems[item.name] = item.id
                    })
                    list.sort(function (a, b) {
                        return a.name.localeCompare(b.name)
                    })
                    dtd.resolve(list)
                }, _.getRandomNumber(300, 400))
                return dtd
            },
            _renderCurrentDisplay: function () {
                if (this.displayValue.length) $('#es-geo-modal .modal-title').html(this.displayValue.join(' - '))
            },
            _bindClickEvt: function () {
                var scope = this
                //item点击
                $('#tabContent').delegate('.geo-item', 'click', function () {
                    var isChosen = $(this).hasClass('geo-item-chosen')
                    var index = $('#tab .active').index()
                    if(scope.value == '') scope.value = []
                    scope.value[index] = $(this).data('value')
                    scope.displayValue[index] = this.innerHTML
                    if (!isChosen) {
                        scope.displayValue = scope.displayValue.slice(0, index + 1)
                        scope.value = scope.value.slice(0, index + 1)
                    }
                    $(this).parents('.tab-pane').find('.geo-item').removeClass('geo-item-chosen')
                    $(this).addClass('geo-item-chosen')
                    var $next = $('#tab').find('.active').next()
                    if ($next.length) {
                        $next.children().click()
                        if (!isChosen) {
                            var index = $('#tab .active').index()
                            $('#tabContent .tab-pane')[index].innerHTML = ''
                            scope._setLoadingHTML.call(scope, {index: index})
                            scope._loadChildItem(scope.value[index - 1]).done(function (list) {
                                scope._setItemHTML.call(scope, {
                                    index: index,
                                    list: list
                                })
                                $('#tabContent').find('.tab-pane:eq(' + $('#tab').find('.active').index() + ')').nextAll().html('')
                            })
                        }
                    } else {
                        scope._setDisplayAndValue.call(scope)
                        scope.validate()
                        $('#es-geo-modal').modal('hide')
                    }
                    scope._renderCurrentDisplay()
                    scope._validateEmpty()
                })
            },
            _setDisplayAndValue: function () {
                this.setDisplayValue(this.displayValue.join('-'))
                this.setValue(this.value)
                this._validateEmpty()
                return this.value.length != 0
            },
            _validateEmpty: function(){
                if(this.value.length == 0){
                    $('#es-geo-modal .popup-error-msg').html('isEmpty')
                } else {
                    $('#es-geo-modal .popup-error-msg').html('')
                }
            },
            getValue: function () {
                return this.el.data('value') || []
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
            clearValue: function () {
                this.value = []
                this.displayValue = []
                this.el.val('')
                this.el.data('value', '')
                this.validate()
            },
            init: function () {

                var scope = this
                this.defaultInit()
                this.bindValidation()
                this.defaultChangeEvt()

                this.el.on('focus', function () {
                    _.initConfirm({
                        id: 'es-geo-modal',
                        labelId: 'es-geo-modal-label',
                        label: 'geo-demo',
                        width: '600px',
                        content: scope._getFrameHTML(),
                        beforeShow: function () {
                            scope._bindClickEvt.call(scope)
                            $('#es-geo-modal .popup-error-msg').html('')
                        },
                        success: function () {
                            return scope.validate() && scope._setDisplayAndValue.call(scope)
                        },
                        fail: function () {
                            var displayValue = scope.el.val() ? scope.el.val().split('-') : []
                            scope.displayValue = displayValue
                            scope.value = []
                            _(displayValue).each(function (item) {
                                scope.value.push(scope._allItems[item])
                            })
                            scope._setDisplayAndValue.call(scope)
                            console.log('cancel')
                        }
                    })

                    // 初始化数据
                    scope._renderCurrentDisplay()
                    scope._initDefaultGeoItems().done(function () {
                        console.log('ajax all done')
                        scope._initBindClass.call(scope)
                    })
                })
                return this
            }
        }, config)
        return opt.init()
    }
    return geoEcho
})
