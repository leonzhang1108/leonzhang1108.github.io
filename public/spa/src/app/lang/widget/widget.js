define(function () {

    var scope = {}
    scope.init = function () {
        require(['widget-define'], function (widgetDefine) {

            var widgetScope = {}

            var scope_function = function () {

                var demoData = [
                    {
                        d: 'bella', v: '2'
                    }, {
                        d: 'bello', v: '1'
                    }, {
                        d: 'belle', v: '3'
                    }, {
                        d: 'belli', v: '4'
                    }, {
                        d: 'bellu', v: '5'
                    }, {
                        d: 'bellv', v: '6'
                    }]

                //初始化 输入框
                widgetDefine.init({
                    id: "first-demo",
                    label: '输入框',
                    //nonempty: true,
                    validations: ['isEmail'],
                    defaultValue: 'humanm',
                    width: '25%'
                }).done(function (ui) {
                    widgetScope.input = ui
                })

                //初始化qty
                widgetDefine.init({
                    id: "qty-demo",
                    placeholder: 'qty',
                    defaultValue: 12,
                    //nonempty: true,
                    validations: ['isNatureNumber', 'isMobile'],
                    width: '25%'
                }).done(function (ui) {
                    widgetScope.qty = ui
                })

                //初始化geo
                widgetDefine.init({
                    id: "geo-demo",
                    label: 'geo',
                    //nonempty: true,
                    width: '25%'
                }).done(function (ui) {
                    widgetScope.geo = ui
                })

                //初始化select2
                widgetDefine.init({
                    id: "select2-demo",
                    label: 'select2',
                    data: demoData,
                    width: '25%'
                }).done(function (ui) {
                    widgetScope.select2 = ui
                })

                //初始化date
                widgetDefine.init({
                    id: "date-demo",
                    label: 'date',
                    width: '25%'
                }).done(function (ui) {
                    widgetScope.select2 = ui
                })

                //初始化selector
                widgetDefine.init({
                    id: "selector-demo",
                    label: '下拉框',
                    mustMatch: true,
                    placeholder: 'bell',
                    data: demoData,
                    defaultValue: 3,
                    width: '25%'
                }).done(function (ui) {
                    widgetScope.selector = ui
                })

                //初始化 表单
                widgetDefine.init({
                    id: "form-demo",
                    defaultValue: {
                        'input-in-form': '871162172@qq.com',
                        'selector-in-form': 4,
                        'qty-in-form': 3,
                        'select2-in-form': ['1']
                    },
                    items: [{
                        label: 'form输入框',
                        nonempty: true,
                        validations: ['isEmail'],
                        width: '25%'
                    }, {
                        placeholder: 'qty',
                        nonempty: true,
                        validations: ['isNatureNumber', 'isMobile'],
                        width: '25%'
                    }, {
                        label: 'geo',
                        width: '25%'
                    }, {
                        label: 'select2',
                        data: demoData,
                        width: '25%',
                        isMultiple: true,
                        // maxLength: 2,
                        creatable: true
                    }, {
                        label: 'date',
                        width: '25%'
                    }, {
                        label: 'form下拉框',
                        mustMatch: false,
                        placeholder: 'bell',
                        data: demoData,
                        width: '25%'
                    }]
                }).done(function (ui) {
                    widgetScope.form = ui
                })

                //清空按钮
                widgetDefine.initBtn({
                    id: 'reset',
                    onclick: function () {
                        widgetScope.form.clearValue()
                    }
                }).done(function (ui) {
                    widgetScope.resetBtn = ui
                })

                //提交按钮
                widgetDefine.initBtn({
                    id: 'submit',
                    onclick: function () {
                        widgetScope.form.validate()
                        console.log(widgetScope.form.getValue())
                    }
                }).done(function (ui) {
                    widgetScope.submitBtn = ui
                })


                //模态框
                widgetDefine.initBtn({
                    id: 'alert',
                    onclick: function () {
                        widgetScope.initConfirm()
                    }
                }).done(function (ui) {
                    widgetScope.alert = ui
                })
                
                this.initConfirm = function () {
                    _.initConfirm({
                        label: 'confirm-demo',
                        width: '600px',
                        content: Handlebars.compile($('#confirm-demo').html()),
                        beforeShow: function () {
                            widgetScope.confirmBeforeShow()
                        },
                        success: function () {
                            return widgetScope.confirmForm.validate()
                        },
                        fail: function () {
                            console.log('fail')
                        }
                    })
                }
                
                this.confirmBeforeShow = function () {
                    widgetDefine.init({
                        id: "confirm-form-demo",
                        defaultValue: {
                            'first-input': '871162172@qq.com',
                            'first-qty': 4
                        },
                        items: [{
                            label: 'form输入框',
                            nonempty: true,
                            validations: ['isEmail'],
                            width: '50%',
                            isPopup: true
                        }, {
                            placeholder: 'qty',
                            nonempty: true,
                            validations: ['isNatureNumber'],
                            width: '50%',
                            isPopup: true
                        }, {
                            label: 'geo',
                            width: '50%'
                        }, {
                            label: 'date',
                            width: '50%'
                        }]
                    }).done(function (ui) {
                        widgetScope.confirmForm = ui
                    })
                }
            }

            scope_function.call(widgetScope)




            function getOffset(element)  {
                var doc = element.ownerDocument,
                    docElem = doc.documentElement,
                    body = doc.body,
                    clientTop  = docElem.clientTop  || body.clientTop  || 0,
                    clientLeft = docElem.clientLeft || body.clientLeft || 0,
                    scrollTop  = window.pageYOffset,
                    scrollLeft = window.pageXOffset

                return { top : scrollTop  - clientTop, left: scrollLeft - clientLeft }
            }
            function main() {

                var text = 'so no one told you life was gonna be this way',
                    container = document.querySelector('#container'),
                    mousemove = Rx.Observable.fromEvent(document, 'mousemove')

                // Get the offset on mousemove from the container
                var mouseMoveOffset = mousemove.map(function (e) {
                    var offset = getOffset(container)
                    return {
                        offsetX : e.clientX - offset.left + document.documentElement.scrollLeft,
                        offsetY : e.clientY - offset.top + document.documentElement.scrollTop
                    }
                })

                Rx.Observable.from(text).flatMap(
                    function (letter, i) {
                        // Add an element for each letter
                        var s = document.createElement('span')
                        s.innerHTML = letter
                        s.style.position = 'absolute'
                        container.appendChild(s)

                        // move each letter with a delay based upon overall position
                        return mouseMoveOffset.delay(i * 100).map(function (pos) {
                            return { pos: pos, element: s, index: i }
                        })
                    })
                    .subscribe(function (data) {
                        data.element.style.top = data.pos.offsetY + 'px'
                        data.element.style.left = data.pos.offsetX + data.index * 10 + 15 + 'px'
                    })
            }
            //main()


        })
    }
    return scope
})