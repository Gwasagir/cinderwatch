// What only some lands have: Saltreach's tide and lighthouse, Glimmerdeep's crystals.
const LAND = { t: 0, tideY: -99, tideK: 0, high: false };
const TIDE = { cycle: 54, slow: .42, depth: .04, share: .32 }; // seconds per tide, slow once under water, depth (units) at which the slow is full, share of the road high tide covers

function landBoard(B) {
  LAND.t = 0; LAND.tideY = -99; LAND.tideK = 0; LAND.high = false;
  if (B.bio.key === 'salt') buildTide(B);
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
