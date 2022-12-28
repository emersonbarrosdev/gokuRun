const canvas = document.getElementById('canvas').getContext("2d");
canvas.imageSmoothingEnabled = false;

let goku = new Goku(100, 425, 161, 130, './assets/images/goku1.png');
let magic = new Magic(1300, 460, 70, 70, './assets/images/magic1.png');
let coin = new Coin(50, 50, 40, 60, './assets/images/3.png');
let potion = new Potion(50, 50, 50, 50, './assets/images/potion');

const coinSound = new Audio('./assets/sounds/coin.mp3');
const loseSound = new Audio('./assets/sounds/soudGameOver.mp3');
const hitSound = new Audio('./assets/sounds/perde_vida.mp3');
const hitSound2 = new Audio('./assets/sounds/hit.ogg');
const jumpSound = new Audio('./assets/sounds/jump.wav');
const potionSound = new Audio('./assets/sounds/som_elixir.mp3');
const winSound = new Audio('./assets/sounds/intro.mp3');

let backgroundGameOver = false;
let playGame = true;
let points = 0;

document.addEventListener('click', function (event) {
  if (currentScene.click) {
    currentScene.click();
  }
});

document.addEventListener('click', function (event) {
  if (goku.jumps > 0) {
    goku.jumps -= 1;
    goku.speed -= 43;
  }
})

let currentScene = {}
function changeScene(scene) {
  currentScene = scene;
};

function collision() {
  if (goku.collide(coin)) {
    if (coin.visible) {
      coin.visible = false;
      points++;
      coinSound.play();
    }
  }

  if (goku.collide(potion)) {
    if (potion.visible) {
      potion.visible = false;
      goku.lifes++;
      potionSound.play();
    }
  }

  if (goku.collide(magic)) {
    if (magic.visible) {
      magic.visible = false;
      if (goku.lifes > 1) {
        hitSound.play();
      } else {
        hitSound2.play();
      }
      goku.lifes--;
    }
  }

  let intervalGameWin = setInterval(() => {
    if (points >= 60) {
      magic.visible = false;
      coin.visible = false;
      potion.visible = false;
      backgroundGameOver = true
      clearInterval(intervalGameWin);
      setTimeout(() => {
        playGame = false;
        backgroundGameOver = false
        changeScene(gameWin);
        winSound.play();
      }, 1000);
    }
  }, 10);


  let intervalGameOver = setInterval(() => {
    if (goku.lifes <= 0) {
      magic.visible = true;
      coin.visible = false;
      potion.visible = false;
      backgroundGameOver = true
      clearInterval(intervalGameOver);
      playGame = false;
      setTimeout(() => {
        backgroundGameOver = false
        changeScene(gameOver);
        loseSound.play();
      }, 1000);
    }
  }, 10);
}

const infinityBg = {
  bg: new Obj(0, 0, 1281, 720, './assets/images/fundo.png'),
  bg2: new Obj(-1280, 0, 1280, 720, './assets/images/fundo.png'),
  ground: new Obj(0, 550, 1285, 174, './assets/images/ground2.png'),
  ground2: new Obj(-1280, 550, 1280, 174, './assets/images/ground2.png'),

  draw() {
    this.bg.draw();
    this.bg2.draw();
    this.ground.draw();
    this.ground2.draw();
  },

  moveBg() {
    this.bg.x -= 0.5;
    this.bg2.x -= 0.5;

    if (this.bg.x <= -1280) {
      this.bg.x = 1280;
    }

    if (this.bg2.x <= -1280) {
      this.bg2.x = 1280;
    }
  },

  moveGround() {
    this.ground.x -= 4;
    this.ground2.x -= 4;

    if (this.ground.x <= -1280) {
      this.ground.x = 1280;
    }
    if (this.ground2.x <= -1280) {
      this.ground2.x = 1280;
    }
  },

};

const menu = {
  bgHome: new Obj(0, 0, 1280, 720, './assets/images/home.png'),
  clickPlay: new Text('Click to Play'),
  label: new Text('1 click - jump   |   2 clicks - double jump'),
  guideline: new Text('collect 60 zcoins to win'),

  draw() {
    this.bgHome.draw();
    this.clickPlay.drawText('bold', 50, 'Poppins', 485, 560, '#00FF00');
    this.label.drawText('', 30, 'Poppins', 360, 630, '#fff');
    this.guideline.drawText('bold', 20, 'Poppins', 520, 680, '#FFCC00');

  },

  update() { },

  click() {
    changeScene(game);
  },

};

const game = {
  LabelLife: new Text('Life: '),
  life: new Text('3'),
  score: new Text('0'),
  LabelScore: new Text('Zcoin: '),
  backgroundScore: new Obj(50, 30, 200, 55, '/assets/images/backgroundSore.png'),
  backgroundScore2: new Obj(50, 95, 240, 55, '/assets/images/backgroundSore.png'),

  draw() {
    infinityBg.draw();
    this.backgroundScore.draw();
    this.backgroundScore2.draw();
    this.LabelLife.drawText('bold', 40, 'Poppins', 80, 70, '#fff');
    this.life.drawText('bold', 40, 'Poppins', 180, 70, '#fff');
    this.score.drawText('bold', 40, 'Poppins', 220, 135, '#fff');
    this.LabelScore.drawText('bold', 40, 'Poppins', 80, 135, '#fff');
    goku.draw();
    magic.draw();
    coin.draw();
    potion.draw();
  },

  update() {
    if (playGame) {
      infinityBg.moveBg();
      infinityBg.moveGround();
      goku.move();
      goku.animation(4, 10, 'goku');
      magic.animation(5, 6, 'magic');
      magic.move(8, -100, 460);
      coin.move(4, -100);
      coin.animation(8, 5, '');
      potion.move(4, -100, 100);
      potion.animation(8, 1, 'potion');
      goku.limits();
      this.score.updateText(points);
      this.life.updateText(goku.lifes);
      collision();
    }
  },

  click() {
    jumpSound.play();
  }

};

const gameOver = {
  background: new Obj(0, 0, 1281, 720, '/assets/images/game-over.png'),
  score: new Text('0'),
  scoreText: new Text('Score:'),
  labelGameOver: new Text('GAME OVER'),
  clickHome: new Text('Click to Home'),

  draw() {
    this.background.draw();
    this.labelGameOver.drawText('bold', 70, 'Poppins', 430, 350, '#FFFF00');
    this.scoreText.drawText('bold', 40, 'Poppins', 530, 460, '#fff');
    this.score.drawText('bold', 40, 'Poppins', 680, 460, '#fff');
    this.clickHome.drawText('', 30, 'Poppins', 510, 600, '#fff');
  },

  update() {
    jumpSound.pause();
    this.score.updateText(points);
  },

  cleanScene() {
    goku.lifes = 3;
    points = 0;
    playGame = true;
  },

  click() {
    this.cleanScene();
    changeScene(menu);
  },
};

const gameWin = {
  background: new Obj(0, 0, 1281, 720, '/assets/images/win.png'),
  labelGameOver2: new Text('WINNER'),
  labelGameOver: new Text('WINNER'),
  clickHome: new Text('Click to Home'),
  clickHome2: new Text('Click to Home'),

  draw() {
    this.background.draw();
    this.labelGameOver2.drawText('bold', 100, 'Poppins', 415, 640, '#000000');
    this.labelGameOver.drawText('bold', 100, 'Poppins', 405, 630, '#00FF00');
    this.clickHome2.drawText('', 30, 'Poppins', 512, 682, '#000000');
    this.clickHome.drawText('', 30, 'Poppins', 510, 680, '#fff');
  },

  update() {
    jumpSound.pause();
  },

  cleanScene() {
    goku.lifes = 3;
    points = 0;
    playGame = true;
    winSound.pause();
  },

  click() {
    this.cleanScene();
    changeScene(menu);
  },
};

function main() {
  canvas.clearRect(0, 0, 1280, 720);
  currentScene.draw();
  currentScene.update();
  requestAnimationFrame(main);
};
changeScene(menu);
main();