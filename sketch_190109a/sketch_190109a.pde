public enum States {First, Spiral, Line, Thanks};
States state = States.First;
PImage img;
PImage img2;
ArrayList<String> data;
String dateString;
PrintWriter out;

void setup() {
  background(255);
  //size(displayWidth, displayHeight);
  size(1920, 1080);
  textSize(30);
  img = loadImage("spiral.png");
  img2 = loadImage("lines.png");
  data = new ArrayList<String>();
}

void draw() {
  switch(state) {
  case First: {
    FirstDraw();
    break;
  }
  case Spiral: {
    SpiralDraw();
    break;
  }
  case Line: {
    LineDraw();
    break;
  }
  case Thanks: {
    ThanksDraw();
    break;
  }
  }
}

void mouseReleased() {
  switch(state) {
  case First: {
    if(overRect(width/2-200, height/2-100, 400, 200)) {
      state = States.Spiral;
      background(255);
      image(img, 0, 0);
      
      //intialize file
      dateString = month() + "-" + day() + "-" + year() + ":" + hour() + ":"+ minute() + ":" + second();
      data.add(millis() + " - Spirals Begun");
      out = createWriter("tremorlog"+ dateString + ".txt");
    }
    break;
  }
  case Spiral: {
    if(overRect(width-400, height-200, 400, 200)) {
      background(255);
      //drawLines();
      state = States.Line;
      image(img2, 0, 0);
      data.add(millis() + " - Lines Begun");
    }
    break;
  }
  case Line: {
    if(overRect(width-400, height-200, 400, 200)) {
      background(255);
      state = States.Thanks;
      data.add(millis() + " - Test Over");
    }
    break;
  }
  case Thanks: {
    state = States.First;
    break;
  }
  }
}

void drawLines() {
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2-300, width * 0.7, 10);
  rect(width/2, height/2-150, width * 0.7, 10);
  rect(width/2, height/2-100, width * 0.7, 10);
  rect(width/2, height/2-60, width * 0.7, 10);
  rectMode(CORNER);
}

boolean overRect(int x, int y, int width, int height)  {
  if (mouseX >= x && mouseX <= x+width && 
      mouseY >= y && mouseY <= y+height) {
    return true;
  } else {
    return false;
  }
}


void FirstDraw() {
  background(255);
  fill(100,200,100);
  noStroke();
  rect(width/2-200, height/2-100, 400, 200);
  fill(0);
  text("START TEST", width/2-200, height/2-100, 400, 200);
}

void SpiralDraw() {
  stroke(0);
  if(mousePressed == true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    data.add(millis() + " - " + pmouseX + ", " + pmouseY + ", " + mouseX + ", " + mouseY);
  }
  fill(100,200,100);
  noStroke();
  rect(width-400, height-200, 400, 200);
  fill(0);
  text("DONE WITH TASK", width-400, height-200, 400, 200);
}

void LineDraw() {
  stroke(0);
  if(mousePressed == true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    data.add(millis() + " - " + pmouseX + ", " + pmouseY + ", " + mouseX + ", " + mouseY);
  }
  fill(100,200,100);
  noStroke();
  rect(width-400, height-200, 400, 200);
  fill(0);
  text("DONE WITH TASK", width-400, height-200, 400, 200);
}

void ThanksDraw() {
  String[] output = new String[data.size()];
  for(int i = 0; i < data.size(); i++) {
    output[i] = data.get(i);
    out.println(data.get(i));
  }
  out.flush();
  out.close();
 
  saveStrings("rstrstrs", output);
  data.clear();
  text("THANK YOU FOR PLAYING, click to continue", width/2, height/2);
}
