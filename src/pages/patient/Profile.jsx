const visits = [
  { date: '2024-10-02', doctor: 'Dr. Mehta', treatment: 'Pitta pacifying plan' },
  { date: '2024-11-04', doctor: 'Dr. Rao', treatment: 'Kapha detox protocol' },
  { date: '2024-12-12', doctor: 'Dr. Singh', treatment: 'Vata balancing diet' },
]

export default function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile & History</h1>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <caption className="text-left p-3 text-[hsl(var(--muted-foreground))]">Doctors visited and treatments taken.</caption>
          <thead className="bg-[hsl(var(--muted))]">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Doctor</th>
              <th className="text-left p-3">Treatment</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((v)=> (
              <tr key={v.date} className="border-t">
                <td className="p-3">{v.date}</td>
                <td className="p-3">{v.doctor}</td>
                <td className="p-3">{v.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
