class GridObjWeeds extends GridObj {

    constructor(props: ObjProps) {
        super({ ...props, tags: ["plant"] });
    }

    drawDescription(x: number, y: number) {
        this.p.text("Remove with\nscythe.", x, y);
    }

    onWatering: undefined;
    onHarvest: undefined;
}
