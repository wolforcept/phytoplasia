type Produces = { [key in Vitamin]?: number };

interface GridObjCooldownFruitProps extends GridObjCardProps {
    growTime: number;
    produces: Produces;
    cooldown: number;
    stages: number;
}

interface CooldownFruitGridData extends GridData {
    stage: number;
    growTime: number;
}

class GridObjCooldownFruit extends GridObjCard implements GridObjCooldownFruitProps {

    static create = (
        id: string, name: string, img: any, tags: Array<string>,
        stages: number,
        cost: number,
        growTime: number, produces: Produces, cooldown: number,
        defaultProps: { p: any, data: Data }
    ) => new GridObjCooldownFruit({
        id, name, img,
        stages,
        costs: { money: cost },
        growTime, produces, cooldown,
        tags,
        ...defaultProps
    });

    stages: number;
    growTime: number;
    produces: Produces;
    cooldown: number;

    constructor(props: GridObjCooldownFruitProps) {
        super(props);
        this.stages = props.stages;
        this.growTime = props.growTime;
        this.produces = props.produces;
        this.cooldown = props.cooldown;
    }

    override makeCard(): Card {
        const card = new Card({
            id: this.id + "Card",
            data: this.data,
            p: this.p,
            name: this.name,
            img: this.img,
            relatedGridObj: this,
            costs: this.costs
        });
        card.draw = (x: number, y: number, source: Source) => {
            this.img.draw(x, y - 64, 0);
        }
        card.onUse = (source: Source, destination: Destination) => {
            this.putOnGrid(source, destination);
        }
        return card;
    }

    override draw(x: number, y: number, source: Source) {
        const gridData = this.data.grid[source.data.gx][source.data.gy] as CooldownFruitGridData;
        if (gridData.wasWatered)
            this.data.img.wetDirt.draw(x, y)
        this.img.draw(x, y - 64, gridData.stage);
    }

    private putOnGrid(source: Source, destination: Destination) {
        const { gx, gy } = destination.data;
        this.data.grid[gx][gy] = { id: this.id, growTime: this.growTime, stage: 1 } as CooldownFruitGridData;
        const cardIndex = source.data.cardIndex;
        const cardId = this.data.cards[cardIndex].id;
        if (cardId) this.data.allCards[cardId].reduceStock(cardIndex);
    }

    drawDescription(x: number, y: number) {
        const tagsText = this.tags.reduce((a, b) => a + "," + b, "").substring(1);

        let dy = y - 50;
        this.p.smallText();
        this.p.fill(0, 0, 0, 150);
        this.p.text(tagsText, x, dy);
        this.p.largeText();

        this.p.fill(0, 0, 0);
        dy += 64;
        this.p.text(`Provides nutrients\nevery turn when\ngrown and watered.`, x, dy);
        dy += 64;
        VITAMIN_VALUES.filter(x => this.produces[x]).forEach((v: Vitamin) => {
            const text = `+${this.produces[v]}`;
            this.p.text(text, x, dy + 32);
            this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), dy + 4);
        });
    }

    onWatering(source: Source) {
        const gridObjData = this.data.grid[source.data.gx][source.data.gy];
        if (this.data.water > 0 && !gridObjData.wasWatered) {
            this.data.water--;
            gridObjData.wasWatered = true;
        }
    }

    onEndTurn(source: Source, _gridData: GridData): void {
        const gridData = (_gridData as CooldownFruitGridData);
        if (gridData.wasWatered) {
            if (gridData.stage < this.stages)
                gridData.stage++;

            if (gridData.stage === this.stages)
                VITAMIN_VALUES.filter(x => this.produces[x]).forEach((v: Vitamin) => {
                    this.data.currentVitamins[v] += this.produces[v] ?? 0;
                });
        }
    }
}
