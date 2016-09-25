var LCD = require('./i2c-lcd');
var PiServo = require('pi-servo');
var request = require('request');

var servo = new PiServo(4);
var lcd = new LCD("/dev/i2c-1", 0x27);

var angle = 30;

servo.open();

lcd.init()
    .then(() => lcd.home())
    .then(() => lcd.print('Starting Test...'));

setInterval(function() {
    request('http://terpstra.co:3000/board', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response); // Show the HTML for the Google homepage.
        }
    });
    servo.setDegree(angle);
    lcd.clear().then(() => lcd.print(angle.toString()));
}, 5000);
