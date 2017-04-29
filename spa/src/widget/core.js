// define(function () {
// })

// init ui namespace
window.esapp.ui = {}
window.esapp.ui.defaultConfig = {
    name: '',
    allowBlank: true,
    charMask: '',
    disabled: false,
    readonly: true,
    id: null,
    el: null,
    customerValidate: [],

    defaultInit: function () {
        if(!this.el) this.el = $('#' + this.id)
        if (this.defaultValue) {
            this.setValue(this.defaultValue)
        }
    },
    bindValidation: function () {
        //根据参数挂上需要验证的方法
        var allValidate = []
        var validationList = this.validations || []
        if (this.nonempty) validationList.unshift('isEmpty')
        _(validationList || []).each(function (item) {
            allValidate.push(window.esapp.validation(item))
        })
        this.customerValidate = allValidate
        //绑定即使验证
        var validate = this.validate
        var scope = this
        this.el.on('input', function () {
            validate.call(scope)
        })
        return {
            validate: validate,
            scope: scope
        }
    },
    defaultChangeEvt: function () {
        //只能输入数字
        if (this.el.hasClass('number')) {
            var el = this.el
            this.get_value = function () {
                var v = el.val()
                return $.isNumeric(v) ? +v : 0
            }
            el.on('change', function () {
                var v = $(this).val()
                if (!$.isNumeric(v)) {
                    v = parseFloat(v)
                    if (!v) {
                        v = ""
                    }
                    $(this).val(v)
                }
            })
            el.on('input', function (e) {
                el.change()
            })
        }
    },
    init: function () {
        this.defaultInit()
        this.bindValidation()
        this.defaultChangeEvt()
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
        this.el.prop('disabled', false)
    },
    disable: function () {
        this.el.prop('disabled', true)
    },
    setReadonly: function (readonly) {
    },
    getValue: function () {
        return this.el.val()
    },
    setValue: function (value) {
        if (!value) return
        this.el.val(value)
        this.validate()
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
        this.hideInfoMsg()
        this.el.closest('.form-group').addClass('has-error')
        if (this.isPopup) {
            this.el.closest('.modal-content').find('.popup-error-msg').html(msg)
        } else {
            var template = Handlebars.compile($('#msg-alert').html())
            this.el.parent().after(template({msg: msg}))
        }
    },
    hideInfoMsg: function () {
        if (this.isPopup) {
            this.el.closest('.modal-content').find('.form-group').removeClass('has-error')
            this.el.closest('.modal-content').find('.popup-error-msg').html('')
        } else {
            this.el.closest('.form-group').removeClass('has-error')
            this.el.parent().siblings('.help-block').remove()
        }
    },
    showSuccessMsg: function (msg) {
    },
    hideSuccessMsg: function () {
    },
    clearError: function () {
    },
    clearValue: function (allowBlank) {
        this.el.val('')
        this.validate()
    },
    _singleValidate: function (msg) {
        var allValidate = true
        for (var i = 0; i < this.customerValidate.length; i++) {
            var res = this.customerValidate[i].validate(msg)
            if (!res) {
                this.showInfoMsg(this.customerValidate[i].name)
                allValidate = false
                break
            } else {
                this.hideInfoMsg()
            }
        }
        return allValidate
    },
    validate: function () {
        var value = this.getValue()
        var scope = this
        switch (Object.prototype.toString.call(value)) {
            case '[object Array]':
                var result = true
                if(value.length){
                    _(value).each(function (item) {
                        result = result && scope._singleValidate.call(scope, item)
                    })
                } else {
                    result = result && scope._singleValidate.call(scope, value[0])
                }

                return result
                break
            case '[object String]':
                return scope._singleValidate(value.trim())
                break
            default: 
                return true
        }
    },
    clearInvalid: function () {

    },
    setNonempty: function () {

    },
    setWidth: function (width) {
        this.el.closest('.form-group').css({
            width: width || '33%',
            float: 'left'
        })
    }
}

window.esapp.validation = function (validationName) {
    var res = {
        name: validationName
    }
    if ('isEmpty' == validationName) {
        res.validate = function (str) {
            switch (Object.prototype.toString.call(str)) {
                case '[object Number]':
                    return str
                case '[object String]':
                    return str.trim() ? true : false
                case '[object Undefined]':
                    return false
                default:
                    return true
            }
        }
    } else {
        res.validate = function (str) {
            var isLegal = true
            var reg = window.esapp.regular[validationName]
            if (str.trim()) {
                isLegal = reg.test(str)
            }
            return isLegal
        }
    }
    return res
}

window.esapp.regular = {
    isEmail: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    isPhone: /^(\d{3,4}-)?\d{6,8}(-\d{3})?$/,
    isMobile: /^\S*(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|6|8|9]|14[5|7]|17[0|6|7|8]|18[1|2|3|4|5]|187)\d{8}$/,
    isNatureNumber: /^[0-9]*[1-9][0-9]*$/,
    isFloatNumThree: /^[0-9]*.[0-9]{3}$/,
    isFloatNumTwo: /^[0-9]*.[0-9]{2}$/,
    isIDCardNumber: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
    isPlateNumber: /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/,
    isPassword: /^[\s\S]{6,20}$/,
    isZipCode: /^[1-9][0-9]{5}$/,
    exceptChinese: /^[^\u4e00-\u9fa5]*$/,
    english: /^([A-Za-z0-9 ,.']+\s?)*[A-Za-z0-9 ,.']/,
    chinese: /[\u4e00-\u9fa5]/
}

window.esapp.demoGeo = {
    undefined: [
        {
            "classType": "geoDto",
            "id": 49,
            "name": "中国",
            "nameEN": "P.R. CHINA"
        },
        {
            "classType": "geoDto",
            "id": 269,
            "name": "阿尔巴尼亚",
            "nameEN": "ALBANIA"
        },
        {
            "classType": "geoDto",
            "id": 132,
            "name": "阿尔及利亚民主人民共和国",
            "nameEN": "ALGERIA"
        },
        {
            "classType": "geoDto",
            "id": 133,
            "name": " 萨摩亚群岛",
            "nameEN": "AMERICAN SAMOA"
        },
        {
            "classType": "geoDto",
            "id": 134,
            "name": " 安哥拉",
            "nameEN": "ANGOLA"
        },
        {
            "classType": "geoDto",
            "id": 51338,
            "name": "安圭拉",
            "nameEN": "ANGUILLA"
        },
        {
            "classType": "geoDto",
            "id": 273,
            "name": "安提瓜",
            "nameEN": "ANTIGUA"
        },
        {
            "classType": "geoDto",
            "id": 135,
            "name": "安提瓜和巴布达",
            "nameEN": "ANTIGUA AND BARBUDA"
        },
        {
            "classType": "geoDto",
            "id": 136,
            "name": "阿根廷",
            "nameEN": "ARGENTINA"
        },
        {
            "classType": "geoDto",
            "id": 51391,
            "name": "亚美尼亚",
            "nameEN": "ARMENIA"
        },
        {
            "classType": "geoDto",
            "id": 275,
            "name": "阿鲁巴",
            "nameEN": "ARUBA ISLAND"
        },
        {
            "classType": "geoDto",
            "id": 266,
            "name": "澳大利亚",
            "nameEN": "AUSTRALIA"
        },
        {
            "classType": "geoDto",
            "id": 51371,
            "name": "奥地利",
            "nameEN": "AUSTRIA"
        },
        {
            "classType": "geoDto",
            "id": 51388,
            "name": "阿塞拜疆共和国",
            "nameEN": "AZERBAIJAN"
        },
        {
            "classType": "geoDto",
            "id": 228,
            "name": "巴哈马",
            "nameEN": "BAHAMAS"
        },
        {
            "classType": "geoDto",
            "id": 119,
            "name": "巴林",
            "nameEN": "BAHRAIN"
        },
        {
            "classType": "geoDto",
            "id": 51344,
            "name": "根西岛",
            "nameEN": "BAILIWICK OF GUERNSEY"
        },
        {
            "classType": "geoDto",
            "id": 116,
            "name": "孟加拉国",
            "nameEN": "BANGLADESH"
        },
        {
            "classType": "geoDto",
            "id": 276,
            "name": "巴巴多斯",
            "nameEN": "BARBADOS"
        },
        {
            "classType": "geoDto",
            "id": 51386,
            "name": "白俄罗斯",
            "nameEN": "BELARUS"
        },
        {
            "classType": "geoDto",
            "id": 207,
            "name": " 比利时",
            "nameEN": "BELGIUM"
        },
        {
            "classType": "geoDto",
            "id": 244,
            "name": "伯利兹",
            "nameEN": "BELIZE"
        },
        {
            "classType": "geoDto",
            "id": 114,
            "name": "贝宁",
            "nameEN": "BENIN"
        },
        {
            "classType": "geoDto",
            "id": 51339,
            "name": "百慕大",
            "nameEN": "BERMUDA"
        },
        {
            "classType": "geoDto",
            "id": 246,
            "name": "巴西",
            "nameEN": "BRAZIL"
        },
        {
            "classType": "geoDto",
            "id": 129,
            "name": "文莱",
            "nameEN": "BRUNEI"
        },
        {
            "classType": "geoDto",
            "id": 223,
            "name": "保加利亚",
            "nameEN": "BULGARIA"
        },
        {
            "classType": "geoDto",
            "id": 105,
            "name": "柬埔寨",
            "nameEN": "CAMBODIA"
        },
        {
            "classType": "geoDto",
            "id": 247,
            "name": "喀麦隆",
            "nameEN": "CAMEROON"
        },
        {
            "classType": "geoDto",
            "id": 265,
            "name": "加拿大",
            "nameEN": "CANADA"
        },
        {
            "classType": "geoDto",
            "id": 248,
            "name": "佛得角共和国",
            "nameEN": "CAPE VARDE"
        },
        {
            "classType": "geoDto",
            "id": 249,
            "name": "开曼群岛",
            "nameEN": "CAYMAN ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 130,
            "name": "智利",
            "nameEN": "CHILE"
        },
        {
            "classType": "geoDto",
            "id": 251,
            "name": "哥伦比亚",
            "nameEN": "COLOMBIA"
        },
        {
            "classType": "geoDto",
            "id": 252,
            "name": "科摩罗伊斯兰联邦共和国",
            "nameEN": "COMOROS"
        },
        {
            "classType": "geoDto",
            "id": 253,
            "name": "刚果",
            "nameEN": "CONGO"
        },
        {
            "classType": "geoDto",
            "id": 254,
            "name": "刚果金和刚果布",
            "nameEN": "CONGO,DEM.REP.OF"
        },
        {
            "classType": "geoDto",
            "id": 255,
            "name": "库克群岛",
            "nameEN": "COOKISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 283,
            "name": "哥斯达黎加",
            "nameEN": "COSTA RICA"
        },
        {
            "classType": "geoDto",
            "id": 189,
            "name": "科特迪瓦共和国",
            "nameEN": "COTE D'IVOIRE"
        },
        {
            "classType": "geoDto",
            "id": 256,
            "name": "克罗地亚",
            "nameEN": "CROATIA"
        },
        {
            "classType": "geoDto",
            "id": 277,
            "name": "古巴",
            "nameEN": "CUBA"
        },
        {
            "classType": "geoDto",
            "id": 227,
            "name": "塞浦路斯",
            "nameEN": "CYPRUS"
        },
        {
            "classType": "geoDto",
            "id": 51370,
            "name": "捷克",
            "nameEN": "CZECH REPUBLIC"
        },
        {
            "classType": "geoDto",
            "id": 87,
            "name": "丹麦",
            "nameEN": "DENMARK"
        },
        {
            "classType": "geoDto",
            "id": 126,
            "name": "吉布提",
            "nameEN": "DJIBOUTI"
        },
        {
            "classType": "geoDto",
            "id": 257,
            "name": "多米尼克",
            "nameEN": "DOMINCA ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 278,
            "name": "多米尼加共和国",
            "nameEN": "DOMINICAN REPUBLIC"
        },
        {
            "classType": "geoDto",
            "id": 258,
            "name": "厄瓜多尔",
            "nameEN": "ECUADOR"
        },
        {
            "classType": "geoDto",
            "id": 220,
            "name": "埃及",
            "nameEN": "EGYPT"
        },
        {
            "classType": "geoDto",
            "id": 259,
            "name": "萨尔瓦多共和国",
            "nameEN": "EI SALVADOR"
        },
        {
            "classType": "geoDto",
            "id": 260,
            "name": "赤道几内亚",
            "nameEN": "EQUATORIAL GUINEA"
        },
        {
            "classType": "geoDto",
            "id": 121,
            "name": "爱沙尼亚",
            "nameEN": "ESTONIA"
        },
        {
            "classType": "geoDto",
            "id": 261,
            "name": "厄立特里亚",
            "nameEN": "ETITREA"
        },
        {
            "classType": "geoDto",
            "id": 51340,
            "name": "马尔维纳斯(福克兰群岛）",
            "nameEN": "FALKLAND ISLANDS (MALVINAS)"
        },
        {
            "classType": "geoDto",
            "id": 51342,
            "name": "法罗群岛",
            "nameEN": "FAROE ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 171,
            "name": "斐济群岛共和国",
            "nameEN": "FIJI ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 86,
            "name": "芬兰",
            "nameEN": "FINLAND"
        },
        {
            "classType": "geoDto",
            "id": 82,
            "name": "法国",
            "nameEN": "FRANCE"
        },
        {
            "classType": "geoDto",
            "id": 172,
            "name": "圭亚那",
            "nameEN": "FRENCH GUIANA"
        },
        {
            "classType": "geoDto",
            "id": 173,
            "name": "波利尼西亚",
            "nameEN": "FRENCH POLYNESIA"
        },
        {
            "classType": "geoDto",
            "id": 174,
            "name": "加蓬共和国",
            "nameEN": "GABON"
        },
        {
            "classType": "geoDto",
            "id": 175,
            "name": "冈比亚",
            "nameEN": "GAMBIA"
        },
        {
            "classType": "geoDto",
            "id": 205,
            "name": "德国",
            "nameEN": "GERMANY"
        },
        {
            "classType": "geoDto",
            "id": 111,
            "name": "加纳",
            "nameEN": "GHANA"
        },
        {
            "classType": "geoDto",
            "id": 178,
            "name": "直布罗陀",
            "nameEN": "GIBRALTAR"
        },
        {
            "classType": "geoDto",
            "id": 221,
            "name": "希腊",
            "nameEN": "GREECE"
        },
        {
            "classType": "geoDto",
            "id": 179,
            "name": "格陵兰岛",
            "nameEN": "GREENLAND"
        },
        {
            "classType": "geoDto",
            "id": 180,
            "name": "格林纳达",
            "nameEN": "GRENADA"
        },
        {
            "classType": "geoDto",
            "id": 181,
            "name": "瓜德罗普岛",
            "nameEN": "GUADELOUPE"
        },
        {
            "classType": "geoDto",
            "id": 186,
            "name": "关岛",
            "nameEN": "GUAM"
        },
        {
            "classType": "geoDto",
            "id": 285,
            "name": "危地马拉",
            "nameEN": "GUATEMALA"
        },
        {
            "classType": "geoDto",
            "id": 51345,
            "name": "几内亚",
            "nameEN": "GUINEA"
        },
        {
            "classType": "geoDto",
            "id": 183,
            "name": "几内亚比绍共和国",
            "nameEN": "GUINEA-BISSAU"
        },
        {
            "classType": "geoDto",
            "id": 279,
            "name": "圭亚那",
            "nameEN": "GUYANA"
        },
        {
            "classType": "geoDto",
            "id": 280,
            "name": "海地",
            "nameEN": "HAITI"
        },
        {
            "classType": "geoDto",
            "id": 284,
            "name": "洪都拉斯",
            "nameEN": "HONDURAS"
        },
        {
            "classType": "geoDto",
            "id": 51346,
            "name": "中国香港",
            "nameEN": "HONG KONG"
        },
        {
            "classType": "geoDto",
            "id": 51374,
            "name": "匈牙利",
            "nameEN": "HUNGARY"
        },
        {
            "classType": "geoDto",
            "id": 214,
            "name": "冰岛",
            "nameEN": "ICELAND"
        },
        {
            "classType": "geoDto",
            "id": 267,
            "name": "印度",
            "nameEN": "INDIA"
        },
        {
            "classType": "geoDto",
            "id": 212,
            "name": "印度尼西亚",
            "nameEN": "INDONESIA"
        },
        {
            "classType": "geoDto",
            "id": 185,
            "name": "伊朗",
            "nameEN": "IRAN"
        },
        {
            "classType": "geoDto",
            "id": 263,
            "name": "伊拉克",
            "nameEN": "IRAQ"
        },
        {
            "classType": "geoDto",
            "id": 81,
            "name": "爱尔兰",
            "nameEN": "IRELAND"
        },
        {
            "classType": "geoDto",
            "id": 51347,
            "name": "马恩岛",
            "nameEN": "ISLE OF MAN"
        },
        {
            "classType": "geoDto",
            "id": 264,
            "name": "以色列",
            "nameEN": "ISRAEL"
        },
        {
            "classType": "geoDto",
            "id": 218,
            "name": "意大利",
            "nameEN": "ITALY"
        },
        {
            "classType": "geoDto",
            "id": 103,
            "name": "牙买加",
            "nameEN": "JAMAICA"
        },
        {
            "classType": "geoDto",
            "id": 193,
            "name": "日本",
            "nameEN": "JAPAN"
        },
        {
            "classType": "geoDto",
            "id": 51348,
            "name": "泽西岛",
            "nameEN": "JERSEY"
        },
        {
            "classType": "geoDto",
            "id": 137,
            "name": "约旦",
            "nameEN": "JORDAN"
        },
        {
            "classType": "geoDto",
            "id": 51377,
            "name": "哈萨克斯坦",
            "nameEN": "KAZAKHSTAN"
        },
        {
            "classType": "geoDto",
            "id": 138,
            "name": "肯尼亚",
            "nameEN": "KENYA"
        },
        {
            "classType": "geoDto",
            "id": 139,
            "name": "基里巴斯共和国",
            "nameEN": "KIRIBATI"
        },
        {
            "classType": "geoDto",
            "id": 196,
            "name": "韩国",
            "nameEN": "KOREA"
        },
        {
            "classType": "geoDto",
            "id": 51349,
            "name": "朝鲜",
            "nameEN": "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF"
        },
        {
            "classType": "geoDto",
            "id": 120,
            "name": "科威特",
            "nameEN": "KUWAIT"
        },
        {
            "classType": "geoDto",
            "id": 51376,
            "name": "吉尔吉斯斯坦",
            "nameEN": "KYRGYZSTAN"
        },
        {
            "classType": "geoDto",
            "id": 51385,
            "name": "老挝",
            "nameEN": "LAOS"
        },
        {
            "classType": "geoDto",
            "id": 123,
            "name": "拉脱维亚",
            "nameEN": "LATVIA"
        },
        {
            "classType": "geoDto",
            "id": 226,
            "name": " 黎巴嫩",
            "nameEN": "LEBANON"
        },
        {
            "classType": "geoDto",
            "id": 233,
            "name": "利比里亚",
            "nameEN": "LIBERIA"
        },
        {
            "classType": "geoDto",
            "id": 271,
            "name": "利比亚",
            "nameEN": "LIBYA"
        },
        {
            "classType": "geoDto",
            "id": 51390,
            "name": "列支敦士登",
            "nameEN": "LIECHTENSTEIN"
        },
        {
            "classType": "geoDto",
            "id": 122,
            "name": "立陶宛",
            "nameEN": "LITHUANIA"
        },
        {
            "classType": "geoDto",
            "id": 51372,
            "name": "卢森堡",
            "nameEN": "LUXEMBOURG"
        },
        {
            "classType": "geoDto",
            "id": 197,
            "name": "澳门",
            "nameEN": "MACAU"
        },
        {
            "classType": "geoDto",
            "id": 51384,
            "name": "马其顿",
            "nameEN": "MACEDONIA"
        },
        {
            "classType": "geoDto",
            "id": 142,
            "name": "马达加斯加",
            "nameEN": "MADAGASCAR(MALAGASY)"
        },
        {
            "classType": "geoDto",
            "id": 51392,
            "name": "马拉维",
            "nameEN": "MALAWI"
        },
        {
            "classType": "geoDto",
            "id": 191,
            "name": "马来西亚",
            "nameEN": "MALAYSIA"
        },
        {
            "classType": "geoDto",
            "id": 51353,
            "name": "马尔代夫",
            "nameEN": "MALDIVES"
        },
        {
            "classType": "geoDto",
            "id": 51369,
            "name": "马里",
            "nameEN": "MALI"
        },
        {
            "classType": "geoDto",
            "id": 101,
            "name": "马耳他",
            "nameEN": "MALTA"
        },
        {
            "classType": "geoDto",
            "id": 143,
            "name": "马绍尔群岛共和国",
            "nameEN": "MARSHALL ISLAND"
        },
        {
            "classType": "geoDto",
            "id": 145,
            "name": "毛里塔尼亚",
            "nameEN": "MAURITANIA"
        },
        {
            "classType": "geoDto",
            "id": 268,
            "name": "毛里求斯",
            "nameEN": "MAURITIUS"
        },
        {
            "classType": "geoDto",
            "id": 51367,
            "name": "马约特",
            "nameEN": "MAYOTTE"
        },
        {
            "classType": "geoDto",
            "id": 286,
            "name": "墨西哥",
            "nameEN": "MEXICO"
        },
        {
            "classType": "geoDto",
            "id": 51341,
            "name": "密克罗尼西亚联邦",
            "nameEN": "MICRONESIA, FEDERATED STATES OF"
        },
        {
            "classType": "geoDto",
            "id": 51382,
            "name": "摩尔瓦多",
            "nameEN": "MOLDOVA"
        },
        {
            "classType": "geoDto",
            "id": 146,
            "name": "摩纳哥亲王国",
            "nameEN": "MONACO"
        },
        {
            "classType": "geoDto",
            "id": 51381,
            "name": "蒙古",
            "nameEN": "MONGOLIA"
        },
        {
            "classType": "geoDto",
            "id": 51351,
            "name": "黑山",
            "nameEN": "MONTENEGRO"
        },
        {
            "classType": "geoDto",
            "id": 51352,
            "name": "蒙特塞拉特",
            "nameEN": "MONTSERRAT"
        },
        {
            "classType": "geoDto",
            "id": 102,
            "name": "摩洛哥",
            "nameEN": "MOROCCO"
        },
        {
            "classType": "geoDto",
            "id": 147,
            "name": "莫桑比克共和国",
            "nameEN": "MOZAMBIQUE"
        },
        {
            "classType": "geoDto",
            "id": 289,
            "name": "缅甸",
            "nameEN": "MYANMAR"
        },
        {
            "classType": "geoDto",
            "id": 148,
            "name": "纳米比亚共和国",
            "nameEN": "NAMIBIA"
        },
        {
            "classType": "geoDto",
            "id": 149,
            "name": " 瑙鲁(nao3lu2)",
            "nameEN": "NAURU ISLAND"
        },
        {
            "classType": "geoDto",
            "id": 213,
            "name": "荷兰",
            "nameEN": "NETHERLANDS"
        },
        {
            "classType": "geoDto",
            "id": 150,
            "name": "新喀里多尼亚",
            "nameEN": "NEW CALEDONIA"
        },
        {
            "classType": "geoDto",
            "id": 151,
            "name": "新西兰",
            "nameEN": "NEW ZEALAND"
        },
        {
            "classType": "geoDto",
            "id": 152,
            "name": "尼加拉瓜",
            "nameEN": "NICARAGUA"
        },
        {
            "classType": "geoDto",
            "id": 112,
            "name": "尼日利亚",
            "nameEN": "NIGERIA"
        },
        {
            "classType": "geoDto",
            "id": 154,
            "name": "纽埃",
            "nameEN": "NIUE"
        },
        {
            "classType": "geoDto",
            "id": 51354,
            "name": "诺福克岛",
            "nameEN": "NORFOLK ISLAND"
        },
        {
            "classType": "geoDto",
            "id": 155,
            "name": "北马里亚那群岛",
            "nameEN": "NORTHERN MARIANA ISL"
        },
        {
            "classType": "geoDto",
            "id": 201,
            "name": "挪威",
            "nameEN": "NORWAY"
        },
        {
            "classType": "geoDto",
            "id": 118,
            "name": "阿曼",
            "nameEN": "OMAN"
        },
        {
            "classType": "geoDto",
            "id": 117,
            "name": "巴基斯坦",
            "nameEN": "PAKISTAN"
        },
        {
            "classType": "geoDto",
            "id": 156,
            "name": "帕劳群岛",
            "nameEN": "PALAU(PELEW) ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 51389,
            "name": "巴勒斯坦",
            "nameEN": "PALESTINE"
        },
        {
            "classType": "geoDto",
            "id": 104,
            "name": "巴拿马",
            "nameEN": "PANAMA"
        },
        {
            "classType": "geoDto",
            "id": 157,
            "name": " 巴布亚新几内亚",
            "nameEN": "PAPUA NEW GUINEA"
        },
        {
            "classType": "geoDto",
            "id": 51378,
            "name": "巴拉圭",
            "nameEN": "PARAGUAY"
        },
        {
            "classType": "geoDto",
            "id": 131,
            "name": "秘鲁",
            "nameEN": "PERU"
        },
        {
            "classType": "geoDto",
            "id": 194,
            "name": "菲律宾共和国",
            "nameEN": "PHILIPPINES"
        },
        {
            "classType": "geoDto",
            "id": 159,
            "name": "皮特凯恩群岛",
            "nameEN": "PITCAIRN ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 84,
            "name": "波兰",
            "nameEN": "POLAND"
        },
        {
            "classType": "geoDto",
            "id": 88,
            "name": "葡萄牙",
            "nameEN": "PORTUGAL"
        },
        {
            "classType": "geoDto",
            "id": 187,
            "name": "波多黎各",
            "nameEN": "PUERTO RICO"
        },
        {
            "classType": "geoDto",
            "id": 160,
            "name": "卡塔尔",
            "nameEN": "QATAR"
        },
        {
            "classType": "geoDto",
            "id": 51356,
            "name": "留尼汪",
            "nameEN": "REUNION"
        },
        {
            "classType": "geoDto",
            "id": 222,
            "name": "罗马尼亚",
            "nameEN": "ROMANIA"
        },
        {
            "classType": "geoDto",
            "id": 292,
            "name": "俄罗斯",
            "nameEN": "RUSSIA"
        },
        {
            "classType": "geoDto",
            "id": 51350,
            "name": "圣卢西亚",
            "nameEN": "SAINT LUCIA"
        },
        {
            "classType": "geoDto",
            "id": 51355,
            "name": "圣皮埃尔和密克隆",
            "nameEN": "SAINT PIERRE AND MIQUELON"
        },
        {
            "classType": "geoDto",
            "id": 51343,
            "name": "格鲁吉亚",
            "nameEN": "SAKARTVELO"
        },
        {
            "classType": "geoDto",
            "id": 51366,
            "name": "萨摩亚",
            "nameEN": "SAMOA"
        },
        {
            "classType": "geoDto",
            "id": 51375,
            "name": "圣马力诺",
            "nameEN": "SAN MARINO"
        },
        {
            "classType": "geoDto",
            "id": 51357,
            "name": "圣多美和普林西比",
            "nameEN": "SAO TOME AND PRINCIPE"
        },
        {
            "classType": "geoDto",
            "id": 211,
            "name": "沙特阿拉伯",
            "nameEN": "SAUDI ARABIA"
        },
        {
            "classType": "geoDto",
            "id": 272,
            "name": "塞内加尔",
            "nameEN": "SENEGAL"
        },
        {
            "classType": "geoDto",
            "id": 51383,
            "name": "塞尔维亚共和国",
            "nameEN": "SERBIA"
        },
        {
            "classType": "geoDto",
            "id": 167,
            "name": "塞舌尔共和国",
            "nameEN": "SEYCHELLES"
        },
        {
            "classType": "geoDto",
            "id": 168,
            "name": "塞拉利昂共和国",
            "nameEN": "SIERRA LEONE"
        },
        {
            "classType": "geoDto",
            "id": 107,
            "name": "斯里兰卡",
            "nameEN": "SILILANKA"
        },
        {
            "classType": "geoDto",
            "id": 192,
            "name": "新加坡",
            "nameEN": "SINGAPORE"
        },
        {
            "classType": "geoDto",
            "id": 51373,
            "name": "斯洛伐克",
            "nameEN": "SLOVAKIA"
        },
        {
            "classType": "geoDto",
            "id": 274,
            "name": "斯洛文尼亚",
            "nameEN": "SLOVENIA"
        },
        {
            "classType": "geoDto",
            "id": 169,
            "name": "所罗门群岛",
            "nameEN": "SOLOMON ISLANDS"
        },
        {
            "classType": "geoDto",
            "id": 170,
            "name": "索马利亚",
            "nameEN": "SOMALIA"
        },
        {
            "classType": "geoDto",
            "id": 110,
            "name": "南非",
            "nameEN": "SOUTH AFRICA"
        },
        {
            "classType": "geoDto",
            "id": 219,
            "name": "西班牙",
            "nameEN": "SPAIN"
        },
        {
            "classType": "geoDto",
            "id": 163,
            "name": "圣海伦娜",
            "nameEN": "ST. HELENA"
        },
        {
            "classType": "geoDto",
            "id": 164,
            "name": "圣基茨与尼维斯联邦",
            "nameEN": "ST. KITTS & NEVIS"
        },
        {
            "classType": "geoDto",
            "id": 234,
            "name": "苏丹",
            "nameEN": "SUDAN"
        },
        {
            "classType": "geoDto",
            "id": 281,
            "name": "苏里南",
            "nameEN": "SURINAME"
        },
        {
            "classType": "geoDto",
            "id": 51368,
            "name": "斯威士兰",
            "nameEN": "SWAZILAND"
        },
        {
            "classType": "geoDto",
            "id": 203,
            "name": "瑞典",
            "nameEN": "SWEDEN"
        },
        {
            "classType": "geoDto",
            "id": 51393,
            "name": "瑞士",
            "nameEN": "SWITZERLAND"
        },
        {
            "classType": "geoDto",
            "id": 225,
            "name": "叙利亚",
            "nameEN": "SYRIA"
        },
        {
            "classType": "geoDto",
            "id": 309,
            "name": "圣文森特和格林纳丁斯",
            "nameEN": "Saint Vincent and the  Grenadines"
        },
        {
            "classType": "geoDto",
            "id": 51361,
            "name": "中国台湾",
            "nameEN": "TAIWAN, PROVINCE OF CHINA"
        },
        {
            "classType": "geoDto",
            "id": 51387,
            "name": "塔吉克斯坦",
            "nameEN": "TAJIKISTAN"
        },
        {
            "classType": "geoDto",
            "id": 235,
            "name": "坦桑尼亚",
            "nameEN": "TANZANIA"
        },
        {
            "classType": "geoDto",
            "id": 195,
            "name": "泰国",
            "nameEN": "THAILAND"
        },
        {
            "classType": "geoDto",
            "id": 51359,
            "name": "东帝汶",
            "nameEN": "TIMOR-LESTE"
        },
        {
            "classType": "geoDto",
            "id": 113,
            "name": "多哥",
            "nameEN": "TOGO"
        },
        {
            "classType": "geoDto",
            "id": 51358,
            "name": "托克劳群岛",
            "nameEN": "TOKELAU"
        },
        {
            "classType": "geoDto",
            "id": 237,
            "name": "汤加王国",
            "nameEN": "TONGA"
        },
        {
            "classType": "geoDto",
            "id": 282,
            "name": "特立尼达和多巴哥",
            "nameEN": "TRINIDAD AND TOBAGC"
        },
        {
            "classType": "geoDto",
            "id": 238,
            "name": "突尼斯",
            "nameEN": "TUNISIA"
        },
        {
            "classType": "geoDto",
            "id": 204,
            "name": "土耳其共和国",
            "nameEN": "TURKEY"
        },
        {
            "classType": "geoDto",
            "id": 51380,
            "name": "土库曼斯坦",
            "nameEN": "TURKMENISTAN"
        },
        {
            "classType": "geoDto",
            "id": 239,
            "name": "特克斯和凯科斯群岛",
            "nameEN": "TURKS AND CAICOS ISL"
        },
        {
            "classType": "geoDto",
            "id": 128,
            "name": "阿拉伯联合酋长国（阿联酋）",
            "nameEN": "U.A.E"
        },
        {
            "classType": "geoDto",
            "id": 224,
            "name": "乌克兰",
            "nameEN": "UKRAINE"
        },
        {
            "classType": "geoDto",
            "id": 80,
            "name": "英国",
            "nameEN": "UNITED KINGDOM"
        },
        {
            "classType": "geoDto",
            "id": 177,
            "name": "美国",
            "nameEN": "UNITED STATES"
        },
        {
            "classType": "geoDto",
            "id": 240,
            "name": "乌拉圭",
            "nameEN": "URUGUAY"
        },
        {
            "classType": "geoDto",
            "id": 51379,
            "name": "乌兹别克斯坦",
            "nameEN": "UZBEKISTAN"
        },
        {
            "classType": "geoDto",
            "id": 51364,
            "name": "瓦努阿图",
            "nameEN": "VANUATU"
        },
        {
            "classType": "geoDto",
            "id": 100,
            "name": "委内瑞拉",
            "nameEN": "VENEZUELA"
        },
        {
            "classType": "geoDto",
            "id": 288,
            "name": "越南",
            "nameEN": "VIETNAM"
        },
        {
            "classType": "geoDto",
            "id": 51362,
            "name": "英属维尔京群岛",
            "nameEN": "VIRGIN ISLANDS, BRITISH"
        },
        {
            "classType": "geoDto",
            "id": 51363,
            "name": "美属维尔京群岛",
            "nameEN": "VIRGIN ISLANDS, U.S."
        },
        {
            "classType": "geoDto",
            "id": 51365,
            "name": "瓦利斯和富图纳",
            "nameEN": "WALLIS AND FUTUNA"
        },
        {
            "classType": "geoDto",
            "id": 51360,
            "name": "围瓦卢",
            "nameEN": "WEILUWA"
        },
        {
            "classType": "geoDto",
            "id": 242,
            "name": "西撒哈拉",
            "nameEN": "WESTERN SAHARA"
        },
        {
            "classType": "geoDto",
            "id": 124,
            "name": "也门",
            "nameEN": "YEMEN"
        }
    ],
    4364: [
        {
            "classType": "geoDto",
            "id": 4545,
            "name": "安庆市",
            "nameEN": "AnQingShi"
        },
        {
            "classType": "geoDto",
            "id": 4541,
            "name": "蚌埠市",
            "nameEN": "BengBuShi"
        },
        {
            "classType": "geoDto",
            "id": 4555,
            "name": "亳州市",
            "nameEN": "BoZhouShi"
        },
        {
            "classType": "geoDto",
            "id": 4556,
            "name": "池州市",
            "nameEN": "ChiZhouShi"
        },
        {
            "classType": "geoDto",
            "id": 4551,
            "name": "滁州市",
            "nameEN": "ChuZhouShi"
        },
        {
            "classType": "geoDto",
            "id": 4553,
            "name": "阜阳市",
            "nameEN": "FuYangShi"
        },
        {
            "classType": "geoDto",
            "id": 4543,
            "name": "合肥市",
            "nameEN": "HeFeiShi"
        },
        {
            "classType": "geoDto",
            "id": 4547,
            "name": "淮北市",
            "nameEN": "HuaiBeiShi"
        },
        {
            "classType": "geoDto",
            "id": 4542,
            "name": "淮南市",
            "nameEN": "HuaiNanShi"
        },
        {
            "classType": "geoDto",
            "id": 4552,
            "name": "黄山市",
            "nameEN": "HuangShanShi"
        },
        {
            "classType": "geoDto",
            "id": 4550,
            "name": "六安市",
            "nameEN": "LuAnShi"
        },
        {
            "classType": "geoDto",
            "id": 4546,
            "name": "马鞍山市",
            "nameEN": "MaAnShanShi"
        },
        {
            "classType": "geoDto",
            "id": 4549,
            "name": "宿州市",
            "nameEN": "SuZhouShi"
        },
        {
            "classType": "geoDto",
            "id": 4548,
            "name": "铜陵市",
            "nameEN": "TongLingShi"
        },
        {
            "classType": "geoDto",
            "id": 4544,
            "name": "芜湖市",
            "nameEN": "WuHuShi"
        },
        {
            "classType": "geoDto",
            "id": 4554,
            "name": "宣城市",
            "nameEN": "XuanChengShi"
        }
    ],
    4400: [
        {
            "classType": "geoDto",
            "id": 4502,
            "name": "澳门半岛",
            "nameEN": "AoMenBanDao"
        },
        {
            "classType": "geoDto",
            "id": 4501,
            "name": "离岛",
            "nameEN": "LiDao"
        }
    ],
    4404: [
        {
            "classType": "geoDto",
            "id": 4661,
            "name": "北京市",
            "nameEN": "BeiJingShi"
        }
    ],
    4661: [
        {
            "classType": "geoDto",
            "id": 7405,
            "name": "昌平区",
            "nameEN": "ChangPingQu"
        },
        {
            "classType": "geoDto",
            "id": 7415,
            "name": "朝阳区",
            "nameEN": "ChaoYangQu"
        },
        {
            "classType": "geoDto",
            "id": 7407,
            "name": "崇文区",
            "nameEN": "ChongWenQu"
        },
        {
            "classType": "geoDto",
            "id": 7404,
            "name": "大兴区",
            "nameEN": "DaXingQu"
        },
        {
            "classType": "geoDto",
            "id": 7408,
            "name": "东城区",
            "nameEN": "DongChengQu"
        },
        {
            "classType": "geoDto",
            "id": 7409,
            "name": "房山区",
            "nameEN": "FangShanQu"
        },
        {
            "classType": "geoDto",
            "id": 7412,
            "name": "丰台区",
            "nameEN": "FengTaiQu"
        },
        {
            "classType": "geoDto",
            "id": 7410,
            "name": "海淀区",
            "nameEN": "HaiDianQu"
        },
        {
            "classType": "geoDto",
            "id": 7401,
            "name": "怀柔区",
            "nameEN": "HuaiRouQu"
        },
        {
            "classType": "geoDto",
            "id": 7411,
            "name": "门头沟区",
            "nameEN": "MenTouGouQu"
        },
        {
            "classType": "geoDto",
            "id": 7399,
            "name": "密云县",
            "nameEN": "MiYunXian"
        },
        {
            "classType": "geoDto",
            "id": 7400,
            "name": "平谷区",
            "nameEN": "PingGuQu"
        },
        {
            "classType": "geoDto",
            "id": 7413,
            "name": "石景山区",
            "nameEN": "ShiJingShanQu"
        },
        {
            "classType": "geoDto",
            "id": 7402,
            "name": "顺义区",
            "nameEN": "ShunYiQu"
        },
        {
            "classType": "geoDto",
            "id": 7403,
            "name": "通州区",
            "nameEN": "TongZhouQu"
        },
        {
            "classType": "geoDto",
            "id": 7406,
            "name": "西城区",
            "nameEN": "XiChengQu"
        },
        {
            "classType": "geoDto",
            "id": 7414,
            "name": "宣武区",
            "nameEN": "XuanWuQu"
        },
        {
            "classType": "geoDto",
            "id": 7398,
            "name": "延庆县",
            "nameEN": "YanQingXian"
        },
        {
            "classType": "geoDto",
            "id": 7397,
            "name": "其它区",
            "nameEN": "zzzzz_QiTaQu"
        }
    ],
    58: [
        {
            "classType": "geoDto",
            "id": 4801,
            "name": "上海市",
            "nameEN": "ShangHaiShi"
        }
    ],
    4801: [
        {
            "classType": "geoDto",
            "id": 8891,
            "name": "宝山区",
            "nameEN": "BaoShanQu"
        },
        {
            "classType": "geoDto",
            "id": 8879,
            "name": "长宁区",
            "nameEN": "ChangNingQu"
        },
        {
            "classType": "geoDto",
            "id": 8874,
            "name": "崇明县",
            "nameEN": "ChongMingXian"
        },
        {
            "classType": "geoDto",
            "id": 8872,
            "name": "川沙区",
            "nameEN": "ChuanShaQu"
        },
        {
            "classType": "geoDto",
            "id": 8884,
            "name": "奉贤区",
            "nameEN": "FengXianQu"
        },
        {
            "classType": "geoDto",
            "id": 8876,
            "name": "虹口区",
            "nameEN": "HongKouQu"
        },
        {
            "classType": "geoDto",
            "id": 8882,
            "name": "黄浦区",
            "nameEN": "HuangPuQu"
        },
        {
            "classType": "geoDto",
            "id": 8890,
            "name": "嘉定区",
            "nameEN": "JiaDingQu"
        },
        {
            "classType": "geoDto",
            "id": 8888,
            "name": "金山区",
            "nameEN": "JinShanQu"
        },
        {
            "classType": "geoDto",
            "id": 8880,
            "name": "静安区",
            "nameEN": "JingAnQu"
        },
        {
            "classType": "geoDto",
            "id": 8883,
            "name": "卢湾区",
            "nameEN": "LuWanQu"
        },
        {
            "classType": "geoDto",
            "id": 8892,
            "name": "闵行区",
            "nameEN": "MinHangQu"
        },
        {
            "classType": "geoDto",
            "id": 8885,
            "name": "南汇区",
            "nameEN": "NanHuiQu"
        },
        {
            "classType": "geoDto",
            "id": 8889,
            "name": "浦东新区",
            "nameEN": "PuDongXinQu"
        },
        {
            "classType": "geoDto",
            "id": 8881,
            "name": "普陀区",
            "nameEN": "PuTuoQu"
        },
        {
            "classType": "geoDto",
            "id": 8886,
            "name": "青浦区",
            "nameEN": "QingPuQu"
        },
        {
            "classType": "geoDto",
            "id": 8887,
            "name": "松江区",
            "nameEN": "SongJiangQu"
        },
        {
            "classType": "geoDto",
            "id": 8878,
            "name": "徐汇区",
            "nameEN": "XuHuiQu"
        },
        {
            "classType": "geoDto",
            "id": 8877,
            "name": "杨浦区",
            "nameEN": "YangPuQu"
        },
        {
            "classType": "geoDto",
            "id": 8875,
            "name": "闸北区",
            "nameEN": "ZhaBeiQu"
        },
        {
            "classType": "geoDto",
            "id": 8873,
            "name": "其它区",
            "nameEN": "zzzzz_QiTaQu"
        }
    ],
    49: [
        {
            "classType": "geoDto",
            "id": 4364,
            "name": "安徽省",
            "nameEN": "AnHuiSheng"
        },
        {
            "classType": "geoDto",
            "id": 4400,
            "name": "澳门特别行政区",
            "nameEN": "AoMenTeBieXingZhengQu"
        },
        {
            "classType": "geoDto",
            "id": 4404,
            "name": "北京",
            "nameEN": "BeiJing"
        },
        {
            "classType": "geoDto",
            "id": 4371,
            "name": "重庆",
            "nameEN": "Chongqing"
        },
        {
            "classType": "geoDto",
            "id": 4366,
            "name": "福建省",
            "nameEN": "FuJianSheng"
        },
        {
            "classType": "geoDto",
            "id": 4381,
            "name": "甘肃省",
            "nameEN": "GanSuSheng"
        },
        {
            "classType": "geoDto",
            "id": 4367,
            "name": "广东省",
            "nameEN": "GuangDongSheng"
        },
        {
            "classType": "geoDto",
            "id": 4365,
            "name": "广西壮族自治区",
            "nameEN": "GuangXiZhuangZuZiZhiQu"
        },
        {
            "classType": "geoDto",
            "id": 4370,
            "name": "贵州省",
            "nameEN": "GuiZhouSheng"
        },
        {
            "classType": "geoDto",
            "id": 4377,
            "name": "海南省",
            "nameEN": "HaiNanSheng"
        },
        {
            "classType": "geoDto",
            "id": 4361,
            "name": "河北省",
            "nameEN": "HeBeiSheng"
        },
        {
            "classType": "geoDto",
            "id": 4368,
            "name": "河南省",
            "nameEN": "HeNanSheng"
        },
        {
            "classType": "geoDto",
            "id": 4405,
            "name": "黑龙江省",
            "nameEN": "HeiLongJiangSheng"
        },
        {
            "classType": "geoDto",
            "id": 4378,
            "name": "湖北省",
            "nameEN": "HuBeiSheng"
        },
        {
            "classType": "geoDto",
            "id": 4372,
            "name": "湖南省",
            "nameEN": "HuNanSheng"
        },
        {
            "classType": "geoDto",
            "id": 4401,
            "name": "吉林省",
            "nameEN": "JiLinSheng"
        },
        {
            "classType": "geoDto",
            "id": 4369,
            "name": "江苏省",
            "nameEN": "JiangSuSheng"
        },
        {
            "classType": "geoDto",
            "id": 4376,
            "name": "江西省",
            "nameEN": "JiangXiSheng"
        },
        {
            "classType": "geoDto",
            "id": 4374,
            "name": "辽宁省",
            "nameEN": "LiaoNingSheng"
        },
        {
            "classType": "geoDto",
            "id": 4375,
            "name": "内蒙古自治区",
            "nameEN": "NeiMengGuZiZhiQu"
        },
        {
            "classType": "geoDto",
            "id": 4399,
            "name": "宁夏回族自治区",
            "nameEN": "NingXiaHuiZuZiZhiQu"
        },
        {
            "classType": "geoDto",
            "id": 4398,
            "name": "青海省",
            "nameEN": "QingHaiSheng"
        },
        {
            "classType": "geoDto",
            "id": 4380,
            "name": "山东省",
            "nameEN": "ShanDongSheng"
        },
        {
            "classType": "geoDto",
            "id": 4397,
            "name": "山西省",
            "nameEN": "ShanXiSheng"
        },
        {
            "classType": "geoDto",
            "id": 4406,
            "name": "陕西省",
            "nameEN": "ShanXiSheng"
        },
        {
            "classType": "geoDto",
            "id": 58,
            "name": "上海",
            "nameEN": "Shanghai"
        },
        {
            "classType": "geoDto",
            "id": 4379,
            "name": "四川省",
            "nameEN": "SiChuanSheng"
        },
        {
            "classType": "geoDto",
            "id": 250,
            "name": "台湾",
            "nameEN": "TaiWanSheng"
        },
        {
            "classType": "geoDto",
            "id": 4383,
            "name": "天津",
            "nameEN": "TianJin"
        },
        {
            "classType": "geoDto",
            "id": 4403,
            "name": "西藏自治区",
            "nameEN": "XiZangZiZhiQu"
        },
        {
            "classType": "geoDto",
            "id": 184,
            "name": "香港特别行政区",
            "nameEN": "XiangGangTeBieXingZhengQu"
        },
        {
            "classType": "geoDto",
            "id": 4362,
            "name": "新疆维吾尔自治区",
            "nameEN": "XinJiangWeiWuErZiZhiQu"
        },
        {
            "classType": "geoDto",
            "id": 4402,
            "name": "云南省",
            "nameEN": "YunNanSheng"
        },
        {
            "classType": "geoDto",
            "id": 4363,
            "name": "浙江省",
            "nameEN": "ZheJiangSheng"
        }
    ],
    8876: [
        {
            "classType": "geoDto",
            "id": 51136,
            "name": "广中路街道",
            "nameEN": "GuangZhongLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51134,
            "name": "嘉兴路街道",
            "nameEN": "JiaXingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51131,
            "name": "江湾镇街道",
            "nameEN": "JiangWanZhenJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51132,
            "name": "凉城新村街道",
            "nameEN": "LiangChengXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51137,
            "name": "欧阳路街道",
            "nameEN": "OuYangLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51135,
            "name": "曲阳路街道",
            "nameEN": "QuYangLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51133,
            "name": "四川北路街道",
            "nameEN": "SiChuanBeiLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51130,
            "name": "提篮桥街道",
            "nameEN": "TiLanQiaoJieDao"
        }
    ],
    8875: [
        {
            "classType": "geoDto",
            "id": 51124,
            "name": "宝山路街道",
            "nameEN": "BaoShanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51123,
            "name": "北站街道",
            "nameEN": "BeiZhanJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51129,
            "name": "大宁路街道",
            "nameEN": "DaNingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51128,
            "name": "共和新路街道",
            "nameEN": "GongHeXinLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51127,
            "name": "临汾路街道",
            "nameEN": "LinFenLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51126,
            "name": "彭浦新村街道",
            "nameEN": "PengPuXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51121,
            "name": "彭浦镇",
            "nameEN": "PengPuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51125,
            "name": "天目西路街道",
            "nameEN": "TianMuXiLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51122,
            "name": "芷江西路街道",
            "nameEN": "ZhiJiangXiLuJieDao"
        }
    ],
    8891: [
        {
            "classType": "geoDto",
            "id": 51304,
            "name": "宝山城市工业园区",
            "nameEN": "BaoShanChengShiGongYeYuanQu"
        },
        {
            "classType": "geoDto",
            "id": 51308,
            "name": "大场镇",
            "nameEN": "DaChangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51313,
            "name": "高境镇",
            "nameEN": "GaoJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51314,
            "name": "顾村镇",
            "nameEN": "GuCunZhen"
        },
        {
            "classType": "geoDto",
            "id": 51310,
            "name": "罗店镇",
            "nameEN": "LuoDianZhen"
        },
        {
            "classType": "geoDto",
            "id": 51315,
            "name": "罗泾镇",
            "nameEN": "LuoJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51312,
            "name": "庙行镇",
            "nameEN": "MiaoXingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51311,
            "name": "淞南镇",
            "nameEN": "SongNanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51306,
            "name": "吴淞街道",
            "nameEN": "WuSongJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51309,
            "name": "杨行镇",
            "nameEN": "YangXingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51307,
            "name": "友谊路街道",
            "nameEN": "YouYiLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51316,
            "name": "月浦镇",
            "nameEN": "YuePuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51305,
            "name": "张庙街道",
            "nameEN": "ZhangMiaoJieDao"
        }
    ],
    8879: [
        {
            "classType": "geoDto",
            "id": 51171,
            "name": "北新泾街道",
            "nameEN": "BeiXinJingJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51170,
            "name": "程家桥街道",
            "nameEN": "ChengJiaQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51173,
            "name": "虹桥街道",
            "nameEN": "HongQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51166,
            "name": "华阳路街道",
            "nameEN": "HuaYangLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51165,
            "name": "江苏路街道",
            "nameEN": "JiangSuLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51167,
            "name": "天山路街道",
            "nameEN": "TianShanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51172,
            "name": "仙霞新村街道",
            "nameEN": "XianXiaXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51169,
            "name": "新华路街道",
            "nameEN": "XinHuaLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51164,
            "name": "新泾镇",
            "nameEN": "XinJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51168,
            "name": "周家桥街道",
            "nameEN": "ZhouJiaQiaoJieDao"
        }
    ],
    8874: [
        {
            "classType": "geoDto",
            "id": 51110,
            "name": "堡镇",
            "nameEN": "BaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51102,
            "name": "陈家镇",
            "nameEN": "ChenJiaZhen"
        },
        {
            "classType": "geoDto",
            "id": 51111,
            "name": "城桥镇",
            "nameEN": "ChengQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51120,
            "name": "东平林场",
            "nameEN": "DongPingLinChang"
        },
        {
            "classType": "geoDto",
            "id": 51107,
            "name": "东平镇",
            "nameEN": "DongPingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51104,
            "name": "港西镇",
            "nameEN": "GangXiZhen"
        },
        {
            "classType": "geoDto",
            "id": 51100,
            "name": "港沿镇",
            "nameEN": "GangYanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51117,
            "name": "横沙乡",
            "nameEN": "HengShaXiang"
        },
        {
            "classType": "geoDto",
            "id": 51105,
            "name": "建设镇",
            "nameEN": "JianSheZhen"
        },
        {
            "classType": "geoDto",
            "id": 51103,
            "name": "绿华镇",
            "nameEN": "Lu:HuaZhen"
        },
        {
            "classType": "geoDto",
            "id": 51114,
            "name": "庙镇",
            "nameEN": "MiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51119,
            "name": "前卫农场",
            "nameEN": "QianWeiNongChang"
        },
        {
            "classType": "geoDto",
            "id": 51115,
            "name": "三星镇",
            "nameEN": "SanXingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51118,
            "name": "上实现代农业园区",
            "nameEN": "ShangShiXianDaiNongYeYuanQu"
        },
        {
            "classType": "geoDto",
            "id": 51113,
            "name": "竖新镇",
            "nameEN": "ShuXinZhen"
        },
        {
            "classType": "geoDto",
            "id": 51112,
            "name": "向化镇",
            "nameEN": "XiangHuaZhen"
        },
        {
            "classType": "geoDto",
            "id": 51116,
            "name": "新村乡",
            "nameEN": "XinCunXiang"
        },
        {
            "classType": "geoDto",
            "id": 51106,
            "name": "新海镇",
            "nameEN": "XinHaiZhen"
        },
        {
            "classType": "geoDto",
            "id": 51109,
            "name": "新河镇",
            "nameEN": "XinHeZhen"
        },
        {
            "classType": "geoDto",
            "id": 51108,
            "name": "长兴镇",
            "nameEN": "ZhangXingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51101,
            "name": "中兴镇",
            "nameEN": "ZhongXingZhen"
        }
    ],
    8884: [
        {
            "classType": "geoDto",
            "id": 51200,
            "name": "奉城镇",
            "nameEN": "FengChengZhen"
        },
        {
            "classType": "geoDto",
            "id": 51207,
            "name": "奉浦社区",
            "nameEN": "FengPuSheQu"
        },
        {
            "classType": "geoDto",
            "id": 51199,
            "name": "海湾镇",
            "nameEN": "HaiWanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51208,
            "name": "金海社区",
            "nameEN": "JinHaiSheQu"
        },
        {
            "classType": "geoDto",
            "id": 51202,
            "name": "金汇镇",
            "nameEN": "JinHuiZhen"
        },
        {
            "classType": "geoDto",
            "id": 51201,
            "name": "南桥镇",
            "nameEN": "NanQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51204,
            "name": "青村镇",
            "nameEN": "QingCunZhen"
        },
        {
            "classType": "geoDto",
            "id": 51209,
            "name": "上海海港综合经济开发区",
            "nameEN": "ShangHaiHaiGangZongHeJingJiKaiFaQu"
        },
        {
            "classType": "geoDto",
            "id": 51206,
            "name": "上海市奉贤区海湾旅游区",
            "nameEN": "ShangHaiShiFengXianQuHaiWanLu:YouQu"
        },
        {
            "classType": "geoDto",
            "id": 51205,
            "name": "四团镇",
            "nameEN": "SiTuanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51198,
            "name": "柘林镇",
            "nameEN": "ZheLinZhen"
        },
        {
            "classType": "geoDto",
            "id": 51203,
            "name": "庄行镇",
            "nameEN": "ZhuangXingZhen"
        }
    ],
    8882: [
        {
            "classType": "geoDto",
            "id": 51188,
            "name": "半淞园路街道",
            "nameEN": "BanSongYuanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51193,
            "name": "打浦桥街道",
            "nameEN": "DaPuQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51190,
            "name": "淮海中路街道",
            "nameEN": "HuaiHaiZhongLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51195,
            "name": "老西门街道",
            "nameEN": "LaoXiMenJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51197,
            "name": "南京东路街道",
            "nameEN": "NanJingDongLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51191,
            "name": "瑞金二路街道",
            "nameEN": "RuiJinErLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51189,
            "name": "外滩街道",
            "nameEN": "WaiTanJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51192,
            "name": "五里桥街道",
            "nameEN": "WuLiQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51196,
            "name": "小东门街道",
            "nameEN": "XiaoDongMenJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51194,
            "name": "豫园街道",
            "nameEN": "YuYuanJieDao"
        }
    ],
    8890: [
        {
            "classType": "geoDto",
            "id": 51297,
            "name": "安亭镇",
            "nameEN": "AnTingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51301,
            "name": "华亭镇",
            "nameEN": "HuaTingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51292,
            "name": "嘉定工业区",
            "nameEN": "JiaDingGongYeQu"
        },
        {
            "classType": "geoDto",
            "id": 51293,
            "name": "嘉定镇街道",
            "nameEN": "JiaDingZhenJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51302,
            "name": "江桥镇",
            "nameEN": "JiangQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51296,
            "name": "菊园新区管委会",
            "nameEN": "JuYuanXinQuGuanWeiHui"
        },
        {
            "classType": "geoDto",
            "id": 51299,
            "name": "马陆镇",
            "nameEN": "MaLuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51298,
            "name": "南翔镇",
            "nameEN": "NanXiangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51303,
            "name": "外冈镇",
            "nameEN": "WaiGangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51294,
            "name": "新成路街道",
            "nameEN": "XinChengLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51300,
            "name": "徐行镇",
            "nameEN": "XuXingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51295,
            "name": "真新街道",
            "nameEN": "ZhenXinJieDao"
        }
    ],
    8888: [
        {
            "classType": "geoDto",
            "id": 51242,
            "name": "漕泾镇",
            "nameEN": "CaoJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51243,
            "name": "枫泾镇",
            "nameEN": "FengJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51239,
            "name": "金山工业区",
            "nameEN": "JinShanGongYeQu"
        },
        {
            "classType": "geoDto",
            "id": 51249,
            "name": "金山卫镇",
            "nameEN": "JinShanWeiZhen"
        },
        {
            "classType": "geoDto",
            "id": 51246,
            "name": "廊下镇",
            "nameEN": "LangXiaZhen"
        },
        {
            "classType": "geoDto",
            "id": 51248,
            "name": "吕巷镇",
            "nameEN": "Lu:XiangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51241,
            "name": "山阳镇",
            "nameEN": "ShanYangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51240,
            "name": "石化街道",
            "nameEN": "ShiHuaJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51247,
            "name": "亭林镇",
            "nameEN": "TingLinZhen"
        },
        {
            "classType": "geoDto",
            "id": 51244,
            "name": "张堰镇",
            "nameEN": "ZhangYanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51245,
            "name": "朱泾镇",
            "nameEN": "ZhuJingZhen"
        }
    ],
    8880: [
        {
            "classType": "geoDto",
            "id": 51177,
            "name": "曹家渡街道",
            "nameEN": "CaoJiaDuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51178,
            "name": "江宁路街道",
            "nameEN": "JiangNingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51176,
            "name": "静安寺街道",
            "nameEN": "JingAnSiJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51175,
            "name": "南京西路街道",
            "nameEN": "NanJingXiLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51174,
            "name": "石门二路街道",
            "nameEN": "ShiMenErLuJieDao"
        }
    ],
    8892: [
        {
            "classType": "geoDto",
            "id": 51319,
            "name": "古美街道",
            "nameEN": "GuMeiJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51328,
            "name": "虹桥镇",
            "nameEN": "HongQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51329,
            "name": "华漕镇",
            "nameEN": "HuaCaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51318,
            "name": "江川路街道",
            "nameEN": "JiangChuanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51321,
            "name": "马桥镇",
            "nameEN": "MaQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51326,
            "name": "梅陇镇",
            "nameEN": "MeiLongZhen"
        },
        {
            "classType": "geoDto",
            "id": 51322,
            "name": "浦江镇",
            "nameEN": "PuJiangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51325,
            "name": "七宝镇",
            "nameEN": "QiBaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51327,
            "name": "吴泾镇",
            "nameEN": "WuJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51320,
            "name": "新虹街道",
            "nameEN": "XinHongJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51317,
            "name": "莘庄工业区",
            "nameEN": "XinZhuangGongYeQu"
        },
        {
            "classType": "geoDto",
            "id": 51323,
            "name": "莘庄镇",
            "nameEN": "XinZhuangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51324,
            "name": "颛桥镇",
            "nameEN": "ZhuanQiaoZhen"
        }
    ],
    8889: [
        {
            "classType": "geoDto",
            "id": 51289,
            "name": "北蔡镇",
            "nameEN": "BeiCaiZhen"
        },
        {
            "classType": "geoDto",
            "id": 51287,
            "name": "曹路镇",
            "nameEN": "CaoLuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51255,
            "name": "朝阳农场",
            "nameEN": "ChaoYangNongChang"
        },
        {
            "classType": "geoDto",
            "id": 51291,
            "name": "川沙新镇",
            "nameEN": "ChuanShaXinZhen"
        },
        {
            "classType": "geoDto",
            "id": 51281,
            "name": "大团镇",
            "nameEN": "DaTuanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51254,
            "name": "东海农场",
            "nameEN": "DongHaiNongChang"
        },
        {
            "classType": "geoDto",
            "id": 51258,
            "name": "东明路街道",
            "nameEN": "DongMingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51284,
            "name": "高东镇",
            "nameEN": "GaoDongZhen"
        },
        {
            "classType": "geoDto",
            "id": 51288,
            "name": "高桥镇",
            "nameEN": "GaoQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51282,
            "name": "高行镇",
            "nameEN": "GaoXingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51276,
            "name": "航头镇",
            "nameEN": "HangTouZhen"
        },
        {
            "classType": "geoDto",
            "id": 51290,
            "name": "合庆镇",
            "nameEN": "HeQingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51262,
            "name": "沪东新村街道",
            "nameEN": "HuDongXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51264,
            "name": "花木街道",
            "nameEN": "HuaMuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51277,
            "name": "惠南镇",
            "nameEN": "HuiNanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51251,
            "name": "金桥经济技术开发区",
            "nameEN": "JinQiaoJingJiJiShuKaiFaQu"
        },
        {
            "classType": "geoDto",
            "id": 51283,
            "name": "金桥镇",
            "nameEN": "JinQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51257,
            "name": "金杨新村街道",
            "nameEN": "JinYangXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51275,
            "name": "康桥镇",
            "nameEN": "KangQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51268,
            "name": "老港镇",
            "nameEN": "LaoGangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51253,
            "name": "芦潮港农场",
            "nameEN": "LuChaoGangNongChang"
        },
        {
            "classType": "geoDto",
            "id": 51267,
            "name": "陆家嘴街道",
            "nameEN": "LuJiaZuiJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51269,
            "name": "南汇新城镇",
            "nameEN": "NanHuiXinChengZhen"
        },
        {
            "classType": "geoDto",
            "id": 51263,
            "name": "南码头路街道",
            "nameEN": "NanMaTouLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51272,
            "name": "泥城镇",
            "nameEN": "NiChengZhen"
        },
        {
            "classType": "geoDto",
            "id": 51259,
            "name": "浦兴路街道",
            "nameEN": "PuXingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51278,
            "name": "三林镇",
            "nameEN": "SanLinZhen"
        },
        {
            "classType": "geoDto",
            "id": 51260,
            "name": "上钢新村街道",
            "nameEN": "ShangGangXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51270,
            "name": "书院镇",
            "nameEN": "ShuYuanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51261,
            "name": "塘桥街道",
            "nameEN": "TangQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51286,
            "name": "唐镇",
            "nameEN": "TangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51252,
            "name": "外高桥保税区",
            "nameEN": "WaiGaoQiaoBaoShuiQu"
        },
        {
            "classType": "geoDto",
            "id": 51271,
            "name": "万祥镇",
            "nameEN": "WanXiangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51266,
            "name": "潍坊新村街道",
            "nameEN": "WeiFangXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51279,
            "name": "新场镇",
            "nameEN": "XinChangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51273,
            "name": "宣桥镇",
            "nameEN": "XuanQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51256,
            "name": "洋泾街道",
            "nameEN": "YangJingJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51250,
            "name": "张江高科技园区",
            "nameEN": "ZhangJiangGaoKeJiYuanQu"
        },
        {
            "classType": "geoDto",
            "id": 51285,
            "name": "张江镇",
            "nameEN": "ZhangJiangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51265,
            "name": "周家渡街道",
            "nameEN": "ZhouJiaDuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51280,
            "name": "周浦镇",
            "nameEN": "ZhouPuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51274,
            "name": "祝桥镇",
            "nameEN": "ZhuQiaoZhen"
        }
    ],
    8881: [
        {
            "classType": "geoDto",
            "id": 51187,
            "name": "曹杨新村街道",
            "nameEN": "CaoYangXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51182,
            "name": "甘泉路街道",
            "nameEN": "GanQuanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51181,
            "name": "石泉路街道",
            "nameEN": "ShiQuanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51186,
            "name": "桃浦镇",
            "nameEN": "TaoPuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51183,
            "name": "宜川路街道",
            "nameEN": "YiChuanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51180,
            "name": "长风新村街道",
            "nameEN": "ZhangFengXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51179,
            "name": "长寿路街道",
            "nameEN": "ZhangShouLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51185,
            "name": "长征镇",
            "nameEN": "ZhangZhengZhen"
        },
        {
            "classType": "geoDto",
            "id": 51184,
            "name": "真如镇",
            "nameEN": "ZhenRuZhen"
        }
    ],
    8886: [
        {
            "classType": "geoDto",
            "id": 51213,
            "name": "白鹤镇",
            "nameEN": "BaiHeZhen"
        },
        {
            "classType": "geoDto",
            "id": 51217,
            "name": "华新镇",
            "nameEN": "HuaXinZhen"
        },
        {
            "classType": "geoDto",
            "id": 51214,
            "name": "金泽镇",
            "nameEN": "JinZeZhen"
        },
        {
            "classType": "geoDto",
            "id": 51211,
            "name": "练塘镇",
            "nameEN": "LianTangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51220,
            "name": "夏阳街道",
            "nameEN": "XiaYangJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51218,
            "name": "香花桥街道",
            "nameEN": "XiangHuaQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51216,
            "name": "徐泾镇",
            "nameEN": "XuJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51219,
            "name": "盈浦街道",
            "nameEN": "YingPuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51215,
            "name": "赵巷镇",
            "nameEN": "ZhaoXiangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51212,
            "name": "重固镇",
            "nameEN": "ZhongGuZhen"
        },
        {
            "classType": "geoDto",
            "id": 51210,
            "name": "朱家角镇",
            "nameEN": "ZhuJiaJiaoZhen"
        }
    ],
    8887: [
        {
            "classType": "geoDto",
            "id": 51231,
            "name": "车墩镇",
            "nameEN": "CheDunZhen"
        },
        {
            "classType": "geoDto",
            "id": 51229,
            "name": "洞泾镇",
            "nameEN": "DongJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51234,
            "name": "方松街道",
            "nameEN": "FangSongJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51230,
            "name": "九亭镇",
            "nameEN": "JiuTingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51228,
            "name": "泖港镇",
            "nameEN": "MaoGangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51222,
            "name": "上海松江出口加工区",
            "nameEN": "ShangHaiSongJiangChuKouJiaGongQu"
        },
        {
            "classType": "geoDto",
            "id": 51221,
            "name": "佘山度假区",
            "nameEN": "SheShanDuJiaQu"
        },
        {
            "classType": "geoDto",
            "id": 51224,
            "name": "佘山镇",
            "nameEN": "SheShanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51226,
            "name": "石湖荡镇",
            "nameEN": "ShiHuDangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51225,
            "name": "泗泾镇",
            "nameEN": "SiJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51223,
            "name": "松江工业区",
            "nameEN": "SongJiangGongYeQu"
        },
        {
            "classType": "geoDto",
            "id": 51238,
            "name": "小昆山镇",
            "nameEN": "XiaoKunShanZhen"
        },
        {
            "classType": "geoDto",
            "id": 51227,
            "name": "新浜镇",
            "nameEN": "XinBangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51232,
            "name": "新桥镇",
            "nameEN": "XinQiaoZhen"
        },
        {
            "classType": "geoDto",
            "id": 51237,
            "name": "叶榭镇",
            "nameEN": "YeXieZhen"
        },
        {
            "classType": "geoDto",
            "id": 51235,
            "name": "永丰街道",
            "nameEN": "YongFengJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51233,
            "name": "岳阳街道",
            "nameEN": "YueYangJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51236,
            "name": "中山街道",
            "nameEN": "ZhongShanJieDao"
        }
    ],
    8878: [
        {
            "classType": "geoDto",
            "id": 51152,
            "name": "漕河泾街道",
            "nameEN": "CaoHeJingJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51151,
            "name": "漕河泾新兴技术开发区",
            "nameEN": "CaoHeJingXinXingJiShuKaiFaQu"
        },
        {
            "classType": "geoDto",
            "id": 51158,
            "name": "枫林路街道",
            "nameEN": "FengLinLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51154,
            "name": "虹梅路街道",
            "nameEN": "HongMeiLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51161,
            "name": "湖南路街道",
            "nameEN": "HuNanLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51150,
            "name": "华泾镇",
            "nameEN": "HuaJingZhen"
        },
        {
            "classType": "geoDto",
            "id": 51155,
            "name": "康健新村街道",
            "nameEN": "KangJianXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51157,
            "name": "凌云路街道",
            "nameEN": "LingYunLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51153,
            "name": "龙华街道",
            "nameEN": "LongHuaJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51160,
            "name": "田林街道",
            "nameEN": "TianLinJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51163,
            "name": "天平路街道",
            "nameEN": "TianPingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51162,
            "name": "斜土路街道",
            "nameEN": "XieTuLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51156,
            "name": "徐家汇街道",
            "nameEN": "XuJiaHuiJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51159,
            "name": "长桥街道",
            "nameEN": "ZhangQiaoJieDao"
        }
    ],
    8877: [
        {
            "classType": "geoDto",
            "id": 51147,
            "name": "大桥街道",
            "nameEN": "DaQiaoJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51138,
            "name": "定海路街道",
            "nameEN": "DingHaiLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51140,
            "name": "江浦路街道",
            "nameEN": "JiangPuLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51142,
            "name": "控江路街道",
            "nameEN": "KongJiangLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51139,
            "name": "平凉路街道",
            "nameEN": "PingLiangLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51141,
            "name": "四平路街道",
            "nameEN": "SiPingLuJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51146,
            "name": "五角场街道",
            "nameEN": "WuJiaoChangJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51149,
            "name": "五角场镇",
            "nameEN": "WuJiaoChangZhen"
        },
        {
            "classType": "geoDto",
            "id": 51145,
            "name": "新江湾城街道",
            "nameEN": "XinJiangWanChengJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51144,
            "name": "延吉新村街道",
            "nameEN": "YanJiXinCunJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51148,
            "name": "殷行街道",
            "nameEN": "YinXingJieDao"
        },
        {
            "classType": "geoDto",
            "id": 51143,
            "name": "长白新村街道",
            "nameEN": "ZhangBaiXinCunJieDao"
        }
    ]
}