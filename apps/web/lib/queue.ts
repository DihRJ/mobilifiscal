type Job = { url: string, method?: string, body?: any }
const KEY = 'mfiscal_queue_v1'

export function enqueue(job: Job) {
  const arr = JSON.parse(localStorage.getItem(KEY) || '[]')
  arr.push(job)
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export async function flush() {
  const arr: Job[] = JSON.parse(localStorage.getItem(KEY) || '[]')
  const next: Job[] = []
  for (const j of arr) {
    try {
      await fetch(j.url, { method: j.method || 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(j.body || {}) })
    } catch (e) {
      next.push(j) // keep if failed
    }
  }
  localStorage.setItem(KEY, JSON.stringify(next))
}
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => flush())
}
