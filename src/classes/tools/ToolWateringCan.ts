class ToolWateringCan extends Tool {

    inHandStep(hold: HoldData, mouseEvents: MouseEvents, mx: number, my: number): void {

        const hoverData = this.data.hover;
        const holdData = hold.data;

        if (mouseEvents.justPressed)
            holdData.pressTime = Date.now();

        const diff = (Date.now() - holdData.pressTime);

        if (mouseEvents.justReleased && diff < 150)
            this.release();

        const dx = mx - this.img.w / 2;
        const dy = my - this.img.h / 2;

        const hoverSource = hoverData?.source ?? null;
        const gridObjId = hoverSource && hoverSource.data.gx && hoverSource.data.gy ? this.data.grid[hoverSource.data.gx][hoverSource.data.gy]?.id : null;
        const gridObj = gridObjId ? ALL_GRIDOBJS[gridObjId] : null;
        if (mouseEvents.clicking && gridObj?.onWatering && this.data.water > 0 && hoverSource?.location === "grid") {

            const tar = hoverSource.x + "," + hoverSource.y;
            if (holdData.tar !== tar) {
                holdData.tar = tar;
                holdData.pressTime = Date.now();

            }
            if (diff > 750) {
                holdData.pressTime = Date.now();
                gridObj.onWatering(hoverSource);
            }

            this.img.draw(dx + 32, dy - 25, 0);
            // if (Math.random() < .4) {
            const particle: Particle = {
                x: mx + Util.randomInt(-5, 5), y: my + Util.randomInt(-5, 5),
                vx: -1 + 2 * Math.random(), vy: .5 + Math.random(),
                color: { r: 0, g: Util.randomInt(100, 200), b: Util.randomInt(200, 255), a: 255 },
                life: Util.randomInt(15, 40),
                size: 4,
            }
            this.data.getParticleSystem().add(particle);
            // }

        } else {
            this.data.img.wateringCanHeld.draw(dx + 32, dy - 25, 0);
            holdData.tar = null;
        }
    }

}
