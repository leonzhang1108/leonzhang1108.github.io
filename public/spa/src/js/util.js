// eshipping common module
// fix ie

// define(function () {
// })

// init ui namespace
_.delegate = function (callback, scope, args) {
    var method = callback;
    return function () {
        var callArgs = args || arguments
        callArgs = Array.prototype.slice.call(arguments, 0);
        callArgs = callArgs.concat(args);
        return method.apply(scope || window, callArgs)
    }
}
_.getRandomId = function (min, max) {
    var randomId = _.getRandomNumber(min, max)
    return document.querySelector('#es-' + randomId) ? _.getRandomId(min, max) : randomId
}
_.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

_.realArray = function (array) {
    try {
        return Array.prototype.slice.call(array)
    } catch (e) {
        var ret = [], i = 0, len = array.length
        for (; i < len; i++) {
            ret[i] = (array[i])
        }
        return ret
    }
}

_.initConfirm = function (config) {

    var id = config.id ? ('#' + config.id) : '#es-modal'
    var labelId = config.labelId ? ('#' + config.labelId) : '#es-modal-label'

    $(id).modal({
        keyboard: true
    })

    $(id).find('.modal-dialog').css({
        width: config.width || '1000px'
    })

    //label
    $(id).find(labelId).html(config.label || 'label')

    //content
    $(id).find('.modal-body').html(config.content)
    if (config.beforeShow) config.beforeShow()

    //btn msg
    $(id).find('.positive').html(config.positiveMsg || '确定')
    $(id).find('.negative').html(config.negativeMsg || '取消')

    //positive btn
    $(id).find('.positive').unbind('click').on('click', function () {
        if (!config.success || config.success()) {
            $(id).modal('hide')
        }
    })

    //negative btn
    $(id).find('.negative').unbind('click').on('click', function () {
        if (config.fail) config.fail()
        $(id).modal('hide')
    })

    //popup move
    $(id + ' .modal-header').unbind('mousedown').bind("mousedown", function (event) {
        var offset_x = $(id + ' .modal-content')[0].offsetLeft
        var offset_y = $(id + ' .modal-content')[0].offsetTop
        var offset_width = $(id + ' .modal-content')[0].offsetWidth
        var offset_height = $(id + ' .modal-content')[0].offsetHeight
        var mouse_x = event.pageX
        var mouse_y = event.pageY
        var width = document.documentElement.clientWidth
        var height = document.documentElement.clientHeight
        var halfWidth = (width - offset_width) / 2
        $(document).unbind('mousemove').bind("mousemove", function (ev) {
            var _x = ev.pageX - mouse_x
            var _y = ev.pageY - mouse_y
            var now_x = (offset_x + _x )
            var now_y = (offset_y + _y )
            if (now_x <= -halfWidth) {
                now_x = -halfWidth
            } else if (now_x >= halfWidth) {
                now_x = halfWidth
            }

            if (now_y <= -30) {
                now_y = -30
            } else if (now_y >= height - offset_height - 30) {
                now_y = height - offset_height - 30
            }
            $(id + ' .modal-content').css({
                top: now_y + "px",
                left: now_x + "px"
            })
        })
    })
    $(document).unbind('mouseup').bind("mouseup", function () {
        $(document).unbind("mousemove");
    })
    $(id + ' .modal-content').css({
        left: 0
    })

    $(window).resize(id, _.resizeModal)
    $(id).on('shown.bs.modal', function () {
        _.resizeModal(id)
    })
}

_.pageAlert = function(config) {
    $('.alert').remove()
    var template = Handlebars.compile($('#page-alert-template').html())
    $('#wrapper').append(template(config))
}

_.scroll_to_top = function (top, selector, second) {
    $(selector || "html, body").animate({
        scrollTop: top
    }, second || "fast")
}
_.resizeModal = function (res) {
    var id = res.data || res
    var screenHeight = document.documentElement.clientHeight
    var modalHeight = $(id + ' .modal-content').height()
    $(id + ' .modal-content').css({
        top: (screenHeight - modalHeight) / 2 - 30
    })
}

_.pySegSort = function (arr, empty, prop) {
    if (!String.prototype.localeCompare) return null
    var letters = "*abcdefghjklmnopqrstwxyz".split('')
    var zh = "阿把差大额发噶哈级卡啦吗那哦爬器然啥他哇西呀咋".split('')
    var res = []
    var curr
    var objOrString = function (value) {
        switch (Object.prototype.toString.call(value)) {
            case '[object String]':
                return value.trim()
            case '[object Object]':
                return value[prop].trim()
            default:
                return value
        }
    }
    $.each(letters, function (i, letter) {
        curr = {
            letter: letter,
            data: []
        }
        $.each(arr, function (_, item) {
            var firstLetter = item.name.trim().charAt(0)
            if ((!zh[i - 1] || zh[i - 1].localeCompare(objOrString(firstLetter)) <= 0) && (zh[i] ? (objOrString(firstLetter).localeCompare(zh[i]) == -1) : true)) {
                curr.data.push(item)
            }
        })
        if (empty || curr.data.length) {
            res.push(curr)
            curr.data.sort(function (a, b) {
                return objOrString(a).localeCompare(objOrString(b))
            })
        }
    })
    return res
}


// return
// (function () {
// 	if (!window.console) {
// 		this.console = {
// 			log: function () { },
// 			debug: function () { },
// 			error: function () { }
// 		}
// 	}
//
// 	if (!Array.prototype.indexOf) {
// 		Array.prototype.indexOf = function (elt /*, from*/) {
// 			var len = this.length >>> 0;
//
// 			var from = Number(arguments[1]) || 0;
// 			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
// 			if (from < 0) {
// 				from += len;
// 			}
// 			for (; from < len; from++) {
// 				if (from in this && this[from] === elt) {
// 					return from;
// 				}
// 			}
// 			return -1;
// 		};
// 	}
// 	if (typeof String.prototype.trim !== 'function') {
// 		String.prototype.trim = function () {
// 			return this.replace(/^\s+|\s+$/g, '')
// 		}
// 	}
// 	jQuery.extend({
// 		stringify: function stringify(obj) {
// 			if ("JSON" in window) {
// 				return JSON.stringify(obj);
// 			}
//
// 			var t = typeof (obj);
// 			if (t != "object" || obj === null) {
// 				if (t == "string") {
// 					obj = '"' + obj + '"';
// 				}
// 				return String(obj);
// 			} else {
// 				var n, v, json = [],
// 					arr = (obj && obj.constructor == Array);
//
// 				for (n in obj) {
// 					v = obj[n];
// 					t = typeof (v);
// 					if (obj.hasOwnProperty(n)) {
// 						if (t == "string") {
// 							v = '"' + v + '"';
// 						} else if (t == "object" && v !== null) {
// 							v = jQuery.stringify(v);
// 						}
//
// 						json.push((arr ? "" : '"' + n + '":') + String(
// 							v));
// 					}
// 				}
//
// 				return (arr ? "[" : "{") + String(json) + (arr ? "]" :
// 					"}");
// 			}
// 		}
// 	});
//
// 	Date.prototype.addDate = function (d) {
// 		this.setDate(this.getDate() + d)
// 	}
// })()
//
// if (!window.ES) {
// 	window.ES = {}
// }
// ES.msg = {
// 	get: function () {
// 		return ''
// 	}
// }
// ES.client_height = document.documentElement.clientHeight
// ES.client_width = document.documentElement.clientWidth
// ES.deploy = '${DEPLOY}'
// ES.tracking = {
// 	url: '${TRACKINGURL}',
// 	key: '${TRACKINGKEY}'
// }
// ES.shippingONE = '${OPERATIONURL}'
// ES.get = function (selector) {
// 	return $(selector)
// }
// ES.delegate = function (callback, scope, args) {
// 	var method = callback;
// 	return function () {
// 		var callArgs = args || arguments
// 		callArgs = Array.prototype.slice.call(arguments, 0);
// 		callArgs = callArgs.concat(args);
// 		return method.apply(scope || window, callArgs)
// 	}
// }
// ES.each = $.each
// ES.stringify = $.stringify
// ES.parse = $.parseJSON
// ES.event = {}
// ES.event.listen = function (id, evt, callback) {
// 	if (!this[id]) {
// 		this[id] = {}
// 	}
// 	this[id][evt] = callback
// }
// ES.event.fire = function (id, evt, param) {
// 	if (!this[id]) {
// 		return false;
// 	}
// 	if (!this[id][evt]) {
// 		return false;
// 	}
// 	this[id][evt](param)
// }
//
//
//
//
// ES.util = {}
// ES.util.clone = function (obj) { return $.parseJSON($.stringify(obj)) }
// ES.util.set_cookie = function (cname, cvalue, exdays) {
// 	if (!exdays) {
// 		exdays = 365
// 	}
// 	$.cookie(cname, cvalue, {
// 		expires: exdays,
// 		path: '/'
// 	})
// }
// ES.util.clear_cookie = function (cname) {
// 	$.removeCookie(cname)
// }
//
// ES.util.get_cookie = function (cname) {
// 	return $.cookie(cname)
// }
// ES.util.new_date = function (d) {
// 	if (!d) {
// 		d = new Date()
// 	}
// 	d.setHours(0, 0, 0, 0)
// 	return d
// }
// ES.util.date_to_string = function (d, format, hasTime) {
// 	if (!format) {
// 		if (hasTime) {
// 			format = '{{y}}-{{m}}-{{d}} {{hour}}:{{min}}:{{sec}}'
// 		} else {
// 			format = '{{y}}-{{m}}-{{d}}'
// 		}
// 	}
// 	var curr_date = d.getDate();
// 	if (curr_date < 10) {
// 		curr_date = '0' + curr_date
// 	}
// 	var curr_month = d.getMonth() + 1; //Months are zero based
// 	if (curr_month < 10) {
// 		curr_month = '0' + curr_month
// 	}
// 	var curr_year = d.getFullYear();
// 	if (hasTime) {
// 		return ES.util.format_string(format, {
// 			y: curr_year,
// 			m: curr_month,
// 			d: curr_date,
// 			hour: '00',
// 			min: '00',
// 			sec: '00'
// 		})
// 	} else {
// 		return ES.util.format_string(format, {
// 			y: curr_year,
// 			m: curr_month,
// 			d: curr_date
// 		})
// 	}
//
// }
// ES.util.get_current_date = function () {
// 	var now = new Date();
//     var year = now.getFullYear();       //年
//     var month = now.getMonth() + 1;     //月
//     var day = now.getDate();            //日
//     var hh = now.getHours();            //时
//     var mm = now.getMinutes();          //分
//     var ss = now.getSeconds();            //秒
//     var clock = year + "-";
//     if (month < 10) {
// 		clock += "0";
//     }
//     clock += month + "-";
//     if (day < 10) {
// 		clock += "0";
//     }
//     clock += day + " ";
//     if (hh < 10) {
// 		clock += "0";
//     }
//     clock += hh + ":";
//     if (mm < 10) {
// 		clock += '0';
//     }
//     clock += mm + ":";
//     if (ss < 10) {
// 		clock += '0';
//     }
//     clock += ss;
//     return (clock);
// }
// ES.util.compare_two_dateStr = function (str1, str2) {
// 	var date1 = new Date(str1)
// 	var date2 = new Date(str2)
// 	return date1.getTime() >= date2.getTime()
// }
// ES.util.judge_date_interval = function (minDate, maxDate, judgeStr, isDate) {
// 	if (!judgeStr) {
// 		return false
// 	}
// 	var date1, date2, judgeDate = isDate ? ES.util.new_date(new Date(judgeStr)).getTime() : new Date(judgeStr).getTime()
// 	if (minDate && maxDate) {
// 		date1 = minDate.getTime()
// 		date2 = maxDate.getTime()
// 		//date1 date2 排序
// 		var date = date1
// 		if (date1 > date2) {
// 			date1 = date2
// 			date2 = date
// 		}
// 		if (judgeDate < date1 || judgeDate > date2) {
// 			return false
// 		}
// 	} else if (minDate) {
// 		date1 = minDate.getTime()
// 		if (judgeDate < date1) {
// 			return false
// 		}
// 	} else if (maxDate) {
// 		date2 = maxDate.getTime()
// 		if (judgeDate > date2) {
// 			return false
// 		}
// 	}
// 	return true
// }
// ES.util.escapeHtml = function (str) {
// 	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
// 		/>/g,
// 		'&gt;');
// }
// ES.util.isEmptyObject = function (obj) {
// 	var isEmpty = true
// 	for (var i in obj) {
// 		if (obj.hasOwnProperty(i)) {
// 			isEmpty = false
// 			break
// 		}
// 	}
// 	return isEmpty;
// }
// ES.util.isEmail = function (str) {
// 	var reg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
// 	return reg.test(str)
// }
// ES.util.isPhone = function (str) {
// 	var reg = /^(\d{3,4}-)?\d{6,8}(-\d{3})?$/;
// 	return reg.test(str)
// }
// ES.util.isMobile = function (str) {
// 	var reg = /^\S*(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|6|8|9]|14[5|7]|17[0|6|7|8]|18[1|2|3|4|5]|187)\d{8}$/;
// 	return reg.test(str)
// }
// ES.util.isPassword = function (str) {
// 	var reg = /^[\s\S]{6,20}$/;
// 	return reg.test(str)
// }
// ES.util.isZipcode = function (str) {
// 	var reg = /^[1-9][0-9]{5}$/;
// 	return reg.test(str)
// }
// ES.util.exceptChinese = function (str) {
// 	var reg = /^[^\u4e00-\u9fa5]*$/;
// 	return reg.test(str);
// }
// ES.util.english = function (str) {
// 	var reg = /^([A-Za-z0-9 ,.']+\s?)*[A-Za-z0-9 ,.']/
// 	return reg.test(str);
// }
// ES.util.chinese = function (str) {
// 	var reg = /[\u4e00-\u9fa5]/;
// 	return reg.test(str);
// }
// ES.util.isNatureNumber = function (str) {
// 	var reg = /^[0-9]*[1-9][0-9]*$/;
// 	return reg.test(str);
// }
// ES.util.isFloatNumThree = function (str) {
// 	var reg = /^[0-9]*.[0-9]{3}$/;
// 	return reg.test(str);
// }
// ES.util.isFloatNumTwo = function (str) {
// 	var reg = /^[0-9]*.[0-9]{2}$/;
// 	return reg.test(str);
// }
// ES.util.isIDCardNumber = function (str) {
// 	var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
// 	return reg.test(str);
// }
// ES.util.isPlateNumber = function (str) {
// 	var reg = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
// 	return reg.test(str);
// }
//
// /************中英文及数字校验通用*****************/
// ES.util.validation_chinese = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.chinese(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_chinese_fail)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_except_chinese = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.exceptChinese(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_exceptChinese_fail)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_english = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.english(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_exceptChinese_fail)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_is_nature_number = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		if (es_input.get_value() * 1 < 0) {
// 			es_input.set_msg(ES.msg.more_than_zero)
// 			return false;
// 		}
// 		var result = ES.util.isNatureNumber(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_isNatureNumber_fail)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_is_float_num_three = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		if (es_input.get_value() * 1 < 0) {
// 			es_input.set_msg(ES.msg.more_than_zero)
// 			return false;
// 		}
// 		var val = es_input.get_value().toString()
// 		if (val.substring(val.lastIndexOf(".")).length < 4) {
// 			val = (es_input.get_value() * 1).toFixed(3)
// 		}
// 		var result = ES.util.isFloatNumThree(val)
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_isFloatNumThree_fail)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_is_float_num_two = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		if (es_input.get_value() * 1 < 0) {
// 			es_input.set_msg(ES.msg.more_than_zero)
// 			return false;
// 		}
// 		var val = es_input.get_value().toString()
// 		if (val.substring(val.lastIndexOf(".")).length < 3) {
// 			val = (es_input.get_value() * 1).toFixed(2)
// 		}
// 		var result = ES.util.isFloatNumTwo(val)
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_isFloatNumTwo_fail)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_is_number = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = !isNaN(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.error_regex)
// 		}
// 		return result;
// 	}
// 	return true;
// }
// ES.util.validation_id_card_number = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.isIDCardNumber(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_id_card_number)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_plate_number = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.isPlateNumber(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.reg_plate_number)
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_phone = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.isPhone(es_input.get_value()) || ES.util.isMobile(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.get('reg_phone_fail'))
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_mobile_phone = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.isMobile(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.get('reg_mobile_fail'))
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validation_contact_phone = function (es_input) {
// 	if (es_input.get_value() != '') {
// 		var result = ES.util.isPhone(es_input.get_value())
// 		if (!result) {
// 			es_input.set_msg(ES.msg.get('reg_phone_fail'))
// 		}
// 		return result;
// 	}
// 	return true
// }
// ES.util.validate_legal_user = function (es_input) {
// 	var str = es_input.get_value()
// 	if (str != '') {
// 		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
// 		for (var i = 0; i < str.length; i++) {
// 			if (str.substr(i, 1).replace(pattern, '') == '') {
// 				es_input.set_msg(ES.msg.reg_legal_user)
// 				return false
// 			}
// 		}
// 	}
// 	return true
// }
// ES.util.verifyContainerCode = function (es_input) {
// 	var strCode = es_input.get_value()
// 	var Charcode = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ";
//     var regex = /^[A-Z]{4}\d{7}$/;
// 	if (!regex.test(strCode)) return false;
// 	var num = 0;
// 	for (var i = 0; i < 10; i++) {
// 		var idx = Charcode.indexOf(strCode[i]);
// 		idx = idx * Math.pow(2, i);
// 		num += idx;
// 	}
// 	num = (num % 11) % 10;
// 	return parseInt(strCode[10]) == num;
// }
//
// ES.util.validate_max_len = function (es_input, max_len) {
// 	var val = es_input.get_value()
// 	var len = 0
// 	if (typeof val != "string") {
// 		val += "";
// 	}
// 	len = val.replace(/[^\x00-\xff]/g, "01").length
// 	if (len > max_len) {
// 		es_input.set_msg(ES.msg.get('more_len_validate', { arg: max_len }))
// 		return false
// 	}
// 	return true
// }
//
// ES.util.escape = function (str) {
// 	var out = ""
// 	var length = str.length
// 	for (var i = 0; i < length; i++) {
// 		out += str.charCodeAt(i) - 23
// 	}
// 	return out
// }
//
// ES.util.unescape = function (str) {
// 	var out = ""
// 	var length = str.length
// 	for (var i = 0; i < length; i += 2) {
// 		var t = parseInt(str.substr(i, [2])) + 23
// 		t = decodeURI('%' + t.toString(16))
// 		out += t
// 	}
// 	return out
// }
//
// ES.util.xssunescape = function (str) {
// 	return ES.get('<textarea />').html(str).text()
// }
//
// ES.util.ajax = $.ajax
//
// ES.util.ajax_get = function (url, param, callback, scope, arg, error) {
// 	url = ES.deploy + '/ws' + url + '${EXT}'
// 	$.ajax({
// 		url: url,
// 		cache: false,
// 		context: scope,
// 		dataType: 'json',
// 		data: param,
// 		success: function (res) {
// 			if (res.message) {
// 				ES.ui.alert({
// 					key: res.message,
// 					type: 'error'
// 				})
// 				if (res.stackTrace) {
// 					console.log(res.stackTrace);
// 				}
//
// 			} else {
// 				callback(res, arg)
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else if (key == ES.consts.tips.INVALID_ORDER ||
// 				key == ES.consts.tips.INVALID_ORDER_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						if (error) {
// 							error()
// 						} else {
// 							ES.util.redirect('view-order.html')
// 						}
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						if (error) {
// 							error()
// 						}
// 					}
// 				})
// 			}
// 		}
// 	})
// }
// ES.util.ajax_post = function (url, param, callback) {
// 	url = ES.deploy + '/ws' + url
// 	$.ajax({
// 		type: "POST",
// 		url: url,
// 		data: param,
// 		headers: {
// 			'X-Requested-By': 'eshipping'
// 		},
// 		success: function (res) {
// 			if (res.message) {
// 				ES.ui.alert({
// 					key: res.message,
// 					type: 'error'
// 				})
// 				if (res.stackTrace) {
// 					console.log(res.stackTrace);
// 				}
// 			} else {
// 				callback(res)
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error'
// 				})
// 			}
// 		}
// 	})
// }
// ES.util.ajax_submit = function (url, param, callback, error) {
// 	url = ES.deploy + '/ws' + url
// 	$.ajax({
// 		type: 'POST',
// 		url: url,
// 		data: ES.stringify(param),
// 		cache: false,
// 		contentType: 'application/json; charset=UTF-8',
// 		processData: false,
// 		headers: {
// 			'X-Requested-By': 'eshipping'
// 		},
// 		success: function (res) {
// 			if (res.message) {
// 				ES.ui.alert({
// 					key: res.message,
// 					type: 'error'
// 				})
// 				if (res.stackTrace) {
// 					console.log(res.stackTrace);
// 				}
// 			} else {
// 				callback(res)
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						if (error) {
// 							error()
// 						}
// 					}
// 				})
// 			}
//
// 		}
// 	});
// }
//
// ES.util.ajax_download = function (url, param, callback, error, request) {
// 	if (request) {
// 		url = ES.deploy + '/ws-' + request + url + '${EXT}'
// 	} else {
// 		url = ES.deploy + '/ws' + url + '${EXT}'
// 	}
// 	$.ajax({
// 		url: url,
// 		cache: false,
// 		dataType: 'text',
// 		data: param,
// 		success: function (res) {
// 			callback()
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			var responseJSON = JSON.parse(res.responseText)
// 			if (responseJSON && responseJSON.message) {
// 				key = responseJSON.message
// 			} else if (responseJSON && $.isArray(responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						if (error) {
// 							error()
// 						}
// 					}
// 				})
// 			}
// 		}
// 	})
// }
//
// ES.util.cross_get = function (url, param, callback, scope) {
// 	$.ajax({
// 		url: url,
// 		cache: false,
// 		context: scope,
// 		jsonp: "callback",
// 		dataType: "jsonp",
// 		data: param,
// 		success: function (res) {
// 			if (res.message) {
// 				ES.ui.alert({
// 					key: res.message,
// 					type: 'error'
// 				})
// 				if (res.stackTrace) {
// 					console.log(res.stackTrace);
// 				}
// 			} else {
// 				callback(res)
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error'
// 				})
// 			}
// 		}
// 	})
// }
// ES.util.cross_post = function (url, param, callback) {
// 	$.ajax({
// 		type: "POST",
// 		url: url,
// 		data: param,
// 		headers: {
// 			'X-Requested-By': 'eshipping'
// 		},
// 		success: function (res) {
// 			if (res.message) {
// 				ES.ui.alert({
// 					key: res.message,
// 					type: 'error'
// 				})
// 				if (res.stackTrace) {
// 					console.log(res.stackTrace);
// 				}
// 			} else {
// 				callback(res)
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error'
// 				})
// 			}
// 		}
// 	})
// }
// ES.util.cross_submit = function (url, param, callback) {
// 	$.ajax({
// 		type: 'POST',
// 		url: url,
// 		data: ES.stringify(param),
// 		cache: false,
// 		contentType: 'application/json; charset=UTF-8',
// 		processData: false,
// 		headers: {
// 			'X-Requested-By': 'eshipping'
// 		},
// 		success: function (res) {
// 			if (res.message) {
// 				ES.ui.alert({
// 					key: res.message,
// 					type: 'error'
// 				})
// 				if (res.stackTrace) {
// 					console.log(res.stackTrace);
// 				}
// 			} else {
// 				callback(res)
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error'
// 				})
// 			}
//
// 		}
// 	});
// }
//
// ES.util.ajax_form_post = function (url, form, callback) {
// 	var form = ES.get(form)
// 	form.attr('action', ES.deploy + '/ws' + url)
// 	form.ajaxSubmit({
// 		dataType: 'json',
// 		headers: {
// 			'X-Requested-With': 'eshipping'
// 		},
// 		success: function (res) {
// 			ES.ui.unmask();
// 			if (res.success) {
// 				ES.ui.alert({
// 					key: 'upload_success',
// 					auto_hide: false,
// 					after_callback: function () {
// 						if (callback) {
// 							callback()
// 						}
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					arg: {
//                         msg: res.message
//                     },
// 					key: 'upload_failure',
// 					type: 'error',
// 					auto_hide: false
// 				})
// 			}
// 		},
// 		error: function (res) {
// 			if (res.status == 408) {
// 				ES.ui.alert({
// 					key: 'network_error_key',
// 					type: 'error'
// 				})
// 				return
// 			}
// 			var key = 'ajax_failed'
// 			if (res.responseJSON && res.responseJSON.message) {
// 				key = res.responseJSON.message
// 			} else if (res.responseJSON && $.isArray(res.responseJSON)) {
// 				var out = []
// 				ES.each(res.responseJSON, function (_, v) {
// 					out.push(v.message)
// 				})
// 				key = out.join('<br>')
// 			}
// 			ES.ui.unmask()
// 			if (key == ES.consts.tips.LOGIN_FIRST ||
// 				key == ES.consts.tips.LOGIN_FIRST_EN) {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				})
// 			} else {
// 				ES.ui.alert({
// 					key: key,
// 					type: 'error'
// 				})
// 			}
// 		}
// 	})
// }
// ES.util.scroll_to_top = function (top, obj, speed) {
// 	$(obj || 'html, body').animate({
// 		scrollTop: top
// 	}, speed || 'fast');
// }
// ES.util.format_string = function (tpl, map) {
// 	var s = tpl
// 	for (var i in map) {
// 		if (map.hasOwnProperty(i)) {
// 			var reg = new RegExp("\\{{" + i + "\\}}", "gm")
// 			s = s.replace(reg, map[i])
// 		}
// 	}
// 	return s
// }
// ES.util.merge = function () {
// 	var inner_merge = function (obj1, obj2) {
// 		for (var key in obj2) {
// 			if (obj2.hasOwnProperty(key)) {
// 				obj1[key] = obj2[key]
// 			}
// 		}
// 		return obj1
// 	}
// 	var ret = {}
// 	for (var i = 0, l = arguments.length; i < l; i++) {
// 		inner_merge(ret, arguments[i])
// 	}
// 	return ret
// }
// ES.util.query_all_param = function () {
// 	var url = location.search; //  location.search; //获取url中"?"符后的字串
// 	var theRequest = new Object();
// 	if (url.indexOf("?") != -1) {
// 		var str = url.substr(1);
// 		var strs = str.split("&");
// 		for (var i = 0; i < strs.length; i++) {
// 			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
// 		}
// 	}
// 	return theRequest;
// }
// ES.util.query_string = function (key, def) {
// 	var svalue = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"))
// 	var ret = svalue ? svalue[1] : svalue
// 	if (def != null && def != undefined) {
// 		if (!ret) {
// 			return def
// 		}
// 	}
// 	return ret
// }
// ES.util.refresh = function () {
// 	window.location.reload()
// }
// ES.util.redirect = function (path, new_window) {
// 	var u = 'http://'
// 	for (var i = 0; i < ES.secures.length; i++) {
// 		if (path.indexOf(ES.secures[i]) >= 0) {
// 			u = 'https://'
// 		}
// 	}
// 	u = u + window.location.host + ES.deploy + ES.context + path
// 	if (new_window) {
// 		window.open(u)
// 	} else {
// 		window.location.href = u
// 	}
// }
// ES.util.forwardredirect = function (path, back) {
// 	if (!back) {
// 		back = window.location.pathname + window.location.search
// 	}
// 	var sep = '?'
// 	if (path.indexOf('?') >= 0) {
// 		sep = '&'
// 	}
// 	ES.util.redirect(path + sep + 'back_url=' + encodeURIComponent(back))
// }
// ES.util.backdirect = function (path, isAnsteelUser) {
// 	if (!path) {
// 		if (isAnsteelUser) {
// 			path = "../ansteel/cargo-general.html"
// 		} else {
// 			path = "../index.html"
// 		}
// 	}
// 	var back = ES.util.query_string('back_url')
// 	if (back) {
// 		window.location.href = decodeURIComponent(back)
// 	} else {
// 		ES.util.redirect(path)
// 	}
// }
// ES.util.append_in_new_window = function (html) {
// 	var newwin = window.open('', '', '');
// 	newwin.opener = null;
// 	newwin.document.write(html);
// 	newwin.document.close();
// }
// ES.util.load_image = function (url, callback) {
// 	var img = new Image()
// 	img.src = url
//
// 	if (img.complete) {
// 		callback.call(img)
// 		return
// 	}
//
// 	var check = function () {
// 		if (img.width > 0 || img.height > 0) {
// 			clearInterval(set)
// 			callback.call(img)
// 		}
// 	}
// 	var set = setInterval(check, 40)
// }
//
// ES.tpl = {
// 	'table_tpl': '<table><tbody>{{#if title}} <tr {{#if cls}}class="{{cls}}"{{/if}}>{{#each title}}<th {{#if cls}}class="{{cls}}"{{/if}}>{{{display}}}</th>{{/each}}</tr>{{/if}}{{#if tr}} {{#each tr}}<tr {{#if cls}}class="{{cls}}"{{/if}} data-value="{{id}}">{{#each td}}<td {{#if cls}}class="{{cls}}"{{/if}}>{{{display}}}</td>{{/each}}</tr>{{/each}}{{/if}}</tbody></table>',
// 	'table_tpl_sed': '<table><tbody>{{#if title}} <tr {{#if cls}}class="{{cls}}"{{/if}}>{{#each title}}<th {{#if cls}}class="{{cls}}"{{/if}}>{{{display}}}</th>{{/each}}</tr>{{/if}}{{#if tr}} {{#each tr}}<tr {{#if cls}}class="{{cls}}"{{/if}} data-value="{{id}}">{{#each td}}<td {{#if cls}}class="{{cls}}"{{/if}}>{{{display}}}</td>{{/each}}</tr>{{/each}}{{/if}}</tbody>{{#if foot}}<tfoot><tr>{{#each foot}}<td {{#if colspan}}colspan="{{colspan}}"{{/if}} {{#if cls}}class="{{cls}}"{{/if}}>{{{display}}}</td>{{/each}}</tr></tfoot>{{/if}}</table>',
// 	'icon_tpl': '<i class="fa {{cls}}"></i>',
// 	'label_tpl': '<label class="input-label" for="{{id}}">{{display}}</label>',
// 	'option_tpl': '<option value="{{value}}">{{display}}</option>',
// 	'tab_h_tpl': '<div class="tab-h">' +
// 	'<div class="tab-h-tabs">' +
// 	'{{#each tabs}}' +
// 	'<div class="tab {{cls}}" data-value="{{@index}}" >{{{display}}}</div>' +
// 	'{{/each}}' +
// 	'</div>' +
// 	'<div class="tab-h-panels">' +
// 	'{{#each panels}}' +
// 	'<div class="panel">{{{html}}}</div>' +
// 	'{{/each}}' +
// 	'</div>' +
// 	'</div>',
// 	'tab_v_tpl': '<div class="tab-v">' +
// 	'<div class="tab-v-tabs">' +
// 	'{{#each tabs}}' +
// 	'<div class="tab {{cls}}" data-value="{{value}}" data-index="{{@index}}" >{{{display}}}</div>' +
// 	'{{/each}}' +
// 	'</div>' +
// 	'<div class="tab-v-panels">' +
// 	'{{#each panels}}' +
// 	'<div class="panel">{{{html}}}</div>' +
// 	'{{/each}}' +
// 	'</div>' +
// 	'</div>',
// 	'date_selector': '<div class="date-selector">' +
// 	'	<ul>' +
// 	'		{{#each date}}' +
// 	'		<li data-parent="{{parent}}" data-value="{{value}}" class="date-selector-item {{cls}}" style="{{style}}">' +
// 	'			<div class="date-selector-content">{{{content}}}</div>' +
// 	'			<div class="date-selector-desc">{{description}}</div>' +
// 	'		</li>' +
// 	'		{{/each}}' +
// 	'	</ul>' +
// 	'</div>',
// 	'order_item_tpl': '{{#if orders}}{{#each orders}}' +
// 	'<table class="order-item" cellpadding="0" cellspacing="0">' +
// 	'	<tbody>' +
// 	'		<tr class="order-header">' +
// 	'			<td class="col-20 order-no"><span class="order-type {{orderType orderType}}"></span>单号：<a href="order-detail.html?id={{id}}">{{orderNumber}}</a> ' +
// 	'			{{#if waitingCharges}}' +
// 	'			<a href="javascript:void(0)" title="你有待确认的费用" class="show-charges"><i class="fa fa-info-circle"></i></a>' +
// 	'			{{/if}}' +
// 	'			</td>' +
// 	'			<td class="" colspan="2">承运商：<a class="order-seller" href="javascript:void(0)">{{seller}}</a>' +
// 	'			<div class="order-sj-popup"> <span class="arrow"></span><div class="popup-cont"><p>联&nbsp;&nbsp;系&nbsp;&nbsp;人：<b>{{contactPerson}}</b></p><p>联系电话：<b>{{contactPhone}}</b></p><p>联系地址：<b>{{address}}</b></p></div></div>' +
// 	'			</td>' +
// 	'			<td class="order-date" colspan="2">下单时间：<b>{{creationDate}}</b>' +
// 	'			</td>' +
// 	'		</tr>' +
// 	'		<tr>' +
// 	'			<td rowspan="2" class="order-carrier">{{{carrier carrier}}}</td>' +
// 	'			<td class="col-25">' + ES.msg.get('por') + ' / ' + ES.msg.get('pol') + ': <strong>{{fromPort}} / {{fromTransferPort}}</strong>' +
// 	'			</td>' +
// 	'			<td class="col-25">' + ES.msg.get('pod') + ' / ' + ES.msg.get('fnd') + ': <strong>{{toTransferPort}} / {{toPort}}</strong>' +
// 	'			</td>' +
// 	'           <td rowspan="2" class="order-status"><div>状态：<span class="{{clzStatus}}">{{status}}</span> {{#if lockedStatus}}({{lockedStatus}}){{/if}}</div>' +
// 	'                {{#if buyerAccountName}}<div class="creator">创建者：{{buyerAccountName}}</div>{{/if}}' +
// 	'           </td>' +
// 	'			<td rowspan="2" class="order-action"><a href="order-detail.html?id={{id}}" target="_blank" class="btn btn-order-detail">订单详情</a>' +
// 	'			</td>' +
// 	'		</tr>' +
// 	'		<tr>' +
// 	'			<td class="order-et">ETD：<strong>{{etd}}</strong></td>' +
// 	'			<td class="order-et">ETA：<strong>{{eta}}</strong></td>' +
// 	'		</tr>' +
// 	'		<tr class="order-truck">' +
// 	'            <td colspan="2" class="order-loading-truck">{{{paylink orderType}}}{{#if loadingTruck}}' +
// 	'			<i class="fa fa-truck"></i> {{loadingTruck.fromLocation}} - {{loadingTruck.toLocation}}' +
// 	'			{{/if}} ' +
// 	'			{{#if destinationTruck}}' +
// 	'			| {{destinationTruck.fromLocation}} - {{destinationTruck.toLocation}}' +
// 	'			{{/if}}</td>' +
// 	'			<td colspan="3" class="order-price">' +
// 	'				{{#if purchases}}{{#each purchases}}' +
// 	'				<span>{{containerSize}} x{{qty}}</span> &nbsp; ' +
// 	'				{{/each}}{{/if}} ' +
// 	'           	( 已付 ：<span class="">{{currency}} {{paidPrice}}</span> {{#if unpaidPrice}}| ' +
// 	'           	未付：<span class="">{{currency}} {{unpaidPrice}} {{/if}}</span>' +
// 	'           	{{#if displayRefund}} | 退款：<span class="">{{currency}} {{refundPrice}}</span>{{/if}} ) &nbsp; ' +
// 	'           	{{#if totalPrices}} 价格：{{#each totalPrices}}<span class="price-amt">{{totalPrice}}/{{currency}} </span> {{/each}}{{/if}}' +
// 	'			</td>' +
// 	'		</tr>' +
// 	'	</tbody>' +
// 	'</table>' +
// 	'{{#if waitingCharges}}<table class="order-item-charge" cellpadding="0" cellspacing="0"><tbody>' +
// 	'		<tr class="order-confirm-charge-header">' +
// 	'			<td class="col-20">待确认费用名</td>' +
// 	'			<td class="col-40">费用描述</td>' +
// 	'			<td class="col-20">费用金额</td>' +
// 	'			<td class="col-20"></td>' +
// 	'		</tr>' +
// 	'		{{#each waitingCharges}}<tr class="order-confirm-charge">' +
// 	'			<td>{{chargeName}}</td>' +
// 	'			<td>{{description}} ({{unit}})</td>' +
// 	'			<td><span class="price-amt">{{currency}} {{totalPrice}}</span></td>' +
// 	'			<td><a href="javascript:void(0)" class="btn-confirm-charge" data-value="{{id}}">确认费用</a></td>' +
// 	'		</tr>{{/each}}' +
// 	'		</tbody></table>{{/if}}' +
// 	'{{/each}}{{/if}}'
// }
//
// ES.show = function () {
// 	// multiple language
// 	ES.get('#btn-to-index').html(ES.msg.get('index'))
// 	ES.get('.shell-nav a').eq(0).html(ES.msg.get('menu_0'))
// 	ES.get('.shell-nav a').eq(1).html(ES.msg.get('menu_5'))
// 	ES.get('.shell-nav a').eq(2).html(ES.msg.get('menu_1'))
// 	ES.get('.shell-nav a').eq(3).html(ES.msg.get('menu_4'))
// 	ES.get('.shell-nav a').eq(4).html(ES.msg.get('menu_2'))
// 	ES.get('.shell-nav a').eq(5).html(ES.msg.get('menu_3'))
// 	var h3 = ES.get('.shell-footer-item h3')
// 	h3.eq(0).html(ES.msg.get('footer_0'))
// 	h3.eq(1).html(ES.msg.get('footer_1'))
// 	h3.eq(2).html(ES.msg.get('footer_2'))
// 	h3.eq(3).html(ES.msg.get('footer_3'))
// 	h3.eq(4).html(ES.msg.get('footer_4'))
// 	h3.eq(5).html(ES.msg.get('footer_5'))
// 	h3.eq(6).html(ES.msg.get('footer_6'))
// 	h3.eq(7).html(ES.msg.get('footer_7'))
// 	var a = ES.get('.shell-footer-item div a')
// 	a.eq(0).html(ES.msg.get('footer_a_0'))
// 	a.eq(1).html(ES.msg.get('footer_a_1'))
// 	a.eq(2).html(ES.msg.get('footer_a_2'))
// 	a.eq(3).html(ES.msg.get('footer_a_3'))
// 	a.eq(4).html(ES.msg.get('footer_a_4'))
// 	a.eq(5).html(ES.msg.get('footer_a_5'))
// 	a.eq(6).html(ES.msg.get('footer_a_6'))
// 	a.eq(7).html(ES.msg.get('footer_a_7'))
// 	a.eq(8).html(ES.msg.get('footer_a_8'))
// 	a.eq(9).html(ES.msg.get('footer_a_9'))
// 	a.eq(10).html(ES.msg.get('footer_a_10'))
// 	a.eq(11).html(ES.msg.get('footer_a_11'))
// 	a.eq(12).html(ES.msg.get('footer_a_12'))
// 	var span = ES.get('#shell-footer-link span')
// 	span.eq(0).html(ES.msg.get('footer_span_0'))
// 	span.eq(1).html(ES.msg.get('footer_span_1'))
// 	span.eq(2).html(ES.msg.get('footer_span_2'))
// 	span.eq(3).html(ES.msg.get('footer_span_3'))
// 	ES.get('.shell-footer-item p span').eq(0).html(ES.msg.get('eshipping_name'))
//
//
//
// 	var initI18N = function () {
// 		ES.get("#to").html(ES.msg.get('to')).attr('id', '')
// 		ES.get("#from").html(ES.msg.get('from')).attr('id', '')
// 		ES.get("#trucking").html(ES.msg.get('cargo_trucking'))
// 		ES.get('.left-title').eq(0).html('<i class="fa fa-globe"></i> ' + ES.msg.get('characterisitc_service'))
// 		ES.get('.left-title').eq(1).html('<i class="fa fa-anchor"></i> ' + ES.msg.get('ocean_carriage'))
// 		ES.get('.left-title').eq(2).html('<i class="fa fa-plane"></i> ' + ES.msg.get('air_transportation'))
// 		ES.get('.left-title').eq(3).html('<i class="fa fa-cogs"></i> ' + ES.msg.get('other_service'))
// 		ES.get('.left-h1').html('<i class="fa fa-list"></i> ' + ES.msg.get('categories'))
//
// 		ES.get('.left-products a').eq(0).html(ES.msg.get('trace_origin'))
// 		ES.get('.left-products a').eq(1).html(ES.msg.get('bonded_stock'))
// 		ES.get('.left-products a').eq(2).html(ES.msg.get('europa_inspection'))
// 		ES.get('.left-products a').eq(3).html(ES.msg.get('YWT'))
// 		ES.get('.left-products a').eq(4).html(ES.msg.get('integrated_booking'))
// 		ES.get('.left-products a').eq(5).html(ES.msg.get('foreign_booking_index'))
// 		ES.get('.left-products a').eq(6).html(ES.msg.get('domestic_booking_index'))
// 		ES.get('.left-products a').eq(7).html(ES.msg.get('eshipping_express'))
// 		ES.get('.left-products a').eq(8).html(ES.msg.get('trucking_fee'))
//
// 		ES.get('.guarantee-float').eq(0).html(ES.msg.get('footer_1'))
// 		ES.get('.guarantee-float').eq(1).html(ES.msg.get('footer_2'))
// 		ES.get('.guarantee-float').eq(2).html(ES.msg.get('footer_0'))
// 		ES.get('.guarantee-float').eq(3).html(ES.msg.get('footer_3'))
//
// 		//ES.get('#tab-below .tab').eq(0).html(ES.msg.get('cargo_trucking'))
// 		//ES.get('#tab-below .tab').eq(1).html(ES.msg.get('hscode'))
//
//
// 		// change to EN version
// 		if (ES.lang != ES.consts.language.ZH_CN) {
// 			ES.get('.left-title').hide().eq(0).show()
// 			ES.get('.left-title').eq(1).show()
// 			ES.get('.left-title').eq(3).show()
// 			ES.get('.left-products').hide().css({
// 				'clear': 'both'
// 			})
// 			ES.get('#index-search').empty().append(ES.get('#tab-below'))
// 			ES.get('.content-wrap .right').hide()
// 			ES.get('.left-products').eq(4).show()
// 			ES.get('.left-products').eq(5).show()
// 			ES.get('.left-products').eq(6).show()
// 			ES.get('.left-products').eq(8).show()
// 			ES.get('#index-news').hide()
// 			ES.get('.floor').hide()
// 			ES.get('.hot_line').hide()
// 			ES.get('.shell-footer-item a').hide()
// 			ES.get('#shell-footer-link').hide()
// 			ES.get('#shell-footer-about').hide()
// 			ES.get('#floor-content').css({
// 				'padding-top': '10px'
// 			})
// 			ES.get('#shell-nav-wrap').hide()
// 			ES.get('#index-mid').css({
// 				'margin-top': '-30px'
// 			})
// 			ES.get('#prod-nav').css({
// 				'height': '328px'
// 			})
// 			ES.get('#index-left').css({
// 				'margin-top': '66px'
// 			})
// 			ES.get('#index-right').css({
// 				'width': '260px'
// 			})
// 			ES.ui.initSlider('#index-slider-en', ES.client_width, 360, 0, 'fade')
// 			ES.get('#index-slider').hide()
// 		}
// 	}
//
// 	initI18N()
//
//
//
// 	ES.get('.left-h1').on('click ', function (e) {
// 		ES.get('#prod-nav').slideToggle(10);
// 	})
//
//
// 	ES.get('#index-left').on('mouseleave', function (e) {
// 		ES.get('#prod-nav').slideUp(10);
// 	})
//
// 	if (document.getElementById('search-pol') && document.getElementById('search-pod')) {
// 		var pol = ES.ui.input_port({
// 			label: ES.msg.get('sea_fcl'),
// 			el: 'search-pol',
// 			icon: 'fa-map-marker',
// 			placeholder: ES.msg.get('empty_pol'),
// 			type: 'from',
// 			related: 'search-pod',
// 			module: 'both'
// 		})
//
// 		var pod = ES.ui.input_port({
// 			el: 'search-pod',
// 			icon: 'fa-map-marker',
// 			placeholder: ES.msg.get('empty_pod'),
// 			type: 'to',
// 			related: 'search-pol',
// 			module: 'both'
// 		})
//
// 		var isdangerous = false
//
// 		ES.get('#transport_type').append("<option value='sea_fcl'>" + ES.msg.get('sea_fcl') + "</option>");
//
// 		var search_click = function (pol, pod) {
// 			ES.get('.msg-tip').remove()
// 			var pol_v = pol.get_value().trim()
// 			var pod_v = pod.get_value().trim()
// 			var tpl = '<div class="msg-tip error">{{msg}}</div>'
// 			var msg = ''
// 			var err = false
// 			var module = pod.el.data().type == 'ForeignTrunkSpu' ? '../foreign' : '../domestic'
// 			if (!pol_v) {
// 				msg = ES.get(ES.util.format_string(tpl, {
// 					msg: ES.msg.get('empty_pol')
// 				}))
// 				msg.insertBefore(pol.el)
// 				err = true
// 			}
// 			if (!pod_v) {
// 				msg = ES.get(ES.util.format_string(tpl, {
// 					msg: ES.msg.get('empty_pod')
// 				}))
// 				msg.insertBefore(pod.el)
// 				err = true
// 			}
//
// 			if (err) {
// 				return
// 			}
//
// 			ES.util.redirect(ES.util.format_string(module + '/routes.html?pol={{0}}&pod={{1}}&date=', {
// 				0: pol_v,
// 				1: pod_v
// 			}))
// 		}
//
// 		ES.ui.button({
// 			el: 'btn-search-port',
// 			text: ES.msg.get('search'),
// 			onclick: function () {
// 				search_click(pol, pod)
// 			}
// 		})
// 	}
//
//
//
//
// 	ES.ui.button({
// 		cls: 'ask-btn',
// 		el: 'btn-search-inquiry',
// 		text: ES.msg.get('quote'),
// 		onclick: function () {
// 			if (!ES.user) {
// 				ES.ui.alert({
// 					key: 'login_first',
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				});
// 				return
// 			} else if (ES.user.userGroup != ES.consts.company_type.BUYER) {
// 				ES.ui.alert({
// 					key: 'role_fail',
// 					type: 'error',
// 					after_callback: function () {
// 						ES.util.forwardredirect('../login.html')
// 					}
// 				});
// 				return
// 			}
// 			var show_ask = function (res) {
// 				var html =
// 					'<div class="frame" id="shell-inquiry-frame">' +
// 					'<div class="title">' + ES.msg.get('inquiry_info') + '</div>' +
// 					'<div class="left">' +
// 					'	<div id="number">' +
// 					'		<input type="text" id="first" value="0"/>' +
// 					'		<input type="text" id="second" value="0"/>' +
// 					'		<input type="text" id="third" value="0"/>' +
// 					'	</div>' +
// 					'</div>' +
// 					'<div class="clear"></div>' +
// 					'<div class="detail-1 transport_detail">' +
// 					'	<select id="transclause" type="" class="detail-second"></select>' +
// 					'	<input type="text" id="shell-inquiry-frame-etd" class="detail-second date"/>' +
// 					'	<input type="text" id="diparture" class="detail-second"/>' +
// 					'	<input type="text" id="destination" class="detail-second"/>' +
// 					'</div>' +
// 					'<div class="clear"></div>' +
// 					'<div id="cargo_info_top">' +
// 					'	<input type="text" id="ch_name"/>' +
// 					'	<input type="text" id="en_name"/>' +
// 					'	<input type="text" id="hs_code"/>' +
// 					'	<a href="http://www.likecha.com/api/tools/hscode.html" target="_blank" id="link">' + ES.msg.get('find_code') + '</a>' +
// 					'</div>' +
// 					'<div class="clear"></div>' +
// 					'<div id="vol_and_weight"  class="detail-1">' +
// 					'	<input type="text" id="weight" class="number"/>' +
// 					'	<input type="text" id="volume" class="number"/>' +
// 					'</div>' +
// 					'<div class="clear"></div>' +
// 					'<div class="detail-1" id="dangerous-1">' +
// 					'		<input type="checkbox" id="shell-inquiry-frame-check_submit"  class="detail-1"  /><span class="isDanger" >' + ES.msg.get('isDangerous') + '</span> ' +
// 					'		<input type="text" id="un_code"  class="detail-1" /> ' +
// 					'</div>' +
// 					'<div class="detail-1" id="dangerous-2">' +
// 					'		<input type="text" id="package_category"  class="detail-1" /> ' +
// 					'		<input type="text" id="dangerous_point"  class="detail-1" /> ' +
// 					'</div>' +
// 					'<div class="clear"></div>' +
// 					'<div id="person_info"  class="detail-1">' +
// 					'	<input type="text" id="person_name"/>' +
// 					'	<input type="text" id="telephone"/>' +
// 					'</div>' +
// 					'<div class="clear"></div>' +
// 					'<div id="remark_place"  class="detail-1">' +
// 					'	<textarea id="shell-inquiry-frame-remark"/>' +
// 					'	<div class="clear"></div>' +
// 					'</div>' +
// 					'</div>'
// 				ES.ui.confirm({
// 					title: ES.msg.get('default_title'),
// 					innerHTML: html,
// 					auto_hide: false,
// 					before_show: function () {
//
// 						//运输条款
// 						this.transclause = ES.ui.select({
// 							el: 'transclause',
// 							nonempty: true,
// 							label: ES.msg.get('transportType'),
// 							msg_type: 'popup-tips'
// 						})
// 						ES.mvx.add(this.transclause)
//
// 						//ETD
// 						this.etd = ES.ui.input({
// 							el: 'shell-inquiry-frame-etd',
// 							nonempty: true,
// 							label: ES.msg.get('shipment_time'),
// 							msg_type: 'popup-tips',
//
// 						})
// 						//ES.get('#etd').datepicker().addClass('input-date-time')
//
// 						ES.mvx.add(this.etd)
//
// 						//起运地
// 						if (res.from) {
// 							this.diparture = ES.ui.input({
// 								el: 'diparture',
// 								nonempty: true,
// 								label: ES.msg.get('por'),
// 								msg_type: 'popup-tips',
// 								value: res.from
// 							})
// 						} else {
// 							this.diparture = ES.ui.input({
// 								el: 'diparture',
// 								nonempty: true,
// 								label: ES.msg.get('por'),
// 								msg_type: 'popup-tips',
// 							})
// 						}
// 						ES.mvx.add(this.diparture)
//
// 						//目的地
// 						if (res.to) {
// 							this.destination = ES.ui.input({
// 								el: 'destination',
// 								nonempty: true,
// 								label: ES.msg.get('fnd'),
// 								msg_type: 'popup-tips',
// 								value: res.to
// 							})
// 						} else {
// 							this.destination = ES.ui.input({
// 								el: 'destination',
// 								nonempty: true,
// 								label: ES.msg.get('fnd'),
// 								msg_type: 'popup-tips',
// 							})
// 						}
//
// 						ES.util.ajax_get('/data/sailling_term', {}, ES.delegate(function (res) {
// 							console.log(res)
// 							var data = []
// 							ES.get(res.datas).each(function (_, v) {
// 								data.push({
// 									value: v.code,
// 									display: v.name
// 								})
// 							})
// 							this.transclause.bind_list(data)
// 							this.transclause.set_value(ES.consts.transclause.DOOR_DOOR)
// 						}, this))
// 						ES.mvx.add(this.destination)
//
// 						//数字
// 						this.number = ES.ui.input_form({
// 							el: 'number',
// 							items: [{
// 								label: ES.msg.get('first'),
// 								msg_type: 'popup-tips',
// 								type: 'qty'
// 							}, {
// 									label: ES.msg.get('second'),
// 									msg_type: 'popup-tips',
// 									type: 'qty'
// 								}, {
// 									label: ES.msg.get('third'),
// 									msg_type: 'popup-tips',
// 									type: 'qty'
// 								}]
// 						})
// 						ES.mvx.add(this.number)
// 						//货物信息
// 						if (res.rollsteel) {
// 							this.cargo_info = ES.ui.input_form({
// 								el: 'cargo_info_top',
// 								items: [{
// 									nonempty: true,
// 									label: ES.msg.get('cargo_info'),
// 									msg_type: 'popup-tips',
// 									placeholder: ES.msg.get('chinesename'),
// 									validate: function () {
// 										return ES.util.validation_chinese(this)
// 									},
// 									value: res.rollsteel_cn
// 								}, {
// 										nonempty: true,
// 										msg_type: 'popup-tips',
// 										placeholder: ES.msg.get('englishname'),
// 										validate: function () {
// 											return ES.util.validation_english(this)
// 										},
// 										value: res.rollsteel
// 									}, {
// 										nonempty: true,
// 										msg_type: 'popup-tips',
// 										placeholder: ES.msg.get('hscode'),
// 									}]
// 							})
// 						} else {
// 							this.cargo_info = ES.ui.input_form({
// 								el: 'cargo_info_top',
// 								items: [{
// 									nonempty: true,
// 									label: ES.msg.get('cargo_info'),
// 									msg_type: 'popup-tips',
// 									placeholder: ES.msg.get('chinesename'),
// 									validate: function () {
// 										return ES.util.validation_chinese(this)
// 									},
// 								}, {
// 										nonempty: true,
// 										msg_type: 'popup-tips',
// 										placeholder: ES.msg.get('englishname'),
// 										validate: function () {
// 											return ES.util.validation_english(this)
// 										},
// 									}, {
// 										nonempty: true,
// 										msg_type: 'popup-tips',
// 										placeholder: ES.msg.get('hscode'),
// 									}]
// 							})
// 						}
//
// 						ES.mvx.add(this.cargo_info)
// 						//货重体积
// 						this.vol_and_weight = ES.ui.input_form({
// 							el: 'vol_and_weight',
// 							items: [{
// 								nonempty: true,
// 								label: ES.msg.get('cargo_weight'),
// 								msg_type: 'popup-tips',
// 								after_labels: [ES.msg.get('kg_en')],
// 								validate: function () {
// 									return ES.util.validation_is_float_num_two(this)
// 								}
// 							}, {
// 									nonempty: true,
// 									msg_type: 'popup-tips',
// 									label: ES.msg.get('cargo_volume'),
// 									after_labels: [ES.msg.get('stere_en')],
// 									validate: function () {
// 										return ES.util.validation_is_float_num_two(this)
// 									}
// 								}]
// 						})
// 						ES.mvx.add(this.vol_and_weight)
//
// 						//危险品
// 						this.un_code = ES.ui.input({
// 							el: 'un_code',
// 							nonempty: true,
// 							label: ES.msg.get('UN_number'),
// 							validate: function () {
// 								return ES.util.validation_english(this)
// 							},
// 							msg_type: 'popup-tips'
// 						})
//
// 						this.dangerous_info = ES.ui.input_form({
// 							el: 'dangerous-2',
// 							items: [{
// 								label: ES.msg.get('package_category'),
// 								nonempty: true,
// 								msg_type: 'popup-tips',
// 							}, {
// 									label: ES.msg.get('dangerous_point'),
// 									nonempty: true,
// 									msg_type: 'popup-tips',
// 								}]
// 						})
//
// 						//个人信息
// 						this.psrson_info = ES.ui.input_form({
// 							el: 'person_info',
// 							items: [{
// 								nonempty: true,
// 								label: ES.msg.get('contact'),
// 								msg_type: 'popup-tips',
// 							}, {
// 									nonempty: true,
// 									msg_type: 'popup-tips',
// 									label: ES.msg.get('contact_phone'),
// 									validate: function () {
// 										return ES.util.validation_is_nature_number(this)
// 									}
// 								}]
// 						})
// 						ES.mvx.add(this.psrson_info)
// 						//备注
// 						this.ramark = ES.ui.input({
// 							el: 'shell-inquiry-frame-remark',
// 							label: ES.msg.get('remark_mes'),
// 							msg_type: 'popup-tips',
// 							placeholder: ES.msg.get('hj_remark')
// 						})
// 						ES.mvx.add(this.ramark)
//
// 						//ES.mvx.add(this.dangerous_info)
// 						//ES.mvx.add(this.un_code)
// 						ES.get('#dangerous-2').addClass('invisible')
// 						ES.ui.get('un_code').hide()
//
// 						//checkbox改变
// 						ES.get('#shell-inquiry-frame-check_submit').on('change', ES.delegate(function (e) {
// 							//选中
// 							if (e.delegateTarget.checked) {
// 								isdangerous = true
// 								ES.get('#dangerous-2').removeClass('invisible')
// 								ES.ui.get('un_code').show()
// 								ES.mvx.add(this.dangerous_info)
// 								ES.mvx.add(this.un_code)
// 							} else {
// 								isdangerous = false
// 								ES.get('#dangerous-2').addClass('invisible')
// 								ES.ui.get('un_code').hide()
// 								ES.mvx.remove(this.dangerous_info.id)
// 								ES.mvx.remove(this.un_code.id)
// 							}
// 						}, this))
//
// 						ES.ui.popup.auto_position()
//
// 					}
// 				}, function () {
// 					ES.mvx.get('transclause').clear_invalid()
// 					ES.mvx.get('shell-inquiry-frame-etd').clear_invalid()
// 					ES.mvx.get('diparture').clear_invalid()
// 					ES.mvx.get('destination').clear_invalid()
// 					ES.mvx.get('cargo_info_top').clear_invalid()
// 					ES.mvx.get('vol_and_weight').clear_invalid()
// 					ES.mvx.get('person_info').clear_invalid()
// 					ES.mvx.get('shell-inquiry-frame-remark').clear_invalid()
// 					if (ES.mvx.get('un_code')) {
// 						ES.mvx.get('un_code').clear_invalid()
// 					}
// 					if (ES.mvx.get('dangerous-2')) {
// 						ES.mvx.get('dangerous-2').clear_invalid()
// 					}
//
// 					var check_list = []
// 					var len = 0
// 					ES.each(ES.get('#shell-inquiry-frame .input-qty'), function (_, v) {
// 						len++
// 						var val = ES.ui.get(v.id).get_value()
// 						if (+val == 0) {
// 							check_list.push(val)
// 						}
// 					})
// 					var error_msg = ES.get('.main-popup-error').show().find('.popup-error')
// 					if (check_list.length == len) {
// 						error_msg.html('<i class="fa fa-times-circle"></i> ' + ES.msg.get('qty_zero_error')).show()
// 						ES.ui.popup.auto_position()
// 						return
// 					} else {
// 						error_msg.html('')
// 					}
//
//
// 					var obj = {}
// 					var containers = []
// 					obj.sailingTerm = ES.mvx.get('transclause').get_value()
// 					obj.transportationDate = ES.mvx.get('shell-inquiry-frame-etd').get_value()
// 					obj.fromPlace = ES.mvx.get('diparture').get_value()
// 					obj.toPlace = ES.mvx.get('destination').get_value()
//
// 					obj.productName = ES.mvx.get('cargo_info_top').get_value().ch_name
// 					obj.productNameEn = ES.mvx.get('cargo_info_top').get_value().en_name
// 					obj.productHSCode = ES.mvx.get('cargo_info_top').get_value().hs_code
//
// 					obj.productVolume = ES.mvx.get('vol_and_weight').get_value().volume
// 					obj.productWeight = ES.mvx.get('vol_and_weight').get_value().weight
//
// 					obj.isDGCargo = isdangerous
// 					if (ES.mvx.get('un_code')) {
// 						obj.dgCode = ES.mvx.get('un_code').get_value()
// 					}
// 					if (ES.mvx.get('dangerous-2')) {
// 						obj.dgGrade = ES.mvx.get('dangerous-2').get_value().package_category
// 						obj.dgFlashingPoint = ES.mvx.get('dangerous-2').get_value().dangerous_point
// 					}
//
// 					obj.contactName = ES.mvx.get('person_info').get_value().person_name
// 					obj.contactPhone = ES.mvx.get('person_info').get_value().telephone
// 					obj.remark = ES.mvx.get('shell-inquiry-frame-remark').get_value()
//
// 					containers.push({ containerSize: '20GP', qty: ES.mvx.get('number').get_value().first })
// 					containers.push({ containerSize: '40GP', qty: ES.mvx.get('number').get_value().second })
// 					containers.push({ containerSize: '40HC', qty: ES.mvx.get('number').get_value().third })
// 					obj.containers = containers
//
// 					var result = true
// 					result = result && ES.mvx.get('transclause').validate()
// 					result = result && ES.mvx.get('shell-inquiry-frame-etd').validate()
// 					result = result && ES.mvx.get('diparture').validate()
// 					result = result && ES.mvx.get('destination').validate()
// 					result = result && ES.mvx.get('cargo_info_top').validate()
// 					result = result && ES.mvx.get('vol_and_weight').validate()
// 					if (ES.mvx.get('un_code')) {
// 						result = result && ES.mvx.get('un_code').validate()
// 					}
// 					if (ES.mvx.get('dangerous-2')) {
// 						result = result && ES.mvx.get('dangerous-2').validate()
// 					}
// 					result = result && ES.mvx.get('person_info').validate()
// 					result = result && ES.mvx.get('shell-inquiry-frame-remark').validate()
//
// 					if (result) {
// 						ES.ui.mask()
// 						ES.get('.popup').remove();
// 						ES.util.ajax_submit('/order/inquiry', obj, function () {
// 							ES.ui.unmask()
// 							ES.ui.alert({
// 								auto_hide: false,
// 								key: 'inquiry_submit',
// 								after_callback: function () { }
// 							})
// 						})
// 					}
// 					return false;
// 				})
// 			}
// 			show_ask({})
// 		}
// 	})
//
// 	$('#shell-wrap').css({
// 		visibility: 'visible'
// 	})
// 	$('#shell-nav-wrap').css({
// 		visibility: 'visible'
// 	})
// 	$('#shell-search').css({
// 		visibility: 'visible'
// 	})
// 	$('#shell-top-inner').css({
// 		visibility: 'visible'
// 	})
// 	if (ES.client_width <= 1300) {
// 		ES.get('.weixin-wrap').css({
// 			'right': '-100px'
// 		}).hover(function () {
// 			ES.get(this).animate({
// 				'right': '0'
// 			})
// 		}, function () {
// 			ES.get(this).animate({
// 				'right': '-100px'
// 			})
// 		})
// 	}
// 	ES.get('.weixin-wrap').show()
//
// 	ES.get('#to-top a').eq(1).click(function () {
// 		ES.util.scroll_to_top(0)
// 	})
// }
//
// //刷新购物车个数
// ES.refresh_cart_count = function () {
// 	if (ES.user && ES.user.userGroup == ES.consts.company_type.BUYER) {
// 		ES.util.ajax_get('/booking/cart_item/count', {}, function (res) {
// 			ES.get('.shell-top-right .cart-icon-count').html(res.count || 0)
// 		})
// 	}
// }
//
// ES.hide_cart = function () {
// 	ES.get('#shell-header-inner .shell-header-cart').hide()
// }
//
// ES.show_cart = function () {
// 	ES.get('#shell-header-inner .shell-header-cart').show()
// }
//
// ES.carrier = function () {
// 	this.tpl = '<img class="carrier {{cls}}" src="${DOMAIN}/../common/img/blank.png" alt="一海通 内贸" />'
// 	this.map = {
// 		'中海集运': 'cscl',
// 		'中国远洋': 'cosco',
// 		'东方海外': 'oocl',
// 		'中国外运': 'sinotrans',
// 		'长荣海运股份有限公司': 'evergreen',
// 		'美国总统轮船有限公司': 'apl',
// 		'韩进海运': 'hanjin',
// 		'万海航运有限公司': 'wh',
// 		'以星综合航运': 'zim',
// 		'金星航运公司': 'jx',
// 		'博亚国际海运有限公司': 'by',
// 		'太平船务': 'pil'
// 	}
// 	this.get = function (carrier) {
// 		var cls = this.map[carrier]
// 		if (!cls) {
// 			return carrier.indexOf('-') != -1 ? carrier.replace('-', '</br>') : carrier
// 		}
// 		return ES.util.format_string(this.tpl, {
// 			cls: 'carrier-' + cls
// 		})
// 	}
// }
// ES.carrier = new ES.carrier()
//
// ES.util.init_header = function () {
// 	var html = ['<ul class="shell-top-left">',
// 		'	<li>' + ES.msg.get('Hello') + '，' + ES.msg.get('welcome'),
// 		'		<a id="btn-sign-in" href="${DOMAIN}/../login.html">' + ES.msg.get('login') + '</a> ' + ES.msg.get('Or'),
// 		'		<a id="btn-rigiste-new" href="${DOMAIN}/../register.html">' + ES.msg.get('free_registration') + '</a> ' + ES.msg.get('customer_service_phone') + '：<strong>4009616800</strong></li>',
// 		'</ul>',
// 		'<ul class="shell-top-right">',
// 		'	<li>',
// 		'		<a href="${DOMAIN}/../admin/work-bench.html">' + ES.msg.get('my_sea') + '</a>',
// 		'	</li>',
// 		'	<li class="spacer"></li>',
// 		'	<li class="shell-cart-item">',
// 		'		<i class="fa fa-shopping-cart"></i><a href="${DOMAIN}/../admin/cart.html">' + ES.msg.get('my_shopping_cart') + '</a><span class="cart-icon-count">0</span>',
// 		'	</li>',
// 		'	<li class="spacer"></li>',
// 		'	<li class="language-wrap">',
// 		'		<div>',
// 		'			<a href="javascript:void(0)" id="site-navigation">' + ES.msg.get('website_navigation') + '<i class="tg-right"></i></a>',
// 		'			<div class="language-detail site-nav-detail">',
// 		'				<a href="${DOMAIN}/../tracking.html" class="language">' + ES.msg.get('cargo_trucking') + '</a>',
// 		'				<a href="${DOMAIN}/../foreign/routes.html" class="language">' + ES.msg.get('foreign_booking_index') + '</a>',
// 		'				<a href="${DOMAIN}/../domestic/routes.html" class="language">' + ES.msg.get('domestic_booking_index') + '</a>',
// 		'				<a href="${DOMAIN}/../receiptGuide.html" class="language">' + ES.msg.get('europa_inspection') + '</a>',
// 		'				<a href="${DOMAIN}/../crossExpress.html" class="language">' + ES.msg.get('central_european_export_line') + '</a>',
// 		'				<a href="${DOMAIN}/../foreign/truck-fee-list.html" class="language">' + ES.msg.get('trucking_fee') + '</a>',
// 		'				<a href="${DOMAIN}/../resource-news.html" class="language">' + ES.msg.get('eshipping_original') + '</a>',
// 		'			</div>',
// 		'		</div>',
// 		'	</li>',
// 		'	<li class="spacer"></li>',
// 		'	<li class="language-wrap">',
// 		'		<div>',
// 		'			<a href="javascript:void(0)" id="qr-code-navigation">' + ES.msg.get('QR_code') + '<i class="tg-right"></i></a>',
// 		'			<div class="language-detail site-nav-detail">',
// 		'				<a style="width:100%;" href="javascript:void(0)"><img style="height:150px;" src="${DOMAIN}/../common/img/weixin_bg.png" /></a>',
// 		'			</div>',
// 		'		</div>',
// 		'	</li>',
// 		'	<li class="spacer"></li>',
// 		'	<li class="language-wrap" id="language-navigation">',
// 		'		<div>',
// 		'			<a href="javascript:void(0)" id="language">',
// 		'				<img name="zh-cn" src="${DOMAIN}/../common/img/CN24.png" alt="' + ES.msg.get('default_title') + ' Eshipping" width="50%" />',
// 		'				<img name="en-us" src="${DOMAIN}/../common/img/UK24.png" alt="' + ES.msg.get('default_title') + ' Eshipping" width="50%" class="none" />',
// 		'				<i class="tg-right"></i>',
// 		'			</a>',
// 		'			<div class="language-detail">',
// 		'				<a href="javascript:void(0)" class="language" data-value="en-us">English</a>',
// 		'				<a href="javascript:void(0)" class="language" data-value="zh-cn">简体中文</a>',
// 		'			</div>',
// 		'		</div>',
// 		'	</li>',
// 		'</ul>'].join('')
// 	ES.get('#shell-top-inner').html(html)
// 	ES.get('#language-navigation .language').on('click', function (e) {
// 		var lang = ES.get(this).data('value')
// 		ES.util.set_cookie('lang', lang)
// 		ES.util.refresh()
// 		e.preventDefault()
// 		return
// 	})
//
// 	var func = function () {
// 		ES.get(this).find('.language-detail').show()
// 		ES.get(this).css({
// 			'background-color': '#fff'
// 		})
// 	}
// 	var func2 = function () {
// 		ES.get(this).find('.language-detail').hide()
// 		ES.get(this).css({
// 			'background-color': 'transparent'
// 		})
// 	}
// 	ES.get('.language-wrap').hover(func, func2)
//
// 	ES.get('.language-detail').hover(function () { }, function () {
// 		ES.get(this).hide().parent().parent().css({
// 			'background-color': 'transparent'
// 		})
// 	})
// }
//
// ES.util.order_status = function (user, status, orderType) {
// 	var r = ES.consts.company_type
// 	var s = ES.consts.order_status
// 	var o = ES.consts.order_type
// 	var foreign_domestic = ES.consts.order_type.DOMESTIC == orderType || ES.consts.order_type.FOREIGN == orderType
// 	var role = user.userGroup
// 	var ret = {}
// 	if (r.SELLER == role) {
// 		ret = {
// 			show_decline: false,
// 			show_request: false,
// 			show_add_charge: false,
// 			show_reject_cancel: false,
// 			show_confirm_cancel: false,
//             show_complete: false,
//             show_confirm: false,
// 			show_change_order: false
// 		}
// 		if (s.SUBMITTED == status) { //订单已提交
// 			if (foreign_domestic) {
// 				ret.show_request = true //提交申请
// 			}
// 			ret.show_decline = true//取消订舱
// 			if (!foreign_domestic) {
// 				ret.show_confirm = true //确认订舱
// 			}
// 		} else if (s.BOOKING_REQUESTED == status) {//订舱代确认
// 			ret.show_decline = true //拒绝
// 			if (foreign_domestic) {
// 				ret.show_confirm = true //确认订舱
// 			}
// 		} else if (s.BOOKING_CONFIRMED == status) {// 订单已确认
// 			ret.show_add_charge = true //计费
// 			ret.show_decline = true //取消订舱
// 			ret.show_complete = true //订单完成
// 		} else if (s.CANCELLED_REQUESTED == status) {// 取消订单申请
// 			ret.show_reject_cancel = true //取消申请拒绝
// 			ret.show_confirm_cancel = true //确认
// 		}
// 	} else if (r.BUYER == role) {
// 		ret = {
// 			show_cancel: false,
// 			show_cancel_request: false,
// 			show_si: false
// 		}
// 		if (s.SUBMITTED == status) {
// 			ret.show_cancel = true //取消订单
// 		} else if (s.BOOKING_CONFIRMED == status) {
// 			ret.show_si = true
// 			ret.show_cancel_request = true //取消申请订单
// 		}
// 		if (s.COMPLETED == status || s.CANCELLED == status) {
//
// 		} else {
// 			if (ES.consts.order_type.DOMESTIC == orderType) {
// 				ret.show_change_order = true
// 			}
// 		}
//
// 	}
// 	if (ES.consts.order_type.TRUCK == orderType) {
// 		ret.show_decline = false
// 	}
// 	if (ES.consts.order_type.EXW == orderType) {
// 		ret.show_cancel = false
// 	}
//
// 	return ret
// }
// ES.util.fetch_auth = function (authurl) {
// 	if (!ES.user) {
// 		return false
// 	}
// 	var authorities = ES.user.authorities
// 	if (authorities.indexOf(authurl) < 0) {
// 		return false
// 	} else {
// 		return true
// 	}
// }
//
//
// ES.util.local_paging = function (config) {
// 	if (config.list) {
// 		return {
// 			total: config.list.length,
// 			totalPage: Math.ceil(config.list.length / config.pageSize),
// 			items: config.list.slice((config.page - 1) * config.pageSize, config.page * config.pageSize),
// 			page: config.page
// 		}
// 	} else {
// 		return {
// 			total: 0,
// 			totalPage: 0,
// 			items: [],
// 			page: 0
// 		}
// 	}
//
// }
//
// /*******************线图**********************/
// // shipxy api
// var shipxy = {
// 	callbacks: 0,
// 	api: {
// 		getAllTermalsApi: 'http://route.shipxy.com/routesvr.dll?cmd=211&coord=baidu&p={{callback}}',
// 		getRouteApi: 'http://route.shipxy.com/routesvr.dll?cmd=209&coord=baidu&ports={{port1}},{{port2}}&p={{callback}}',
// 		getPortsApi: 'http://route.shipxy.com/routesvr.dll?cmd=210&coord=baidu&ports={{port1}},{{port2}}&p={{callback}}'
// 	}
// }
// shipxy.getRoutes = function (port1, port2, callback, scope, arg) {
// 	var winCallback = 'shipxyCallback' + this.callbacks
// 	window[winCallback] = function (data) {
// 		if (data.routes && data.routes.length > 0) {
// 			data = data.routes[0].line
// 		} else {
// 			data = []
// 		}
// 		callback.apply(scope || window, [data, arg])
// 	}
// 	this.callbacks++
// 	var script = document.createElement('script')
// 	port1 = this.toShipxyId(port1)
// 	port2 = this.toShipxyId(port2)
// 	script.type = "text/javascript";
// 	script.src = this.api.getRouteApi.replace('{{port1}}', port1).replace('{{port2}}', port2).replace('{{callback}}', winCallback)
// 	document.body.appendChild(script);
// }
// shipxy.toShipxyId = function (name) {
// 	name = toUpperCase()
// 	for (var i = 0; i < this.ports.length; i++) {
// 		var port = this.ports[i]
// 		if (port.name.indexOf(name) >= 0 || name.indexOf(port.name) >= 0) {
// 			return port.id
// 		}
// 		if (port.nameEn.indexOf(name) >= 0 || name.indexOf(port.nameEn) >= 0) {
// 			return port.id
// 		}
// 	}
// }
// ES.util.shipxy = shipxy

