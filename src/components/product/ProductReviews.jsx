import { useState } from 'react'
import { getReviews, getAverageRating, addReview } from '../../utils/reviews'
import ScrollReveal from '../ui/ScrollReveal'

function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className={`review-stars${readonly ? ' review-stars--readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? 'is-active' : ''}
          onClick={() => !readonly && onChange?.(star)}
          aria-label={`${star} bintang`}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState(() => getReviews(productId))
  const average = getAverageRating(productId)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!author.trim() || !text.trim()) return
    addReview(productId, { author, rating, text })
    setReviews(getReviews(productId))
    setSubmitted(true)
    setText('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="product-reviews">
      <ScrollReveal>
        <header className="product-reviews__header">
          <h2>Ulasan</h2>
          {average !== null && (
            <div className="product-reviews__summary">
              <StarRating value={Math.round(average)} readonly />
              <span>{average} dari 5 · {reviews.length} ulasan</span>
            </div>
          )}
        </header>
      </ScrollReveal>

      {reviews.length > 0 ? (
        <ul className="product-reviews__list">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.04}>
              <li className="product-review-card">
                <div className="product-review-card__head">
                  <strong>{review.author}</strong>
                  <StarRating value={review.rating} readonly />
                </div>
                <small>
                  {new Date(review.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </small>
                <p>{review.text}</p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      ) : (
        <p className="product-reviews__empty">Belum ada ulasan. Jadilah yang pertama!</p>
      )}

      <ScrollReveal>
        <form className="product-reviews__form" onSubmit={handleSubmit}>
          <h3>Tulis Ulasan</h3>
          <label>
            Nama
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              placeholder="Nama Anda"
            />
          </label>
          <label>
            Rating
            <StarRating value={rating} onChange={setRating} />
          </label>
          <label>
            Ulasan
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              placeholder="Bagikan pengalaman Anda..."
            />
          </label>
          <button type="submit" className="btn btn--primary">
            {submitted ? 'Terima kasih!' : 'Kirim Ulasan'}
          </button>
        </form>
      </ScrollReveal>
    </section>
  )
}