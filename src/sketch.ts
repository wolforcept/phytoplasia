const sketch = function (p: any) {

    const allWeathers: { [key in Weather]: WeatherObj } = {
        sunny: { id: "sunny", name: "Sunny", img: img.sunny },
        windy: { id: "windy", name: "Windy", img: img.windy },
        rain: { id: "rain", name: "Rain", img: img.heavy_rain },
        thunder: { id: "thunder", name: "Thunder", img: img.thunder },
        snowy: { id: "snowy", name: "Snowy", img: img.snowy },
    }

    const allSeasons: { [key in Season]: SeasonObj } = {
        spring: { id: "spring", name: "Spring", img: img.spring },
        summer: { id: "summer", name: "Summer", img: img.summer },
        autumn: { id: "autumn", name: "Autumn", img: img.autumn },
        winter: { id: "winter", name: "Winter", img: img.winter },
    }

    const allVitamins: { [key in Vitamin]: VitaminObj } = {
        A: { id: "A", name: 'Vitamin A', img: img.vitaminA },
        B: { id: "B", name: 'Vitamin B', img: img.vitaminB },
        C: { id: "C", name: 'Vitamin C', img: img.vitaminC },
        D: { id: "D", name: 'Vitamin D', img: img.vitaminD },
        E: { id: "E", name: 'Vitamin E', img: img.vitaminE },
        K: { id: "K", name: 'Vitamin K', img: img.vitaminK },
        Iron: { id: "Iron", name: 'Iron', img: img.Iron },
        Calcium: { id: "Calcium", name: 'Calcium', img: img.Calcium },
    };

    const allCards: { [key: string]: Card } = {};
    const allTools: { [key: string]: Tool } = {};
    const allGridObjects: { [key: string]: GridObj } = {};

    const gridSize = 6;
    const cards: Array<CardData> = [];
    const tools = [{ id: "wateringCan" }]
    const grid: Array<Array<GridData>> = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++)
            grid[i][j] = { id: "dirt" };
    }

    const objectiveVitamins: { [key in Vitamin]: number } = {
        A: 12, B: 4, C: 2, D: 2, E: 2, K: 0, Iron: 2, Calcium: 2
    };
    const currentVitamins: { [key in Vitamin]: number } = {
        A: 0, B: 0, C: 0, D: 0, E: 0, K: 0, Iron: 0, Calcium: 0
    };

    const particleSystem: ParticleSystem = new ParticleSystem();
    let font: any;
    let mouseEvents: MouseEvents = { clicking: false, justPressed: false, justReleased: false };
    p.mousePressed = () => { mouseEvents.clicking = true; mouseEvents.justPressed = true; };
    p.mouseReleased = () => { mouseEvents.clicking = false; mouseEvents.justReleased = true; };

    const MAX_WATER = 16;
    const MAX_TIME = 22;

    const data: Data = {
        img,
        getParticleSystem: () => particleSystem,

        allWeathers, allSeasons, allVitamins,
        allCards, allTools, allGridObjects,

        gridSize, grid, cards,

        objectiveVitamins,
        currentVitamins,

        hover: null,
        hold: null,

        water: MAX_WATER,
        money: 100,

        currentWeather: "thunder",
        currentSeason: "spring",

        timeLeft: MAX_TIME,
    }

    const defaultProps = { data, p };
    allGridObjects.dirt = new GridObjDirt({ id: "dirt", name: "Dirt", img: img.dirt, ...defaultProps });
    allGridObjects.weeds = new GridObjWeeds({ id: "weeds", name: "Weeds", img: img.grass30, ...defaultProps });
    allGridObjects.rock = new GridObjRock({ id: "rock", name: "Rocks", img: img.rocks1, ...defaultProps });

    // allGridObjects.carrots = GridObjCooldownFruit.create("carrots", "Carrots", img.plant2, ["root"], 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.strawberries = GridObjCooldownFruit.create("strawberries", "Carrots", img.plant5, ["fruit", "berry"], 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.potatoes = GridObjCooldownFruit.create("potatoes", "Potatoes", img.potato, ["vegetable"], 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.tomatoes = GridObjCooldownFruit.create("tomatoes", "Tomatoes", img.tomato, ["vegetable", "fruit"], 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.parsnip = GridObjCooldownFruit.create("parsnip", "Parsnip", img.parsnip, ["vegetable"], 2, 2, { B: 2 }, 3, defaultProps);
    // allGridObjects.cauliflower = GridObjCooldownFruit.create("cauliflower", "Cauliflower", img.cauliflower, ["vegetable"], 2, 2, { B: 2 }, 3, defaultProps);

    allGridObjects.parsnip /*         */ = GridObjCooldownFruit.create("parsnip"/*          */, "Parsnip"/*          */, img.parsnip /*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.cauliflower/*      */ = GridObjCooldownFruit.create("cauliflower"/*      */, "Cauliflower"/*      */, img.cauliflower/* */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.garlic/*           */ = GridObjCooldownFruit.create("garlic"/*           */, "Garlic"/*           */, img.garlic/*      */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.rhubarb /*         */ = GridObjCooldownFruit.create("rhubarb" /*         */, "Rhubarb "/*         */, img.rhubarb /*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.tomato/*           */ = GridObjCooldownFruit.create("tomato"/*           */, "Tomato"/*           */, img.tomato/*      */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.hotpepper/*        */ = GridObjCooldownFruit.create("hotpepper"/*        */, "Hotpepper"/*        */, img.hotpepper/*   */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.raddish /*         */ = GridObjCooldownFruit.create("raddish"/*          */, "Raddish "/*         */, img.raddish /*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.starfruit/*        */ = GridObjCooldownFruit.create("starfruit"/*        */, "Starfruit"/*        */, img.starfruit/*   */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.eggplant/*         */ = GridObjCooldownFruit.create("eggplant"/*         */, "Eggplant"/*         */, img.eggplant/*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.pumpkin/*          */ = GridObjCooldownFruit.create("pumpkin"/*          */, "Pumpkin"/*          */, img.pumpkin/*     */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.yam/*              */ = GridObjCooldownFruit.create("yam"/*              */, "Yam"/*              */, img.yam/*         */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.beet/*             */ = GridObjCooldownFruit.create("beet"/*             */, "Beet"/*             */, img.beet/*        */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.ancientfruit/*     */ = GridObjCooldownFruit.create("ancientfruit"/*     */, "Ancientfruit"/*     */, img.ancientfruit/**/, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.tulip/*            */ = GridObjCooldownFruit.create("tulip"/*            */, "Tulip"/*            */, img.tulip/*       */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.poppy/*            */ = GridObjCooldownFruit.create("poppy"/*            */, "Poppy"/*            */, img.poppy/*       */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.sunflower/*        */ = GridObjCooldownFruit.create("sunflower"/*        */, "Sunflower"/*        */, img.sunflowwer/*  */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.sweetgem/*         */ = GridObjCooldownFruit.create("sweetgem"/*         */, "Sweetgem"/*         */, img.sweetgem/*    */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.rice/*             */ = GridObjCooldownFruit.create("rice"/*             */, "Rice"/*             */, img.rice/*        */, ["root"], 5, 2, 2, { B: 2 }, 3, defaultProps);

    Object.keys(allGridObjects).forEach(id => {
        const card = allGridObjects[id].makeCard();
        if (card) allCards[id] = card;
    });

    // const everything = { ...allCards, ...allGridObjects, ...allTools, ...allSeasons, ...allVitamins, ...allWeathers };

    allTools.wateringCan = new ToolWateringCan({ id: "wateringCan", name: "Watering Can", img: img.wateringCan, ...defaultProps });

    function endTurn() {
        for (let gx = 0; gx < gridSize; gx++)
            for (let gy = 0; gy < gridSize; gy++) {
                const source: Source = { location: "grid", data: { gx, gy }, x: 0, y: 0 };
                const gridData = grid[gx][gy];
                if (gridData.id) allGridObjects[gridData.id].onEndTurn(source, gridData);
                gridData.wasWatered = false;
            }
        data.water = MAX_WATER;
        data.timeLeft--;
        if (data.timeLeft === 0) {
            data.timeLeft = MAX_TIME;
            endSeason();
        }
        if (Math.random() < .25) {
            data.currentWeather = randomFromArray(WEATHER_VALUES) as Weather;
        }
    }

    function endSeason() {
        /**/ if (data.currentSeason === "spring") data.currentSeason = "summer";
        else if (data.currentSeason === "summer") data.currentSeason = "autumn";
        else if (data.currentSeason === "autumn") data.currentSeason = "winter";
        else if (data.currentSeason === "winter") data.currentSeason = "spring";
    }

    // █▀▄ █▀▀
    // █▀  ▄██

    p.preload = function () {
        font = p.loadFont('assets/font.ttf');

        Object.keys(img).forEach(name => {
            const i = img[name];
            i.img = p.loadImage(i.path, () => {
                i.w = i.w ?? i.img.width * 4;
                i.h = i.h ?? i.img.height * 4;
                i.draw = (x: number, y: number, imgIndex?: number) => {
                    if (imgIndex === undefined) {
                        p.image(i.img, x, y, i.w, i.h);
                    } else if (i.n === undefined) {
                        if (imgIndex < 0) imgIndex += Math.floor(i.img.width / i.img.height);
                        p.image(i.img, x, y, i.h, i.h, imgIndex * i.img.height, 0, i.img.height, i.img.height);
                    } else {
                        if (imgIndex < 0) imgIndex += i.n;
                        p.image(i.img, x, y, i.w * 4, i.h * 4, i.sx + imgIndex * i.w, i.sy, i.w, i.h);
                    }
                }
            });
        });

        // [allGridObjects, allCards, allTools]
        //     .forEach(all => Object.keys(all).forEach(id => {
        //         all[id].id = id;
        //     }));
    }

    p.setup = function () {
        p.createCanvas(img.ui_back.w, img.ui_back.h);
        p.noSmooth();
        p.smallText = () => p.textSize(24);
        p.largeText = () => p.textSize(32);
        p.textFont(font);
        p.textSize(32);
        p.textLeading(24);

        let spots1 = []; let spots2 = []; let spots3 = [];
        for (let dx = 0; dx < gridSize; dx++)
            for (let dy = 0; dy < gridSize; dy++) {
                if (dx < 1 || dy < 1) { spots1.push({ x: dx, y: dy }); continue; }
                if (dx < 2 || dy < 2) { spots2.push({ x: dx, y: dy }); continue; }
                if (dx < 3 || dy < 3) { spots3.push({ x: dx, y: dy }); continue; }
            }
        shuffle(spots1); shuffle(spots2); shuffle(spots3);
        const nrOfWeeds = [5, 6, 4];
        const nrOfRocks = [6, 3, 0];
        spots1.splice(0, nrOfWeeds[0]).forEach(({ x, y }) => grid[x][y] = { id: "weeds" });
        spots1.splice(0, nrOfRocks[0]).forEach(({ x, y }) => grid[x][y] = { id: "rock" });
        spots2.splice(0, nrOfWeeds[1]).forEach(({ x, y }) => grid[x][y] = { id: "weeds" });
        spots2.splice(0, nrOfRocks[1]).forEach(({ x, y }) => grid[x][y] = { id: "rock" });
        spots3.splice(0, nrOfWeeds[2]).forEach(({ x, y }) => grid[x][y] = { id: "weeds" });
        spots3.splice(0, nrOfRocks[2]).forEach(({ x, y }) => grid[x][y] = { id: "rock" });

        cards[0] = { id: "parsnip" /*         */, stock: 10 };
        cards[1] = { id: "cauliflower"/*      */, stock: 10 };
        cards[2] = { id: "garlic"/*           */, stock: 10 };
        cards[3] = { id: "rhubarb" /*         */, stock: 10 };
        cards[4] = { id: "tomato"/*           */, stock: 10 };
        cards[5] = { id: "hotpepper"/*        */, stock: 10 };
        cards[6] = { id: "raddish" /*         */, stock: 10 };
        cards[7] = { id: "starfruit"/*        */, stock: 10 };
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

    let nextThunder = 100;

    p.draw = function () {
        const mx = p.mouseX;
        const my = p.mouseY;
        // let inHover: { hoverable: Hoverable, x: number, y: number, source: Source } | null = null;
        let customInHover: null | (() => void) = null;

        img.ui_back.draw(0, 0);

        { // GRID
            const gridX = 16;
            const gridY = 20;
            for (let gx = 0; gx < gridSize; gx++) {
                for (let gy = 0; gy < gridSize; gy++) {

                    const id = grid[gx][gy].id;
                    const dx = gridX + gx * 64;
                    const dy = gridY + gy * 64;
                    const source: Source = { location: "grid", x: dx, y: dy, data: { gx, gy } };

                    if (grid[gx][gy]?.wasWatered)
                        img.wetDirt.draw(dx, dy);
                    else
                        img.dirt.draw(dx, dy);

                    if (!id) continue;

                    const obj = allGridObjects[id];

                    if (!obj || !obj.draw) {
                        console.log(id, obj)
                        throw new Error(id + " grid obj error drawing.");
                    }

                    obj.draw(dx, dy, source);

                    if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                        data.hover = { obj, source };
                    }
                }
            }
        }

        { // WEATHER
            const weatherX = 420;
            const weatherY = 8;
            allWeathers[data.currentWeather].img.draw(weatherX, weatherY);
        }

        { // SEASON
            const seasonX = 480;
            const seasonY = 8;
            allSeasons[data.currentSeason].img.draw(seasonX, seasonY);

            if (mx > 420 && mx < 546 && my > 8 && my < 76) {
                customInHover = () => {
                    const x = 572;
                    const y = 92;
                    const text = "Weather: " + allWeathers[data.currentWeather].name + "\n\n\n\n\n\nSeason: " + allSeasons[data.currentSeason].name;
                    WEATHER_VALUES.forEach((id: Weather, i) => {
                        const dx = x + i * 64;
                        const dy = y + 16;
                        allWeathers[id].img.draw(dx, dy);
                        if (data.currentWeather === id)
                            img.select.draw(dx, dy);
                    });
                    SEASON_VALUES.forEach((id, i) => {
                        const dx = x + i * 64;
                        const dy = y + 160;
                        allSeasons[id].img.draw(dx, dy);
                        if (data.currentSeason === id)
                            img.select.draw(dx, dy);
                    });
                    p.text(text, x, y);
                }
            }
        }

        { // END TURN BUTTON
            const buttonX = 4 * 182;
            const buttonY = 4 * 106;

            if (mx > buttonX && my > buttonY && mx < buttonX + img.endTurnButton.w * 4 && my < buttonY + img.endTurnButton.h * 4) {
                if (mouseEvents.clicking)
                    img.endTurnButton.draw(buttonX, buttonY, 2);
                else
                    img.endTurnButton.draw(buttonX, buttonY, 0);
                if (mouseEvents.justReleased)
                    endTurn();
            } else {
                img.endTurnButton.draw(buttonX, buttonY, 1);
            }
        }

        { // WATER
            const waterX = 496;
            const waterY = 380;
            for (let i = 0; i < data.water; i++) {
                img.water.draw(waterX, waterY - i * (img.water.h));
            }
        }

        { // CARDS
            const cardsX = 16;
            const cardsY = 428;
            for (let _i = 0; _i < cards.length; _i++) {
                const i = _i;
                const id = cards[i].id;
                if (!id) continue;
                const card = allCards[id];
                if (!id || !card || !card.img) {
                    console.log(id, card);
                    throw new Error(`error drawing ${id}`);
                }
                const dx = cardsX + i * 64;
                const dy = cardsY;
                const source: Source = { location: "cards", x: dx, y: dy, data: { cardIndex: i } };
                card.draw(dx, dy, source);

                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    data.hover = { obj: card, source };
                    // inHover = { hoverable: card, x: dx, y: dy, source: { location: "cards", data: { cardIndex: i } } };
                }
            }
        }

        { // TOOLS
            const cardsX = 420;
            const cardsY = 84;
            for (let i = 0; i < tools.length; i++) {
                const id = tools[i]?.id;
                const tool = allTools[id];
                const dx = cardsX + i * 64;
                const dy = cardsY;
                tool.img.draw(dx, dy);

                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    data.hover = { obj: tool, source: { location: "tools", x: dx, y: dy, data: {} } };
                    // inHover = { hoverable: tool, x: dx, y: dy, source: { location: "tools", data: {} } };
                }
            }
        }

        { // time
            const timeX = 552;
            const timeY = 8;
            for (let i = 0; i < data.timeLeft; i++) {
                img.time.draw(timeX + i * (img.time.w - 4), timeY);
            }
        }

        { // MONEY
            const moneyX = 4 * 167;
            const moneyY = 4 * 109 + 2;
            img.coin.draw(moneyX, moneyY);
            let textOrig = "" + data.money;
            if (data.money > 99999) textOrig = "99999";
            let text = "" + textOrig;
            if (data.money < 10) text = "0" + text;
            if (data.money < 100) text = "0" + text;
            if (data.money < 1000) text = "0" + text;
            if (data.money < 10000) text = "0" + text;
            p.fill(0, 0, 0, 80);
            p.text(text, moneyX - p.textWidth(text) - 4, moneyY + 32);
            p.fill(0, 0, 0);
            p.text(textOrig, moneyX - p.textWidth(textOrig) - 4, moneyY + 32);
        }

        { // OBJECTIVES
            if (!data.hover && !customInHover) {
                const objectivesX = 572;
                const objectivesY = 92;
                p.text("Season\nObjectives:", objectivesX, objectivesY);

                let dx = objectivesX;
                let dy = objectivesY + 44;
                const vals = VITAMIN_VALUES.filter(x => objectiveVitamins[x]);
                vals.forEach((x, i) => {
                    const o = objectiveVitamins[x];
                    if (!o) return;
                    const vitamin = allVitamins[x];
                    vitamin.img.draw(dx, dy);
                    dy += vitamin.img.w + 8;
                    p.text(currentVitamins[x] + "/" + o, dx + 36, dy - 16);

                    if (i == Math.floor(vals.length / 2)) {
                        dy = objectivesY + 44;
                        dx += 4 * 40;
                    }
                });
            }
        }

        // img.ui_front.draw(0, 0);

        if (data.hold) data.hold.holdable.inHandStep(data.hold, mouseEvents, mx, my);

        if (customInHover) {
            customInHover();
        } else if (data.hover) {
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
                    compute: (p: Particle) => { if (p.color.a) p.color.a -= 10 }
                })
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
            })

        if (data.currentWeather === "snowy" && Math.random() < .33)
            particleSystem.add({
                extraData: { seed1: Math.random() * 100, seed2: Math.random() * 100 },
                color: { r: 255, g: 255, b: 255, a: 255 },
                life: 500,
                vx: 0,
                vy: Util.randomInt(1, 2),
                x: Math.random() * p.width,
                y: 0,
                compute: (p: Particle) => {
                    if (p.extraData.seed1 && p.color.a) p.color.a -= p.extraData.seed1 / 30;
                    if (p.extraData.seed2) p.x += p.extraData.seed2 / 40 * Math.cos(p.extraData.seed2 + Date.now() / 1000);
                }
            });

        particleSystem.step(p);

    };

};
