type Produces = { [key in Vitamin | "money"]?: number };

interface GridObjCropProps extends GridObjCardProps {
    growTime: number;
    produces: Produces;
    cooldown: number;
    stages: number;
    description: string;
    flavortext: string;
}

interface CropGridData extends GridData {
    stage: number;
    growTime: number;
}

class GridObjCrop extends GridObjCard implements GridObjCropProps {

    // static create = (
    //     id: string, name: string, img: any, tags: Array<string>,
    //     stages: number,
    //     cost: number,
    //     growTime: number, produces: Produces, cooldown: number,
    //     defaultProps: { p: any, data: Data }
    // ) => new GridObjCooldownFruit({
    //     id, name, img,
    //     stages,
    //     costs: { money: cost },
    //     growTime, produces, cooldown,
    //     tags,
    //     ...defaultProps
    // });

    stages: number;
    growTime: number;
    produces: Produces;
    cooldown: number;
    description: string;
    flavortext: string;

    constructor(props: GridObjCropProps) {
        super(props);
        this.stages = props.stages;
        this.growTime = props.growTime;
        this.produces = props.produces;
        this.cooldown = props.cooldown;
        this.description = props.description;
        this.flavortext = props.flavortext;
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
        card.drawCornerImage = () => this.drawCornerImage();
        return card;
    }

    override draw(x: number, y: number, source: Source) {
        const gridData = this.data.grid[source.data.gx][source.data.gy] as CropGridData;
        if (gridData.wasWatered)
            this.data.img.wetDirt.draw(x, y)
        this.img.draw(x, y - 64, gridData.stage);
    }

    override drawDetails(source: Source): void {
        super.drawDetails(source);
        const data = this.data.grid[source.data.gx][source.data.gy] as CropGridData;
        const cardTextX = 572;
        const cardTextY = 92;
        this.p.text(this.name + " (" + data.stage + "/" + this.stages + ")", cardTextX, cardTextY);
    }

    override drawCornerImage(): void {
        const cardImageX = this.p.width - 64 - 16 - 4;
        const cardImageY = 16;
        this.img.draw(cardImageX, cardImageY, 0);
    }

    override drawDescription(x: number, y: number, source: Source) {
        super.drawDescription(x, y, source);
        const tagsText = this.tags.reduce((a, b) => a + "," + b, "").substring(1);

        let dy = y - 50;
        this.p.smallText();
        this.p.fill(0, 0, 0, 150);
        this.p.text(tagsText, x, dy);

        this.p.fill(0, 0, 0);
        dy += 64;
        this.p.text(this.description, x, dy);
        // this.p.text(`Provides nutrients\nevery turn when\ngrown and watered.`, x, dy);
        this.p.largeText();

        // harvest gains:
        dy += 4 * 41;
        this.p.text(`On harvest:`, x, dy);
        dy += 40;
        GAINS_VALUES.filter(x => this.produces[x]).forEach((v: Vitamin | "money", i: number) => {
            const text = `+${this.produces[v]}`;
            const dx = x + 4 * 26 * i;
            this.p.text(text, dx, dy);
            (v === "money"
                ? this.data.img.smallCoin
                : ALL_VITAMINS[v].img
            ).draw(dx + 4 + this.p.textWidth(text), dy - 26);
        });
    }

    override onWatering(source: Source) {
        const gridObjData = this.data.grid[source.data.gx][source.data.gy];
        if (this.data.water > 0 && !gridObjData.wasWatered) {
            this.data.water--;
            gridObjData.wasWatered = true;
        }
    }

    override onHarvest(source: Source, destination: Destination, _gridData: GridData) {
        const gridData = (_gridData as CropGridData);
        if (gridData.stage === this.stages)
            this.gainGains();
        this.data.grid[destination.data.gx][destination.data.gy].id = "dirt";
    }

    override onEndTurn(source: Source, _gridData: GridData): void {
        const gridData = (_gridData as CropGridData);
        if (gridData.wasWatered) {
            if (gridData.stage < this.stages)
                gridData.stage++;
        }
    }

    //

    gainGains() {
        GAINS_VALUES.filter(x => this.produces[x]).forEach((v: Vitamin | "money") => {
            if (v === "money") this.data.money += this.produces[v] ?? 0;
            else this.data.currentVitamins[v] += this.produces[v] ?? 0;
        });
    }

    putOnGrid(source: Source, destination: Destination) {
        const { gx, gy } = destination.data;
        this.data.grid[gx][gy] = { id: this.id, growTime: this.growTime, stage: 1 } as CropGridData;
        const cardIndex = source.data.cardIndex;
        const cardId = this.data.cards[cardIndex].id;
        if (cardId) ALL_CARDS[cardId].reduceStock(cardIndex);
    }

}

class Parsnip extends GridObjCrop {

    constructor(p: any, data: Data) {
        super({
            id: "parsnip", name: "Parsnip",
            img: data.img.parsnip,
            stages: 5,
            costs: { money: 20 },
            growTime: 0,
            produces: { A: 6, money: 30 },
            cooldown: 2,
            tags: ["root"],
            p, data,
            description: "Yields double vitamins\nwhen harvested in\nwinter.",
            flavortext: "",
        });
    }

    override onHarvest(source: Source, destination: Destination, gridData: GridData) {
        super.onHarvest(source, destination, gridData);
        if (this.data.currentSeason === "winter") this.gainGains();
    }
}

class Carrot extends GridObjCrop {

    constructor(p: any, data: Data) {
        super({
            id: "carrot", name: "Carrots",
            img: data.img.carrot,
            stages: 4,
            costs: { money: 5 },
            growTime: 0,
            produces: { money: 10, A: 2 },
            cooldown: 2,
            tags: ["root"],
            p, data,
            description: "",
            flavortext: "Yummy.",
        });
    }

}