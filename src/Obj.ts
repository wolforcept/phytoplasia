interface ObjProps {
    id: string;
    data: Data;
    p: any;
    name: string;
    img: any;
}

class Obj implements ObjProps {

    id: string;
    data: Data;
    p: any;
    name: string;
    img: any;

    constructor(props: ObjProps) {
        this.id = props.id;
        this.data = props.data;
        this.p = props.p;
        this.name = props.name;
        this.img = props.img;
    }

    drawDescription(x: number, y: number) {
        this.p.text(x + 20, y, this.name);
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
