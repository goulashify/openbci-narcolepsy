var broker = require("pubsub-js");
var OpenBCIBoard = require('openbci-sdk');
var sampleHistory = []; //tuple(timestamp, channels)

exports = module.exports = function board(configuration) {
	var boardClient = new OpenBCIBoard.OpenBCIBoard(configuration.board.configuration);
	
	boardClient.autoFindOpenBCIBoard()
			.then((serialPortName) => boardClient.connect(serialPortName))
			.then(() => boardClient.on('ready', initBoardClient))
			.catch(function handleException(ex) {
				console.log('ex', ex);
			});


	function initBoardClient() {
		boardClient.streamStart();
		boardClient.on('sample', addSample);
	}

	function addSample(sample) {
		var maxLength = (configuration.board.cacheSize - 1);
		var tuple = [Date.now(), sample];

		if(sampleHistory.length === maxLength) sampleHistory.shift(); //remove the first one if out of cache boundary
		
		sampleHistory.push(tuple);
		broker.publish('boardData', tuple);
	}
	
	return {
		subscribe: (func) => broker.subscribe('boardData', func),
		unsubscribe: (token) => broker.unsubscribe('boardData', token),
		getHistory: () => sampleHistory
	}
}

exports['@singleton'] = true;
exports['@require'] = ['configuration'];