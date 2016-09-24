var lcd = require('./i2c-lcd');
var PiServo = require('pi-servo');

var servo = new PiServo(4);

servo.open().then(function(){
    sv1.setDegree(90);
});

lcd = new LCD("/dev/i2c-1", 0x27);

lcd.init()
    .then(() => lcd.home() )
    .then(() => lcd.print('Hello'))
    .then(() => lcd.setCursor(0, 1))
    .then(() => lcd.print('World'))
    .delay(10000)
    .then(() => lcd.off() )
    .done();





