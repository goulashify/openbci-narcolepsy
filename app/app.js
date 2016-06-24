var OpenBCIBoard = require('openbci-sdk');
var ourBoard = new OpenBCIBoard.OpenBCIBoard({verbose:true});

ourBoard.autoFindOpenBCIBoard()
		.then(function(portName) { return ourBoard.connect(portName) })
		.then(function connectToBoard() {
			ourBoard.on('ready',function() {
				ourBoard.streamStart();
				ourBoard.on('sample', checkSample);
			});
		})
		.catch(function (ex) {
			console.log('error:', ex);
		});

function checkSample(data) {
	console.log('data found:', data);
}