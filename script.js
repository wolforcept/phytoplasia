"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var SAVE_NAME = "phytoplasia_save_1";
function save(data) {
    var saveData = {
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
function load() {
    var saveData = localStorage.getItem(SAVE_NAME);
    if (saveData)
        return JSON.parse(saveData);
}
function clear() {
    localStorage.clear();
    location.reload();
}
var Obj = /** @class */ (function () {
    function Obj(props) {
        // console.log(props.id);
        this.id = props.id;
        this.data = props.data;
        this.p = props.p;
        this.name = props.name;
        this.img = props.img;
    }
    Obj.prototype.drawDescription = function (x, y, source) {
    };
    Obj.prototype.draw = function (x, y, source) {
    };
    Obj.prototype.drawDetails = function (source) {
        this.drawName();
        this.drawCornerImage();
        var descriptionX = 572;
        var descriptionY = 172;
        this.drawDescription(descriptionX, descriptionY, source);
    };
    Obj.prototype.drawName = function () {
        var cardTextX = 572;
        var cardTextY = 92;
        this.p.text(this.name, cardTextX, cardTextY);
    };
    Obj.prototype.drawCornerImage = function () {
        var cardImageX = this.p.width - 64 - 16 - 4;
        var cardImageY = 64;
        this.img.draw(cardImageX, cardImageY, 0);
    };
    Obj.prototype.onSelect = function (source) {
    };
    return Obj;
}());
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem() {
        this.particles = [];
    }
    ParticleSystem.prototype.step = function (p5) {
        var _a, _b, _c;
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
            else {
                if (particle.image) {
                    p5.tint(p5.color(particle.color.r, particle.color.g, particle.color.b, particle.color.a));
                    var w = 4 * particle.image.img.width * ((_a = particle.size) !== null && _a !== void 0 ? _a : 1);
                    var h = 4 * particle.image.img.height * ((_b = particle.size) !== null && _b !== void 0 ? _b : 1);
                    p5.image(particle.image.img, particle.x, particle.y, w, h);
                    p5.noTint();
                }
                else {
                    p5.noStroke();
                    p5.fill(p5.color(particle.color.r, particle.color.g, particle.color.b, particle.color.a));
                    p5.square(particle.x, particle.y, (_c = particle.size) !== null && _c !== void 0 ? _c : 4);
                }
                particle.life--;
                particle.x += particle.vx;
                particle.y += particle.vy;
                if (particle.ax)
                    particle.vx += particle.ax;
                if (particle.ay)
                    particle.vy += particle.ay;
                if (particle.compute)
                    particle.compute(particle);
            }
        }
    };
    ParticleSystem.prototype.add = function (particle) {
        this.particles.push(particle);
    };
    return ParticleSystem;
}());
var Tool = /** @class */ (function (_super) {
    __extends(Tool, _super);
    function Tool(props) {
        return _super.call(this, props) || this;
    }
    Tool.prototype.drawDescription = function (x, y, source) {
        _super.prototype.drawDescription.call(this, x, y, source);
        this.p.text("On use:", x, y);
        this.p.text("+", x + 16, y + 40);
        // this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
    };
    Tool.prototype.onSelect = function (source) {
        this.data.hold = { holdable: this, source: source, data: {} };
    };
    Tool.prototype.release = function () {
        this.data.hold = null;
    };
    return Tool;
}(Obj));
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.randomInt = function (min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    };
    return Util;
}());
var img = {
    // UI
    ui_back: { path: 'assets/ui_back.png' },
    ui_front: { path: 'assets/ui_front.png' },
    select: { path: 'assets/select.png' },
    endTurnButton: { path: 'assets/end_turn_button.png', w: 42, h: 18, sx: 0, sy: 0, n: 3 },
    time: { path: 'assets/time.png' },
    water: { path: 'assets/water.png' },
    dirt: { path: 'assets/dirt.png' },
    wetDirt: { path: 'assets/wet_dirt.png' },
    coin: { path: 'assets/coin.png' },
    smallCoin: { path: 'assets/smallCoin.png' },
    sickle: { path: 'assets/tools/sickle.png' },
    wateringCan: { path: 'assets/tools/watering_can.png' },
    wateringCanHeld: { path: 'assets/tools/watering_can_held.png' },
    rocks1: { path: 'assets/rocks/rocks1.png' },
    rocks2: { path: 'assets/rocks/rocks2.png' },
    rocks3: { path: 'assets/rocks/rocks3.png' },
    vitaminA: { path: 'assets/vitamins/A.png' },
    vitaminB: { path: 'assets/vitamins/B.png' },
    vitaminC: { path: 'assets/vitamins/C.png' },
    vitaminD: { path: 'assets/vitamins/D.png' },
    vitaminE: { path: 'assets/vitamins/E.png' },
    vitaminK: { path: 'assets/vitamins/K.png' },
    Iron: { path: 'assets/vitamins/Iron.png' },
    Calcium: { path: 'assets/vitamins/Calcium.png' },
    cloudy: { path: 'assets/weather/cloudy.png' },
    heavy_rain: { path: 'assets/weather/heavy_rain.png' },
    light_rain: { path: 'assets/weather/light_rain.png' },
    snowy: { path: 'assets/weather/snowy.png' },
    sunny: { path: 'assets/weather/sunny.png' },
    sunny_with_clouds: { path: 'assets/weather/sunny_with_clouds.png' },
    thunder: { path: 'assets/weather/thunder.png' },
    windy: { path: 'assets/weather/windy.png' },
    thunderbolt: { path: 'assets/thunderbolt.png' },
    spring: { path: 'assets/seasons/spring.png' },
    summer: { path: 'assets/seasons/summer.png' },
    autumn: { path: 'assets/seasons/autumn.png' },
    winter: { path: 'assets/seasons/winter.png' },
    seeds: { path: 'assets/plants/seeds.png' },
    // tomato: { path: 'assets/vegetables/tomato.png' },
    corn: { path: 'assets/vegetables/corn.png' },
    turnip: { path: 'assets/vegetables/turnip.png' },
    potato: { path: 'assets/vegetables/potato.png' },
    // carrot: { path: 'assets/crops.png', /*       */ w: 16, h: 32, sx: 0, sy: 0 * 32, n: 6 },
    parsnip: { path: 'assets/crops.png', /*       */ w: 16, h: 32, sx: 0, sy: 0 * 32, n: 6 },
    cauliflower: { path: 'assets/crops.png', /*   */ w: 16, h: 32, sx: 0, sy: 1 * 32, n: 7 },
    garlic: { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 2 * 32, n: 6 },
    rhubarb: { path: 'assets/crops.png', /*       */ w: 16, h: 32, sx: 0, sy: 3 * 32, n: 7 },
    tomato: { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 4 * 32, n: 7 },
    hotpepper: { path: 'assets/crops.png', /*     */ w: 16, h: 32, sx: 0, sy: 5 * 32, n: 7 },
    raddish: { path: 'assets/crops.png', /*       */ w: 16, h: 32, sx: 0, sy: 6 * 32, n: 6 },
    starfruit: { path: 'assets/crops.png', /*     */ w: 16, h: 32, sx: 0, sy: 7 * 32, n: 7 },
    eggplant: { path: 'assets/crops.png', /*      */ w: 16, h: 32, sx: 0, sy: 8 * 32, n: 7 },
    pumpkin: { path: 'assets/crops.png', /*       */ w: 16, h: 32, sx: 0, sy: 9 * 32, n: 7 },
    yam: { path: 'assets/crops.png', /*           */ w: 16, h: 32, sx: 0, sy: 10 * 32, n: 6 },
    beet: { path: 'assets/crops.png', /*          */ w: 16, h: 32, sx: 0, sy: 11 * 32, n: 6 },
    ancientfruit: { path: 'assets/crops.png', /*  */ w: 16, h: 32, sx: 0, sy: 12 * 32, n: 7 },
    tulip: { path: 'assets/crops.png', /*         */ w: 16, h: 32, sx: 0, sy: 13 * 32, n: 7 },
    poppy: { path: 'assets/crops.png', /*         */ w: 16, h: 32, sx: 0, sy: 14 * 32, n: 7 },
    sunflower: { path: 'assets/crops.png', /*     */ w: 16, h: 32, sx: 0, sy: 15 * 32, n: 6 },
    sweetgem: { path: 'assets/crops.png', /*      */ w: 16, h: 32, sx: 0, sy: 16 * 32, n: 7 },
    rice: { path: 'assets/crops.png', /*          */ w: 16, h: 32, sx: 0, sy: 16 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 17 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 18 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 19 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 20 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 21 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 22 * 32, n: 6 },
    // : { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 23 * 32, n: 6 },
    carrot: { path: 'assets/crops.png', /*        */ w: 16, h: 32, sx: 0, sy: 24 * 32, n: 6 },
    plant1: { path: 'assets/plants/1.png' },
    plant2: { path: 'assets/plants/2.png' },
    plant3: { path: 'assets/plants/3.png' },
    plant4: { path: 'assets/plants/4.png' },
    plant5: { path: 'assets/plants/5.png' },
    plant6: { path: 'assets/plants/6.png' },
    plant7: { path: 'assets/plants/7.png' },
    plant8: { path: 'assets/plants/8.png' },
    plant9: { path: 'assets/plants/9.png' },
    plant10: { path: 'assets/plants/10.png' },
    plant11: { path: 'assets/plants/11.png' },
    plant12: { path: 'assets/plants/12.png' },
    plant13: { path: 'assets/plants/13.png' },
    plant14: { path: 'assets/plants/14.png' },
    plant15: { path: 'assets/plants/15.png' },
    plant16: { path: 'assets/plants/16.png' },
    plant17: { path: 'assets/plants/17.png' },
    plant18: { path: 'assets/plants/18.png' },
    plant19: { path: 'assets/plants/19.png' },
    plant20: { path: 'assets/plants/20.png' },
    plant21: { path: 'assets/plants/21.png' },
    plant22: { path: 'assets/plants/22.png' },
    plant23: { path: 'assets/plants/23.png' },
    plant24: { path: 'assets/plants/24.png' },
    plant25: { path: 'assets/plants/25.png' },
    plant26: { path: 'assets/plants/26.png' },
    plant27: { path: 'assets/plants/27.png' },
    plant28: { path: 'assets/plants/28.png' },
    plant29: { path: 'assets/plants/29.png' },
    plant30: { path: 'assets/plants/30.png' },
    plant31: { path: 'assets/plants/31.png' },
    plant32: { path: 'assets/plants/32.png' },
    plant33: { path: 'assets/plants/33.png' },
    plant34: { path: 'assets/plants/34.png' },
    plant35: { path: 'assets/plants/35.png' },
    plant36: { path: 'assets/plants/36.png' },
    plant37: { path: 'assets/plants/37.png' },
    plant38: { path: 'assets/plants/38.png' },
    plant39: { path: 'assets/plants/39.png' },
    plant40: { path: 'assets/plants/40.png' },
    plant41: { path: 'assets/plants/41.png' },
    plant42: { path: 'assets/plants/42.png' },
    plant43: { path: 'assets/plants/43.png' },
    plant44: { path: 'assets/plants/44.png' },
    plant45: { path: 'assets/plants/45.png' },
    plant46: { path: 'assets/plants/46.png' },
    plant47: { path: 'assets/plants/47.png' },
    plant48: { path: 'assets/plants/48.png' },
    plant49: { path: 'assets/plants/49.png' },
    plant50: { path: 'assets/plants/50.png' },
    plant51: { path: 'assets/plants/51.png' },
    plant52: { path: 'assets/plants/52.png' },
    plant53: { path: 'assets/plants/53.png' },
    plant54: { path: 'assets/plants/54.png' },
    plant55: { path: 'assets/plants/55.png' },
    plant56: { path: 'assets/plants/56.png' },
    plant57: { path: 'assets/plants/57.png' },
    plant58: { path: 'assets/plants/58.png' },
    plant59: { path: 'assets/plants/59.png' },
    plant60: { path: 'assets/plants/60.png' },
    plant61: { path: 'assets/plants/61.png' },
    plant62: { path: 'assets/plants/62.png' },
    plant63: { path: 'assets/plants/63.png' },
    plant64: { path: 'assets/plants/64.png' },
    plant65: { path: 'assets/plants/65.png' },
    plant66: { path: 'assets/plants/66.png' },
    plant67: { path: 'assets/plants/67.png' },
    plant68: { path: 'assets/plants/68.png' },
    plant69: { path: 'assets/plants/69.png' },
    plant70: { path: 'assets/plants/70.png' },
    grass1: { path: 'assets/grasses/grassandflowers1.png' },
    grass2: { path: 'assets/grasses/grassandflowers2.png' },
    grass3: { path: 'assets/grasses/grassandflowers3.png' },
    grass4: { path: 'assets/grasses/grassandflowers4.png' },
    grass5: { path: 'assets/grasses/grassandflowers5.png' },
    grass6: { path: 'assets/grasses/grassandflowers6.png' },
    grass7: { path: 'assets/grasses/grassandflowers7.png' },
    grass8: { path: 'assets/grasses/grassandflowers8.png' },
    grass9: { path: 'assets/grasses/grassandflowers9.png' },
    grass10: { path: 'assets/grasses/grassandflowers10.png' },
    grass11: { path: 'assets/grasses/grassandflowers11.png' },
    grass12: { path: 'assets/grasses/grassandflowers12.png' },
    grass13: { path: 'assets/grasses/grassandflowers13.png' },
    grass14: { path: 'assets/grasses/grassandflowers14.png' },
    grass15: { path: 'assets/grasses/grassandflowers15.png' },
    grass16: { path: 'assets/grasses/grassandflowers16.png' },
    grass17: { path: 'assets/grasses/grassandflowers17.png' },
    grass18: { path: 'assets/grasses/grassandflowers18.png' },
    grass19: { path: 'assets/grasses/grassandflowers19.png' },
    grass20: { path: 'assets/grasses/grassandflowers20.png' },
    grass21: { path: 'assets/grasses/grassandflowers21.png' },
    grass22: { path: 'assets/grasses/grassandflowers22.png' },
    grass23: { path: 'assets/grasses/grassandflowers23.png' },
    grass24: { path: 'assets/grasses/grassandflowers24.png' },
    grass25: { path: 'assets/grasses/grassandflowers25.png' },
    grass26: { path: 'assets/grasses/grassandflowers26.png' },
    grass27: { path: 'assets/grasses/grassandflowers27.png' },
    grass28: { path: 'assets/grasses/grassandflowers28.png' },
    grass29: { path: 'assets/grasses/grassandflowers29.png' },
    grass30: { path: 'assets/grasses/grassandflowers30.png' },
    grass31: { path: 'assets/grasses/grassandflowers31.png' },
    grass32: { path: 'assets/grasses/grassandflowers32.png' },
};
var SEASON_VALUES = ["spring", "summer", "autumn", "winter"];
var WEATHER_VALUES = ["sunny", "rain", "thunder", "windy", "snowy"];
var LOCATION_VALUES = ["cards", "grid", "tools"];
var VITAMIN_VALUES = ["A", "B", "C", "D", "E", "K", "Iron", "Calcium"];
var GAINS_VALUES = __spreadArray(["money"], VITAMIN_VALUES, true);
var GRID_SIZE = 6;
function makeInitialGrid() {
    var grid = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        grid[i] = [];
        for (var j = 0; j < GRID_SIZE; j++)
            grid[i][j] = { id: "dirt" };
    }
    return grid;
}
var ALL_WEATHERS = {
    sunny: { id: "sunny", name: "Sunny", img: img.sunny },
    windy: { id: "windy", name: "Windy", img: img.windy },
    rain: { id: "rain", name: "Rain", img: img.heavy_rain },
    thunder: { id: "thunder", name: "Thunder", img: img.thunder },
    snowy: { id: "snowy", name: "Snowy", img: img.snowy },
};
var ALL_SEASONS = {
    spring: { id: "spring", name: "Spring", img: img.spring },
    summer: { id: "summer", name: "Summer", img: img.summer },
    autumn: { id: "autumn", name: "Autumn", img: img.autumn },
    winter: { id: "winter", name: "Winter", img: img.winter },
};
var ALL_VITAMINS = {
    A: { id: "A", name: 'Vitamin A', img: img.vitaminA },
    B: { id: "B", name: 'Vitamin B', img: img.vitaminB },
    C: { id: "C", name: 'Vitamin C', img: img.vitaminC },
    D: { id: "D", name: 'Vitamin D', img: img.vitaminD },
    E: { id: "E", name: 'Vitamin E', img: img.vitaminE },
    K: { id: "K", name: 'Vitamin K', img: img.vitaminK },
    Iron: { id: "Iron", name: 'Iron', img: img.Iron },
    Calcium: { id: "Calcium", name: 'Calcium', img: img.Calcium },
};
var ALL_CARDS = {};
var ALL_TOOLS = {};
var ALL_GRIDOBJS = {};
var sketch = function (p) {
    var particleSystem = new ParticleSystem();
    var font;
    var mouseEvents = { clicking: false, justPressed: false, justReleased: false };
    p.mousePressed = function () { mouseEvents.clicking = true; mouseEvents.justPressed = true; };
    p.mouseReleased = function () { mouseEvents.clicking = false; mouseEvents.justReleased = true; };
    var MAX_WATER = 16;
    var MAX_TIME = 22;
    var TURN_LENGTH = 60 * 200;
    var nextEndTurn = Date.now() + TURN_LENGTH;
    var data = {
        img: img,
        getParticleSystem: function () { return particleSystem; },
        grid: makeInitialGrid(),
        tools: [{ id: "wateringCan" }, { id: "sickle" }],
        cards: [{ id: "carrot", stock: 10 }, { id: "parsnip", stock: 10 }],
        objectiveVitamins: { A: 12, B: 4, C: 2, D: 2, E: 2, K: 0, Iron: 2, Calcium: 2 },
        currentVitamins: { A: 0, B: 0, C: 0, D: 0, E: 0, K: 0, Iron: 0, Calcium: 0 },
        hover: null,
        hold: null,
        water: MAX_WATER,
        money: 0,
        currentWeather: "sunny",
        currentSeason: "spring",
        timeLeft: MAX_TIME,
    };
    var defaultProps = { data: data, p: p };
    ALL_GRIDOBJS.dirt = new GridObjDirt(__assign({ id: "dirt", name: "Dirt", img: img.dirt }, defaultProps));
    ALL_GRIDOBJS.weeds = new GridObjWeeds(__assign({ id: "weeds", name: "Weeds", img: img.grass30 }, defaultProps));
    ALL_GRIDOBJS.rock = new GridObjRock(__assign({ id: "rock", name: "Rocks", img: img.rocks1 }, defaultProps));
    ALL_GRIDOBJS.parsnip = new Parsnip(p, data);
    ALL_GRIDOBJS.carrot = new Carrot(p, data);
    // allGridObjects.cauliflower/*      */ = GridObjCooldownFruit.create("cauliflower"/*      */, "Cauliflower"/*      */, img.cauliflower/* */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.garlic/*           */ = GridObjCooldownFruit.create("garlic"/*           */, "Garlic"/*           */, img.garlic/*      */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.rhubarb /*         */ = GridObjCooldownFruit.create("rhubarb" /*         */, "Rhubarb "/*         */, img.rhubarb /*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.tomato/*           */ = GridObjCooldownFruit.create("tomato"/*           */, "Tomato"/*           */, img.tomato/*      */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.hotpepper/*        */ = GridObjCooldownFruit.create("hotpepper"/*        */, "Hotpepper"/*        */, img.hotpepper/*   */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.raddish /*         */ = GridObjCooldownFruit.create("raddish"/*          */, "Raddish "/*         */, img.raddish /*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.starfruit/*        */ = GridObjCooldownFruit.create("starfruit"/*        */, "Starfruit"/*        */, img.starfruit/*   */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.eggplant/*         */ = GridObjCooldownFruit.create("eggplant"/*         */, "Eggplant"/*         */, img.eggplant/*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.pumpkin/*          */ = GridObjCooldownFruit.create("pumpkin"/*          */, "Pumpkin"/*          */, img.pumpkin/*     */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.yam/*              */ = GridObjCooldownFruit.create("yam"/*              */, "Yam"/*              */, img.yam/*         */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.beet/*             */ = GridObjCooldownFruit.create("beet"/*             */, "Beet"/*             */, img.beet/*        */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.ancientfruit/*     */ = GridObjCooldownFruit.create("ancientfruit"/*     */, "Ancientfruit"/*     */, img.ancientfruit/**/, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.tulip/*            */ = GridObjCooldownFruit.create("tulip"/*            */, "Tulip"/*            */, img.tulip/*       */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.poppy/*            */ = GridObjCooldownFruit.create("poppy"/*            */, "Poppy"/*            */, img.poppy/*       */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.sunflower/*        */ = GridObjCooldownFruit.create("sunflower"/*        */, "Sunflower"/*        */, img.sunflowwer/*  */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.sweetgem/*         */ = GridObjCooldownFruit.create("sweetgem"/*         */, "Sweetgem"/*         */, img.sweetgem/*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.rice/*             */ = GridObjCooldownFruit.create("rice"/*             */, "Rice"/*             */, img.rice/*        */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    ALL_TOOLS.wateringCan = new ToolWateringCan(__assign({ id: "wateringCan", name: "Watering Can", img: img.wateringCan }, defaultProps));
    ALL_TOOLS.sickle = new ToolSickle(__assign({ id: "sickle", name: "Sickle", img: img.sickle }, defaultProps));
    Object.keys(ALL_GRIDOBJS).forEach(function (gridObjId) {
        var card = ALL_GRIDOBJS[gridObjId].makeCard();
        if (card)
            ALL_CARDS[gridObjId] = card;
    });
    function endTurn() {
        for (var gx = 0; gx < GRID_SIZE; gx++)
            for (var gy = 0; gy < GRID_SIZE; gy++) {
                var source = { location: "grid", data: { gx: gx, gy: gy }, x: 0, y: 0 };
                var gridData = data.grid[gx][gy];
                if (gridData.id)
                    ALL_GRIDOBJS[gridData.id].onEndTurn(source, gridData);
                if (Math.random() < .25)
                    gridData.wasWatered = false;
            }
        if (data.water < MAX_WATER)
            data.water++;
        data.timeLeft--;
        if (data.timeLeft === 0) {
            data.timeLeft = MAX_TIME;
            endSeason();
        }
        if (data.currentWeather !== "sunny") {
            if (Math.random() < .66)
                data.currentWeather = "sunny";
        }
        else if (Math.random() < .25) {
            data.currentWeather = randomFromArray(WEATHER_VALUES);
        }
        save(data);
    }
    function endSeason() {
        /**/ if (data.currentSeason === "spring")
            data.currentSeason = "summer";
        else if (data.currentSeason === "summer")
            data.currentSeason = "autumn";
        else if (data.currentSeason === "autumn")
            data.currentSeason = "winter";
        else if (data.currentSeason === "winter")
            data.currentSeason = "spring";
        data.water = MAX_WATER;
        data.cards = [{ id: "carrot", stock: 10 }, { id: "parsnip", stock: 10 }];
        if (data.currentWeather === "rain" || data.currentWeather === "thunder") {
            for (var gx = 0; gx < GRID_SIZE; gx++)
                for (var gy = 0; gy < GRID_SIZE; gy++) {
                    var gridData = data.grid[gx][gy];
                    if (Math.random() < .25)
                        gridData.wasWatered = true;
                }
        }
    }
    // █▀▄ █▀▀
    // █▀  ▄██
    p.preload = function () {
        font = p.loadFont('assets/font.ttf');
        Object.keys(img).forEach(function (name) {
            var i = img[name];
            i.img = p.loadImage(i.path, function () {
                var _a, _b;
                i.w = (_a = i.w) !== null && _a !== void 0 ? _a : i.img.width * 4;
                i.h = (_b = i.h) !== null && _b !== void 0 ? _b : i.img.height * 4;
                i.draw = function (x, y, imgIndex) {
                    if (imgIndex === undefined) {
                        p.image(i.img, x, y, i.w, i.h);
                    }
                    else if (i.n === undefined) {
                        if (imgIndex < 0)
                            imgIndex += Math.floor(i.img.width / i.img.height);
                        p.image(i.img, x, y, i.h, i.h, imgIndex * i.img.height, 0, i.img.height, i.img.height);
                    }
                    else {
                        if (imgIndex < 0)
                            imgIndex += i.n;
                        p.image(i.img, x, y, i.w * 4, i.h * 4, i.sx + imgIndex * i.w, i.sy, i.w, i.h);
                    }
                };
            });
        });
        // [allGridObjects, allCards, allTools]
        //     .forEach(all => Object.keys(all).forEach(id => {
        //         all[id].id = id;
        //     }));
    };
    p.setup = function () {
        p.createCanvas(img.ui_back.w, img.ui_back.h);
        p.noSmooth();
        p.smallText = function () { return p.textSize(24); };
        p.largeText = function () { return p.textSize(32); };
        p.textFont(font);
        p.textSize(32);
        p.textLeading(24);
        var loadedData = load();
        if (loadedData) {
            for (var dx = 0; dx < GRID_SIZE; dx++)
                for (var dy = 0; dy < GRID_SIZE; dy++)
                    data.grid[dx][dy] = loadedData.grid[dx][dy];
            for (var index = 0; index < loadedData.cards.length; index++)
                data.cards[index] = loadedData.cards[index];
            for (var index = 0; index < loadedData.tools.length; index++)
                data.tools[index] = loadedData.tools[index];
            data.currentSeason = loadedData.currentSeason;
            data.currentVitamins = loadedData.currentVitamins;
            data.currentWeather = loadedData.currentWeather;
            data.water = loadedData.water;
            data.money = loadedData.money;
        }
        else {
            var spots1 = [];
            var spots2 = [];
            var spots3 = [];
            var goodspots = [];
            for (var dx = 0; dx < GRID_SIZE; dx++)
                for (var dy = 0; dy < GRID_SIZE; dy++) {
                    if (dx < 1 || dy < 1) {
                        spots1.push({ x: dx, y: dy });
                        continue;
                    }
                    if (dx < 2 || dy < 2) {
                        spots2.push({ x: dx, y: dy });
                        continue;
                    }
                    if (dx < 3 || dy < 3) {
                        spots3.push({ x: dx, y: dy });
                        continue;
                    }
                    if (dx >= 3 && dy >= 3) {
                        goodspots.push({ x: dx, y: dy });
                        continue;
                    }
                }
            shuffle(spots1);
            shuffle(spots2);
            shuffle(spots3);
            shuffle(goodspots);
            var nrOfWeeds = [5, 6, 4];
            var nrOfRocks = [6, 3, 0];
            var initialCarrots_1 = [
                { id: "carrot", wasWatered: false, stage: 1 },
                { id: "carrot", wasWatered: false, stage: 2 },
                { id: "carrot", wasWatered: false, stage: 3 }
            ];
            spots1.splice(0, nrOfWeeds[0]).forEach(function (_a) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = { id: "weeds" };
            });
            spots1.splice(0, nrOfRocks[0]).forEach(function (_a) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = { id: "rock" };
            });
            spots2.splice(0, nrOfWeeds[1]).forEach(function (_a) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = { id: "weeds" };
            });
            spots2.splice(0, nrOfRocks[1]).forEach(function (_a) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = { id: "rock" };
            });
            spots3.splice(0, nrOfWeeds[2]).forEach(function (_a) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = { id: "weeds" };
            });
            spots3.splice(0, nrOfRocks[2]).forEach(function (_a) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = { id: "rock" };
            });
            goodspots.splice(0, initialCarrots_1.length).forEach(function (_a, i) {
                var x = _a.x, y = _a.y;
                return data.grid[x][y] = initialCarrots_1[i];
            });
        }
        // cards[0] = { id: "parsnip" /*         */, stock: 10 };
        // cards[1] = { id: "cauliflower"/*      */, stock: 10 };
        // cards[2] = { id: "garlic"/*           */, stock: 10 };
        // cards[3] = { id: "rhubarb" /*         */, stock: 10 };
        // cards[4] = { id: "tomato"/*           */, stock: 10 };
        // cards[5] = { id: "hotpepper"/*        */, stock: 10 };
        // cards[6] = { id: "raddish" /*         */, stock: 10 };
        // cards[7] = { id: "starfruit"/*        */, stock: 10 };
        // cards[8] = { id: "eggplant"/*         */, stock: 10 };
        // cards[9] = { id: "pumpkin"/*          */, stock: 10 };
        // cards[10] = { id: "yam"/*              */, stock: 10 };
        // cards[11] = { id: "beet"/*             */, stock: 10 };
        // cards[12] = { id: "ancientfruit"/*     */, stock: 10 };
        // cards[13] = { id: "tulip"/*            */, stock: 10 };
        // cards[14] = { id: "poppy"/*            */, stock: 10 };
        // cards[15] = { id: "sunflower"/*       */, stock: 10 };
        // cards[16] = { id: "sweetgem"/*         */, stock: 10 };
        // cards[17] = { id: "rice"/*             */, stock: 10 };
    };
    var nextThunder = 100;
    p.draw = function () {
        var _a, _b;
        var mx = p.mouseX;
        var my = p.mouseY;
        // let inHover: { hoverable: Hoverable, x: number, y: number, source: Source } | null = null;
        var customInHover = null;
        img.ui_back.draw(0, 0);
        { // GRID
            var gridX = 16;
            var gridY = 20;
            for (var gx = 0; gx < GRID_SIZE; gx++) {
                for (var gy = 0; gy < GRID_SIZE; gy++) {
                    var id = data.grid[gx][gy].id;
                    var dx = gridX + gx * 64;
                    var dy = gridY + gy * 64;
                    var source = { location: "grid", x: dx, y: dy, data: { gx: gx, gy: gy } };
                    if ((_a = data.grid[gx][gy]) === null || _a === void 0 ? void 0 : _a.wasWatered)
                        img.wetDirt.draw(dx, dy);
                    else
                        img.dirt.draw(dx, dy);
                    if (!id)
                        continue;
                    var obj = ALL_GRIDOBJS[id];
                    if (!obj || !obj.draw) {
                        console.log(id, obj);
                        throw new Error(id + " grid obj error drawing.");
                    }
                    obj.draw(dx, dy, source);
                    if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                        data.hover = { obj: obj, source: source };
                    }
                }
            }
        }
        { // WEATHER
            var weatherX = 420;
            var weatherY = 8;
            ALL_WEATHERS[data.currentWeather].img.draw(weatherX, weatherY);
        }
        { // SEASON
            var seasonX = 480;
            var seasonY = 8;
            ALL_SEASONS[data.currentSeason].img.draw(seasonX, seasonY);
            if (mx > 420 && mx < 546 && my > 8 && my < 76) {
                customInHover = function () {
                    var x = 572;
                    var y = 92;
                    var text = "Weather: " + ALL_WEATHERS[data.currentWeather].name + "\n\n\n\n\n\nSeason: " + ALL_SEASONS[data.currentSeason].name;
                    WEATHER_VALUES.forEach(function (id, i) {
                        var dx = x + i * 64;
                        var dy = y + 16;
                        ALL_WEATHERS[id].img.draw(dx, dy);
                        if (data.currentWeather === id)
                            img.select.draw(dx, dy);
                    });
                    SEASON_VALUES.forEach(function (id, i) {
                        var dx = x + i * 64;
                        var dy = y + 160;
                        ALL_SEASONS[id].img.draw(dx, dy);
                        if (data.currentSeason === id)
                            img.select.draw(dx, dy);
                    });
                    p.text(text, x, y);
                };
            }
        }
        { // END TURN BUTTON
            // const buttonX = 4 * 182;
            // const buttonY = 4 * 106;
            // if (mx > buttonX && my > buttonY && mx < buttonX + img.endTurnButton.w * 4 && my < buttonY + img.endTurnButton.h * 4) {
            //     if (mouseEvents.clicking)
            //         img.endTurnButton.draw(buttonX, buttonY, 2);
            //     else
            //         img.endTurnButton.draw(buttonX, buttonY, 0);
            //     if (mouseEvents.justReleased)
            //         endTurn();
            // } else {
            //     img.endTurnButton.draw(buttonX, buttonY, 1);
            // }
        }
        { // WATER
            var waterX = 496;
            var waterY = 380;
            for (var i = 0; i < data.water; i++) {
                img.water.draw(waterX, waterY - i * (img.water.h));
            }
        }
        { // CARDS
            var cardsX = 16;
            var cardsY = 428;
            for (var _i = 0; _i < data.cards.length; _i++) {
                var i = _i;
                var id = data.cards[i].id;
                if (!id)
                    continue;
                var card = ALL_CARDS[id];
                if (!id || !card || !card.img) {
                    console.log(id, card);
                    throw new Error("error drawing ".concat(id));
                }
                var dx = cardsX + i * 64;
                var dy = cardsY;
                var source = { location: "cards", x: dx, y: dy, data: { cardIndex: i } };
                card.draw(dx, dy, source);
                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    data.hover = { obj: card, source: source };
                    // inHover = { hoverable: card, x: dx, y: dy, source: { location: "cards", data: { cardIndex: i } } };
                }
            }
        }
        { // TOOLS
            var cardsX = 420;
            var cardsY = 84;
            for (var i = 0; i < data.tools.length; i++) {
                var id = (_b = data.tools[i]) === null || _b === void 0 ? void 0 : _b.id;
                var tool = ALL_TOOLS[id];
                var dx = cardsX;
                var dy = cardsY + i * 64;
                tool.img.draw(dx, dy);
                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    data.hover = { obj: tool, source: { location: "tools", x: dx, y: dy, data: {} } };
                    // inHover = { hoverable: tool, x: dx, y: dy, source: { location: "tools", data: {} } };
                }
            }
        }
        { // time
            var timeX = 552;
            var timeY = 8;
            for (var i = 0; i < data.timeLeft; i++) {
                img.time.draw(timeX + i * (img.time.w - 4), timeY);
            }
        }
        { // MONEY
            var moneyX = 4 * 167;
            var moneyY = 4 * 109 + 2;
            img.coin.draw(moneyX, moneyY);
            var textOrig = "" + data.money;
            if (data.money > 99999)
                textOrig = "99999";
            var text = "" + textOrig;
            if (data.money < 10)
                text = "0" + text;
            if (data.money < 100)
                text = "0" + text;
            if (data.money < 1000)
                text = "0" + text;
            if (data.money < 10000)
                text = "0" + text;
            p.fill(0, 0, 0, 80);
            p.text(text, moneyX - p.textWidth(text) - 4, moneyY + 32);
            p.fill(0, 0, 0);
            p.text(textOrig, moneyX - p.textWidth(textOrig) - 4, moneyY + 32);
        }
        { // OBJECTIVES
            if (!data.hover && !customInHover) {
                var objectivesX = 572;
                var objectivesY_1 = 92;
                p.text("Season\nObjectives:", objectivesX, objectivesY_1);
                var dx_1 = objectivesX;
                var dy_1 = objectivesY_1 + 44;
                var vals_1 = VITAMIN_VALUES.filter(function (x) { return data.objectiveVitamins[x]; });
                vals_1.forEach(function (x, i) {
                    var o = data.objectiveVitamins[x];
                    if (!o)
                        return;
                    var vitamin = ALL_VITAMINS[x];
                    vitamin.img.draw(dx_1, dy_1);
                    dy_1 += vitamin.img.w + 8;
                    p.text(data.currentVitamins[x] + "/" + o, dx_1 + 36, dy_1 - 16);
                    if (i == Math.floor(vals_1.length / 2)) {
                        dy_1 = objectivesY_1 + 44;
                        dx_1 += 4 * 40;
                    }
                });
            }
        }
        // img.ui_front.draw(0, 0);
        if (data.hold)
            data.hold.holdable.inHandStep(data.hold, mouseEvents, mx, my);
        if (customInHover) {
            customInHover();
        }
        else if (data.hover) {
            img.select.draw(data.hover.source.x, data.hover.source.y);
            data.hover.obj.drawDetails(data.hover.source);
            if (mouseEvents.justReleased && !data.hold && data.hover.obj.onSelect)
                data.hover.obj.onSelect(data.hover.source);
        }
        data.hover = null;
        mouseEvents.justPressed = false;
        mouseEvents.justReleased = false;
        if (data.currentWeather === "thunder") {
            nextThunder--;
            if (nextThunder <= 0) {
                nextThunder = 75 + Math.random() * 250;
                particleSystem.add({
                    size: 1 + 2 * Math.random(),
                    color: { r: 255, g: 255, b: 255, a: 255 },
                    image: img.thunderbolt,
                    life: 30,
                    vx: 0, vy: 0,
                    x: Math.random() * p.width - 100,
                    y: 0,
                    compute: function (p) { if (p.color.a)
                        p.color.a -= 10; }
                });
            }
        }
        if (data.currentWeather === "rain" || data.currentWeather === "thunder")
            particleSystem.add({
                color: { r: 0, g: Util.randomInt(100, 200), b: 255, a: 255 },
                life: 50,
                vx: Util.randomInt(1, 3),
                vy: 10,
                x: Math.random() * p.width,
                y: 0,
                // compute: (p: Particle) => { if (p.color.a) p.color.a -= 2 }
            });
        if (data.currentWeather === "snowy" && Math.random() < .33)
            particleSystem.add({
                extraData: { seed1: Math.random() * 100, seed2: Math.random() * 100 },
                color: { r: 255, g: 255, b: 255, a: 255 },
                life: 500,
                vx: 0,
                vy: Util.randomInt(1, 2),
                x: Math.random() * p.width,
                y: 0,
                compute: function (p) {
                    if (p.extraData.seed1 && p.color.a)
                        p.color.a -= p.extraData.seed1 / 30;
                    if (p.extraData.seed2)
                        p.x += p.extraData.seed2 / 40 * Math.cos(p.extraData.seed2 + Date.now() / 1000);
                }
            });
        particleSystem.step(p);
        if (Date.now() > nextEndTurn) {
            nextEndTurn = Date.now() + TURN_LENGTH;
            endTurn();
        }
    };
};
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        _this.relatedGridObj = props.relatedGridObj;
        _this.costs = props.costs;
        return _this;
    }
    Card.prototype.reduceStock = function (cardIndex) {
        var card = this.data.cards[cardIndex];
        card.stock--;
        if (card.stock <= 0)
            card.id = null;
    };
    Card.prototype.onUse = function (source, destination) {
    };
    // implement from holdable
    Card.prototype.inHandStep = function (hold, mouseEvents, mx, my) {
        var _a;
        this.img.draw(mx - 16, my - 64 - 16, 0);
        var hoverSource = (_a = this.data.hover) === null || _a === void 0 ? void 0 : _a.source;
        if (mouseEvents.justReleased) {
            if ((hoverSource === null || hoverSource === void 0 ? void 0 : hoverSource.location) === "grid" && this.data.grid[hoverSource.data.gx][hoverSource.data.gy].id === "dirt" && this.canAfford()) {
                this.onUse(hold.source, hoverSource);
                this.executeCosts();
                var data = this.data.cards[hold.source.data.cardIndex];
            }
            this.data.hold = null;
        }
    };
    Card.prototype.onSelect = function (source) {
        this.data.hold = { holdable: this, source: source, data: {} };
    };
    Card.prototype.draw = function (x, y, source) {
        this.img.draw(x, y, 0);
    };
    Card.prototype.drawDetails = function (source) {
        _super.prototype.drawDetails.call(this, source);
        var data = this.data.cards[source.data.cardIndex];
        var cardTextX = 572;
        var cardTextY = 92;
        this.p.text(this.name + " (x" + data.stock + ")", cardTextX, cardTextY);
    };
    Card.prototype.drawDescription = function (x, y, source) {
        if (this.relatedGridObj && this.relatedGridObj.drawDescription)
            this.relatedGridObj.drawDescription(x, y, source);
    };
    Card.prototype.canAfford = function () {
        if (this.costs.money && this.data.money < this.costs.money)
            return false;
        if (this.costs.water && this.data.water < this.costs.water)
            return false;
        if (this.costs.otherCosts && !this.costs.otherCosts(false))
            return false;
        return true;
    };
    Card.prototype.executeCosts = function () {
        if (this.costs.money)
            this.data.money -= this.costs.money;
        if (this.costs.water)
            this.data.water -= this.costs.water;
        if (this.costs.otherCosts)
            this.costs.otherCosts(true);
    };
    return Card;
}(Obj));
function randomFromArray(arr) {
    if (arr.length === 0)
        return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle(array) {
    var _a;
    var currentIndex = array.length;
    var randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function sfc32(a, b, c, d) {
    return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        var t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    };
}
// const seedgen = () => (Math.random() * 2 ** 32) >>> 0;
// const _seeds = [0.9675946905, 0.678694789, 0.664269702, 0.2598896];
// const seedgen = (i: number) => (_seeds[i] * 2 ** 32) >>> 0;
// const seeds = [seedgen(0), seedgen(1), seedgen(2), seedgen(3)]
// const getRand = sfc32(seeds[0], seeds[1], seeds[2], seeds[3]);
// for (let i = 0; i < 10; i++) console.log(getRand());
var GridObj = /** @class */ (function (_super) {
    __extends(GridObj, _super);
    function GridObj(props) {
        var _this = _super.call(this, props) || this;
        _this.tags = props.tags;
        return _this;
    }
    GridObj.prototype.draw = function (x, y, source) {
        this.img.draw(x, y);
    };
    GridObj.prototype.onEndTurn = function (source, gridData) {
    };
    GridObj.prototype.makeCard = function () {
        return null;
    };
    return GridObj;
}(Obj));
var GridObjCard = /** @class */ (function (_super) {
    __extends(GridObjCard, _super);
    function GridObjCard(props) {
        var _this = _super.call(this, props) || this;
        _this.costs = props.costs;
        return _this;
    }
    return GridObjCard;
}(GridObj));
var GridObjCrop = /** @class */ (function (_super) {
    __extends(GridObjCrop, _super);
    function GridObjCrop(props) {
        var _this = _super.call(this, props) || this;
        _this.stages = props.stages;
        _this.growTime = props.growTime;
        _this.produces = props.produces;
        _this.cooldown = props.cooldown;
        _this.description = props.description;
        _this.flavortext = props.flavortext;
        return _this;
    }
    GridObjCrop.prototype.makeCard = function () {
        var _this = this;
        var card = new Card({
            id: this.id + "Card",
            data: this.data,
            p: this.p,
            name: this.name,
            img: this.img,
            relatedGridObj: this,
            costs: this.costs
        });
        card.draw = function (x, y, source) {
            _this.img.draw(x, y - 64, 0);
        };
        card.onUse = function (source, destination) {
            _this.putOnGrid(source, destination);
        };
        card.drawCornerImage = function () { return _this.drawCornerImage(); };
        return card;
    };
    GridObjCrop.prototype.draw = function (x, y, source) {
        var gridData = this.data.grid[source.data.gx][source.data.gy];
        if (gridData.wasWatered)
            this.data.img.wetDirt.draw(x, y);
        this.img.draw(x, y - 64, gridData.stage);
    };
    GridObjCrop.prototype.drawDetails = function (source) {
        _super.prototype.drawDetails.call(this, source);
        var data = this.data.grid[source.data.gx][source.data.gy];
        var cardTextX = 572;
        var cardTextY = 92;
        this.p.text(this.name + " (" + data.stage + "/" + this.stages + ")", cardTextX, cardTextY);
    };
    GridObjCrop.prototype.drawCornerImage = function () {
        var cardImageX = this.p.width - 64 - 16 - 4;
        var cardImageY = 16;
        this.img.draw(cardImageX, cardImageY, 0);
    };
    GridObjCrop.prototype.drawDescription = function (x, y, source) {
        var _this = this;
        _super.prototype.drawDescription.call(this, x, y, source);
        var tagsText = this.tags.reduce(function (a, b) { return a + "," + b; }, "").substring(1);
        var dy = y - 50;
        this.p.smallText();
        this.p.fill(0, 0, 0, 150);
        this.p.text(tagsText, x, dy);
        this.p.fill(0, 0, 0);
        dy += 64;
        this.p.text(this.description, x, dy);
        // this.p.text(`Provides nutrients\nevery turn when\ngrown and watered.`, x, dy);
        this.p.largeText();
        // harvest gains:
        dy += 4 * 41;
        this.p.text("On harvest:", x, dy);
        dy += 40;
        GAINS_VALUES.filter(function (x) { return _this.produces[x]; }).forEach(function (v, i) {
            var text = "+".concat(_this.produces[v]);
            var dx = x + 4 * 26 * i;
            _this.p.text(text, dx, dy);
            (v === "money"
                ? _this.data.img.smallCoin
                : ALL_VITAMINS[v].img).draw(dx + 4 + _this.p.textWidth(text), dy - 26);
        });
    };
    GridObjCrop.prototype.onWatering = function (source) {
        var gridObjData = this.data.grid[source.data.gx][source.data.gy];
        if (this.data.water > 0 && !gridObjData.wasWatered) {
            this.data.water--;
            gridObjData.wasWatered = true;
        }
    };
    GridObjCrop.prototype.onHarvest = function (source, destination, _gridData) {
        var gridData = _gridData;
        if (gridData.stage === this.stages)
            this.gainGains();
        this.data.grid[destination.data.gx][destination.data.gy].id = "dirt";
    };
    GridObjCrop.prototype.onEndTurn = function (source, _gridData) {
        var gridData = _gridData;
        if (gridData.wasWatered) {
            if (gridData.stage < this.stages)
                gridData.stage++;
        }
    };
    //
    GridObjCrop.prototype.gainGains = function () {
        var _this = this;
        GAINS_VALUES.filter(function (x) { return _this.produces[x]; }).forEach(function (v) {
            var _a, _b;
            if (v === "money")
                _this.data.money += (_a = _this.produces[v]) !== null && _a !== void 0 ? _a : 0;
            else
                _this.data.currentVitamins[v] += (_b = _this.produces[v]) !== null && _b !== void 0 ? _b : 0;
        });
    };
    GridObjCrop.prototype.putOnGrid = function (source, destination) {
        var _a = destination.data, gx = _a.gx, gy = _a.gy;
        this.data.grid[gx][gy] = { id: this.id, growTime: this.growTime, stage: 1 };
        var cardIndex = source.data.cardIndex;
        var cardId = this.data.cards[cardIndex].id;
        if (cardId)
            ALL_CARDS[cardId].reduceStock(cardIndex);
    };
    return GridObjCrop;
}(GridObjCard));
var Parsnip = /** @class */ (function (_super) {
    __extends(Parsnip, _super);
    function Parsnip(p, data) {
        return _super.call(this, {
            id: "parsnip", name: "Parsnip",
            img: data.img.parsnip,
            stages: 5,
            costs: { money: 20 },
            growTime: 0,
            produces: { A: 6, money: 30 },
            cooldown: 2,
            tags: ["root"],
            p: p,
            data: data,
            description: "Yields double vitamins\nwhen harvested in\nwinter.",
            flavortext: "",
        }) || this;
    }
    Parsnip.prototype.onHarvest = function (source, destination, gridData) {
        _super.prototype.onHarvest.call(this, source, destination, gridData);
        if (this.data.currentSeason === "winter")
            this.gainGains();
    };
    return Parsnip;
}(GridObjCrop));
var Carrot = /** @class */ (function (_super) {
    __extends(Carrot, _super);
    function Carrot(p, data) {
        return _super.call(this, {
            id: "carrot", name: "Carrots",
            img: data.img.carrot,
            stages: 4,
            costs: { money: 5 },
            growTime: 0,
            produces: { money: 10, A: 2 },
            cooldown: 2,
            tags: ["root"],
            p: p,
            data: data,
            description: "",
            flavortext: "Yummy.",
        }) || this;
    }
    return Carrot;
}(GridObjCrop));
var GridObjDirt = /** @class */ (function (_super) {
    __extends(GridObjDirt, _super);
    function GridObjDirt(props) {
        return _super.call(this, __assign(__assign({}, props), { tags: [] })) || this;
    }
    GridObjDirt.prototype.drawDescription = function (x, y) {
        this.p.text("Usable soil.", x, y);
    };
    return GridObjDirt;
}(GridObj));
var GridObjRock = /** @class */ (function (_super) {
    __extends(GridObjRock, _super);
    function GridObjRock(props) {
        return _super.call(this, __assign(__assign({}, props), { tags: ["mineral"] })) || this;
    }
    GridObjRock.prototype.drawDescription = function (x, y) {
        this.p.text("Remove with\npickaxe.", x, y);
    };
    return GridObjRock;
}(GridObj));
var GridObjWeeds = /** @class */ (function (_super) {
    __extends(GridObjWeeds, _super);
    function GridObjWeeds(props) {
        return _super.call(this, __assign(__assign({}, props), { tags: ["plant"] })) || this;
    }
    GridObjWeeds.prototype.drawDescription = function (x, y) {
        this.p.text("Remove with\nscythe.", x, y);
    };
    return GridObjWeeds;
}(GridObj));
var ToolSickle = /** @class */ (function (_super) {
    __extends(ToolSickle, _super);
    function ToolSickle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolSickle.prototype.inHandStep = function (hold, mouseEvents, mx, my) {
        var dx = mx - this.img.w / 2 + 52;
        var dy = my - this.img.h / 2 + 32;
        if (!hold.data.rot)
            hold.data.rot = 0;
        this.p.translate(dx, dy);
        this.p.rotate(-hold.data.rot / 10);
        this.img.draw(-52, -52, 0);
        this.p.rotate(hold.data.rot / 10);
        this.p.translate(-dx, -dy);
        if (mouseEvents.justReleased) {
            if (!this.data.hover || !this.data.hover.obj || this.data.hover.source.location !== "grid")
                this.release();
            else
                this.harvestMotion(hold, dx, dy);
        }
        if (hold.data.activateSickle) {
            hold.data.activateSickle = false;
            var hoverData = this.data.hover;
            if (!hoverData || !hoverData.obj || hoverData.source.location !== "grid")
                return;
            var gridObj = hoverData.obj;
            if (!gridObj.onHarvest)
                return;
            var gx = hoverData.source.data.gx;
            var gy = hoverData.source.data.gy;
            gridObj.onHarvest(hold.source, { location: "grid", data: { gx: gx, gy: gy } }, this.data.grid[gx][gy]);
        }
    };
    ToolSickle.prototype.harvestMotion = function (hold, dx, dy) {
        if (hold.data.stopDrawing)
            return;
        hold.data.stopDrawing = true;
        var intervalId;
        var rot = 0;
        intervalId = setInterval(function () {
            rot++;
            hold.data.rot = 10 * Math.sin(rot / 10);
            if (rot > 30) {
                hold.data.stopDrawing = false;
                hold.data.activateSickle = true;
                clearInterval(intervalId);
            }
        }, 1000 / 60);
    };
    return ToolSickle;
}(Tool));
var ToolWateringCan = /** @class */ (function (_super) {
    __extends(ToolWateringCan, _super);
    function ToolWateringCan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolWateringCan.prototype.inHandStep = function (hold, mouseEvents, mx, my) {
        var _a, _b;
        var hoverData = this.data.hover;
        var holdData = hold.data;
        if (mouseEvents.justPressed)
            holdData.pressTime = Date.now();
        var diff = (Date.now() - holdData.pressTime);
        if (mouseEvents.justReleased && diff < 150)
            this.release();
        var dx = mx - this.img.w / 2;
        var dy = my - this.img.h / 2;
        var hoverSource = (_a = hoverData === null || hoverData === void 0 ? void 0 : hoverData.source) !== null && _a !== void 0 ? _a : null;
        var gridObjId = hoverSource && hoverSource.data.gx && hoverSource.data.gy ? (_b = this.data.grid[hoverSource.data.gx][hoverSource.data.gy]) === null || _b === void 0 ? void 0 : _b.id : null;
        var gridObj = gridObjId ? ALL_GRIDOBJS[gridObjId] : null;
        if (mouseEvents.clicking && (gridObj === null || gridObj === void 0 ? void 0 : gridObj.onWatering) && this.data.water > 0 && (hoverSource === null || hoverSource === void 0 ? void 0 : hoverSource.location) === "grid") {
            var tar = hoverSource.x + "," + hoverSource.y;
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
            var particle = {
                x: mx + Util.randomInt(-5, 5), y: my + Util.randomInt(-5, 5),
                vx: -1 + 2 * Math.random(), vy: .5 + Math.random(),
                color: { r: 0, g: Util.randomInt(100, 200), b: Util.randomInt(200, 255), a: 255 },
                life: Util.randomInt(15, 40),
                size: 4,
            };
            this.data.getParticleSystem().add(particle);
            // }
        }
        else {
            this.data.img.wateringCanHeld.draw(dx + 32, dy - 25, 0);
            holdData.tar = null;
        }
    };
    return ToolWateringCan;
}(Tool));
