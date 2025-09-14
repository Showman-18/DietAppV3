import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'

function Field({ id, label, type = 'text', placeholder = '', required = false }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} required={required} className="rounded-xl" />
    </div>
  )
}

export default function SignUp() {
  const [params, setParams] = useSearchParams()
  const roleParam = params.get('role') === 'patient' ? 'patient' : 'doctor'

  useEffect(() => {
    if (!params.get('role')) {
      params.set('role', roleParam)
      setParams(params, { replace: true })
    }
  }, [])

  return (
    <section className="bg-white">
      <div className="container mx-auto py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create your account</h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-6">Join AyurManage to deliver personalized Ayurveda diet plans with ease.</p>
          <Tabs.Root defaultValue={roleParam} className="w-full">
            <div className="rounded-full bg-[hsl(var(--muted))] p-1 inline-flex">
              <Tabs.List className="flex gap-1">
                <Tabs.Trigger value="doctor" className="data-[state=active]:bg-[hsl(var(--accent))] data-[state=active]:text-[hsl(var(--primary))] rounded-full px-4 py-2 text-sm">Doctor</Tabs.Trigger>
                <Tabs.Trigger value="patient" className="data-[state=active]:bg-[hsl(var(--accent))] data-[state=active]:text-[hsl(var(--primary))] rounded-full px-4 py-2 text-sm">Patient</Tabs.Trigger>
              </Tabs.List>
            </div>
            <Tabs.Content value="doctor" className="mt-6">
              <div className="grid gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field id="d-name" label="Full Name" required placeholder="Dr. A P Sharma" />
                  <Field id="d-contact" label="Email or Phone" placeholder="dr@example.com" />
                  <Field id="d-age" label="Age" type="number" />
                  <Field id="d-gender" label="Gender" placeholder="Male/Female/Other" />
                  <Field id="d-qual" label="Qualification" placeholder="BAMS, MD (Ayu)" />
                  <Field id="d-address" label="Clinic / Hospital Address" />
                </div>
                <Field id="d-verify" label="Verification Code" placeholder="Enter 6-digit code" />
                <Button className="rounded-full">Create Doctor Account</Button>
              </div>
            </Tabs.Content>
            <Tabs.Content value="patient" className="mt-6">
              <div className="grid gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field id="p-name" label="Full Name" required placeholder="Anita Verma" />
                  <Field id="p-contact" label="Email or Phone" placeholder="anita@example.com" />
                  <Field id="p-age" label="Age" type="number" />
                  <Field id="p-gender" label="Gender" placeholder="Female" />
                  <Field id="p-weight" label="Weight (kg)" type="number" />
                  <Field id="p-height" label="Height (cm)" type="number" />
                  <Field id="p-diet" label="Diet Preference" placeholder="Veg / Non-veg" />
                  <Field id="p-allergy" label="Allergies" placeholder="Peanuts, lactose..." />
                  <Field id="p-frequency" label="Meal Frequency" placeholder="3 / 4 / 5" />
                  <Field id="p-prakriti" label="Prakriti" placeholder="Vata / Pitta / Kapha / Mixed" />
                </div>
                <Field id="p-verify" label="Verification Code" placeholder="Enter 6-digit code" />
                <Button className="rounded-full">Create Patient Account</Button>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </section>
  )
}
