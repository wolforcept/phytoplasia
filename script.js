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
var Obj = /** @class */ (function () {
    function Obj(data, p, name, img) {
        this.data = data;
        this.p = p;
        this.name = name;
        this.img = img;
    }
    Obj.prototype.drawDescription = function (x, y) {
        console.log("".concat(this.id, ".drawDescription(").concat(x, ", ").concat(y, ") not defined."));
    };
    Obj.prototype.onSelect = function (id) {
        console.log("".concat(this.id, ".onSelect(").concat(id, ") not defined."));
    };
    Obj.prototype.onUse = function (source, destination) {
        console.log("".concat(this.id, ".onUse(").concat(source, ", ").concat(destination, ") not defined."));
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
var Tool = /** @class */ (function (_super) {
    __extends(Tool, _super);
    function Tool(data, p, name, img) {
        return _super.call(this, data, p, name, img) || this;
    }
    Tool.prototype.drawDescription = function (x, y) {
        this.p.text("On use:", x, y);
        this.p.text("+", x + 16, y + 40);
        // this.data.allVitamins[v].img.draw(x + this.p.textWidth(text), y + 4)
    };
    Tool.prototype.onSelect = function (source) {
        this.data.setInHand(this);
    };
    Tool.prototype.inHandStep = function (clicking, justClicked) {
    };
    Tool.prototype.onUse = function (source, destination) {
        if (source.location === "tools" && destination.location == "grid") {
            var _a = destination.data, gx = _a.gx, gy = _a.gy;
            this.onUseOnGrid(gx, gy);
        }
        this.data.setInHand(undefined);
    };
    Tool.prototype.onUseOnGrid = function (gx, gy) {
        console.log("Tool ".concat(this.id, ".onUseOnGrid(gx:").concat(gx, ", gy:").concat(gy, ") not defined."));
    };
    return Tool;
}(Obj));
var ToolWateringCan = /** @class */ (function (_super) {
    __extends(ToolWateringCan, _super);
    function ToolWateringCan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolWateringCan.prototype.onUseOnGrid = function (gx, gy) {
        var water = this.data.getWater();
        var gridData = this.data.grid[gx][gy];
        if (gridData && water > 0 && !gridData.wasWatered) {
            var gridObj = this.data.allGridObjects[gridData.id];
            if (gridObj) {
                gridObj.onWatering(gx, gy);
                gridData.wasWatered = true;
                this.data.addWater(-1);
            }
        }
    };
    return ToolWateringCan;
}(Tool));
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
    var grid = [];
    for (var i = 0; i < gridSize; i++)
        grid[i] = [];
    var cards = [];
    var tools = [{ id: "wateringCan" }];
    var objectiveVitamins = {
        A: 12, B: 4, C: 2, D: 2, E: 2, K: 0, Iron: 2, Calcium: 2
    };
    var currentVitamins = {
        A: 0, B: 0, C: 0, D: 0, E: 0, K: 0, Iron: 0, Calcium: 0
    };
    var font;
    var currentWeather = "sunny";
    var currentSeason = "spring";
    var water = 16;
    var timeLeft = 19;
    var money = 100;
    var clicking = false;
    var justClicked = false;
    var inHand = null;
    p.mousePressed = function () { return clicking = true; };
    p.mouseReleased = function () { justClicked = true; clicking = false; };
    var data = {
        img: img,
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
        getWater: function () { return water; },
        addWater: function (x) { return water += x; },
        getCurrentWeather: function () { return currentWeather; },
        getCurrentSeason: function () { return currentSeason; },
        getMoney: function () { return money; },
        addMoney: function (x) { return money += x; },
        getTimeLeft: function () { return timeLeft; },
        setInHand: function (x) { return inHand = x; },
    };
    allGridObjects["dirt"] = new GridObjDirt(data, p, "Dirt", img.dirt);
    allGridObjects["weeds"] = new GridObjWeeds(data, p, "Weeds", img.grass30);
    allGridObjects["rock"] = new GridObjRock(data, p, "Rocks", img.rocks1);
    // allGridObjects["carrots"] = new GridObjCooldownFruit(data, p, "Carrots", img.plant2, ["root"], { water: 2 }, 2, { A: 2 }, 3);
    // allGridObjects.["strawberries"] = new GridObjCooldownFruit(data, p, "Strawberries", img.plant5, ["fruit", "berry"], { water: 2 }, 2, { B: 2 }, 3);
    allGridObjects["potato"] = new GridObjCooldownFruit(data, p, "Potatoes", img.potato, ["vegetable"], { water: 2 }, 2, { B: 2 }, 3);
    allGridObjects["tomato"] = new GridObjCooldownFruit(data, p, "Tomatoes", img.tomato, ["vegetable"], { water: 2 }, 2, { B: 2 }, 3);
    Object.keys(allGridObjects).forEach(function (id) {
        if (allGridObjects[id].makeCard) {
            allCards[id] = allGridObjects[id].makeCard();
        }
    });
    allTools["wateringCan"] = new ToolWateringCan(data, p, "Watering Can", img.wateringCan);
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
        cards[0] = { id: "tomato" };
        cards[1] = { id: "tomato" };
        cards[2] = { id: "tomato" };
        cards[3] = { id: "tomato" };
        cards[4] = { id: "potato" };
        cards[5] = { id: "potato" };
        cards[6] = { id: "potato" };
        cards[7] = { id: "potato" };
        cards[8] = { id: "potato" };
        cards[9] = { id: "potato" };
        cards[10] = { id: "potato" };
    };
    p.draw = function () {
        var _a, _b, _c, _d;
        var mx = p.mouseX;
        var my = p.mouseY;
        var inHover = null;
        var customInHover = null;
        img.ui_back.draw(0, 0);
        { // GRID
            var gridX = 16;
            var gridY = 20;
            for (var gx = 0; gx < gridSize; gx++) {
                var _loop_1 = function (gy) {
                    var id = (_a = grid[gx][gy]) === null || _a === void 0 ? void 0 : _a.id;
                    var dx = gridX + gx * 64;
                    var dy = gridY + gy * 64;
                    if ((_b = grid[gx][gy]) === null || _b === void 0 ? void 0 : _b.wasWatered)
                        img.wetDirt.draw(dx, dy);
                    else
                        img.dirt.draw(dx, dy);
                    if (!id) {
                        if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                            inHover = {
                                id: "dirt",
                                x: dx, y: dy,
                                location: "grid",
                                data: { gx: gx, gy: gy },
                            };
                            allGridObjects["dirt"].drawDetails();
                        }
                        return "continue";
                    }
                    var obj = allGridObjects[id];
                    if (!obj || !obj.draw) {
                        console.log(id, obj);
                        throw new Error(id + " grid obj error drawing.");
                    }
                    obj.draw(gx, gy, dx, dy);
                    if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                        inHover = {
                            id: id,
                            x: dx, y: dy,
                            onSelect: function (id) { return obj.onSelect(id); },
                            location: "grid",
                            data: { gx: gx, gy: gy },
                        };
                        obj.drawDetails();
                    }
                };
                for (var gy = 0; gy < gridSize; gy++) {
                    _loop_1(gy);
                }
            }
        }
        { // WEATHER
            var weatherX = 420;
            var weatherY = 8;
            allWeathers[currentWeather].img.draw(weatherX, weatherY);
        }
        { // SEASON
            var seasonX = 480;
            var seasonY = 8;
            allSeasons[currentSeason].img.draw(seasonX, seasonY);
        }
        if (mx > 420 && mx < 546 && my > 8 && my < 76) {
            customInHover = function () {
                var x = 572;
                var y = 92;
                var text = "Weather: " + allWeathers[currentWeather].name + "\n\n\n\n\n\nSeason: " + allSeasons[currentSeason].name;
                Object.keys(allWeathers).forEach(function (id, i) {
                    var dx = x + i * 64;
                    var dy = y + 16;
                    allWeathers[id].img.draw(dx, dy);
                    if (currentWeather === id)
                        img.select.draw(dx, dy);
                });
                Object.keys(allSeasons).forEach(function (id, i) {
                    var dx = x + i * 64;
                    var dy = y + 160;
                    allSeasons[id].img.draw(dx, dy);
                    if (currentSeason === id)
                        img.select.draw(dx, dy);
                });
                p.text(text, x, y);
            };
        }
        { // WATER
            var waterX = 496;
            var waterY = 380;
            for (var i = 0; i < water; i++) {
                img.water.draw(waterX, waterY - i * (img.water.h));
            }
        }
        { // CARDS
            var cardsX = 16;
            var cardsY = 428;
            var _loop_2 = function (_i) {
                var i = _i;
                if (!cards[i])
                    return "continue";
                var id = (_c = cards[i]) === null || _c === void 0 ? void 0 : _c.id;
                var card = allCards[id];
                if (!id || !card || !card.img) {
                    console.log(id, card);
                    throw new Error("error drawing ".concat(id));
                }
                var dx = cardsX + i * 64;
                var dy = cardsY;
                card.img.draw(dx, dy, -1);
                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    inHover = {
                        id: id,
                        x: dx, y: dy,
                        onSelect: function (id) { return card.onSelect(id); },
                        location: "cards",
                        data: { cardIndex: i },
                    };
                    card.drawDetails();
                }
            };
            for (var _i = 0; _i < cards.length; _i++) {
                _loop_2(_i);
            }
        }
        { // TOOLS
            var cardsX = 420;
            var cardsY = 84;
            var _loop_3 = function (i) {
                var id = (_d = tools[i]) === null || _d === void 0 ? void 0 : _d.id;
                var tool = allTools[id];
                var dx = cardsX + i * 64;
                var dy = cardsY;
                tool.img.draw(dx, dy);
                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    inHover = {
                        id: id,
                        x: dx, y: dy,
                        onSelect: function (id) { return tool.onSelect(id); },
                        location: "tools",
                    };
                    tool.drawDetails();
                }
            };
            for (var i = 0; i < tools.length; i++) {
                _loop_3(i);
            }
        }
        { // time
            var timeX = 552;
            var timeY = 8;
            for (var i = 0; i < timeLeft; i++) {
                img.time.draw(timeX + i * (img.time.w - 4), timeY);
            }
        }
        { // MONEY
            var timeX = 4 * 213;
            var timeY = 4 * 109 + 2;
            img.coin.draw(timeX, timeY);
            var textOrig = "" + money;
            var text = "" + textOrig;
            if (money < 10)
                text = "0" + text;
            if (money < 100)
                text = "0" + text;
            if (money < 1000)
                text = "0" + text;
            if (money < 10000)
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
                var vals_1 = Object.keys(objectiveVitamins).filter(function (x) { return objectiveVitamins[x]; });
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
        if (inHand)
            inHand.inHandStep(clicking, justClicked);
        // if (inHand && inHand.img) {
        //     inHand.img.draw(mx - 32, my - 32, 0);
        // }
        // if (clicking) {
        // }
        if (customInHover) {
            customInHover();
        }
        else if (inHover) {
            // img.select.draw(hover.x, hover.y);
            // if (justClicked) {
            //     if (inHand) {
            //         if (inHand.onUse)
            //             inHand.onUse(hover);
            //     } else if (hover.onSelect) {
            //         hover.onSelect(hover);
            //     }
            // }
        }
        justClicked = false;
    };
};
// CARDS
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(data, p, name, img, relatedGridObj) {
        var _this = _super.call(this, data, p, name, img) || this;
        _this.relatedGridObj = relatedGridObj;
        return _this;
    }
    Card.prototype.onSelect = function (source) {
        this.data.setInHand(this);
    };
    Card.prototype.inHandStep = function (clicking, justClicked) {
    };
    Card.prototype.onUse = function (source, destination) {
        if (destination.location === "grid") {
            this.relatedGridObj.putOnGrid(source, destination);
            this.data.cards[source.data.cardIndex] = null;
        }
        this.data.setInHand(undefined);
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
// GRID OBJECTS
var GridObj = /** @class */ (function (_super) {
    __extends(GridObj, _super);
    function GridObj(data, p, name, img, tags) {
        var _this = _super.call(this, data, p, name, img) || this;
        _this.tags = tags;
        return _this;
    }
    GridObj.prototype.draw = function (gx, gy, x, y) {
        this.img.draw(x, y);
    };
    GridObj.prototype.endOfTurn = function () {
        console.log("".concat(this.id, ".endOfTurn() not defined."));
    };
    GridObj.prototype.onWatering = function (gx, gy) {
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
    function GridObjCard(data, p, name, img, tags, placeCosts) {
        var _this = _super.call(this, data, p, name, img, tags) || this;
        _this.placeCosts = placeCosts;
        return _this;
    }
    return GridObjCard;
}(GridObj));
var GridObjCooldownFruit = /** @class */ (function (_super) {
    __extends(GridObjCooldownFruit, _super);
    function GridObjCooldownFruit(data, p, name, img, tags, placeCosts, growTime, produces, cooldown) {
        var _this = _super.call(this, data, p, name, img, tags, placeCosts) || this;
        _this.growTime = growTime;
        _this.produces = produces;
        _this.cooldown = cooldown;
        return _this;
    }
    GridObjCooldownFruit.prototype.makeCard = function () {
        var _this = this;
        var card = new Card(this.data, this.p, this.name, this.img, this);
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
        this.data.cards[cardIndex] = undefined;
    };
    GridObjCooldownFruit.prototype.drawDescription = function (x, y) {
        var _this = this;
        this.p.text(x, y, this.name);
        this.p.text("Every ".concat(this.cooldown, " turns:"), x, y);
        Object.keys(this.produces).forEach(function (v) {
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
    function GridObjDirt(data, p, name, img) {
        return _super.call(this, data, p, name, img, []) || this;
    }
    GridObjDirt.prototype.drawDescription = function (x, y) {
        this.p.text("Usable soil.", x, y);
    };
    return GridObjDirt;
}(GridObj));
var GridObjRock = /** @class */ (function (_super) {
    __extends(GridObjRock, _super);
    function GridObjRock(data, p, name, img) {
        return _super.call(this, data, p, name, img, ["mineral"]) || this;
    }
    GridObjRock.prototype.drawDescription = function (x, y) {
        this.p.text("Remove with\npickaxe.", x, y);
    };
    return GridObjRock;
}(GridObj));
var GridObjWeeds = /** @class */ (function (_super) {
    __extends(GridObjWeeds, _super);
    function GridObjWeeds(data, p, name, img) {
        return _super.call(this, data, p, name, img, ["plant"]) || this;
    }
    GridObjWeeds.prototype.drawDescription = function (x, y) {
        this.p.text("Remove with\nsickle.", x, y);
    };
    return GridObjWeeds;
}(GridObj));
