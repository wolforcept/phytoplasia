class ToolWateringCan extends Tool {

    onUseOnGrid(gx: number, gy: number) {
        const water = this.data.water;
        const gridData = this.data.grid[gx][gy];
        if (gridData.id && water > 0 && !gridData.wasWatered) {
            const gridObj = this.data.allGridObjects[gridData.id];
            if (gridObj) {
                gridObj.onWatering(gx, gy);
                gridData.wasWatered = true;
                this.data.water--;
            }
        }
    }

    inHandStep(mouseEvents: MouseEvents, mx: number, my: number): void {

        if (mouseEvents.justPressed)
            this.data.holdData.data.pressTime = Date.now();

        if (mouseEvents.justReleased && (Date.now() - this.data.holdData.data.pressTime) < 100)
            this.release();

        const dx = mx - this.img.w / 2;
        const dy = my - this.img.h / 2;
        if (mouseEvents.clicking) {
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
        }
        else
            this.data.img.wateringCanHeld.draw(dx + 32, dy - 25, 0);
    }

}
