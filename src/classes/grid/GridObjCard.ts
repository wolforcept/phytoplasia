interface CardCost {
    water?: number;
    money?: number;
    testOtherCosts?: () => boolean;
    runOtherCosts?: () => void;
}

interface GridObjCardProps extends GridObjProps {
    costs: CardCost;
}

abstract class GridObjCard extends GridObj implements GridObjCardProps {
    costs: CardCost;

    constructor(props: GridObjCardProps) {
        super(props);
        this.costs = props.costs;
    }

}
