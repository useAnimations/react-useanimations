// Grammar helpers for message files, so no language builds sentences with English rules.

/** 'a, b and c' in the language's own style (Intl.ListFormat). */
export const listIn =
  (intl: string) =>
  (items: string[]): string =>
    new Intl.ListFormat(intl, { style: 'long', type: 'conjunction' }).format(items);

/**
 * A count with the right noun form: pluralIn('cs')(n, { one: 'ikona', few: 'ikony', other: 'ikon' }).
 * Forms follow Intl.PluralRules; `other` is required and covers any form left out.
 */
export const pluralIn =
  (intl: string) =>
  (n: number, forms: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }): string =>
    `${n} ${forms[new Intl.PluralRules(intl).select(n)] ?? forms.other}`;

/** The noun form alone, without the number. */
export const formIn =
  (intl: string) =>
  (n: number, forms: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }): string =>
    forms[new Intl.PluralRules(intl).select(n)] ?? forms.other;
