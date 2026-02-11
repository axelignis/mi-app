import { useParams, Link } from 'react-router-dom'
import { Stars } from '../components/Stars'
import { sitters } from '../data/sitters'
import './SitterProfile.css'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const serviceIcons: Record<string, string> = {
  'Alojamiento': '🏠',
  'Paseo': '🚶',
  'Visita a domicilio': '📍',
  'Guardería de día': '☀️',
}

export function SitterProfile() {
  const { id } = useParams<{ id: string }>()
  const sitter = sitters.find((s) => s.id === id)

  if (!sitter) {
    return (
      <div className="profile-not-found">
        <div className="not-found-icon">🐾</div>
        <h1>Cuidadora no encontrada</h1>
        <p>Lo sentimos, no pudimos encontrar este perfil.</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    )
  }

  const avgRating = sitter.reviewsList.length > 0
    ? (sitter.reviewsList.reduce((sum, r) => sum + r.rating, 0) / sitter.reviewsList.length).toFixed(1)
    : sitter.rating.toFixed(1)

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: sitter.reviewsList.filter((r) => r.rating === star).length,
    pct: sitter.reviewsList.length > 0
      ? (sitter.reviewsList.filter((r) => r.rating === star).length / sitter.reviewsList.length) * 100
      : 0,
  }))

  const otherSitters = sitters.filter((s) => s.id !== sitter.id).slice(0, 3)

  return (
    <div className="profile">
      {/* Gallery Banner */}
      <div className="profile-gallery-banner">
        <div className="gallery-featured">
          <img src={sitter.gallery[0]} alt={`Foto de ${sitter.name}`} className="gallery-featured-img" />
        </div>
        <div className="gallery-side">
          {sitter.gallery.slice(1, 3).map((img, i) => (
            <img src={img} alt={`Foto ${i + 2} de ${sitter.name}`} key={i} className="gallery-side-img" />
          ))}
          {sitter.gallery.length > 3 && (
            <div className="gallery-more-overlay">
              +{sitter.gallery.length - 3} fotos
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="profile-breadcrumb">
        <Link to="/">Inicio</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/#sitters">Cuidadoras</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{sitter.name}</span>
      </div>

      <div className="profile-layout">
        {/* Main content */}
        <div className="profile-main">
          {/* Header */}
          <div className="profile-header">
            <img src={sitter.image} alt={sitter.name} className="profile-avatar" />
            <div className="profile-header-info">
              <div className="profile-name-row">
                <h1>{sitter.name}</h1>
                {sitter.verified && <span className="verified-badge">Verificada</span>}
              </div>
              <p className="profile-location">📍 {sitter.location}</p>
              <div className="profile-rating">
                <Stars rating={sitter.rating} />
                <span className="profile-rating-text">{sitter.rating} ({sitter.reviews} reseñas)</span>
              </div>
              <div className="profile-tags">
                {sitter.specialties.map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
              <div className="profile-quick-badges">
                <span className="quick-badge">⏱ Responde en {sitter.responseTime}</span>
                <span className="quick-badge">{sitter.completedBookings} reservas completadas</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-icon">📅</div>
              <strong>{sitter.experience} años</strong>
              <span>Experiencia</span>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-icon">✅</div>
              <strong>{sitter.completedBookings}</strong>
              <span>Reservas</span>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-icon">⚡</div>
              <strong>{sitter.responseTime}</strong>
              <span>Respuesta</span>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-icon">⭐</div>
              <strong>{sitter.rating}</strong>
              <span>Valoración</span>
            </div>
          </div>

          {/* About */}
          <section className="profile-section">
            <h2>Sobre mí</h2>
            <p className="profile-bio">{sitter.bio}</p>
          </section>

          {/* Services */}
          <section className="profile-section">
            <h2>Servicios y tarifas</h2>
            <div className="pdp-services-grid">
              {sitter.services.map((service) => (
                <div className="pdp-service-card" key={service.name}>
                  <div className="pdp-service-icon">
                    {serviceIcons[service.name] || '🐾'}
                  </div>
                  <div className="pdp-service-body">
                    <div className="pdp-service-header">
                      <h3>{service.name}</h3>
                      <span className="pdp-service-price">{service.price}€<small>/{service.unit}</small></span>
                    </div>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery - full grid */}
          {sitter.gallery.length > 3 && (
            <section className="profile-section">
              <h2>Galería</h2>
              <div className="gallery-grid">
                {sitter.gallery.map((img, i) => (
                  <img src={img} alt={`Foto ${i + 1} de ${sitter.name}`} key={i} className="gallery-img" />
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section className="profile-section">
            <h2>Reseñas ({sitter.reviews})</h2>

            {/* Rating Summary */}
            <div className="review-summary">
              <div className="review-summary-score">
                <span className="review-big-number">{avgRating}</span>
                <Stars rating={Number(avgRating)} />
                <span className="review-summary-count">{sitter.reviewsList.length} reseñas</span>
              </div>
              <div className="review-summary-bars">
                {ratingCounts.map((r) => (
                  <div className="review-bar-row" key={r.star}>
                    <span className="review-bar-label">{r.star} ★</span>
                    <div className="review-bar-track">
                      <div className="review-bar-fill" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="review-bar-count">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-list">
              {sitter.reviewsList.map((review, i) => (
                <div className="review-card" key={i}>
                  <div className="review-header">
                    <img src={review.avatar} alt={review.author} className="review-avatar" />
                    <div>
                      <strong>{review.author}</strong>
                      <div className="review-meta">
                        <Stars rating={review.rating} />
                        <span>{formatDate(review.date)}</span>
                        <span className="tag tag-sm">{review.petType}</span>
                      </div>
                    </div>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar - Booking card */}
        <aside className="profile-sidebar">
          <div className="booking-card">
            <div className="booking-price">
              Desde <strong>{sitter.price}€</strong><small>/hora</small>
            </div>
            <div className="booking-fields">
              <div className="booking-field">
                <label>Servicio</label>
                <select>
                  {sitter.services.map((s) => (
                    <option key={s.name} value={s.name}>{s.name} — {s.price}€/{s.unit}</option>
                  ))}
                </select>
              </div>
              <div className="booking-field">
                <label>Fecha</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <button className="btn btn-primary booking-btn">Solicitar reserva</button>
            <button className="btn btn-outline booking-btn">Enviar mensaje</button>
            <p className="booking-note">No se te cobrará hasta confirmar la reserva</p>

            <div className="booking-trust">
              <div className="booking-trust-item">
                <span className="booking-trust-icon">🛡️</span>
                <span>Cobertura veterinaria incluida</span>
              </div>
              <div className="booking-trust-item">
                <span className="booking-trust-icon">❌</span>
                <span>Cancelación gratuita 48h antes</span>
              </div>
              <div className="booking-trust-item">
                <span className="booking-trust-icon">📱</span>
                <span>Actualizaciones diarias con fotos</span>
              </div>
              {sitter.verified && (
                <div className="booking-trust-item">
                  <span className="booking-trust-icon">✓</span>
                  <span>Identidad verificada</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Other sitters */}
      <section className="similar-sitters">
        <h2>Otras cuidadoras que te pueden interesar</h2>
        <div className="similar-sitters-grid">
          {otherSitters.map((s) => (
            <Link to={`/cuidadora/${s.id}`} className="similar-sitter-card" key={s.id}>
              <img src={s.image} alt={s.name} className="similar-sitter-img" />
              <div className="similar-sitter-info">
                <div className="similar-sitter-name">
                  <h3>{s.name}</h3>
                  {s.verified && <span className="mini-verified">✓</span>}
                </div>
                <p className="similar-sitter-location">📍 {s.location}</p>
                <div className="similar-sitter-rating">
                  <Stars rating={s.rating} />
                  <span>{s.rating} ({s.reviews})</span>
                </div>
                <div className="similar-sitter-footer">
                  <span className="similar-sitter-price">{s.price}€<small>/hora</small></span>
                  <span className="btn btn-primary btn-sm">Ver perfil</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
