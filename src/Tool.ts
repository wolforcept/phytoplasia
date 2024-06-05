class Tool extends Obj {

    constructor(data, p, name, img) {
        super(data, p, name, img);
    }

    drawDescription(x, y) {
        this.p.text(`On use:`, x, y);
        this.p.text(`+`, x + 16, y + 40);
        // this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
    }

    onSelect(source) {
        this.data.setInHand(this);
    }

    inHandStep(clicking: boolean, justClicked: boolean) {
    }

    onUse(source, destination) {
        if (source.location === "tools" && destination.location == "grid") {
            const { gx, gy } = destination.data;
            this.onUseOnGrid(gx, gy);
        }
        this.data.setInHand(undefined);
    }

    onUseOnGrid(gx, gy) {
        console.log(`Tool ${this.id}.onUseOnGrid(gx:${gx}, gy:${gy}) not defined.`);
    }
}
