import { describe, expect, it } from 'vitest'
import { relicSources } from './relics'
import { itemSources } from './items'
import { storeSources } from './store'

// ── relicSources ────────────────────────────────────────────────────────────

describe('relicSources', () => {
  it('common pickaxe damage: 100 relics → +3.00 (300%)', () => {
    expect(relicSources.commonRelicPickaxeDamage.fn(100, {})).toBeCloseTo(3.00)
  })
  it('rare bomb damage: 50 relics → +10.00 (1000%)', () => {
    expect(relicSources.rareRelicBombDamage.fn(50, {})).toBeCloseTo(10.00)
  })
  it('epic pickaxe damage: 10 relics → +1.00 (100%)', () => {
    expect(relicSources.epicRelicPickaxeDamage.fn(10, {})).toBeCloseTo(1.00)
  })
  it('legendary prestige pts: 5 relics → +0.75 (75%)', () => {
    expect(relicSources.legendaryRelicPrestigePts.fn(5, {})).toBeCloseTo(0.75)
  })
  it('mythic golden floor chance: 20 relics → +1.00 (100%)', () => {
    expect(relicSources.mythicRelicGoldenFloorChance.fn(20, {})).toBeCloseTo(1.00)
  })
  it('divine rainbow floor: 5 relics → +0.05 (5%)', () => {
    expect(relicSources.divineRelicRainbowFloor.fn(5, {})).toBeCloseTo(0.05)
  })
  it('divine supernova mul: 5 relics → +10', () => {
    expect(relicSources.divineRelicSupernovaMul.fn(5, {})).toBeCloseTo(10)
  })
})

// ── itemSources ─────────────────────────────────────────────────────────────

describe('itemSources', () => {
  it('apple inactive (0) → 0 crit chance', () => {
    expect(itemSources.apple.fn(0, {})).toBe(0)
  })
  it('apple active (1) → +0.10 crit chance', () => {
    expect(itemSources.apple.fn(1, {})).toBeCloseTo(0.10)
  })
  it('bread inactive → neutral factor 1', () => {
    expect(itemSources.bread.fn(0, {})).toBeCloseTo(1)
  })
  it('bread active → ×1.25 factor', () => {
    expect(itemSources.bread.fn(1, {})).toBeCloseTo(1.25)
  })
  it('blue cow inactive → factor 1', () => {
    expect(itemSources.blueCow.fn(0, {})).toBeCloseTo(1)
  })
  it('blue cow active → ×2.00 game speed', () => {
    expect(itemSources.blueCow.fn(1, {})).toBeCloseTo(2.00)
  })
  it('chaos totem bomb damage active → ×3.00', () => {
    expect(itemSources.chaosTotemBombDamage.fn(1, {})).toBeCloseTo(3.00)
  })
  it('hamburger pickaxe active → ×3.00', () => {
    expect(itemSources.hamburgerPickaxe.fn(1, {})).toBeCloseTo(3.00)
  })
  it('lootbug lantern perm cap: 10 lanterns → +10', () => {
    expect(itemSources.lootbugLanternPermCap.fn(10, {})).toBe(10)
  })
  it('cosmic candy perm: 50 candies → +0.05 all star multi', () => {
    expect(itemSources.cosmicCandyPerm.fn(50, {})).toBeCloseTo(0.05)
  })
})

describe('itemSources — golden variants', () => {
  it('golden eye of newt: triple rock +50% active', () => {
    expect(itemSources.goldenEyeOfNewtTripleRock.fn(0, {})).toBe(0)
    expect(itemSources.goldenEyeOfNewtTripleRock.fn(1, {})).toBeCloseTo(0.50)
  })
  it('golden eye of newt: golden floor ×1.50 active', () => {
    expect(itemSources.goldenEyeOfNewtGoldenFloor.fn(0, {})).toBeCloseTo(1)
    expect(itemSources.goldenEyeOfNewtGoldenFloor.fn(1, {})).toBeCloseTo(1.50)
  })
  it('golden chaos totem: bomb damage ×9.00', () => {
    expect(itemSources.goldenChaosTotemBombDamage.fn(1, {})).toBeCloseTo(9.00)
  })
  it('golden chaos totem: bomb recharge ×2.30', () => {
    expect(itemSources.goldenChaosTotemBombRecharge.fn(1, {})).toBeCloseTo(2.30)
  })
  it('golden primal meat: pickaxe +200% (additive 2.0)', () => {
    expect(itemSources.goldenPrimalMeatPickaxe.fn(1, {})).toBeCloseTo(2.0)
    expect(itemSources.goldenPrimalMeatPickaxe.fn(0, {})).toBe(0)
  })
  it('golden primal meat: super star spawn ×1.50', () => {
    expect(itemSources.goldenPrimalMeatSuperStar.fn(1, {})).toBeCloseTo(1.50)
  })
  it('golden strawberries: exp gain ×6.00', () => {
    expect(itemSources.goldenStrawberriesExp.fn(1, {})).toBeCloseTo(6.00)
    expect(itemSources.goldenStrawberriesExp.fn(0, {})).toBeCloseTo(1)
  })
  it('golden strawberries: golden vein +400% (additive 4.0)', () => {
    expect(itemSources.goldenStrawberriesGoldenVein.fn(1, {})).toBeCloseTo(4.0)
  })
  it('golden hamburger: pickaxe ×6.00', () => {
    expect(itemSources.goldenHamburgerPickaxe.fn(1, {})).toBeCloseTo(6.00)
  })
  it('golden hamburger: bomb ×6.00', () => {
    expect(itemSources.goldenHamburgerBomb.fn(1, {})).toBeCloseTo(6.00)
  })
  it('golden starfruit: all star multi +60%', () => {
    expect(itemSources.goldenStarfruitAllStarMulti.fn(1, {})).toBeCloseTo(0.60)
  })
  it('golden starfruit: supernova chance +20%', () => {
    expect(itemSources.goldenStarfruitSupernovaChance.fn(1, {})).toBeCloseTo(0.20)
  })
  it('golden rainbow lollipop: floor chance +6%', () => {
    expect(itemSources.goldenRainbowLollipopChance.fn(1, {})).toBeCloseTo(0.06)
  })
  it('golden rainbow lollipop: floor multi ×6.00', () => {
    expect(itemSources.goldenRainbowLollipopMul.fn(1, {})).toBeCloseTo(6.00)
  })
  it('golden yummy pizza: golden floor ×1.30', () => {
    expect(itemSources.goldenYummyPizzaGoldenFloor.fn(1, {})).toBeCloseTo(1.30)
    expect(itemSources.goldenYummyPizzaGoldenFloor.fn(0, {})).toBeCloseTo(1)
  })
  it('golden lootbug lantern: spawn rate ×6.00', () => {
    expect(itemSources.goldenLootbugLanternSpawn.fn(1, {})).toBeCloseTo(6.00)
  })
  it('golden lootbug lantern perm: 30 lanterns → +30 cap', () => {
    expect(itemSources.goldenLootbugLanternPermCap.fn(30, {})).toBe(30)
  })
  it('golden cosmic candy: all star ×5.00', () => {
    expect(itemSources.goldenCosmicCandyBuff.fn(1, {})).toBeCloseTo(5.00)
  })
  it('golden cosmic candy perm: 100 candies → +0.10', () => {
    expect(itemSources.goldenCosmicCandyPerm.fn(100, {})).toBeCloseTo(0.10)
  })
  it('all golden variants share distinct keys from base items', () => {
    expect(itemSources.goldenHamburgerPickaxe.key).not.toBe(itemSources.hamburgerPickaxe.key)
    expect(itemSources.goldenStarfruitAllStarMulti.key).not.toBe(itemSources.starfruitAllStarMulti.key)
    expect(itemSources.goldenChaosTotemBombDamage.key).not.toBe(itemSources.chaosTotemBombDamage.key)
  })
})

// ── storeSources ─────────────────────────────────────────────────────────────

describe('storeSources — perks', () => {
  it('perkOreIncome not owned → factor 1', () => {
    expect(storeSources.perkOreIncome.fn(0, {})).toBeCloseTo(1)
  })
  it('perkOreIncome owned → factor 2', () => {
    expect(storeSources.perkOreIncome.fn(1, {})).toBeCloseTo(2)
  })
  it('perkBombDamage owned → factor 3', () => {
    expect(storeSources.perkBombDamage.fn(1, {})).toBeCloseTo(3)
  })
})

describe('storeSources — gem upgrades', () => {
  it('gemPickaxeDamage level 0 → factor 1', () => {
    expect(storeSources.gemPickaxeDamage.fn(0, {})).toBeCloseTo(1)
  })
  it('gemPickaxeDamage level 5 → factor 2.00', () => {
    expect(storeSources.gemPickaxeDamage.fn(5, {})).toBeCloseTo(2.00)
  })
  it('gemOreSellPrice level 1 → factor 2.00', () => {
    expect(storeSources.gemOreSellPrice.fn(1, {})).toBeCloseTo(2.00)
  })
  it('gemFreebieBank level 3 → +3', () => {
    expect(storeSources.gemFreebieBank.fn(3, {})).toBe(3)
  })
})

describe('storeSources — founder tiers', () => {
  it('founderCraft10x: tier below unlock (2) → 0', () => {
    expect(storeSources.founderCraft10x.fn(1, { founderTier: 2 })).toBe(0)
  })
  it('founderCraft10x: exactly at unlock tier 3 → base 0.02', () => {
    expect(storeSources.founderCraft10x.fn(1, { founderTier: 3 })).toBeCloseTo(0.02)
  })
  it('founderCraft10x: tier 5 → 0.02 + 2×0.01 = 0.04', () => {
    expect(storeSources.founderCraft10x.fn(1, { founderTier: 5 })).toBeCloseTo(0.04)
  })
  it('founderGameSpeed: tier 10 → 0.10', () => {
    expect(storeSources.founderGameSpeed.fn(1, { founderTier: 10 })).toBeCloseTo(0.10)
  })
  it('founderGameSpeed: tier 12 → 0.10 + 2×0.01 = 0.12', () => {
    expect(storeSources.founderGameSpeed.fn(1, { founderTier: 12 })).toBeCloseTo(0.12)
  })
  it('founderGameSpeed: not purchased (owned=0) → 0', () => {
    expect(storeSources.founderGameSpeed.fn(0, { founderTier: 12 })).toBe(0)
  })
})

describe('storeSources — value packs', () => {
  it('vpGottaGoFastGameSpeed not owned → 0', () => {
    expect(storeSources.vpGottaGoFastGameSpeed.fn(0, {})).toBe(0)
  })
  it('vpGottaGoFastGameSpeed owned → +0.10 game speed', () => {
    expect(storeSources.vpGottaGoFastGameSpeed.fn(1, {})).toBeCloseTo(0.10)
  })
  it('vpBallerOreSell owned → factor 2.00', () => {
    expect(storeSources.vpBallerOreSell.fn(1, {})).toBeCloseTo(2.00)
  })
  it('vpBallerOreSell not owned → factor 1', () => {
    expect(storeSources.vpBallerOreSell.fn(0, {})).toBeCloseTo(1)
  })
  it('vpBankersFreebieBank owned → +3', () => {
    expect(storeSources.vpBankersFreebieBank.fn(1, {})).toBe(3)
  })
  it('vpProgressionGoldenFloor owned → factor 1.20', () => {
    expect(storeSources.vpProgressionGoldenFloor.fn(1, {})).toBeCloseTo(1.20)
  })
})
