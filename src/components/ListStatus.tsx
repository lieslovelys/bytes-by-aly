export function ListStatus({ status, retry }: { status: string; retry: () => void }) {
  if (status === 'success') return null
  return <div role="status" aria-live="polite" className="col-span-full text-sm text-muted">
    {status === 'idle' || status === 'loading' ? <><span className="sr-only">Loading…</span><div aria-hidden="true" className="h-40 animate-pulse rounded-2xl border border-line bg-surface-muted motion-reduce:animate-none" /></> : null}
    {status === 'empty' ? <p>Nothing here yet. Check back soon.</p> : null}
    {status === 'error' ? <p>Unable to load this section. <button type="button" onClick={retry} className="rounded-full border border-line px-4 py-2 font-semibold text-accent">Retry</button></p> : null}
  </div>
}
