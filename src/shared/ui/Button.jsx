import { Icon } from './Icon.jsx'

// All buttons are at least 44 px tall so they are easy to tap.
const STYLES = {
  primary: 'bg-accent text-paper hover:bg-accent/90',
  secondary: 'border border-ink/20 bg-paper text-ink hover:bg-ink/5',
  ghost: 'text-ink hover:bg-ink/5',
  link: 'text-accent underline-offset-4 hover:underline',
}

export function Button({ variant = 'secondary', icon, children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${STYLES[variant]} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}

// A square button with only an icon. `label` is read by screen readers.
export function IconButton({ icon, label, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink/70 hover:bg-ink/5 hover:text-ink disabled:opacity-30 ${className}`}
      {...props}
    >
      <Icon name={icon} />
    </button>
  )
}
