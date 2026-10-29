export function ListStatus({ status, retry }: { status: string; retry: () => void }) {
  if (status === 'success') return null
  return <div role="status" aria-live="polite" className="col-span-full text-sm text-sage dark:text-cream">
    {status === 'idle' || status === 'loading' ? <><span className="sr-only">Loading…</span><div aria-hidden="true" className="h-40 animate-pulse rounded-3xl border border-forest/10 bg-blush dark:bg-forest motion-reduce:animate-none" /></> : null}
    {status === 'empty' ? <p>Nothing here yet. Check back soon.</p> : null}
    {status === 'error' ? <p>Unable to load this section. <button type="button" onClick={retry} className="min-h-11 rounded-full border border-current px-3 py-2 font-semibold text-forest dark:text-blush">Retry</button></p> : null}
  </div>
}
