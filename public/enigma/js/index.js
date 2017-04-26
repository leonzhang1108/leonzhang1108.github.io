"use strict"

var rotors = []
rotors[0] = [3, 52, 24, 54, 72, 33, 11, 38, 73, 25,
    4, 48, 28, 6, 20, 34, 94, 7, 39, 90, 15, 65, 45, 1, 58, 12, 49, 31,
    32, 36, 79, 57, 85, 40, 16, 13, 82, 69, 91, 23, 27, 60, 17, 18, 59,
    22, 26, 51, 83, 81, 37, 66, 84, 30, 63, 61, 42, 43, 86, 14, 50, 92,
    74, 56, 47, 46, 80, 77, 55, 29, 44, 93, 71, 19, 10, 8, 78, 41, 87,
    75, 35, 70, 88, 68, 76, 0, 53, 21, 62, 64, 9, 89, 67, 2, 5]
rotors[1] = [15, 41, 60, 67, 63, 56, 48, 73, 26,
    77, 3, 52, 94, 0, 44, 93, 38, 7, 92, 9, 59, 76, 57, 11, 36, 31, 32,
    20, 33, 19, 37, 68, 45, 75, 69, 66, 81, 28, 43, 21, 27, 54, 13, 16,
    88, 42, 79, 10, 78, 49, 84, 34, 40, 1, 53, 82, 51, 70, 65, 86, 91,
    12, 83, 25, 39, 71, 5, 22, 89, 29, 72, 62, 8, 58, 2, 18, 14, 46,
    74, 64, 6, 90, 85, 23, 80, 47, 87, 24, 4, 17, 55, 50, 35, 61, 30]
rotors[2] = [57, 84, 94, 11, 70, 72, 78, 22, 73,
    34, 0, 5, 66, 28, 9, 77, 56, 79, 17, 15, 29, 87, 4, 52, 93, 58, 69,
    36, 30, 89, 45, 18, 74, 76, 85, 2, 68, 32, 83, 40, 51, 47, 23, 86,
    14, 33, 12, 50, 6, 75, 92, 25, 88, 42, 10, 49, 67, 59, 41, 20, 35,
    48, 43, 26, 24, 31, 60, 54, 21, 27, 63, 62, 13, 38, 19, 61, 64, 82,
    3, 39, 81, 7, 53, 1, 55, 16, 37, 65, 80, 71, 90, 44, 8, 91, 46]
rotors[3] = [29, 14, 6, 43, 53, 71, 54, 78, 93, 84,
    15, 37, 66, 44, 31, 41, 4, 1, 46, 10, 24, 82, 64, 3, 19, 81, 45,
    11, 18, 51, 40, 26, 73, 33, 20, 35, 49, 59, 60, 89, 79, 65, 12, 2,
    74, 94, 68, 30, 62, 58, 90, 61, 86, 80, 76, 56, 7, 69, 22, 5, 88,
    47, 27, 38, 32, 83, 34, 36, 48, 52, 16, 67, 91, 39, 75, 23, 17, 25,
    13, 55, 77, 57, 42, 9, 63, 50, 21, 8, 70, 92, 0, 28, 85, 87, 72]
var reflector = [49, 81, 88, 68, 21, 77, 74, 24, 11,
    83, 51, 10, 43, 15, 32, 18, 30, 91, 65, 78, 19, 67, 29, 93, 94, 73,
    82, 53, 36, 62, 26, 69, 71, 12, 64, 6, 8, 54, 5, 92, 47, 27, 50,
    76, 42, 28, 61, 23, 60, 16, 3, 40, 85, 7, 14, 66, 35, 39, 72, 17,
    25, 22, 52, 2, 48, 38, 45, 58, 84, 1, 57, 37, 89, 87, 34, 86, 46,
    55, 44, 33, 31, 4, 13, 70, 20, 63, 56, 75, 59, 0, 9, 90, 80, 79, 41]
var rotorStart = []
var backRotors = []
var cyperInput = $('#enigma-cypher')

var template = Handlebars.compile($('#rotor-template').html())
$('#rotor-content').html(template(rotors))

function rotorAdd(list, index) {
    if (list[index] == 94) {
        list[index] = 1
        if (index) rotorAdd(list, index - 1)
    } else {
        list[index]++
    }
}

function doRotorStart() {
    rotorStart = []
    _($('.enigma-rotor')).each(function (item) {
        rotorStart.push(item.value % 95)
    })
}

function buildBackRotors() {
    backRotors = rotors.slice(0, rotors.length).reverse()
}

function doTranslate(char) {
    var temp = char.charCodeAt() - 32

    //顺序进入
    _(rotors).each(function (rotor, index) {
        temp = rotor[(temp + rotorStart[index]) % 95]
    })

    //反转
    switch ($('#radio-form .active input').attr('id')) {
        case 'radio-encode':
            temp = reflector[temp]
            break
        case 'radio-decode':
            temp = reflector.indexOf(temp)
    }

    //倒序退出
    _(backRotors).each(function (backRotor, index) {
        temp = (backRotor.indexOf(temp) - rotorStart[backRotors.length - index - 1] + 95) % 95
    })

    //秘钥累加
    rotorAdd(rotorStart, rotorStart.length - 1)

    return String.fromCharCode(temp + 32)
}

function beforeTranslate(scope) {
    $('.radio-form-item').removeClass('active')
    $('.radio-form-item input').removeAttr('checked')
    $(scope).addClass('active')
    $(scope).find('input').attr('checked')
}

function btnClick(scope) {
    buildBackRotors()
    beforeTranslate(scope)
    doRotorStart()
    var plain = $('#enigma-plain').val()
    if (!plain) return
    var str = ''
    _(plain).each(function (item) {
        str += doTranslate(item)
    })
    $('#enigma-cypher').val(str)
}

function doMatrix() {
    var canvas = document.getElementById('matrix');
    var ctx = canvas.getContext('2d');
    var fontSize = 18;
    var chars = generateChars();
    var columns;
    var drops; // Current position of last letter (for each column)
    var drawnToBottom;

// Generate Matrix code characters
    function generateChars() {
        var chars = '01';
        /*var chars = '0123456789';

         // Get ALL half-width katakana characters by unicode value
         for (var i = 0; i <= 94; i++) {
         chars += String.fromCharCode(i + 32);
         }*/

        return chars.split('');
    }

// Initialize default canvas state
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.round(canvas.width / fontSize);
        drops = [];

        // Set initial position on y coordinate for each column
        for (var i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        drawnToBottom = false;
    }

// Resize canvas to fit window
   /* window.onresize = function () {
        initCanvas();
    };*/

    function draw() {
        // Set nearly transparent background so character trail is visible
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set color and font of falling letters
        ctx.fillStyle = '#dedede';
        ctx.font = 'bold ' + fontSize + 'px monospace';

        var dropCount = drops.length;
        var charCount = chars.length;

        for (var i = 0; i < dropCount; i++) {
            // Choose a random letter
            var text = chars[Math.floor(Math.random() * charCount)];
            // Get the y position of the letter
            var rowNum = drops[i] * fontSize;
            // Draw it!
            console.log(text)
            ctx.fillText(text, i * fontSize, rowNum);

            // Check if the canvas has been drawn to the bottom
            if (rowNum > canvas.height) drawnToBottom = true;

            // Randomly reset the y position of a column
            if ((!drawnToBottom && Math.random() > 0.925) || (drawnToBottom && Math.random() > 0.95)) drops[i] = 0;

            drops[i]++;
        }
    }

    initCanvas();
    setInterval(draw, 45);
}
doMatrix()

function copyToClipboardFF(text) {
    window.prompt("Copy to clipboard: Ctrl C, Enter", text);
}

function copyToClipboard() {
    var success = true,
        range = document.createRange(),
        selection;

    // For IE.
    if (window.clipboardData) {
        window.clipboardData.setData("Text", cyperInput.val());
    } else {
        // Create a temporary element off screen.
        var tmpElem = $('<div>');
        tmpElem.css({
            position: "absolute",
            left: "-1000px",
            top: "-1000px",
        });
        // Add the input value to the temp element.
        tmpElem.text(cyperInput.val());
        $("body").append(tmpElem);
        // Select temp element.
        range.selectNodeContents(tmpElem.get(0));
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // Lets copy.
        try {
            success = document.execCommand("copy", false, null);
        }
        catch (e) {
            copyToClipboardFF(cyperInput.val());
        }
        if (success) {
            alert("The text is on the clipboard, try to paste it!");
            // remove temp element.
            tmpElem.remove();
        }
    }
}


$('.plus').on('click', function () {
    var input = $(this).parent().find('.qty')
    var num = Number(input.val()) + 1
    input.val(num <= 94 ? num : 1)
    doRotorStart()
})
$('.minus').on('click', function () {
    var input = $(this).parent().find('.qty')
    var num = Number(input.val()) - 1
    input.val(num > 0 ? num : 94)
})
$('.enigma-rotor').on("change", function () {
    var value = $(this).val()
    if (/^\+?[1-9][0-9]*$/.test(value)) {
        if (Number(value) > 94) {
            value = 1
        }
    } else {
        value = 1
    }
    $(this).val(value)
})
$('.radio-form-item').on('click', function (e) {
    btnClick(this)
    e.preventDefault()
})
$('#enigma-plain').on('focus', function () {
    this.select()
})
cyperInput.on('click', function () {
    console.log('test')
    copyToClipboard()
})




