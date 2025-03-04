class KCWave {
    constructor() {
      this.yoff = 0.0;
      this.hue = random(360);
      this.saturation = random(360);
      this.brightness = random(360);
    }
  
    update() {
      this.yoff += 0.03;
    }
  
    display(level, xOffset) {
      let xoff = xOffset;
      for (let x = 0; x <= width; x += 1) {
        let y = map(noise(xoff, this.yoff), 0, 1, 0, height);
        let hue = (frameCount + x) % 360;
        hue += map(level, 0, 1, -70, 50);
        let shapeSize = 25 + level * 100 * sin(frameCount * 0.05);
        fill(hue, 100, 100);
        let KCwaveHeight = sin(frameCount * 0.1 + x * 0.9) * 70 * level * 2;
        let shapeType = random(shapeTypes);
        if (shapeType === 0) {
          ellipse(x, y + KCwaveHeight, shapeSize, shapeSize);
        } else if (shapeType === 1) {
          rect(x - shapeSize / 2, y + KCwaveHeight, shapeSize, shapeSize);
        } else if (shapeType === 2) {
          triangle(x, y + KCwaveHeight - shapeSize / 2, x - shapeSize / 2, y + KCwaveHeight + shapeSize / 2, x + shapeSize / 2, y + KCwaveHeight + shapeSize / 2);
        }
        xoff += 0.02;
      }
    }
   changeColor() {
      let hueRange = 250; // Max range for hue change
      let saturationRange = 250; // Max range for saturation change
  
      this.hue = (this.hue + random(-hueRange, hueRange)) % 360;
      this.saturation = constrain(this.saturation + random(-saturationRange, saturationRange), 0, 100, 250);
    }
  
    addDistortion(amount) {
      for (let x = 1; x <= width; x += 50) {
        let y = map(noise(xoff, this.yoff), 0, 10, 50, height);
        y += random(-amount, amount); // distortion
        let hue = (frameCount + x) % 360;
        hue += map(level, 0, 50, -70, 50);
        let shapeSize = 25 + level * 100 * sin(frameCount * 0.55);
        fill(hue, 100, 100);
        let KCwaveHeight = sin(frameCount * 0.1 + x * 0.50) * 100 * level * 5;
        let shapeType = random(shapeTypes);
        if (shapeType === 0) {
          ellipse(x, y + KCwaveHeight, shapeSize, shapeSize);
        } else if (shapeType === 1) {
          rect(x - shapeSize / 2, y + KCwaveHeight, shapeSize, shapeSize);
        } else if (shapeType === 2) {
          triangle(x, y + KCwaveHeight - shapeSize / 2, x - shapeSize / 2, y + KCwaveHeight + shapeSize / 2, x + shapeSize / 2, y + KCwaveHeight + shapeSize / 2);
        }
        xoff += 0.11;
      }
    }
  }
  
  
  
  let numWaves = 4;
  let waves = [];
  let mic;
  let xOffset = 1;
  let shapeTypes = [0, 1, 2];
  
  function setup() {
    createCanvas(1000, 700);
    colorMode(HSB, 360, 100, 100);
  
    mic = new p5.AudioIn();
    mic.start();
  
    for (let i = 0; i < numWaves; i++) {
      waves[i] = new KCWave();
    }
  }
  
  function draw() {
    background(0);
    noStroke();
  
    let level = mic.getLevel();
    level *= 5;
  
    for (let wave of waves) {
      wave.display(level, xOffset);
      wave.update();
    }
  
    xOffset += 0.05;
    if (xOffset > 10) {
      xOffset = 0;
    }
  }
  function keyPressed() {
  
    if (keyIsPressed === true) {
        let k = key;
        console.log("k is " + k);
  
        if (k == 's' || k == 'S') {
            console.log("Stopped Recording");
            recMode = false;
            noLoop();
        }
  
        if (k == 'k') {
            console.log("Start Recording");
            recMode = true;
            loop();
        }
    }
    key="k";
  }
  
