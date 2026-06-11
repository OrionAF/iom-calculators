/**
 * Parser for the wiki's {{Stat|...}} templates (data/wiki/Stats_*.json).
 *
 * Wiki notation (see the Stats main page, "General Principles"):
 *   | '''System'''<math>op</math> | entry<math>op</math><br>entry...
 * - The op after a system name is how that menu group JOINS the stat
 *   (default: × — "different menu effects are multiplicative").
 * - Ops between entries say how sources combine WITHIN the group
 *   (default: + — "bonuses within one menu are usually additive").
 * - Parentheses inside a group mark a sub-formula: (A + B) × C.
 * - <math>?</math> marks partially-unknown contributions.
 * - "(Multiplies everything/ALL ...)" marks a stat-wide multiplier.
 * - "(Adds to the base ...)" marks an addition to the base value.
 */

export type WikiOp = "+" | "×" | "=";

export interface WikiEntry {
  /** Markup-stripped display text of the source. */
  text: string;
  /** Op joining this entry to the next within the group (undefined = group default '+'). */
  opAfter?: WikiOp;
  /** Entry is inside a parenthesized sub-expression. */
  inParens: boolean;
  unknown: boolean;
  multipliesAll: boolean;
  addsToBase: boolean;
}

export interface WikiGroup {
  system: string;
  /** How the group's total joins the stat. Default '×' per wiki convention. */
  joinOp: WikiOp;
  joinOpExplicit: boolean;
  entries: WikiEntry[];
  hasParens: boolean;
}

export interface WikiStat {
  name: string;
  description: string;
  groups: WikiGroup[];
}

const MATH_OP: Record<string, WikiOp> = { "+": "+", "\\times": "×", "=": "=" };

/** Split template body on top-level '|' (ignores | inside {{...}} and [[...]]). */
function splitTop(body: string): string[] {
  const fields: string[] = [];
  let depth = 0;
  let cur = "";
  for (let i = 0; i < body.length; i++) {
    const two = body.slice(i, i + 2);
    if (two === "{{" || two === "[[") {
      depth++;
      cur += two;
      i++;
    } else if (two === "}}" || two === "]]") {
      depth--;
      cur += two;
      i++;
    } else if (body[i] === "|" && depth === 0) {
      fields.push(cur);
      cur = "";
    } else {
      cur += body[i];
    }
  }
  fields.push(cur);
  return fields;
}

/** Strip wiki markup down to readable text. */
export function stripMarkup(s: string): string {
  return s
    .replace(/\{\{Sprite\|([^|}]*)[^}]*\}\}/g, "$1")
    .replace(/\{\{Edit button[^}]*\}\}/g, "?")
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1")
    .replace(/\[\[([^\]]*)\]\]/g, "$1")
    .replace(/<math>[^<]*<\/math>/g, "")
    .replace(/'''/g, "")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseEntries(raw: string): {
  entries: WikiEntry[];
  hasParens: boolean;
} {
  const entries: WikiEntry[] = [];
  let inParens = false;
  let hasParens = false;
  const parts = raw.split(/<br\s*\/?>/);
  for (const part of parts) {
    if (part.trim() === "") continue;
    let p = part;
    // Parenthesis state: an unmatched '(' opens a sub-expression; an
    // unmatched ')' closes it. Parens inside annotations like
    // "(Adds to base 5x)" or "(Requires ...)" are balanced and ignored.
    const opens = (p.match(/\(/g) ?? []).length;
    const closes = (p.match(/\)/g) ?? []).length;
    const entersParens = opens > closes;
    const exitsParens = closes > opens;

    const opMatches = [
      ...p.matchAll(
        /<math>\s*(\+|\\times|=)\s*\??<\/math>|<math>\+\?<\/math>/g,
      ),
    ];
    const lastOp = opMatches.length
      ? MATH_OP[opMatches[opMatches.length - 1][1] ?? "+"]
      : undefined;
    const unknown =
      /<math>\s*\??\s*\+?\?\s*<\/math>|\{\{Edit button\|text=\?\}\}|<math>\?<\/math>/.test(
        p,
      );

    const text = stripMarkup(p)
      .replace(/^\(/, "")
      .replace(/\)\s*$/, "")
      .trim();
    if (text === "" || text === "N/A") continue;

    const wasInParens = inParens;
    if (entersParens) {
      inParens = true;
      hasParens = true;
    }
    entries.push({
      text,
      opAfter: lastOp,
      inParens: wasInParens || entersParens,
      unknown,
      multipliesAll: /\(\s*multiplies (everything|all)/i.test(part),
      addsToBase: /\(\s*adds to (the )?base/i.test(part),
    });
    if (exitsParens) inParens = false;
  }
  return { entries, hasParens };
}

/** Parse one {{Stat|...}} template body (content between the braces). */
export function parseStatTemplate(body: string): WikiStat | null {
  const fields = splitTop(body);
  // fields[0] = 'Stat', [1] = name, [2] = description, rest = group data
  if (fields.length < 3) return null;
  const name = stripMarkup(fields[1]);
  const description = stripMarkup(fields[2]);
  const groups: WikiGroup[] = [];

  for (let i = 3; i < fields.length; i++) {
    const f = fields[i];
    if (/^\s*\w+=/.test(f)) continue; // named params like spriteOverride=
    const header = f.match(
      /'''([^']+)'''\s*(?:<math>\s*(\+|\\times|=)\s*<\/math>)?/,
    );
    if (!header) continue;
    const system = header[1].trim();
    const joinOpExplicit = header[2] !== undefined;
    const joinOp: WikiOp = header[2] ? MATH_OP[header[2]] : "×";
    const entriesField = fields[i + 1] ?? "";
    const { entries, hasParens } = parseEntries(entriesField);
    if (system === "N/A") continue;
    groups.push({ system, joinOp, joinOpExplicit, entries, hasParens });
    i++; // consumed the entries field
  }
  return { name, description, groups };
}

/** Parse a whole Stats subpage's wikitext into its stat definitions. */
export function parseStatsPage(wikitext: string): WikiStat[] {
  const stats: WikiStat[] = [];
  // Find each {{Stat ... }} template with brace matching.
  let idx = 0;
  for (;;) {
    const start = wikitext.indexOf("{{Stat|", idx);
    if (start === -1) break;
    let depth = 0;
    let end = -1;
    for (let i = start; i < wikitext.length - 1; i++) {
      const two = wikitext.slice(i, i + 2);
      if (two === "{{") {
        depth++;
        i++;
      } else if (two === "}}") {
        depth--;
        i++;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end === -1) break;
    const body = wikitext.slice(start + 2, end - 2);
    const stat = parseStatTemplate(body);
    if (stat) stats.push(stat);
    idx = end;
  }
  return stats;
}
