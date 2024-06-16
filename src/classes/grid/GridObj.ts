interface GridObjProps extends ObjProps {
    tags: Array<string>;
}

class GridObj extends Obj implements ObjProps, Hoverable {

    tags: Array<string>;

    constructor(props: GridObjProps) {
        super(props);
        this.tags = props.tags;
    }

    putOnGrid(source: Source, destination: Destination) {

    }

    draw(gx: number, gy: number, x: number, y: number) {
        this.img.draw(x, y);
    }

    endOfTurn() {
        console.log(`${this.id}.endOfTurn() not defined.`);
    }

    onWatering(gx: number, gy: number) {
    }

    makeCard(): Card | null {
        return null;
    }

}
