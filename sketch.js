const sketch = function (p) {

    const allWeathers = {
        sunny: { name: "Sunny", img: img.sunny },
        windy: { name: "Windy", img: img.windy },
        rain: { name: "Rain", img: img.heavy_rain },
        thunder: { name: "Thunder", img: img.thunder },
    }

    const allSeasons = {
        spring: { name: "Spring", img: img.spring },
        summer: { name: "Summer", img: img.summer },
        autumn: { name: "Autumn", img: img.autumn },
        winter: { name: "Winter", img: img.winter },
    }

    const allVitamins = {
        A: { name: 'Vitamin A', img: img.vitaminA },
        B: { name: 'Vitamin B', img: img.vitaminB },
        C: { name: 'Vitamin C', img: img.vitaminC },
        D: { name: 'Vitamin D', img: img.vitaminD },
        E: { name: 'Vitamin E', img: img.vitaminE },
        K: { name: 'Vitamin K', img: img.vitaminK },
        Iron: { name: 'Iron', img: img.Iron },
        Calcium: { name: 'Calcium', img: img.Calcium },
    };

    const allCards = {};
    const allTools = {};
    const allGridObjects = {};

    const gridSize = 6;
    const grid = []; for (let i = 0; i < gridSize; i++) grid[i] = [];
    const cards = [];
    const tools = [{ id: "wateringCan" }]

    const objectiveVitamins = {
        A: 12, B: 4, C: 2, D: 2, E: 2, K: 0, Iron: 2, Calcium: 2
    };
    const currentVitamins = {
        A: 0, B: 0, C: 0, D: 0, E: 0, K: 0, Iron: 0, Calcium: 0
    };

    let water = 16;
    let timeLeft = 19;
    let currentWeather = "sunny";
    let currentSeason = "spring";
    let money = 100;
    let justClicked = false;
    let inHand;
    p.mouseReleased = () => justClicked = true;

    const data = {
        img,
        allWeathers, allVitamins,
        allCards, allTools, allGridObjects,
        gridSize, grid, cards,
        objectives: objectiveVitamins,
        getWater: () => water,
        addWater: (x) => water += x,
        getCurrentWeather: () => currentWeather,
        getCurrentSeason: () => currentSeason,
        getTimeLeft: () => timeLeft,
        getMoney: () => money,

        setInHand: x => inHand = x,
    }

    allGridObjects.dirt = new GridObjDirt(data, p, "Dirt", img.dirt, {});
    allGridObjects.weeds = new GridObjWeeds(data, p, "Weeds", img.grass30, {});
    allGridObjects.rock = new GridObjRock(data, p, "Rocks", img.rocks1, {});
    // allGridObjects.seeds = new GridObjSeeds(data, p, "Seeds", img.seeds, {});

    // allGridObjects.carrots = new GridObjCooldownFruit(data, p, "Carrots", img.plant2, ["root"], { water: 2 }, 2, { A: 2 }, 3);
    // allGridObjects.strawberries = new GridObjCooldownFruit(data, p, "Strawberries", img.plant5, ["fruit", "berry"], { water: 2 }, 2, { B: 2 }, 3);
    allGridObjects.potato = new GridObjCooldownFruit(data, p, "Potatoes", img.potato, ["vegetable"], { water: 2 }, 2, { B: 2 }, 3);
    allGridObjects.tomato = new GridObjCooldownFruit(data, p, "Tomatoes", img.tomato, ["vegetable"], { water: 2 }, 2, { B: 2 }, 3);

    Object.keys(allGridObjects).forEach(id => {
        if (allGridObjects[id].makeCard) {
            allCards[id] = allGridObjects[id].makeCard();
        }
    });

    allTools.wateringCan = new ToolWateringCan(data, p, "Watering Can", img.wateringCan);

    p.preload = function () {
        font = p.loadFont('assets/font.ttf');

        Object.keys(img).forEach(name => {
            const i = img[name];
            i.img = p.loadImage(i.path, () => {
                i.w = i.img.width * 4;
                i.h = i.img.height * 4;
                i.draw = (x, y, imgIndex) => {
                    if (imgIndex === undefined)
                        p.image(i.img, x, y, i.w, i.h);
                    else {
                        if (imgIndex < 0) imgIndex += Math.floor(i.img.width / i.img.height)
                        // console.log(imgIndex)
                        p.image(i.img, x, y, i.h, i.h, imgIndex * i.img.height, 0, i.img.height, i.img.height);
                        // p.image(i.img, x, y, i.h, i.h, i.h * imgIndex, 0, i.h, i.h);
                    }
                }
            });
        });

        [allGridObjects, allCards, allTools,
            allVitamins, allWeathers, allSeasons]
            .forEach(all => Object.keys(all).forEach(id => {
                // everything[id] = all[id];
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
    };

    p.draw = function () {
        const mx = p.mouseX;
        const my = p.mouseY;
        let inHover = null;

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
                                data: { gx, gy }
                            };
                            allGridObjects.dirt.drawDetails();
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
            inHover = {
                custom: () => {
                    const x = 572;
                    const y = 92;
                    const text = "Weather:\n   " + allWeathers[currentWeather].name + "\n\n\n\n\n\nSeason:\n   " + allSeasons[currentSeason].name;
                    Object.keys(allWeathers).forEach((id, i) => {
                        const dx = x + i * 64;
                        const dy = y + 40;
                        allWeathers[id].img.draw(dx, dy);
                        if (currentWeather === id)
                            img.select.draw(dx, dy);
                    });
                    Object.keys(allSeasons).forEach((id, i) => {
                        const dx = x + i * 64;
                        const dy = y + 208;
                        allSeasons[id].img.draw(dx, dy);
                        if (currentSeason === id)
                            img.select.draw(dx, dy);
                    });
                    p.text(text, x, y);
                }
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
                    };
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
            const timeX = 796;
            const timeY = 440;
            img.coin.draw(timeX, timeY);
            const text = "" + money;
            p.text(text, timeX - p.textWidth(text) - 4, timeY + 32);
        }

        { // NEXT OBJECTIVES
            if (!inHover) {
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

        if (inHand && inHand.img) {
            inHand.img.draw(mx - 32, my - 32, 0);
        }

        if (inHover) {
            if (inHover.custom) {
                inHover.custom();
            } else {
                img.select.draw(inHover.x, inHover.y);
                if (justClicked) {
                    if (inHand) {
                        if (inHand.onUse)
                            inHand.onUse(inHover);
                    } else if (inHover.onSelect) {
                        inHover.onSelect(inHover);
                    }
                }
            }
        }

        justClicked = false;
    };

};

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
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

// const seedgen = () => (Math.random() * 2 ** 32) >>> 0;
const _seeds = [0.9675946905, 0.678694789, 0.664269702, 0.2598896];
const seedgen = (i) => (_seeds[i] * 2 ** 32) >>> 0;
const seeds = [seedgen(0), seedgen(1), seedgen(2), seedgen(3)]
const getRand = sfc32(seeds[0], seeds[1], seeds[2], seeds[3]);
for (let i = 0; i < 10; i++) console.log(getRand());