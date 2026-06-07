const COURIERS = {
  jne: { code: 'jne', name: 'JNE Express', service: 'REG' },
  sicepat: { code: 'sicepat', name: 'SiCepat', service: 'REG' },
  jnt: { code: 'jnt', name: 'J&T Express', service: 'EZ' },
}

export function getCourierLabel(code) {
  return COURIERS[code]?.name || code?.toUpperCase()
}

export function generateAwb(courier = 'jne') {
  const prefix = courier === 'sicepat' ? 'SIC' : courier === 'jnt' ? 'JNT' : 'JNE'
  const suffix = String(Date.now()).slice(-10)
  return `${prefix}${suffix}`
}

function addDays(dateStr, days) {
  const date = new Date(dateStr)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

export function createTrackingForOrder({
  status = 'processing',
  orderDate,
  origin = 'Jakarta Selatan',
  destination = 'Jakarta Selatan',
  courier = 'jne',
  receiverName = '',
}) {
  const courierInfo = COURIERS[courier]
  const awb = generateAwb(courier)
  const estimatedDelivery = addDays(orderDate, status === 'delivered' ? 3 : 5)

  const baseManifest = [
    {
      code: 'ORDERED',
      description: 'Pesanan diterima dan menunggu konfirmasi pembayaran',
      date: orderDate,
      time: '10:15',
      city: origin,
    },
    {
      code: 'PAID',
      description: 'Pembayaran dikonfirmasi',
      date: orderDate,
      time: '14:30',
      city: origin,
    },
  ]

  const processingSteps = [
    {
      code: 'PACKED',
      description: 'Pesanan sedang dikemas di gudang VELA',
      date: addDays(orderDate, 1),
      time: '09:00',
      city: origin,
    },
  ]

  const shippedSteps = [
    ...processingSteps,
    {
      code: 'PICKED',
      description: `Paket diserahkan ke ${courierInfo.name}`,
      date: addDays(orderDate, 1),
      time: '16:45',
      city: origin,
    },
    {
      code: 'IN_TRANSIT',
      description: 'Paket dalam perjalanan ke kota tujuan',
      date: addDays(orderDate, 2),
      time: '08:20',
      city: 'Jakarta Pusat',
    },
    {
      code: 'OUT_DELIVERY',
      description: 'Paket diantar oleh kurir',
      date: addDays(orderDate, 3),
      time: '11:05',
      city: destination,
    },
  ]

  const deliveredSteps = [
    ...shippedSteps,
    {
      code: 'DELIVERED',
      description: 'Paket telah diterima',
      date: addDays(orderDate, 3),
      time: '15:42',
      city: destination,
    },
  ]

  let manifest = [...baseManifest]
  if (status === 'processing') manifest = [...manifest, ...processingSteps]
  if (status === 'shipped') manifest = [...manifest, ...shippedSteps]
  if (status === 'delivered') manifest = [...manifest, ...deliveredSteps]

  return {
    awb,
    courier,
    courierName: courierInfo.name,
    service: courierInfo.service,
    origin,
    destination,
    estimatedDelivery,
    delivered: status === 'delivered',
    deliveryProof:
      status === 'delivered'
        ? {
            receiver: receiverName || 'Penerima',
            date: addDays(orderDate, 3),
            time: '15:42',
          }
        : null,
    manifest,
  }
}

export function formatTrackingDate(date, time) {
  const formatted = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return `${formatted} · ${time} WIB`
}