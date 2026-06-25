/**
 * Single Make.com webhook that both site forms post to. The scenario routes on
 * the `formType` field: "yhteydenotto" (contact form) and "pilotti" (pilot
 * application). Keep this in one place so the endpoint never drifts between forms.
 */
export const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/s39vyrcm89q661fuq9935ivyl7q9bes6';

/** Fallback inbox — used if the webhook is unreachable so no lead is ever lost. */
export const FALLBACK_EMAIL = 'clarity.ai@outlook.com';

export type LeadPayload = Record<string, string>;

export type SubmitResult =
  | { ok: true; mailtoUrl?: undefined }
  | { ok: false; mailtoUrl: string };

/**
 * Posts a lead to the Make.com webhook. If the webhook is down or unreachable
 * (e.g. the scenario is not yet built), it does NOT silently fail — it returns
 * a prefilled mailto: URL so the visitor can still reach us in one click.
 *
 * This guarantees zero lost leads even before the automation layer is live.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true };
  } catch {
    // network error / webhook unreachable — fall through to mailto fallback
  }
  return { ok: false, mailtoUrl: buildMailto(payload) };
}

/** Builds a prefilled mailto: link from a lead payload as a delivery fallback. */
export function buildMailto(payload: LeadPayload): string {
  const isPilot = payload.formType === 'pilotti';
  const subject = isPilot
    ? `Pilottihakemus - ${payload.yritys || payload.nimi || 'ClarityAI'}`
    : `Yhteydenotto clarityai.fi - ${payload.nimi || ''}`.trim();

  const lines = [
    payload.nimi ? `Nimi: ${payload.nimi}` : '',
    payload.yritys ? `Yritys: ${payload.yritys}` : '',
    payload.sahkoposti ? `Sähköposti: ${payload.sahkoposti}` : '',
    payload.puhelin ? `Puhelin: ${payload.puhelin}` : '',
    payload.kiinnostus ? `Kiinnostus: ${payload.kiinnostus}` : '',
    '',
    payload.viesti || '',
  ].filter((l) => l !== '' || l === '');

  const body = lines.join('\n');
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
