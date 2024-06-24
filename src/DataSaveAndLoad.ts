const SAVE_NAME = "phytoplasia_save_1";

interface SaveData {
    grid: Array<Array<GridData>>,
    cards: Array<CardData>,
    tools: Array<ToolData>,

    objectiveVitamins: { [key in Vitamin]: number },
    currentVitamins: { [key in Vitamin]: number },

    water: number,
    money: number,

    currentWeather: Weather,
    currentSeason: Season,

    timeLeft: number,

}

function save(data: Data) {
    let saveData: SaveData = {
        grid: data.grid,
        cards: data.cards,
        tools: data.tools,

        objectiveVitamins: data.objectiveVitamins,
        currentVitamins: data.currentVitamins,

        water: data.water,
        money: data.money,

        currentWeather: data.currentWeather,
        currentSeason: data.currentSeason,

        timeLeft: data.timeLeft,
    };
    localStorage.setItem(SAVE_NAME, JSON.stringify(saveData));
}

function load(): SaveData | undefined {
    const saveData = localStorage.getItem(SAVE_NAME);
    if (saveData)
        return JSON.parse(saveData) as SaveData;
}

function clear() {
    localStorage.clear();
    location.reload();
}