import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const weight = [
  { m: 'Jan', v: 74 },
  { m: 'Feb', v: 73 },
  { m: 'Mar', v: 72 },
  { m: 'Apr', v: 71 },
  { m: 'May', v: 70 },
]

const adherence = [
  { m: 'W1', v: 60 },
  { m: 'W2', v: 72 },
  { m: 'W3', v: 80 },
  { m: 'W4', v: 75 },
]

export default function Progress() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Progress</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-white">
          <div className="p-5">
            <div className="mb-2 font-semibold text-[#8D6E63]">Weight Trend</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weight} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#A5D6A7" />
                  <XAxis dataKey="m" stroke="#757575" />
                  <YAxis stroke="#757575" />
                  <Tooltip />
                  <Line type="monotone" dataKey="v" stroke="#29B6F6" strokeWidth={3} dot={{ r: 4, fill: '#29B6F6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-white">
          <div className="p-5">
            <div className="mb-2 font-semibold text-[#8D6E63]">Plan Adherence</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adherence}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#A5D6A7" />
                  <XAxis dataKey="m" stroke="#757575" />
                  <YAxis stroke="#757575" />
                  <Tooltip />
                  <Bar dataKey="v" fill="#FF7043" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
