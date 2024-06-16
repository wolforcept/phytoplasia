type Produces = { [key in Vitamin]?: number };

interface GridObjCooldownFruitProps extends GridObjCardProps {
    growTime: number;
    produces: Produces;
    cooldown: number;
}

class GridObjCooldownFruit extends GridObjCard implements GridObjCooldownFruitProps {

    static create(
        id: string, name: string, img: any, tags: Array<string>,
        cost: number,
        growTime: number,
        produces: Produces,
        cooldown: number,
        defaultProps: { p: any, data: Data }
    ): GridObjCooldownFruit {
        return new GridObjCooldownFruit({
            id, name, img,
            cost: { money: cost },
            cooldown,
            growTime,
            produces,
            tags,
            ...defaultProps
        })
    }

    growTime: number;
    produces: Produces;
    cooldown: number;

    constructor(props: GridObjCooldownFruitProps) {
        super(props);
        this.growTime = props.growTime;
        this.produces = props.produces;
        this.cooldown = props.cooldown;
    }

    makeCard(): Card {
        const card = new Card({
            id: this.id + "Card",
            data: this.data,
            p: this.p,
            name: this.name,
            img: this.img,
            relatedGridObj: this
        });
        card.draw = (gx: number, gy: number, x: number, y: number) => {
            // if (this.data.grid[gx][gy].wasWatered)
            //     this.data.img.wetDirt.draw(x, y)
            this.img.draw(x, y, 0);
        };
        return card;
    }

    override draw(gx: number, gy: number, x: number, y: number) {
        // if (this.data.grid[gx][gy].wasWatered)
        //     this.data.img.wetDirt.draw(x, y)
        this.img.draw(x, y, 0);
    }

    override putOnGrid(source: Source, destination: Destination) {
        const cardIndex = source.data;
        const { gx, gy } = destination.data;
        this.data.grid[gx][gy] = { id: this.id, growTime: this.growTime };
        this.data.cards[cardIndex].id = null;
    }

    drawDescription(x: number, y: number) {
        super.drawDescription(x, y);
        // this.p.text(x, y, );
        this.p.text(`Every ${this.cooldown} turns:`, x, y);
        VITAMIN_VALUES.filter(x => this.produces[x]).forEach((v: Vitamin) => {
            const text = `+${this.produces[v]}`;
            this.p.text(text, x, y + 32);
            this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4);
        });
    }

    onWatering(gx: number, gy: number) {
        // const gridData = this.data.grid[gx][gy];
        // if(gridData && !gridData.wasWatered)
        // gr
        // console.log(gridData);
        // if (gridData) {
        // gridData.stage = gridData.stage ? gridData.stage + 1 : 1;
        // const gridObj = this.data.allGridObjects[gridData.id];
        // if (gridObj && gridObj.onWatering) {
        // }
        // }

        console.log("on wartering");
    }

}
