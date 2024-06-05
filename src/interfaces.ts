type Season = "spring" | "summer" | "autumn" | "winter";
type Weather = "sunny" | "rain" | "thunder" | "windy" | "snowy";
type Vitamin = "A" | "B" | "C" | "D" | "E" | "K" | "Iron" | "Calcium";
type Locationn = "cards" | "grid" | "tools";

interface Image {
    img: any;
    w: number;
    h: number;
    draw: (x: number, y: number, index?: number) => void;
}

interface GridData {
    id: string;
    wasWatered?: boolean;
    growTime?: number;
}

interface InHand {
    inHandStep: (clicking: boolean, justClicked: boolean) => void
}

interface GridPos {
    gx: number;
    gy: number;
}

interface InHover {
    img?: Image;
    id: string,
    x: number, y: number,
    location: Locationn,
    data: any,
    onUse?: (destination: any) => void;
    onSelect?: (hover: InHover) => void;
}

interface Data {
    img: { [key: string]: Image },

    allSeasons: { [key in Season]: SeasonObj },
    allWeathers: { [key in Weather]: WeatherObj },
    allVitamins: { [key in Vitamin]: VitaminObj },

    allCards: { [key: string]: Card },
    allTools: { [key: string]: Tool },
    allGridObjects: { [key: string]: GridObj },

    gridSize: number,
    grid: Array<Array<GridData>>,
    cards: Array<string>,

    objectiveVitamins: { [key in Vitamin]: number },
    currentVitamins: { [key in Vitamin]: number },

    getWater: () => number,
    addWater: (x: number) => void,

    getCurrentWeather: () => Weather,
    getCurrentSeason: () => Season,

    getMoney: () => number,
    addMoney: (x: number) => void,

    getTimeLeft: () => number,

    setInHand: (x: InHand) => void,
}
