/**
 * Shared Cal.com element-click embed attributes. Spread these onto any button
 * to open the same booking modal (initialised in index.html as namespace
 * "konsultaattio"). Keeping them in one place guarantees every CTA opens the
 * exact same scheduler.
 */
export const calBookingProps = {
  'data-cal-namespace': 'konsultaattio',
  'data-cal-link': 'heikki-niemimaki-09cgi0/konsultaattio',
  'data-cal-config': '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
} as const;
