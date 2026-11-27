# New lands

Ideas for lands beyond the first five (Ashen Pass, Frostfall, Mirefen, Emberscar, Duskmesa). The new lands belong to a second campaign, so they never join the first campaign's cycle and do not change its balance. Later the campaigns are meant to unlock one after another.

Status: **Saltreach** and **Glimmerdeep** are being built on the `campaign` branch, as the second campaign (`#campaign=deep`). Hollowmere and Stormcrown are ideas for later.

Each land has its own look and light, a twist that changes how it plays, the monsters it favors, and a boss.

## Saltreach: a drowned coast at night

- **Look:** a broken sea wall, tide pools, shipwreck ribs half buried in black sand, and a lighthouse.
- **Light and weather:** cold sea-green light, rolling fog, rain, and a lighthouse beam sweeping across the field.
- **Twist:** the tide. It rises and falls, and at high tide the low parts of the road flood, which slows everything on them, monsters and footmen alike.
- **Favors:** toads, slimes, wraiths and drowned skeletons. Idea for later: a crab swarm that hides in its shell.
- **Boss:** the Drowned Admiral, a barnacled giant who calls drowned sailors up with him.

## Glimmerdeep: a crystal cavern

- **Look:** an open-topped chasm with no sky, only darkness above. Huge glowing crystals in violet, cyan and pink, stalagmites, and an underground lake.
- **Light:** the most colorful land. Crystals light the field, and they pulse when lightning passes near them.
- **Twist:** chain lightning that hits a monster near a crystal also makes the crystal discharge at monsters around it, so towers built near crystals pay off.
- **Favors:** cave spiders, golems, bats, scarabs and wisps.
- **Boss:** the Crystal Wyrm, which burrows underground for part of the road and comes up closer to the fire.

## Hollowmere: a ruined gothic city (later)

- **Look:** moonlit streets, a broken cathedral with glowing stained glass, a graveyard and iron fences.
- **Light and weather:** a big pale moon, cold blue shadows, warm candlelit windows, falling leaves or ash.
- **Twist:** a cathedral bell tolls now and then, and each toll briefly hurries the undead.
- **Favors:** skeletons, wraiths, necromancers, knights and ghouls.
- **Boss:** the Bell Lich, who raises the fallen near him.
- **Note:** dark and undead, so it overlaps a little with Ashen Pass.

## Stormcrown: peaks above the clouds (later)

- **Look:** narrow rock bridges over a sea of clouds, wind-bent pines, prayer flags and a stone shrine.
- **Light and weather:** a constant thunderstorm with flashes that light the whole field for an instant, and gusting wind.
- **Twist:** random lightning strikes hit the road and hurt whatever stands there; gusts push flyers and bend arrows.
- **Favors:** gargoyles, wisps, bats and drakes.
- **Boss:** the Storm Roc, the first flying boss: only towers that reach the air can hit it.
- **Note:** mountains, so it overlaps a little with Frostfall.

## Road shapes

The first campaign's roads are random walks from the cave on the left edge to the keep on the back edge (`classic` in `src/30-layout.js`). New lands use shapes laid out from a few random numbers, then checked by the same rules (no crossing, at least 6 units between stretches of road, no sharp bends) with their own length range:

- **switchback:** three long lanes stacked across the board, 7.4 to 8.1 apart, so a pad between two lanes covers both. Long (about 84 to 95).
- **horseshoe:** out toward the front and back again in one big U, often with a wide bulb. Medium (about 55 to 70).
- **ring:** joins a circle round a small castle in the middle of the board, goes most of the way round, then turns in at the castle gate. The castle replaces the keep: a round wall with four towers, a gatehouse and the beacon tower in the middle. About 64 to 80.

Each land lists its shapes (`roads` in `src/29-biome.js`) and takes the next one on each visit. Ideas for later: a fork where monsters split between two roads (needs new pathing), and a short, straight gauntlet (needs its own balance).
