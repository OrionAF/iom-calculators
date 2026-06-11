import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { parseStatsPage } from "./parse";

function loadPage(name: string): string {
  const json = JSON.parse(readFileSync(`data/wiki/${name}.json`, "utf8"));
  return json.wikitext as string;
}

describe("parseStatsPage — real wiki dumps", () => {
  it("parses every Stats subpage without throwing and finds stats", () => {
    const pages = [
      "Stats_Pickaxe",
      "Stats_Bombs",
      "Stats_Drones",
      "Stats_Ore",
      "Stats_Crafting",
      "Stats_Obelisk",
      "Stats_Prestige",
      "Stats_Lootbugs",
      "Stats_Lootfrogs",
      "Stats_Chests",
      "Stats_Contracts",
      "Stats_Veins",
      "Stats_Stars",
      "Stats_Fishing",
      "Stats_Misc",
    ];
    for (const page of pages) {
      const stats = parseStatsPage(loadPage(page));
      expect(stats.length, `${page} parsed no stats`).toBeGreaterThan(0);
    }
  });

  it("Banked Freebie Cap: Store group joins +, contains parens, Skins has Multiplies-ALL", () => {
    const stats = parseStatsPage(loadPage("Stats_Chests"));
    const stat = stats.find((s) => s.name === "Banked Freebie Cap")!;
    expect(stat).toBeDefined();
    const store = stat.groups.find((g) => g.system === "Store")!;
    expect(store.joinOp).toBe("+");
    expect(store.hasParens).toBe(true);
    expect(store.entries.length).toBe(6); // 5 inside parens + Chief Executive
    const skins = stat.groups.find((g) => g.system === "Skins")!;
    expect(skins.entries.some((e) => e.multipliesAll)).toBe(true);
  });

  it("Pickaxe Damage: Items group is (Rock Cake + Primal Meat) × Hamburger", () => {
    const stats = parseStatsPage(loadPage("Stats_Pickaxe"));
    const stat = stats.find((s) => s.name === "Pickaxe Damage")!;
    const items = stat.groups.find((g) => g.system === "Items")!;
    expect(items.hasParens).toBe(true);
    expect(items.entries.map((e) => e.text)).toEqual([
      "Rock Cake",
      "Primal Meat",
      "Hamburger",
    ]);
    expect(items.entries[0].inParens).toBe(true);
    expect(items.entries[1].inParens).toBe(true);
    expect(items.entries[2].inParens).toBe(false);
    // Primal Meat is joined to Hamburger with ×
    expect(items.entries[1].opAfter).toBe("×");
  });

  it("Auto-Catch Chance: Drones group joins with =", () => {
    const stats = parseStatsPage(loadPage("Stats_Stars"));
    const stat = stats.find((s) => s.name === "Auto-Catch Chance")!;
    const drones = stat.groups.find((g) => g.system === "Drones")!;
    expect(drones.joinOp).toBe("=");
  });

  it("chance stats: group joins are explicit +", () => {
    const stats = parseStatsPage(loadPage("Stats_Fishing"));
    const stat = stats.find((s) => s.name === "Triple Fish Tick Chance")!;
    for (const g of stat.groups) {
      expect(g.joinOp, `${g.system} should join +`).toBe("+");
      expect(g.joinOpExplicit).toBe(true);
    }
  });

  it("Super Shiny Multiplier: Fishing entries flagged Adds-to-base", () => {
    const stats = parseStatsPage(loadPage("Stats_Fishing"));
    const stat = stats.find((s) => s.name === "Super Shiny Multiplier")!;
    const fishing = stat.groups.find((g) => g.system === "Fishing")!;
    expect(fishing.entries.every((e) => e.addsToBase)).toBe(true);
  });
});
