
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