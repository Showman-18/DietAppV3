export function Table({ children }) { return <table className="min-w-full text-sm">{children}</table> }
export function TableCaption({ children }) { return <caption className="text-left p-3 text-[hsl(var(--muted-foreground))]">{children}</caption> }
export function TableHeader({ children }) { return <thead className="bg-[hsl(var(--muted))]">{children}</thead> }
export function TableRow({ children }) { return <tr className="border-t">{children}</tr> }
export function TableHead({ children, className='' }) { return <th className={`text-left p-3 ${className}`}>{children}</th> }
export function TableBody({ children }) { return <tbody>{children}</tbody> }
export function TableCell({ children, className='' }) { return <td className={`p-3 ${className}`}>{children}</td> }
