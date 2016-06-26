var timeseries = require('timeseries-analysis');
var math = require('../../lib/math');

exports = module.exports = function analysis(configuration, board, notification) {
	board.subscribe(function (tuple) {
		var history = board.getHistory();
		console.log('got tuple, size of history: ', history.length);
		
		// if(history.length === 200) {
		// 	var timeSerie = history.map((sample) => [sample[0], sample[1].channelData[1]]);
		// 	console.log(math.filterIIRTimeSerie(timeSerie));
		// 	throw new Error('hello');
		// }
		if(history.length === 500) {
			 checkIfBad(history);
			 throw new Error('hello');
		}
	});

	function checkIfBad(history) {
		var timeSerie = history.map((sample) => [sample[0], sample[1].channelData[1]]);
		// timeSerie = math.filterIIRTimeSerie(timeSerie);
		var t = new timeseries.main(timeSerie);
		console.log(t.chart());
	}
}

exports['@singleton'] = true;
exports['@require'] = ['configuration', 'board', 'notification'];