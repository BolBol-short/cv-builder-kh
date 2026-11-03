// A bar fixed to the bottom of the phone screen, where the thumb reaches.
// On wide screens it becomes a normal row of buttons.
export function BottomBar({ children }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-paper px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:static lg:mt-8 lg:border-0 lg:p-0">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-2 lg:max-w-none">{children}</div>
    </div>
  )
}
