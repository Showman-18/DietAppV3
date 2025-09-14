export function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="text-sm">{children}</label>
}
