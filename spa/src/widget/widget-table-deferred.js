/**
 * Created by leon on 2016/9/18.
 */
define(function (require, exports, module) {
    require('widget-jsgrid')
    var esdate = require("../../widget/date")
    var esgeo = require("../../widget/geo-echo")
    var esselect2 = require("../../widget/select2")
    var DateField = function (config) {
        jsGrid.Field.call(this, config)
    }
    var GeoField = function (config) {
        jsGrid.Field.call(this, config)
    }
    var Select2Field = function (config) {
        jsGrid.Field.call(this, config)
    }

    DateField.prototype = new jsGrid.Field({
        sorter: function (date1, date2) {
            return new Date(date1) - new Date(date2)
        },
        itemTemplate: function (value) {
            return moment(value).format('YYYY-MM-DD')
        },
        insertTemplate: function (value) {
            value = moment(value).format('YYYY-MM-DD')
            var date = esdate({
                el: $("<input>").val(value)
            })
            return this._insertPicker = date.el
        },
        editTemplate: function (value) {
            value = moment(value).format('YYYY-MM-DD')
            var date = esdate({
                el: $("<input>").val(value)
            })
            return this._editPicker = date.el
        },

        insertValue: function () {
            return moment(this._insertPicker[0].value).toDate()
        },

        editValue: function () {
            return moment(this._editPicker[0].value).toDate()
        }
    })

    GeoField.prototype = new jsGrid.Field({
        itemTemplate: function (value) {
            switch (Object.prototype.toString.call(value)) {
                case '[object Object]':
                    return value.display
                default:
                    return value ? JSON.parse(value).display : ''
            }
        },
        insertTemplate: function (value) {
            this.geo = {}
            return this._doTemplate(value,'insert')
        },
        insertValue: function () {
            return this._doValue('insert')
        },
        editTemplate: function (value) {
            return this._doTemplate(value,'edit')
        },
        editValue: function () {
            return this._doValue('edit')
        },
        _doValue: function (diff) {
            return {
                display: this.geo[diff].el.val(),
                value: this.geo[diff].el.data('value') || ''
            }
        },
        _doTemplate: function (value, diff) {
            var obj
            if (Object.prototype.toString.call(value) == '[object Object]') {
                obj = value
            } else {
                obj = value ? JSON.parse(value) : ''
            }

            this.geo[diff] = esgeo({el: $("<input class='geo'>")})
            if (obj && Object.prototype.toString.call(obj) == '[object Object]') {
                var display = obj.display || ''
                var value = obj.value || ''
                this.geo[diff].displayValue = display.split('-')
                this.geo[diff].value = value
                this.geo[diff].el.val(display)
                this.geo[diff].el.data('value', value)
            }
            return this.geo[diff].el
        }
    })

    Select2Field.prototype = new jsGrid.Field({
        _toArray: function (value) {
            if (Object.prototype.toString.call(value) == '[object String]') value = value.split(',')
            return value
        },
        itemTemplate: function (value) {
            if (value) {
                value = this._toArray(value)
                var result = []
                var items = this.items
                _(value || []).each(function (v) {
                    _(items).each(function (item) {
                        if (String(v) == String(item.v))result.push(item.d)
                    })
                })
                return result.join(', ')
            }
            return ''
        },
        insertTemplate: function (value) {
            this.select2 = {}
            return this._doTemplate(value, 'insert')
        },
        editTemplate: function (value) {
            return this._doTemplate(value, 'edit')
        },
        insertValue: function () {
            return this._doValue('insert')
        },
        editValue: function () {
            return this._doValue('edit')
        },
        _doValue: function (diff) {
            return this.select2[diff].getValue() ? this.select2[diff].getValue().join(',') : ''
        },
        _doTemplate: function (value, diff) {
            value = this._toArray(value)
            var $dom = $('<div class="table-selector2"><select></select></div>')
            _(this.items).each(function (item) {
                $dom.find('select').append('<option value="' + item.v + '">' + item.d + '</option>')
            })
            this.select2[diff] = esselect2({el: $dom.find('select'), data: this.items, isMultiple: true})
            if (value) this.select2[diff].setValue(value)
            return $dom
        }
    })

    jsGrid.fields.date = DateField
    jsGrid.fields.geo = GeoField
    jsGrid.fields.select2 = Select2Field

    /*   $('body').on('click','.jsgrid-cell', function (e){
     console.log(this.innerHTML)
     });*/
    // jsGrid.fields.geo = DateField
    return jsGrid
})
