class GridObjWeeds extends GridObj {

    constructor(props: ObjProps) {
        super({ ...props, tags: ["plant"] });
    }

    drawDescription(x: number, y: number) {
        this.p.text("Remove with\nsickle.", x, y);
    }
}
