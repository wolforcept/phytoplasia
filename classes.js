class Obj {

    data;
    p;
    name;
    img;

    constructor(data, p, name, img) {
        this.data = data;
        this.p = p;
        this.name = name;
        this.img = img;
    }

    drawDescription(x, y) {
        console.log(`${this.id}.drawDescription(${x}, ${y}) not defined.`);
    }

    onSelect(id) {
        console.log(`${this.id}.onSelect(${id}) not defined.`);
    }

    onUse(hover) {
        console.log({ hover })
        console.log(`${this.id}.onUse(${hover.id}) not defined.`);
    }

    drawDetails() {
        const cardTextX = 572;
        const cardTextY = 92;
        const cardImageX = 720 + 60;
        const cardImageY = 64;
        this.img.draw(cardImageX, cardImageY)
        this.p.text(this.name, cardTextX, cardTextY);
        if (this.drawDescription)
            this.drawDescription(cardTextX, cardTextY + 80);
    }
}

// GRID OBJECTS

class GridObj extends Obj {

    tags;

    constructor(data, p, name, img, tags) {
        super(data, p, name, img);
        this.tags = tags;
    }

    draw(gx, gy, x, y) {
        this.img.draw(x, y);
    }

    endOfTurn() {
        console.log(`${this.id}.endOfTurn() not defined.`);
    }
}

class GridObjWeeds extends GridObj {

    constructor(data, p, name, img) {
        super(data, p, name, img, ["plant"]);
    }

    drawDescription(x, y) {
        this.p.text("Remove with\nsickle.", x, y);
    }
}

class GridObjRock extends GridObj {

    constructor(data, p, name, img) {
        super(data, p, name, img, ["mineral"]);
    }

    drawDescription(x, y) {
        this.p.text("Remove with\npickaxe.", x, y);
    }
}

class GridObjDirt extends GridObj {

    constructor(data, p, name, img) {
        super(data, p, name, img, []);
    }

    drawDescription(x, y) {
        this.p.text("Usable soil.", x, y);
    }
}

// class GridObjSeeds extends GridObj {

//     constructor(data, p, name, img) {
//         super(data, p, name, img, ["seeds"]);
//     }

//     drawDescription(x, y) {
//         this.p.text(`Every ${this.maxCooldown} turns:`, x, y);
//     }

//     onWatering(gx, gy) {

//         const gridData = this.data.grid[gx][gy];
//         console.log(gridData);
//         if (gridData) {
//             gridData.timeLeft--;
//             // const gridObj = this.data.allGridObjects[gridData.id];
//             // if (gridObj && gridObj.onWatering) {
//             // }
//         }

//         console.log("on wartering")
//     }

//     draw(gx, gy, x, y) {
//         if (this.data.grid[gx][gy].wasWatered)
//             this.data.img.wetDirt.draw(x, y)
//         this.img.draw(x, y)
//     }
// }

class GridObjCard extends GridObj {
    placeCosts;

    constructor(data, p, name, img, tags, placeCosts) {
        super(data, p, name, img, tags);
        this.placeCosts = placeCosts;
    }
}

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
        }
        return card;
    }

    draw(gx, gy, x, y) {
        // if (this.data.grid[gx][gy].wasWatered)
        //     this.data.img.wetDirt.draw(x, y)
        this.img.draw(x, y, 0)
    }

    putOnGrid(source, destination) {
        const cardIndex = source.data;
        const { gx, gy } = destination.data;
        this.data.grid[gx][gy] = { id: this.id, plant: source.id, timeLeft: this.growTime };
        this.data.cards[cardIndex] = undefined;
    }

    drawDescription(x, y) {
        this.p.text(x, y, this.name)
        this.p.text(`Every ${this.cooldown} turns:`, x, y);
        Object.keys(this.produces).forEach(v => {
            const text = `+${this.produces[v]}`;
            this.p.text(text, x, y + 32);
            this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
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

        console.log("on wartering")
    }

    // endOfTurn(x, y) {
    //     super.endOfTurn();
    //     if (cooldown <= 0) {
    //         this.cooldown = this.maxCooldown

    //     }
    // }

}

// CARDS

class Card extends Obj {

    relatedGridObj;

    constructor(data, p, name, img, relatedGridObj) {
        super(data, p, name, img);
        this.relatedGridObj = relatedGridObj;
    }

    onSelect(source) {
        this.data.setInHand({
            img: this.img,
            onUse: (destination) => this.onUse(source, destination)
        });
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
        this.data.setInHand({
            img: this.img,
            onUse: (destination) => this.onUse(source, destination)
        });
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

class ToolWateringCan extends Tool {

    onUseOnGrid(gx, gy) {
        const water = this.data.getWater();
        const gridData = this.data.grid[gx][gy];
        if (gridData && water > 0 && !gridData.wasWatered) {
            const gridObj = this.data.allGridObjects[gridData.id];
            if (gridObj && gridObj.onWatering) {
                gridObj.onWatering(gx, gy);
                gridData.wasWatered = true;
                this.data.addWater(-1);
            }
        }
    }
}