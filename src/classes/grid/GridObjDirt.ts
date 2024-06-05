class GridObjDirt extends GridObj {

    constructor(data, p, name, img) {
        super(data, p, name, img, []);
    }

    drawDescription(x, y) {
        this.p.text("Usable soil.", x, y);
    }
}
