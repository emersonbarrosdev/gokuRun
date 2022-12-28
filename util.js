class Obj {

  frame = 0;
  timer = 0;
  visible = true;

  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  draw() {
    if (this.visible) {
      const img = new Image();
      img.src = this.image;
      canvas.drawImage(img, this.x, this.y, this.width, this.height);
    }
  }

  animation(speed, limit, name) {
    this.timer += 1;
    if (this.timer >= speed) {
      this.timer = 0;
      this.frame += 1;
    }
    if (this.frame >= limit) {
      this.frame = 0;
    }

    this.image = "assets/images/" + name + this.frame + ".png";

  }

  collide(obj) {
    if (this.x < obj.x + obj.width &&
      this.x + this.width - 60 > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height - 60 > obj.y) {
      return true;
    } else {
      return false;
    }
  }
}

class Text {
  text = "";
  image = new Image();

  constructor(text) {
    this.text = text;
  }

  drawText(style, size, font, x, y, color) {
    canvas.font = style + " " + size + "px" + " " + font;
    canvas.fillStyle = color;
    canvas.fillText(this.text, x, y);
  }

  updateText(value) {
    this.text = value;
  }
}

class Goku extends Obj {
  speed = 3;
  gravity = 2;
  jumps = 2;
  lifes = 3;

  move() {
    if (this.speed < 10) {
      this.speed += this.gravity;
    }
    this.y += this.speed;
    this.jumps;
  }

  limits() {
    if (this.y >= 425) {
      this.y = 425;
      this.jumps = 2;
    }
    if (this.y <= 10) {
      this.y = 10;
    }
  }
}

class Magic extends Obj {
  move(speed, limit, position) {
    this.x -= speed;
    if (this.x <= limit) {
      this.x = Math.random() * (1280) + 1280;
      this.y = position;
    }
    if (this.x <= -50) {
      this.visible = true;
    }
  }
}

class Coin extends Obj {
  move(speed, limit) {
    this.x -= speed;
    if (this.x <= limit) {
      this.x = Math.random() * (1281) + 1280;
      this.y = Math.floor(Math.random() * (400 - 100) + 100);
    }
    if (this.x <= -50) {
      this.visible = true;
    }
  }
}

class Potion extends Obj {
  move(speed, limit, position) {
    this.x -= speed;
    if (this.x <= limit) {
      this.x = Math.floor(Math.random() * (1281) + 15000);
      this.y = position;
    }
    if (this.x <= -50) {
      this.visible = true;
    }
  }
}