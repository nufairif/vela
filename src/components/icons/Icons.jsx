export function ArrowIcon({ size = 16 }) {
  return (
    <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h8M8 4l4 4-4 4" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg className="icon" viewBox="0 0 16 14" role="presentation">
      <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fillRule="evenodd" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg className="icon" viewBox="0 0 21 21" role="presentation">
      <g transform="translate(1 1)" stroke="currentColor" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
        <path d="M18 18l-5.7096-5.7096" />
        <circle cx="7.2" cy="7.2" r="7.2" />
      </g>
    </svg>
  )
}

export function AccountIcon() {
  return (
    <svg className="icon" viewBox="0 0 20 20" role="presentation">
      <g transform="translate(1 1)" stroke="currentColor" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
        <path d="M0 18c0-4.5188182 3.663-8.18181818 8.18181818-8.18181818h1.63636364C14.337 9.81818182 18 13.4811818 18 18" />
        <circle cx="9" cy="4.90909091" r="4.90909091" />
      </g>
    </svg>
  )
}

export function CartIcon() {
  return (
    <svg className="icon" viewBox="0 0 17 20" role="presentation">
      <path d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z" fill="currentColor" />
    </svg>
  )
}

export function HeartIcon({ filled = false }) {
  return (
    <svg className="icon" viewBox="0 0 20 18" role="presentation">
      <path
        d="M10 17.5S1 12 1 6.5A4.5 4.5 0 0 1 10 4a4.5 4.5 0 0 1 9 2.5C19 12 10 17.5 10 17.5z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function NavIcon() {
  return (
    <svg className="icon" viewBox="0 0 20 14" role="presentation">
      <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon() {
  return (
    <svg className="icon icon--social" viewBox="0 0 9 17">
      <path d="M5.842 17V9.246h2.653l.398-3.023h-3.05v-1.93c0-.874.246-1.47 1.526-1.47H9V.118C8.718.082 7.75 0 6.623 0 4.27 0 2.66 1.408 2.66 3.994v2.23H0v3.022h2.66V17h3.182z" />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg className="icon icon--social" viewBox="0 0 32 32" role="presentation">
      <path d="M15.994 2.886c4.273 0 4.775.019 6.464.095 1.562.07 2.406.33 2.971.552.749.292 1.283.635 1.841 1.194s.908 1.092 1.194 1.841c.216.565.483 1.41.552 2.971.076 1.689.095 2.19.095 6.464s-.019 4.775-.095 6.464c-.07 1.562-.33 2.406-.552 2.971-.292.749-.635 1.283-1.194 1.841s-1.092.908-1.841 1.194c-.565.216-1.41.483-2.971.552-1.689.076-2.19.095-6.464.095s-4.775-.019-6.464-.095c-1.562-.07-2.406-.33-2.971-.552-.749-.292-1.283-.635-1.841-1.194s-.908-1.092-1.194-1.841c-.216-.565-.483-1.41-.552-2.971-.076-1.689-.095-2.19-.095-6.464s.019-4.775.095-6.464c.07-1.562.33-2.406.552-2.971.292-.749.635-1.283 1.194-1.841s1.092-.908 1.841-1.194c.565-.216 1.41-.483 2.971-.552 1.689-.083 2.19-.095 6.464-.095zm0-2.883c-4.343 0-4.889.019-6.597.095-1.702.076-2.864.349-3.879.743-1.054.406-1.943.959-2.832 1.848S1.251 4.473.838 5.521C.444 6.537.171 7.699.095 9.407.019 11.109 0 11.655 0 15.997s.019 4.889.095 6.597c.076 1.702.349 2.864.743 3.886.406 1.054.959 1.943 1.848 2.832s1.784 1.435 2.832 1.848c1.016.394 2.178.667 3.886.743s2.248.095 6.597.095 4.889-.019 6.597-.095c1.702-.076 2.864-.349 3.886-.743 1.054-.406 1.943-.959 2.832-1.848s1.435-1.784 1.848-2.832c.394-1.016.667-2.178.743-3.886s.095-2.248.095-6.597-.019-4.889-.095-6.597c-.076-1.702-.349-2.864-.743-3.886-.406-1.054-.959-1.943-1.848-2.832S27.532 1.247 26.484.834C25.468.44 24.306.167 22.598.091c-1.714-.07-2.26-.089-6.603-.089zm0 7.778c-4.533 0-8.216 3.676-8.216 8.216s3.683 8.216 8.216 8.216 8.216-3.683 8.216-8.216-3.683-8.216-8.216-8.216zm0 13.549c-2.946 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.451 7.457c0 1.059-.858 1.917-1.917 1.917s-1.917-.858-1.917-1.917c0-1.059.858-1.917 1.917-1.917s1.917.858 1.917 1.917z" />
    </svg>
  )
}

export function YoutubeIcon() {
  return (
    <svg className="icon icon--social" viewBox="0 0 33 32" role="presentation">
      <path d="M0 25.693q0 1.997 1.318 3.395t3.209 1.398h24.259q1.891 0 3.209-1.398t1.318-3.395V6.387q0-1.997-1.331-3.435t-3.195-1.438H4.528q-1.864 0-3.195 1.438T.002 6.387v19.306zm12.116-3.488V9.876q0-.186.107-.293.08-.027.133-.027l.133.027 11.61 6.178q.107.107.107.266 0 .107-.107.213l-11.61 6.178q-.053.053-.107.053-.107 0-.16-.053-.107-.107-.107-.213z" />
    </svg>
  )
}

export function CarouselArrow({ direction = 'next' }) {
  if (direction === 'prev') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="20" height="20">
        <line x1="20" y1="12" x2="4" y2="12" />
        <polyline points="10,6 4,12 10,18" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="20" height="20">
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14,6 20,12 14,18" />
    </svg>
  )
}