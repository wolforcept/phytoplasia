class ToolWateringCan extends Tool {

    onUseOnGrid(gx: number, gy: number) {
        const water = this.data.getWater();
        const gridData = this.data.grid[gx][gy];
        if (gridData && water > 0 && !gridData.wasWatered) {
            const gridObj = this.data.allGridObjects[gridData.id];
            if (gridObj) {
                gridObj.onWatering(gx, gy);
                gridData.wasWatered = true;
                this.data.addWater(-1);
            }
        }
    }
}
