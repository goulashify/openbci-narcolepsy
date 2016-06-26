//constants
//assuming 250hz sample rate, this is for 7-13hz
frequencyBoundaries = {
	low: [5.129268366104263e-003, 0.0, -1.025853673220853e-002, 0.0, 5.129268366104263e-003],
	high: [1.0, -3.678895469764040e+000, 5.179700413522124e+000, -3.305801890016702e+000, 8.079495914209149e-001]
}

module.exports = {};

module.exports.filterIIRTimeSerie = function filterIIRTimeSerie(timeserie, lowRange, highRange) {
	lowRange = lowRange || frequencyBoundaries.low; //filtB
	highRange = highRange || frequencyBoundaries.high; //filtA

	var datapoints = module.exports.filterIIR(timeserie.map((sample) => sample[1]), lowRange, highRange);

	return timeserie.map((sample, index) => [sample[0], datapoints[index]]);
} 

//bandpass, dataset => [time, value]
module.exports.filterIIR = function filterIIR(dataset, filtA, filtB) {
	var prevX = []; //prevY
	var prevY = []; //prevX
	var out;

	for (var i = 0; i < dataset.length; i++) {

		//previous output shift
		for (var j = filtB.length - 1; j > 0; j--) {
			prevY[j] = prevY[j-1] || 0;
			prevX[j] = prevX[j-1] || 0;
		}

		//shift new point
		prevX[0] = dataset[i];

		//compute filtered datapoint
		out = 0;
		
		for (var j = 0; j < filtB.length; j++) {
			out += filtB[j] * prevX[j];
			if(j > 0) out -= filtA[j] * prevY[j];
		}

		prevY[0] = out;
		dataset[i] = out;
	}

	return dataset;
}