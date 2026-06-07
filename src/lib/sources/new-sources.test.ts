import { describe, it, expect } from 'vitest'
import { workshopSources as ws } from './workshop'
import { contractSources as ct } from './contracts'
import { artifactSources as art } from './artifacts'
import { constructSources as con } from './construct'
import { petSources as pet } from './pets'
import { cardSources as card } from './cards'
import { challengeSources as ch } from './challenges'

// ─── Workshop ─────────────────────────────────────────────────────────────────
describe('workshopSources', () => {
  it('bomb damage W1: 8 levels → +4.0 additive', () => {
    expect(ws.wsBombDmgW1.fn(8, {})).toBeCloseTo(4.0)
    expect(ws.wsBombDmgW1.fn(0, {})).toBe(0)
  })
  it('bomb damage W2: 20 levels → +7.0 additive', () => {
    expect(ws.wsBombDmgW2.fn(20, {})).toBeCloseTo(7.0)
  })
  it('bomb damage W3: 10 levels → ×2.50 multiplicative', () => {
    expect(ws.wsBombDmgW3.fn(10, {})).toBeCloseTo(2.50)
  })
  it('pickaxe damage W3: 25 levels → ×3.0 multiplicative', () => {
    expect(ws.wsPickaxeDmgW3.fn(25, {})).toBeCloseTo(3.0)
  })
  it('pickaxe+bomb W4: 30 levels → ×4.0 multiplicative', () => {
    expect(ws.wsPickaxeBombDmgW4.fn(30, {})).toBeCloseTo(4.0)
  })
  it('fishing ticks W3: 5 levels → +5 ticks', () => {
    expect(ws.wsFishingTicksW3.fn(5, {})).toBe(5)
  })
  it('hamburger bonus W3: 10 levels → +1.20 factor', () => {
    expect(ws.wsHamburgerBonusW3.fn(10, {})).toBeCloseTo(1.20)
  })
})

// ─── Contracts ────────────────────────────────────────────────────────────────
describe('contractSources', () => {
  it('pickaxe per contract: 100 contracts → +1.00 additive', () => {
    expect(ct.ctPickaxeDmgPerContract.fn(100, {})).toBeCloseTo(1.00)
  })
  it('bomb per contract: 50 contracts → +0.50 additive', () => {
    expect(ct.ctBombDmgPerContract.fn(50, {})).toBeCloseTo(0.50)
  })
  it('triple craft W1: max 5 → +5%', () => {
    expect(ct.ctTripleCraft.fn(5, {})).toBeCloseTo(0.05)
  })
  it('ore sell W2: max 10 → +150%', () => {
    expect(ct.ctOreSellPriceW2.fn(10, {})).toBeCloseTo(1.50)
  })
  it('pickaxe+bomb W3: 5 levels → ×1.40 multiplicative', () => {
    expect(ct.ctPickaxeBombDmgW3.fn(5, {})).toBeCloseTo(1.40)
  })
  it('omega crit W3: max 15 → +30%', () => {
    expect(ct.ctOmegaCritChance.fn(15, {})).toBeCloseTo(0.30)
  })
  it('all star mul W4: max 5 → +3.25%', () => {
    expect(ct.ctAllStarMul.fn(5, {})).toBeCloseTo(0.0325)
  })
})

// ─── Artifacts ────────────────────────────────────────────────────────────────
describe('artifactSources', () => {
  it('pickaxe T1: max 25 → +250% additive', () => {
    expect(art.artPickaxeDmgT1.fn(25, {})).toBeCloseTo(2.50)
  })
  it('bomb T2: max 25 → +1250% additive', () => {
    expect(art.artBombDmgT2.fn(25, {})).toBeCloseTo(12.50)
  })
  it('bomb T3: max 25 → +2000% additive', () => {
    expect(art.artBombDmgT3.fn(25, {})).toBeCloseTo(20.0)
  })
  it('bomb cap T3: max 10 → +30 capacity', () => {
    expect(art.artBombCapT3.fn(10, {})).toBe(30)
  })
  it('floor clear T2: max 10 → -50%', () => {
    expect(art.artFloorClearT2.fn(10, {})).toBeCloseTo(-0.50)
  })
  it('pickaxe T4: level 5, 10 statues → +500%', () => {
    expect(art.artPickaxeDmgT4.fn(5, { statueCount: 10 })).toBeCloseTo(5.0)
  })
  it('pickaxe T4: no statues → 0', () => {
    expect(art.artPickaxeDmgT4.fn(10, { statueCount: 0 })).toBe(0)
  })
  it('bomb T4: level 3, 4 statues → +180%', () => {
    expect(art.artBombDmgT4.fn(3, { statueCount: 4 })).toBeCloseTo(1.80)
  })
  it('bar output T4: max 10 → +4%', () => {
    expect(art.artBarOutputT4.fn(10, {})).toBeCloseTo(0.04)
  })
})

// ─── Construct ────────────────────────────────────────────────────────────────
describe('constructSources', () => {
  it('statue of rhythm: tier 0 → ×1 neutral', () => {
    expect(con.staRhythmPickaxe.fn(0, {})).toBe(1)
  })
  it('statue of rhythm: tier 1 normal → ×3', () => {
    expect(con.staRhythmPickaxe.fn(1, {})).toBe(3)
  })
  it('statue of rhythm: tier 3 platinized → ×8', () => {
    expect(con.staRhythmPickaxe.fn(3, {})).toBe(8)
  })
  it('statue of awareness bomb: tier 2 gilded → ×5', () => {
    expect(con.staAwarenessBombDmg.fn(2, {})).toBe(5)
  })
  it('statue of awareness ultra crit: tier 1/2 → 0, tier 3 → +20%', () => {
    expect(con.staAwarenessUltraCrit.fn(1, {})).toBe(0)
    expect(con.staAwarenessUltraCrit.fn(3, {})).toBeCloseTo(0.20)
  })
  it('statue of slaying prestige: tier 1 → ×2, tier 3 → ×5', () => {
    expect(con.staSlayingPrestigePts.fn(1, {})).toBe(2)
    expect(con.staSlayingPrestigePts.fn(3, {})).toBe(5)
  })
  it('statue of craftmanship pickaxe: tier 2 gilded → ×25', () => {
    expect(con.staCraftPickaxeDmg.fn(2, {})).toBe(25)
  })
  it('statue of eastwood exp: tier 2 gilded → ×10', () => {
    expect(con.staEastwoodExpGain.fn(2, {})).toBe(10)
    expect(con.staEastwoodExpGain.fn(3, {})).toBe(100)
  })
  it('statue of comfort W4: not owned → 0', () => {
    expect(con.staComfortDmg.fn(0, { w4StatueCount: 9 })).toBe(0)
  })
  it('statue of comfort W4: owned, 9 statues → +450%', () => {
    expect(con.staComfortDmg.fn(1, { w4StatueCount: 9 })).toBeCloseTo(4.50)
  })
  it('statue of randomness: golden vein chance tier 3 → +10%', () => {
    expect(con.staRandomnessGoldenVeinChance.fn(3, {})).toBeCloseTo(0.10)
  })
})

// ─── Pets ─────────────────────────────────────────────────────────────────────
describe('petSources', () => {
  it('dwarf pickaxe: level 10 → +200% additive', () => {
    expect(pet.petDwarfPickaxeDmg.fn(10, {})).toBeCloseTo(2.0)
  })
  it('dwarf pickaxe: level 0 → 0', () => {
    expect(pet.petDwarfPickaxeDmg.fn(0, {})).toBe(0)
  })
  it('dino pickaxe: level 5 → ×2.0 multiplicative', () => {
    expect(pet.petDinoPickaxeDmg.fn(5, {})).toBeCloseTo(2.0)
  })
  it('duck exp: level 10 → +120% additive', () => {
    expect(pet.petDuckExp.fn(10, {})).toBeCloseTo(1.20)
  })
  it('leprechaun game speed: level 20 → +30%', () => {
    expect(pet.petLeprechaunGameSpeed.fn(20, {})).toBeCloseTo(0.30)
  })
  it('axolotl bar craft: level 10 → -10% (reduction)', () => {
    expect(pet.petAxolotlBarCraft.fn(10, {})).toBeCloseTo(-0.10)
  })
  it('starfish supernova: level 5 → +1%', () => {
    expect(pet.petStarfishSupernovaChance.fn(5, {})).toBeCloseTo(0.01)
  })
  it('nagini golden ore: level 10 → +0.50 additive', () => {
    expect(pet.petNaginiGoldenOreMul.fn(10, {})).toBeCloseTo(0.50)
  })
  it('dwarf quest prestige: max 10 → +120%', () => {
    expect(pet.petDwarfQuestPrestigePts.fn(10, {})).toBeCloseTo(1.20)
  })
  it('whale quest lootbug: rank 5 → +5 cap', () => {
    expect(pet.petWhaleQuestLootbugBank.fn(5, {})).toBe(5)
  })
})

// ─── Cards ────────────────────────────────────────────────────────────────────
describe('cardSources', () => {
  it('alex: rarity 0 → ×1.00 neutral', () => {
    expect(card.cardAlex.fn(0, {})).toBeCloseTo(1.0)
  })
  it('alex: rarity 1 base → ×1.10', () => {
    expect(card.cardAlex.fn(1, {})).toBeCloseTo(1.10)
  })
  it('alex: rarity 2 gilded → ×1.20', () => {
    expect(card.cardAlex.fn(2, {})).toBeCloseTo(1.20)
  })
  it('alex: rarity 3 polychrome → ×1.40', () => {
    expect(card.cardAlex.fn(3, {})).toBeCloseTo(1.40)
  })
  it('bone: rarity 3 → ×1.15 bomb damage', () => {
    expect(card.cardBone.fn(3, {})).toBeCloseTo(1.15)
  })
  it("celio's hat: rarity 3 → ×1.40 prestige pts", () => {
    expect(card.cardCeliosHat.fn(3, {})).toBeCloseTo(1.40)
  })
  it('prestige card: rarity 3 → ×0.80 floor clear (reduction)', () => {
    expect(card.cardPrestige.fn(3, {})).toBeCloseTo(0.80)
  })
  it('super star card: rarity 2 → ×1.10 all star', () => {
    expect(card.cardSuperStar.fn(2, {})).toBeCloseTo(1.10)
  })
  it('freebie card: rarity 3 → +4 gems', () => {
    expect(card.cardFreebie.fn(3, {})).toBe(4)
  })
  it('golden lootbug card: rarity 1 → +2% chance', () => {
    expect(card.cardGoldenLootbug.fn(1, {})).toBeCloseTo(0.02)
  })
  it('fishing rod card: rarity 1 → ×1.02', () => {
    expect(card.cardFishingRod.fn(1, {})).toBeCloseTo(1.02)
  })
  it('super stonks: rarity 3 → +2% chance', () => {
    expect(card.cardSuperStonks.fn(3, {})).toBeCloseTo(0.02)
  })
})

// ─── Challenges ───────────────────────────────────────────────────────────────
describe('challengeSources', () => {
  it('golden floor mul (extreme): max 2 → +2.0 additive', () => {
    expect(ch.chGoldenFloorMul.fn(2, {})).toBeCloseTo(2.0)
  })
  it('bomb cap: max 1 → +3', () => {
    expect(ch.chBombCap.fn(1, {})).toBe(3)
  })
  it('double craft: max 3 → +9%', () => {
    expect(ch.chDoubleCraft.fn(3, {})).toBeCloseTo(0.09)
  })
  it('super stonks divine: max 1 → +1%', () => {
    expect(ch.chSuperStonksChance.fn(1, {})).toBeCloseTo(0.01)
  })
  it('bomb super crit: max 1 → +25%', () => {
    expect(ch.chBombSuperCrit.fn(1, {})).toBeCloseTo(0.25)
  })
  it('rainbow floor mul extreme: max 3 → +15%', () => {
    expect(ch.chRainbowFloorMulExtreme.fn(3, {})).toBeCloseTo(0.15)
  })
})
