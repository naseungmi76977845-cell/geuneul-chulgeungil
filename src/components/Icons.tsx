type IconProps = { className?: string }

export function LeafIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c8-1 13-7 14-14-7 1-13 6-14 14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 15.5c2.2-2.4 4.7-4 7.5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BenchIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11h16M5 11v2.5c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 15v4M17 15v4M4 19h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 8.5c1.5-2 3.5-3 6-3s4.5 1 6 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function StairsIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 20h5v-4h4v-4h4V8h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TreeIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21v-6M8 21h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 4c-3.2 0-5.5 2.4-5.5 5.2 0 1.6.7 3 1.8 3.9H7c-1.5 0-2.7 1.2-2.7 2.6S5.5 18.3 7 18.3h10c1.5 0 2.7-1.2 2.7-2.6S18.5 13.1 17 13.1h-1.3c1.1-.9 1.8-2.3 1.8-3.9C17.5 6.4 15.2 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
