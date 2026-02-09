import { useParams, Link } from 'react-router'
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

export function SitterProfile() {
  const { id } = useParams<{ id: string }>()
  const sitter = sitters.find((s) => s.id === id)

  if (!sitter) {
    return (
      <div className="profile-not-found">
        <h1>Cuidadora no encontrada</h1>
        <p>Lo sentimos, no pudimos encontrar este perfil.</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="profile">
      {/* Breadcrumb */}
      <div className="profile-breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/#sitters">Cuidadoras</Link>
        <span>/</span>
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
                <span>{sitter.rating} ({sitter.reviews} reseñas)</span>
              </div>
              <div className="profile-tags">
                {sitter.specialties.map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <strong>{sitter.experience} años</strong>
              <span>Experiencia</span>
            </div>
            <div className="profile-stat">
              <strong>{sitter.completedBookings}</strong>
              <span>Reservas</span>
            </div>
            <div className="profile-stat">
              <strong>{sitter.responseTime}</strong>
              <span>Respuesta</span>
            </div>
            <div className="profile-stat">
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
            <h2>Servicios</h2>
            <div className="services-grid">
              {sitter.services.map((service) => (
                <div className="service-card" key={service.name}>
                  <div className="service-header">
                    <h3>{service.name}</h3>
                    <span className="service-price">{service.price}€<small>/{service.unit}</small></span>
                  </div>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section className="profile-section">
            <h2>Galería</h2>
            <div className="gallery-grid">
              {sitter.gallery.map((img, i) => (
                <img src={img} alt={`Foto ${i + 1} de ${sitter.name}`} key={i} className="gallery-img" />
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="profile-section">
            <h2>Reseñas ({sitter.reviews})</h2>
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
          </div>
        </aside>
      </div>
    </div>
  )
}
