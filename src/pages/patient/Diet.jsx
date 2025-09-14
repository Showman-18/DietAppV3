const meals = [
  { title: 'Morning (7:30 AM)', items: ['Warm water with lemon', 'Stewed apple'], color: '#A5D6A7' },
  { title: 'Breakfast (9:00 AM)', items: ['Moong dal chilla', 'Mint chutney'], color: '#4CAF50' },
  { title: 'Lunch (1:00 PM)', items: ['Red rice', 'Lauki sabzi', 'Buttermilk'], color: '#2E7D32' },
  { title: 'Snack (4:30 PM)', items: ['Roasted chana', 'Herbal tea'], color: '#FFB300' },
  { title: 'Dinner (7:30 PM)', items: ['Khichdi', 'Ghee', 'Cumin fennel tea'], color: '#8D6E63' },
]

export default function Diet() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Daily Ayurveda-compliant Plan</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meals.map((m) => (
          <div key={m.title} className="rounded-2xl border border-[hsl(var(--border))] bg-white">
            <div className="p-5">
              <div className="mb-3 font-semibold" style={{ color: m.color }}>{m.title}</div>
              <ul className="text-[hsl(var(--foreground))] text-sm list-disc pl-5 space-y-1">
                {m.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
