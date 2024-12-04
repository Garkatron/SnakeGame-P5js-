import Food from "./Food.js"

export function random(min, max) {
    return Math.random() * (max - min) + min;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomFood(q, tw, th, s = 1) {
    let arr = []

    for (let index = 0; index < q; index++) {
        arr[index] = new Food(randomInt(1, tw - 2), randomInt(1, th - 2), s);

    }

    return arr
}


