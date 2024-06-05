class GridObjRock extends GridObj {

    constructor(data, p, name, img) {
        super(data, p, name, img, ["mineral"]);
    }

    drawDescription(x, y) {
        this.p.text("Remove with\npickaxe.", x, y);
    }
}
