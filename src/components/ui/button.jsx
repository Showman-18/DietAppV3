import { twMerge } from 'tailwind-merge'

export function Button({ className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
  const sizes = 'h-9 px-4 py-2'
  const variants = {
    default: 'bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--secondary))] ',
    outline: 'border border-[hsl(var(--accent))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))]/40',
    ghost: 'bg-transparent hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
  }
  return <button className={twMerge(base, sizes, variants[variant], className)} {...props} />
}
