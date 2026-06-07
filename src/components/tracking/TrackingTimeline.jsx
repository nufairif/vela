import { formatTrackingDate } from '../../utils/tracking'

export default function TrackingTimeline({ manifest = [], delivered = false }) {
  if (!manifest.length) {
    return <p className="tracking-empty">Belum ada update pengiriman.</p>
  }

  const events = [...manifest].reverse()

  return (
    <ol className="tracking-timeline">
      {events.map((event, index) => (
        <li
          key={`${event.code}-${event.date}-${event.time}`}
          className={`tracking-timeline__item${index === 0 ? ' is-current' : ''}${delivered && event.code === 'DELIVERED' ? ' is-delivered' : ''}`}
        >
          <span className="tracking-timeline__dot" aria-hidden="true" />
          <div className="tracking-timeline__content">
            <strong>{event.description}</strong>
            <small>{formatTrackingDate(event.date, event.time)}</small>
            {event.city && <span className="tracking-timeline__city">{event.city}</span>}
          </div>
        </li>
      ))}
    </ol>
  )
}