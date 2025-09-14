export function Card({ className = '', ...props }) {
  return <div className={`rounded-2xl border border-[hsl(var(--border))] bg-white ${className}`} {...props} />
}
export function CardContent({ className = '', ...props }) {
  return <div className={`p-5 ${className}`} {...props} />
}
