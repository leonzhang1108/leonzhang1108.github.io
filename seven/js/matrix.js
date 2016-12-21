/**
 * Created by leon on 2016/12/22.
 */
// Get canvas

var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var drops = [];
var charSet;
var font = 'friends';
var fontSize = 10;
var doMatrix = function () {
// Canvas fills window
    cvs.height = window.screen.height;
    cvs.width = window.innerWidth * 0.98;

// Set font, size & number of columns

    ctx.font = fontSize + 'px ' + font;
    var cols = cvs.width / fontSize;

// Characters

    charSet = '0123456789ABCDEF'; // Hex
    charSet = charSet.split(''); // Convert string to array

// One drop per column, row set randomly

    for (var col = 0; col < cols; col++)
        drops[col] = Math.floor(Math.random() * cvs.height);

}


function rain() {
    // Background, black, translucent
    /* This is key to the fade effect, clear the window with an alpha of 0.05, which doesn't clear it entirely but leaves existing text progressively dimmed with each subsequent call to rain()
     */
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // For each column / drop
    for (var col = 0; col < drops.length; col++) {
        // Pick a random char
        var char = charSet[7];
        // Pick a random colour
        ctx.fillStyle = randColour();
        // Draw the char
            ctx.fillText(char, col * fontSize*3, drops[col] * fontSize*2);
        // Randomly reset drop back to top row
        if (Math.random() > 0.8)
            drops[col] = 0;

        drops[col]++; // Move drop down a row
    }
}

function randColour() {
    return 'rgb(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ')';
    // return '#00FF00'

}
var source = Rx.Observable.timer(80, 80);
source.subscribe(() => rain());

setTimeout(doMatrix, 100)