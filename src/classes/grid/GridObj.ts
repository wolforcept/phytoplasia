interface GridObjProps extends ObjProps {
    tags: Array<string>;
}

abstract class GridObj extends Obj implements ObjProps {

    tags: Array<string>;

    constructor(props: GridObjProps) {
        super(props);
        this.tags = props.tags;
    }

    abstract onWatering?(source: Source): void;

    override draw(x: number, y: number, source: Source) {
        this.img.draw(x, y);
    }

    onEndTurn(source: Source, gridData: GridData) {
    }

    abstract onHarvest?(source: Source, destination: Destination, gridData: GridData): void;

    makeCard(): Card | null {
        return null;
    }

}
