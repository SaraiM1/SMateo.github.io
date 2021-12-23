'use strict';

let state = 'title';
let cnv;
let points = 0;
let lives = 3;
let w = 600;
let h = 600;
let player;
let coins = [];
let enemies = [];
let playerImg;
let coinImg;
let enemyImg;
let coverImg;
let winImg;
let loseImg;

function preload() {
  playerImg = loadImage('assets/icon0.PNG');
  coinImg = loadImage('assets/icon1.PNG');
  enemyImg = loadImage('assets/icon6.PNG');
  coverImg = loadImage('assets/icon1.PNG');
  winImg = loadImage('assets/icon7.PNG');
  loseImg = loadImage('assets/icon8.PNG');


}

function setup() {
  cnv = createCanvas(w, h);

imageMode(CENTER);
rectMode(CENTER);
  textFont('monospace');

  player = new Player();

  //coins[0] = new Coin(); ///same as below
  coins.push(new Coin);
  enemies.push(new Enemy);
}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
      case 'game over':
        gameOver();
        cnv.mouseClicked(gameOverMouseClicked);
        break;
    default:
      break;
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key = ' ') {
    player.direction = 'still';
  }
}

function keyReleased() {

  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)) {
    numberKeysPressed++;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    numberKeysPressed++;
  }

  if (keyIsDown(UP_ARROW)) {
    numberKeysPressed++;
  }

  if (keyIsDown(DOWN_ARROW)) {
    numberKeysPressed++;
  }

  console.log(numberKeysPressed);

  if (numberKeysPressed == 0) {
    player.direction = 'still';
  }
}

function title() {
  background(0,100,0);
  textSize(80);
  strokeWeight(2);
  stroke(25);
  fill(255, 255, 194);
  textAlign(CENTER);
  text('Water The', w / 2, h / 5);
  text('Flowers', w / 2, h / 3);
//  textSize(40);
//  text('But Avoid the Weeds', w/2, h/2.25);

  textSize(30);
    fill(255, 255, 194);
    strokeWeight(2);
    stroke(25);
  text('click anywhere to start', w / 2, h / 1.5);

image(coverImg,w/2,h/2, 50,50)
image(coverImg,w/3,h/2, 50,50)
image(coverImg,w*0.67,h/2, 50,50)

}

function titleMouseClicked() {
  console.log('canvas is clicked');
  state = 'level1'
}

function level1() {
  background(0,100,0);

  if (random(1) <= 0.02) {
    coins.push(new Coin);
  }

  if (random(1) <= 0.02) {
    enemies.push(new Enemy);
  }

  player.display();
  player.move();

  //interating through coins array to display and move them

  //using for loop
  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
  }

  //using forEach loop
  //coins.forEach(function(coin){
  //  coin.display();
  //  coin.move();
  //})

  //using for of loop
  //for (let coin of coins){
  //  coin.display();
  //  coin.move();
  //}

  //  check for collision with coins, if there is a collision increase points by 1 AND splice that coin out of array
  // need to interate backwards through array

  for (let i = coins.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      console.log(points);
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
      coins.splice(i, 1);
      //  console.log('coin is out of town');
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r) / 2) {
      points--;
      console.log(points);
      enemies.splice(i, 1);
    } else if (enemies[i].y > h) {
      enemies.splice(i, 1);
      //  console.log('coin is out of town');
    }
  }

  text(`Points: ${points}`, w / 5, h - 30);

//check point values to win or lose the game
  if(points >=10){
    state = 'you win';
  } else if (points <= -1){
    state = 'game over';
  }

}

function level1MouseClicked() {
  //  points ++;
  //  console.log('points = ' + points);

  //  if (points >= 10){
  //    state = 'you win'
  //  }

}


function youWin() {
  background(245, 210, 10);
  strokeWeight(2);
  //stroke(0, 0, 102);
  stroke(255);
  //fill(0, 43, 128)
  fill(25);
  textSize(80);
  text('YOU WIN!', w / 2, h / 4);
  //text((':D'), w / 2, h/2);

  textSize(30);
  text('click anywhere to restart', w / 2, h * 3/4);

  image(winImg,w/2,h/2, 300, 200)

}

function youWinMouseClicked() {
  state = 'title';
  points = 0;
}

function gameOver() {

  textSize(30);
  text('click anywhere to restart', w / 2, h * 3 / 4);

  background(204, 0, 0);
  textSize(80);
  strokeWeight(2);
  fill(255);
  stroke(25);

  text(('GAME OVER'), w / 2, h / 4);
  text((' :( '), w / 2, h/2);

  textSize(30);
  text('click anywhere to restart', w / 2, h * 3 / 4);

  image(loseImg,w/2,h/2, 300, 200)


}

function gameOverMouseClicked(){
  state = 'title';
  points = 0;
}
