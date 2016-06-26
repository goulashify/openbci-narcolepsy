require('./lib/math');
var IoC = require('electrolyte');
// var container = new electrolyte.Container();


// IoC.use(electrolyte.dir('services'));
IoC.use(IoC.dir(__dirname + '/services'));

// var sm = IoC.create('analysis');
var sm = IoC.create('analysis');
// sm.sendNotification();