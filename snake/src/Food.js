import BasicThing from "./BasicThing.js"
export default class Food extends BasicThing {
    constructor(x, y, s = 1) {
        super(0, 0, 16, 16, s)
        this.x = x * (16 * s)
        this.y = y * (16 * s)
    }
    deleteFromArray(array) {
        const index = array.indexOf(this);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
    draw(p, color) {
        p.fill(color)
        p.rect(this.x, this.y, this.w, this.h, 10);

        p.fill("Brown")
        p.rect(this.x + this.w / 3, this.y - 16, 16, this.h -10, 10);
        
        p.fill("#a63143")
        p.rect(this.x, this.y+30, this.w, this.h-30, 10);

       

    }
}