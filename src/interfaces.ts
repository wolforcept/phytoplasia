type Season = "spring" | "summer" | "autumn" | "winter";
type Weather = "sunny" | "rain" | "thunder" | "windy" | "snowy";
type Vitamin = "A" | "B" | "C" | "D" | "E" | "K" | "Iron" | "Calcium";
type Locationn = "cards" | "grid" | "tools";

const SEASON_VALUES: Array<Season> = ["spring", "summer", "autumn", "winter"];
const WEATHER_VALUES: Array<Weather> = ["sunny", "rain", "thunder", "windy", "snowy"];
const LOCATION_VALUES: Array<Locationn> = ["cards", "grid", "tools"];
const VITAMIN_VALUES: Array<Vitamin> = ["A", "B", "C", "D", "E", "K", "Iron", "Calcium"];

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
    growTime?: number;
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
    location: Locationn;
}

interface Destination {
    data: any;
    location: Locationn;
}

interface Hoverable {
    drawDetails: (x: number, y: number) => void;
    onSelect?: (source: Source) => void;
    onUse?: (source: Source, destination: Destination) => void;
}

interface Holdable {
    inHandStep: (mouseEvents: MouseEvents, mx: number, my: number) => void
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
    cards: Array<CardData>,

    objectiveVitamins: { [key in Vitamin]: number },
    currentVitamins: { [key in Vitamin]: number },

    hoverData: { hoverable: Hoverable | null, data: any },
    holdData: { holdable: Holdable | null, data: any },

    water: number,
    money: number,

    currentWeather: Weather,
    currentSeason: Season,

    timeLeft: number,

    getParticleSystem: () => ParticleSystem;
}
