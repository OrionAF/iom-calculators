import { describe, expect, it } from "vitest";
import { ALL_FORMULAS } from "./index";
import { isGroup } from "$lib/engine/types";

/**
 * Shape guard: a source's fn(0) must be neutral for the position it occupies.
 *   '+' / '×1+' positions need bonus-shaped fns:  fn(0) = 0
 *   '×'         positions need factor-shaped fns: fn(0) = 1
 * A wrong-shaped source silently zeroes a product or inflates a sum the
 * moment the player doesn't own it — the bug class that hit fishing twice.
 * '=' is exempt: a setter's level-0 value is never read in isolation.
 */
describe("formula shape guard", () => {
  it("every contribution fn(0) is neutral for its op", () => {
    const violations: string[] = [];
    for (const [statKey, formula] of Object.entries(ALL_FORMULAS)) {
      for (const term of formula.contributions) {
        const members = isGroup(term) ? term.contributions : [term];
        for (const c of members) {
          if (c.unknown || c.op === "=") continue;
          const v0 = c.source.fn(0, {});
          const expected = c.op === "×" ? 1 : 0;
          if (Math.abs(v0 - expected) > 1e-9) {
            violations.push(
              `${statKey} ← ${c.source.key} op '${c.op}': fn(0) = ${v0}, expected ${expected}`,
            );
          }
        }
      }
    }
    expect(violations, "\n" + violations.join("\n")).toHaveLength(0);
  });
});
