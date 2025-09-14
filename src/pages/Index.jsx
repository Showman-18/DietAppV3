import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container mx-auto grid gap-10 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Comprehensive Cloud-Based Practice Management & Nutrient Analysis
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-lg mb-8">
            Built for Ayurvedic Dietitians. Generate personalized, Ayurveda-compliant diet plans, manage patients, and track outcomes — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/signup?role=doctor" className="rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white px-6 py-3 text-base">Get Started Doctor</Link>
            <Link to="/signup?role=patient" className="rounded-full border border-[hsl(var(--accent))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))]/40 px-6 py-3 text-base">Get Started Patient</Link>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-[hsl(var(--muted-foreground))]">
            <div className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#FFB300]"></span> HIPAA-ready</div>
            <div className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]"></span> 8000+ Foods</div>
            <div className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#29B6F6]"></span> Real-time insights</div>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-3xl bg-[hsl(var(--accent))]/25 p-8 border border-[hsl(var(--border))] shadow-lg">
            <div className="w-full h-48 bg-white rounded-2xl border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
              Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
