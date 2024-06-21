interface CardProps extends ObjProps {
    costs: CardCost;
    relatedGridObj: GridObj;
}

class Card extends Obj implements Holdable, CardProps {

    costs: CardCost;
    relatedGridObj: GridObj;

    constructor(props: CardProps) {
        super(props);
        this.relatedGridObj = props.relatedGridObj;
        this.costs = props.costs;
    }

    public reduceStock(cardIndex: number) {
        const card = this.data.cards[cardIndex];
        card.stock--;
        if (card.stock <= 0)
            card.id = null;
    }

    public onUse(source: Source, destination: Destination): void {

    }

    // implement from holdable
    inHandStep(hold: HoldData, mouseEvents: MouseEvents, mx: number, my: number): void {
        this.img.draw(mx - 16, my - 64 - 16, 0);
        const hoverSource = this.data.hover?.source;
        if (mouseEvents.justReleased) {
            if (hoverSource?.location === "grid" && this.data.grid[hoverSource.data.gx][hoverSource.data.gy].id === "dirt" && this.canAfford()) {
                this.onUse(hold.source, hoverSource);
                const data = this.data.cards[hold.source.data.cardIndex];
            }
            this.data.hold = null;
        }
    }

    override onSelect(source: Source) {
        this.data.hold = { holdable: this, source, data: {} };
    }

    override draw(x: number, y: number, source: Source): void {
        this.img.draw(x, y, 0);
    }

    override drawDetails(source: Source): void {
        super.drawDetails(source);
        const data = this.data.cards[source.data.cardIndex];
        const cardTextX = 572;
        const cardTextY = 92;
        this.p.text(this.name + "(x" + data.stock + ")", cardTextX, cardTextY);
    }

    override drawDescription(x: number, y: number, source: Source) {
        if (this.relatedGridObj && this.relatedGridObj.drawDescription)
            this.relatedGridObj.drawDescription(x, y, source);
    }

    private canAfford() {
        if (!this.costs.money || this.data.money >= this.costs.money) return true;
        if (!this.costs.water || this.data.water >= this.costs.water) return true;
        if (!this.costs.testOtherCosts || this.costs.testOtherCosts()) return true;
        return false;
    }

}
