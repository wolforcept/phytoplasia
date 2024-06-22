class GridObjDirt extends GridObj {

    constructor(props: ObjProps) {
        super({ ...props, tags: [] });
    }

    drawDescription(x: number, y: number) {
        this.p.text("Usable soil.", x, y);
    }

    onWatering: undefined;
    onHarvest: undefined;
}
