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

interface CardCost {
    water?: number;
    money?: number;
    testOtherCosts?: () => boolean;
    runOtherCosts?: () => void;
}

interface GridObjCardProps extends GridObjProps {
    cost: CardCost;
}

class GridObjCard extends GridObj implements GridObjCardProps {
    cost: CardCost;

    constructor(props: GridObjCardProps) {
        super(props);
        this.cost = props.cost;
    }
}
