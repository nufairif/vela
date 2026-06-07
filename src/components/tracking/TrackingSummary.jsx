const statusClass = {
  delivered: 'account-status--delivered',
  processing: 'account-status--processing',
  shipped: 'account-status--shipped',
  cancelled: 'account-status--cancelled',
}

export default function TrackingSummary({ order }) {
  const { tracking } = order

  return (
    <div className="tracking-summary">
      <div className="tracking-summary__row">
        <div>
          <span className="tracking-summary__label">No. Pesanan</span>
          <strong>#{order.id}</strong>
        </div>
        <span className={`account-status ${statusClass[order.status] || ''}`}>
          {order.statusLabel}
        </span>
      </div>

      {tracking && (
        <>
          <div className="tracking-summary__grid">
            <div>
              <span className="tracking-summary__label">No. Resi</span>
              <strong>{tracking.awb}</strong>
            </div>
            <div>
              <span className="tracking-summary__label">Kurir</span>
              <strong>{tracking.courierName}</strong>
            </div>
            <div>
              <span className="tracking-summary__label">Layanan</span>
              <strong>{tracking.service}</strong>
            </div>
            <div>
              <span className="tracking-summary__label">Estimasi tiba</span>
              <strong>
                {new Date(tracking.estimatedDelivery).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>
            </div>
          </div>

          <div className="tracking-summary__route">
            <span>{tracking.origin}</span>
            <span className="tracking-summary__arrow" aria-hidden="true">→</span>
            <span>{tracking.destination}</span>
          </div>

          {tracking.delivered && tracking.deliveryProof && (
            <div className="tracking-summary__pod">
              <span className="tracking-summary__label">Diterima oleh</span>
              <p>
                <strong>{tracking.deliveryProof.receiver}</strong>
                <small>
                  {new Date(tracking.deliveryProof.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  · {tracking.deliveryProof.time} WIB
                </small>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}