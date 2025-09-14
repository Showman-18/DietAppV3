import { useState } from 'react'
import { useGenerateDiet } from '@/lib/api.js'
import { toast } from 'sonner'

export default function Generate() {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [diet, setDiet] = useState('')
  const [freq, setFreq] = useState('')
  const gen = useGenerateDiet()

  function onSubmit(e) {
    e.preventDefault()
    gen.mutate(
      { age: Number(age || 0), gender, diet, frequency: Number(freq || 3) },
      { 
        onSuccess: () => toast.success('Plan generated'),
        onError: () => toast.error('Failed to generate plan') 
      }
    )
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Generate Diet</h1>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white p-6 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm">Age</label>
            <input id="age" type="number" className="rounded-xl border p-2" value={age} onChange={(e)=>setAge(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm">Gender</label>
            <input id="gender" className="rounded-xl border p-2" placeholder="Male/Female/Other" value={gender} onChange={(e)=>setGender(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label htmlFor="diet" className="text-sm">Diet Preference</label>
            <input id="diet" className="rounded-xl border p-2" placeholder="Veg / Non-veg" value={diet} onChange={(e)=>setDiet(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label htmlFor="freq" className="text-sm">Meal Frequency</label>
            <input id="freq" className="rounded-xl border p-2" placeholder="3 / 4 / 5" value={freq} onChange={(e)=>setFreq(e.target.value)} />
          </div>
        </div>
        <button disabled={gen.isPending} className="rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] disabled:opacity-60 text-white px-5 py-2 w-fit">{gen.isPending ? 'Generating...' : 'Generate Plan'}</button>
      </form>

      {gen.isSuccess && (
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-white p-6">
          <h2 className="font-semibold mb-3">Suggested Plan</h2>
          <ul className="space-y-3">
            {gen.data.meals.map((m, i) => (
              <li key={i} className="p-3 rounded-xl bg-[hsl(var(--muted))]">
                <div className="font-medium text-[#8D6E63] mb-1">{m.title}</div>
                <div className="text-sm text-[hsl(var(--foreground))]">{m.items.join(', ')}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
