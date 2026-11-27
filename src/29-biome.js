
const COL0 = Object.assign({}, COL);
const BIOMES = [
  {
    key: 'ashen', name: 'Ashen Pass', col: {},
    strata: [0x8f8474, 0x3c3f4c, 0x66564a, 0x767a86, 0x70503f, 0x4c4f5c, 0x9a8e7c, 0x55483e],
    hemi: [0x6d83bd, 0x1c1f2a, 1.15], moon: [0xa9c0f6, 1.55], fill: [0x4a5f96, .3], moonPos: [14, 44, -34],
    clear: [.0035, .005, .011], mistAmb: [.05, .08, .14], mist: [-.3, .42, .75, .1], sky: [.012, .022, .045], lift: [.010, .016, .030], sat: .92, expo: 1, sprAmb: [.05, .065, .1],
    cover: [0, .55, .3, .5], coverCol: [1, 1, 1], coverP: [.7, .6, 0, 0],
    wat: [0, 1, 1, 0], watA: [.012, .02, .03], watB: [.3, .4, .5], fall: [0, 1, 1, 0], fallA: [.022, .034, .054], fallB: [.2, .27, .38], spray: 'water',
    relief: [1.7, .5, 1, 0], puddles: 11, ponds: 1, sway: 1, wind: 1,
    wx: { n: [.05, 0], velA: [.35, -.12, .18], swayA: [.5, .5], sizeA: [.03, .055], colA: [.75, .8, .95, 1], alA: [.5, 0, 0], yA: [-1, 9], velB: [0, 0, 0], swayB: [0, 0], sizeB: [.05, .05], colB: [1, 1, 1, 1], alB: [0, 0, 0], yB: [0, 1], amb: [.1, .14, .22] },
    mobs: { ghoul: 1.6, wraith: 1.6, necro: 1.5, thief: .8 }, early: { wraith: 3, necro: 5 }, boss: ['giant', 'ogre'], tints: { wisp: [.75, .6, 1.3] }, wispHex: 0xb090ff,
    trees: [['tree', 13, 2.6, 4.6]], stumps: 6, rocks: 70, tufts: 320, webs: 4,
  },
  {
    key: 'frost', name: 'Frostfall',
    col: { stone: 0x6f7b90, stoneD: 0x454e60, stoneL: 0x9aa7b8, earth: 0x4b4a50, earthD: 0x2f3038, grass: 0x5a6068, grassD: 0x40454e, moss: 0x55606a, road: 0x7a808c, roadD: 0x555a66, mud: 0x3a3e48, bark: 0x2e2a2a, tuftA: 0x6f7a80, tuftB: 0xa9b4bc, leaf: 0x1d382f, leafL: 0x2c4f42 },
    strata: [0x7d8aa0, 0x3a4254, 0x5d6678, 0x9fb4c8, 0x4b5468, 0x6a7890, 0xb8cadb, 0x475062],
    hemi: [0x86a8e0, 0x323c50, 1.1], moon: [0xc6dcff, 1.38], fill: [0x5f7fb4, .28], moonPos: [16, 42, -34],
    clear: [.0045, .0075, .015], mistAmb: [.1, .14, .21], mist: [-.3, .5, .7, .12], sky: [.03, .05, .085], lift: [.012, .02, .036], sat: .9, expo: .86, sprAmb: [.1, .125, .17],
    cover: [1, .5, .34, .8], coverCol: [.5, .56, .66], coverP: [.74, .85, .32, 0],
    wat: [1, 0, .3, .35], watA: [.03, .075, .12], watB: [.4, .48, .58], fall: [1, 0, .96, 0], fallA: [.1, .17, .27], fallB: [.46, .58, .72], spray: 'none',
    relief: [1.5, .4, 1.15, 0], puddles: 8, ponds: 2, sway: .8, wind: 1.25, beacon: .8,
    wx: { n: [.68, .16], velA: [.55, -1.5, .3], swayA: [.28, 1.1], sizeA: [.055, .1], colA: [1, 1.05, 1.15, 1], alA: [.95, 0, .12], yA: [-3, 15], velB: [2.6, -1.1, 1.3], swayB: [.5, 1.6], sizeB: [.035, .06], colB: [.95, 1, 1.1, 1], alB: [.6, 0, .5], yB: [-2, 9], amb: [.4, .48, .62] },
    mobs: { wolf: 2.4, golem: 1.8, wraith: 1.3, toad: 0, wisp: .5, slime: .6, warden: 2.2 }, early: { wolf: 2, golem: 6 }, boss: ['jotun'], tints: { wolf: [1.9, 2.0, 2.2], golem: [.8, 1.05, 1.5], wisp: [.5, .9, 1.5], gargoyle: [.9, 1.1, 1.4], toad: [.8, 1.1, 1.4], brute: [1.3, 1.25, 3.0] }, wispHex: 0x80c0ff,
    trees: [['pine', 17, 2.8, 5.4], ['tree', 4, 2.6, 4.2]], stumps: 4, rocks: 52, tufts: 110, webs: 0,
  },
  {
    key: 'fen', name: 'Mirefen',
    col: { stone: 0x5c6858, stoneD: 0x384234, stoneL: 0x84907a, earth: 0x3b3a28, earthD: 0x24261a, grass: 0x40582c, grassD: 0x2c3e22, moss: 0x4c682e, road: 0x6c6a56, roadD: 0x48483a, mud: 0x2a281c, bark: 0x2c2820, tuftA: 0x486a30, tuftB: 0x7a8a40, leaf: 0x2a4626, leafL: 0x4c6c34 },
    strata: [0x5a5a40, 0x2c3226, 0x4a4030, 0x66705a, 0x3a3020, 0x44503a, 0x777a5c, 0x33382a],
    hemi: [0x4f9482, 0x1a2218, 1.05], moon: [0xa6e6c4, 1.3], fill: [0x2f6f66, .3], moonPos: [10, 46, -32],
    clear: [.003, .007, .006], mistAmb: [.035, .1, .075], mist: [-.1, .62, 1.1, .12], sky: [.018, .05, .036], lift: [.008, .02, .016], sat: .94, expo: 1.02, sprAmb: [.04, .08, .065],
    cover: [.85, .8, 1.1, .55], coverCol: [.075, .125, .05], coverP: [.92, .3, .4, 0],
    wat: [3, .3, .55, 0], watA: [.012, .026, .012], watB: [.1, .2, .045], fall: [0, .8, .9, 0], fallA: [.016, .034, .018], fallB: [.17, .27, .18], spray: 'water',
    relief: [1.0, .3, .7, 0], puddles: 15, ponds: 4, sway: .6, wind: .7,
    wx: { n: [.045, .09], velA: [.12, .02, .08], swayA: [1.3, .45], sizeA: [.05, .085], colA: [1.3, 1.9, .4, 0], alA: [1, 1.3, 0], yA: [.3, 3.4], velB: [.2, -.07, .12], swayB: [.6, .4], sizeB: [.03, .05], colB: [.7, .95, .7, 1], alB: [.5, 0, 0], yB: [-1, 7], amb: [.09, .2, .15] },
    mobs: { toad: 3.5, wisp: 2.4, spider: 2, brood: 2, slime: 1.6, mummy: 0, bomber: .5, hag: 2.2 }, early: { toad: 2, wisp: 3, brood: 6 }, boss: ['queen'], tints: { golem: [.75, 1.0, .6], wisp: [.5, 1.4, .7], wolf: [.7, .75, .6], gargoyle: [.8, 1, .8] }, wispHex: 0x70ffa0,
    trees: [['willow', 9, 3.0, 4.6], ['tree', 5, 2.6, 4.4]], stumps: 8, rocks: 42, tufts: 420, webs: 3,
  },
  {
    key: 'ember', name: 'Emberscar',
    col: { stone: 0x403c42, stoneD: 0x242228, stoneL: 0x5e5a62, earth: 0x2e2728, earthD: 0x1c1819, grass: 0x3a2f2c, grassD: 0x261e1c, moss: 0x3a3230, road: 0x5e5652, roadD: 0x3c3634, mud: 0x1e1716, bark: 0x15110f, tuftA: 0x3a2c24, tuftB: 0x6a4a30 },
    strata: [0x3a363c, 0x1c1a20, 0x5a2a22, 0x2a262c, 0x6e3a24, 0x242026, 0x4a4650, 0x301a18],
    hemi: [0x5c5470, 0x2c140e, 1.18], moon: [0xc0b0d0, 1.32], fill: [0xd04a20, .2], moonPos: [18, 40, -32],
    clear: [.008, .004, .006], mistAmb: [.09, .05, .05], mist: [-.3, .5, .9, .1], sky: [.02, .006, .002], lift: [.02, .011, .012], sat: .96, expo: 1, sprAmb: [.09, .05, .04],
    cover: [.8, .74, 1.0, .6], coverCol: [.1, .092, .1], coverP: [.97, .4, .4, 0],
    wat: [2, 1, 1.5, .5], watA: [.22, .02, 0], watB: [.03, .026, .03], fall: [2, .45, 1.2, 0], fallA: [2.1, .56, .07], fallB: [.2, .02, .008], spray: 'lava',
    relief: [1.9, .7, 1.1, 0], puddles: 0, ponds: 2, sway: .7, wind: .9, bankGlow: 1, vein: 1,
    wx: { n: [.26, .12], velA: [.3, -.42, .16], swayA: [.5, .7], sizeA: [.035, .07], colA: [.3, .28, .3, 1], alA: [.85, 0, 0], yA: [-3, 14], velB: [.2, .85, .12], swayB: [.7, .9], sizeB: [.03, .05], colB: [2.6, .9, .14, 0], alB: [1, 2.2, .3], yB: [-2, 10], amb: [.5, .3, .26] },
    mobs: { bomber: 2.4, gargoyle: 2, golem: 1.8, toad: 0, slime: .5, wisp: 1.4, drake: 2.4 }, early: { bomber: 2, gargoyle: 4, golem: 6 }, boss: ['colossus'], tints: { golem: [1.5, .5, .26], wolf: [.75, .45, .4], wisp: [1.5, .6, .2], gargoyle: [1.2, .7, .6], toad: [1.2, .7, .5] }, wispHex: 0xff8030,
    trees: [['charred', 11, 2.6, 4.4]], stumps: 4, rocks: 80, tufts: 40, webs: 0,
  },
  {
    key: 'dunes', name: 'Duskmesa',
    col: { stone: 0xb08e6c, stoneD: 0x7a5c48, stoneL: 0xd4b48c, earth: 0xa88c66, earthD: 0x7c6448, grass: 0xbca27a, grassD: 0x927856, moss: 0x7a7444, road: 0xa89478, roadD: 0x786652, mud: 0x64503a, bark: 0x4c3a28, tuftA: 0x8a8048, tuftB: 0xc0a860, leaf: 0x38582e, leafL: 0x66863e },
    strata: [0xb8845c, 0x8e5a40, 0xd6b080, 0x744a38, 0xc89866, 0x9c6a4c, 0xe4cca0, 0x805640],
    hemi: [0x6a6fc0, 0x3c3040, 1.1], moon: [0xd6c8ff, 1.5], fill: [0x2f8f9a, .34], moonPos: [26, 24, -36],
    clear: [.006, .005, .014], mistAmb: [.07, .07, .13], mist: [-.3, .4, .5, .1], sky: [.03, .03, .06], lift: [.014, .012, .03], sat: .95, expo: .9, sprAmb: [.08, .075, .11],
    cover: [.9, .76, .9, .6], coverCol: [.42, .33, .22], coverP: [.95, .5, .25, .05],
    wat: [0, 1, 1, 0], watA: [.008, .04, .045], watB: [.3, .4, .4], fall: [0, 1, 1, 0], fallA: [.02, .06, .07], fallB: [.24, .36, .38], spray: 'water',
    relief: [1.4, .25, .8, .55], puddles: 0, ponds: 2, sway: 1.3, wind: 1.2, beacon: .62,
    wx: { n: [.1, .22], velA: [.5, -.05, .25], swayA: [.6, .5], sizeA: [.03, .05], colA: [.95, .78, .6, 1], alA: [.5, 0, 0], yA: [-1, 8], velB: [4.2, -.1, 1.9], swayB: [.25, 1.2], sizeB: [.025, .045], colB: [.9, .72, .55, 1], alB: [.42, 0, .9], yB: [-.5, 4.5], amb: [.3, .22, .3] },
    mobs: { mummy: 3, scarab: 2.4, spider: .6, bomber: 1.3, ghoul: 1.3, toad: 0, slime: .4, thief: 2.4 }, early: { mummy: 4, scarab: 2 }, boss: ['king'], tints: { golem: [1.5, 1.1, .72], wolf: [1.5, 1.2, .8], wisp: [1.4, 1.0, .4], gargoyle: [1.5, 1.2, .9], toad: [1.3, 1.1, .7] }, wispHex: 0xffc060,
    trees: [['palm', 9, 3.0, 4.6], ['tree', 2, 2.4, 3.4]], stumps: 2, rocks: 44, tufts: 150, webs: 0,
  },
  // The second campaign (campaign: 'deep'). Its lands never join the first campaign's cycle.
  {
    key: 'salt', name: 'Saltreach', campaign: 'deep', roads: ['switchback', 'ring', 'horseshoe'],
    col: { stone: 0x4e5a5a, stoneD: 0x2c3434, stoneL: 0x74827e, earth: 0x2e2e2c, earthD: 0x1c1d1c, grass: 0x4a5442, grassD: 0x323a30, moss: 0x3a5446, road: 0x6c6c66, roadD: 0x48484a, mud: 0x1e2224, bark: 0x6a6258, tuftA: 0x5a6448, tuftB: 0x8a8a60, leaf: 0x243a30, leafL: 0x3a5644 },
    strata: [0x3a4242, 0x252a2c, 0x56605c, 0x2e3434, 0x6a6a5e, 0x343c3a, 0x7a7e72, 0x2a3030],
    hemi: [0x58a0a0, 0x141e1e, 1.1], moon: [0xbfe6e2, 1.4], fill: [0x2f7f7a, .32], moonPos: [12, 44, -34],
    clear: [.003, .009, .01], mistAmb: [.05, .11, .11], mist: [-.2, .6, 1.25, .14], sky: [.016, .04, .045], lift: [.008, .02, .022], sat: .9, expo: 1.0, sprAmb: [.05, .09, .09],
    cover: [.6, .7, 1.0, .5], coverCol: [.06, .1, .075], coverP: [.9, .4, .4, 0],
    wat: [0, 1.3, 1.2, 0], watA: [.008, .032, .036], watB: [.22, .42, .42], fall: [0, 1.2, 1, 0], fallA: [.02, .05, .055], fallB: [.24, .4, .4], spray: 'water',
    relief: [1.3, .35, 1.0, .25], puddles: 16, ponds: 4, sway: 1.3, wind: 1.35,
    wx: { n: [.5, .08], velA: [.9, -11, .4], swayA: [.05, .3], sizeA: [.01, .018], colA: [.7, .86, .9, 1], alA: [.42, 0, 1.6], yA: [-2, 14], velB: [1.4, .12, .7], swayB: [.6, .5], sizeB: [.07, .12], colB: [.55, .75, .75, 1], alB: [.12, 0, 0], yB: [-.5, 3.5], amb: [.16, .26, .26] },
    mobs: { toad: 2.2, slime: 2.0, wraith: 1.8, skel: 1.4, knight: 1.2, bat: .8, wolf: .3, mummy: .2, scarab: 0, golem: .5, spider: .4, brood: .3 }, early: { toad: 2, wraith: 3 }, boss: ['admiral'],
    tints: { skel: [.6, .86, .78], knight: [.55, .78, .76], slime: [.4, 1.05, .95], slimelet: [.4, 1.05, .95], toad: [.66, 1.0, .92], wisp: [.5, 1.2, 1.2], golem: [.7, .9, .85], gargoyle: [.75, .9, .9] }, wispHex: 0x70e0e0,
    trees: [['driftwood', 9, 2.0, 3.4]], stumps: 3, rocks: 72, tufts: 260, webs: 0,
  },
  {
    key: 'glim', name: 'Glimmerdeep', campaign: 'deep', roads: ['ring', 'horseshoe', 'switchback'],
    col: { stone: 0x464256, stoneD: 0x26232f, stoneL: 0x66607a, earth: 0x2c2a34, earthD: 0x1a1920, grass: 0x2c3a40, grassD: 0x1e282c, moss: 0x2c4a4c, road: 0x5c5a68, roadD: 0x3c3a46, mud: 0x1a1920, bark: 0x2a2630, tuftA: 0x2a4a54, tuftB: 0x4a6a78, leaf: 0x2a3a4a, leafL: 0x3a5a6a },
    strata: [0x3a3648, 0x201e28, 0x4e4462, 0x2a2834, 0x5a4e6e, 0x302c3c, 0x6a6080, 0x24222c],
    hemi: [0x6a58a8, 0x120e18, .82], moon: [0xa898e0, .95], fill: [0x6a40b0, .26], moonPos: [6, 50, -14],
    clear: [.002, .0015, .005], mistAmb: [.06, .035, .1], mist: [-.3, .55, .95, .12], sky: [.008, .005, .02], lift: [.012, .008, .022], sat: 1.04, expo: 1.06, sprAmb: [.06, .05, .1],
    cover: [0, .55, .3, .5], coverCol: [1, 1, 1], coverP: [.7, .6, 0, 0],
    wat: [0, .5, .8, 0], watA: [.01, .05, .075], watB: [.25, .6, .85], fall: [0, .9, 1, 0], fallA: [.04, .1, .14], fallB: [.35, .7, .9], spray: 'water',
    relief: [1.6, .6, 1.3, 0], puddles: 5, ponds: 2, sway: .3, wind: .2, beacon: .92,
    wx: { n: [.07, .05], velA: [.05, .14, .04], swayA: [.8, .4], sizeA: [.03, .06], colA: [.6, 1.3, 2.2, 0], alA: [.9, 1.1, 0], yA: [.2, 5], velB: [-.05, .1, .06], swayB: [.9, .35], sizeB: [.03, .055], colB: [2.0, .6, 1.8, 0], alB: [.8, .9, 0], yB: [.2, 6], amb: [.12, .1, .22] },
    mobs: { spider: 2.4, golem: 1.8, bat: 2.0, scarab: 1.6, wisp: 1.8, brood: 1.2, gargoyle: 1.2, toad: 0, mummy: 0, wolf: .4, slime: .5 }, early: { spider: 2, bat: 2, golem: 6 }, boss: ['wyrm'],
    tints: { golem: [.85, .75, 1.6], bat: [.8, .7, 1.25], spider: [.7, .62, 1.15], wisp: [1.2, .6, 1.6], scarab: [.8, .9, 1.7], gargoyle: [.9, .8, 1.4], brood: [.75, .6, 1.2] }, wispHex: 0xc080ff,
    trees: [], stumps: 0, rocks: 96, tufts: 70, webs: 0,
  },
  {
    key: 'holl', name: 'Hollowmere', campaign: 'deep', roads: ['ring', 'switchback', 'horseshoe'],
    col: { stone: 0x5a5e6a, stoneD: 0x34363f, stoneL: 0x80848f, earth: 0x2c2a2c, earthD: 0x1a191b, grass: 0x3a3e34, grassD: 0x282c24, moss: 0x3a4436, road: 0x6e6c6a, roadD: 0x4a4846, mud: 0x222024, bark: 0x2a2420, tuftA: 0x4a4a3a, tuftB: 0x6a6248, leaf: 0x5a3a1a, leafL: 0x8a5a22 },
    strata: [0x4a4e58, 0x2a2c34, 0x60646e, 0x383a42, 0x6e7078, 0x30323a, 0x7a7e88, 0x2c2e36],
    hemi: [0x7c8cc8, 0x1a1c26, 1.05], moon: [0xd8e2ff, 1.8], fill: [0x5068a8, .3], moonPos: [-12, 40, -32],
    clear: [.004, .006, .014], mistAmb: [.06, .07, .12], mist: [-.3, .5, .85, .12], sky: [.02, .025, .05], lift: [.012, .014, .03], sat: .82, expo: 1.0, sprAmb: [.06, .07, .1],
    cover: [.3, .6, 1.0, .5], coverCol: [.13, .09, .06], coverP: [.9, .45, .4, 0],
    wat: [0, 1, 1, 0], watA: [.01, .015, .03], watB: [.25, .3, .42], fall: [0, 1, 1, 0], fallA: [.022, .03, .05], fallB: [.2, .25, .35], spray: 'water',
    relief: [1.2, .35, .9, 0], puddles: 14, ponds: 1, sway: .8, wind: .9,
    wx: { n: [.12, .05], velA: [.5, -.7, .3], swayA: [.9, .9], sizeA: [.04, .07], colA: [.7, .38, .12, 1], alA: [.9, 0, 0], yA: [-1, 9], velB: [.2, -.2, .1], swayB: [.4, .3], sizeB: [.02, .035], colB: [.6, .6, .65, 1], alB: [.3, 0, 0], yB: [-1, 8], amb: [.18, .18, .26] },
    mobs: { skel: 1.6, knight: 1.6, wraith: 1.6, necro: 1.8, ghoul: 1.6, mummy: .6, drummer: 1.3, bat: 1.0, toad: 0, scarab: 0, slime: .4, hag: 1.0, thief: .8, spider: .5 }, early: { necro: 4, knight: 3, wraith: 3 }, boss: ['lich'],
    tints: { skel: [.85, .88, 1.0], ghoul: [.9, .95, 1.25], wisp: [.7, .8, 1.4], golem: [.8, .85, 1.0], gargoyle: [.8, .85, 1.0] }, wispHex: 0x9fb8ff,
    trees: [['tree', 9, 2.6, 4.4]], stumps: 4, rocks: 50, tufts: 200, webs: 3,
  },
  {
    key: 'storm', name: 'Stormcrown', campaign: 'deep', roads: ['horseshoe', 'ring', 'switchback'],
    col: { stone: 0x6a6e78, stoneD: 0x3a3e48, stoneL: 0x9aa0aa, earth: 0x3a3a36, earthD: 0x24241f, grass: 0x4a5a3a, grassD: 0x34402a, moss: 0x4a5a44, road: 0x7a7870, roadD: 0x56544c, mud: 0x2c2c28, bark: 0x3a2e26, tuftA: 0x6a7448, tuftB: 0x9a9a68, leaf: 0x22382c, leafL: 0x34503c },
    strata: [0x6a6e78, 0x3a3e48, 0x80848e, 0x4a4e58, 0x9098a2, 0x44484f, 0xaab0b8, 0x50545c],
    hemi: [0x8aa0c8, 0x24282e, 1.15], moon: [0xc8d4f0, 1.25], fill: [0x6a7ab0, .32], moonPos: [10, 46, -30],
    clear: [.02, .026, .036], mistAmb: [.12, .14, .18], mist: [-.4, .55, .7, .12], sky: [.05, .06, .08], lift: [.02, .024, .03], sat: .8, expo: .95, sprAmb: [.1, .11, .14],
    cover: [.28, .5, .34, .8], coverCol: [.42, .45, .5], coverP: [.78, .85, .32, 0],
    wat: [0, 1.4, 1.2, 0], watA: [.02, .04, .06], watB: [.35, .45, .55], fall: [0, 1.3, 1, 0], fallA: [.03, .06, .08], fallB: [.35, .45, .55], spray: 'water',
    relief: [2.0, .55, 1.3, 0], puddles: 6, ponds: 1, sway: 1.6, wind: 1.6, beacon: .9,
    wx: { n: [.6, .1], velA: [3.5, -12, 1.5], swayA: [.05, .3], sizeA: [.01, .018], colA: [.75, .8, .9, 1], alA: [.4, 0, 1.6], yA: [-2, 14], velB: [5, .2, 2.2], swayB: [.6, .5], sizeB: [.08, .16], colB: [.7, .75, .8, 1], alB: [.1, 0, .8], yB: [-1, 6], amb: [.3, .32, .4] },
    mobs: { gargoyle: 2.2, bat: 2.0, wisp: 1.6, drake: 1.8, wolf: 1.4, golem: 1.0, knight: .8, toad: 0, mummy: 0, scarab: 0, slime: .4, spider: .5 }, early: { gargoyle: 4, bat: 1, wisp: 3 }, boss: ['roc'],
    tints: { gargoyle: [.85, .9, 1.1], wolf: [1.2, 1.2, 1.3], golem: [.9, .95, 1.1], wisp: [.8, 1.0, 1.6] }, wispHex: 0xa0c8ff,
    trees: [['windpine', 14, 2.6, 4.6]], stumps: 3, rocks: 90, tufts: 160, webs: 0,
  },
];
// Campaigns: lists of lands played in turn. The page picks one with #campaign= (main by default); later they unlock one after another.
const CAMPAIGNS = { main: BIOMES.filter(b => !b.campaign), deep: BIOMES.filter(b => b.campaign === 'deep') };
const CAMPAIGN_NAMES = { main: 'The Cinder Road', deep: 'The Far Reaches' };
const BIOME = { start: 0, list: CAMPAIGNS.main, campaign: 'main' };
// A land with its own road shapes takes the next one on each visit; the first campaign's lands keep the classic road.
function roadShapeFor(bio, index) {
  if (HASH.road && ROAD_SHAPES[HASH.road]) return HASH.road;
  return bio.roads ? bio.roads[Math.floor((BIOME.start + index) / BIOME.list.length) % bio.roads.length] : 'classic';
}
function biomeFor(index) { const L = BIOME.list; return L[((BIOME.start + index) % L.length + L.length) % L.length]; }
function applyBiomePalette(b) { Object.assign(COL, COL0); for (const k in b.col) COL[k] = C(b.col[k]); }

const LOOK = { cur: null, to: null, bio: null };
function lookOf(b) {
  return { hs: C(b.hemi[0]), hg: C(b.hemi[1]), hi: [b.hemi[2]], mc: C(b.moon[0]), mi: [b.moon[1]], fc: C(b.fill[0]), fi: [b.fill[1]], clear: b.clear.slice(), mAmb: b.mistAmb.slice(), mist: b.mist.slice(), sky: b.sky.slice(), lift: b.lift.slice(), grade: [b.sat, b.expo], amb: b.sprAmb.slice(), wamb: b.wx.amb.slice() };
}
const _lc = new THREE.Color();
function applyLook(L) {
  LT.hemi.color.setRGB(L.hs[0], L.hs[1], L.hs[2]); LT.hemi.groundColor.setRGB(L.hg[0], L.hg[1], L.hg[2]); LT.hemi.intensity = L.hi[0];
  LT.moon.color.setRGB(L.mc[0], L.mc[1], L.mc[2]); LT.moon.intensity = L.mi[0]; LT.fill.color.setRGB(L.fc[0], L.fc[1], L.fc[2]); LT.fill.intensity = L.fi[0];
  R.renderer.setClearColor(_lc.setRGB(L.clear[0], L.clear[1], L.clear[2]), 1);
  const a = R.mats.atmo.uniforms, c = R.mats.comp.uniforms;
  a.uMistAmb.value.set(L.mAmb[0], L.mAmb[1], L.mAmb[2]); a.uMist.value.set(L.mist[0], L.mist[1], L.mist[2], L.mist[3]);
  SH.uSky.value.setRGB(L.sky[0], L.sky[1], L.sky[2]); c.uLift.value.set(L.lift[0], L.lift[1], L.lift[2]); c.uGrade.value.y = L.grade[0]; R.exposure = L.grade[1];
  FX.alpha.mesh.material.uniforms.uAmb.value.set(L.amb[0], L.amb[1], L.amb[2]); WX.u.uAmb.value.set(L.wamb[0], L.wamb[1], L.wamb[2]);
}
function setBiomeLook(B, instant) {
  const b = B.bio; LOOK.bio = b; LOOK.to = lookOf(b);
  if (instant || !LOOK.cur) LOOK.cur = lookOf(b);
  SH.uCover.value.fromArray(b.cover); SH.uCoverCol.value.fromArray(b.coverCol); SH.uCoverP.value.fromArray(b.coverP);
  SH.uWat.value.fromArray(b.wat); SH.uWatA.value.fromArray(b.watA); SH.uWatB.value.fromArray(b.watB); SH.uWind.value = b.sway;
  const f = MAT.fall.uniforms; f.uFP.value.fromArray(b.fall); f.uFA.value.fromArray(b.fallA); f.uFB.value.fromArray(b.fallB);
  setWeather(b.wx, instant);
  const m = B.mirrored, p = b.moonPos; LT.moon.position.set(m ? p[2] : p[0], p[1], m ? p[0] : p[2]); LT.moon.target.position.set(0, 0, 0);
  applyLook(LOOK.cur);
}
function updateBiomeLook(dt) {
  if (!LOOK.cur) return;
  const k = 1 - Math.exp(-dt * 1.6), a = LOOK.cur, b = LOOK.to;
  for (const key in a) { const x = a[key], y = b[key]; for (let i = 0; i < x.length; i++) x[i] += (y[i] - x[i]) * k; }
  applyLook(a); WX.fade = Math.min(1, WX.fade + dt * .5); WX.u.uFade.value = WX.fade;
}
