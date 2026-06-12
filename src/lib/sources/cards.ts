import type { Source } from '$lib/engine/types'

// ─── Infernal category scaling ───────────────────────────────────────────────
// Verified against in-game data (all 9 categories reproduce exactly):
//   categoryMultiplier = 1 + perSet × setInfernals + perTotal × totalInfernals
// (× a separate "Bonus from Other Sources").
export const INFERNAL_SCALING = {
  ore: { input: 'infernalOreCards', perSet: 0.12, perTotal: 0.02 },
  bar: { input: 'infernalBarCards', perSet: 0.12, perTotal: 0.02 },
  misc: { input: 'infernalMiscCards', perSet: 0.02, perTotal: 0 },
  drone: { input: 'infernalDroneCards', perSet: 0.3, perTotal: 0.002 },
  pet: { input: 'infernalPetCards', perSet: 0.5, perTotal: 0.002 },
  vein: { input: 'infernalVeinCards', perSet: 0.15, perTotal: 0.01 },
  star: { input: 'infernalStarCards', perSet: 0.2, perTotal: 0.01 },
  fish: { input: 'infernalFishCards', perSet: 0.08, perTotal: 0.005 },
  legendaryFish: { input: 'infernalLegendaryFishCards', perSet: 0.2, perTotal: 0.001 },
} as const

type InfernalCategory = keyof typeof INFERNAL_SCALING

const categoryMultiplier = (cat: InfernalCategory, rt: Record<string, number>) => {
  const c = INFERNAL_SCALING[cat]
  return 1 + c.perSet * (rt[c.input] ?? 0) + c.perTotal * (rt['totalInfernalCards'] ?? 0)
}

// ─── Rarity track helpers ────────────────────────────────────────────────────
// Card level scale: 0 = unowned, 1 = Standard, 2 = Gilded, 3 = Polychrome,
// 4 = Infernal.
//
// Two Infernal semantics (confirmed in-game):
// - REPLACE (Misc, Legendary Fish, and the per-resource sets): the Infernal
//   value REPLACES the Polychrome one. In multiplier shape that's
//   1 + (poly − 1) × categoryMultiplier; in bonus shape, bonus × multiplier
//   (the same identity expressed both ways).
// - KEEP (Drone, Pet, Archaeology): the Polychrome primary bonus is kept
//   unchanged and a separate Infernal secondary effect is added (infT).

/** KEEP-semantics multiplier track: clamps at the Polychrome value. */
const keepMul = (st: number, g: number, p: number) => (n: number) =>
  n <= 0 ? 1 : n === 1 ? st : n === 2 ? g : p
/** KEEP-semantics bonus track: clamps at the Polychrome value. */
const keepAdd = (st: number, g: number, p: number) => (n: number) =>
  n <= 0 ? 0 : n === 1 ? st : n === 2 ? g : p

/** REPLACE-semantics multiplier track: Infernal = 1 + (poly − 1) × catMult. */
const replMul =
  (cat: InfernalCategory) =>
  (st: number, g: number, p: number) =>
  (n: number, rt: Record<string, number>) =>
    n <= 0
      ? 1
      : n === 1
        ? st
        : n === 2
          ? g
          : n === 3
            ? p
            : 1 + (p - 1) * categoryMultiplier(cat, rt)
/** REPLACE-semantics bonus track: Infernal = poly bonus × catMult. */
const replAdd =
  (cat: InfernalCategory) =>
  (st: number, g: number, p: number) =>
  (n: number, rt: Record<string, number>) =>
    n <= 0 ? 0 : n === 1 ? st : n === 2 ? g : n === 3 ? p : p * categoryMultiplier(cat, rt)

const miscMul = replMul('misc')
const miscAdd = replAdd('misc')
const legAdd = replAdd('legendaryFish')

/** Infernal-only secondary effect (KEEP categories), scaled by the category multiplier. */
const infT = (v: number, cat: InfernalCategory) => (n: number, rt: Record<string, number>) =>
  n >= 4 ? v * categoryMultiplier(cat, rt) : 0

const card = (key: string, name: string, fn: Source['fn'], maxLevel = 4): Source => ({
  key: `cards.${key}`,
  name: `Card: ${name}`,
  system: 'cards',
  maxLevel,
  fn,
  inputs: [],
})

// ─── Ore Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────
// Formula is (base(4)+Cetus+Upgrades)*(1+pets)*bundle*tribute

// ─── Pet Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────
// ─── Misc cards (REPLACE semantics: Infernal scales the Polychrome value) ───
// Nagini is the Pet-set card (KEEP semantics; Infernal effect = cardPetNaginiInf).
export const cardNagini = card('pet.nagini', 'Nagini Pet', keepAdd(0.01, 0.02, 0.04))
export const cardAlex = card('alex', 'Alex', miscMul(1.1, 1.2, 1.4))
export const cardBone = card('bone', 'Bone', miscMul(1.05, 1.1, 1.15))
export const cardWorld1 = card('world1', 'World 1', miscMul(1.06, 1.12, 1.24))
export const cardWorld2 = card('world2', 'World 2', miscMul(1.06, 1.12, 1.24))
export const cardWorld3 = card('world3', 'World 3', miscMul(1.06, 1.12, 1.24))
export const cardWorld4 = card('world4', 'World 4', miscMul(1.06, 1.12, 1.24))
export const cardCeliosHat = card('celiosHat', "Celio's Hat", miscMul(1.1, 1.2, 1.4))
export const cardJulk = card('julk', 'Julk', miscMul(1.04, 1.08, 1.12))
export const cardLootbug = card('lootbug', 'Lootbug', miscMul(1.1, 1.2, 1.3))
export const cardGoldenLootbug = card('goldenLootbug', 'Golden Lootbug', miscAdd(0.02, 0.04, 0.06))
export const cardGoldenOre = card('goldenOre', 'Golden Ore', miscMul(1.06, 1.12, 1.24))
export const cardGoldenVein = card('goldenVein', 'Golden Vein', miscMul(1.08, 1.16, 1.24))
export const cardRainbowVein = card('rainbowVein', 'Rainbow Vein', miscMul(1.08, 1.16, 1.24))
export const cardFuel = card('fuel', 'Fuel', miscMul(1.02, 1.05, 1.1))
export const cardCode = card('code', 'Code', miscMul(1.01, 1.03, 1.06))
export const cardVoidPortal = card('voidPortal', 'Void Portal', miscMul(1.05, 1.1, 1.2))
export const cardGoldenVoidPortal = card(
  'goldenVoidPortal',
  'Golden Void Portal',
  miscMul(1.08, 1.16, 1.24),
)
export const cardFreebie = card('freebie', 'Freebie', miscAdd(1, 2, 4))
export const cardSuperStar = card('superStar', 'Super Star', miscMul(1.05, 1.1, 1.2))
export const cardMinerName = card('minerName', 'Miner Name', miscMul(1.1, 1.2, 1.4))
export const cardStonks = card('stonks', 'Stonks', miscMul(1.1, 1.2, 1.3))
export const cardSuperStonks = card('superStonks', 'Super Stonks', miscAdd(0.005, 0.01, 0.02))
export const cardPrestige = card('prestige', 'Prestige', miscMul(0.95, 0.9, 0.8))
export const cardYummyPizza = card('yummyPizza', 'Yummy Pizza', miscMul(1.01, 1.02, 1.03))
export const cardLootfrog = card('lootfrog', 'Lootfrog', miscAdd(1, 2, 4))
export const cardFrozenAra = card('frozenAra', 'FrozenAra', miscAdd(0.001, 0.002, 0.003))
export const cardFishingRod = card('fishingRod', 'Fishing Rod', miscMul(1.02, 1.05, 1.1))

// ─── Misc cards (additions from the Cards wiki dump) ─────────────────────────
export const cardNovagiant = card('novagiant', 'Novagiant Combo', miscMul(1.08, 1.16, 1.24))
export const cardUltraStonks = card('ultraStonks', 'Ultra Stonks', miscAdd(0.005, 0.01, 0.02))
export const cardContract = card('contract', 'Contract', miscAdd(1, 2, 3))
export const cardBlueCow = card('blueCow', 'Blue Cow', miscAdd(0.05, 0.1, 0.15))
export const cardArchAbility = card('archAbility', 'Arch Ability', miscAdd(-0.03, -0.06, -0.1))
export const cardGleamingVein = card('gleamingVein', 'Gleaming Vein', miscMul(1.08, 1.16, 1.24))
export const cardBigLootfrog = card('bigLootfrog', 'Big Lootfrog', miscMul(1.09, 1.18, 1.27))
export const cardFloor73 = card('floor73', 'Floor 73', miscMul(1.02, 1.04, 1.06))
export const cardRelicChest = card('relicChest', 'Relic', miscAdd(0.01, 0.02, 0.03))
/** Store: Freebie Timer −2s/−4s/−6s. */
export const cardStoreFreebieTimer = card('storeFreebieTimer', 'Store', miscAdd(-2, -4, -6))
export const cardGoldenLootfrog = card(
  'goldenLootfrog',
  'Golden Lootfrog',
  miscAdd(0.005, 0.01, 0.02),
)
export const cardLute = card('lute', 'Lute', miscMul(1.06, 1.12, 1.18))
export const cardVydn = card('vydn', 'Vydn', miscMul(1.04, 1.08, 1.12))
export const cardRainbowVoidPortal = card(
  'rainbowVoidPortal',
  'Rainbow Void Portal',
  miscMul(1.08, 1.16, 1.24),
)

// ─── Pet cards: primary track (Standard/Gilded/Polychrome) ───────────────────
export const cardPetCrab = card('pet.crab', 'Crab Pet', keepAdd(0.05, 0.1, 0.15))
export const cardPetDwarfSuperCrit = card('pet.dwarf', 'Dwarf Pet', keepAdd(0.03, 0.06, 0.1))
export const cardPetDwarfUltraCrit = card('pet.dwarf', 'Dwarf Pet', keepAdd(0.03, 0.06, 0.1))
export const cardPetDuck = card('pet.duck', 'Duck Pet', keepAdd(0.05, 0.1, 0.15))
export const cardPetRabbit = card('pet.rabbit', 'Rabbit Pet', keepMul(0.94, 0.88, 0.8))
export const cardPetPenguin = card('pet.penguin', 'Penguin Pet', keepAdd(1, 2, 4))
export const cardPetAxolotl = card('pet.axolotl', 'Axolotl Pet', keepAdd(-0.03, -0.06, -0.1))
export const cardPetWhale = card('pet.whale', 'Whale Pet', keepAdd(0.05, 0.1, 0.15))
export const cardPetTotem = card('pet.totem', 'Totem Pet', keepAdd(0.1, 0.2, 0.3))
export const cardPetHappyBot = card('pet.happyBot', 'Happy-Bot Pet', keepAdd(1, 2, 3))
export const cardPetLeprechaun = card('pet.leprechaun', 'Leprechaun Pet', keepAdd(0.1, 0.2, 0.3))
export const cardPetStarfish = card('pet.starfish', 'Starfish Pet', keepAdd(0.05, 0.1, 0.15))
export const cardPetDino = card('pet.dino', 'Dino Pet', keepMul(1.5, 2, 4))
export const cardPetMrNibbles = card('pet.mrNibbles', 'Mr Nibbles Pet', keepAdd(0.01, 0.02, 0.04))
export const cardPetButterfly = card('pet.butterfly', 'Butterfly Pet', keepAdd(0.12, 0.24, 0.5))

// ─── Pet cards: Infernal secondary effects (active at level 4) ───────────────
export const cardPetCrabInf = card('pet.crab', 'Infernal Crab Pet', infT(0.0325, 'pet'))
export const cardPetDwarfInf = card('pet.dwarf', 'Infernal Dwarf Pet', infT(0.25, 'pet'))
export const cardPetDuckInf = card('pet.duck', 'Infernal Duck Pet', infT(0.09, 'pet'))
export const cardPetRabbitInf = card('pet.rabbit', 'Infernal Rabbit Pet', infT(0.025, 'pet'))
export const cardPetPenguinInf = card('pet.penguin', 'Infernal Penguin Pet', infT(0.06, 'pet'))
export const cardPetAxolotlInf = card('pet.axolotl', 'Infernal Axolotl Pet', infT(0.04, 'pet'))
export const cardPetWhaleInf = card('pet.whale', 'Infernal Whale Pet', infT(0.1, 'pet'))
export const cardPetTotemInf = card('pet.totem', 'Infernal Totem Pet', infT(0.065, 'pet'))
export const cardPetHappyBotInf = card(
  'pet.happyBot',
  'Infernal Happy-Bot Pet',
  infT(0.0002, 'pet'),
)
export const cardPetLeprechaunInf = card(
  'pet.leprechaun',
  'Infernal Leprechaun Pet',
  infT(0.0085, 'pet'),
)
export const cardPetStarfishInf = card('pet.starfish', 'Infernal Starfish Pet', infT(0.0025, 'pet'))
export const cardPetDinoInf = card('pet.dino', 'Infernal Dino Pet', infT(0.0085, 'pet'))
export const cardPetMrNibblesInf = card(
  'pet.mrNibbles',
  'Infernal Mr Nibbles Pet',
  infT(0.009, 'pet'),
)
export const cardPetNaginiInf = card('pet.nagini', 'Infernal Nagini Pet', infT(0.03, 'pet'))
export const cardPetButterflyInf = card(
  'pet.butterfly',
  'Infernal Butterfly Pet',
  infT(0.04, 'pet'),
)

// ─── Drone cards: grade caps + Infernal secondary effects ────────────────────
// NOTE: the wiki lists a further "+0.30x/+0.002x" set/total Infernal scaling on
// drone card effects; its exact interaction is unverified and NOT applied yet.
export const cardDroneBearCap = card('drone.bear', 'Bear Drone', keepAdd(2, 5, 10))
export const cardDroneChainCap = card('drone.chain', 'Chain Drone', keepAdd(2, 5, 10))
export const cardDroneMidasCap = card('drone.midas', 'Midas Drone', keepAdd(2, 5, 10))
export const cardDroneFroggerCap = card('drone.frogger', 'Frogger Drone', keepAdd(2, 5, 10))
export const cardDroneVeinseekerCap = card(
  'drone.veinseeker',
  'Veinseeker Drone',
  keepAdd(2, 5, 10),
)
export const cardDroneStarburstCap = card('drone.starburst', 'Starburst Drone', keepAdd(2, 5, 10))
export const cardDroneElixirCap = card('drone.elixir', 'Elixir Drone', keepAdd(2, 5, 10))
export const cardDroneVoidCap = card('drone.void', 'Void Drone', keepAdd(2, 5, 10))
export const cardDroneAnglerCap = card('drone.angler', 'Angler Drone', keepAdd(2, 5, 10))
export const cardDronePrismCap = card('drone.prism', 'Prism Drone', keepAdd(2, 5, 10))
export const cardDroneBearInf = card('drone.bear', 'Infernal Bear Drone', infT(0.45, 'drone'))
export const cardDroneChainInf = card('drone.chain', 'Infernal Chain Drone', infT(0.14, 'drone'))
export const cardDroneMidasInf = card('drone.midas', 'Infernal Midas Drone', infT(0.06, 'drone'))
export const cardDroneFroggerInf = card(
  'drone.frogger',
  'Infernal Frogger Drone',
  infT(0.1, 'drone'),
)
export const cardDroneVeinseekerInf = card(
  'drone.veinseeker',
  'Infernal Veinseeker Drone',
  infT(0.11, 'drone'),
)
export const cardDroneStarburstInf = card(
  'drone.starburst',
  'Infernal Starburst Drone',
  infT(0.09, 'drone'),
)
export const cardDroneElixirInf = card('drone.elixir', 'Infernal Elixir Drone', infT(0.07, 'drone'))
export const cardDroneVoidInf = card('drone.void', 'Infernal Void Drone', infT(0.09, 'drone'))
export const cardDroneAnglerInf = card('drone.angler', 'Infernal Angler Drone', infT(0.11, 'drone'))
// Prism value confirmed in-game ('?' on the wiki).
export const cardDronePrismInf = card('drone.prism', 'Infernal Prism Drone', infT(0.01, 'drone'))

// ─── Legendary Fish cards (REPLACE semantics: Infernal = poly bonus × the ────
// legendary-fish category multiplier) ─────────────────────────────────────────
export const cardLegRainbowTrout = card('leg.rainbowTrout', 'Rainbow Trout', legAdd(0.25, 0.5, 1.0))
export const cardLegDuneEelworm = card('leg.duneEelworm', "Dune's Eelworm", legAdd(0.4, 0.8, 1.4))
export const cardLegShellstealer = card(
  'leg.glacialShellstealer',
  'Glacial Shellstealer',
  legAdd(0.3, 0.6, 1.0),
)
export const cardLegMegalodon = card('leg.megalodon', 'Megalodon', legAdd(0.35, 0.7, 1.25))
export const cardLegRadioactiveSlugBomb = card(
  'leg.radioactiveSlug',
  'Radioactive Slug',
  legAdd(3, 5, 11),
)
export const cardLegRadioactiveSlugExp = card(
  'leg.radioactiveSlug',
  'Radioactive Slug',
  legAdd(3, 5, 11),
)
export const cardLegGeoduck = card(
  'leg.glimmeringGeoduck',
  'Glimmering Geoduck',
  legAdd(0.14, 0.28, 0.52),
)
export const cardLegLaviathan = card('leg.laviathan', 'Laviathan', legAdd(0.4, 0.8, 1.4))
export const cardLegStormSerpent = card(
  'leg.stormSerpent',
  'Storm Serpent',
  legAdd(0.14, 0.28, 0.56),
)
export const cardLegMeltingGibbous = card(
  'leg.meltingGibbous',
  'Melting Gibbous',
  legAdd(0.1, 0.2, 0.3),
)
export const cardLegBlackenedBasker = card(
  'leg.blackenedBasker',
  'Blackened Basker',
  legAdd(0.0015, 0.003, 0.006),
)
// Cthulhu card (Divine Relics Cap +1/+2/+4) has no registry stat yet.

// ─── Bomb cards ──────────────────────────────────────────────────────────────
// Max level 3: bomb cards cannot be Ignited (no Infernal bomb set). Their own
// effect ("On Recharge: 50% to gain 2x bomb") is not a tracked stat; these
// sources exist so a Cards page can track levels and feed card-count runtime
// inputs (cardsOwned, polyCardCount) used by per-card upgrades and skills.
export const cardBombBasicBomb = card('bomb.basicBomb', 'Basic Bomb', () => 0, 3)
export const cardBombChainBomb = card('bomb.chainBomb', 'Chain Bomb', () => 0, 3)
export const cardBombBombOfPlenty = card('bomb.bombOfPlenty', 'Bomb of Plenty', () => 0, 3)
export const cardBombExpBomb = card('bomb.expBomb', 'Exp Bomb', () => 0, 3)
export const cardBombMegabomb = card('bomb.megabomb', 'MEGABOMB', () => 0, 3)
export const cardBombInfinityBomb = card('bomb.infinityBomb', 'Infinity Bomb', () => 0, 3)
export const cardBombTransmuterBomb = card('bomb.transmuterBomb', 'Transmuter Bomb', () => 0, 3)
export const cardBombGemBomb = card('bomb.gemBomb', 'Gem Bomb', () => 0, 3)
export const cardBombCherryBomb = card('bomb.cherryBomb', 'Cherry Bomb', () => 0, 3)
export const cardBombBatteryBomb = card('bomb.batteryBomb', 'Battery Bomb', () => 0, 3)
export const cardBombD20Bomb = card('bomb.d20Bomb', 'D20 Bomb', () => 0, 3)
export const cardBombFoundersBomb = card('bomb.foundersBomb', 'Founders Bomb', () => 0, 3)
export const cardBombVeinmorpherBomb = card('bomb.veinmorpherBomb', 'Veinmorpher Bomb', () => 0, 3)

// ─── Infernal resource-card set bonuses ──────────────────────────────────────
// InfernalBonus = 1 + perSet × (set infernals) + perTotal × (total infernals).
// Combined card multiplier = 1 + (PolyBonus − 1) × InfernalBonus
// (see formulas/cardMath.ts). The base 1 lives in the registry stat.
const TOTAL_INFERNAL_INPUT = {
  key: 'totalInfernalCards',
  label: 'Total Infernal Cards Owned',
  type: 'integer' as const,
  min: 0,
}
const infernalSetBonus = (
  cat: InfernalCategory,
  key: string,
  name: string,
  setLabel: string,
): Source => ({
  key: `cards.${key}`,
  name,
  system: 'cards',
  fn: (_l, rt) => categoryMultiplier(cat, rt) - 1,
  inputs: [
    { key: INFERNAL_SCALING[cat].input, label: setLabel, type: 'integer' as const, min: 0 },
    TOTAL_INFERNAL_INPUT,
  ],
})
export const infernalBonusOre = infernalSetBonus(
  'ore',
  'infernal.ore',
  'Infernal Ore Card Bonus',
  'Infernal Ore Cards Owned',
)
export const infernalBonusBar = infernalSetBonus(
  'bar',
  'infernal.bar',
  'Infernal Bar Card Bonus',
  'Infernal Bar Cards Owned',
)
export const infernalBonusVein = infernalSetBonus(
  'vein',
  'infernal.vein',
  'Infernal Vein Card Bonus',
  'Infernal Vein Cards Owned',
)
export const infernalBonusStar = infernalSetBonus(
  'star',
  'infernal.star',
  'Infernal Star Card Bonus',
  'Infernal Star Cards Owned',
)
export const infernalBonusFish = infernalSetBonus(
  'fish',
  'infernal.fish',
  'Infernal Fish Card Bonus',
  'Infernal Fish Cards Owned',
)
export const infernalBonusMisc = infernalSetBonus(
  'misc',
  'infernal.misc',
  'Infernal Misc Card Bonus',
  'Infernal Misc Cards Owned',
)
export const infernalBonusDrone = infernalSetBonus(
  'drone',
  'infernal.drone',
  'Infernal Drone Card Bonus',
  'Infernal Drone Cards Owned',
)
export const infernalBonusPet = infernalSetBonus(
  'pet',
  'infernal.pet',
  'Infernal Pet Card Bonus',
  'Infernal Pet Cards Owned',
)
export const infernalBonusLegendaryFish = infernalSetBonus(
  'legendaryFish',
  'infernal.legendaryFish',
  'Infernal Legendary Fish Card Bonus',
  'Infernal Legendary Fish Cards Owned',
)

export const cardSources = {
  cardNagini,
  cardAlex,
  cardBone,
  cardWorld1,
  cardWorld2,
  cardWorld3,
  cardWorld4,
  cardCeliosHat,
  cardJulk,
  cardLootbug,
  cardGoldenLootbug,
  cardGoldenOre,
  cardGoldenVein,
  cardRainbowVein,
  cardFuel,
  cardCode,
  cardVoidPortal,
  cardGoldenVoidPortal,
  cardFreebie,
  cardSuperStar,
  cardMinerName,
  cardStonks,
  cardSuperStonks,
  cardPrestige,
  cardYummyPizza,
  cardLootfrog,
  cardFrozenAra,
  cardFishingRod,
  cardNovagiant,
  cardUltraStonks,
  cardContract,
  cardBlueCow,
  cardArchAbility,
  cardGleamingVein,
  cardBigLootfrog,
  cardFloor73,
  cardRelicChest,
  cardStoreFreebieTimer,
  cardGoldenLootfrog,
  cardLute,
  cardVydn,
  cardRainbowVoidPortal,
  cardPetCrab,
  cardPetDwarfSuperCrit,
  cardPetDwarfUltraCrit,
  cardPetDuck,
  cardPetRabbit,
  cardPetPenguin,
  cardPetAxolotl,
  cardPetWhale,
  cardPetTotem,
  cardPetHappyBot,
  cardPetLeprechaun,
  cardPetStarfish,
  cardPetDino,
  cardPetMrNibbles,
  cardPetButterfly,
  cardPetCrabInf,
  cardPetDwarfInf,
  cardPetDuckInf,
  cardPetRabbitInf,
  cardPetPenguinInf,
  cardPetAxolotlInf,
  cardPetWhaleInf,
  cardPetTotemInf,
  cardPetHappyBotInf,
  cardPetLeprechaunInf,
  cardPetStarfishInf,
  cardPetDinoInf,
  cardPetMrNibblesInf,
  cardPetNaginiInf,
  cardPetButterflyInf,
  cardDroneBearCap,
  cardDroneChainCap,
  cardDroneMidasCap,
  cardDroneFroggerCap,
  cardDroneVeinseekerCap,
  cardDroneStarburstCap,
  cardDroneElixirCap,
  cardDroneVoidCap,
  cardDroneAnglerCap,
  cardDronePrismCap,
  cardDroneBearInf,
  cardDroneChainInf,
  cardDroneMidasInf,
  cardDroneFroggerInf,
  cardDroneVeinseekerInf,
  cardDroneStarburstInf,
  cardDroneElixirInf,
  cardDroneVoidInf,
  cardDroneAnglerInf,
  cardDronePrismInf,
  cardLegRainbowTrout,
  cardLegDuneEelworm,
  cardLegShellstealer,
  cardLegMegalodon,
  cardLegRadioactiveSlugBomb,
  cardLegRadioactiveSlugExp,
  cardLegGeoduck,
  cardLegLaviathan,
  cardLegStormSerpent,
  cardLegMeltingGibbous,
  cardLegBlackenedBasker,
  cardBombBasicBomb,
  cardBombChainBomb,
  cardBombBombOfPlenty,
  cardBombExpBomb,
  cardBombMegabomb,
  cardBombInfinityBomb,
  cardBombTransmuterBomb,
  cardBombGemBomb,
  cardBombCherryBomb,
  cardBombBatteryBomb,
  cardBombD20Bomb,
  cardBombFoundersBomb,
  cardBombVeinmorpherBomb,
  infernalBonusOre,
  infernalBonusBar,
  infernalBonusVein,
  infernalBonusStar,
  infernalBonusFish,
  infernalBonusMisc,
  infernalBonusDrone,
  infernalBonusPet,
  infernalBonusLegendaryFish,
}
