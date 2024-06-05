// GRID OBJECTS
class GridObj extends Obj {

    tags;

    constructor(data, p, name, img, tags) {
        super(data, p, name, img);
        this.tags = tags;
    }

    draw(gx: number, gy: number, x: number, y: number) {
        this.img.draw(x, y);
    }

    endOfTurn() {
        console.log(`${this.id}.endOfTurn() not defined.`);
    }

    onWatering(gx: number, gy: number) {
    }
}
