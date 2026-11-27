// What only some lands have: Saltreach's tide and lighthouse, Glimmerdeep's crystals.
const LAND = { t: 0, tideY: -99, tideK: 0, high: false, bellT: 0, toll: 0, tolls: 0, strikeT: 0, strikes: [], skyT: 0 };
const TIDE = { cycle: 54, slow: .42, depth: .04, share: .32 }; // seconds per tide, slow once under water, depth (units) at which the slow is full, share of the road high tide covers

function landBoard(B) {
  LAND.t = 0; LAND.tideY = -99; LAND.tideK = 0; LAND.high = false; LAND.toll = 0; LAND.tolls = 0; LAND.bellT = BELL.first; LAND.strikeT = STRIKE.first; LAND.strikes.length = 0; LAND.skyT = 3;
  if (B.bio.key === 'salt') buildTide(B);
  foesBoard(B);
}

// The tide: a sheet of water that rises over the low ground, highest at about the lowest third of the road.
function buildTide(B) {
  const n = B.n, ys = [];
  for (let i = Math.floor(n * .08); i < n * .92; i++) ys.push(B.py[i]);
  ys.sort((a, b) => a - b);
  const lo = ys[0] - .55, hi = ys[Math.floor(ys.length * TIDE.share)] + .045; // the road surface sits .035 above the path height
  const S = new Soup(), H = B.heightAt, st = .5, E = BH - 1.1;
  for (let z = -E; z < E; z += st) for (let x = -E; x < E; x += st) {
    if (Math.min(H(x, z), H(x + st, z), H(x, z + st), H(x + st, z + st)) > hi + .05) continue;
    for (const [dx, dz] of [[0, 0], [0, st], [st, st], [0, 0], [st, st], [st, 0]]) S.v(x + dx, 0, z + dz, 0, 1, 0, 1, 1, 1, (x + dx) * .8, (z + dz) * .8, 0, .12, .25, 0);
  }
  B.tide = { lo, hi, mesh: null };
  if (!S.verts) return;
  const m = new THREE.Mesh(S.build(), MAT.water); m.receiveShadow = true; m.renderOrder = 1; m.position.y = lo; m.visible = false;
  B.group.add(m); B.tide.mesh = m;
}
// How much the tide slows something standing at height y (0 when dry).
function tideSlow(y) { return LAND.tideY > y ? TIDE.slow * sat((LAND.tideY - y) / TIDE.depth) : 0; }

function updateLand(dt) {
  const B = G.B; if (!B) return;
  const play = G.phase === 'play';
  if (play) LAND.t += dt;
  if (B.tide && B.tide.mesh) {
    const T = B.tide, ph = LAND.t / TIDE.cycle, f = sat(.5 - .95 * Math.cos(ph * TAU));
    LAND.tideK = damp(LAND.tideK, play ? f : 0, play ? 1.2 : 3, dt);
    const y = lerp(T.lo, T.hi, LAND.tideK); T.mesh.position.y = y;
    T.mesh.visible = G.phase === 'play' || G.phase === 'defeat' || G.phase === 'clear';
    LAND.tideY = play ? y : -99;
    if (play && LAND.tideK > .65 && !LAND.high) { LAND.high = true; UI.banner('High tide floods the road', 2.4, false); }
    if (LAND.tideK < .3) LAND.high = false;
  }
  const live = play || G.phase === 'defeat' || G.phase === 'clear';
  if (play && B.bio.key === 'holl') updateBell(dt, B);
  if (play && B.bio.key === 'storm') updateStrikes(dt, B);
  if (B.lighthouse && live) {
    const L = B.lighthouse, a = LAND.t * .55, cx = Math.cos(a), cz = Math.sin(a), on = LT.envK;
    FX.add.push(L.x, L.y, L.z, 1.4, 1.4, 0, 0, 2.2, 1.9, 1.2, .8 * on, 0, 0, 0, 0);
    for (let k = 1; k <= 12; k++) { const d = k * 1.7, w = .9 + k * .45; FX.add.push(L.x + cx * d, L.y - k * .16, L.z + cz * d, w, w, 0, 0, .9, .95, .75, .2 * (1 - k / 13) * on, 2, 0, 0, 0); }
  }
  if (B.crystals) for (const c of B.crystals) {
    c.cd = Math.max(0, c.cd - dt); c.flash = Math.max(0, c.flash - dt * 2.2);
    if (!live) continue;
    const col = GLIM_COLS[c.ci], k = .5 + .5 * Math.sin(G.t * 1.3 + c.x), f = c.flash;
    FX.add.push(c.x, c.y - .3, c.z, 2.4 + f * 2.5, 2.8 + f * 2.5, 0, 0, col[0] * (.5 + f * 2), col[1] * (.5 + f * 2), col[2] * (.5 + f * 2), (.16 + .06 * k) * LT.envK + .5 * f, 2, 0, 0, 0);
    if (c.env) c.env.I = c.I0 * (1 + .15 * k + 2.5 * f);
  }
}

// Hollowmere: the cathedral bell tolls now and then, and for a few seconds every undead monster hurries.
const BELL = { first: 16, every: [26, 34], haste: .4, dur: 4.5 };
const isUndead = def => !def.boss && (def.undead || def.death === 'bones' || def.death === 'ghost' || def === MON.ghoul);
function updateBell(dt, B) {
  LAND.toll = Math.max(0, LAND.toll - dt); LAND.bellT -= dt;
  if (LAND.bellT > 0) return;
  LAND.bellT = rr(BELL.every[0], BELL.every[1]); LAND.toll = BELL.dur; LAND.tolls++;
  const b = B.bell || B.beacon; sfx('bell', b.x, b.z, 1.1);
  if (LAND.tolls <= 2) UI.banner('The bell tolls: the dead hurry', 2.4, false);
  fxTimed(4, b.x, B.heightAt(b.x, b.z) + .1, b.z, 9, 9, .6, .8, 1.6, .5, 1.2, { ground: true }); lightFlash(b.x, b.y, b.z, 0x9fb0ff, 300, .5, 14);
  for (const m of G.mons) if (!m.dead && m.vis && !m.fly && isUndead(m.def)) fxTimed(4, m.x, m.y + .06, m.z, 1.2, 1.2, .5, .9, 1.6, .7, .5, { ground: true });
}

// Stormcrown: lightning strikes the road. A glowing ring marks the spot for a moment, then the bolt hurts everything near it, footmen too.
const STRIKE = { first: 9, every: [10, 14], warn: 1.2, r: 1.8, dmg: [55, 22], men: 34 };
function updateStrikes(dt, B) {
  LAND.strikeT -= dt; LAND.skyT -= dt;
  if (LAND.skyT <= 0) { LAND.skyT = rr(4, 9); if (LOOK.cur) { LOOK.cur.hi[0] += .7; LOOK.cur.mi[0] += .4; } sfx('thunder', rr(-20, 20), rr(-20, 20), .35); } // far-off lightning
  if (LAND.strikeT <= 0) {
    LAND.strikeT = rr(STRIKE.every[0], STRIKE.every[1]);
    const g = G.mons.filter(m => !m.dead && m.vis && !m.fly && m.s > B.cave.s + 4 && m.s < B.L - 6);
    let x, z;
    if (g.length && rnd() < .6) { const m = g[Math.floor(rnd() * g.length)]; x = m.x + rr(-.6, .6); z = m.z + rr(-.6, .6); }
    else { const p = pathAt(B, rr(B.cave.s + 5, B.L - 8), _ap); x = p.x; z = p.z; }
    LAND.strikes.push({ x, z, t: STRIKE.warn });
    fxTimed(4, x, B.heightAt(x, z) + .08, z, STRIKE.r * 2.2, STRIKE.r * 2.2, .9, 1.1, 1.8, .9, STRIKE.warn, { ground: true });
  }
  for (let i = LAND.strikes.length - 1; i >= 0; i--) {
    const s = LAND.strikes[i]; s.t -= dt; if (s.t > 0) continue; LAND.strikes.splice(i, 1);
    const y = B.heightAt(s.x, s.z), dmg = STRIKE.dmg[0] + STRIKE.dmg[1] * G.level, r2 = STRIKE.r * STRIKE.r;
    let from = [s.x + rr(-3, 3), y + 18, s.z + rr(-3, 3)];
    for (let k = 1; k <= 4; k++) { const to = k === 4 ? [s.x, y, s.z] : [lerp(from[0], s.x, .4) + rr(-.8, .8), lerp(from[1], y, k / 4), lerp(from[2], s.z, .4) + rr(-.8, .8)]; fxBolt(from, to, .4, [1.4, 1.6, 2.4], .14); from = to; }
    fxSparks(s.x, y + .2, s.z, 18, 5, 2.5, 3, 3, { grav: 6, size: .07 }); fxDust(s.x, y + .1, s.z, 8, 1.2, { speed: 3 }); FX.decals.add(B.heightAt, s.x, s.z, 1.1, .02, .02, .03, .7, 10);
    lightFlash(s.x, y + 2, s.z, 0xd0e4ff, 2600, .35, 40); if (LOOK.cur) { LOOK.cur.hi[0] += 1.4; LOOK.cur.mi[0] += .9; }
    sfx('thunder', s.x, s.z, 1.1); FX.shake = Math.min(1.2, FX.shake + .5);
    for (const m of G.mons) if (!m.dead && m.hp > 0 && m.vis && !(m.burrowed > 0) && dist2(m.x, m.z, s.x, s.z) < r2) hitMonster(m, dmg * (m.def.boss ? .35 : 1), 'bolt', 0, 0, null);
    for (const f of G.men) if (!f.dead && dist2(f.x, f.z, s.x, s.z) < r2) { f.hp -= STRIKE.men * G.dmgMul; f.flash = 1; f.flinch = 1; if (f.hp <= 0) killFootman(f, (f.x - s.x) || .1, (f.z - s.z) || .1); }
  }
}

// Glimmerdeep: chain lightning that hits a monster near a big crystal makes the crystal discharge at monsters around it.
const CRYSTAL = { reach: 3.0, range: 4.2, n: 3, dmg: .7, cd: 1.4 };
function crystalDischarge(tower, hit, dmg) {
  const B = G.B; if (!B.crystals) return;
  for (const c of B.crystals) {
    if (c.cd > 0 || !hit.some(m => dist2(m.x, m.z, c.x, c.z) < CRYSTAL.reach * CRYSTAL.reach)) continue;
    c.cd = CRYSTAL.cd; c.flash = 1;
    const col = GLIM_COLS[c.ci], from = [c.x, c.y, c.z], r2 = CRYSTAL.range * CRYSTAL.range;
    const tg = G.mons.filter(m => !m.dead && m.hp > 0 && m.vis && !hit.includes(m) && dist2(m.x, m.z, c.x, c.z) < r2).sort((a, b) => dist2(a.x, a.z, c.x, c.z) - dist2(b.x, b.z, c.x, c.z)).slice(0, CRYSTAL.n);
    for (const m of tg) { const to = [m.x, m.y + m.hitH, m.z]; fxBolt(from, to, .2, [col[0] * 1.6, col[1] * 1.6, col[2] * 1.6], .08); fxSparks(to[0], to[1], to[2], 4, 3, 1.2, 2, 4, { grav: 3, size: .05 }); hitMonster(m, dmg * CRYSTAL.dmg, 'bolt', 0, 0, tower); }
    for (let i = 0; i < 3; i++) { const a = rnd() * TAU; fxBolt(from, [c.x + Math.cos(a) * .9, c.y + rr(-.4, .6), c.z + Math.sin(a) * .9], .1, col, .04); }
    lightFlash(c.x, c.y, c.z, GLIM_HEX[c.ci], 280, .22, 10); sfx('zap', c.x, c.z, .55, .9);
  }
}
