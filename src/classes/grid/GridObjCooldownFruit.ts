class GridObjCooldownFruit extends GridObjCard {

    growTime;
    produces;
    cooldown;

    constructor(data, p, name, img, tags, placeCosts, growTime, produces, cooldown) {
        super(data, p, name, img, tags, placeCosts);
        this.growTime = growTime;
        this.produces = produces;
        this.cooldown = cooldown;
    }

    makeCard() {
        const card = new Card(this.data, this.p, this.name, this.img, this);
        card.draw = (gx, gy, x, y) => {
            // if (this.data.grid[gx][gy].wasWatered)
            //     this.data.img.wetDirt.draw(x, y)
            this.img.draw(x, y, 0);
        };
        return card;
    }

    draw(gx: number, gy: number, x: number, y: number) {
        // if (this.data.grid[gx][gy].wasWatered)
        //     this.data.img.wetDirt.draw(x, y)
        this.img.draw(x, y, 0);
    }

    putOnGrid(source, destination) {
        const cardIndex = source.data;
        const { gx, gy } = destination.data;
        this.data.grid[gx][gy] = { id: this.id, growTime: this.growTime };
        this.data.cards[cardIndex] = undefined;
    }

    drawDescription(x, y) {
        this.p.text(x, y, this.name);
        this.p.text(`Every ${this.cooldown} turns:`, x, y);
        Object.keys(this.produces).forEach(v => {
            const text = `+${this.produces[v]}`;
            this.p.text(text, x, y + 32);
            this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4);
        });
    }

    onWatering(gx, gy) {
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
