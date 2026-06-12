import type { Source } from '$lib/engine/types'

// ─── Ore Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────
// Formula is (base(4)+Cetus+Upgrades)*(1+pets)*bundle*tribute

// ─── Pet Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────
export const cardNagini: Source = {
  key: 'cards.nagini',
  name: 'Card: Nagini',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([0, 0.01, 0.02, 0.04] as const)[Math.min(n, 3)],
  inputs: [],
}

// ─── Misc Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────

/** Alex: Pickaxe Damage ×1.10 / ×1.20 / ×1.40 */
export const cardAlex: Source = {
  key: 'cards.alex',
  name: 'Card: Alex',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.1, 1.2, 1.4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Bone: Bomb Damage ×1.05 / ×1.10 / ×1.15 */
export const cardBone: Source = {
  key: 'cards.bone',
  name: 'Card: Bone',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.05, 1.1, 1.15] as const)[Math.min(n, 3)],
  inputs: [],
}

/** World 1: Golden Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld1: Source = {
  key: 'cards.world1',
  name: 'Card: World 1',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** World 2: Rainbow Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld2: Source = {
  key: 'cards.world2',
  name: 'Card: World 2',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** World 3: Galactic Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld3: Source = {
  key: 'cards.world3',
  name: 'Card: World 3',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** World 4: All Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld4: Source = {
  key: 'cards.world4',
  name: 'Card: World 4',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Celio's Hat: Prestige Point Gain ×1.10 / ×1.20 / ×1.40 */
export const cardCeliosHat: Source = {
  key: 'cards.celiosHat',
  name: "Card: Celio's Hat",
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.1, 1.2, 1.4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Julk: Ore Sell Price ×1.04 / ×1.08 / ×1.12 */
export const cardJulk: Source = {
  key: 'cards.julk',
  name: 'Card: Julk',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.04, 1.08, 1.12] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Lootbug: Lootbug Loot Multi ×1.10 / ×1.20 / ×1.30 */
export const cardLootbug: Source = {
  key: 'cards.lootbug',
  name: 'Card: Lootbug',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.1, 1.2, 1.3] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Golden Lootbug: Golden Lootbug Chance +2% / +4% / +6% */
export const cardGoldenLootbug: Source = {
  key: 'cards.goldenLootbug',
  name: 'Card: Golden Lootbug',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([0, 0.02, 0.04, 0.06] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Golden Ore: Golden Ore Multi ×1.06 / ×1.12 / ×1.24 */
export const cardGoldenOre: Source = {
  key: 'cards.goldenOre',
  name: 'Card: Golden Ore',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Golden Vein: Golden Vein Multi ×1.08 / ×1.16 / ×1.24 */
export const cardGoldenVein: Source = {
  key: 'cards.goldenVein',
  name: 'Card: Golden Vein',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.08, 1.16, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Rainbow Vein: Rainbow Vein Multi ×1.08 / ×1.16 / ×1.24 */
export const cardRainbowVein: Source = {
  key: 'cards.rainbowVein',
  name: 'Card: Rainbow Vein',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.08, 1.16, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Fuel: Coal/Drone Fuel Duration ×1.02 / ×1.05 / ×1.10 */
export const cardFuel: Source = {
  key: 'cards.fuel',
  name: 'Card: Fuel',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.02, 1.05, 1.1] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Code: Item Duration ×1.01 / ×1.03 / ×1.06 */
export const cardCode: Source = {
  key: 'cards.code',
  name: 'Card: Code',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.01, 1.03, 1.06] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Void Portal: Void Portal Multi ×1.05 / ×1.10 / ×1.20 */
export const cardVoidPortal: Source = {
  key: 'cards.voidPortal',
  name: 'Card: Void Portal',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.05, 1.1, 1.2] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Golden Void Portal: Golden Void Portal Multi ×1.08 / ×1.16 / ×1.24 */
export const cardGoldenVoidPortal: Source = {
  key: 'cards.goldenVoidPortal',
  name: 'Card: Golden Void Portal',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.08, 1.16, 1.24] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Freebie: Gems From Freebie +1 / +2 / +4 */
export const cardFreebie: Source = {
  key: 'cards.freebie',
  name: 'Card: Freebie',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Super Star: All Star Value ×1.05 / ×1.10 / ×1.20 */
export const cardSuperStar: Source = {
  key: 'cards.superStar',
  name: 'Card: Super Star',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.05, 1.1, 1.2] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Miner Name: Experience Gain ×1.10 / ×1.20 / ×1.40 */
export const cardMinerName: Source = {
  key: 'cards.minerName',
  name: 'Card: Miner Name',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.1, 1.2, 1.4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Stonks: Stonks Multi ×1.10 / ×1.20 / ×1.30 */
export const cardStonks: Source = {
  key: 'cards.stonks',
  name: 'Card: Stonks',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.1, 1.2, 1.3] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Super Stonks: Super Stonks Chance +0.50% / +1% / +2% */
export const cardSuperStonks: Source = {
  key: 'cards.superStonks',
  name: 'Card: Super Stonks',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([0, 0.005, 0.01, 0.02] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Prestige: Floor Clear Requirement ×0.95 / ×0.90 / ×0.80 */
export const cardPrestige: Source = {
  key: 'cards.prestige',
  name: 'Card: Prestige',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 0.95, 0.9, 0.8] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Yummy Pizza (card): All Floor Multi ×1.01 / ×1.02 / ×1.03 */
export const cardYummyPizza: Source = {
  key: 'cards.yummyPizza',
  name: 'Card: Yummy Pizza',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.01, 1.02, 1.03] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Lootfrog (card): Lootfrog Capacity +1 / +2 / +4 */
export const cardLootfrog: Source = {
  key: 'cards.lootfrog',
  name: 'Card: Lootfrog',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** FrozenAra: 10× Contract Chance +0.10% / +0.20% / +0.30% */
export const cardFrozenAra: Source = {
  key: 'cards.frozenAra',
  name: 'Card: FrozenAra',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([0, 0.001, 0.002, 0.003] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Fishing Rod: Fishing Rod Power ×1.02 / ×1.05 / ×1.10 */
export const cardFishingRod: Source = {
  key: 'cards.fishingRod',
  name: 'Card: Fishing Rod',
  system: 'cards',
  maxLevel: 3,
  fn: (n) => ([1, 1.02, 1.05, 1.1] as const)[Math.min(n, 3)],
  inputs: [],
}

// ─── Rarity track helpers ────────────────────────────────────────────────────
// Card level scale: 0 = unowned, 1 = Standard, 2 = Gilded, 3 = Polychrome,
// 4 = Infernal. Igniting is assumed to KEEP the Polychrome primary effect
// (the Infernal layer adds a separate secondary effect), so primary tracks
// clamp at the Polychrome value.
const mulT = (st: number, g: number, p: number) => (n: number) =>
  n <= 0 ? 1 : n === 1 ? st : n === 2 ? g : p
const addT = (st: number, g: number, p: number) => (n: number) =>
  n <= 0 ? 0 : n === 1 ? st : n === 2 ? g : p
/** Infernal-only secondary effect (bonus-shaped): active at card level 4. */
/**
 * Infernal category scaling, verified against in-game data (all 9 categories
 * reproduce exactly): categoryMultiplier = 1 + perSet × setInfernals
 * + perTotal × totalInfernals (× a separate "Bonus from Other Sources").
 */
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

/**
 * Infernal-only secondary effect (bonus-shaped), scaled by the category's
 * Infernal multiplier — the listed base value is what the card shows at
 * 1.00x category multiplier.
 */
const infT = (v: number, cat: InfernalCategory) => (n: number, rt: Record<string, number>) =>
  n >= 4 ? v * categoryMultiplier(cat, rt) : 0

/**
 * Legendary fish primary track: at Infernal the Polychrome bonus is scaled
 * by the Legendary Fish category multiplier (the wiki's "exception").
 */
const legT = (st: number, g: number, p: number) => (n: number, rt: Record<string, number>) =>
  n <= 0
    ? 0
    : n === 1
      ? st
      : n === 2
        ? g
        : n === 3
          ? p
          : p * categoryMultiplier('legendaryFish', rt)

const card = (key: string, name: string, fn: Source['fn']): Source => ({
  key: `cards.${key}`,
  name: `Card: ${name}`,
  system: 'cards',
  maxLevel: 4,
  fn,
  inputs: [],
})

// ─── Misc cards (additions from the Cards wiki dump) ─────────────────────────
export const cardNovagiant = card('novagiant', 'Novagiant Combo', mulT(1.08, 1.16, 1.24))
export const cardUltraStonks = card('ultraStonks', 'Ultra Stonks', addT(0.005, 0.01, 0.02))
export const cardContract = card('contract', 'Contract', addT(1, 2, 3))
export const cardBlueCow = card('blueCow', 'Blue Cow', addT(0.05, 0.1, 0.15))
export const cardArchAbility = card('archAbility', 'Arch Ability', addT(-0.03, -0.06, -0.1))
export const cardGleamingVein = card('gleamingVein', 'Gleaming Vein', mulT(1.08, 1.16, 1.24))
export const cardBigLootfrog = card('bigLootfrog', 'Big Lootfrog', mulT(1.09, 1.18, 1.27))
export const cardFloor73 = card('floor73', 'Floor 73', mulT(1.02, 1.04, 1.06))
export const cardRelicChest = card('relicChest', 'Relic', addT(0.01, 0.02, 0.03))
/** Store: Freebie Timer −2s/−4s/−6s. */
export const cardStoreFreebieTimer = card('storeFreebieTimer', 'Store', addT(-2, -4, -6))
export const cardGoldenLootfrog = card('goldenLootfrog', 'Golden Lootfrog', addT(0.005, 0.01, 0.02))
export const cardLute = card('lute', 'Lute', mulT(1.06, 1.12, 1.18))
export const cardVydn = card('vydn', 'Vydn', mulT(1.04, 1.08, 1.12))
export const cardRainbowVoidPortal = card(
  'rainbowVoidPortal',
  'Rainbow Void Portal',
  mulT(1.08, 1.16, 1.24),
)

// ─── Pet cards: primary track (Standard/Gilded/Polychrome) ───────────────────
export const cardPetCrab = card('pet.crab', 'Crab Pet', addT(0.05, 0.1, 0.15))
export const cardPetDwarfSuperCrit = card('pet.dwarf', 'Dwarf Pet', addT(0.03, 0.06, 0.1))
export const cardPetDwarfUltraCrit = card('pet.dwarf', 'Dwarf Pet', addT(0.03, 0.06, 0.1))
export const cardPetDuck = card('pet.duck', 'Duck Pet', addT(0.05, 0.1, 0.15))
export const cardPetRabbit = card('pet.rabbit', 'Rabbit Pet', mulT(0.94, 0.88, 0.8))
export const cardPetPenguin = card('pet.penguin', 'Penguin Pet', addT(1, 2, 4))
export const cardPetAxolotl = card('pet.axolotl', 'Axolotl Pet', addT(-0.03, -0.06, -0.1))
export const cardPetWhale = card('pet.whale', 'Whale Pet', addT(0.05, 0.1, 0.15))
export const cardPetTotem = card('pet.totem', 'Totem Pet', addT(0.1, 0.2, 0.3))
export const cardPetHappyBot = card('pet.happyBot', 'Happy-Bot Pet', addT(1, 2, 3))
export const cardPetLeprechaun = card('pet.leprechaun', 'Leprechaun Pet', addT(0.1, 0.2, 0.3))
export const cardPetStarfish = card('pet.starfish', 'Starfish Pet', addT(0.05, 0.1, 0.15))
export const cardPetDino = card('pet.dino', 'Dino Pet', mulT(1.5, 2, 4))
export const cardPetMrNibbles = card('pet.mrNibbles', 'Mr Nibbles Pet', addT(0.01, 0.02, 0.04))
export const cardPetButterfly = card('pet.butterfly', 'Butterfly Pet', addT(0.12, 0.24, 0.5))

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
export const cardDroneBearCap = card('drone.bear', 'Bear Drone', addT(2, 5, 10))
export const cardDroneChainCap = card('drone.chain', 'Chain Drone', addT(2, 5, 10))
export const cardDroneMidasCap = card('drone.midas', 'Midas Drone', addT(2, 5, 10))
export const cardDroneFroggerCap = card('drone.frogger', 'Frogger Drone', addT(2, 5, 10))
export const cardDroneVeinseekerCap = card('drone.veinseeker', 'Veinseeker Drone', addT(2, 5, 10))
export const cardDroneStarburstCap = card('drone.starburst', 'Starburst Drone', addT(2, 5, 10))
export const cardDroneElixirCap = card('drone.elixir', 'Elixir Drone', addT(2, 5, 10))
export const cardDroneVoidCap = card('drone.void', 'Void Drone', addT(2, 5, 10))
export const cardDroneAnglerCap = card('drone.angler', 'Angler Drone', addT(2, 5, 10))
export const cardDronePrismCap = card('drone.prism', 'Prism Drone', addT(2, 5, 10))
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
// Prism Drone Infernal effect value is '?' on the wiki — no source yet.

// ─── Legendary Fish cards (primary track; Infernal +0.20x/+0.001x set/total ──
// scaling is the wiki's documented exception and is NOT applied yet) ──────────
export const cardLegRainbowTrout = card('leg.rainbowTrout', 'Rainbow Trout', legT(0.25, 0.5, 1.0))
export const cardLegDuneEelworm = card('leg.duneEelworm', "Dune's Eelworm", legT(0.4, 0.8, 1.4))
export const cardLegShellstealer = card(
  'leg.glacialShellstealer',
  'Glacial Shellstealer',
  legT(0.3, 0.6, 1.0),
)
export const cardLegMegalodon = card('leg.megalodon', 'Megalodon', legT(0.35, 0.7, 1.25))
export const cardLegRadioactiveSlugBomb = card(
  'leg.radioactiveSlug',
  'Radioactive Slug',
  legT(3, 5, 11),
)
export const cardLegRadioactiveSlugExp = card(
  'leg.radioactiveSlug',
  'Radioactive Slug',
  legT(3, 5, 11),
)
export const cardLegGeoduck = card(
  'leg.glimmeringGeoduck',
  'Glimmering Geoduck',
  legT(0.14, 0.28, 0.52),
)
export const cardLegLaviathan = card('leg.laviathan', 'Laviathan', legT(0.4, 0.8, 1.4))
export const cardLegStormSerpent = card('leg.stormSerpent', 'Storm Serpent', legT(0.14, 0.28, 0.56))
export const cardLegMeltingGibbous = card(
  'leg.meltingGibbous',
  'Melting Gibbous',
  legT(0.1, 0.2, 0.3),
)
export const cardLegBlackenedBasker = card(
  'leg.blackenedBasker',
  'Blackened Basker',
  legT(0.0015, 0.003, 0.006),
)
// Cthulhu card (Divine Relics Cap +1/+2/+4) has no registry stat yet.

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
