# Enemies

Each enemy is one line in `MON` (stats and abilities), one line in `ROSTER` (how it comes in waves), a body in `RIGS` and glowing eyes in `EYES`. The first campaign's enemies are in `src/61-monsters.js` and `src/62-game.js`; the second campaign's own enemies are all in `src/64-foes.js`.

A land picks from the roster with its `mobs` weights and can bring an enemy in earlier with `early`. The first campaign's lands start from every enemy's default weight. The second campaign's lands (`own: true`) list exactly what they send. A land's `filler` is the enemy sent when the wave can't afford what it picked (`skel` unless the land says otherwise).

## First campaign (The Cinder Road)

| Role | Enemies |
| --- | --- |
| Bulk | Skeleton, Giant rat, Cave spider, Bat, Wisp, Dire wolf, Ghoul |
| Come out of others | Slimelet (from the Slime), Scarab (from the Mummy, and in swarms in Duskmesa) |
| Specialists | Slime, Skeleton knight, Sapper, Wraith, Bog toad, War drummer, Gargoyle, Necromancer, Mummy, Ash thief, Rust hag |
| Heavies | Troll, Golem, Brood mother, Shield warden, Ember drake |
| Bosses | Bone Giant, Ogre, Frost Jotun, Brood Queen, Magma Colossus, Buried King |

## Second campaign (The Far Reaches)

Its lands also use some of the first campaign's enemies. The bosses are the Drowned Admiral, the Crystal Wyrm, the Bell Lich and the Storm Roc.

| Enemy | Lands | Role | What it does |
| --- | --- | --- | --- |
| Orc grunt | Saltreach (filler), Stormcrown | bulk | A tougher skeleton with an axe |
| Goblin | Glimmerdeep, Stormcrown (filler) | bulk | Small and quick, in crowds of 4 to 8 |
| Vulture | Stormcrown | bulk flyer | Slower and tougher than a bat |
| Zombie | Hollowmere (filler), Saltreach | bulk | Slow, but takes a lot of killing; counts as undead |
| Gull | Saltreach | bulk flyer | Flocks of 5 to 9 small flyers |
| Shore crab | Saltreach | bulk | Lightly armored, walks sideways |
| Kobold miner | Glimmerdeep (filler) | bulk | Small, many, a candle on every head |
| Crystal mite | Glimmerdeep | bulk | Tiny and fast, slips past footmen; also comes out of shard golems and geode beetles |
| Carrion crow | Hollowmere | bulk flyer | Flocks of black flyers |
| Mountain goat | Stormcrown | bulk | Leaps over footmen |
| Orc shaman | Saltreach, Stormcrown | specialist | Heals the enemies around it |
| Goblin slinger | Glimmerdeep, Stormcrown | specialist | Throws stones at footmen from range |
| Drowned siren | Saltreach | specialist | Her song makes nearby towers shoot slower |
| Moray eel | Saltreach | specialist | Swims fast through the tide, slips past footmen |
| Burrowing mole | Glimmerdeep | specialist | Digs under the road, where nothing can hit it |
| Shard golem | Glimmerdeep | specialist | Armored; breaks into crystal mites |
| Banshee | Hollowmere | specialist | Her scream stuns footmen |
| Gravekeeper | Hollowmere | specialist | Hurries the undead around him |
| Spark sprite | Stormcrown | specialist | Lightning (Thunder, the crystals, the storm) does nothing to it |
| Kite rider | Stormcrown | specialist | Glides over the first part of the road, then lands and runs |
| Orc warchief | Saltreach, Stormcrown | heavy | His banner takes a share off the damage to enemies around him |
| Shellback | Saltreach | heavy | Its shell turns most harm until an explosion flips it on its back |
| Geode beetle | Glimmerdeep | heavy | Armored until its shell cracks at half health; then mites pour out and it runs faster |
| Corpse cart | Hollowmere | heavy | Drops zombies as it rolls, and more when it breaks |
| Hill giant | Stormcrown | heavy | Throws boulders that stun a tower |

## Adding an enemy

1. A `MON` line: health, speed, size, bounty, lives, abilities (the ability keys are listed at the top of `src/64-foes.js` and in `src/61-monsters.js`).
2. A `ROSTER` line: `RO(cost, smallest group, largest group, seconds between, first wave, weight)`. Use weight 0 for an enemy that only lands that name it should send.
3. A body in `RIGS`: most reuse a shared body (`rigHuman` with the skeleton, ogre, golem or zombie kit; `rigBat`, `rigSpider`, `rigRat`, `rigWolf`, `rigWraith` with their own kit) plus props.
4. `EYES`: where its eyes glow, or `null`.
5. Add it to the `mobs` of the lands that should send it.
