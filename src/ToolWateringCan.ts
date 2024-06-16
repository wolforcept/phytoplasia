class ToolWateringCan extends Tool {

    onUseOnGrid(gx: number, gy: number) {
        const water = this.data.getWater();
        const gridData = this.data.grid[gx][gy];
        if (gridData.id && water > 0 && !gridData.wasWatered) {
            const gridObj = this.data.allGridObjects[gridData.id];
            if (gridObj) {
                gridObj.onWatering(gx, gy);
                gridData.wasWatered = true;
                this.data.addWater(-1);
            }
        }
    }

    inHandStep(clicking: boolean, justClicked: boolean, mx: number, my: number): void {
        const dx = mx - this.img.w / 2;
        const dy = my - this.img.h / 2;
        if (clicking)
            this.img.draw(dx, dy, 0);
        else
            this.data.img.dirt.draw(dx, dy, 0);
    }

    inHandClick(hover: Hoverable) {

    }

}
