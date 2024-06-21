interface ToolProps extends ObjProps {

}

abstract class Tool extends Obj implements Holdable, ToolProps {

    constructor(props: ToolProps) {
        super(props);
    }

    override drawDescription(x: number, y: number, source: Source) {
        super.drawDescription(x, y, source);
        this.p.text(`On use:`, x, y);
        this.p.text(`+`, x + 16, y + 40);
        // this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
    }

    override onSelect(source: Source) {
        this.data.hold = { holdable: this, source, data: {} };
    }

    release() {
        this.data.hold = null;
    }

    abstract inHandStep(holdData: HoldData, mouseEvents: MouseEvents, mx: number, my: number): void;

}
