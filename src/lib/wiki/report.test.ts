import { describe, expect, it } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { buildWikiReport } from "./report";

// Regenerates data/wiki/report.md on every test run so the audit report in
// git always reflects the current formulas + dumps. The assertions only
// guard that the report machinery works; findings are leads, not failures.
describe("wiki cross-check report", () => {
  it("builds and writes data/wiki/report.md", () => {
    const report = buildWikiReport((p) => readFileSync(p, "utf8"));
    expect(report).toContain("# Wiki ↔ formula cross-check");
    expect(report).toContain("Stats checked:");
    writeFileSync("data/wiki/report.md", report);
  });
});
