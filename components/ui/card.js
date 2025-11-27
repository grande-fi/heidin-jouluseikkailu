export function Card({ children, className }) {
  return <div className={className}>{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="p-2 border-b">{children}</div>;
}
export function CardTitle({ children }) {
  return <h2 className="font-bold">{children}</h2>;
}
export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
