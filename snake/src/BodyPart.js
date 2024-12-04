import BasicThing from "./BasicThing.js"

export default class BodyPart extends BasicThing {
  constructor(headColor, bodyColor, x, y, s) {
    super(x * (16 * s), y * (16 * s), 16, 16, s);


    this.headColor = headColor
    this.bodyColor = bodyColor

    this.isHead = false

    this.body = null // ? Attached bodypart of this bodypart
    this.tail = null // ? Tails of this bodypart

    this.lastDir = "UP"
    this.dir = "NONE"; // ? Snake movement direction

    this.px = this.x; // ? Previous x
    this.py = this.y; // ? Previous y

    this.speed = 5; // ? Speed in steps
    this.moveInterval = 0.1; // ? Interval between movements in seconds
    this.lastMoveTime = 0;
  }

  // * <- DRAW METHOD -> * //
  draw(p) {

    if (this.body) {
      this.body.draw(p)
    }

    p.fill(this.headColor)
    p.rect(this.x, this.y, this.w, this.h);

    // ? Head Details
    if (this.isHead) {

      // * LEFT
      p.fill("black")
      p.rect(this.x, this.y + this.h - 30, 15, 20, 4);

      // * RIGHT
      p.fill("black")
      p.rect(this.x + this.w - 15, this.y + this.h - 30, 15, 20, 4);


      p.fill("white")
      if (this.dir === "UP") {
        p.rect(this.x, this.y + this.h - 30, 15, 10, 4);

        p.rect(this.x + this.w - 15, this.y + this.h - 30, 15, 10, 4);
      } else {
        p.rect(this.x, this.y + this.h - 20, 15, 10, 4);

        p.rect(this.x + this.w - 15, this.y + this.h - 20, 15, 10, 4);
      }


    }

  }

  // * <- SNAKE MOVEMENT -> * //
  move(deltaTime) {
    this.updateBody();

    this.lastMoveTime += deltaTime / 1000;

    if (this.lastMoveTime >= this.moveInterval) {
      this.lastMoveTime = 0;

      const step = 16 * this.s;

      const directionMap = {
        "RIGHT": { x: step, y: 0 },
        "LEFT": { x: -step, y: 0 },
        "UP": { x: 0, y: -step },
        "DOWN": { x: 0, y: step },
        "NONE": { x: 0, y: 0 }
      };

      // Validar dirección antes de mover
      if (this.dir !== this.getOppositeDirection(this.lastDir)) {
        this.lastDir = this.dir;
      }

      this.x += directionMap[this.lastDir].x;
      this.y += directionMap[this.lastDir].y;
    }
  }
  getOppositeDirection(dir) {
    const opposites = {
      "RIGHT": "LEFT",
      "LEFT": "RIGHT",
      "UP": "DOWN",
      "DOWN": "UP"
    };
    return opposites[dir];
  }

  moveTo(dir) {
    if (dir === this.getOppositeDirection(this.lastDir)) {
      // Ignorar el cambio si es opuesto a la última dirección
      return;
    }

    // Permitir cambio de dirección solo si no es opuesto
    this.dir = dir;
  }

  updateBody() {
    if (this.body) {
      if (this.px != this.x || this.py != this.y) {
        this.body.x = this.px
        this.body.y = this.py
      }
      this.body.updateBody()
    }
    this.px = this.x
    this.py = this.y
  }

  // * <- SNAKE BODY -> * //

  markAsHead() {
    this.isHead = true
    return this
  }

  addPart() {
    const part = new BodyPart(this.bodyColor, this.bodyColor, this.px, this.py, this.s);

    part.x = this.px;
    part.y = this.py - 16 * this.s;

    if (this.body) {
      this.body.addPart();
    } else {
      this.body = part;
      this.tail = this.body
    }
    return part;
  }

  addAtTail() {
    if (this.tail) {
      this.tail = this.tail.addPart()
    }
  }

  // * <- COLLISION -> * //

  checkSelfCollision() {
    let currentPart = this.body;

    while (currentPart) {
      if (this.x === currentPart.x && this.y === currentPart.y) {
        return true;
      }
      currentPart = currentPart.body;
    }

    return false;
  }


  checkTableCollision(s, table) {
    let col = false;
    let head = this
    const tableWidth = (table.length - 1) * (16 * s);
    const tableHeight = (table[table.length - 1].length - 1) * (16 * s);
    const minBoundary = 0 + (16 * s);
    const maxBoundaryX = tableWidth - 32;
    const maxBoundaryY = tableHeight - 32;

    if (head.x >= maxBoundaryX) {
      head.x = maxBoundaryX;
      col = true;
    } else if (head.x < minBoundary) {
      head.x = minBoundary;
      col = true;
    }

    if (head.y >= maxBoundaryY) {
      head.y = maxBoundaryY;
      col = true;
    } else if (head.y < minBoundary) {
      head.y = minBoundary;
      col = true;
    }

    return col;
  }

  // * <- TECNICAL -> * //

  _getLength(n) {
    if (this.body) {
      return this.body._getLength(n + 1);
    } else {
      return n;
    }
  }
  getLenght() {
    if (this.body) {
      return this.body._getLength(n + 1);
    } else {
      return n;
    }
  }
  printLength() {
    let n = 0;
    console.log(this._getLength(n))
  }


}