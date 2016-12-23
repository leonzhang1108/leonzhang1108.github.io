/*
 Browser Support:
 Google Chrome +
 Mozilla Firefox +
 Opera +/-
 Safari +/-
 MSIE -
 */


//JS for audio play/pause button
window.onload = function () {
    var play = document.getElementsByClassName("j-play")[0],
        pause = document.getElementsByClassName("j-pause")[0],
        audio = document.getElementsByClassName("j-audio")[0]

    var clickOrder = ['chandler', 'phoebe', 'joey', 'monica', 'ross', 'rachel']
    var index = 0

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    shuffle(clickOrder)

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    }

    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) {
            obj.className += ' ' + cls
        }
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
            obj.className = obj.className.replace(reg, ' ')
        }
    }

    function removeAllTransformed() {
        var transformed = document.getElementsByClassName('transformed')
        while (transformed.length > 0) {
            removeClass(transformed[0], 'transformed')
        }
    }

    function transformOrNot() {
        for (var i = 0; i < clickOrder.length; i++) {
            if (hasClass(this, clickOrder[i])) {
                addClass(this, 'transformed')
                if (i == index) {
                    index++
                    if (index == clickOrder.length) {
                        // setTimeout(removeAllTransformed, 1000*60*5)
                        // shuffle(clickOrder)
                        $(document).snowFlurry({
                            maxSize: 5,
                            numberOfFlakes: 500,
                            minSpeed: 10,
                            maxSpeed: 20,
                            color: '#fff',
                            timeout: 0
                        })
                        $('text').each(function () {
                            var el = $(this);
                            var text = el.html().split('');
                            el.html('<tspan>' + text.join('</tspan><tspan>') + '</tspan>');
                        })
                        $("html, body").animate({
                            scrollTop: '777'
                        }, 1000)
                    }
                } else {
                    index = 0
                    setTimeout(removeAllTransformed, 500)
                }
            }
        }
    }

    /*var divs = document.getElementsByClassName('fr_item')
    for (var i = 0; i < divs.length; i++) {
        divs[i].onclick = function () {
            if (!hasClass(this, 'transformed')) {
                transformOrNot.call(this)
            }
        }
    }*/

    $('.fr_item').on('click', function () {
        if (!hasClass(this, 'transformed')) {
            transformOrNot.call(this)
        }
    })


    //JS for MSIE
    var ieVersion = (function () {
        if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) {
            return parseFloat(RegExp.$1)
        } else {
            return false
        }
    })()


    play.addEventListener("click", function (e) {
        audio.play()
        play.style.display = "none"
        pause.style.display = "block"
    })
    pause.addEventListener("click", function (e) {
        audio.pause()
        pause.style.display = "none"
        play.style.display = "block"
    })

    if (ieVersion) {
        console.log('Internet Explorer not supported')
        document.getElementsByClassName("l-wrapper")[0].innerHTML = '<div class="b-ie">Internet Explorer not supported</div>'
    }
    document.onmousedown = function () {
        return false
    }
}