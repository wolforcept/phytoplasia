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
