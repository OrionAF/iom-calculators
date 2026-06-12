import { describe, expect, it } from 'vitest'
import { relicSources } from './relics'
import { itemSources } from './items'
import { storeSources } from './store'

// ── relicSources ────────────────────────────────────────────────────────────

describe('relicSources', () => {
  it('common pickaxe damage: 100 relics → +3.00 (300%)', () => {
    expect(relicSources.commonRelicPickaxeDamage.fn(100, {})).toBeCloseTo(3.0)
  })
  it('rare bomb damage: 50 relics → +10.00 (1000%)', () => {
    expect(relicSources.rareRelicBombDamage.fn(50, {})).toBeCloseTo(10.0)
  })
  it('epic pickaxe damage: 10 relics → +1.00 (100%)', () => {
    expect(relicSources.epicRelicPickaxeDamage.fn(10, {})).toBeCloseTo(1.0)
  })
  it('legendary prestige pts: 5 relics → +0.75 (75%)', () => {
    expect(relicSources.legendaryRelicPrestigePts.fn(5, {})).toBeCloseTo(0.75)
  })
  it('mythic golden floor chance: 20 relics → +1.00 (100%)', () => {
    expect(relicSources.mythicRelicGoldenFloorChance.fn(20, {})).toBeCloseTo(1.0)
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
    expect(itemSources.apple.fn(1, {})).toBeCloseTo(0.1)
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
    expect(itemSources.blueCow.fn(1, {})).toBeCloseTo(2.0)
  })
  it('chaos totem bomb damage active → ×3.00', () => {
    expect(itemSources.chaosTotemBombDamage.fn(1, {})).toBeCloseTo(3.0)
  })
  it('hamburger pickaxe active → ×3.00', () => {
    expect(itemSources.hamburgerPickaxe.fn(1, {})).toBeCloseTo(3.0)
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
    expect(itemSources.goldenEyeOfNewtTripleRock.fn(1, {})).toBeCloseTo(0.5)
  })
  it('golden eye of newt: golden floor ×1.50 active', () => {
    expect(itemSources.goldenEyeOfNewtGoldenFloor.fn(0, {})).toBeCloseTo(1)
    expect(itemSources.goldenEyeOfNewtGoldenFloor.fn(1, {})).toBeCloseTo(1.5)
  })
  it('golden chaos totem: bomb damage ×9.00', () => {
    expect(itemSources.goldenChaosTotemBombDamage.fn(1, {})).toBeCloseTo(9.0)
  })
  it('golden chaos totem: bomb recharge ×2.30', () => {
    expect(itemSources.goldenChaosTotemBombRecharge.fn(1, {})).toBeCloseTo(2.3)
  })
  it('golden primal meat: pickaxe +200% (additive 2.0)', () => {
    expect(itemSources.goldenPrimalMeatPickaxe.fn(1, {})).toBeCloseTo(2.0)
    expect(itemSources.goldenPrimalMeatPickaxe.fn(0, {})).toBe(0)
  })
  it('golden primal meat: super star spawn ×1.50', () => {
    expect(itemSources.goldenPrimalMeatSuperStar.fn(1, {})).toBeCloseTo(1.5)
  })
  it('golden strawberries: exp gain ×6.00', () => {
    expect(itemSources.goldenStrawberriesExp.fn(1, {})).toBeCloseTo(6.0)
    expect(itemSources.goldenStrawberriesExp.fn(0, {})).toBeCloseTo(1)
  })
  it('golden strawberries: golden vein +400% (additive 4.0)', () => {
    expect(itemSources.goldenStrawberriesGoldenVein.fn(1, {})).toBeCloseTo(4.0)
  })
  it('golden hamburger: pickaxe ×6.00', () => {
    expect(itemSources.goldenHamburgerPickaxe.fn(1, {})).toBeCloseTo(6.0)
  })
  it('golden hamburger: bomb ×6.00', () => {
    expect(itemSources.goldenHamburgerBomb.fn(1, {})).toBeCloseTo(6.0)
  })
  it('golden starfruit: all star multi +60%', () => {
    expect(itemSources.goldenStarfruitAllStarMulti.fn(1, {})).toBeCloseTo(0.6)
  })
  it('golden starfruit: supernova chance +20%', () => {
    expect(itemSources.goldenStarfruitSupernovaChance.fn(1, {})).toBeCloseTo(0.2)
  })
  it('golden rainbow lollipop: floor chance +6%', () => {
    expect(itemSources.goldenRainbowLollipopChance.fn(1, {})).toBeCloseTo(0.06)
  })
  it('golden rainbow lollipop: floor multi ×6.00', () => {
    expect(itemSources.goldenRainbowLollipopMul.fn(1, {})).toBeCloseTo(6.0)
  })
  it('golden yummy pizza: golden floor ×1.30', () => {
    expect(itemSources.goldenYummyPizzaGoldenFloor.fn(1, {})).toBeCloseTo(1.3)
    expect(itemSources.goldenYummyPizzaGoldenFloor.fn(0, {})).toBeCloseTo(1)
  })
  it('golden lootbug lantern: spawn rate ×6.00', () => {
    expect(itemSources.goldenLootbugLanternSpawn.fn(1, {})).toBeCloseTo(6.0)
  })
  it('golden lootbug lantern perm: 30 lanterns → +30 cap', () => {
    expect(itemSources.goldenLootbugLanternPermCap.fn(30, {})).toBe(30)
  })
  it('golden cosmic candy: all star ×5.00', () => {
    expect(itemSources.goldenCosmicCandyBuff.fn(1, {})).toBeCloseTo(5.0)
  })
  it('golden cosmic candy perm: 100 candies → +0.10', () => {
    expect(itemSources.goldenCosmicCandyPerm.fn(100, {})).toBeCloseTo(0.1)
  })
  it('all golden variants share distinct keys from base items', () => {
    expect(itemSources.goldenHamburgerPickaxe.key).not.toBe(itemSources.hamburgerPickaxe.key)
    expect(itemSources.goldenStarfruitAllStarMulti.key).not.toBe(itemSources.starfruitAllStarMulti.key)
    expect(itemSources.goldenChaosTotemBombDamage.key).not.toBe(itemSources.chaosTotemBombDamage.key)
  })
})

// ── storeSources ─────────────────────────────────────────────────────────────

describe('storeSources — perks', () => {
  it('storePerkOreIncome not owned → factor 1', () => {
    expect(storeSources.storePerkOreIncome.fn(0, {})).toBeCloseTo(1)
  })
  it('storePerkOreIncome owned → factor 2', () => {
    expect(storeSources.storePerkOreIncome.fn(1, {})).toBeCloseTo(2)
  })
  it('storePerkBombDamage owned → factor 3', () => {
    expect(storeSources.storePerkBombDamage.fn(1, {})).toBeCloseTo(3)
  })
})

describe('storeSources — gem upgrades', () => {
  it('storeGemPickaxeDamage level 0 → factor 1', () => {
    expect(storeSources.storeGemPickaxeDamage.fn(0, {})).toBeCloseTo(1)
  })
  it('storeGemPickaxeDamage level 5 → factor 2.00', () => {
    expect(storeSources.storeGemPickaxeDamage.fn(5, {})).toBeCloseTo(2.0)
  })
  it('gemOreSellPrice level 1 → factor 2.00', () => {
    expect(storeSources.storeGemOreSellPrice.fn(1, {})).toBeCloseTo(2.0)
  })
  it('gemFreebieBank level 3 → +3', () => {
    expect(storeSources.storeGemFreebieBank.fn(3, {})).toBe(3)
  })
})

describe('storeSources — founder tiers (level = founder tier)', () => {
  it('founderCraft10x: tier below unlock (2) → 0', () => {
    expect(storeSources.storeFounderCraft10x.fn(2, {})).toBe(0)
  })
  it('founderCraft10x: exactly at unlock tier 3 → base 0.02', () => {
    expect(storeSources.storeFounderCraft10x.fn(3, {})).toBeCloseTo(0.02)
  })
  it('founderCraft10x: tier 5 → 0.02 + 2×0.01 = 0.04', () => {
    expect(storeSources.storeFounderCraft10x.fn(5, {})).toBeCloseTo(0.04)
  })
  it('founderGameSpeed: tier 10 → 0.10', () => {
    expect(storeSources.storeFounderGameSpeed.fn(10, {})).toBeCloseTo(0.1)
  })
  it('founderGameSpeed: tier 12 → 0.10 + 2×0.01 = 0.12', () => {
    expect(storeSources.storeFounderGameSpeed.fn(12, {})).toBeCloseTo(0.12)
  })
  it('founderGameSpeed: tier 0 (not purchased) → 0', () => {
    expect(storeSources.storeFounderGameSpeed.fn(0, {})).toBe(0)
  })
  it('founderSupplyDropCd: tier 12 → 60 - 11×2 = 38 minutes', () => {
    expect(storeSources.storeFounderSupplyDropCd.fn(12, {})).toBe(38)
  })
})

describe('storeSources — value packs', () => {
  it('vpGottaGoFastGameSpeed not owned → 0', () => {
    expect(storeSources.storeVpGottaGoFastGameSpeed.fn(0, {})).toBe(0)
  })
  it('vpGottaGoFastGameSpeed owned → +0.10 game speed', () => {
    expect(storeSources.storeVpGottaGoFastGameSpeed.fn(1, {})).toBeCloseTo(0.1)
  })
  it('vpBallerOreSell owned → factor 2.00', () => {
    expect(storeSources.storeVpBallerOreSell.fn(1, {})).toBeCloseTo(2.0)
  })
  it('vpBallerOreSell not owned → factor 1', () => {
    expect(storeSources.storeVpBallerOreSell.fn(0, {})).toBeCloseTo(1)
  })
  it('vpBankersFreebieBank owned → +3', () => {
    expect(storeSources.storeVpBankersFreebieBank.fn(1, {})).toBe(3)
  })
  it('vpProgressionGoldenFloor owned → factor 1.20', () => {
    expect(storeSources.storeVpProgressionGoldenFloor.fn(1, {})).toBeCloseTo(1.2)
  })
})
