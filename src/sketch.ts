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

    const data: Data = {
        img,
        getParticleSystem: () => particleSystem,

        allWeathers, allSeasons, allVitamins,
        allCards, allTools, allGridObjects,

        gridSize, grid, cards,

        objectiveVitamins,
        currentVitamins,

        hoverData: { hoverable: null, data: null },
        holdData: { holdable: null, data: null },

        water: 16,
        money: 100,

        currentWeather: "sunny",
        currentSeason: "spring",

        timeLeft: 19,
    }

    const defaultProps = { data, p };
    allGridObjects.dirt = new GridObjDirt({ id: "dirt", name: "Dirt", img: img.dirt, ...defaultProps });
    allGridObjects.weeds = new GridObjWeeds({ id: "weeds", name: "Weeds", img: img.grass30, ...defaultProps });
    allGridObjects.rock = new GridObjRock({ id: "rock", name: "Rocks", img: img.rocks1, ...defaultProps });

    allGridObjects.carrots = GridObjCooldownFruit.create("carrots", "Carrots", img.plant2, ["root"], 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.strawberries = GridObjCooldownFruit.create("strawberries", "Carrots", img.plant5, ["fruit", "berry"], 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.potatoes = GridObjCooldownFruit.create("potatoes", "Potatoes", img.potato, ["vegetable"], 2, 2, { B: 2 }, 3, defaultProps);
    allGridObjects.tomatoes = GridObjCooldownFruit.create("tomatoes", "Tomatoes", img.tomato, ["vegetable", "fruit"], 2, 2, { B: 2 }, 3, defaultProps);

    Object.keys(allGridObjects).forEach(id => {
        const card = allGridObjects[id].makeCard();
        if (card) allCards[id] = card;
    });

    allTools.wateringCan = new ToolWateringCan({ id: "wateringCan", name: "Watering Can", img: img.wateringCan, ...defaultProps });

    p.preload = function () {
        font = p.loadFont('assets/font.ttf');

        Object.keys(img).forEach(name => {
            const i = img[name];
            i.img = p.loadImage(i.path, () => {
                i.w = i.img.width * 4;
                i.h = i.img.height * 4;
                i.draw = (x: number, y: number, imgIndex?: number) => {
                    if (imgIndex === undefined)
                        p.image(i.img, x, y, i.w, i.h);
                    else {
                        if (imgIndex < 0) imgIndex += Math.floor(i.img.width / i.img.height)
                        p.image(i.img, x, y, i.h, i.h, imgIndex * i.img.height, 0, i.img.height, i.img.height);
                    }
                }
            });
        });

        [allGridObjects, allCards, allTools]
            .forEach(all => Object.keys(all).forEach(id => {
                all[id].id = id;
            }));
    }

    p.setup = function () {
        p.createCanvas(img.ui_back.w, img.ui_back.h);
        p.noSmooth();
        p.textFont(font);
        p.textSize(32);
        p.textLeading(24);

        let spots1 = [];
        let spots2 = [];
        let spots3 = [];
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

        cards[0] = { id: "tomatoes", stock: 10 };
        cards[1] = { id: "potatoes", stock: 10 };
        cards[2] = { id: "carrots", stock: 10 };
        cards[3] = { id: "strawberries", stock: 10 };
    };

    p.draw = function () {
        const mx = p.mouseX;
        const my = p.mouseY;
        let inHover: { hoverable: Hoverable, x: number, y: number, source: Source } | null = null;
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

                    obj.draw(gx, gy, dx, dy);

                    if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                        inHover = { hoverable: obj, x: dx, y: dy, source: { location: "grid", data: { gx, gy } } };
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
        }

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
                card.img.draw(dx, dy, -1);

                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    inHover = { hoverable: card, x: dx, y: dy, source: { location: "cards", data: { cardIndex: i } } };
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
                    inHover = { hoverable: tool, x: dx, y: dy, source: { location: "tools", data: {} } };
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
            const timeX = 4 * 213;
            const timeY = 4 * 109 + 2;
            img.coin.draw(timeX, timeY);
            let textOrig = "" + data.money;
            let text = "" + textOrig;
            if (data.money < 10) text = "0" + text;
            if (data.money < 100) text = "0" + text;
            if (data.money < 1000) text = "0" + text;
            if (data.money < 10000) text = "0" + text;
            p.fill(0, 0, 0, 80);
            p.text(text, timeX - p.textWidth(text) - 4, timeY + 32);
            p.fill(0, 0, 0);
            p.text(textOrig, timeX - p.textWidth(textOrig) - 4, timeY + 32);
        }

        { // NEXT OBJECTIVES
            if (!inHover && !customInHover) {
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
                    p.text("x" + o, dx + 36, dy - 16);

                    if (i == Math.floor(vals.length / 2)) {
                        dy = objectivesY + 44;
                        dx += 120;
                    }
                });
            }
        }

        // img.ui_front.draw(0, 0);

        if (data.holdData.holdable) data.holdData.holdable.inHandStep(mouseEvents, mx, my);

        if (customInHover) {
            customInHover();
        } else if (inHover) {
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
        })
    };

};
