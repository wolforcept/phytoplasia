class GridObjRock extends GridObj {

    constructor(props: ObjProps) {
        super({ ...props, tags: ["mineral"] });
    }

    drawDescription(x: number, y: number) {
        this.p.text("Remove with\npickaxe.", x, y);
    }
    
    onWatering: undefined;
    onHarvest: undefined;
}
