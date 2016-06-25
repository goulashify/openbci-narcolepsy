var timeseries = require('timeseries-analysis');

exports = module.exports = function analysis(configuration, board) {
	board.subscribe(function (tuple) {
		var history = board.getHistory();
		console.log('got tuple, size of history: ', history.length);
		console.log('isBad:', checkIfBad(history));
	});

	function checkIfBad(history) {
		var dataset = history.map((sample) => [sample[0], sample[1].channelData[0]]);
		var t = new timeseries.main(dataset);
		console.log(t.ma().chart());
	}
}

exports['@singleton'] = true;
exports['@require'] = ['configuration', 'board'];