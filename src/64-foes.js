// The second campaign's own enemies (The Far Reaches). Only its lands list them in their mobs, so the first campaign never meets them,
// and their abilities run only on those lands (FOES.on). Each enemy is one MON line, one ROSTER line, a RIGS body and EYES.
// Abilities, all optional:
//   glide: share of the road flown before it lands          heal: [radius, share of health healed per second]
//   banner: [radius, share of damage taken off nearby]       sling: [seconds between stones, reach, damage to a footman]
//   scream: [seconds, radius, seconds footmen are stunned]   throw: [seconds between boulders, reach, seconds a tower is stunned]
//   shell: [share of damage taken off, seconds on its back after an explosion flips it]
//   crack: [health share when the shell cracks, what comes out, how many, speed after]
//   tideFast: speed gained in the tide   noBolt: lightning does nothing   undeadOnly: its aura speeds up only the undead   undead: counts as undead
Object.assign(MON, {
  // bulk: cheap, many at a time
  orc: { name: 'Orc grunt', tip: 'The common raider. Tougher than a skeleton.', hp: 50, spd: 1.2, rad: .3, mass: 1.5, bounty: 8, lives: 1, hitH: .56, top: 1.2, dmg: 9, atkT: 1.0, eye: [3.4, 1.4, .2], scale: .8, death: 'flesh', blade: true, tint: [.62, .95, .55] },
  goblin: { name: 'Goblin', tip: 'Small and quick. Comes in crowds.', hp: 15, spd: 2.3, rad: .2, mass: .5, bounty: 3, lives: 1, hitH: .36, top: .85, dmg: 4, atkT: .6, eye: [3.4, 2.8, .3], scale: .5, death: 'flesh', blade: true, cat: 'swarm', tint: [1.05, 1.25, .55] },
  vulture: { name: 'Vulture', tip: 'A flyer, tougher than a bat. Only archers and spires reach it.', hp: 30, spd: 1.9, rad: .26, mass: .5, bounty: 7, lives: 1, hitH: 0, top: .55, dmg: 0, atkT: 1, eye: [3.4, 1.2, .2], scale: 1.45, fly: true, death: 'bat', cat: 'air', alt: [2.7, 3.5], flap: 4.5, tint: [.62, .48, .38] },
  zombie: { name: 'Zombie', tip: 'Slow, but it takes a lot of killing.', hp: 64, spd: .82, rad: .3, mass: 1.6, bounty: 7, lives: 1, hitH: .8, top: 1.55, dmg: 8, atkT: 1.2, eye: [2.6, 3.2, .6], scale: 1, death: 'flesh', undead: true },
  gull: { name: 'Gull', tip: 'Small flyers that come in flocks.', hp: 8, spd: 2.7, rad: .16, mass: .2, bounty: 3, lives: 1, hitH: 0, top: .35, dmg: 0, atkT: 1, eye: [3.4, 2.4, .4], scale: .85, fly: true, death: 'bat', cat: 'air', alt: [2.0, 3.0], flap: 9, tint: [1.2, 1.2, 1.22] },
  crab: { name: 'Shore crab', tip: 'Scuttles sideways in a hard shell.', hp: 52, spd: 1.15, rad: .3, mass: 1.4, bounty: 8, lives: 1, hitH: .25, top: .55, dmg: 8, atkT: .9, eye: [3.4, 2.2, .4], scale: 1, armor: .3, death: 'bug', cat: 'armor' },
  kobold: { name: 'Kobold miner', tip: 'Small, many, and a candle on every head.', hp: 26, spd: 1.6, rad: .22, mass: .7, bounty: 5, lives: 1, hitH: .34, top: .8, dmg: 5, atkT: .8, eye: [3.4, 2.4, .3], scale: .48, death: 'flesh', blade: true, tint: [1.35, .78, .5] },
  mite: { name: 'Crystal mite', tip: 'Tiny and fast. Slips past your footmen.', hp: 9, spd: 2.45, rad: .16, mass: .2, bounty: 2, lives: 1, hitH: .1, top: .3, dmg: 2, atkT: .6, eye: [2.6, 1.4, 3.6], scale: .55, slip: true, death: 'bug', cat: 'swarm' },
  crow: { name: 'Carrion crow', tip: 'Black flyers in flocks.', hp: 11, spd: 2.5, rad: .17, mass: .2, bounty: 3, lives: 1, hitH: 0, top: .35, dmg: 0, atkT: 1, eye: [3.4, .6, .2], scale: .8, fly: true, death: 'bat', cat: 'air', alt: [2.2, 3.2], flap: 10, tint: [.17, .17, .21] },
  goat: { name: 'Mountain goat', tip: 'Leaps over your footmen.', hp: 36, spd: 1.8, rad: .28, mass: .9, bounty: 7, lives: 1, hitH: .5, top: .95, dmg: 7, atkT: .7, eye: [3.2, 2.6, .4], scale: 1, hop: [1.5, 2.6], slip: true, death: 'fur', cat: 'swarm' },
  // specialists
  shaman: { name: 'Orc shaman', tip: 'Heals the enemies around it.', hp: 95, spd: .92, rad: .3, mass: 1.5, bounty: 15, lives: 1, hitH: .6, top: 1.3, dmg: 6, atkT: 1.2, eye: [.6, 3.4, .8], scale: .85, heal: [3.2, .025], death: 'flesh', tint: [.5, .75, .7] },
  slinger: { name: 'Goblin slinger', tip: 'Throws stones at your footmen from afar.', hp: 24, spd: 1.7, rad: .2, mass: .5, bounty: 5, lives: 1, hitH: .36, top: .85, dmg: 4, atkT: .7, eye: [3.4, 2.8, .3], scale: .5, sling: [2.4, 4.6, 16], death: 'flesh', tint: [.85, 1.1, .55] },
  siren: { name: 'Drowned siren', tip: 'Her song makes nearby towers shoot slower.', hp: 125, spd: .85, rad: .3, mass: 1.4, bounty: 18, lives: 1, hitH: .8, top: 1.75, dmg: 6, atkT: 1.2, eye: [.6, 3.2, 2.8], scale: 1.05, rust: [3.6, .3, 0], rustCol: [.3, 1.2, 1.1], death: 'ghost', tint: [.5, .95, .85] },
  eel: { name: 'Moray eel', tip: 'Swims fast through the tide and slips past footmen.', hp: 46, spd: 1.3, rad: .24, mass: .8, bounty: 8, lives: 1, hitH: .2, top: .5, dmg: 8, atkT: .8, eye: [3.4, 2.6, .3], scale: 1, tideFast: 2.4, slip: true, death: 'flesh', cat: 'swarm' },
  mole: { name: 'Burrowing mole', tip: 'Digs under the road, where nothing can hit it.', hp: 44, spd: 1.1, rad: .26, mass: .9, bounty: 7, lives: 1, hitH: .25, top: .55, dmg: 7, atkT: .8, eye: [3.2, 1.0, .6], scale: 1, burrow: [7, 2.4, 1.9, 0, .4], death: 'fur' },
  shard: { name: 'Shard golem', tip: 'Breaks into crystal mites.', hp: 85, spd: .95, rad: .34, mass: 2.4, bounty: 10, lives: 1, hitH: .6, top: 1.2, dmg: 12, atkT: 1.2, eye: [2.6, 1.4, 3.8], scale: .68, armor: .3, split: ['mite', 3], death: 'rock', cat: 'armor', tint: [.9, .75, 1.55] },
  banshee: { name: 'Banshee', tip: 'Her scream stuns your footmen.', hp: 72, spd: 1.2, rad: .28, mass: 1, bounty: 12, lives: 1, hitH: .8, top: 1.5, dmg: 4, atkT: 1, eye: [3.6, 3.6, 3.8], scale: 1, scream: [6, 2.8, 2.2], death: 'ghost', tint: [1.9, 2.0, 2.2] },
  keeper: { name: 'Gravekeeper', tip: 'Hurries the undead around him.', hp: 120, spd: .92, rad: .3, mass: 1.6, bounty: 14, lives: 1, hitH: .8, top: 1.6, dmg: 8, atkT: 1.1, eye: [3.4, 2.4, .6], scale: 1, aura: [3.6, .3], undeadOnly: true, death: 'flesh', tint: [.78, .7, .6] },
  sprite: { name: 'Spark sprite', tip: 'Lightning does nothing to it.', hp: 38, spd: 1.65, rad: .2, mass: .3, bounty: 6, lives: 1, hitH: .75, top: 1.2, dmg: 4, atkT: .7, eye: [1, 1, 1], scale: 1.2, noBolt: true, death: 'wisp', tint: [.75, 1.0, 1.9] },
  kite: { name: 'Kite rider', tip: 'Glides over the first part of the road, then lands and runs.', hp: 26, spd: 1.55, rad: .2, mass: .5, bounty: 6, lives: 1, hitH: .36, top: .85, dmg: 4, atkT: .6, eye: [3.4, 2.8, .3], scale: .52, fly: true, glide: .42, alt: [2.3, 2.9], flap: 2, death: 'flesh', blade: true, cat: 'air', tint: [1.0, 1.15, .6] },
  // heavies (cost 30 or more)
  warchief: { name: 'Orc warchief', tip: 'His banner shields the enemies around him.', hp: 340, spd: .82, rad: .42, mass: 5, bounty: 28, lives: 2, hitH: .85, top: 1.75, dmg: 22, atkT: 1.3, eye: [3.6, 1.2, .2], scale: 1.18, banner: [3.2, .2], death: 'flesh', blade: true, cat: 'armor', tint: [.55, .8, .5] },
  shellback: { name: 'Shellback', tip: 'Its shell turns most harm. An explosion flips it on its back.', hp: 300, spd: .66, rad: .5, mass: 7, bounty: 26, lives: 2, hitH: .45, top: 1.0, dmg: 16, atkT: 1.3, eye: [3.2, 2.6, .5], scale: 1.25, shell: [.7, 4], death: 'rock', cat: 'armor' },
  geode: { name: 'Geode beetle', tip: 'Armored until its shell cracks, then crystal mites pour out.', hp: 300, spd: .85, rad: .5, mass: 6, bounty: 26, lives: 2, hitH: .4, top: .95, dmg: 16, atkT: 1.1, eye: [2.6, 1.4, 3.8], scale: 1.9, armor: .5, crack: [.5, 'mite', 3, 1.3], death: 'bug', cat: 'armor' },
  cart: { name: 'Corpse cart', tip: 'Drops zombies as it rolls, and more when it breaks.', hp: 420, spd: .68, rad: .55, mass: 9, bounty: 30, lives: 2, hitH: .6, top: 1.5, dmg: 14, atkT: 1.4, eye: [0, 0, 0], scale: 1.1, summon: { type: 'zombie', n: 1, every: 7, max: 3, hp: .5 }, split: ['zombie', 2], death: 'wood', undead: true, cat: 'armor' },
  hillgiant: { name: 'Hill giant', tip: 'Throws boulders that stun a tower.', hp: 520, spd: .72, rad: .55, mass: 9, bounty: 30, lives: 2, hitH: 1.05, top: 2.15, dmg: 26, atkT: 1.5, eye: [3.4, 2.2, .4], scale: 1.6, throw: [9, 7.5, 1.8], death: 'flesh', blade: true, cat: 'armor', tint: [1.05, .8, 1.0] },
});
// w is 0: these come only where a land's mobs names them. Heavies start off the boss waves (multiples of 5).
Object.assign(ROSTER, {
  orc: RO(5, 2, 5, .55, 1, 0), goblin: RO(1.8, 4, 8, .25, 1, 0), vulture: RO(4.5, 2, 4, .5, 2, 0), zombie: RO(4.5, 2, 5, .6, 1, 0), gull: RO(1.8, 4, 7, .2, 1, 0),
  crab: RO(5.5, 2, 4, .45, 2, 0), kobold: RO(3, 3, 6, .35, 1, 0), mite: RO(1.7, 5, 8, .15, 2, 0), crow: RO(2, 4, 7, .22, 1, 0), goat: RO(5, 2, 4, .4, 2, 0),
  shaman: RO(14, 1, 1, 1, 5, 0), slinger: RO(4.5, 2, 3, .5, 4, 0), siren: RO(18, 1, 1, 1, 6, 0), eel: RO(6, 2, 4, .4, 3, 0), mole: RO(6, 1, 3, .6, 3, 0),
  shard: RO(10, 1, 2, .8, 5, 0), banshee: RO(11, 1, 1, 1, 5, 0), keeper: RO(14, 1, 1, 1, 6, 0), sprite: RO(5, 2, 4, .4, 3, 0), kite: RO(5, 2, 3, .5, 4, 0),
  warchief: RO(32, 1, 1, 2, 13, 0), shellback: RO(30, 1, 1, 2, 12, 0), geode: RO(30, 1, 1, 2, 12, 0), cart: RO(34, 1, 1, 2, 13, 0), hillgiant: RO(34, 1, 1, 2, 16, 0),
});

// ---- looks ----
const _fv = new THREE.Vector3(), _fm = new THREE.Matrix4(), _fq = new THREE.Quaternion(), _fs = new THREE.Vector3(), _foeP = { x: 0, y: 0, z: 0, tx: 0, tz: 0 };
Object.assign(RIGS, {
  orc(m) { m.weapon = KIT.item.axe; return rigHuman(KIT.orc, SPEC.ogre, m); },
  shaman(m) { m.weapon = KIT.item.totem; m.staff = true; return rigHuman(KIT.orc, SPEC.ogre, m); },
  warchief(m) { m.weapon = KIT.item.axe; m.wScale = 1.35; m.heavy = true; m.standard = true; return rigHuman(KIT.orc, SPEC.ogre, m); },
  hillgiant(m) { m.weapon = KIT.item.boulder; m.heavy = true; return rigHuman(KIT.orc, SPEC.ogre, m); },
  goblin(m) { m.weapon = KIT.item.spear; return rigHuman(KIT.gob, SPEC.ogre, m); },
  slinger(m) { m.weapon = KIT.item.sling; return rigHuman(KIT.gob, SPEC.ogre, m); },
  kobold(m) { m.weapon = KIT.item.pick; const M = rigHuman(KIT.gob, SPEC.ogre, m); KIT.item.candle.put(M, m.flash || 0, null); return M; },
  kite(m) {
    m.weapon = KIT.item.spear; if (m.fly) { m.mv = 0; m.cast = .8; }
    const M = rigHuman(KIT.gob, SPEC.ogre, m);
    if (m.fly) KIT.item.kite.put(xf(_M[20], _M[2], 0, 1.0, 0, .18, 0, Math.sin(m.ph) * .08), m.flash || 0, null);
    return M;
  },
  zombie(m) { m.shamble = true; return rigHuman(KIT.zomb, SPEC.foot, m); },
  keeper(m) { m.weapon = KIT.item.lantern; m.staff = true; m.ahood = true; return rigHuman(KIT.keep, SPEC.foot, m); },
  siren(m) { m.hood = true; m.robe = true; m.cast = Math.max(m.cast, .5); return rigHuman(KIT.skel, SPEC.skel, m); },
  shard(m) { m.heavy = true; return rigHuman(KIT.shard, SPEC.golem, m); },
  banshee: m => rigWraith(m),
  sprite(m) { const y = m.y; m.y += (.7 + .12 * Math.sin(SH.uTime.value * 3 + m.lseed)) * m.scale; const M = rigWisp(m); m.y = y; return M; },
  vulture: m => rigBat(m, KIT.bird, .07, .03), gull: m => rigBat(m, KIT.bird, .07, .03), crow: m => rigBat(m, KIT.bird, .07, .03),
  crab(m) { const y = m.yaw; m.yaw += m.lseed > 4.5 ? HPI : -HPI; const M = rigSpider(m, KIT.crab); m.yaw = y; return M; }, // walks sideways
  mite: m => rigSpider(m, KIT.mite),
  geode: m => rigSpider(m, m.cracked ? KIT.geodeB : KIT.geode),
  goat(m) { const y = m.y, h = m.hop || 0; if (h > .22 && h < .62) m.y += Math.sin((h - .22) / .4 * PI) * .45 * m.scale; const M = rigWolf(m, KIT.goat); m.y = y; return M; },
  mole: m => rigRat(m, KIT.mole),
  eel: m => rigSerpent(m, KIT.eel, 6, .24, .14, .16),
  shellback: m => rigTurtle(m),
  cart: m => rigCart(m),
});
Object.assign(EYES, {
  orc: OGRE_EYE, shaman: OGRE_EYE, warchief: OGRE_EYE, hillgiant: OGRE_EYE, goblin: OGRE_EYE, slinger: OGRE_EYE, kobold: OGRE_EYE, kite: OGRE_EYE,
  zombie: [.05, .14, .1, .04], keeper: [.05, .14, .1, .04], siren: SKEL_EYE, shard: [.04, .1, .17, .05], banshee: [.045, 1.04, .17, .055], sprite: null,
  vulture: [.035, .08, .22, .03], gull: [.035, .08, .22, .03], crow: [.035, .08, .22, .03], crab: [.06, .2, .165, .03], mite: BUG_EYE, geode: [.05, .06, .34, .03],
  goat: [.045, .32, .55, .03], mole: [.04, .06, .3, .018], eel: [.05, .05, .17, .03], shellback: [.07, .22, .88, .025], cart: null,
});
// glows drawn with each body (after the rig, so weapon and head matrices are fresh)
function foeGlow(x, y, z, size, c, a) { FX.add.push(x, y, z, size, size, 0, 0, c[0], c[1], c[2], a, 2, 0, 0, 0); }
function foeSpark(x, y, z, size, c, a) { FX.add.push(x, y, z, size, size, 0, 0, c[0], c[1], c[2], a, 0, 0, 0, 0); }
const foeTw = (m, t) => .8 + .2 * Math.sin(t * 9 + m.lseed * 7);
MON.siren.fx = (m, t) => { foeGlow(m.x, m.y + 1.0 * m.scale, m.z, 3 * m.scale, [.3, 1.0, .9], .16 * foeTw(m, t)); if (rnd() < .06) fxPart(m.x + rr(-.3, .3), m.y + 1.5, m.z + rr(-.3, .3), rr(-.2, .2), rr(.4, .8), rr(-.2, .2), rr(.8, 1.2), .05, .4, 1.4, 1.3, { drag: .6, wob: 1, rise: .2 }); };
MON.banshee.fx = (m, t) => foeGlow(m.x, m.y + .9, m.z, 2.4, [.8, .9, 1.2], .14 * foeTw(m, t));
MON.sprite.fx = (m, t, M) => { _fv.setFromMatrixPosition(M); const k = foeTw(m, t), c = m.tint || [1, 1, 1]; foeSpark(_fv.x, _fv.y, _fv.z, .3, [c[0] * 2.2, c[1] * 2.2, c[2] * 2.2], k); foeGlow(_fv.x, _fv.y, _fv.z, 1.4, [c[0] * .5, c[1] * .5, c[2] * .5], .5 * k); if (rnd() < .2) fxBolt([_fv.x, _fv.y, _fv.z], [_fv.x + rr(-.4, .4), _fv.y + rr(-.4, .3), _fv.z + rr(-.4, .4)], .06, [.8, 1.2, 2.4], .02); };
MON.keeper.fx = (m, t) => { _fv.set(.16, .8, 0).applyMatrix4(_M[8]); foeSpark(_fv.x, _fv.y, _fv.z, .4, [3, 1.5, .5], foeTw(m, t)); foeGlow(_fv.x, _fv.y, _fv.z, 1.8, [1, .5, .15], .22 * foeTw(m, t)); };
MON.shaman.fx = (m, t) => { _fv.set(0, 1.12, 0).applyMatrix4(_M[8]); foeSpark(_fv.x, _fv.y, _fv.z, .3, [.8, 2.6, 1.2], foeTw(m, t)); foeGlow(_fv.x, _fv.y, _fv.z, 1.4, [.3, 1, .45], .2 * foeTw(m, t)); };
MON.kobold.fx = (m, t, M) => { _fv.set(0, .4, .04).applyMatrix4(M); foeSpark(_fv.x, _fv.y, _fv.z, .12, [3, 1.6, .5], foeTw(m, t)); foeGlow(_fv.x, _fv.y, _fv.z, .7, [1, .5, .15], .18 * foeTw(m, t)); };
MON.cart.fx = (m, t, M) => { _fv.set(-.2, 1.36, .7).applyMatrix4(M); foeSpark(_fv.x, _fv.y, _fv.z, .4, [.8, 2.6, 1.2], foeTw(m, t)); foeGlow(_fv.x, _fv.y, _fv.z, 2.2, [.3, 1, .45], .22 * foeTw(m, t)); };
MON.warchief.fx = (m, t) => { if (rnd() < .04) fxTimed(4, m.x, m.y + .08, m.z, MON.warchief.banner[0] * 2, MON.warchief.banner[0] * 2, 1.2, .9, .4, .18, .8, { ground: true }); };

function rigSerpent(e, K, n, gap, amp, hy) {
  const s = e.scale || 1, fl = e.flash || 0, ph = e.ph || 0, B = G.B;
  const M0 = xf(_M[0], null, e.x, e.y + hy * s, e.z, -(e.flinch || 0) * .3, e.yaw + Math.sin(ph) * .25, 0, s, s, s);
  K.head.put(M0, fl, e.tint);
  if (B && e.s !== undefined) for (let k = 1; k <= n; k++) {
    const p = pathAt(B, Math.max(.2, e.s - k * gap * s), _foeP), w = ph - k * .9, lat = (e.lat || 0) + Math.sin(w) * amp * s, sc = s * (1 - k * .06);
    K.seg.put(xf(_M[k], null, p.x - p.tz * lat, p.y + hy * s * (1 - k * .05), p.z + p.tx * lat, 0, Math.atan2(p.tx, p.tz) + Math.cos(w) * .5, 0, sc, sc, sc), fl, e.tint);
  }
  return M0;
}
function rigTurtle(e) {
  const K = KIT.turtle, s = e.scale || 1, fl = e.flash || 0, ph = e.ph || 0, mv = e.mv, f = e.flipK || 0;
  const M0 = xf(_M[0], null, e.x, e.y + (.26 + f * .24) * s, e.z, -(e.flinch || 0) * .15 + Math.sin(ph * 2) * .03 * mv, e.yaw, f * PI, s, s, s);
  K.body.put(M0, fl, e.tint);
  for (let i = 0; i < 4; i++) {
    const fr = i < 2, sd = (i & 1) ? -1 : 1, a = f > .5 ? Math.sin(SH.uTime.value * 14 + i * 1.7) * .6 : Math.sin(ph * 2 + (fr === (sd > 0) ? 0 : PI)) * .6 * mv;
    K.leg.put(xf(_M[1 + i], M0, sd * .4, .04, fr ? .34 : -.34, a, 0, sd * .35), fl, e.tint);
  }
  return M0;
}
function rigCart(e) {
  const K = KIT.cart, s = e.scale || 1, fl = e.flash || 0, ph = e.ph || 0;
  const M0 = xf(_M[0], null, e.x, e.y, e.z, -(e.flinch || 0) * .1 + Math.sin(ph * 1.3) * .02, e.yaw, Math.sin(ph * .9) * .035, s, s, s);
  K.body.put(M0, fl, e.tint);
  for (const sd of [-1, 1]) K.wheel.put(xf(_M[sd > 0 ? 1 : 2], M0, sd * .46, .34, -.15, ph * .9, 0, 0), fl, e.tint);
  return M0;
}

// Models. Built once at start, on their own random stream (see initKits).
// A zombie: the footman's frame, with rotten skin, rags and bare ribs instead of mail.
function zombieKit(cap) {
  const k = {}, limb = cap * 2, sk = C(0x7f9070), skD = C(0x5a6a50), rag = C(0x544c40), ragD = C(0x3a342c), o = () => ({ l: L_CLOTH, jit: .08 });
  k.pelvis = new PartBatch(S => { S.box(.27, .14, .18, 0, 0, 0, ragD, o()); S.box(.29, .04, .19, 0, .06, 0, COL.rope, {}); clothPanel(S, { x0: -.13, x1: .1, yTop: -.03, len: .16, z: .1, col: ragD, rng: makeRng(41), sway: 0, nx: 3, ny: 2 }); }, cap, { rad: .12 });
  k.torso = new PartBatch(S => {
    S.box(.31, .38, .2, 0, .2, 0, rag, o()); S.box(.13, .2, .21, .07, .14, .005, skD, { jit: .05 });
    for (const y of [.1, .16, .22]) S.box(.12, .025, .03, .07, y, .11, COL.bone, { l: L_BONE, jit: 0 });
    S.box(.34, .08, .22, 0, .38, 0, mulC(rag, .8), o()); S.box(.14, .08, .14, 0, .44, 0, sk, {});
  }, cap, { rad: .17 });
  k.head = new PartBatch(S => {
    S.box(.18, .19, .18, 0, .12, 0, sk, { jit: .05 }); S.box(.15, .06, .12, 0, .02, .04, skD, { r: [.3, 0, 0] });
    for (const s of [-1, 1]) S.box(.05, .045, .03, s * .05, .14, .09, C(0x1a1c16), { jit: 0 });
    S.box(.08, .03, .02, 0, .05, .1, C(0x2a1a18), { jit: 0 }); S.box(.12, .03, .1, -.02, .225, -.02, C(0x2a2620), {});
  }, cap, { rad: .14 });
  k.uArm = new PartBatch(S => { S.box(.09, .24, .09, 0, -.12, 0, rag, o()); }, limb, { rad: .07, shadow: false });
  k.lArm = new PartBatch(S => { S.box(.07, .24, .07, 0, -.12, 0, sk, {}); S.box(.08, .07, .08, 0, -.27, 0, skD, {}); }, limb, { rad: .07, shadow: false });
  k.uLeg = new PartBatch(S => { S.box(.11, .28, .11, 0, -.14, 0, ragD, o()); }, limb, { rad: .08, shadow: false });
  k.lLeg = new PartBatch(S => { S.box(.09, .28, .09, 0, -.14, 0, skD, {}); S.box(.1, .06, .18, 0, -.29, .04, mulC(ragD, .8), {}); }, limb, { rad: .08, shadow: false });
  return k;
}
function initFoeKits() {
  const I = KIT.item, N = { rad: .2, shadow: false };
  KIT.orc = humanKit('ogre', 56); KIT.gob = humanKit('ogre', 72); KIT.zomb = zombieKit(64); KIT.keep = humanKit('foot', 10); KIT.shard = golemKit(20);
  I.axe = new PartBatch(S => { S.seg([0, -.14, 0], [0, .56, 0], .028, .026, COL.wood, { l: L_WOOD, n: 5 }); S.box(.035, .22, .2, 0, .46, .1, COL.iron, { l: L_METAL, rough: .5 }); S.box(.04, .26, .03, 0, .46, .205, COL.ironL, { l: L_METAL, rough: .4 }); S.box(.05, .06, .06, 0, .46, -.02, COL.iron, { l: L_METAL }); }, 72, N);
  I.spear = new PartBatch(S => { S.seg([0, -.3, 0], [0, .78, 0], .016, .014, COL.woodL, { l: L_WOOD, n: 4 }); S.cone(.035, .16, 0, .86, 0, COL.ironL, { n: 4, l: L_METAL }); S.box(.05, .05, .02, 0, .72, 0, COL.clothR, { jit: 0 }); }, 96, N);
  I.pick = new PartBatch(S => { S.seg([0, -.1, 0], [0, .5, 0], .022, .02, COL.wood, { l: L_WOOD, n: 4 }); S.seg([0, .48, -.2], [0, .52, .2], .03, .03, COL.iron, { l: L_METAL, n: 4 }); S.cone(.03, .08, 0, .5, .24, COL.ironL, { n: 4, l: L_METAL, r: [HPI, 0, 0] }); S.cone(.03, .08, 0, .5, -.24, COL.ironL, { n: 4, l: L_METAL, r: [-HPI, 0, 0] }); }, 48, N);
  I.candle = new PartBatch(S => { S.add(gDome(7, 3), { s: [.15, .1, .15], p: [0, .19, .01], c: COL.brass, l: L_METAL, rough: .45 }); S.cyl(.17, .02, 0, .19, .01, mulC(COL.brass, .8), { n: 8, l: L_METAL }); S.cyl(.022, .08, 0, .32, .04, C(0xe8e0c8), { n: 5 }); S.box(.02, .035, .02, 0, .38, .04, COL.ember, { emis: 1, jit: 0 }); }, 48, N);
  I.sling = new PartBatch(S => { S.seg([0, 0, 0], [0, .34, 0], .008, .008, COL.rope, { n: 3, jit: 0 }); S.ico(.05, 0, .38, 0, COL.leather, { d: 0, sc: [1, .6, 1] }); S.ico(.04, 0, .4, 0, COL.stone, { d: 0 }); }, 40, N);
  I.kite = new PartBatch(S => {
    const a = [-.75, 0, 0], b = [0, .05, .55], c = [.75, 0, 0], d = [0, .05, -.45], e = [0, .14, 0], c1 = C(0x8a3a2a), c2 = C(0xb08a4a);
    for (const [p, q, k] of [[a, b, 0], [b, c, 1], [c, d, 0], [d, a, 1]]) { S.tri(p, q, e, k ? c2 : c1, L_CLOTH, .9); S.tri(q, p, e, k ? c2 : c1, L_CLOTH, .9); }
    S.seg(a, c, .012, .012, COL.woodD, { n: 3 }); S.seg(b, d, .012, .012, COL.woodD, { n: 3 }); S.seg([0, 0, 0], [0, -.75, 0], .006, .006, COL.rope, { n: 3, jit: 0 });
  }, 24, { rad: .4 });
  I.totem = new PartBatch(S => {
    S.seg([0, -.5, 0], [0, .9, 0], .026, .022, COL.woodD, { l: L_WOOD, n: 5 }); PROP.skull(S, 0, .98, 0, .08, 0);
    for (let k = 0; k < 3; k++) S.box(.02, .16, .05, Math.cos(k * 2.1) * .07, .82, Math.sin(k * 2.1) * .07, k & 1 ? C(0x3a8a6a) : COL.clothR, { r: [0, k * 2.1, .4] });
    S.ico(.045, 0, 1.12, 0, [.4, 1.4, .7], { d: 1, emis: .5, jit: 0 });
  }, 16, N);
  I.boulder = new PartBatch(S => { S.rock(.26, 0, .22, 0, COL.stone, { sq: .9 }); }, 8, N);
  { const c = [.78, .78, .8], c2 = [.58, .58, .62], bk = C(0xd8a040);
    KIT.bird = {
      body: new PartBatch(S => {
        S.ico(.12, 0, 0, 0, c, { sc: [.8, .75, 1.45], d: 1 }); S.ico(.075, 0, .06, .17, c, { sc: [.9, .9, 1.05], d: 1 });
        S.cone(.026, .1, 0, .05, .27, bk, { n: 4, r: [HPI, 0, 0] }); S.box(.12, .015, .16, 0, 0, -.22, c2, { r: [.15, 0, 0] });
        for (const s of [-1, 1]) { S.box(.022, .022, .02, s * .035, .08, .22, COL.black, { jit: 0 }); S.seg([s * .04, -.08, .02], [s * .045, -.15, -.03], .012, .01, bk, { n: 3 }); }
      }, 130, { rad: .12 }),
      wing: new PartBatch(S => {
        for (let k = 0; k < 5; k++) { const x0 = .04 + k * .085, len = .2 - k * .018; S.box(.095, .012, len, x0, .005 * k, .08 - len / 2, k & 1 ? c : c2, { r: [0, -k * .08, 0] }); }
        S.box(.06, .01, .16, .44, .02, -.04, c2, { r: [0, -.45, 0] }); S.seg([0, 0, .07], [.42, .02, .05], .018, .01, c2, { n: 3 });
      }, 260, { rad: .12, shadow: false }),
    }; }
  { const sh = C(0xa8442a), sd = C(0x6a2618), cl = C(0xc8603a);
    KIT.crab = {
      body: new PartBatch(S => {
        S.ico(.2, 0, .1, 0, sh, { sc: [1.35, .5, 1.0], d: 1 }); S.ico(.14, 0, .04, 0, sd, { sc: [1.3, .5, 1.0], d: 1 });
        for (const s of [-1, 1]) {
          S.seg([s * .06, .12, .14], [s * .06, .19, .16], .012, .01, sd, { n: 3 }); S.ico(.025, s * .06, .2, .165, COL.black, { d: 0, jit: 0 });
          S.seg([s * .2, .08, .1], [s * .26, .1, .24], .035, .03, sh, { n: 4 }); S.ico(.065, s * .27, .12, .3, cl, { sc: [.8, .65, 1.3], d: 1 }); S.cone(.03, .1, s * .3, .12, .38, cl, { n: 4, r: [HPI, 0, s * -.3] });
        }
      }, 40, { rad: .25 }),
      leg: new PartBatch(S => { S.seg([0, 0, 0], [.16, .1, 0], .026, .02, sd, { n: 4 }); S.seg([.16, .1, 0], [.3, -.17, 0], .02, .008, sh, { n: 4 }); }, 320, { rad: .05, shadow: false }),
    }; }
  { const c = [.32, .24, .5], cd = [.2, .15, .32], cr = [.75, .5, 1.2];
    KIT.mite = { leg: KIT.spider.leg, body: new PartBatch(S => {
      S.ico(.16, 0, .03, -.12, c, { sc: [.95, .75, 1.2], d: 1 }); S.ico(.1, 0, 0, .08, cd, { sc: [1, .75, 1.1], d: 1 });
      for (let k = 0; k < 3; k++) S.add(gOct(), { s: [.04, .13 - k * .02, .04], p: [(k - 1) * .06, .15, -.12 - k * .04], r: [-.4, k, (k - 1) * .4], c: cr, rough: .1, emis: .35 });
      for (const s of [-1, 1]) S.box(.022, .022, .02, s * .035, .06, .17, COL.black, { jit: 0 });
    }, 110, { rad: .15 }) }; }
  { const st = [.3, .28, .34], sd = [.18, .17, .22], cr = [.7, .45, 1.15];
    const base = S => { S.ico(.22, 0, .05, -.06, st, { sc: [1.05, .72, 1.35], d: 1, l: L_ROCK }); S.ico(.12, 0, .01, .24, sd, { sc: [1, .7, 1], d: 1 }); for (const s of [-1, 1]) S.cone(.025, .12, s * .05, -.02, .36, sd, { n: 4, r: [HPI + .3, 0, s * .4] }); };
    KIT.geode = { leg: KIT.spider.leg, body: new PartBatch(S => {
      base(S); S.rock(.08, .1, .17, -.2, sd, {}); S.rock(.07, -.1, .18, .06, sd, {});
      for (let k = 0; k < 7; k++) { const a = k / 7 * TAU; S.add(gOct(), { s: [.05, .16 + (k % 3) * .05, .05], p: [Math.cos(a) * .1, .2, -.06 + Math.sin(a) * .14], r: [Math.sin(a) * .5, a, -Math.cos(a) * .5], c: cr, rough: .1, emis: .4 }); }
    }, 10, { rad: .3 }) };
    KIT.geodeB = { leg: KIT.spider.leg, body: new PartBatch(S => { base(S); for (const [x, z, r] of [[.06, -.1, .4], [-.07, .02, -.6], [0, -.25, 1.3]]) S.box(.02, .012, .18, x, .2, z, cr, { emis: .5, jit: 0, r: [0, r, 0] }); }, 10, { rad: .3 }) };
  }
  { const c = C(0x4c5a2c), cd = C(0x2e3a1c), bl = C(0xb0a458);
    KIT.eel = {
      head: new PartBatch(S => { S.ico(.12, 0, 0, .04, c, { sc: [.8, .72, 1.6], d: 1 }); S.box(.12, .04, .2, 0, -.06, .1, bl, { jit: .04 }); for (let t = 0; t < 3; t++) for (const s of [-1, 1]) S.cone(.012, .04, s * .04, -.04, .12 + t * .04, COL.bone, { n: 3, r: [PI, 0, 0] }); }, 24, { rad: .14 }),
      seg: new PartBatch(S => { S.ico(.11, 0, 0, 0, c, { sc: [.8, .78, 1.35], d: 1 }); S.box(.1, .03, .2, 0, -.07, 0, bl, { jit: .04 }); S.box(.012, .07, .2, 0, .09, 0, cd, { jit: 0 }); }, 150, { rad: .12 }),
    }; }
  { const f = C(0x3a3440), fd = C(0x26222a), pk = C(0xd89a9a);
    KIT.mole = {
      body: new PartBatch(S => {
        S.ico(.21, 0, .03, 0, f, { sc: [.85, .72, 1.3], d: 1 }); S.ico(.12, 0, 0, .26, fd, { sc: [.8, .7, 1.1], d: 1 }); S.cone(.05, .12, 0, -.01, .42, pk, { n: 6, r: [HPI, 0, 0] });
        for (let k = 0; k < 6; k++) S.cone(.012, .05, Math.cos(k * 1.05) * .04, -.01 + Math.sin(k * 1.05) * .04, .49, pk, { n: 3, r: [HPI, 0, 0] });
        for (const s of [-1, 1]) { S.box(.1, .025, .09, s * .17, -.08, .2, pk, { r: [0, s * .3, 0] }); for (let t = -1; t <= 1; t++) S.cone(.012, .06, s * .2 + t * .025, -.09, .26, COL.bone, { n: 3, r: [HPI, 0, 0] }); }
      }, 30, { rad: .18 }),
      leg: new PartBatch(S => { S.box(.06, .12, .06, 0, -.06, 0, fd, {}); S.box(.07, .03, .1, 0, -.12, .03, pk, {}); }, 120, { rad: .05, shadow: false }),
      tail: new PartBatch(S => { S.seg([0, 0, 0], [0, 0, -.12], .02, .01, pk, { n: 3 }); }, 60, { rad: .03, shadow: false }),
    }; }
  { const f = C(0xd6cdb8), fd = C(0x9a8f7c), hn = C(0x5a4a3a), hf = C(0x2a2420);
    KIT.goat = {
      body: new PartBatch(S => {
        S.ico(.19, 0, .04, .12, f, { sc: [.8, .9, 1.15], d: 1 }); S.ico(.16, 0, .02, -.18, f, { sc: [.8, .85, 1.25], d: 1 });
        S.seg([0, .1, .26], [0, .26, .4], .085, .065, f, { n: 6 }); S.ico(.085, 0, .3, .47, f, { sc: [.85, .9, 1.25], d: 1 }); S.box(.07, .07, .1, 0, .26, .57, fd, {}); S.cone(.03, .1, 0, .16, .53, fd, { n: 4, r: [PI, 0, 0] });
        for (const s of [-1, 1]) { S.seg([s * .035, .37, .45], [s * .09, .45, .36], .028, .02, hn, { n: 4 }); S.seg([s * .09, .45, .36], [s * .12, .4, .25], .02, .008, hn, { n: 4 }); S.box(.06, .025, .03, s * .08, .33, .43, fd, { r: [0, 0, s * .5] }); S.box(.022, .022, .02, s * .045, .32, .54, COL.black, { jit: 0 }); }
      }, 28, { rad: .22 }),
      leg: new PartBatch(S => { S.seg([0, 0, 0], [0, -.2, -.02], .045, .03, f, { n: 5 }); S.seg([0, -.2, -.02], [0, -.39, .02], .028, .022, fd, { n: 5 }); S.box(.05, .04, .06, 0, -.41, .03, hf, {}); }, 112, { rad: .05, shadow: false }),
      tail: new PartBatch(S => { S.seg([0, 0, 0], [0, .08, -.1], .035, .015, f, { n: 4 }); }, 28, { rad: .04, shadow: false }),
    }; }
  { const sh = C(0x4a5a3a), sd = C(0x2e3a26), sk = C(0x6a7a5a), bl = C(0xa8a070);
    KIT.turtle = {
      body: new PartBatch(S => {
        S.add(gDome(10, 4), { s: [.55, .42, .66], p: [0, .05, 0], c: sh, l: L_ROCK }); S.cyl(.58, .07, 0, .05, 0, sd, { n: 10, rz: .7 }); S.cyl(.5, .05, 0, -.01, 0, bl, { n: 10, rz: .6 });
        for (const [x, z] of [[0, 0], [.24, .2], [-.24, .2], [.24, -.2], [-.24, -.2], [0, .4], [0, -.42]]) S.rock(.11, x, .05 + .4 * Math.sqrt(Math.max(0, 1 - (x / .55) ** 2 - (z / .66) ** 2)), z, sd, { sq: .4 });
        S.seg([0, .08, .55], [0, .16, .72], .1, .09, sk, { n: 6 }); S.ico(.13, 0, .18, .8, sk, { sc: [.9, .8, 1.15], d: 1 }); S.box(.14, .03, .1, 0, .12, .9, sd, {}); S.cone(.06, .18, 0, .04, -.72, sk, { n: 5, r: [-HPI, 0, 0] });
      }, 10, { rad: .5 }),
      leg: new PartBatch(S => { S.ico(.12, 0, -.08, 0, sk, { sc: [1, 1.3, 1.15], d: 1 }); S.box(.18, .05, .2, 0, -.2, .03, sd, {}); }, 40, { rad: .1, shadow: false }),
    }; }
  { const w = C(0x5a4430), wd = C(0x3a2c20), fl = C(0x6a6a58), bn = COL.bone;
    KIT.cart = {
      body: new PartBatch(S => {
        S.box(.8, .08, 1.2, 0, .5, 0, w, { l: L_WOOD });
        for (const s of [-1, 1]) { S.box(.05, .26, 1.2, s * .4, .66, 0, wd, { l: L_WOOD }); S.seg([s * .25, .5, .6], [s * .3, .55, 1.15], .03, .03, wd, { l: L_WOOD, n: 4 }); }
        S.box(.8, .26, .05, 0, .66, -.6, wd, { l: L_WOOD }); S.box(.8, .2, .05, 0, .63, .6, wd, { l: L_WOOD });
        for (const [x, y, z, r, sx] of [[-.15, .72, -.25, .2, 1.6], [.18, .75, .1, .19, 1.5], [-.1, .8, .3, .17, 1.4], [.12, .9, -.2, .16, 1.5]]) S.ico(r, x, y, z, fl, { sc: [sx, .6, 1], d: 1, l: L_CLOTH });
        PROP.skull(S, .1, .98, .18, .08, .5); PROP.skull(S, -.2, .92, -.1, .07, -.4);
        S.seg([.25, .85, .2], [.5, 1.05, .35], .03, .025, bn, { l: L_BONE, n: 4 }); S.seg([-.25, .8, -.35], [-.48, .95, -.5], .03, .025, bn, { l: L_BONE, n: 4 });
        S.seg([-.35, .6, .55], [-.35, 1.45, .62], .022, .02, wd, { l: L_WOOD, n: 4 }); S.seg([-.35, 1.45, .62], [-.2, 1.5, .7], .016, .016, wd, { n: 3 });
        S.box(.1, .12, .1, -.2, 1.36, .7, C(0x7aff9a), { emis: .9, jit: 0 }); S.box(.12, .03, .12, -.2, 1.43, .7, COL.iron, { l: L_METAL });
      }, 8, { rad: .6 }),
      wheel: new PartBatch(S => { S.cyl(.34, .07, 0, 0, 0, wd, { n: 10, r: [0, 0, HPI], l: L_WOOD }); S.cyl(.08, .1, 0, 0, 0, COL.iron, { n: 6, r: [0, 0, HPI], l: L_METAL }); for (let k = 0; k < 4; k++) S.box(.03, .62, .04, 0, 0, 0, w, { l: L_WOOD, r: [k * PI / 4, 0, 0] }); }, 16, { rad: .3 }),
    }; }
}

// ---- abilities ----
const FOES = { on: false, shots: [] };
function foesBoard(B) { FOES.on = !!B.bio.own; FOES.shots.length = 0; }
function updateFoes(dt) {
  const B = G.B, mons = G.mons;
  for (const m of mons) { m.guard = 0; m.fk = 1; }
  for (const d of mons) {
    const def = d.def; if (d.dead || d.hp <= 0) continue;
    if (d.landY > 0) { d.landY = Math.max(0, d.landY - dt * (2 + d.landY * 3)); if (d.landY === 0) { fxDust(d.x, d.y + .05, d.z, 4, .5); sfx('crumble', d.x, d.z, .3, .8); } }
    if (def.glide && d.fly && d.s > B.L * def.glide) landFoe(d);
    if (d.stall > 0) { d.stall -= dt; d.fk = 0; }
    if (def.shell) { if (d.flipT > 0) { d.flipT -= dt; d.fk = 0; } d.flipK = damp(d.flipK || 0, d.flipT > 0 ? 1 : 0, 7, dt); }
    if (d.cracked) d.fk *= def.crack[3];
    if (!d.vis || d.dying) continue;
    if (def.heal) healAround(d, dt);
    if (def.banner) { const r2 = def.banner[0] * def.banner[0]; for (const o of mons) if (o !== d && !o.dead && !o.def.boss && dist2(o.x, o.z, d.x, d.z) < r2) o.guard = Math.max(o.guard, def.banner[1]); }
    if (def.sling) sling(d, dt);
    if (def.scream) scream(d, dt);
    if (def.throw) hurl(d, dt);
  }
  for (const f of G.men) if (f.stun > 0 && !f.dead && rnd() < dt * 6) fxPart(f.x + rr(-.15, .15), f.y + 1.45, f.z + rr(-.15, .15), rr(-.3, .3), rr(.1, .4), rr(-.3, .3), .5, .05, 1.4, 1.5, 1.9, { drag: 1 });
  const S = FOES.shots;
  for (let i = S.length - 1; i >= 0; i--) {
    const s = S[i]; s.t -= dt; if (s.t > 0) continue; swapRemove(S, i);
    if (s.man) { const f = s.man; if (f.dead || f.gone || Math.hypot(f.x - s.x, f.z - s.z) > .9) fxDust(s.x, B.heightAt(s.x, s.z) + .05, s.z, 2, .3); else hurtMan(f, s.dmg, f.x - s.fx, f.z - s.fz); }
    else if (s.tower) {
      const t = s.tower; fxDust(s.x, s.y, s.z, 8, 1, { speed: 2.5 }); fxSparks(s.x, s.y, s.z, 8, 3, 1.4, 1.2, 1, { size: .06 }); sfx('hammer', s.x, s.z, 1, .3); FX.shake = Math.min(1.2, FX.shake + .3);
      if (t.alive) { t.stun = Math.max(t.stun || 0, s.stun); fxTimed(5, t.x, t.y + 2, t.z, 3, 3, .9, .8, .6, .8, .3); }
    }
  }
}
function hurtMan(f, dmg, dx, dz) {
  if (f.dodge && rnd() < f.dodge) { fxTimed(7, f.x, f.y + .9, f.z, 1.1, 1.1, .8, .7, 1.1, .5, .14, { rot: rnd() * TAU }); return; }
  f.hp -= dmg * G.dmgMul; f.flash = 1; f.flinch = 1; sfx('arrowHit', f.x, f.z, .5, rnd());
  if (f.hp <= 0) { const l = Math.hypot(dx, dz) || 1; killFootman(f, dx / l, dz / l); }
}
function healAround(d, dt) {
  const [r, k] = d.def.heal, r2 = r * r; let any = false;
  for (const o of G.mons) {
    if (o.dead || o.def.boss || o.hp <= 0 || o.hp >= o.maxHp || dist2(o.x, o.z, d.x, d.z) > r2) continue;
    o.hp = Math.min(o.maxHp, o.hp + o.maxHp * k * dt); any = true;
    if (rnd() < dt * 3) fxPart(o.x + rr(-.2, .2), o.y + (o.fly ? 0 : o.hitH) + rr(0, .3), o.z + rr(-.2, .2), 0, rr(.5, 1), 0, rr(.5, .9), .06, .4, 1.6, .6, { drag: 1, rise: .3 });
  }
  const b0 = d.beat; d.beat += dt * 2.4;
  if (Math.floor(d.beat / TAU) !== Math.floor(b0 / TAU)) { fxTimed(4, d.x, d.y + .08, d.z, r * 2, r * 2, .4, 1.5, .6, .3, .8, { ground: true }); if (any) d.cast = 1; }
}
function throwRock(x, y, z, tx, ty, tz, T, sc) {
  _fm.compose(_fv.set(x, y, z), _fq.set(rr(-1, 1), rr(-1, 1), rr(-1, 1), 1).normalize(), _fs.setScalar(sc));
  addDebris(KIT.rubble, _fm, null, (tx - x) / T, (ty - y + 6.5 * T * T) / T, (tz - z) / T, rr(4, 9), T + .6, { bounce: .2 }); // debris falls at 13 per second squared
}
function sling(d, dt) {
  const [every, reach, dmg] = d.def.sling;
  d.slT = (d.slT === undefined ? every * (.4 + rnd() * .5) : d.slT) - dt; if (d.slT > 0) return;
  let tg = null, bd = reach * reach;
  for (const f of G.men) { if (f.dead) continue; const q = dist2(f.x, f.z, d.x, d.z); if (q < bd) { bd = q; tg = f; } }
  if (!tg) { d.slT = .4; return; }
  d.slT = every * rr(.9, 1.1); d.cast = .7; d.stall = .35;
  const T = .5 + Math.sqrt(bd) * .05;
  throwRock(d.x, d.y + d.hitH + .3, d.z, tg.x, tg.y + .8, tg.z, T, .32);
  FOES.shots.push({ t: T, man: tg, dmg, x: tg.x, z: tg.z, fx: d.x, fz: d.z });
  sfx('bow', d.x, d.z, .35, .2);
}
function scream(d, dt) {
  const [every, r, stun] = d.def.scream;
  d.scT = (d.scT === undefined ? every * (.3 + rnd() * .4) : d.scT) - dt; if (d.scT > 0) return;
  const r2 = r * r, hit = G.men.filter(f => !f.dead && dist2(f.x, f.z, d.x, d.z) < r2);
  if (!hit.length) { d.scT = .4; return; }
  d.scT = every * rr(.9, 1.1);
  for (const f of hit) { f.stun = Math.max(f.stun || 0, stun); f.flinch = 1; f.atk = -1; }
  fxTimed(4, d.x, d.y + .08, d.z, r * 2, r * 2, 1.2, 1.3, 1.6, .5, .6, { ground: true }); fxTimed(5, d.x, d.y + 1, d.z, r * 1.6, r * 1.6, .8, .9, 1.4, .5, .3);
  sfx('batScreech', d.x, d.z, .9, .05);
}
function hurl(d, dt) {
  const [every, reach, stun] = d.def.throw;
  d.thT = (d.thT === undefined ? every * (.35 + rnd() * .3) : d.thT) - dt; if (d.thT > 0) return;
  let tg = null, bd = reach * reach;
  for (const t of G.towers) { if (!t.alive || t.state !== 'active') continue; const q = dist2(t.x, t.z, d.x, d.z); if (q < bd) { bd = q; tg = t; } }
  if (!tg) { d.thT = .5; return; }
  d.thT = every * rr(.9, 1.1); d.cast = 1; d.stall = .9;
  const T = .9 + Math.sqrt(bd) * .04, top = tg.y + (tg.mounts ? tg.mounts.top : 2.5) * .8;
  throwRock(d.x, d.y + d.def.top * d.scale / d.def.scale + .2, d.z, tg.x, top, tg.z, T, 2.2);
  FOES.shots.push({ t: T, tower: tg, stun, x: tg.x, y: top, z: tg.z });
  sfx('roar', d.x, d.z, .5, .3);
}
function landFoe(m) {
  const B = G.B, q = pathNear(B, m.x, m.z, m.s, 30), maxLat = Math.max(0, ROAD_HALF + .04 - m.rad * .7);
  m.fly = false; m.s = q.s; m.lat = m.home = m.lane = clamp(q.lat, -maxLat, maxLat); m.landY = Math.max(0, m.y - B.py[q.i]); m.vx = m.vz = m.ks = m.kl = 0; m.mv = 0;
  _fm.compose(_fv.set(m.x, m.y + .5 * m.scale, m.z), _fq.setFromAxisAngle(_fs.set(0, 1, 0), m.yaw), _fs.setScalar(m.scale));
  addDebris(KIT.item.kite, _fm, null, rr(-1, 1), 1.2, rr(-1, 1), 2, 2.4, { bounce: .1 }); // the kite is let go
}
function shellHit(m, dmg, kind) {
  if (m.flipT > 0) return dmg;
  if (kind === 'blast') { m.flipT = m.def.shell[1]; m.foe = null; sfx('clash', m.x, m.z, .8, .2); fxDust(m.x, m.y + .2, m.z, 6, .8, { speed: 2 }); return dmg; }
  if (rnd() < .4) fxSparks(m.x, m.y + m.hitH, m.z, 3, 2.6, 2.2, 2, 1.6, { size: .05 });
  return dmg * (1 - m.def.shell[0]);
}
function crackFoe(m) {
  const [, ty, n] = m.def.crack; m.cracked = true;
  fxSparks(m.x, m.y + .5, m.z, 16, 4, 1.4, .9, 2.4, { size: .06, grav: 6 }); fxTimed(5, m.x, m.y + .6, m.z, 3, 3, .9, .6, 1.6, .8, .25); sfx('crumble', m.x, m.z, .9, .7);
  for (let i = 0; i < n && G.mons.length < 90; i++) { const u = n > 1 ? i / (n - 1) * 2 - 1 : 0; spawnMonster(ty, { s: Math.max(.5, m.s - .2), lat: clamp(m.lat + u * .5, -.95, .95), hpMul: m.maxHp / m.def.hp, pop: 1 }).kl = u * 2; }
}
