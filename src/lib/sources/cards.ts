import type { Source } from '$lib/engine/types'

// ─── Ore Data Array ──────────────────────────────────────────────────────────
const ORE_DATA: [string, string][] = [
  ['Tin', 'Tin Ore'],
  ['Copper', 'Copper Ore'],
  ['Mithril', 'Mithril Ore'],
  ['Adamant', 'Adamant Ore'],
  ['Runite', 'Runite Ore'],
  ['Citrine', 'Citrine Ore'],
  ['Amethyst', 'Amethyst Ore'],
  ['Topaz', 'Topaz Ore'],
  ['Obsidian', 'Obsidian Ore'],
  ['Demonite', 'Demonite Ore'],
  ['VR-Tin', 'VR-Tin Ore'],
  ['VR-Amethyst', 'VR-Amethyst Ore'],
  ['VR-Demonite', 'VR-Demonite Ore'],
  ['VR-ERROR', 'VR-ERROR Ore'],
  ['Lunarium', 'Lunarium Ore'],
  ['Earth-C-137', 'Earth-C-137 Ore'],
  ['Meteorite', 'Meteorite Ore'],
  ['Singularity', 'Singularity Ore'],
  ['Halium', 'Halium Ore'],
  ['Blasphemite', 'Blasphemite Ore'],
  ['Angelite', 'Angelite Ore'],
  ['Elysium', 'Elysium Ore'],
  ['Enemite', 'Enemite Ore'],
  ['Beepboopium', 'Beepboopium Ore'],
  ['Radion-73', 'Radion-73 Ore'],
  ['Cranium', 'Cranium Ore'],
  ['Lapis', 'Lapis Ore'],
  ['Quartz', 'Quartz Ore'],
  ['Glacialite', 'Glacialite Ore'],
  ['Twinklestone', 'Twinklestone Ore'],
  ['Sandcasium', 'Sandcasium Ore'],
  ['Clamite', 'Clamite Ore'],
  ['Thunderstone', 'Thunderstone Ore'],
  ['Crabrock', 'Crabrock Ore'],
  ['Hailstone', 'Hailstone Ore'],
  ['Frostbite', 'Frostbite Ore'],
  ['Icebloom', 'Icebloom Ore'],
  ['Pinguinus', 'Pinguinus Ore'],
  ['Macawrock', 'Macawrock Ore'],
  ['Cocore', 'Cocore Ore'],
  ['Rafflenium', 'Rafflenium Ore'],
  ['Carnivorian', 'Carnivorian Ore'],
  ['Infernite', 'Infernite Ore'],
  ['Blood-Onyx', 'Blood-Onyx Ore'],
  ['Cyrogem', 'Cyrogem Ore'],
  ['Pinnaclite', 'Pinnaclite Ore'],
  ['Omeletite', 'Omeletite Ore'],
  ['Resinite', 'Resinite Ore'],
  ['Impactium', 'Impactium Ore'],
  ['Tricerastone', 'Tricerastone Ore'],
  ['Duelysium', 'Duelysium Ore'],
  ['Arcusite', 'Arcusite Ore'],
  ['Phalanxite', 'Phalanxite Ore'],
  ['Guardium', 'Guardium Ore'],
  ['Cognite', 'Cognite Ore'],
  ['Telophite', 'Telophite Ore'],
  ['Steamstone', 'Steamstone Ore'],
  ['Equinine', 'Equinine Ore'],
  ['Dynamite', 'Dynamite Ore'],
  ['Genevium', 'Genevium Ore'],
  ['Manhattite', 'Manhattite Ore'],
  ['Rationium', 'Rationium Ore'],
  ['Vaporium', 'Vaporium Ore'],
  ['Palmite', 'Palmite Ore'],
  ['Ransomite', 'Ransomite Ore'],
  ['MVPD-1988', 'MVPD-1988 Ore'],
  ['Chronite', 'Chronite Ore'],
  ['Hattium', 'Hattium Ore'],
  ['Pishalvite', 'Pishalvite Ore'],
  ['Teatimium', 'Teatimium Ore'],
  ['Rumium', 'Rumium Ore'],
  ['Anchorium', 'Anchorium Ore'],
  ['Mateyum', 'Mateyum Ore'],
  ['Hookite', 'Hookite Ore'],
  ['Carpetite', 'Carpetite Ore'],
  ['Djinnium', 'Djinnium Ore'],
  ['Sinbadium', 'Sinbadium Ore'],
  ['Turbanite', 'Turbanite Ore'],
]

// ─── Bar Data Array ──────────────────────────────────────────────────────────
const BAR_DATA: [string, string][] = [
  ['Tin', 'Tin Bar'],
  ['Copper', 'Copper Bar'],
  ['Mithril', 'Mithril Bar'],
  ['Adamant', 'Adamant Bar'],
  ['Runite', 'Runite Bar'],
  ['Citrine', 'Citrine Bar'],
  ['Amethyst', 'Amethyst Bar'],
  ['Topaz', 'Topaz Bar'],
  ['Obsidian', 'Obsidian Bar'],
  ['Demonite', 'Demonite Bar'],
  ['VR-Tin', 'VR-Tin Bar'],
  ['VR-Amethyst', 'VR-Amethyst Bar'],
  ['VR-Demonite', 'VR-Demonite Bar'],
  ['VR-ERROR', 'VR-ERROR Bar'],
  ['Lunarium', 'Lunarium Bar'],
  ['Earth-C-137', 'Earth-C-137 Bar'],
  ['Meteorite', 'Meteorite Bar'],
  ['Singularity', 'Singularity Bar'],
  ['Halium', 'Halium Bar'],
  ['Blasphemite', 'Blasphemite Bar'],
  ['Angelite', 'Angelite Bar'],
  ['Elysium', 'Elysium Bar'],
  ['Enemite', 'Enemite Bar'],
  ['Beepboopium', 'Beepboopium Bar'],
  ['Radion-73', 'Radion-73 Bar'],
  ['Cranium', 'Cranium Bar'],
  ['Lapis', 'Lapis Bar'],
  ['Quartz', 'Quartz Bar'],
  ['Glacialite', 'Glacialite Bar'],
  ['Twinklestone', 'Twinklestone Bar'],
  ['Sandcasium', 'Sandcasium Bar'],
  ['Clamite', 'Clamite Bar'],
  ['Thunderstone', 'Thunderstone Bar'],
  ['Crabrock', 'Crabrock Bar'],
  ['Hailstone', 'Hailstone Bar'],
  ['Frostbite', 'Frostbite Bar'],
  ['Icebloom', 'Icebloom Bar'],
  ['Pinguinus', 'Pinguinus Bar'],
  ['Macawrock', 'Macawrock Bar'],
  ['Cocore', 'Cocore Bar'],
  ['Rafflenium', 'Rafflenium Bar'],
  ['Carnivorian', 'Carnivorian Bar'],
  ['Infernite', 'Infernite Bar'],
  ['Blood-Onyx', 'Blood-Onyx Bar'],
  ['Cyrogem', 'Cyrogem Bar'],
  ['Pinnaclite', 'Pinnaclite Bar'],
  ['Omeletite', 'Omeletite Bar'],
  ['Resinite', 'Resinite Bar'],
  ['Impactium', 'Impactium Bar'],
  ['Tricerastone', 'Tricerastone Bar'],
  ['Duelysium', 'Duelysium Bar'],
  ['Arcusite', 'Arcusite Bar'],
  ['Phalanxite', 'Phalanxite Bar'],
  ['Guardium', 'Guardium Bar'],
  ['Cognite', 'Cognite Bar'],
  ['Telophite', 'Telophite Bar'],
  ['Steamstone', 'Steamstone Bar'],
  ['Equinine', 'Equinine Bar'],
  ['Dynamite', 'Dynamite Bar'],
  ['Genevium', 'Genevium Bar'],
  ['Manhattite', 'Manhattite Bar'],
  ['Rationium', 'Rationium Bar'],
  ['Vaporium', 'Vaporium Bar'],
  ['Palmite', 'Palmite Bar'],
  ['Ransomite', 'Ransomite Bar'],
  ['MVPD-1988', 'MVPD-1988 Bar'],
  ['Chronite', 'Chronite Bar'],
  ['Hattium', 'Hattium Bar'],
  ['Pishalvite', 'Pishalvite Bar'],
  ['Teatimium', 'Teatimium Bar'],
  ['Rumium', 'Rumium Bar'],
  ['Anchorium', 'Anchorium Bar'],
  ['Mateyum', 'Mateyum Bar'],
  ['Hookite', 'Hookite Bar'],
  ['Carpetite', 'Carpetite Bar'],
  ['Djinnium', 'Djinnium Bar'],
  ['Sinbadium', 'Sinbadium Bar'],
  ['Turbanite', 'Turbanite Bar'],
]

// ─── Vein Data Array ─────────────────────────────────────────────────────────
const VEIN_DATA: [string, string][] = [
  ['Stone', 'Stone Vein'],
  ['Magma', 'Magma Vein'],
  ['Virtual', 'Virtual Vein'],
  ['Space', 'Space Vein'],
  ['Cloud', 'Cloud Vein'],
  ['Atomic', 'Atomic Vein'],
  ['Deepsea', 'Deepsea Vein'],
  ['Beach', 'Beach Vein'],
  ['Valley', 'Valley Vein'],
  ['Jungle', 'Jungle Vein'],
  ['Volcano', 'Volcano Vein'],
  ['Jurassic', 'Jurassic Vein'],
  ['Roman', 'Roman Vein'],
  ['Industrial', 'Industrial Vein'],
  ['Warfront', 'Warfront Vein'],
  ['Neon', 'Neon Vein'],
  ['Wonderland', 'Wonderland Vein'],
  ['Pirate', 'Pirate Vein'],
  ['Arabian', 'Arabian Vein'],
]

// ─── Star Data Array ─────────────────────────────────────────────────────────
const STAR_DATA: [string, string][] = [
  ['Aries', 'Aries Star'],
  ['Taurus', 'Taurus Star'],
  ['Gemini', 'Gemini Star'],
  ['Cancer', 'Cancer Star'],
  ['Leo', 'Leo Star'],
  ['Virgo', 'Virgo Star'],
  ['Libra', 'Libra Star'],
  ['Scorpio', 'Scorpio Star'],
  ['Sagittarius', 'Sagittarius Star'],
  ['Capricorn', 'Capricorn Star'],
  ['Aquarius', 'Aquarius Star'],
  ['Pisces', 'Pisces Star'],
  ['Ophiuchus', 'Ophiuchus Star'],
  ['Orion', 'Orion Star'],
  ['Hercules', 'Hercules Star'],
  ['Draco', 'Draco Star'],
  ['Cetus', 'Cetus Star'],
  ['Phoenix', 'Phoenix Star'],
  ['Eridanus', 'Eridanus Star'],
]

// ─── Fish Data Array (Lower camelCase keys matching your template) ───────────
const FISH_DATA: [string, string][] = [
  ['guppy', 'Guppy'],
  ['bass', 'Bass'],
  ['catfish', 'Catfish'],
  ['goldenTrout', 'Golden Trout'],
  ['sandscaleCarp', 'Sandscale Carp'],
  ['armoredRoller', 'Armored Roller'],
  ['spinyPuffer', 'Spiny Puffer'],
  ['scarabshoeCrab', 'Scarabshoe Crab'],
  ['snowBelliedSwarmer', 'Snow-bellied Swarmer'],
  ['frostshellCrab', 'Frostshell Crab'],
  ['frostdripSpearfish', 'Frostdrip Spearfish'],
  ['auroreel', 'Auroreel'],
  ['coralstar', 'Coralstar'],
  ['anchorfinStingray', 'Anchorfin Stingray'],
  ['pearlescentTetra', 'Pearlescent Tetra'],
  ['gemWhale', 'Gem Whale'],
  ['ionizingEel', 'Ionizing Eel'],
  ['gammanglerFish', 'Gammangler Fish'],
  ['elephantsBlob', "Elephant's Blob"],
  ['wastefis', 'Wastefis'],
  ['hadalCrusher', 'Hadal Crusher'],
  ['liveSeaMine', 'Live Sea Mine'],
  ['ventilatorRemora', 'Ventilator Remora'],
  ['wreckshellPilferer', 'Wreckshell Pilferer'],
  ['stonescaleCarp', 'Stonescale Carp'],
  ['sturgem', 'Sturgem'],
  ['conductiveEel', 'Conductive Eel'],
  ['arapaimAl', 'Arapaim-al'],
  ['moltenArcherfish', 'Molten Archerfish'],
  ['lavaSnail', 'Lava Snail'],
  ['obsidianToothBarracuda', 'Obsidian-Tooth Barracuda'],
  ['basalturtle', 'Basalturtle'],
  ['sunglazedFlyingFish', 'Sunglazed Flying Fish'],
  ['cloudcutterManta', 'Cloudcutter Manta'],
  ['shocksailfish', 'Shocksailfish'],
  ['lunarSunfish', 'Lunar Sunfish'],
  ['lanternfishComet', 'Lanternfish Comet'],
  ['ufo', 'UFO'],
  ['subSolarSquid', 'Sub-Solar Squid'],
  ['planetaryJellyfish', 'Planetary Jellyfish'],
  ['heliocentricClam', 'Heliocentric Clam'],
  ['gammaRayburstShrimp', 'Gamma Rayburst Shrimp'],
  ['galaxiaWhale', 'Galaxia Whale'],
  ['darkMatterBlackdragon', 'Dark Matter Blackdragon'],
]

// ─── Your Migrated Bomb & Drone Key Arrays ───────────────────────────────────
const BOMB_DATA: [string, string][] = [
  ['basicBomb', 'Basic Bomb'],
  ['chainBomb', 'Chain Bomb'],
  ['bombOfPlenty', 'Bomb of Plenty'],
  ['expBomb', 'Exp Bomb'],
  ['megabomb', 'MEGABOMB'],
  ['infinityBomb', 'Infinity Bomb'],
  ['transmuterBomb', 'Transmuter Bomb'],
  ['gemBomb', 'Gem Bomb'],
  ['cherryBomb', 'Cherry Bomb'],
  ['batteryBomb', 'Battery Bomb'],
  ['d20Bomb', 'D20 Bomb'],
  ['foundersBomb', 'Founders Bomb'],
  ['veinmorpherBomb', 'Veinmorpher Bomb'],
]

const DRONE_DATA: [string, string][] = [
  ['bear', 'Bear Drone'],
  ['chain', 'Chain Drone'],
  ['midas', 'Midas Drone'],
  ['frogger', 'Frogger Drone'],
  ['veinseeker', 'Veinseeker Drone'],
  ['starburst', 'Starburst Drone'],
  ['elixir', 'Elixir Drone'],
  ['void', 'Void Drone'],
  ['angler', 'Angler Drone'],
  ['prism', 'Prism Drone'],
]

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
const oreMul = replMul('ore')
const barMul = replMul('bar')
const veinMul = replMul('vein')
const starMul = replMul('star')
const fishMul = replMul('fish')

/** Infernal-only secondary effect (KEEP categories), scaled by the category multiplier. */
const infT = (v: number, cat: InfernalCategory) => (n: number, rt: Record<string, number>) =>
  n >= 4 ? v * categoryMultiplier(cat, rt) : 0

/** Helper to dynamically generate card blocks while strictly keeping your key formats */
const generateCardGroup = (
  category: string,
  items: [string, string][], // [exactSubKey, exactDisplayName]
  fn: Source['fn'],
  varSuffix = '',
  maxLevel = 4,
) => {
  return Object.fromEntries(
    items.map(([subKey, displayName]) => {
      // Safe variable name formatting (strips dashes/spaces for valid JS variables)
      const cleanSubKey = subKey.replace(/[^a-zA-Z0-9]/g, '')
      const pascalSubKey = cleanSubKey.charAt(0).toUpperCase() + cleanSubKey.slice(1)
      const pascalCategory = category.charAt(0).toUpperCase() + category.slice(1)

      const varName = `card${pascalCategory}${pascalSubKey}${varSuffix}`
      const internalKey = `${category}.${subKey}`

      return [varName, card(internalKey, displayName, fn, maxLevel)]
    }),
  )
}

const card = (key: string, name: string, fn: Source['fn'], maxLevel = 4): Source => ({
  key: `cards.${key}`,
  name: `Card: ${name}`,
  system: 'cards',
  maxLevel,
  fn,
  inputs: [],
})

// ─── Ore Cards ──────────────
export const dynamicOres = generateCardGroup('ore', ORE_DATA, oreMul(1.5, 2.0, 4.0))

// ─── Bar Cards ──────────────
export const dynamicBars = generateCardGroup('bar', BAR_DATA, barMul(1.5, 2.0, 4.0))

// ─── Vein Cards ──────────────
export const dynamicVeins = generateCardGroup('vein', VEIN_DATA, veinMul(1.5, 2.0, 4.0))

// ─── Star Cards ──────────────
export const dynamicStars = generateCardGroup('star', STAR_DATA, starMul(1.5, 2.0, 4.0))

// ─── Fish Cards ──────────────
export const dynamicFish = generateCardGroup('fish', FISH_DATA, fishMul(1.5, 2.0, 4.0))

// ─── Misc cards ──────────────
export const cardMiscSuperStar = card('misc.SuperStar', 'Super Star', miscMul(1.05, 1.1, 1.2))
export const cardMiscNovagiant = card(
  'misc.Novagiant',
  'Novagiant Combo',
  miscMul(1.08, 1.16, 1.24),
)
export const cardMiscMinerName = card('misc.MinerName', 'Miner Name', miscMul(1.1, 1.2, 1.4))
export const cardMiscLootbug = card('misc.Lootbug', 'Lootbug', miscMul(1.1, 1.2, 1.3))
export const cardMiscGoldenLootbug = card(
  'misc.GoldenLootbug',
  'Golden Lootbug',
  miscAdd(0.02, 0.04, 0.06),
)
export const cardMiscPrestige = card('misc.Prestige', 'Prestige', miscMul(0.95, 0.9, 0.8))
export const cardMiscFreebie = card('misc.Freebie', 'Freebie', miscAdd(1, 2, 4))
export const cardMiscStonks = card('misc.Stonks', 'Stonks', miscMul(1.1, 1.2, 1.3))
export const cardMiscSuperStonks = card(
  'misc.SuperStonks',
  'Super Stonks',
  miscAdd(0.005, 0.01, 0.02),
)
export const cardMiscUltraStonks = card(
  'misc.UltraStonks',
  'Ultra Stonks',
  miscAdd(0.005, 0.01, 0.02),
)
export const cardMiscContract = card('misc.Contract', 'Contract', miscAdd(1, 2, 3))
export const cardMiscVoidPortal = card('misc.VoidPortal', 'Void Portal', miscMul(1.05, 1.1, 1.2))
export const cardMiscGoldenVoidPortal = card(
  'misc.GoldenVoidPortal',
  'Golden Void Portal',
  miscMul(1.08, 1.16, 1.24),
)
export const cardMiscRainbowVoidPortal = card(
  'misc.RainbowVoidPortal',
  'Rainbow Void Portal',
  miscMul(1.08, 1.16, 1.24),
)
export const cardMiscWorld1 = card('misc.World1', 'World 1', miscMul(1.06, 1.12, 1.24))
export const cardMiscWorld2 = card('misc.World2', 'World 2', miscMul(1.06, 1.12, 1.24))
export const cardMiscWorld3 = card('misc.World3', 'World 3', miscMul(1.06, 1.12, 1.24))
export const cardMiscWorld4 = card('misc.World4', 'World 4', miscMul(1.06, 1.12, 1.24))
export const cardMiscAlex = card('misc.Alex', 'Alex', miscMul(1.1, 1.2, 1.4))
export const cardMiscBlueCow = card('misc.BlueCow', 'Blue Cow', miscAdd(0.05, 0.1, 0.15))
export const cardMiscGoldenOre = card('misc.GoldenOre', 'Golden Ore', miscMul(1.06, 1.12, 1.24))
export const cardMiscSushi = card('misc.Sushi', 'Sushi', miscAdd(5, 10, 20))
export const cardMiscArchAbility = card(
  'misc.ArchAbility',
  'Arch Ability',
  miscAdd(-0.03, -0.06, -0.1),
)
export const cardMiscGoldenVein = card('misc.GoldenVein', 'Golden Vein', miscMul(1.08, 1.16, 1.24))
export const cardMiscRainbowVein = card(
  'misc.RainbowVein',
  'Rainbow Vein',
  miscMul(1.08, 1.16, 1.24),
)
export const cardMiscGleamingVein = card(
  'misc.GleamingVein',
  'Gleaming Vein',
  miscMul(1.08, 1.16, 1.24),
)
export const cardMiscFuel = card('misc.Fuel', 'Fuel', miscMul(1.02, 1.05, 1.1))
export const cardMiscFishingRod = card('misc.FishingRod', 'Fishing Rod', miscMul(1.02, 1.05, 1.1))
export const cardMiscCode = card('misc.Code', 'Code', miscMul(1.01, 1.03, 1.06))
export const cardMiscFrozenAra = card('misc.FrozenAra', 'FrozenAra', miscAdd(0.001, 0.002, 0.003))
export const cardMiscCeliosHat = card('misc.CeliosHat', "Celio's Hat", miscMul(1.1, 1.2, 1.4))
export const cardMiscVydn = card('misc.Vydn', 'Vydn', miscMul(1.04, 1.08, 1.12))
export const cardMiscLute = card('misc.Lute', 'Lute', miscMul(1.06, 1.12, 1.18))
export const cardMiscJulk = card('misc.Julk', 'Julk', miscMul(1.04, 1.08, 1.12))
export const cardMiscYummyPizza = card('misc.YummyPizza', 'Yummy Pizza', miscMul(1.01, 1.02, 1.03))
export const cardMiscLootfrog = card('misc.Lootfrog', 'Lootfrog', miscAdd(1, 2, 4))
export const cardMiscGoldenLootfrog = card(
  'misc.GoldenLootfrog',
  'Golden Lootfrog',
  miscAdd(0.005, 0.01, 0.02),
)
export const cardMiscBigLootfrog = card(
  'misc.BigLootfrog',
  'Big Lootfrog',
  miscMul(1.09, 1.18, 1.27),
)
export const cardMiscFloor73 = card('misc.Floor73', 'Floor 73', miscMul(1.02, 1.04, 1.06))
export const cardMiscRelicChest = card('misc.RelicChest', 'Relic', miscAdd(0.01, 0.02, 0.03))
export const cardMiscBone = card('misc.Bone', 'Bone', miscMul(1.05, 1.1, 1.15))
export const cardMiscStoreFreebieTimer = card(
  'misc.StoreFreebieTimer',
  'Store',
  miscAdd(-2, -4, -6),
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
export const cardPetNagini = card('pet.nagini', 'Nagini Pet', keepAdd(0.01, 0.02, 0.04))

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
export const dynamicDroneCaps = generateCardGroup('drone', DRONE_DATA, keepAdd(2, 5, 10), 'Cap')
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
export const cardLegCthulhu = card('leg.cthulhu', 'Cthulhu', legAdd(1, 2, 4))
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
export const dynamicBombs = generateCardGroup('bomb', BOMB_DATA, () => 0, '', 3)

// ─── Fish cards ──────────────────────────────────────────────────────────────
export const cardFishGuppy = card('fish.guppy', 'Guppy', fishMul(1.5, 2.0, 4.0))
export const cardFishBass = card('fish.bass', 'Bass', fishMul(1.5, 2.0, 4.0))

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

export const {
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
} = dynamicDroneCaps as any
export const { cardBombBasicBomb } = dynamicBombs as any

export const cardSources = {
  cardPetNagini,
  cardMiscAlex,
  cardMiscBone,
  cardMiscWorld1,
  cardMiscWorld2,
  cardMiscWorld3,
  cardMiscWorld4,
  cardMiscCeliosHat,
  cardMiscJulk,
  cardMiscLootbug,
  cardMiscGoldenLootbug,
  cardMiscGoldenOre,
  cardMiscGoldenVein,
  cardMiscRainbowVein,
  cardMiscFuel,
  cardMiscCode,
  cardMiscVoidPortal,
  cardMiscGoldenVoidPortal,
  cardMiscFreebie,
  cardMiscSuperStar,
  cardMiscMinerName,
  cardMiscStonks,
  cardMiscSuperStonks,
  cardMiscPrestige,
  cardMiscYummyPizza,
  cardMiscLootfrog,
  cardMiscFrozenAra,
  cardMiscFishingRod,
  cardMiscNovagiant,
  cardMiscUltraStonks,
  cardMiscContract,
  cardMiscBlueCow,
  cardMiscArchAbility,
  cardMiscGleamingVein,
  cardMiscBigLootfrog,
  cardMiscFloor73,
  cardMiscRelicChest,
  cardMiscStoreFreebieTimer,
  cardMiscGoldenLootfrog,
  cardMiscLute,
  cardMiscSushi,
  cardMiscVydn,
  cardMiscRainbowVoidPortal,
  cardPetCrab,
  ...dynamicOres,
  ...dynamicBars,
  ...dynamicVeins,
  ...dynamicStars,
  ...dynamicFish,
  ...dynamicBombs,
  cardBombBasicBomb,
  ...dynamicDroneCaps,
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
  cardLegCthulhu,
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
