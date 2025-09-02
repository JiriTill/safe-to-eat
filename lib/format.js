// Ensures consistent formatting & avoids timezone off-by-one for YYYY-MM-DD
export function formatDateUTC(isoDate, locale = "en-US", opts = { year: "numeric", month: "short", day: "2-digit" }) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return new Intl.DateTimeFormat(locale, opts).format(dt);
}
