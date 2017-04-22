var scope = {}
function wheelzoomCanvas(config) {

    var canvas = config.canvas
    var rotateBtn = document.querySelector('.rotate')
    var enlargeBtn = document.querySelector('.enlarge')
    var narrowBtn = document.querySelector('.narrow')
    var context = canvas.getContext('2d')
    var img = new Image()
    var clientWidth = config.clientWidth
    var clientHeight = config.clientHeight
    var timer
    img.src = config.src
    function trackTransforms(context) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
        var xform = svg.createSVGMatrix()
        context.getTransform = function () {
            return xform
        }

        var savedTransforms = []
        var save = context.save
        context.save = function () {
            savedTransforms.push(xform.translate(0, 0))
            return save.call(context)
        }
        var restore = context.restore
        context.restore = function () {
            xform = savedTransforms.pop()
            return restore.call(context)
        }

        var scale = context.scale
        context.scale = function (sx, sy) {
            xform = xform.scaleNonUniform(sx, sy)
            return scale.call(context, sx, sy)
        }
        var rotate = context.rotate
        context.rotate = function (radians) {
            xform = xform.rotate(radians * 180 / Math.PI)
            return rotate.call(context, radians)
        }
        var translate = context.translate
        context.translate = function (dx, dy) {
            xform = xform.translate(dx, dy)
            return translate.call(context, dx, dy)
        }
        var transform = context.transform
        context.transform = function (a, b, c, d, e, f) {
            var m2 = svg.createSVGMatrix()
            m2.a = a
            m2.b = b
            m2.c = c
            m2.d = d
            m2.e = e
            m2.f = f
            xform = xform.multiply(m2)
            return transform.call(context, a, b, c, d, e, f)
        }
        var setTransform = context.setTransform
        context.setTransform = function (a, b, c, d, e, f) {
            xform.a = a
            xform.b = b
            xform.c = c
            xform.d = d
            xform.e = e
            xform.f = f
            return setTransform.call(context, a, b, c, d, e, f)
        }
        var pt = svg.createSVGPoint()
        context.transformedPoint = function (x, y) {
            pt.x = x
            pt.y = y
            return pt.matrixTransform(xform.inverse())
        }
    }
    var Loading = function (canvas, options) {
        this.canvas = canvas
        this.options = options
    }
    Loading.prototype = {
        constructor: Loading,
        show: function () {
            var canvas = this.canvas,
                begin = this.options.begin,
                old = this.options.old,
                lineWidth = this.options.lineWidth,
                canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 },
                ctx = canvas.getContext("2d"),
                color = this.options.color,
                num = this.options.num,
                angle = 0,
                lineCap = this.options.lineCap,
                CONST_PI = Math.PI * (360 / num) / 180
            timer = setInterval(function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (var i = 0; i < num; i += 1) {
                    ctx.beginPath()
                    ctx.strokeStyle = color[num - 1 - i]
                    ctx.lineWidth = lineWidth
                    ctx.lineCap = lineCap
                    ctx.moveTo(canvasCenter.x + Math.cos(CONST_PI * i + angle) *
                        begin, canvasCenter.y + Math.sin(CONST_PI * i + angle) * begin)
                    ctx.lineTo(canvasCenter.x + Math.cos(CONST_PI * i + angle) *
                        old, canvasCenter.y + Math.sin(CONST_PI * i + angle) * old)
                    ctx.stroke()
                    ctx.closePath()
                }
                angle += CONST_PI
            }, 100)
        },
        hide: function () {
            clearInterval(timer)
        }
    }
    var options = {
        num: 8,
        begin: 20,
        old: 40,
        lineWidth: 10,
        lineCap: "round",
        color: ["rgb(0, 0, 0)", "rgb(20, 20, 20)", "rgb(40, 40, 40)", "rgb(60, 60, 60)", "rgb(80, 80, 80)",
            "rgb(100, 100, 100)", "rgb(120, 120, 120)", "rgb(140, 140, 140)"]
    }
    var loading = new Loading(canvas, options)
    loading.show()
    function calculate(imgHeight, imgWidth, frameHeight, frameWidth) {
        var ratio = imgHeight / imgWidth - frameHeight / frameWidth
        var imgRatio = imgHeight / imgWidth
        var zoomImg = {}
        if (ratio > 0) {
            zoomImg.height = frameHeight
            zoomImg.width = zoomImg.height / imgRatio
        } else {
            zoomImg.width = frameWidth
            zoomImg.height = zoomImg.width * imgRatio
        }
        return zoomImg
    }
    function redraw(img) {
        var zoomImg = calculate(img.height, img.width, clientHeight, clientWidth)
        var left = (clientWidth - zoomImg.width) / 2
        var top = (clientHeight - zoomImg.height) / 2
        var p1 = context.transformedPoint(0, 0)
        var p2 = context.transformedPoint(clientWidth, clientHeight)
        context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y)
        context.drawImage(img, left, top, zoomImg.width, zoomImg.height)
    }
    function hasClass(elem, cls) {
        cls = cls || ''
        if (cls.replace(/\s/g, '').length == 0) return false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
    }
    trackTransforms(context)
    img.onload = function () {
        loading.hide()
        canvas.style.margin = 0
        canvas.width = clientWidth
        canvas.height = clientHeight
        var image = this

        var lastX = this.width / 2, lastY = this.height / 2
        var dragStart, dragged
        var scaleFactor = 1.1
        var zoom = function (clicks) {
            var pt = context.transformedPoint(lastX, lastY)
            context.translate(pt.x, pt.y)
            var factor = Math.pow(scaleFactor, clicks)
            context.scale(factor, factor)
            context.translate(-pt.x, -pt.y)
            redraw(image)
        }
        var handleScroll = function (evt) {
            var delta
            if (evt.type == 'click') {
                lastX = clientWidth / 2
                lastY = clientHeight / 2
                // 修改兼容性问题  evt.toElement  ---> evt.target
                if (hasClass(evt.target.childNodes[0], 'fa-search-minus')) {
                    delta = -3
                } else if (hasClass(evt.target.childNodes[0], 'fa-search-plus')) {
                    delta = 3
                }
            } else {
                delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0
            }
            if (delta) zoom(delta)
            return evt.preventDefault() && false
        }
        var canvasMouseDown = function (evt) {
            var e = evt
            if(evt.changedTouches) e = evt.changedTouches[0]
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none'
            lastX = e.offsetX || (e.pageX - canvas.offsetLeft)
            lastY = e.offsetY || (e.pageY - canvas.offsetTop)
            dragStart = context.transformedPoint(lastX, lastY)
            dragged = false
            evt.preventDefault()
            evt.stopPropagation()
        }
        var canvasMouseMove = function (evt) {
            var e = evt
            if(evt.changedTouches) e = evt.changedTouches[0]
            lastX = e.offsetX || (e.pageX - canvas.offsetLeft)
            lastY = e.offsetY || (e.pageY - canvas.offsetTop)
            dragged = true
            if (dragStart) {
                var pt = context.transformedPoint(lastX, lastY)
                context.translate(pt.x - dragStart.x, pt.y - dragStart.y)
                redraw(image)
            }
            evt.preventDefault()
            evt.stopPropagation()
        }
        var canvasMouseUp = function (evt) {
            dragStart = null
        }
        var rotateClick = function (evt) {
            context.translate(clientWidth / 2, clientHeight / 2)
            context.rotate(90 * Math.PI / 180)
            context.translate(-clientWidth / 2, -clientHeight / 2)
            redraw(image)
        }
        canvas.addEventListener('mousedown', canvasMouseDown, false)
        canvas.addEventListener('mousemove', canvasMouseMove, false)
        canvas.addEventListener('mouseup', canvasMouseUp, false)
        canvas.addEventListener('touchstart', canvasMouseDown, false)
        canvas.addEventListener('touchmove', canvasMouseMove, false)
        canvas.addEventListener('touchend', canvasMouseUp, false)


        canvas.addEventListener('pinch', function(){
            alert('111')
        }, false)




        rotateBtn.addEventListener('click', rotateClick, false)
        enlargeBtn.addEventListener('click', handleScroll, false)
        narrowBtn.addEventListener('click', handleScroll, false)
        canvas.addEventListener('DOMMouseScroll', handleScroll, false)
        canvas.addEventListener('mousewheel', handleScroll, false)
        redraw(image)
    }
    img.onerror = function () {
        init()
    }
}

function addHTML(value) {
    var string =
        "<canvas style='margin-top: 40px;'></canvas>" +
        "<div class='btn-form'>" +
        "   <a class='iconfont narrow'><i class='fa fa-search-minus noClose' aria-hidden='true'></i></a>" +
        "   <a class='iconfont save' href='" + value + "' download><i class='fa fa-floppy-o noClose' aria-hidden='true'></i></a>" +
        "   <a class='iconfont rotate'><i class='fa fa fa-repeat noClose' aria-hidden='true'></i></a>" +
        "   <a class='iconfont enlarge'><i class='fa fa-search-plus noClose' aria-hidden='true'></i></a>" +
        "</div>"

    document.querySelector('.pic-div').innerHTML = string
}



function init(value) {
    value = value || 'http://leonzh.cc/seven/pic/santa.png'
    addHTML(value)
    wheelzoomCanvas({
        canvas: document.querySelector('canvas'),
        src: value,
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight
    })
}

document.querySelector('#inputUrl').addEventListener('keyup', function (evt) {
    if (evt.keyCode == 13) init(this.value)

})
init()