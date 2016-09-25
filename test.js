var LCD = require('./i2c-lcd');
var PiServo = require('pi-servo');

var servo = new PiServo(4);
var lcd = new LCD("/dev/i2c-1", 0x27);

var angle = 30;

servo.open();

lcd.init()
    .then(() => lcd.home())
    .then(() => lcd.print('Starting Test...'));

setInterval(function() {
    angle += 5;

    if (angle > 150) {
        angle = 30;
    }
    servo.setDegree(angle);
    lcd.clear().then(() => lcd.print(angle.toString()));
}, 500);
