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

    const allCards = {};
    const allTools = {};
    const allGridObjects = {};

    const gridSize = 6;
    const grid = []; for (let i = 0; i < gridSize; i++) grid[i] = [];
    const cards = [];
    const tools = [{ id: "wateringCan" }]

    const objectiveVitamins: { [key in Vitamin]: number } = {
        A: 12, B: 4, C: 2, D: 2, E: 2, K: 0, Iron: 2, Calcium: 2
    };
    const currentVitamins: { [key in Vitamin]: number } = {
        A: 0, B: 0, C: 0, D: 0, E: 0, K: 0, Iron: 0, Calcium: 0
    };

    let font: any;
    let currentWeather: Weather = "sunny";
    let currentSeason: Season = "spring";
    let water: number = 16;
    let timeLeft: number = 19;
    let money: number = 100;
    let clicking: boolean = false;
    let justClicked: boolean = false;
    let inHand: InHand = null;

    p.mousePressed = () => clicking = true;
    p.mouseReleased = () => { justClicked = true; clicking = false };

    const data: Data = {
        img,

        allWeathers, allSeasons, allVitamins,
        allCards, allTools, allGridObjects,

        gridSize, grid, cards,

        objectiveVitamins,
        currentVitamins,

        getWater: () => water,
        addWater: (x) => water += x,

        getCurrentWeather: () => currentWeather,
        getCurrentSeason: () => currentSeason,

        getMoney: () => money,
        addMoney: (x) => money += x,

        getTimeLeft: () => timeLeft,

        setInHand: x => inHand = x,
    }

    allGridObjects["dirt"] = new GridObjDirt(data, p, "Dirt", img.dirt);
    allGridObjects["weeds"] = new GridObjWeeds(data, p, "Weeds", img.grass30);
    allGridObjects["rock"] = new GridObjRock(data, p, "Rocks", img.rocks1);

    // allGridObjects["carrots"] = new GridObjCooldownFruit(data, p, "Carrots", img.plant2, ["root"], { water: 2 }, 2, { A: 2 }, 3);
    // allGridObjects.["strawberries"] = new GridObjCooldownFruit(data, p, "Strawberries", img.plant5, ["fruit", "berry"], { water: 2 }, 2, { B: 2 }, 3);
    allGridObjects["potato"] = new GridObjCooldownFruit(data, p, "Potatoes", img.potato, ["vegetable"], { water: 2 }, 2, { B: 2 }, 3);
    allGridObjects["tomato"] = new GridObjCooldownFruit(data, p, "Tomatoes", img.tomato, ["vegetable"], { water: 2 }, 2, { B: 2 }, 3);

    Object.keys(allGridObjects).forEach(id => {
        if (allGridObjects[id].makeCard) {
            allCards[id] = allGridObjects[id].makeCard();
        }
    });

    allTools["wateringCan"] = new ToolWateringCan(data, p, "Watering Can", img.wateringCan);

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
        const mx = p.mouseX;
        const my = p.mouseY;
        let inHover: InHover = null;
        let customInHover: () => void = null;

        img.ui_back.draw(0, 0);

        { // GRID
            const gridX = 16;
            const gridY = 20;
            for (let gx = 0; gx < gridSize; gx++) {
                for (let gy = 0; gy < gridSize; gy++) {

                    const id = grid[gx][gy]?.id;
                    const dx = gridX + gx * 64;
                    const dy = gridY + gy * 64;

                    if (grid[gx][gy]?.wasWatered)
                        img.wetDirt.draw(dx, dy);
                    else
                        img.dirt.draw(dx, dy);

                    if (!id) {
                        if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {

                            inHover = {
                                id: "dirt",
                                x: dx, y: dy,
                                location: "grid",
                                data: { gx, gy },
                            };
                            allGridObjects["dirt"].drawDetails();
                        }
                        continue;
                    }

                    const obj = allGridObjects[id];

                    if (!obj || !obj.draw) {
                        console.log(id, obj)
                        throw new Error(id + " grid obj error drawing.");
                    }

                    obj.draw(gx, gy, dx, dy);

                    if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                        inHover = {
                            id,
                            x: dx, y: dy,
                            onSelect: (id) => obj.onSelect(id),
                            location: "grid",
                            data: { gx, gy },
                        };
                        obj.drawDetails();
                    }
                }
            }
        }

        { // WEATHER
            const weatherX = 420;
            const weatherY = 8;
            allWeathers[currentWeather].img.draw(weatherX, weatherY);
        }

        { // SEASON
            const seasonX = 480;
            const seasonY = 8;
            allSeasons[currentSeason].img.draw(seasonX, seasonY);
        }

        if (mx > 420 && mx < 546 && my > 8 && my < 76) {
            customInHover = () => {
                const x = 572;
                const y = 92;
                const text = "Weather: " + allWeathers[currentWeather].name + "\n\n\n\n\n\nSeason: " + allSeasons[currentSeason].name;
                Object.keys(allWeathers).forEach((id, i) => {
                    const dx = x + i * 64;
                    const dy = y + 16;
                    allWeathers[id].img.draw(dx, dy);
                    if (currentWeather === id)
                        img.select.draw(dx, dy);
                });
                Object.keys(allSeasons).forEach((id, i) => {
                    const dx = x + i * 64;
                    const dy = y + 160;
                    allSeasons[id].img.draw(dx, dy);
                    if (currentSeason === id)
                        img.select.draw(dx, dy);
                });
                p.text(text, x, y);
            }
        }

        { // WATER
            const waterX = 496;
            const waterY = 380;
            for (let i = 0; i < water; i++) {
                img.water.draw(waterX, waterY - i * (img.water.h));
            }
        }

        { // CARDS
            const cardsX = 16;
            const cardsY = 428;
            for (let _i = 0; _i < cards.length; _i++) {
                const i = _i;
                if (!cards[i]) continue;
                const id = cards[i]?.id;
                const card = allCards[id];
                if (!id || !card || !card.img) {
                    console.log(id, card);
                    throw new Error(`error drawing ${id}`);
                }
                const dx = cardsX + i * 64;
                const dy = cardsY;
                card.img.draw(dx, dy, -1);

                if (mx > dx && mx < dx + 64 && my > dy && my < dy + 64) {
                    inHover = {
                        id,
                        x: dx, y: dy,
                        onSelect: (id) => card.onSelect(id),
                        location: "cards",
                        data: { cardIndex: i },
                    };
                    card.drawDetails();
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
                    inHover = {
                        id,
                        x: dx, y: dy,
                        onSelect: (id) => tool.onSelect(id),
                        location: "tools",
                    } as InHover;
                    tool.drawDetails();
                }
            }
        }

        { // time
            const timeX = 552;
            const timeY = 8;
            for (let i = 0; i < timeLeft; i++) {
                img.time.draw(timeX + i * (img.time.w - 4), timeY);
            }
        }

        { // MONEY
            const timeX = 4 * 213;
            const timeY = 4 * 109 + 2;
            img.coin.draw(timeX, timeY);
            let textOrig = "" + money;
            let text = "" + textOrig;
            if (money < 10) text = "0" + text;
            if (money < 100) text = "0" + text;
            if (money < 1000) text = "0" + text;
            if (money < 10000) text = "0" + text;
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
                const vals = Object.keys(objectiveVitamins).filter(x => objectiveVitamins[x]);
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

        if (inHand) inHand.inHandStep(clicking, justClicked);

        // if (inHand && inHand.img) {
        //     inHand.img.draw(mx - 32, my - 32, 0);
        // }

        // if (clicking) {

        // }

        if (customInHover) {
            customInHover();
        } else if (inHover) {
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
