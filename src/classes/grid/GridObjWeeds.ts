class GridObjWeeds extends GridObj {

    constructor(data, p, name, img) {
        super(data, p, name, img, ["plant"]);
    }

    drawDescription(x, y) {
        this.p.text("Remove with\nsickle.", x, y);
    }
}
