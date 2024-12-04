export default class BasicThing {
    constructor(x = 0, y = 0, w = 16, h = 16, s = 1) {
        this.x = x
        this.y = y
        this.w = w * s
        this.h = h * s
        this.s = s
    }
    draw(color) {

    }
}

