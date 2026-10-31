export function ListStatus({ status, retry }: { status: string; retry: () => void }) {
  if (status === 'success') return null
  return <div role="status" aria-live="polite" className="col-span-full rounded-xl border border-line bg-surface p-6 text-sm text-muted">
    {status === 'idle' || status === 'loading' ? <><span className="sr-only">Loading…</span><div aria-hidden="true" className="h-32 rounded-lg bg-tint motion-safe:animate-pulse" /></> : null}
    {status === 'empty' && <p>Nothing here yet. Check back soon.</p>}
    {status === 'error' && <div className="flex flex-wrap items-center justify-between gap-4"><p>Unable to load this section.</p><button type="button" onClick={retry} className="button button-secondary">Retry</button></div>}
  </div>
}
