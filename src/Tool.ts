interface ToolProps extends ObjProps {

}

abstract class Tool extends Obj implements Hoverable, Holdable, ToolProps {

    constructor(props: ToolProps) {
        super(props);
    }

    drawDescription(x: number, y: number) {
        super.drawDescription(x, y);
        this.p.text(`On use:`, x, y);
        this.p.text(`+`, x + 16, y + 40);
        // this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
    }

    onSelect(source: Source) {
        this.data.holdData = { holdable: this, data: {} };
    }

    release() {
        this.data.holdData = { holdable: null, data: null };
    }

    abstract inHandStep(mouseEvents: MouseEvents, mx: number, my: number): void;

    // onUse(source: Source, destination: Destination) {
    //     if (source.location === "tools" && destination.location == "grid") {
    //         const { gx, gy } = destination.data;
    //         this.onUseOnGrid(gx, gy);
    //     }
    //     this.data.holdData = { holdable: null, data: null };
    // }

    // onUseOnGrid(gx: number, gy: number) {
    //     console.log(`Tool ${this.id}.onUseOnGrid(gx:${gx}, gy:${gy}) not defined.`);
    // }
}
