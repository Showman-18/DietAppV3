import { useRecords } from '@/lib/api.js'
import { toast } from 'sonner'

export default function Records() {
  const { data: records, isLoading, error } = useRecords()
  if (error) {
    toast.error('Failed to load records')
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Patient Records</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <div className="text-sm text-[hsl(var(--muted-foreground))]">Loading...</div>}
        {records?.map((r) => (
          <div key={r.id} className="rounded-2xl border border-[hsl(var(--border))] bg-white">
            <div className="p-5">
              <div className="font-semibold text-[#8D6E63] mb-1">{r.patientName}</div>
              <p className="text-sm text-[hsl(var(--foreground))] mb-2">{r.note}</p>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">{r.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
