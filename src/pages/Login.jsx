import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'

export default function Login() {
  const [role, setRole] = useState('doctor')
  return (
    <section className="bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 py-16">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome back</h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">Log in to manage patients, generate Ayurveda-compliant diet plans, and track progress.</p>
          <div className="rounded-2xl bg-[hsl(var(--muted))] p-6 border border-[hsl(var(--border))] shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-[hsl(var(--muted))] p-1">
              <button onClick={() => setRole('doctor')} className={`px-4 py-2 rounded-full text-sm transition-colors ${role === 'doctor' ? 'bg-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>Doctor</button>
              <button onClick={() => setRole('patient')} className={`px-4 py-2 rounded-full text-sm transition-colors ${role === 'patient' ? 'bg-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>Patient</button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full rounded-full">Login as {role}</Button>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--accent))]/20 p-8 shadow-md">
            <div className="text-[#8D6E63] font-semibold mb-2">Ayurveda Tip</div>
            <p className="text-[hsl(var(--foreground))]">Balance your Agni by eating at consistent times. Our platform helps you schedule meals aligned with your Prakriti.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
