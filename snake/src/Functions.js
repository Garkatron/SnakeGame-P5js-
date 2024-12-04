export function checkCollisionWith(object1, object2) {
    return object1.x < object2.x + object2.w &&
        object1.x + object1.w > object2.x &&
        object1.y < object2.y + object2.h &&
        object1.y + object1.h > object2.y;
}


export function makeLonger(snakeHead, size) {
    let prev = snakeHead
    for (let index = 0; index < size; index++) {
        prev = prev.addPart()
    }
}

export function createTable(canvasWidth, canvasHeight) {
    let table = Array(canvasHeight)

    for (let index = 0; index < table.length; index++) {
        table[index] = Array(canvasWidth);
    }

    for (let index = 0; index < table.length; index++) {

        for (let index2 = 0; index2 < table[index].length; index2++) {

            if (index == 0 || index == table.length - 1 || index2 == 0 || index2 == table[index].length - 1) {
                table[index][index2] = 1 // ? WALL
            } else {
                table[index][index2] = 0 // ? FLOOR
            }

        }

    }
    return table
}

export function drawTable(p, table, scale) {
    for (let index = 0; index < table.length; index++) {
        for (let index2 = 0; index2 < table[index].length; index2++) {

            // ? I'm drawing the floor here
            p.fill("#a7c957");
            p.rect(index * (16 * scale), index2 * (16 * scale), 16 * scale, 16 * scale);

            // ? I'm drawing the walls
            if (index == 0 || index == table.length - 1 || index2 == 0 || index2 == table[index].length - 1) {
                if (table[index][index2] == 1) {
                    p.fill("#383838");
                    p.rect(index * (16 * scale), index2 * (16 * scale), 16 * scale, 16 * scale);
                }
            }
        }
    }
}