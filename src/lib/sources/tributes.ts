import type { Op, Source } from '$lib/engine/types'

// Fishing tribute rewards (all binary, maxLevel 1). statKey/op mirror the formula
// wiring (consistency test enforces op where used). Broadcast tributes that apply
// one effect to many stats (all bomb crit multis, all drone grade caps) carry op
// but no single statKey. The two-stat tribute keeps its primary statKey and adds a
// sibling sharing the key. Cap/unlock tributes with no registry stat carry neither.

const tr = (
  key: string,
  name: string,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `tribute.${key}`,
  name,
  system: 'tributes',
  maxLevel: 1,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Fishing Tributes Rewards ────────────────────────────────────────────────

export const trRainbowTroutT1LC = tr('RainbowTroutT1LC', 'Tribute: Rainbow Trout T1 - Leprechaun Cap +3', undefined, undefined, (n) => n * 3)
export const trRainbowTroutT1RFM = tr('RainbowTroutT1RFM', 'Tribute: Rainbow Trout T1 - Rainbow Floor Multi 1.15×', 'rainbow_floor_multi', '×', (n) => 1 + n * 0.15)
export const trRainbowTroutT2MNC = tr('RainbowTroutT2MNC', 'Tribute: Rainbow Trout T2 - Mr Nibbles Cap +3', undefined, undefined, (n) => n * 3)
export const trRainbowTroutT2AFM = tr('RainbowTroutT2AFM', 'Tribute: Rainbow Trout T2 - All Floor Multis 1.10×', 'all_floor_multipliers', '×', (n) => 1 + n * 0.1)
export const trDuneEelwormT1GVPC = tr('DuneEelwormT1GVPC', "Tribute: Dune's Eelworm T1 - Golden Void Portal Chance +5%", 'golden_void_portal_chance', '+', (n) => n * 0.05)
export const trDuneEelwormT1HC = tr('DuneEelwormT1HC', "Tribute: Dune's Eelworm T1 - Hercules Cap +3", undefined, undefined, (n) => n * 3)
export const trDuneEelwormT1DC = tr('DuneEelwormT1DC', "Tribute: Dune's Eelworm T1 - Draco Cap +3", undefined, undefined, (n) => n * 3)
// NOTE: named "Elixir Buff Crit Chance" but the formula wires this into
// golden_void_portal_multi — likely a mis-wiring to verify.
export const trDuneEelwormT2EBCC = tr('DuneEelwormT2EBCC', "Tribute: Dune's Eelworm T2 - Elixir Buff Crit Chance +10%", 'golden_void_portal_multi', '+', (n) => n * 0.1)
export const trDuneEelwormT2GVPM = tr('DuneEelwormT2GVPM', "Tribute: Dune's Eelworm T2 - Golden Void Portal Multi 1.50×", 'golden_void_portal_multi', '×', (n) => 1 + n * 0.5)
export const trGlacialShellstealerT1GVC = tr('GlacialShellstealerT1GVC', 'Tribute: Glacial Shellstealer T1 - Gleaming Vein Chance +5%', 'gleaming_vein_chance', '+', (n) => n * 0.05)
export const trGlacialShellstealerT1TC = tr('GlacialShellstealerT1TC', 'Tribute: Glacial Shellstealer T1 - Totem Cap +5', undefined, undefined, (n) => n * 5)
export const trGlacialShellstealerT2GVM = tr('GlacialShellstealerT2GVM', 'Tribute: Glacial Shellstealer T2 - Gleaming Vein Multi +10×', 'gleaming_vein_multi', '+', (n) => n * 10.0)
export const trGlacialShellstealerT2VDGC = tr('GlacialShellstealerT2VDGC', 'Tribute: Glacial Shellstealer T2 - Void Drone Grade Cap +15', 'drone_void_grade_cap_increase', '+', (n) => n * 15)
export const trMegalodonT1CC = tr('MegalodonT1CC', 'Tribute: Megalodon T1 - Cancer Cap +10', undefined, undefined, (n) => n * 10)
export const trMegalodonT1TSC = tr('MegalodonT1TSC', 'Tribute: Megalodon T1 - Triple Star Chance +5%', 'star_triple_spawn_chance', '+', (n) => n * 0.05)
export const trMegalodonT1GFM = tr('MegalodonT1GFM', 'Tribute: Megalodon T1 - Galactic Floor Multi 1.15×', 'galactic_floor_multi', '×', (n) => 1 + n * 0.15)
// All Supernova Multis feeds star + super-star supernova multi.
export const trMegalodonT2ASM = tr('MegalodonT2ASM', 'Tribute: Megalodon T2 - All Supernova Multis 1.25×', 'star_supernova_multi', '×', (n) => 1 + n * 0.25)
export const trMegalodonT2ASMSuper = tr('MegalodonT2ASM', 'Tribute: Megalodon T2 - All Supernova Multis 1.25×', 'super_star_supernova_multi', '×', (n) => 1 + n * 0.25)
export const trMegalodonT2SS10C = tr('MegalodonT2SS10C', 'Tribute: Megalodon T2 - Super Star 10x Chance +5%', 'super_star_10x_chance', '+', (n) => n * 0.05)
// Broadcast: ×2 to all four bomb crit-damage stats — op only, no single statKey.
export const trRadioactiveSlugT1ABCM = tr('RadioactiveSlugT1ABCM', 'Tribute: Radioactive Slug T1 - All Bomb Crit Multis 2.00×', undefined, '×', (n) => 1 + n * 1.0)
export const trCthulhuT1ADTR = tr('CthulhuT1ADTR', 'Tribute: Cthulhu T1 - All Dock Ticks Reqs -10%', undefined, undefined, (n) => n * -1.0)
export const trCthulhuT1SSM = tr('CthulhuT1SSM', 'Tribute: Cthulhu T1 - Super Shiny Multi +3×', 'fishing_super_shiny_multi', '+', (n) => n * 3.0)
export const trCthulhuT2U1MD = tr('CthulhuT2U1MD', 'Tribute: Cthulhu T2 - Unlock +1 Mining Drone', 'drone_count', '+', (n) => n * 1)
export const trGlimmeringGeoduckT1FGPMCO = tr('GlimmeringGeoduckT1FGPMCO', 'Tribute: Glimmering Geoduck T1 - Fragment Gain per Mythic Chest Owned +0.25%', undefined, undefined, (n) => n * 0.0025)
export const trGlimmeringGeoduckT1PSCM = tr('GlimmeringGeoduckT1PSCM', 'Tribute: Glimmering Geoduck T1 - Polychrome Star Card Multi 1.25×', 'polychrome_card_bonus_star', '×', (n) => 1 + n * 0.25)
export const trGlimmeringGeoduckT2UGGB = tr('GlimmeringGeoduckT2UGGB', 'Tribute: Glimmering Geoduck T2 - Unlock Golden Gem Bomb', undefined, undefined, (n) => n * 1)
export const trGlimmeringGeoduckT2POCM = tr('GlimmeringGeoduckT2POCM', 'Tribute: Glimmering Geoduck T2 - Polychrome Ore Card Multi 1.30×', 'polychrome_card_bonus_ore', '×', (n) => 1 + n * 0.3)
export const trLaviathanT1UIOABC = tr('LaviathanT1UIOABC', 'Tribute: Laviathan T1 - Unlock Infernal Ore and Bar Cards!', undefined, undefined, (n) => n * 1)
export const trLaviathanT2UIFALFC = tr('LaviathanT2UIFALFC', 'Tribute: Laviathan T2 - Unlock Infernal Fish and Legendary Fish Cards!', undefined, undefined, (n) => n * 1)
export const trStormSerpentT1UGEB = tr('StormSerpentT1UGEB', 'Tribute: Storm Serpent T1 - Unlock Golden Exp Bomb', undefined, undefined, (n) => n * 1)
export const trStormSerpentT1CPC = tr('StormSerpentT1CPC', 'Tribute: Storm Serpent T1 - Crab Pet Cap +5', undefined, undefined, (n) => n * 5)
export const trStormSerpentT1LBC = tr('StormSerpentT1LBC', 'Tribute: Storm Serpent T1 - Lootbug Banked Cap +10', 'lootbug_bank_cap', '+', (n) => n * 10)
export const trStormSerpentT2UGEON = tr('StormSerpentT2UGEON', 'Tribute: Storm Serpent T2 - Unlock Golden Eye of Newt', undefined, undefined, (n) => n * 1)
export const trStormSerpentT2CSC = tr('StormSerpentT2CSC', 'Tribute: Storm Serpent T2 - Cetus Star Cap +10', undefined, undefined, (n) => n * 10)
export const trStormSerpentT2LLM = tr('StormSerpentT2LLM', 'Tribute: Storm Serpent T2 - Lootbug Loot Multi 1.20×', 'lootbug_loot_multi', '×', (n) => 1 + n * 0.2)
export const trMeltingGibbousT1ASM = tr('MeltingGibbousT1ASM', 'Tribute: Melting Gibbous T1 - All Star Multi 1.20×', 'all_star_multi', '×', (n) => 1 + n * 0.2)
export const trMeltingGibbousT1RPC = tr('MeltingGibbousT1RPC', 'Tribute: Melting Gibbous T1 - Rainbow Portal Chance +2%', 'rainbow_void_portal_chance', '+', (n) => n * 0.02)
export const trMeltingGibbousT1NUC = tr('MeltingGibbousT1NUC', 'Tribute: Melting Gibbous T1 - Note Upgrade Cap +5', undefined, undefined, (n) => n * 5)
export const trMeltingGibbousT2PQC = tr('MeltingGibbousT2PQC', 'Tribute: Melting Gibbous T2 - Pet Quest Cap +1', undefined, undefined, (n) => n * 1)
export const trMeltingGibbousT2UGLL = tr('MeltingGibbousT2UGLL', 'Tribute: Melting Gibbous T2 - Unlock Golden Lootbug Lantern', undefined, undefined, (n) => n * 1)
export const trMeltingGibbousT2GFC = tr('MeltingGibbousT2GFC', 'Tribute: Melting Gibbous T2 - Golden Frog Chance +1%', 'lootfrog_golden_chance', '+', (n) => n * 0.01)
// Broadcast: +5 to all ten drone grade caps — op only, no single statKey.
export const trBlackenedBaskerT1ADGC = tr('BlackenedBaskerT1ADGC', 'Tribute: Blackened Basker T1 - All Drone Grade Caps +5', undefined, '+', (n) => n * 5)
export const trBlackenedBaskerT1RSSC = tr('BlackenedBaskerT1RSSC', 'Tribute: Blackened Basker T1 - Radiant Super Star Chance +2%', 'super_star_radiant_chance', '+', (n) => n * 0.02)
export const trBlackenedBaskerT1UGH = tr('BlackenedBaskerT1UGH', 'Tribute: Blackened Basker T1 - Unlock Golden Hamburger', undefined, undefined, (n) => n * 1)
export const trBlackenedBaskerT2UMD = tr('BlackenedBaskerT2UMD', 'Tribute: Blackened Basker T2 - Unlock +1 Mining Drone!', 'drone_count', '+', (n) => n * 1)
export const trBlackenedBaskerT2RSC = tr('BlackenedBaskerT2RSC', 'Tribute: Blackened Basker T2 - Radiant Star Chance +2%', 'star_radiant_chance', '+', (n) => n * 0.02)

export const tributesSources = {
  trRainbowTroutT1LC,
  trRainbowTroutT1RFM,
  trRainbowTroutT2AFM,
  trRainbowTroutT2MNC,
  trDuneEelwormT1DC,
  trDuneEelwormT1GVPC,
  trDuneEelwormT1HC,
  trDuneEelwormT2EBCC,
  trDuneEelwormT2GVPM,
  trGlacialShellstealerT1GVC,
  trGlacialShellstealerT1TC,
  trGlacialShellstealerT2GVM,
  trGlacialShellstealerT2VDGC,
  trMegalodonT1CC,
  trMegalodonT1GFM,
  trMegalodonT1TSC,
  trMegalodonT2ASM,
  trMegalodonT2ASMSuper,
  trMegalodonT2SS10C,
  trRadioactiveSlugT1ABCM,
  trCthulhuT1ADTR,
  trCthulhuT1SSM,
  trCthulhuT2U1MD,
  trGlimmeringGeoduckT1FGPMCO,
  trGlimmeringGeoduckT1PSCM,
  trGlimmeringGeoduckT2POCM,
  trGlimmeringGeoduckT2UGGB,
  trLaviathanT1UIOABC,
  trLaviathanT2UIFALFC,
  trStormSerpentT1CPC,
  trStormSerpentT1LBC,
  trStormSerpentT1UGEB,
  trStormSerpentT2CSC,
  trStormSerpentT2LLM,
  trStormSerpentT2UGEON,
  trMeltingGibbousT1ASM,
  trMeltingGibbousT1NUC,
  trMeltingGibbousT1RPC,
  trMeltingGibbousT2GFC,
  trMeltingGibbousT2PQC,
  trMeltingGibbousT2UGLL,
  trBlackenedBaskerT1ADGC,
  trBlackenedBaskerT1RSSC,
  trBlackenedBaskerT1UGH,
  trBlackenedBaskerT2RSC,
  trBlackenedBaskerT2UMD,
}
