var LCD = require('./i2c-lcd');
var PiServo = require('pi-servo');
var request = require('request');

var servo = new PiServo(4);
var lcd = new LCD("/dev/i2c-1", 0x27);

servo.open();

lcd.init()
    .then(() => lcd.home())
    .then(() => lcd.print('Starting Test...'));

var data = {
    lcd1: "line1",
    lcd2: "line2",
    angle: 90
};

function doIt() {

    console.log('Getting Data...');

    request('http://terpstra.co:3000/board', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            console.log(response.body);

            data = JSON.parse(response.body);

            servo.setDegree(data.angle);

            lcd.setCursor(0,0)
                .then(() => lcd.print( data.lcd1 ))
                .then(() => lcd.setCursor(0, 1))
                .then(() => lcd.print( data.lcd2 ))
                .delay(5000)
                .then(() => doIt())
        }

    });

})

doIt();
