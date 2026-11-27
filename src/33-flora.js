
function ribbon(S, a, b, c, d, col, sw) {
  _sa.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); _sb.set(d[0] - a[0], d[1] - a[1], d[2] - a[2]); _sn.crossVectors(_sa, _sb);
  const l = _sn.length() || 1, nx = _sn.x / l, ny = _sn.y / l, nz = _sn.z / l, P = [a, b, c, d];
  for (const [order, s] of [[[0, 1, 2, 0, 2, 3], 1], [[0, 2, 1, 0, 3, 2], -1]]) for (const k of order) { const p = P[k]; S.v(p[0], p[1], p[2], nx * s, ny * s, nz * s, col[0], col[1], col[2], p[0] * .5, p[1] * .5, L_PLAIN, .8, sw[k], 0); }
}

Object.assign(PROP, {
  pine(S, rng, h) {
    const bark = mulC(COL.bark, .8 + .4 * rng()), lx = rng.range(-.05, .05), lz = rng.range(-.05, .05);
    S.seg([0, -.1, 0], [lx * h, h * .94, lz * h], h * .05, h * .012, bark, { l: L_WOOD, n: 6 });
    const tiers = Math.round(4 + h * .55);
    for (let k = 0; k < tiers; k++) {
      const u = k / (tiers - 1), y = h * (.2 + .66 * u), r = h * (.33 - .23 * u) * rng.range(.88, 1.1), hh = h * (.3 - .11 * u), ph = rng() * TAU;
      const c = mulC(mixC(COL.leaf, COL.leafL, rng() * .6 + u * .25), .8 + .35 * rng());
      S.add(gCyl(9, 0), {
        s: [r, hh, r], p: [lx * y + rng.range(-.03, .03), y + hh * .5, lz * y + rng.range(-.03, .03)], r: [rng.range(-.07, .07), ph, rng.range(-.07, .07)], c, l: L_THATCH, uvs: .5,
        deform: v => { if (v.y < 0) { const j = .8 + .4 * vnoise(Math.atan2(v.z, v.x) * 2.2 + ph, k * 3.1, 5); v.x *= j; v.z *= j; v.y -= hh * .25 * (j - .8); } },
        cf: v => .62 + .38 * sat(Math.hypot(v.x, v.z) / r), swayf: v => .14 * Math.hypot(v.x, v.z) / r * (.4 + u),
      });
    }
  },
  willow(S, rng, h) {
    const bark = mulC(COL.bark, .85 + .3 * rng());
    let p = [0, -.1, 0], d = [rng.range(-.25, .25), 1, rng.range(-.25, .25)], r = h * .085; const tips = [];
    for (let k = 0; k < 4; k++) {
      const l = h * rng.range(.15, .2), q = [p[0] + d[0] * l, p[1] + d[1] * l, p[2] + d[2] * l]; S.seg(p, q, r, r * .8, bark, { l: L_WOOD, n: 6 }); p = q; r *= .8;
      d = [d[0] + rng.range(-.4, .4), 1, d[2] + rng.range(-.4, .4)]; const dl = Math.hypot(d[0], d[1], d[2]); d = d.map(v => v / dl);
    }
    for (let k = 0; k < 4; k++) { const a = rng() * TAU + k * 1.6, len = h * rng.range(.28, .42), q = [p[0] + Math.cos(a) * len * .8, p[1] + len * rng.range(.1, .45), p[2] + Math.sin(a) * len * .8]; S.seg(p, q, r, r * .45, bark, { l: L_WOOD, n: 5, sway: .12 }); tips.push(q); }
    tips.push([p[0], p[1] + h * .08, p[2]]);
    for (const t of tips) for (let j = 0; j < 2; j++) {
      const rb = h * rng.range(.2, .29), c = mulC(mixC(COL.leaf, COL.leafL, rng()), .75 + .4 * rng()), cx = t[0] + rng.range(-.25, .25), cy = t[1] + rng.range(-.05, .3), cz = t[2] + rng.range(-.25, .25);
      S.ico(rb, cx, cy, cz, c, { sc: [1.15, .48, 1.15], d: 1, l: L_THATCH, sway: .2, r: [rng.range(-.2, .2), rng() * TAU, rng.range(-.2, .2)], cf: v => .6 + .4 * sat(v.y / (rb * .5) + .5) });
      for (let s = 0; s < 7; s++) {
        const a = rng() * TAU, rad = rb * rng.range(.45, 1.05), x = cx + Math.cos(a) * rad, z = cz + Math.sin(a) * rad, len = rng.range(.5, 1.5), y0 = cy - rb * .1, wa = rng() * TAU, wx = Math.cos(wa) * .045, wz = Math.sin(wa) * .045, cc = mulC(mixC(COL.leaf, COL.leafL, rng()), .6 + .3 * rng());
        ribbon(S, [x - wx, y0, z - wz], [x + wx, y0, z + wz], [x + wx * .4, y0 - len, z + wz * .4], [x - wx * .4, y0 - len, z - wz * .4], cc, [.2, .2, .95, .95]);
      }
    }
    for (let k = 0; k < 4; k++) { const a = k * 1.57 + rng(); S.seg([Math.cos(a) * h * .04, h * .17, Math.sin(a) * h * .04], [Math.cos(a) * h * .22, -.1, Math.sin(a) * h * .22], h * .03, h * .018, bark, { l: L_WOOD, n: 5 }); }
  },
  charred(S, rng, h) { PROP.tree(S, rng, h, { bark: mulC(COL.bark, .7 + .3 * rng()), tip: [.6, .16, .03], tipEmis: .09 }); },
  palm(S, rng, h) {
    const bark = mulC(C(0x6a5238), .85 + .3 * rng()), a0 = rng() * TAU, bend = rng.range(.1, .3), N = 7;
    let p = [0, -.1, 0];
    for (let k = 0; k < N; k++) { const u = (k + 1) / N, off = bend * h * u * u, q = [Math.cos(a0) * off, h * u, Math.sin(a0) * off], r = h * (.052 - .02 * u); S.seg(p, q, r * (k & 1 ? 1.1 : 1), r * .9, mulC(bark, k & 1 ? .82 : 1.05), { l: L_WOOD, n: 6, sway: u > .6 ? .06 : 0 }); p = q; }
    const top = p, nf = rng.int(8, 10);
    for (let f = 0; f < nf; f++) {
      const a = f / nf * TAU + rng.range(-.25, .25), len = h * rng.range(.34, .46), up = rng.range(.2, .62), c = mulC(mixC(COL.leaf, COL.leafL, rng()), .8 + .4 * rng()), M = 5;
      let prev = null;
      for (let k = 0; k <= M; k++) {
        const u = k / M, out = len * u, y = top[1] + len * (up * u - .95 * u * u), cx = top[0] + Math.cos(a) * out, cz = top[2] + Math.sin(a) * out, w = len * .2 * Math.sin(Math.min(1, u * 1.1 + .1) * PI) + .015, sx = -Math.sin(a) * w, sz = Math.cos(a) * w, sw = .2 + .8 * u;
        const cur = { c: [cx, y, cz], l: [cx + sx, y - w * .6, cz + sz], r: [cx - sx, y - w * .6, cz - sz], sw };
        if (prev) { ribbon(S, prev.c, cur.c, cur.l, prev.l, c, [prev.sw, sw, sw, prev.sw]); ribbon(S, prev.c, prev.r, cur.r, cur.c, mulC(c, .8), [prev.sw, prev.sw, sw, sw]); }
        prev = cur;
      }
    }
    for (let k = 0; k < 3; k++) S.ico(h * .03, top[0] + rng.range(-.12, .12), top[1] - .1, top[2] + rng.range(-.12, .12), C(0x3a2a1c), { d: 0 });
  },
  cactus(S, rng) {
    const c = mulC(C(0x4f6a3c), .8 + .3 * rng()), hh = rng.range(1.0, 1.9), r = .17;
    S.cyl(r, hh, 0, hh / 2 - .05, 0, c, { n: 7 }); S.sph(r, 0, hh - .05, 0, c, { sc: [1, .8, 1], w: 7, h: 4 });
    for (let k = 0, n = rng.int(0, 3); k < n; k++) {
      const a = rng() * TAU, y = hh * rng.range(.35, .6), l = rng.range(.26, .4), up = rng.range(.3, .7), x = Math.cos(a) * l, z = Math.sin(a) * l;
      S.seg([0, y, 0], [x, y + .04, z], r * .62, r * .62, c, { n: 6 }); S.seg([x, y, z], [x, y + up, z], r * .62, r * .58, c, { n: 6 }); S.sph(r * .6, x, y + up, z, c, { w: 6, h: 4 });
    }
    if (rng() < .4) S.ico(.06, 0, hh + .1, 0, C(0xe86a8a), { d: 0, emis: .03 });
  },
  reeds(S, rng) {
    for (let k = 0, n = rng.int(5, 9); k < n; k++) {
      const x = rng.range(-.3, .3), z = rng.range(-.3, .3), hh = rng.range(.6, 1.35), lx = rng.range(-.18, .18), lz = rng.range(-.18, .18), c = mulC(mixC(COL.tuftA, COL.tuftB, rng()), .8 + .4 * rng());
      S.seg([x, -.08, z], [x + lx * .4, hh * .5, z + lz * .4], .022, .018, c, { n: 3, jit: 0 });
      S.seg([x + lx * .4, hh * .5, z + lz * .4], [x + lx, hh, z + lz], .018, .008, c, { n: 3, sway: .5, jit: 0 });
      if (rng() < .45) S.seg([x + lx * .8, hh * .8, z + lz * .8], [x + lx * 1.02, hh * 1.02, z + lz * 1.02], .042, .038, C(0x4a3220), { n: 5, sway: .5 });
    }
  },
  lily(S, rng) {
    for (let k = 0, n = rng.int(2, 4); k < n; k++) {
      const x = rng.range(-.4, .4), z = rng.range(-.4, .4), r = rng.range(.13, .26);
      S.cyl(r, .012, x, .006, z, mulC(mixC(COL.leaf, COL.leafL, rng()), 1.1 + .4 * rng()), { n: 7, jit: .05, r: [0, rng() * TAU, 0] });
      if (rng() < .3) S.ico(.05, x + r * .3, .05, z, C(0xe8c8d8), { d: 0, emis: .03, sc: [1, .7, 1] });
    }
  },
  shroom(S, rng) {
    const col = rng() < .5 ? C(0x4fe0c0) : C(0x7fd0ff);
    for (let k = 0, n = rng.int(3, 6); k < n; k++) {
      const x = rng.range(-.3, .3), z = rng.range(-.3, .3), hh = rng.range(.14, .44), r = hh * rng.range(.45, .7);
      S.cyl(r * .22, hh, x, hh / 2, z, C(0xb8c8b8), { n: 5, emis: .02 });
      S.add(gDome(7, 3), { s: [r, r * .7, r], p: [x, hh - r * .1, z], c: mulC(col, .5), emis: .075, jit: .1, smooth: true });
    }
  },
  log(S, rng) {
    const len = rng.range(1.5, 2.6), r = rng.range(.14, .2), bark = mulC(COL.bark, .9 + .4 * rng());
    S.seg([-len / 2, r * .8, 0], [len / 2, r * .9, 0], r, r * .85, bark, { l: L_WOOD, n: 7 });
    for (const s of [-1, 1]) S.cyl(r * (s < 0 ? .98 : .83), .02, s * len / 2, r * (s < 0 ? .8 : .9), 0, mulC(COL.woodL, .7), { n: 7, l: L_WOOD, r: [0, 0, HPI] });
    for (let k = 0; k < 2; k++) { const x = rng.range(-len * .3, len * .3), a = rng.range(-1, 1); S.seg([x, r, 0], [x + rng.range(-.15, .15), r + .35 * Math.cos(a), .35 * Math.sin(a)], r * .35, r * .2, bark, { l: L_WOOD, n: 5 }); }
  },
  basalt(S, rng) {
    const n = rng.int(5, 10), R = .3, G = [[0, 0], [1, 0], [-1, 0], [.5, .87], [-.5, .87], [.5, -.87], [-.5, -.87], [1.5, .87], [-1.5, -.87], [0, 1.73]];
    for (let k = 0; k < n; k++) {
      const q = G[k], hh = rng.range(.35, 2.2) * (k < 3 ? 1.25 : .8), c = mulC(mixC(COL.stoneD, COL.stone, rng() * .7), .8 + .3 * rng());
      S.cyl(R * 1.04, hh, q[0] * R * 1.75, hh / 2 - .1, q[1] * R * 1.75, c, { n: 6, l: L_ROCK, r: [0, PI / 6, 0], grad: [-hh / 2, hh * .1, .65] });
      S.cyl(R * .9, .05, q[0] * R * 1.75, hh - .08, q[1] * R * 1.75, mulC(c, 1.3), { n: 6, l: L_ROCK, r: [0, PI / 6, 0] });
    }
  },
  spire(S, rng, hh, cols) {
    let y = 0, r = hh * rng.range(.2, .28), x = 0, z = 0, k = rng.int(0, 3);
    while (y < hh && r > .12) { S.rock(r, x, y + r * .4, z, mulC(cols[k % cols.length], .8 + .3 * rng()), { sq: .62, d: 1 }); y += r * .78; r *= rng.range(.8, .93); x += rng.range(-.08, .08); z += rng.range(-.08, .08); k++; }
  },
  vent(S, rng) {
    for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + rng() * .3, r = rng.range(.2, .34); S.rock(r, Math.cos(a) * .52, r * .3, Math.sin(a) * .52, mulC(mixC(COL.stoneD, COL.stone, rng()), .8), { sq: .8 }); }
    S.cyl(.4, .06, 0, .09, 0, [.8, .22, .03], { n: 8, emis: .3, jit: 0 });
  },
  jar(S, rng) {
    const c = mulC(C(0x9a5a3c), .8 + .35 * rng()), s = rng.range(.8, 1.25);
    S.cyl(.2 * s, .22 * s, 0, .11 * s, 0, c, { n: 8, rt: .62 }); S.cyl(.2 * s, .2 * s, 0, .32 * s, 0, c, { n: 8, rt: 1.0 }); S.cyl(.2 * s, .14 * s, 0, .49 * s, 0, c, { n: 8, rt: 2.0 });
    S.cyl(.09 * s, .1 * s, 0, .6 * s, 0, mulC(c, .9), { n: 8, rt: 1.25 }); S.cyl(.105 * s, .02 * s, 0, .655 * s, 0, COL.black, { n: 8, jit: 0 });
  },
  icicles(S, rng, len, n, maxH) {
    for (let k = 0; k < n; k++) { const x = (k + .5) / n * len - len / 2 + rng.range(-.05, .05), h = rng.range(.15, maxH) * (rng() < .2 ? 1.5 : 1); S.cone(.04 + .035 * rng(), h, x, -h / 2, rng.range(-.04, .04), COL.ice, { n: 5, r: [PI, 0, 0], rough: .14, emis: .012, jit: .1 }); }
  },
  drift(S, rng, r, col) { S.ico(r, 0, r * .04, 0, col, { sc: [1.25, .3, .85], d: 2, smooth: true, rough: .75, jit: .03 }); },
  crystal(S, rng, col, emis) {
    for (let k = 0, n = rng.int(3, 6); k < n; k++) { const hh = rng.range(.3, .9) * (k ? .7 : 1.25), a = rng() * TAU, d = k ? rng.range(.12, .32) : 0; S.add(gOct(), { s: [hh * .22, hh, hh * .22], p: [Math.cos(a) * d, hh * .5, Math.sin(a) * d], r: [rng.range(-.4, .4), rng() * TAU, rng.range(-.4, .4)], c: mulC(col, .8 + .4 * rng()), rough: .12, emis }); }
  },
});

// Saltreach and Glimmerdeep props
Object.assign(PROP, {
  driftwood(S, rng, h) { PROP.tree(S, rng, h, { bark: mulC(C(0x8c867c), .7 + .35 * rng()) }); },
  wreck(S, rng) {
    const wd = mulC(C(0x5c5248), .75 + .3 * rng()), dk = mulC(wd, .7), L = rng.range(3.4, 4.6), lean = rng.range(-.25, .25);
    S.seg([-L / 2, .02, 0], [L / 2, .3, 0], .15, .12, dk, { l: L_WOOD, n: 6 });
    for (let k = 0; k < 7; k++) {
      const x = -L / 2 + .3 + k * (L - .6) / 6, R = (.75 + .45 * Math.sin(k / 6 * PI)) * rng.range(.75, 1.05);
      for (const sd of [-1, 1]) {
        if (rng() < .22) continue; const N = 5, stop = rng() < .4 ? rng.int(2, 4) : N; let p = [x, .1, 0];
        for (let j = 1; j <= stop; j++) { const a = j / N * 1.95, q = [x + lean * Math.sin(a) * .3, .1 + R * (1 - Math.cos(a)) * 1.15, sd * R * Math.sin(a)]; S.seg(p, q, .065, .055, j > 3 ? dk : wd, { l: L_WOOD, n: 5 }); p = q; }
      }
    }
    for (let k = 0; k < 5; k++) { const x = rng.range(-L / 2 + .4, L / 2 - .4), y = rng.range(.2, .7); S.box(rng.range(.6, 1.3), .05, .2, x, y, -(.55 + y * .4), mulC(wd, .9 + .2 * rng()), { l: L_WOOD, r: [rng.range(-.5, -.2), 0, rng.range(-.15, .15)] }); }
    const mx = rng.range(-.6, .6); S.seg([mx, .2, 0], [mx + 1.3, 2.7, .5], .09, .07, dk, { l: L_WOOD, n: 6 }); S.seg([mx + .75, 1.6, -.55], [mx + .95, 1.75, 1.15], .045, .04, dk, { l: L_WOOD, n: 4 });
    for (let k = 0; k < 6; k++) S.rock(rng.range(.15, .3), rng.range(-L / 2, L / 2), .02, rng.range(-1, 1), mixC(COL.stoneD, COL.stone, rng()), { sq: .5 });
  },
  seawall(S, rng, len) {
    const n = Math.max(2, Math.round(len / .72)), moss = C(0x3c5a44);
    for (let k = 0; k < n; k++) {
      const x = (k - (n - 1) / 2) * .72, c = mulC(mixC(COL.stoneD, COL.stone, rng()), .9 + .2 * rng());
      if (rng() < .16) { S.box(.62, .5, .66, x + rng.range(-.2, .2), .2, rng.range(.5, .9), c, { l: L_ROCK, jit: .05, r: [rng.range(-.5, .5), rng(), rng.range(-.4, .4)] }); continue; }
      const h = rng.range(.65, 1.35); S.box(.68, h, .74, x, h / 2 - .15, 0, c, { l: L_ROCK, jit: .04 });
      S.box(.7, .07, .76, x, h - .13, 0, mulC(moss, .8 + .4 * rng()), { l: L_PLAIN, jit: .03 });
      if (rng() < .5) for (let b = 0; b < 4; b++) S.ico(.035, x + rng.range(-.3, .3), rng.range(.05, .4), .38, C(0xb8b4a4), { d: 0, jit: .1 });
    }
  },
  piles(S, rng, len) {
    for (let x = -len / 2; x <= len / 2; x += rng.range(.45, .7)) { const h = rng.range(.4, 1.3), c = mulC(C(0x5a5046), .7 + .35 * rng()); S.cyl(.09, h, x, h / 2 - .2, rng.range(-.08, .08), c, { n: 6, l: L_WOOD, r: [rng.range(-.15, .15), 0, rng.range(-.15, .15)] }); S.cyl(.1, .1, x, rng.range(.05, .3), 0, C(0x2c4a3c), { n: 6 }); }
  },
  lighthouse(S, rng) {
    const w = C(0xcfc8b8), r = C(0x8a3a32), base = mulC(COL.stoneD, 1.1), N = 6, H0 = .9;
    for (let k = 0; k < 7; k++) { const a = k / 7 * TAU; S.rock(rng.range(.45, .7), Math.cos(a) * 1.1, .1, Math.sin(a) * 1.1, mixC(COL.stoneD, COL.stone, rng()), { sq: .7 }); }
    S.cyl(1.0, H0, 0, H0 / 2 - .1, 0, base, { n: 10, l: L_ROCK, rt: .9 });
    for (let k = 0; k < N; k++) { const y0 = H0 + k * .62, rb = .78 - k * .07, rt = .78 - (k + 1) * .07; S.cyl(rb, .62, 0, y0 + .31, 0, k & 1 ? r : w, { n: 10, l: L_PLAIN, rt: rt / rb, rough: .7 }); }
    const yt = H0 + N * .62; S.cyl(.62, .08, 0, yt + .04, 0, COL.iron, { n: 12, l: L_METAL });
    for (let k = 0; k < 10; k++) { const a = k / 10 * TAU; S.seg([Math.cos(a) * .58, yt + .08, Math.sin(a) * .58], [Math.cos(a) * .58, yt + .38, Math.sin(a) * .58], .015, .015, COL.iron, { l: L_METAL, n: 3 }); }
    S.cyl(.36, .55, 0, yt + .36, 0, C(0xffe0a0), { n: 8, emis: .55, jit: 0 });
    for (let k = 0; k < 4; k++) { const a = k / 4 * TAU + .4; S.box(.05, .55, .05, Math.cos(a) * .37, yt + .36, Math.sin(a) * .37, COL.iron, { l: L_METAL }); }
    S.cone(.48, .42, 0, yt + .85, 0, r, { n: 8, l: L_METAL }); S.ico(.07, 0, yt + 1.1, 0, COL.iron, { d: 0 });
    return yt + .38;
  },
  bigCrystal(S, rng, col) {
    let top = 0;
    for (let k = 0, n = rng.int(4, 7); k < n; k++) {
      const hh = rng.range(.7, 1.5) * (k ? .7 : 1.25), a = rng() * TAU, d = k ? rng.range(.2, .55) : 0, tilt = k ? rng.range(.15, .5) : rng.range(0, .15);
      S.add(gOct(), { s: [hh * .24, hh, hh * .24], p: [Math.cos(a) * d, hh * .45, Math.sin(a) * d], r: [Math.sin(a) * tilt, rng() * TAU, -Math.cos(a) * tilt], c: mulC(col, .75 + .35 * rng()), rough: .1, emis: .26 + .12 * rng() });
      top = Math.max(top, hh * 1.4);
    }
    for (let k = 0; k < 5; k++) { const a = rng() * TAU; S.rock(rng.range(.2, .38), Math.cos(a) * .55, .05, Math.sin(a) * .55, mixC(COL.stoneD, COL.stone, rng()), { sq: .6 }); }
    return top;
  },
  stalagmite(S, rng, hh) {
    const c = mulC(mixC(COL.stoneD, COL.stoneL, rng() * .6), .85 + .3 * rng());
    S.cone(hh * .2, hh, 0, hh / 2 - .1, 0, c, { n: 6, l: L_ROCK, jit: .08 });
    for (let k = 0, n = rng.int(1, 3); k < n; k++) { const a = rng() * TAU, h2 = hh * rng.range(.3, .6); S.cone(h2 * .22, h2, Math.cos(a) * hh * .2, h2 / 2 - .1, Math.sin(a) * hh * .2, mulC(c, .9), { n: 5, l: L_ROCK, jit: .08 }); }
  },
});
// Hollowmere and Stormcrown props
const GLASS = [[.95, .32, .2], [.3, .5, 1.0], [.95, .75, .25], [.4, .85, .5]];
Object.assign(PROP, {
  // A ruined cathedral: a nave with stained glass, a rose window and a bell tower. Returns where the bell hangs.
  cathedral(S, rng) {
    const sd = COL.stoneD, sl = COL.stoneL, mc = () => mixC(sd, sl, rng() * .7 + .15), M = { l: L_MASON, jit: .03 };
    S.box(6.2, .3, 3.4, -.3, .05, 0, sd, { l: L_MASON });
    for (const sz of [-1, 1]) for (let k = 0; k < 5; k++) {
      const x = -2.9 + k * 1.1, h = rng() < .3 ? rng.range(.8, 1.9) : rng.range(2.7, 3.1);
      S.box(1.1, h, .32, x, h / 2, sz * 1.55, mc(), M);
      if (h > 2.4) { S.box(.38, 1.15, .36, x, 1.55, sz * 1.55, mulC(GLASS[(k + (sz > 0 ? 1 : 0)) % 4], .7), { emis: .4, jit: 0 }); S.cone(.2, .3, x, 2.27, sz * 1.55, mc(), { n: 4, l: L_MASON }); }
      if (k < 4) S.box(.3, rng.range(1.6, 2.4), .45, x + .55, .9, sz * 1.8, mc(), M);
    }
    S.box(.4, 3.8, 3.4, -3.5, 1.9, 0, mc(), M); S.cyl(.62, .42, -3.5, 2.6, 0, mulC(GLASS[1], .75), { n: 10, emis: .45, jit: 0, r: [0, 0, HPI] });
    for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; S.box(.44, .06, .06, -3.5, 2.6 + Math.sin(a) * .3, Math.cos(a) * .3, COL.iron, { l: L_METAL, r: [a, 0, 0] }); }
    S.box(.44, 1.4, .9, -3.5, .7, 0, COL.black, { jit: 0 }); for (const sz of [-1, 1]) S.box(.4, 1.3, 1.6, -3.5, 4.1, sz * .8, mc(), Object.assign({ r: [sz * .55, 0, 0] }, M));
    for (let k = 0; k < 4; k++) S.seg([-2.8 + k * 1.3, 3.0, -1.5], [-2.6 + k * 1.3, 3.6 + rng() * .3, rng.range(-.4, .6)], .07, .06, COL.woodD, { l: L_WOOD, n: 4 });
    const tx = 3.2; S.box(1.6, 5.0, 1.6, tx, 2.5, 0, mc(), M);
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) S.box(.24, 1.3, .24, tx + dx * .65, 5.65, dz * .65, mc(), M);
    S.box(1.8, .24, 1.8, tx, 6.4, 0, sl, M); S.cone(1.0, 1.9, tx, 7.45, 0, sd, { n: 4, l: L_MASON, r: [0, PI / 4, 0] });
    S.add(gDome(8, 4), { s: [.42, .5, .42], p: [tx, 5.25, 0], r: [PI, 0, 0], c: mulC(COL.brass, .9), l: L_METAL, rough: .4 }); S.ico(.08, tx, 4.78, 0, COL.iron, { d: 0 });
    S.box(.2, .6, .26, tx, 3.6, .81, mulC(GLASS[2], .7), { emis: .4, jit: 0 });
    for (let k = 0; k < 8; k++) S.rock(rng.range(.15, .35), rng.range(-3.8, 4), .05, rng.sign() * rng.range(1.8, 2.4), mc(), { sq: .7 });
    return [tx, 5.2, 0];
  },
  lamppost(S, rng) {
    S.seg([0, 0, 0], [0, 2.1, 0], .045, .035, COL.iron, { l: L_METAL, n: 6 }); S.seg([0, 2.0, 0], [.34, 2.08, 0], .025, .025, COL.iron, { l: L_METAL, n: 4 });
    S.box(.16, .22, .16, .36, 1.88, 0, [1.0, .72, .35], { emis: .55, jit: 0 }); S.cone(.15, .1, .36, 2.04, 0, COL.iron, { n: 4, l: L_METAL, r: [0, PI / 4, 0] });
    S.cyl(.09, .12, 0, .06, 0, COL.iron, { n: 6, l: L_METAL });
  },
  ruinhouse(S, rng) {
    const w = rng.range(2.0, 2.8), d = rng.range(1.6, 2.2), mc = () => mixC(COL.stoneD, COL.stoneL, rng() * .6 + .1), M = { l: L_MASON, jit: .04 };
    for (const sz of [-1, 1]) { const h = rng.range(1.2, 2.2); S.box(w, h, .26, 0, h / 2, sz * d / 2, mc(), M); if (rng() < .7) S.box(.36, .46, .3, rng.range(-w / 4, w / 4), h * .6, sz * d / 2, rng() < .5 ? [1.0, .65, .3] : COL.black, { emis: .35, jit: 0 }); }
    for (const sx of [-1, 1]) { const h = rng.range(1.6, 2.6); S.box(.26, h, d, sx * w / 2, h / 2, 0, mc(), M); if (h > 2.1) S.box(.24, .8, d * .7, sx * w / 2, h + .3, 0, mc(), Object.assign({ r: [0, 0, sx * .2] }, M)); }
    for (let k = 0; k < 3; k++) S.seg([-w / 2, 1.9, rng.range(-d / 2, d / 2)], [w / 2, 1.6 + rng() * .5, rng.range(-d / 2, d / 2)], .06, .05, COL.woodD, { l: L_WOOD, n: 4 });
    for (let k = 0; k < 5; k++) S.rock(rng.range(.12, .3), rng.range(-w / 2, w / 2), .05, rng.range(-d / 2, d / 2), mc(), { sq: .7 });
  },
  windpine(S, rng, h) { const T = new Soup(); PROP.pine(T, rng, h); S.merge(T, { r: [0, 0, -.16 - .08 * rng()] }); },
  prayerflags(S, rng, len) {
    const cols = [[.85, .2, .15], [.95, .8, .2], [.25, .6, .3], [.25, .4, .85], [.92, .9, .85]];
    for (const sx of [-1, 1]) S.seg([sx * len / 2, -.1, 0], [sx * len / 2, 2.3, 0], .05, .04, COL.woodD, { l: L_WOOD, n: 5 });
    const n = Math.round(len / .32);
    for (let k = 0; k <= n; k++) { const u = k / n, x = -len / 2 + u * len, y = 2.25 - Math.sin(u * PI) * .45; if (k < n) { const u2 = (k + 1) / n; S.seg([x, y, 0], [-len / 2 + u2 * len, 2.25 - Math.sin(u2 * PI) * .45, 0], .008, .008, COL.rope, { n: 3 }); }
      if (k > 0 && k < n) S.box(.2, .24, .015, x, y - .14, 0, cols[k % 5], { l: L_CLOTH, sway: .6, jit: 0 }); }
  },
  shrine(S, rng) {
    const w = C(0xd8d2c4), g = mulC(COL.gold, .9), M = { l: L_MASON, jit: .02 };
    S.box(2.2, .4, 2.2, 0, .2, 0, mixC(COL.stoneD, COL.stone, .5), M); S.box(1.7, .35, 1.7, 0, .57, 0, w, M); S.box(1.3, .3, 1.3, 0, .89, 0, w, M);
    S.sph(.72, 0, 1.25, 0, w, { sc: [1, .8, 1], w: 10, h: 6 }); S.box(.5, .3, .5, 0, 1.95, 0, g, { l: L_METAL, emis: .05 });
    for (let k = 0; k < 5; k++) S.cyl(.22 - k * .035, .12, 0, 2.2 + k * .13, 0, g, { n: 8, l: L_METAL, emis: .05 });
    S.cone(.06, .3, 0, 3.0, 0, g, { n: 6, l: L_METAL, emis: .1 });
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) S.box(.06, .1, .06, dx * .75, .8, dz * .75, [1.0, .7, .3], { emis: .6, jit: 0 });
  },
});
const GLIM_COLS = [[.62, .36, 1.0], [.3, .85, 1.0], [1.0, .4, .82]], GLIM_HEX = [0x9a5cff, 0x4cd8ff, 0xff66d0];

const BIOME_FIRST = {
  // Hollowmere's cathedral goes down first; its bell is what tolls.
  holl(X) {
    const { B, rng } = X, p = X.find(3.6, { far: 3.4, steep: true }) || X.find(3.2, { far: 2.6, steep: true }); if (!p) return;
    const ry = rng() * TAU, T = new Soup(), b = PROP.cathedral(T, rng); B.put(T, p[0], p[1], { ry }); X.placed.push([p[0], p[1], 3.6]);
    const v = new THREE.Vector3(b[0], b[1], b[2]).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
    B.bell = { x: p[0] + v.x, y: X.H(p[0], p[1]) + v.y, z: p[1] + v.z };
    B.env.push({ x: p[0], y: X.H(p[0], p[1]) + 2, z: p[1], c: 0x8090ff, I: 10, d: 7 });
  },
  storm(X) {
    const { B, rng, drop } = X; B.windRy = rng() * TAU;
    drop(T => PROP.shrine(T, rng), 1.6, { far: 3, steep: true });
  },
  salt(X) {
    const { B, rng, drop } = X;
    let top = 0; const lp = drop(T => { top = PROP.lighthouse(T, rng); }, 1.5, { far: 3.4, steep: true }) || drop(T => { top = PROP.lighthouse(T, rng); }, 1.3, { far: 2.2, steep: true });
    if (lp) { const y = X.H(lp[0], lp[1]) + top; B.lighthouse = { x: lp[0], y, z: lp[1] }; B.env.push({ x: lp[0], y: y + .3, z: lp[1], c: 0xffd890, I: 26, d: 11 }); }
  },
  glim(X) {
    const { B, rng, drop } = X; B.crystals = [];
    // the big crystals sit near the road, where the storm spires' lightning can reach them
    for (let k = 0, made = 0; k < 400 && made < 7; k++) {
      const i = rng.int(14, B.n - 14), side = rng.sign(), d = ROAD_HALF + rng.range(1.7, 3.8), x = B.px[i] - B.tz[i] * side * d, z = B.pz[i] + B.tx[i] * side * d;
      if (!X.free(x, z, .8, .8) || B.crystals.some(c => dist2(c.x, c.z, x, z) < 20)) continue;
      const ci = made % 3; let top = 0; drop(T => { top = PROP.bigCrystal(T, rng, GLIM_COLS[ci]); }, .9, { at: [x, z] });
      B.crystals.push({ x, z, y: X.H(x, z) + top * .7, ci, cd: 0, flash: 0 }); made++;
    }
    for (let k = 0; k < Math.min(3, B.crystals.length); k++) { const c = B.crystals[k], e = { x: c.x, y: c.y + .4, z: c.z, c: GLIM_HEX[c.ci], I: 16, d: 8 }; c.env = e; c.I0 = e.I; B.env.push(e); }
  },
};
const BIOME_DRESS = {
  ashen(X) { for (let k = 0; k < 3; k++) X.drop(T => PROP.log(T, X.rng), .9, { far: 1.2 }); },
  frost(X) {
    const { B, rng, drop } = X, snow = B.bio.coverCol;
    for (let k = 0; k < 30; k++) { const r = rng.range(.5, 1.25); drop(T => PROP.drift(T, rng, r, snow), r * .35, { roadMin: .5, ao: null, steep: true }); }
    for (const q of B.ponds) for (let k = 0; k < 2; k++) { const a = rng() * TAU, d = q.r + rng.range(.9, 1.3); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.crystal(T, rng, COL.ice, .03), .5); }
    for (let k = 0; k < 5; k++) drop(T => PROP.crystal(T, rng, COL.ice, .03), .5, { water: 3.2 });
    for (let k = 0; k < 2; k++) drop(T => PROP.log(T, rng), .9, { far: 1.2 });
    if (B.ponds[0]) B.env.push({ x: B.ponds[0].x, y: B.ponds[0].y + .9, z: B.ponds[0].z, c: 0x7fc8ff, I: 6, d: 7 });
  },
  fen(X) {
    const { B, rng, drop } = X;
    for (let k = 0; k < 52; k++) {
      const u = rng.int(2, B.SP.length - 2), a = B.SP[u - 1], b = B.SP[u + 1], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1, off = rng.sign() * rng.range(.95, 1.9), x = B.SP[u][0] - dz / l * off, z = B.SP[u][1] + dx / l * off;
      if (Math.abs(x) > BH - .8 || Math.abs(z) > BH - .8 || B.dRoadAt(x, z) < ROAD_HALF + .9) continue;
      X.at(x, z, T => PROP.reeds(T, rng), 0);
    }
    for (const q of B.ponds) {
      for (let k = 0; k < 9; k++) { const a = rng() * TAU, d = q.r * rng.range(.75, 1.2); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.reeds(T, rng), 0); }
      for (let k = 0; k < 4; k++) { const a = rng() * TAU, d = q.r * rng.range(0, .55), T = new Soup(); PROP.lily(T, rng); B.put(T, q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, { y: q.y + .012, ao: null }); }
    }
    const sh = [];
    for (let k = 0; k < 16; k++) { const p = drop(T => PROP.shroom(T, rng), .35, { ao: null }); if (p) sh.push(p); }
    for (let k = 0; k < Math.min(2, sh.length); k++) B.env.push({ x: sh[k][0], y: X.H(sh[k][0], sh[k][1]) + .7, z: sh[k][1], c: 0x45e0b8, I: 5, d: 6 });
    for (let k = 0; k < 5; k++) drop(T => PROP.log(T, rng), .9, { far: 1.2 });
  },
  ember(X) {
    const { B, rng, drop } = X, cols = [COL.stoneD, COL.stone, C(0x5a2a22), COL.stoneD];
    for (let k = 0; k < 9; k++) drop(T => PROP.basalt(T, rng), 1.0, { far: 1.4 });
    for (let k = 0; k < 6; k++) { const hh = rng.range(2.0, 4.2); drop(T => PROP.spire(T, rng, hh, cols), hh * .28, { far: 1.6, steep: true }); }
    for (let k = 0; k < 4; k++) { const p = drop(T => PROP.vent(T, rng), .8, { far: 2.2 }); if (p) B.fires.push({ x: p[0], y: X.H(p[0], p[1]) + .12, z: p[1], size: .5, fx: { layers: 0, smoke: 1.3, embers: 1.1, glow: .55 } }); }
    B.env.push({ x: B.bridge.x, y: B.wlc + .55, z: B.bridge.z, c: 0xff5a1e, I: 44, d: 9, flick: 1 });
    if (B.ponds[0]) { const q = B.ponds[0]; B.env.push({ x: q.x, y: q.y + .7, z: q.z, c: 0xff5a1e, I: 40, d: 9, flick: 1 }); }
    if (B.fallAt) B.env.push({ x: B.fallAt.x - B.fallAt.ox * 1.2, y: B.fallAt.y + .6, z: B.fallAt.z - B.fallAt.oz * 1.2, c: 0xff5a1e, I: 36, d: 8, flick: 1 });
  },
  holl(X) {
    const { B, rng, drop, beside } = X;
    for (let k = 0; k < 3; k++) drop(T => PROP.ruinhouse(T, rng), 1.5, { far: 1.8 });
    for (let k = 0; k < 7; k++) { const p = beside(6, B.L - 5, .7, .25); if (p) drop(T => PROP.lamppost(T, rng), .3, { at: p, ry: -p[2] + HPI * (p[3] > 0 ? 0 : 2) }); }
    for (let k = 0; k < 10; k++) drop(T => PROP.grave(T, rng), .45, { far: 1.2 });
    for (let k = 0; k < 3; k++) { const p = beside(8, B.L - 6, 1.0, .4); if (p) { const len = rng.range(2.5, 4); drop(T => PROP.fence(T, rng, len), 1.2, { at: p, ry: -p[2] }); } }
    drop(T => PROP.statue(T, rng), 1.2, { far: 2 });
  },
  storm(X) {
    const { B, rng, drop, beside } = X;
    for (let k = 0; k < 5; k++) { const p = beside(8, B.L - 6, 1.3, .5); if (p) { const len = rng.range(2.4, 3.6); drop(T => PROP.prayerflags(T, rng, len), .9, { at: p, ry: -p[2] + rng.range(-.3, .3) }); } }
    const cols = [COL.stoneD, COL.stone, COL.stoneL, COL.stoneD];
    for (let k = 0; k < 7; k++) { const hh = rng.range(2.4, 4.8); drop(T => PROP.spire(T, rng, hh, cols), hh * .28, { far: 1.6, steep: true }); }
    for (let k = 0; k < 5; k++) drop(T => PROP.cairn(T, rng), .5, {});
  },
  salt(X) {
    const { B, rng, drop, beside } = X;
    drop(T => PROP.wreck(T, rng), 2.4, { far: 2.6 });
    if (rng() < .6) drop(T => PROP.wreck(T, rng), 2.4, { far: 2.6 });
    for (let k = 0; k < 3; k++) { const len = rng.range(3, 5.5); drop(T => PROP.seawall(T, rng, len), len * .5, { far: 1.4 }); }
    for (let k = 0; k < 3; k++) { const p = beside(8, B.L - 6, 1.1, .4); if (p) { const len = rng.range(1.6, 3); drop(T => PROP.piles(T, rng, len), .9, { at: p, ry: -p[2] }); } }
    for (const q of B.ponds) for (let k = 0; k < 6; k++) { const a = rng() * TAU, d = q.r + rng.range(.4, 1.1), r = rng.range(.2, .45); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => { T.rock(r, 0, r * .25, 0, mixC(COL.stoneD, COL.stone, rng())); for (let b = 0; b < 5; b++) T.ico(.03, rng.range(-r, r) * .7, r * .5, rng.range(-r, r) * .7, C(0xb8b4a4), { d: 0 }); }, 0); }
    for (let k = 0; k < 40; k++) drop(T => PROP.reeds(T, rng), .3, { water: 2.6, ao: null });
    for (let k = 0; k < 4; k++) drop(T => PROP.log(T, rng), .9, { far: 1.2 });
  },
  glim(X) {
    const { B, rng, drop } = X;
    for (let k = 0; k < 22; k++) { const ci = rng.int(0, 2); drop(T => PROP.crystal(T, rng, GLIM_COLS[ci], .22), .45, { far: .8 }); }
    for (let k = 0; k < 16; k++) { const hh = rng.range(1.2, 3.4); drop(T => PROP.stalagmite(T, rng, hh), hh * .25, { far: 1.3, steep: true }); }
    const cols = [COL.stoneD, COL.stone, COL.stoneD, COL.stoneL];
    for (let k = 0; k < 5; k++) { const hh = rng.range(2.4, 4.4); drop(T => PROP.spire(T, rng, hh, cols), hh * .28, { far: 1.8, steep: true }); }
    for (let k = 0; k < 10; k++) drop(T => PROP.shroom(T, rng), .35, { ao: null });
  },
  dunes(X) {
    const { B, rng, drop } = X, cols = B.bio.strata.map(h => C(h));
    for (let k = 0; k < 11; k++) drop(T => PROP.cactus(T, rng), .4, { far: .9 });
    for (let k = 0; k < 6; k++) { const hh = rng.range(2.2, 4.6); drop(T => PROP.spire(T, rng, hh, cols), hh * .28, { far: 1.6, steep: true }); }
    for (const q of B.ponds) {
      for (let k = 0; k < 4; k++) { const a = rng() * TAU, d = q.r + rng.range(1.1, 1.9), h = rng.range(3, 4.4); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.palm(T, rng, h), .5); }
      for (let k = 0; k < 7; k++) { const a = rng() * TAU, d = q.r * rng.range(.8, 1.2); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.reeds(T, rng), 0); }
    }
    for (const pad of B.pads) {
      if (rng() < .5) continue;
      const a = rng() * TAU, x = pad.x + Math.cos(a) * 2.3, z = pad.z + Math.sin(a) * 2.3; if (!X.free(x, z, .5, .3)) continue;
      const T = new Soup(); PROP.jar(T, rng); if (rng() < .7) { const J = new Soup(); PROP.jar(J, rng); T.merge(J, { p: [.42, 0, .1] }); } if (rng() < .4) { const J = new Soup(); PROP.jar(J, rng); T.merge(J, { p: [.15, 0, .45], r: [1.3, rng() * 3, 0] }); }
      X.at(x, z, () => T, .7, T);
    }
  },
};
