type Season = "spring" | "summer" | "autumn" | "winter";
type Weather = "sunny" | "rain" | "thunder" | "windy" | "snowy";
type Vitamin = "A" | "B" | "C" | "D" | "E" | "K" | "Iron" | "Calcium";
type Locationn = "cards" | "grid" | "tools";

const SEASON_VALUES: Array<Season> = ["spring", "summer", "autumn", "winter"];
const WEATHER_VALUES: Array<Weather> = ["sunny", "rain", "thunder", "windy", "snowy"];
const LOCATION_VALUES: Array<Locationn> = ["cards", "grid", "tools"];
const VITAMIN_VALUES: Array<Vitamin> = ["A", "B", "C", "D", "E", "K", "Iron", "Calcium"];
const GAINS_VALUES: Array<Vitamin | "money"> = ["money", ...VITAMIN_VALUES];

interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}

interface MouseEvents {
    clicking: boolean;
    justPressed: boolean;
    justReleased: boolean;
}

interface Image {
    img: any;
    w: number;
    h: number;
    draw: (x: number, y: number, index?: number) => void;
}

interface GridData {
    id: string | null;
    wasWatered?: boolean;
}

interface ToolData {
    id: string;
}

interface CardData {
    id: string | null;
    stock: number;
}

interface GridPos {
    gx: number;
    gy: number;
}

interface Source {
    data: any;
    x: number;
    y: number;
    location: Locationn;
}

interface Destination {
    data: any;
    location: Locationn;
}

// interface Hoverable {
//     drawDetails: () => void;
//     onSelect?: (source: Source) => void;
//     // onUse?: (source: Source, destination: Destination) => void;
//     onWatering?: (source: Source) => void;
// }

interface HoverData {
    obj: Obj;
    source: Source;
}

interface HoldData {
    holdable: Holdable;
    source: Source;
    data: any;
}

interface Holdable {
    inHandStep: (holdData: HoldData, mouseEvents: MouseEvents, mx: number, my: number) => void
}

interface Data {
    img: { [key: string]: Image },

    grid: Array<Array<GridData>>,
    tools: Array<ToolData>,
    cards: Array<CardData>,

    objectiveVitamins: { [key in Vitamin]: number },
    currentVitamins: { [key in Vitamin]: number },

    hover: HoverData | null,
    hold: HoldData | null,

    water: number,
    money: number,

    currentWeather: Weather,
    currentSeason: Season,

    timeLeft: number,

    getParticleSystem: () => ParticleSystem;
}
