export function formatSystemId(prefix: string, sequence: number) {
  return `${prefix}${String(sequence).padStart(5, "0")}`;
}

export function nextSystemId(prefix: string, items: { id: string }[]) {
  const pattern = new RegExp(`^${prefix}(\\d{5})$`);
  const max = items.reduce((currentMax, item) => {
    const match = item.id.match(pattern);
    return match ? Math.max(currentMax, Number(match[1])) : currentMax;
  }, 0);

  return formatSystemId(prefix, max + 1);
}
