import catalog from './grimoire.generated.json';
export type Folio = typeof catalog.entries[number];
export const folios = catalog.entries;
export const schools = catalog.schools;
export const grimoireKey = catalog.key;
export const provenance = catalog;
export function isCheckedSource(lean: string, spell: string, decoded: string, folio?: Folio): boolean {
  return !!folio && lean === folio.lean && decoded === lean && spell.trim().length > 0 &&
    catalog.verification.originalBuild && catalog.verification.decodedBuild && catalog.verification.axiomAudit;
}
