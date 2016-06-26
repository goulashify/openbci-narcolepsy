var dataset = require('./michael_sleep.json');
var plot = require('plotter').plot;

//assume 2 point dataset
function completeDatasetWithTime(startTime, frequency, data) {
	var toAdd = 1000 / frequency; //1sec(in ms)/frequency, calculate how much to add in time for each sample
	startTime = (startTime || Date.now()) - toAdd;
	// data[0] = [startTime, data[0][0], data[0][1]];

	// data.forEach((sample, i) => { if(i>0) data[i] = [data[i-1]+toAdd, sample[0], sample[1]] })

	return data.map(function fixData(sample, i) {
		return [startTime + (toAdd*i+1), sample[0], sample[1]];
	});
}

function saveChartFromData(timeSerie, filename, title) {
	var timeData = [];
	var channelOneData = {};
	var channelTwoData = {};

	timeSerie.forEach((data) => {
		timeData.push(data[0]);
		channelOneData[data[0]/1000] = data[1];
		channelTwoData[data[0]/1000] = data[2];
	});
	// var channelOneData = [];
	// var channelTwoData = [];
	
	// timeSerie.forEach((data) => {
	// 	timeData.push(data[0]);
	// 	channelOneData.push(data[1]);
	// 	channelTwoData.push(data[2]);
	// });

	plot({
		data: {
			'CH0': channelOneData,
			'CH1': channelTwoData
		},
		filename: filename,
		ylabel: 'Signal (uV)',
		xlabel: 'Time',
		time: '%H:%M:%s',
		title: title
	});

	return filename;
}

function main() {
	var data = completeDatasetWithTime(Date.now(), 250, dataset);
	console.log('Length of data:', data.length);
	console.log(saveChartFromData(data, 'output.png', 'Michaels Muscles'));
}

main();