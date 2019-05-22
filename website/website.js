//public enum States {First, Spiral, Line, Thanks};
var state = 1
var img;
var img2;
var lineData;
var spiralData;
var timeOfStart;
var lastIdx;

function setup() {
    frameRate(60);
	background(255);
	var c = createCanvas(window.innerWidth, window.innerHeight);
	//createCanvas(1920, 1080);
	textSize(30);
	img = loadImage("spiral.png");
	img2 = loadImage("lines.png");
	c.drop(gotFile);
}

function parse(file) {
    console.log('parsing')
	try {
		var data = file.data.split(/\r?\n/);
		if(data[0].search("Begun") == -1) {
			throw "Incompatible File";
		}
		var spirals = [];
		var lines = [];
		var i = 1;
		var x = data[1];
		while(x.search("Lines") == -1) {
			spirals.push([Number(x.split(' - ')[0]),
						  x.split(' - ')[1].split(',').map(Number)])
			i++;
			x = data[i]
		}
		var lineStartMs = Number(data[i].split(' - ')[0])
		i++;
		x = data[i];
		while(x.search("Test Over") == -1) {
			lines.push([Number(x.split(' - ')[0]) - lineStartMs,
						x.split(' - ')[1].split(',').map(Number)])
			i++;
			x = data[i];
		}
        console.log('done parsing')
		return [spirals, lines];
	} catch(error) {
		console.log(error);
		//error() TODO
		return false;
	}
}
//todo playing controls

function gotFile(file) {
	var result = parse(file);
	if(result) {
		state = 2;
		background(255);
		image(img, 0, 0);
		timeOfStart = millis();
	}
	spiralData = result[0];
	spiralDataTimes = spiralData.map(function(x) {return x[0]})
	lineData = result[1];
	lineDataTimes = lineData.map(function(x) {return x[0]})
}

function draw() {
	switch(state) {
	case 1: {
		FirstDraw();
		break;
	}
	case 2: {
		SpiralDraw();
		break;
	}
	case 3: {
		LineDraw();
		break;
	}
	case 4: {
		ThanksDraw();
		break;
	};
	}
}

function mouseReleased() {
	switch(state) {
	case 1: {
		break;
	}
	case 2: {
		if(overRect(width-400, height-200, 400, 200)) {
			background(255);
			state = 3;
			image(img2, 0, 0);
			timeOfStart = millis();
            lastIdx = 0;
		}
		break;
	}
	case 3: {
		if(overRect(width-400, height-200, 400, 200)) {
			background(255);
			state = 4;
			timeOfStart = millis();
            lastIdx = 0;
		}
		break;
	}
	case 4: {
		state = 1;
		timeOfStart = millis();
		break;
	}
	}
}

function overRect(x, y, width,  height)  {
	if (mouseX >= x && mouseX <= x+width && 
		mouseY >= y && mouseY <= y+height) {
		return true;
	} else {
		return false;
	}
}


function FirstDraw() {
	background(255);
	fill(100,200,100);
	noStroke();
	rect(width/2-200, height/2-100, 400, 200);
	fill(0);
	text("DRAG FILE FOR REPLAY", width/2-200, height/2-100, 400, 200);
}

function SpiralDraw() {
    //fill(255,255,255); 
    //rect(0,0,400,400);
    //fill(0,0,0);
    //text(frameRate(),0,0,100,100)
    //todo make this better

	var a,b,c,d;
	stroke(0);
	var timeOfFrame = millis() - timeOfStart;
	var idx = spiralDataTimes.findIndex(function(x) { return x > timeOfFrame})
	if (idx && idx != -1) {
		[a, b, c, d] = spiralData[idx][1];
		line(a, b, c, d);
        if(idx > lastIdx) { //make sure it doesent do weird things when it resets
            var i = 0;
            while(lastIdx + i < idx) {
                [a, b, c, d] = spiralData[lastIdx + i][1];
                line(a, b, c, d);
                i++;
            }
        }
	}
	if (idx == -1) {
		text("SPIRAL REPLAY FINISHED", 0, 0, 400, 200)
	}
    lastIdx = idx;
	fill(100,200,100);
	noStroke();
	rect(width-400, height-200, 400, 200);
	fill(0);
	text("DONE WITH REPLAY", width-400, height-200, 400, 200);
}

function LineDraw() {
	var a,b,c,d;
	stroke(0);
	var timeOfFrame = millis() - timeOfStart;
	var idx = lineDataTimes.findIndex(function(x) { return x > timeOfFrame})
	if (idx && idx != -1) {
		[a, b, c, d] = lineData[idx][1];
		line(a, b, c, d);
        if(idx > lastIdx) { //make sure it doesent do weird things when it resets
            var i = 0;
            while(lastIdx + i < idx) {
                [a, b, c, d] = lineData[lastIdx + i][1];
                line(a, b, c, d);
                i++;
            }
        }
	}
	if (idx == -1) {
		text("LINE REPLAY FINISHED", 0, 0, 400, 200)
	}
    lastIdx = idx;
	fill(100,200,100);
	noStroke();
	rect(width-400, height-200, 400, 200);
	fill(0);
	text("DONE WITH REPLAY", width-400, height-200, 400, 200);
}

function ThanksDraw() {
	text("THANK YOU FOR PLAYING, click to continue", width/2, height/2);
}
