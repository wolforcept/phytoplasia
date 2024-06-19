interface CardProps extends ObjProps {
    relatedGridObj: GridObj;
}

class Card extends Obj implements Holdable, CardProps, Hoverable {

    relatedGridObj: GridObj;

    constructor(props: CardProps) {
        super(props);
        this.relatedGridObj = props.relatedGridObj;
    }

    inHandStep(mouseEvents: MouseEvents, mx: number, my: number): void {

    }

    onSelect(source: Source) {
        this.data.holdable = this;
    }

    inHandClick(hover: Hoverable) {

    }

    onUse(source: Source, destination: Destination) {
        if (destination.location === "grid") {
            const data = this.data.cards[source.data.cardIndex];
            if (data.id && data.stock > 0) {

                this.relatedGridObj.putOnGrid(source, destination);
                data.stock--;
                if (data.stock <= 0)
                    data.id = null;
            }
        }
        this.data.holdable = null;
    }

    drawDescription(x: number, y: number) {
        if (this.relatedGridObj && this.relatedGridObj.drawDescription)
            this.relatedGridObj.drawDescription(x, y);
    }
}
