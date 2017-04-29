define(function (require, exports, module) {
    var selector = function (config) {
        var opt = _.clone(esapp.ui.defaultConfig)
        _.merge(opt, {
            name: 'selector',
            mustMatch: true
        }, config)

        opt._data = []
        _.each(config.data, function (value, key) {
            if (_.isString(value)) {
                opt._data.push({
                    d: value,
                    v: value
                })
            } else if (_.isArray(value)) {
                opt._data.push({
                    d: value[0],
                    v: value[1]
                })
            } else {
                opt._data.push({
                    d: value.d,
                    v: value.v
                })
            }
        })

        opt.matcher = function (q, cb) {
            var matches = this._findMatchesDisplay(q)
            cb(matches)
        }
        opt._findMatchesDisplay = function (q) {
            var matches = []
            _.each(this._data, function (value, key) {
                if (value.d.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
                    matches.push(value.d)
                }
            })
            return matches
        }
        opt._findMatches = function (q) {
            var matches = []
            _.each(this._data, function (value, key) {
                if (value.d.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
                    matches.push(value)
                }
            })
            return matches
        }
        opt._findValueMatches = function (val) {
            var matches = []
            _.each(this._data, function (value, key) {
                if (value.v == val) {
                    matches.push(value)
                }
            })
            return matches
        }
        opt.getValue = function () {
            var val = this.el.typeahead('val')
            var matches = this._findMatches(val)
            if (matches.length > 0) {
                return matches[0].v
            }
            return null
        }
        opt.getDisplayValue = function(){
            return this.el.typeahead('val')
        }
        opt.setValue = function (val) {
            val = this._findValueMatches(val)
            if (val.length > 0) {
                this.el.typeahead('val', val[0].d)
            }
        }
        opt.clearValue = function () {
            this.el.typeahead('val', '');
        }
        opt._closeHandler = function (e) {
            var val = this.getValue()
            if (!val && this.mustMatch) {
                this.clearValue()
            } else if(this.mustMatch) {
                this.setValue(val)
            }
        }
        opt.setBlank = function(){
            this.clearValue()
        }
        opt.validate = function () {
            if(this.getValue().trim()){
                this.el.parent().find('.alert').hide()
            } else {
                this.el.parent().find('.alert').show()
            }
        }
        opt.setList = function (list) {
        }
        opt.appendList = function (list) {
        }
        opt.prependList = function (list) {
        }

        opt.el = $('#'+config.id)
        opt.el.typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                limit: 9999,
                name: config.id,
                source: _.delegate(opt.matcher, opt)
            }
        )
        if(config.defaultValue){
            opt.setValue(config.defaultValue)
        }

        opt.el.bind('typeahead:close', _.delegate(opt._closeHandler, opt))
        return opt
    }
    return selector
})
