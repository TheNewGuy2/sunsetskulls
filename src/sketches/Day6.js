import React from "react";
import Sketch from "react-p5";
import { SimplexNoise } from "simplex-noise";

//	let x = 50;
//	let y = 50;
//
//let dragging = false;
let minFrequency = 0.5;
let maxFrequency = 2;
let minAmplitude = 0.05;
let maxAmplitude = 0.5;
//const canvasWidth = 600;
//const canvasHeight = 600;


// Included in index.html
// This is an alternative to p5.js builtin 'noise' function,
// It provides 4D noise and returns a value between -1 and 1
const simplex = new SimplexNoise();


    const Day6 = (props) => {
	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		const canvasWidth = 600;
		const canvasHeight = 600;
		p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		p5.mouseX = canvasWidth / 2;
		p5.mouseY = canvasHeight / 2;
		p5.randomSeed(5000)
		p5.frameRate(p5.random(2, 3))
		p5.angleMode(p5.DEGREES);
		//	  

	};
//test for real
	const draw = (p5) => {
//
//		p5.background(0);
//		p5.ellipse(x, y, 70, 70);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		const canvasWidth = 600;
		const canvasHeight = 600;
		const frequency = p5.lerp(minFrequency, maxFrequency, p5.mouseX / canvasWidth);
		const amplitude = p5.lerp(minAmplitude, maxAmplitude, p5.mouseY / canvasHeight);
		
		const dim = Math.min(canvasWidth, canvasHeight);
		const m = 4;//4
		const n = 10;//10
		const o = 22;//22
		const hr = p5.hour();
		const mn = p5.minute();
		const sc = p5.second();
// test	  
		//top  
		const MtopR = 110 * p5.noise(p5.frameCount / o);
		const MtopG = 15 * p5.noise(1000 + p5.frameCount / n);
//		const MtopB = 255;
		const MtopB = 92 * p5.noise(2000 + p5.frameCount / n);
		const MbottomR = 39 * p5.noise(3000 + p5.frameCount / m);
		const MbottomG = 1 * p5.noise(4000  + p5.frameCount / n);
//		const MbottomB = 100;
		const MbottomB = 100 * p5.noise(5000 + p5.frameCount / m);
	  
		const MtopColor = p5.color(MtopR, MtopG, MtopB);
		const MbottomColor = p5.color(MbottomR, MbottomG, MbottomB);
		
		for(let y = 0; y < 0; y++) {
		  const MlineColor = p5.lerpColor(MtopColor, MbottomColor, y / p5.canvasHeight);
	  
		  p5.stroke(MlineColor);
		  p5.line(0, y, canvasWidth, y);
		}
		//mid  
		const topR = 253 * p5.noise(p5.frameCount / o);
		const topG = 100 * p5.noise(6000 + p5.frameCount / o);
		const topB = 1 * p5.noise(7000 + p5.frameCount / n);
		const bottomR = 255 * p5.noise(8000 + p5.frameCount / o);
		const bottomG = 100 * p5.noise(9000  + p5.frameCount / o);
		const bottomB = (1+mn) * p5.noise(10000 + p5.frameCount / m);
	  
		const topColor = p5.color(topR, topG, topB, mn * 3);
		const bottomColor = p5.color(bottomR, bottomG, bottomB, mn * 3);
		
		for(let z = 0; z < 0; z++) {
		  const lineColor = p5.lerpColor(topColor, bottomColor, z/canvasHeight);
	  
		  p5.stroke(lineColor);
		  p5.line(0, z, canvasWidth, z);
		}
	  //bottom  
		const TtopR = 253 * p5.noise(p5.frameCount / o);
		const TtopG = 100 * p5.noise(10000 + p5.frameCount / n);
		const TtopB = 1 * p5.noise(11000 + p5.frameCount / o);
		const TbottomR = (2+sc) * p5.noise(13000 + p5.frameCount / n);
		const TbottomG = 255 * p5.noise(14000  + p5.frameCount / o);
//		const TbottomR = 255;
//		const TbottomG = 255;
		const TbottomB = 255 * p5.noise(15000 + p5.frameCount / o);
	  
		const TtopColor = p5.color(TtopR, TtopG, TtopB, sc * 3 );
		const TbottomColor = p5.color(TbottomR, TbottomG, TbottomB, mn * 3);
		const TlineColor = p5.lerpColor(TtopColor, TbottomColor, ((sc)/(canvasHeight+mn)));
		
		for(let x = 0; x < p5.height; x++) {
		  const TlineColor = p5.lerpColor(TtopColor, TbottomColor, ((x+sc)/(canvasHeight+mn)));
			
		  p5.stroke(TlineColor);
		  p5.line(0, x, canvasWidth, x);
		}
		p5.noFill(TlineColor);
		p5.stroke(MtopColor);
		p5.strokeWeight(dim * 0.0015);
		
		const time = p5.millis() / 10;
		const rows = 3.33;
	  
		// Draw each line
		for (let y = 0; y < rows; y++) {
		  // Determine the Y position of the line
		  const v = rows <= 1 ? 0.5 : y / (rows - 1);
		  const py = v * canvasHeight;
		  drawNoiseLine({
				v,
				start: [ 0, py ],
				end: [ p5.width, py ],
				amplitude: amplitude * canvasHeight,
				frequency,
				time: time * 0.0005,
				steps: 5,
				p5
		  	});
		}
	  

		//second angel rotation 
  
		//  strokeWeight(2);
//		p5.noFill();
		p5.stroke(p5.color(255, 255, 255));
//		p5.noFill();
		let secondAngle = p5.map(sc, 0, 59, 0, 360);
		p5.arc(p5.width/2, p5.height/2, 320, 320, -90, secondAngle-90);
		//minute angel rotation 
		//  stroke('Black');
		let minuteAngle = p5.map(mn, 0, 59, 0, 360);
		p5.arc(p5.width/2, p5.height/2, 360, 360, -90, minuteAngle-90);
		//  stroke('#58B95F');
		let hourAngle = p5.map(hr % 12, 0, 12, 0, 360);
		p5.arc(p5.width/2, p5.height/2, 390, 390, -90, hourAngle-90);
		//inside second line movement 



		const randomValue = p5.random();

		if(randomValue < 0.97){
			p5.text("BetterDays", 25, 55);
//			<Sketch drawSkull={drawSkull (p5.width/2, p5.height/2, p5.random(100, 250), p5.random(100, 250), MbottomColor)} />;

			p5.translate(300,300)
			p5.push();
			p5.rotate(secondAngle);
		  	drawSkull (p5, 0, 0, p5.random(250, 250), p5.random(250, 250), MbottomColor);
			p5.pop()
			  //    drawSkull(width/2, height/2, 250, 250, MbottomColor);
		}
		else{
			p5.text("BreakAways", p5.width/2, p5.height/2,);
			p5.push();
			p5.rotate(secondAngle);
		  	drawSkull (p5, p5.random(p5.width), p5.random(p5.height), p5.random(10, 220), p5.random(10, 230), MbottomColor, canvasWidth, canvasHeight);
			p5.pop()
			  //		  drawSkull (p5.mouseX, p5.mouseY, p5.random(10, 220), p5.random(10, 230), MbottomColor);
		}  
		// Try passing in mouseX and mouseY!
	  //  drawSkull(width/2, height/2, random(10, 220), random(10, 250), MbottomColor);
		
	  //  drawSkull (random(width), random(height), random(10, 220), random(10, 230), MbottomColor);
	  //  drawSkull (mouseX, mouseY, random(10, 220), random(10, 230), MbottomColor);
	  
//		return <Sketch setup={setup} draw={draw} />;
//		return <Sketch setup={setup} draw={draw} drawSkull={drawSkull} />;
 	  
	};

	const drawNoiseLine = (opt = {}) =>{
	const {
	  v,
	  start,
	  end,
	  steps = 10,
	  frequency = 1,
	  time = 0,
	  amplitude = 1,
	  p5
	} = opt;
	
	const [ xStart, yStart ] = start;
	const [ xEnd, yEnd ] = end;
	 
	// Create a line by walking N steps and interpolating
	// from start to end point at each interval
	p5.beginShape();
	for (let i = 0; i < steps; i++) {
	  // Get interpolation factor between 0..1
	  const t = steps <= 1 ? 0.5 : i / (steps - 1);
	  
	  // Interpolate X position
	  const x = p5.lerp(xStart, xEnd, t);
		  
	  // Interpolate Y position
	  let y = p5.lerp(yStart, yEnd, t);
	  
	  // Offset Y position by noise
	  y += (simplex.noise3D(t * frequency + time, v * frequency, time)) * amplitude;
	  
	  // Place vertex
	  p5.vertex(x, y);
	}
	p5.endShape();
	}
	  
	const drawSkull=(p5, skullX, skullY, skullWidth, skullHeight, MbottomColor, canvasWidth, canvasHeight) =>{

		// Change the fill color to a random color.
		var funColor = p5.random(30, 32);
		var funColor2 = p5.random(1, 2);
	  //  fill(random(255), random(255), random(255));
	  	p5.fill(funColor,funColor2, funColor*2);
	  	p5.noStroke();
	  
		// Draw the top circle part of the skull.
		p5.ellipse(skullX, skullY, skullWidth, skullHeight);
		var eyeSpacing = skullWidth / 5;
		var eyeWidth = skullWidth / 2.75;
		var eyeHeight = skullHeight / 2.75;
		var teethWidth = skullWidth / 35;
		var teethHeight = skullHeight / 12;
		var teethTop = skullY + skullHeight / 1.6;
		var teethSpacing = skullWidth /13.8;
		var teethSide = skullX - (teethSpacing*3.6)+(teethWidth);
	  //  var funColor = fill(random(255), random(255), random(255));
	  
		// Draw the bottom rectangle part of the skull.
		p5.rect(skullX - skullWidth / 3.6,
		  skullY + skullHeight / 4.4,
		  skullWidth / 1.8,
		  skullHeight / 2.1);
	  //  fill(255);
	    p5.rect(skullX-(teethWidth/2),
		  skullY+skullHeight/1.8,
		  teethWidth*1.2,
		  teethHeight/2);
	  
		// Change the fill color to black.
		p5.fill(MbottomColor);
	  
		// Below, we use the skullX, skullY, skullWidth, and skullHeight
		// variables to draw the eyes and teeth inside the skull.
		// If this is confusing, try drawing out a few examples
		// with a pencil on a piece of graph paper!
	  
		// Draw the eyes.
	  //  var eyeSpacing = skullWidth / 5;
	  //  var eyeWidth = skullWidth / 2.75;
	  //  var eyeHeight = skullHeight / 2.75;
	    p5.ellipse(skullX - eyeSpacing,
		  skullY,
		  eyeWidth,
		  eyeHeight);
	    p5.ellipse(skullX + eyeSpacing,
		  skullY,
		  eyeWidth,
		  eyeHeight);
		p5.ellipse(skullX,
		  skullY+skullHeight/2.4,
		  eyeWidth,
		  eyeHeight);
		p5.rect(skullX - skullWidth / 5.8,
		  skullY,
		  eyeWidth / 2.3,
		  eyeHeight*1.25);
		p5.rect(skullX + eyeSpacing / 11,
		  skullY,
		  eyeWidth / 2.3,
		  eyeHeight*1.25);
	  
		
		
		
		// Draw the teeth.
	  //  var teethWidth = skullWidth / 35;
	  //  var teethHeight = skullHeight / 10;
	  //  var teethTop = skullY + skullHeight / 1.6;
	  //  var teethSpacing = skullWidth /14;
	    p5.rect(teethSide,
		  teethTop,
		  teethWidth,
		  teethHeight);
		p5.rect(teethSide+teethSpacing,
		  teethTop,
		  teethWidth,
		  teethHeight);
		p5.rect(teethSide+teethSpacing*2,
		  teethTop,
		  teethWidth,
		  teethHeight);
		p5.rect(teethSide+teethSpacing*3,
		  teethTop,
		  teethWidth,
		  teethHeight);
		p5.rect(teethSide+teethSpacing*4,
		  teethTop,
		  teethWidth,
		  teethHeight);
		p5.rect(teethSide+teethSpacing*5,
		  teethTop,
		  teethWidth,
		  teethHeight);
		p5.rect(teethSide+teethSpacing*6,
		  teethTop,
		  teethWidth,
		  teethHeight);
	  
		p5.fill(funColor, funColor2, funColor*2);
		p5.rect(skullX-(teethWidth/2),
		  skullY+skullHeight/1.8,
		  teethWidth*1.2,
		  teethHeight/2);
	  
		p5.fill(funColor, funColor2, funColor*2);
		p5.rect(skullX-teethWidth/2,
		  skullY+skullHeight/2.8,
		  teethWidth,
		  eyeHeight/3);
		p5.rect(skullX-(eyeWidth/5.8),
		  skullY+skullHeight/2.5,
		  eyeWidth/3,
		  eyeHeight/13);
	  
		p5.rect(skullX-eyeSpacing*1.0,
		  skullY-eyeHeight/2,
		  teethWidth,
		  eyeHeight);
		p5.rect(skullX+eyeSpacing*.9,
		  skullY-eyeHeight/2,
		  teethWidth,
		  eyeHeight);
	  
	}
	return <Sketch setup={setup} draw={draw} drawSkull={drawSkull} />;
//		  return <Sketch drawSkull={drawSkull} />;


	};

export default Day6;
