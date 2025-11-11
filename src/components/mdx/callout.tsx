import { AlertCircle, Info, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  title?: string
  children: React.ReactNode
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
}

const styles = {
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200',
  warning:
    'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-200',
  error: 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200',
  success:
    'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-200',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div className={cn('my-6 flex gap-3 rounded-xl border-l-4 p-4', styles[type])}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2">
        {title && <div className="font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
