class ToolSickle extends Tool {

    inHandStep(hold: HoldData, mouseEvents: MouseEvents, mx: number, my: number): void {


        const dx = mx - this.img.w / 2 + 52;
        const dy = my - this.img.h / 2 + 32;
        if (!hold.data.rot) hold.data.rot = 0;

        this.p.translate(dx, dy);
        this.p.rotate(-hold.data.rot / 10);
        this.img.draw(-52, -52, 0);
        this.p.rotate(hold.data.rot / 10);
        this.p.translate(-dx, -dy);


        if (mouseEvents.justReleased) {

            if (!this.data.hover || !this.data.hover.obj || this.data.hover.source.location !== "grid")
                this.release();
            else
                this.harvestMotion(hold, dx, dy);
        }

        if (hold.data.activateSickle) {
            hold.data.activateSickle = false;

            const hoverData = this.data.hover;

            if (!hoverData || !hoverData.obj || hoverData.source.location !== "grid") return;
            const gridObj = hoverData.obj as GridObj
            if (!gridObj.onHarvest) return;
            const gx = hoverData.source.data.gx;
            const gy = hoverData.source.data.gy;
            gridObj.onHarvest(hold.source, { location: "grid", data: { gx, gy } }, this.data.grid[gx][gy]);

        }
    }

    private harvestMotion(hold: HoldData, dx: number, dy: number) {

        if (hold.data.stopDrawing) return;
        hold.data.stopDrawing = true;

        let intervalId: number;
        let rot = 0;
        intervalId = setInterval(() => {
            rot++;
            hold.data.rot = 10 * Math.sin(rot / 10);
            if (rot > 30) {
                hold.data.stopDrawing = false;
                hold.data.activateSickle = true;
                clearInterval(intervalId);
            }

        }, 1000 / 60);

    }

}
