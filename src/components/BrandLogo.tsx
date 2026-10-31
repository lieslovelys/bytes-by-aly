const pixels = [
  '01110',
  '11011',
  '10001',
  '11111',
  '10001',
  '10001',
]

export function BrandLogo() {
  return <a href="#top" aria-label="Bytes by Aly, back to top" className="brand-link">
    <svg viewBox="0 0 34 41" width="34" height="40" aria-hidden="true" focusable="false" className="brand-mark">
      {pixels.flatMap((row, y) => [...row].map((pixel, x) => pixel === '1' && <rect key={`${x}-${y}`} x={x * 7} y={y * 7} width="6" height="6" rx="1.2" fill={x === 3 && y === 0 ? 'var(--brand-accent)' : 'currentColor'} />))}
    </svg>
    <span className="brand-text font-brand">Bytes by Aly</span>
  </a>
}
