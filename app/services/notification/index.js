var Pushover = require('node-pushover');

exports = module.exports = function notification(configuration) {
	var push = new Pushover({
		token: configuration.pushover.appKey,
		user: configuration.pushover.userKey
	});

	return {
		sendNotification: function() {
			push.send("Sleepity", "Hey, please don't fall asleep, it would be bad.");
		}
	};
}

exports['@singleton'] = true;
exports['@require'] = ['configuration'];