// CARDS
class Card extends Obj {

    relatedGridObj;

    constructor(data, p, name, img, relatedGridObj) {
        super(data, p, name, img);
        this.relatedGridObj = relatedGridObj;
    }

    onSelect(source) {
        this.data.setInHand(this);
    }

    inHandStep(clicking: boolean, justClicked: boolean) {
    }

    onUse(source, destination) {
        if (destination.location === "grid") {
            this.relatedGridObj.putOnGrid(source, destination);
            this.data.cards[source.data.cardIndex] = null;
        }
        this.data.setInHand(undefined);
    }

    drawDescription(x, y) {
        if (this.relatedGridObj && this.relatedGridObj.drawDescription)
            this.relatedGridObj.drawDescription(x, y);
    }
}
