import { useState } from 'react'
import { usePatients, useCreatePatient } from '@/lib/api.js'
import { toast } from 'sonner'

export default function Patients() {
  const { data: list, isLoading } = usePatients()
  const create = useCreatePatient()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [diet, setDiet] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (!name) return
    create.mutate(
      { name, age: Number(age || 0), gender, diet },
      {
        onSuccess: () => toast.success('Patient added'),
        onError: () => toast.error('Failed to add patient'),
      }
    )
    setName(''); setAge(''); setGender(''); setDiet('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Patient List</h1>

      <form onSubmit={onSubmit} className="grid md:grid-cols-5 gap-3 rounded-xl border border-[hsl(var(--border))] p-4 bg-[hsl(var(--muted))]">
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <input className="border rounded-md p-2 w-full" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Age</label>
          <input className="border rounded-md p-2 w-full" value={age} onChange={(e)=>setAge(e.target.value)} type="number" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Gender</label>
          <input className="border rounded-md p-2 w-full" value={gender} onChange={(e)=>setGender(e.target.value)} placeholder="M/F/Other" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Diet</label>
          <input className="border rounded-md p-2 w-full" value={diet} onChange={(e)=>setDiet(e.target.value)} placeholder="Veg / Non-veg" />
        </div>
        <div className="flex items-end">
          <button className="w-full rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white px-5 py-2">Add Patient</button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <caption className="text-left p-3 text-[hsl(var(--muted-foreground))]">Quick overview of your patients.</caption>
          <thead className="bg-[hsl(var(--muted))]">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Age</th>
              <th className="text-left p-3">Gender</th>
              <th className="text-left p-3">Diet</th>
              <th className="text-right p-3">Visits</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td className="p-3" colSpan={5}>Loading...</td></tr>
            )}
            {list?.map((p)=> (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.age}</td>
                <td className="p-3">{p.gender}</td>
                <td className="p-3">{p.diet}</td>
                <td className="p-3 text-right">{p.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
