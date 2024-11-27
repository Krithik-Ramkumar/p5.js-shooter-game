/* 
  
  @ author: Krithik Ramkumar
  @ date: May 23, 2024
  @ teacher: Mr.Ghorvei
  @ program: Culminating Game
  @ institution: JFSS
  
*/

//Declaring the function variables
let ship;
let a;

//Declaring player specific arrays and variables
let player = {x:40, y:200, x1:40, y1:240, x2:80, y2:220, score:0, health:200}
let asteriods = [];
let laser = [];

//name variables
let x = 80
let y = 820;
let r = 0;
let g = 30;
let b = 50;

//number and speed of asteriods
let num = 10;
let speed = 2;

//Function setup
function setup() {
  createCanvas(800,1000);      //Creates canvas
  ship = new Ship();           //Stores a new function Ship under "ship" variable
  
}

//Opening Function Draw
function draw() {
  
  background(0);                // Background set to black
  
  ship.displayShip();           // Executes function displayShip under function Ship 
  name();                       // Executes function name
  
  if(asteriods.length < 1){     //If statement checks if the length of array asteriods is under 1
    
    for(let i = 0; i < num; i++){  // Opening for loop
      
      //Declaring variables for asteriods
      let astX = 1000;  
      let astY = random(70, 730);
      let astR = 15;
      
      //Stores a new function ast under "a" variable
      a = new ast(astX, astY, astR, i);

      asteriods.push(a);           //pushes a to array asteriods
      
    }
    
    if(asteriods.length < num){       //If statement checks if the length of array asteriods is under num value
      
      for(let i = asteriods.length; i < num; i++){    //opening for loop
        
        asteriods.push(a);    //pushes a to array asteriods
        
      }    //closing for loop        
    }                               //Closing inner if statement
  }                                 //Closing outer if statement
  
  if(player.health < 5){            //If statement checks if player.health value is under 5
    
    push();
    
    fill(255);           //fill of white
    textSize(30);        //size of text set to 30
    textAlign(CENTER);   //aligns text to center
    text("Game Over!! Better luck Next Time.", 400, 400);    //displays text
    
    pop();
    
    if(player.health < 0){    //if statement checks if player.health value is under 0
      
      player.health = 0;    //player.health set to 0
      
    }    //closing inner if statement
    
    noLoop();    //Stops function draw loop
    
  }    //closing our if statement
  
  
  
  for(let i = 0; i < asteriods.length; i++){    //Opening for loop
      
    asteriods[i].displayAst();    //Calls displayAst function on each item in array asteriods
      
  }    //closing for loop
  
  for(let i = 0; i < laser.length; i++){    //Opening for loop
    
    laser[i].displayLaser();    //Calls displayLaser function on each item in array laser
      
  }    //closing for loop
  
  
  if(keyIsDown(38) || keyIsDown(87)){    //if statement checks if Up Arrow or W key is down
    
    player.y -= 5;    //player.y subtracts 5
    player.y1 -= 5;   //player.y1 subtracts 5
    player.y2 -= 5;   //player.y2 subtracts 5
    
  }    //closing if statement
  
  if(keyIsDown(40) || keyIsDown(83)){    //if statement checks if Down Arrow or S key is down
    
    player.y += 5;    //player.y adds 5
    player.y1 += 5;   //player.y1 adds 5
    player.y2 += 5;   //player.y2 adds 5
    
  }    //closing if statement
  
  if(player.y < 50){    //if statement checks if player.y is under 50
    
    player.y = 50;    //player.y set to 50
    player.y1 = 90;   //player.y1 set to 90
    player.y2 = 70;   //player.y2 set to 70
    
  }    //closing if statement
  
  if(player.y1 > 750){    //if statement checks if player.y1 is under 750
    
    player.y = 710;    //player.y set to 710
    player.y1 = 750;   //player.y1 set to 750
    player.y2 = 730;   //player.y2 set to 730
    
  }    //closing if statement
}    //closing function draw

//function keyPressed
function keyPressed(){
  
  if(keyIsDown(32)){    //if statement checks if Space Bar is down
    
    append(laser, new Laser(player.x2, player.y2));    //appends new function Laser into array laser
    
    r += random(5, 150);    //r adds random value between 5 and 150
    b += random(5, 150);    //g adds random value between 5 and 150
    g += random(5, 150);    //b adds random value between 5 and 150
    
    if(r >= 255){    //if statement checks if r is greater than or equal to 255
      r = 0    //r set to 0
    }    //closing if statement
    
    if(g >= 255){    //if statement checks if g is greater than or equal to 255
      g = 0    //g set to 0
    }    //closing if statement
    
    if(b >= 255){    //if statement checks if b is greater than or equal to 255
      b = 0    //b set to 0
    }    //closing if statement
  }    //closing outer if statement
}    //closing function keyPressed

//function Ship
function Ship(){
  
  this.displayShip = function(){    //function Ship.displayShip
  
    push();
    
    //ship
    stroke(255);
    fill(0);
    triangle(player.x, player.y, player.x1, player.y1, player.x2, player.y2);
    
    //red line behind ship
    stroke(255, 0, 0);
    line(player.x - 5, player.y, player.x1 - 5, player.y1);
    
    //bottom horizontal line
    stroke(255);
    strokeWeight(5);
    line(0, 800, 800, 800);
    
    //player borderline
    stroke(255);
    strokeWeight(5);
    line(120, 0, 120, 800);
    
    //score and health displays
    strokeWeight(1);
    fill(255);
    textSize(15);
    text("Score:", 10, 20);
    text(player.score, 60, 20);
    text("Health:", 10, 40);
    text(player.health, 65, 40);
    
    //game controls
    textSize(20);
    text("Up Arrow or W: Up", 130, 785);
    text("Down Arrow or S: Down", 350, 785);
    text("Space Bar: Shoooot!", 600, 785);
    
    pop();
    
  }    //closing function Ship.display
}    //closing function Ship

//function Laser
function Laser(x, y){
  
  this.displayLaser = function(){    //function Laser.displayLaser
    
    push();
    
    //laser
    stroke(255, 0, 0);
    strokeWeight(5);
    circle(x, y, 2);
    x += 15;    //x adds 15
    
    pop();
    
    for(let i = asteriods.length - 1; i >= 0; i--){    //opening for loop
      
      if(asteriods[i].contains(x, y)){    //if statement checks boolean value from ast.contains
        
        asteriods.splice(i, 1);    //removes function ast from array asteriods
        player.score += 5;    //player.score adds 5
        
      }    //closing if statement
    }    //closing for loop
  }    //closing function Laser.displayLaser
}    //closing function Laser

//function ast
function ast(x, y, r,i){
  
  this.displayAst = function(){    //function ast.displayAst
    
    push();
    
    //asteriods
    stroke(255);
    fill(0);
    circle(x, y, r*2);
    
    pop();
    
    x -= speed;    //x subtracts variable speed
    
    if(x <= 120 + r*2){    //if statement checks if x is lesser than or equal to 120 + r times 2
    
      asteriods.splice(i, 1);    //removes function ast from array asteriods
      player.health -= 5;    //player.health subtracts 5
      
      if(asteriods.length != 0){    //if statement checks if array asteriods length is not equal to 0
        
        shorten(asteriods);    //shortens array asteriods
        player.health -= 5;    //player.health subtracts 5
        
      }    //closing inner if statement
    }    //closing outer if statement 
  }    //closing function ast.displayAst
  
  
  this.contains = function(px,py){    //function ast.contains
    
    let d = dist(x, y, px, py);    //d set to the distance between x, y and px, py
    
    if(d < r){    //if statement checks if d is lesser than r
      
      return true;    // returns true
      
    }    //closing if statement
    
    else{    //else statement
      
      return false;    //returns false
      
    }    //closing else statement
  }    //closing function ast.containsw 
}    //closing function ast

//function name
function name(){
  
  push();
  
  //name's color and other specs
  fill(0);
  stroke(r, g, b);
  strokeWeight(10);
  
  //K
  line(x, y, x, y + 160);
  line(x + 60, y, x, y + 80);
  line(x, y + 80, x + 60, y + 160);
  
  //R
  line(x + 100, y, x + 100, y + 160);
  arc(x + 105, y + 47, 100, 95, PI + HALF_PI, HALF_PI)
  line(x + 100, y + 80, x + 160, y + 160);
  
  //I
  line(x + 200, y, x + 200, y + 160);
  
  //T
  line(x + 300, y, x + 300, y + 160);
  line(x + 250, y, x + 350, y);
  
  //H
  line(x + 400, y, x + 400, y + 160);
  line(x + 400, y + 80, x + 470, y + 80);
  line(x + 470, y, x + 470, y + 160);
  
  //I
  line(x + 520, y, x + 520, y + 160);
  
  //K
  line(x + 560, y, x + 560, y + 160);
  line(x + 620, y, x + 560, y + 80);
  line(x + 560, y + 80, x + 620, y + 160);
  
  pop();
  
  
} //closing function name