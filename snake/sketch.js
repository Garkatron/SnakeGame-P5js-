import BodyPart from "./src/BodyPart.js";
import Food from "./src/Food.js";
import { checkCollisionWith, createTable, drawTable, makeLonger } from "./src/Functions.js";
import { randomFood } from './src/Utils';

// * <- CANVAS VARS -> *
let scale = 3;
let canvasWidth = 16;
let canvasHeight = 16;

// * <- TECHNICAL VARS -> *
let table = createTable(canvasWidth, canvasHeight, scale);
let snakeHead = new BodyPart("#ff9933", "#ff8652", 2, 2, scale).markAsHead();
let foodArray = randomFood(1, canvasWidth, canvasHeight, scale);

// * <- GAME VARS -> *
let points = 0;
let gameOver = false;
let gameState = "START"; // STATES: START, PLAY, GAME_OVER

makeLonger(snakeHead, 1);

// * <- FUNCTIONS -> *
function update(deltaTime, p) {
  snakeHead.move(deltaTime);
  gameOver = snakeHead.checkTableCollision(scale, table) || snakeHead.checkSelfCollision();

  if (gameOver) {    
    gameState = "GAME_OVER";
   
  }

  for (const food of foodArray) {
    if (checkCollisionWith(snakeHead, food)) {
      food.deleteFromArray(foodArray);
      points++;
      snakeHead.addAtTail();
      foodArray = randomFood(1, canvasWidth, canvasHeight, scale);
    }
  }
}

function drawStartMenu(p) {
  p.background("#131313");
  p.fill(255);
  p.textSize(32);
  p.textAlign(p.CENTER, p.CENTER);
  p.text("Snake Game", p.width / 2, p.height / 3);
  p.text("Press ENTER to Start", p.width / 2, p.height / 2);
}

function drawGameOverMenu(p) {
  p.background("#131313");
  p.fill(255);
  p.textSize(32);
  p.textAlign(p.CENTER, p.CENTER);
  p.text("Game Over", p.width / 2, p.height / 3);
  p.text(`Score: ${points}`, p.width / 2, p.height / 2);
  p.text("Press ENTER to Restart", p.width / 2, p.height / 1.5);
}

export const mySketch = (p) => {
  p.setup = () => {
    p.noStroke();
    table = createTable(canvasWidth, canvasHeight, scale);
    makeLonger(snakeHead, 1);
    foodArray = randomFood(1, canvasWidth, canvasHeight, scale);
    points = 0;
    p.createCanvas(canvasWidth * 16 * scale, canvasHeight * 16 * scale);
  };

  p.draw = () => {
    p.background(220);
    switch (gameState) {
      case "START":
        drawStartMenu(p);
        break;
      case "PLAY":
        update(p.deltaTime, p);
        drawTable(p, table, scale);
        for (const food of foodArray) {
          food.draw(p, "#ce4257");
        }
        snakeHead.draw(p);
        break;
      case "GAME_OVER":        
        drawGameOverMenu(p);
        break;
    }
  };

  p.keyPressed = () => {
    let key = p.key;
    if (gameState === "START" || gameState === "GAME_OVER") {
      if (key === "Enter") {
        gameState = "PLAY";
        points = 0;
        snakeHead = new BodyPart("#ff9933", "#ff8652", 2, 2, scale).markAsHead();
        makeLonger(snakeHead, 1);
        foodArray = randomFood(1, canvasWidth, canvasHeight, scale);
        p.loop();
      }
    } else if (gameState === "PLAY") {
      if (key === "w" || key === "ArrowUp") {
        snakeHead.moveTo("UP");
      } else if (key === "s" || key === "ArrowDown") {
        snakeHead.moveTo("DOWN");
      } else if (key === "a" || key === "ArrowLeft") {
        snakeHead.moveTo("LEFT");
      } else if (key === "d" || key === "ArrowRight") {
        snakeHead.moveTo("RIGHT");
      }
    }
  };
};
