type Variant = 'transport' | 'stay' | 'activity'

type Props = {
  variant: Variant
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  transport: 'bg-blue-100 text-blue-700',
  stay: 'bg-violet-100 text-violet-700',
  activity: 'bg-amber-100 text-amber-700',
}

export default function Badge({ variant, children }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
