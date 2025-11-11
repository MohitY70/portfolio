import { cn } from '@/lib/utils'

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean
}

export function Code({ className, inline, children, ...props }: CodeProps) {
  if (inline) {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  }

  return (
    <code
      className={cn('relative rounded font-mono text-sm', className)}
      {...props}
    >
      {children}
    </code>
  )
}
