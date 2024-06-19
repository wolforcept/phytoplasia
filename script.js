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
var Obj = /** @class */ (function () {
    function Obj(props) {
        this.id = props.id;
        this.data = props.data;
        this.p = props.p;
        this.name = props.name;
        this.img = props.img;
    }
    Obj.prototype.drawDescription = function (x, y) {
        this.p.text(x + 20, y, this.name);
    };
    Obj.prototype.draw = function (gx, gy, x, y) {
    };
    Obj.prototype.drawDetails = function () {
        var cardTextX = 572;
        var cardTextY = 92;
        var cardImageX = this.p.width - 64 - 16;
        // const cardImageX = 720 + 60;
        var cardImageY = 64;
        this.img.draw(cardImageX, cardImageY, -1);
        this.p.text(this.name, cardTextX, cardTextY);
        if (this.drawDescription)
            this.drawDescription(cardTextX, cardTextY + 80);
    };
    return Obj;
}());
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem() {
        this.particles = [];
    }
    ParticleSystem.prototype.step = function (p5) {
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
            else {
                p5.noStroke();
                p5.fill(p5.color(particle.color.r, particle.color.g, particle.color.b, particle.color.a));
                p5.square(particle.x, particle.y, particle.size);
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
    Tool.prototype.drawDescription = function (x, y) {
        _super.prototype.drawDescription.call(this, x, y);
        this.p.text("On use:", x, y);
        this.p.text("+", x + 16, y + 40);
        // this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
    };
    Tool.prototype.onSelect = function (source) {
        this.data.holdData = { holdable: this, data: {} };
    };
    Tool.prototype.release = function () {
        this.data.holdData = { holdable: null, data: null };
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
    time: { path: 'assets/time.png' },
    water: { path: 'assets/water.png' },
    dirt: { path: 'assets/dirt.png' },
    wetDirt: { path: 'assets/wet_dirt.png' },
    coin: { path: 'assets/coin.png' },
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
    spring: { path: 'assets/seasons/spring.png' },
    summer: { path: 'assets/seasons/summer.png' },
    autumn: { path: 'assets/seasons/autumn.png' },
    winter: { path: 'assets/seasons/winter.png' },
    seeds: { path: 'assets/plants/seeds.png' },
    tomato: { path: 'assets/vegetables/tomato.png' },
    corn: { path: 'assets/vegetables/corn.png' },
    turnip: { path: 'assets/vegetables/turnip.png' },
    potato: { path: 'assets/vegetables/potato.png' },
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
var sketch = function (p) {
    var allWeathers = {
        sunny: { id: "sunny", name: "Sunny", img: img.sunny },
        windy: { id: "windy", name: "Windy", img: img.windy },
        rain: { id: "rain", name: "Rain", img: img.heavy_rain },
        thunder: { id: "thunder", name: "Thunder", img: img.thunder },
        snowy: { id: "snowy", name: "Snowy", img: img.snowy },
    };
    var allSeasons = {
        spring: { id: "spring", name: "Spring", img: img.spring },
        summer: { id: "summer", name: "Summer", img: img.summer },
        autumn: { id: "autumn", name: "Autumn", img: img.autumn },
        winter: { id: "winter", name: "Winter", img: img.winter },
    };
    var allVitamins = {
        A: { id: "A", name: 'Vitamin A', img: img.vitaminA },
        B: { id: "B", name: 'Vitamin B', img: img.vitaminB },
        C: { id: "C", name: 'Vitamin C', img: img.vitaminC },
        D: { id: "D", name: 'Vitamin D', img: img.vitaminD },
        E: { id: "E", name: 'Vitamin E', img: img.vitaminE },
        K: { id: "K", name: 'Vitamin K', img: img.vitaminK },
        Iron: { id: "Iron", name: 'Iron', img: img.Iron },
        Calcium: { id: "Calcium", name: 'Calcium', img: img.Calcium },
    };
    var allCards = {};
    var allTools = {};
    var allGridObjects = {};
    var gridSize = 6;
    var cards = [];
    var tools = [{ id: "wateringCan" }];
    var grid = [];
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++)
            grid[i][j] = { id: "dirt" };
    }
    var objectiveVitamins = {
        A: 12, B: 4, C: 2, D: 2, E: 2, K: 0, Iron: 2, Calcium: 2
    };
    var currentVitamins = {
        A: 0, B: 0, C: 0, D: 0, E: 0, K: 0, Iron: 0, Calcium: 0
    };
    var particleSystem = new ParticleSystem();
    var font;
    var mouseEvents = { clicking: false, justPressed: false, justReleased: false };
    p.mousePressed = function () { mouseEvents.clicking = true; mouseEvents.justPressed = true; };
    p.mouseReleased = function () { mouseEvents.clicking = false; mouseEvents.justReleased = true; };
    var data = {
        img: img,
        getParticleSystem: function () { return particleSystem; },
        allWeathers: allWeathers,
        allSeasons: allSeasons,
        allVitamins: allVitamins,
        allCards: allCards,
        allTools: allTools,
        allGridObjects: allGridObjects,
        gridSize: gridSize,
        grid: grid,
        cards: cards,
        objectiveVitamins: objectiveVitamins,
        currentVitamins: currentVitamins,
        hoverData: { hoverable: null, data: null },
        holdData: { holdable: null, data: null },
        water: 16,
        money: 100,
        currentWeather: "sunny",
        currentSeason: "spring",
        timeLeft: 19,
    };
    var defaultProps = { data: data, p: p };
    allGridObjects.dirt = new GridObjDirt(__assign({ id: "dirt", name: "Dirt", img: img.dirt }, defaultProps));
    allGridObjects.weeds = new GridObjWeeds(__assign({ id: "weeds", name: "Weeds", img: img.grass30 }, defaultProps));
    allGridObjects.rock = new GridObjRock(__assign({ id: "rock", name: "Rocks", img: img.rocks1 }, defaultProps));
    allGridObjects.carrots = GridObjCooldownFruit.create("carrots", "Carrots", img.plant2, ["root"], 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.strawberries = GridObjCooldownFruit.create("strawberries", "Carrots", img.plant5, ["fruit", "berry"], 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.potatoes = GridObjCooldownFruit.create("potatoes", "Potatoes", img.potato, ["vegetable"], 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.tomatoes = GridObjCooldownFruit.create("tomatoes", "Tomatoes", img.tomato, ["vegetable", "fruit"], 2, 2, { B: 2 }, 3, defaultProps);
    Object.keys(allGridObjects).forEach(function (id) {
        var card = allGridObjects[id].makeCard();
        if (card)
            allCards[id] = card;
    });
    allTools.wateringCan = new ToolWateringCan(__assign({ id: "wateringCan", name: "Watering Can", img: img.wateringCan }, defaultProps));
    p.preload = function () {
        font = p.loadFont('assets/font.ttf');
        Object.keys(img).forEach(function (name) {
            var i = img[name];
            i.img = p.loadImage(i.path, function () {
                i.w = i.img.width * 4;
                i.h = i.img.height * 4;
                i.draw = function (x, y, imgIndex) {
                    if (imgIndex === undefined)
                        p.image(i.img, x, y, i.w, i.h);
                    else {
                        if (imgIndex < 0)
                            imgIndex += Math.floor(i.img.width / i.img.height);
                        p.image(i.img, x, y, i.h, i.h, imgIndex * i.img.height, 0, i.img.height, i.img.height);
                    }
                };
            });
        });
        [allGridObjects, allCards, allTools]
            .forEach(function (all) { return Object.keys(all).forEach(function (id) {
            all[id].id = id;
        }); });
    };
    p.setup = function () {
        p.createCanvas(img.ui_back.w, img.ui_back.h);
        p.noSmooth();
        p.textFont(font);
        p.textSize(32);
        p.textLeading(24);
        var spots1 = [];
        var spots2 = [];
        var spots3 = [];
        for (var dx = 0; dx < gridSize; dx++)
            for (var dy = 0; dy < gridSize; dy++) {
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
            }
        shuffle(spots1);
        shuffle(spots2);
        shuffle(spots3);
        var nrOfWeeds = [5, 6, 4];
        var nrOfRocks = [6, 3, 0];
        spots1.splice(0, nrOfWeeds[0]).forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return grid[x][y] = { id: "weeds" };
        });
        spots1.splice(0, nrOfRocks[0]).forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return grid[x][y] = { id: "rock" };
        });
        spots2.splice(0, nrOfWeeds[1]).forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return grid[x][y] = { id: "weeds" };
        });
        spots2.splice(0, nrOfRocks[1]).forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return grid[x][y] = { id: "rock" };
        });
        spots3.splice(0, nrOfWeeds[2]).forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return grid[x][y] = { id: "weeds" };
        });
        spots3.splice(0, nrOfRocks[2]).forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return grid[x][y] = { id: "rock" };
        });
        cards[0] = { id: "tomatoes", stock: 10 };
        cards[1] = { id: "potatoes", stock: 10 };
        cards[2] = { id: "carrots", stock: 10 };
        cards[3] = { id: "strawberries", stock: 10 };
    };
    p.draw = function () {
        var _a, _b;
        var mx = p.mouseX;
        var my = p.mouseY;
        var inHover = null;
        var customInHover = null;
        img.ui_back.draw(0, 0);
        { // GRID
            var gridX = 16;
            var gridY = 20;
            for (var gx = 0; gx < gridSize; gx++) {
                for (var gy = 0; gy < gridSize; gy++) {
                    var id = grid[gx][gy].id;
                    var dx = gridX + gx * 64;
                    var dy = gridY + gy * 64;
                    if ((_a = grid[gx][gy]) === null || _a === void 0 ? void 0 : _a.wasWatered)
                        img.wetDirt.draw(dx, dy);
                    else
                        img.dirt.draw(dx, dy);
                    if (!id)
                        continue;
                    var obj = allGridObjects[id];
                    if (!obj || !obj.draw) {
                        console.log(id, obj);
                        throw new Error(id + " grid obj error drawing.");
                    }
                    obj.draw(gx, gy, dx, dy);
                    if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                        inHover = { hoverable: obj, x: dx, y: dy, source: { location: "grid", data: { gx: gx, gy: gy } } };
                    }
                }
            }
        }
        { // WEATHER
            var weatherX = 420;
            var weatherY = 8;
            allWeathers[data.currentWeather].img.draw(weatherX, weatherY);
        }
        { // SEASON
            var seasonX = 480;
            var seasonY = 8;
            allSeasons[data.currentSeason].img.draw(seasonX, seasonY);
        }
        if (mx > 420 && mx < 546 && my > 8 && my < 76) {
            customInHover = function () {
                var x = 572;
                var y = 92;
                var text = "Weather: " + allWeathers[data.currentWeather].name + "\n\n\n\n\n\nSeason: " + allSeasons[data.currentSeason].name;
                WEATHER_VALUES.forEach(function (id, i) {
                    var dx = x + i * 64;
                    var dy = y + 16;
                    allWeathers[id].img.draw(dx, dy);
                    if (data.currentWeather === id)
                        img.select.draw(dx, dy);
                });
                SEASON_VALUES.forEach(function (id, i) {
                    var dx = x + i * 64;
                    var dy = y + 160;
                    allSeasons[id].img.draw(dx, dy);
                    if (data.currentSeason === id)
                        img.select.draw(dx, dy);
                });
                p.text(text, x, y);
            };
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
            for (var _i = 0; _i < cards.length; _i++) {
                var i = _i;
                var id = cards[i].id;
                if (!id)
                    continue;
                var card = allCards[id];
                if (!id || !card || !card.img) {
                    console.log(id, card);
                    throw new Error("error drawing ".concat(id));
                }
                var dx = cardsX + i * 64;
                var dy = cardsY;
                card.img.draw(dx, dy, -1);
                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    inHover = { hoverable: card, x: dx, y: dy, source: { location: "cards", data: { cardIndex: i } } };
                }
            }
        }
        { // TOOLS
            var cardsX = 420;
            var cardsY = 84;
            for (var i = 0; i < tools.length; i++) {
                var id = (_b = tools[i]) === null || _b === void 0 ? void 0 : _b.id;
                var tool = allTools[id];
                var dx = cardsX + i * 64;
                var dy = cardsY;
                tool.img.draw(dx, dy);
                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    inHover = { hoverable: tool, x: dx, y: dy, source: { location: "tools", data: {} } };
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
            var timeX = 4 * 213;
            var timeY = 4 * 109 + 2;
            img.coin.draw(timeX, timeY);
            var textOrig = "" + data.money;
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
            p.text(text, timeX - p.textWidth(text) - 4, timeY + 32);
            p.fill(0, 0, 0);
            p.text(textOrig, timeX - p.textWidth(textOrig) - 4, timeY + 32);
        }
        { // NEXT OBJECTIVES
            if (!inHover && !customInHover) {
                var objectivesX = 572;
                var objectivesY_1 = 92;
                p.text("Season\nObjectives:", objectivesX, objectivesY_1);
                var dx_1 = objectivesX;
                var dy_1 = objectivesY_1 + 44;
                var vals_1 = VITAMIN_VALUES.filter(function (x) { return objectiveVitamins[x]; });
                vals_1.forEach(function (x, i) {
                    var o = objectiveVitamins[x];
                    if (!o)
                        return;
                    var vitamin = allVitamins[x];
                    vitamin.img.draw(dx_1, dy_1);
                    dy_1 += vitamin.img.w + 8;
                    p.text("x" + o, dx_1 + 36, dy_1 - 16);
                    if (i == Math.floor(vals_1.length / 2)) {
                        dy_1 = objectivesY_1 + 44;
                        dx_1 += 120;
                    }
                });
            }
        }
        // img.ui_front.draw(0, 0);
        if (data.holdData.holdable)
            data.holdData.holdable.inHandStep(mouseEvents, mx, my);
        if (customInHover) {
            customInHover();
        }
        else if (inHover) {
            img.select.draw(inHover.x, inHover.y);
            if (mouseEvents.justReleased && !data.holdData.holdable && inHover.hoverable.onSelect)
                inHover.hoverable.onSelect(inHover.source);
        }
        mouseEvents.justPressed = false;
        mouseEvents.justReleased = false;
        particleSystem.step(p);
        particleSystem.add({
            color: { r: 0, g: Util.randomInt(100, 200), b: 255, a: 255 },
            life: 50,
            size: 4,
            vx: Util.randomInt(1, 3),
            vy: 10,
            x: Math.random() * p.width,
            y: 0,
            // compute: (p: Particle) => { if (p.color.a) p.color.a -= 2 }
        });
    };
};
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        _this.relatedGridObj = props.relatedGridObj;
        return _this;
    }
    Card.prototype.inHandStep = function (mouseEvents, mx, my) {
    };
    Card.prototype.onSelect = function (source) {
        this.data.holdable = this;
    };
    Card.prototype.inHandClick = function (hover) {
    };
    Card.prototype.onUse = function (source, destination) {
        if (destination.location === "grid") {
            var data = this.data.cards[source.data.cardIndex];
            if (data.id && data.stock > 0) {
                this.relatedGridObj.putOnGrid(source, destination);
                data.stock--;
                if (data.stock <= 0)
                    data.id = null;
            }
        }
        this.data.holdable = null;
    };
    Card.prototype.drawDescription = function (x, y) {
        if (this.relatedGridObj && this.relatedGridObj.drawDescription)
            this.relatedGridObj.drawDescription(x, y);
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
var _seeds = [0.9675946905, 0.678694789, 0.664269702, 0.2598896];
var seedgen = function (i) { return (_seeds[i] * Math.pow(2, 32)) >>> 0; };
var seeds = [seedgen(0), seedgen(1), seedgen(2), seedgen(3)];
var getRand = sfc32(seeds[0], seeds[1], seeds[2], seeds[3]);
for (var i = 0; i < 10; i++)
    console.log(getRand());
var GridObj = /** @class */ (function (_super) {
    __extends(GridObj, _super);
    function GridObj(props) {
        var _this = _super.call(this, props) || this;
        _this.tags = props.tags;
        return _this;
    }
    GridObj.prototype.putOnGrid = function (source, destination) {
    };
    GridObj.prototype.draw = function (gx, gy, x, y) {
        this.img.draw(x, y);
    };
    GridObj.prototype.endOfTurn = function () {
        console.log("".concat(this.id, ".endOfTurn() not defined."));
    };
    GridObj.prototype.onWatering = function (gx, gy) {
    };
    GridObj.prototype.makeCard = function () {
        return null;
    };
    return GridObj;
}(Obj));
// class GridObjSeeds extends GridObj {
//     constructor(data, p, name, img) {
//         super(data, p, name, img, ["seeds"]);
//     }
//     drawDescription(x, y) {
//         this.p.text(`Every ${this.maxCooldown} turns:`, x, y);
//     }
//     onWatering(gx, gy) {
//         const gridData = this.data.grid[gx][gy];
//         console.log(gridData);
//         if (gridData) {
//             gridData.timeLeft--;
//             // const gridObj = this.data.allGridObjects[gridData.id];
//             // if (gridObj && gridObj.onWatering) {
//             // }
//         }
//         console.log("on wartering")
//     }
//     draw(gx, gy, x, y) {
//         if (this.data.grid[gx][gy].wasWatered)
//             this.data.img.wetDirt.draw(x, y)
//         this.img.draw(x, y)
//     }
// }
var GridObjCard = /** @class */ (function (_super) {
    __extends(GridObjCard, _super);
    function GridObjCard(props) {
        var _this = _super.call(this, props) || this;
        _this.cost = props.cost;
        return _this;
    }
    return GridObjCard;
}(GridObj));
var GridObjCooldownFruit = /** @class */ (function (_super) {
    __extends(GridObjCooldownFruit, _super);
    function GridObjCooldownFruit(props) {
        var _this = _super.call(this, props) || this;
        _this.growTime = props.growTime;
        _this.produces = props.produces;
        _this.cooldown = props.cooldown;
        return _this;
    }
    GridObjCooldownFruit.create = function (id, name, img, tags, cost, growTime, produces, cooldown, defaultProps) {
        return new GridObjCooldownFruit(__assign({ id: id, name: name, img: img, cost: { money: cost }, cooldown: cooldown, growTime: growTime, produces: produces, tags: tags }, defaultProps));
    };
    GridObjCooldownFruit.prototype.makeCard = function () {
        var _this = this;
        var card = new Card({
            id: this.id + "Card",
            data: this.data,
            p: this.p,
            name: this.name,
            img: this.img,
            relatedGridObj: this
        });
        card.draw = function (gx, gy, x, y) {
            // if (this.data.grid[gx][gy].wasWatered)
            //     this.data.img.wetDirt.draw(x, y)
            _this.img.draw(x, y, 0);
        };
        return card;
    };
    GridObjCooldownFruit.prototype.draw = function (gx, gy, x, y) {
        // if (this.data.grid[gx][gy].wasWatered)
        //     this.data.img.wetDirt.draw(x, y)
        this.img.draw(x, y, 0);
    };
    GridObjCooldownFruit.prototype.putOnGrid = function (source, destination) {
        var cardIndex = source.data;
        var _a = destination.data, gx = _a.gx, gy = _a.gy;
        this.data.grid[gx][gy] = { id: this.id, growTime: this.growTime };
        this.data.cards[cardIndex].id = null;
    };
    GridObjCooldownFruit.prototype.drawDescription = function (x, y) {
        var _this = this;
        _super.prototype.drawDescription.call(this, x, y);
        // this.p.text(x, y, );
        this.p.text("Every ".concat(this.cooldown, " turns:"), x, y);
        VITAMIN_VALUES.filter(function (x) { return _this.produces[x]; }).forEach(function (v) {
            var text = "+".concat(_this.produces[v]);
            _this.p.text(text, x, y + 32);
            _this.data.allVitamins[v].img.draw(x + _this.p.textWidth(text), y + 4);
        });
    };
    GridObjCooldownFruit.prototype.onWatering = function (gx, gy) {
        // const gridData = this.data.grid[gx][gy];
        // if(gridData && !gridData.wasWatered)
        // gr
        // console.log(gridData);
        // if (gridData) {
        // gridData.stage = gridData.stage ? gridData.stage + 1 : 1;
        // const gridObj = this.data.allGridObjects[gridData.id];
        // if (gridObj && gridObj.onWatering) {
        // }
        // }
        console.log("on wartering");
    };
    return GridObjCooldownFruit;
}(GridObjCard));
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
        this.p.text("Remove with\nsickle.", x, y);
    };
    return GridObjWeeds;
}(GridObj));
var ToolWateringCan = /** @class */ (function (_super) {
    __extends(ToolWateringCan, _super);
    function ToolWateringCan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolWateringCan.prototype.onUseOnGrid = function (gx, gy) {
        var water = this.data.water;
        var gridData = this.data.grid[gx][gy];
        if (gridData.id && water > 0 && !gridData.wasWatered) {
            var gridObj = this.data.allGridObjects[gridData.id];
            if (gridObj) {
                gridObj.onWatering(gx, gy);
                gridData.wasWatered = true;
                this.data.water--;
            }
        }
    };
    ToolWateringCan.prototype.inHandStep = function (mouseEvents, mx, my) {
        if (mouseEvents.justPressed)
            this.data.holdData.data.pressTime = Date.now();
        if (mouseEvents.justReleased && (Date.now() - this.data.holdData.data.pressTime) < 100)
            this.release();
        var dx = mx - this.img.w / 2;
        var dy = my - this.img.h / 2;
        if (mouseEvents.clicking) {
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
        else
            this.data.img.wateringCanHeld.draw(dx + 32, dy - 25, 0);
    };
    return ToolWateringCan;
}(Tool));
