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
        // console.log(props.id);
        this.id = props.id;
        this.data = props.data;
        this.p = props.p;
        this.name = props.name;
        this.img = props.img;
    }

    drawDescription(x: number, y: number, source: Source) {
    }

    draw(x: number, y: number, source: Source) {
    }

    drawDetails(source: Source) {
        this.drawName();
        this.drawCornerImage();
        const descriptionX = 572;
        const descriptionY = 172;
        this.drawDescription(descriptionX, descriptionY, source);
    }

    drawName() {
        const cardTextX = 572;
        const cardTextY = 92;
        this.p.text(this.name, cardTextX, cardTextY);
    }

    drawCornerImage() {
        const cardImageX = this.p.width - 64 - 16 - 4;
        const cardImageY = 64;
        this.img.draw(cardImageX, cardImageY, 0);
    }

    onSelect(source: Source) {

    }
}
