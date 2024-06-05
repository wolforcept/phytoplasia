class Obj {

    id: string;
    data: Data;
    p: any;
    name: string;
    img: any;

    constructor(data, p, name, img) {
        this.data = data;
        this.p = p;
        this.name = name;
        this.img = img;
    }

    drawDescription(x: number, y: number) {
        console.log(`${this.id}.drawDescription(${x}, ${y}) not defined.`);
    }

    onSelect(id: string) {
        console.log(`${this.id}.onSelect(${id}) not defined.`);
    }

    onUse(source, destination) {
        console.log(`${this.id}.onUse(${source}, ${destination}) not defined.`);
    }

    draw(gx: number, gy: number, x: number, y: number) {
    }

    drawDetails() {
        const cardTextX = 572;
        const cardTextY = 92;
        const cardImageX = this.p.width - 64 - 16;
        // const cardImageX = 720 + 60;
        const cardImageY = 64;
        this.img.draw(cardImageX, cardImageY, -1);
        this.p.text(this.name, cardTextX, cardTextY);
        if (this.drawDescription)
            this.drawDescription(cardTextX, cardTextY + 80);
    }
}
