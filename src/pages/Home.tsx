import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Stars } from '../components/Stars'
import { sitters } from '../data/sitters'

export function Home() {
  const [selectedDate, setSelectedDate] = useState('')

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Tu mascota merece el mejor cuidado</h1>
          <p>
            Conectamos a dueños de mascotas con cuidadoras de confianza.
            Encuentra la pet sister perfecta cerca de ti.
          </p>
          <div className="search-bar">
            <input type="text" placeholder="📍 ¿Dónde necesitas una cuidadora?" />
            <div className="date-input-wrapper">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              {!selectedDate && (
                <span className="date-placeholder">📅 ¿Cuándo?</span>
              )}
            </div>
            <button className="btn btn-primary">Buscar</button>
          </div>
          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>Cuidadoras verificadas</span>
            </div>
            <div>
              <strong>10.000+</strong>
              <span>Mascotas cuidadas</span>
            </div>
            <div>
              <strong>4.8 ★</strong>
              <span>Valoración media</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" id="how-it-works">
        <h2>¿Cómo funciona?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Busca</h3>
            <p>Encuentra cuidadoras cerca de ti filtrando por ubicación, disponibilidad y tipo de mascota.</p>
          </div>
          <div className="step">
            <div className="step-icon">💬</div>
            <h3>Contacta</h3>
            <p>Chatea con las cuidadoras, conoce su experiencia y resuelve todas tus dudas.</p>
          </div>
          <div className="step">
            <div className="step-icon">🐶</div>
            <h3>Reserva</h3>
            <p>Reserva el servicio de forma segura y deja a tu mascota en las mejores manos.</p>
          </div>
        </div>
      </section>

      {/* Featured sitters */}
      <section className="sitters-section" id="sitters">
        <h2>Cuidadoras destacadas</h2>
        <div className="sitters-grid">
          {sitters.map((sitter) => (
            <Link to={`/cuidadora/${sitter.id}`} className="sitter-card" key={sitter.id}>
              <img src={sitter.image} alt={sitter.name} className="sitter-img" />
              <div className="sitter-info">
                <h3>{sitter.name}</h3>
                <p className="sitter-location">📍 {sitter.location}</p>
                <div className="sitter-rating">
                  <Stars rating={sitter.rating} />
                  <span className="rating-text">
                    {sitter.rating} ({sitter.reviews} reseñas)
                  </span>
                </div>
                <div className="sitter-specialties">
                  {sitter.specialties.map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
                <div className="sitter-footer">
                  <span className="price">{sitter.price}€<small>/hora</small></span>
                  <span className="btn btn-primary btn-sm">Ver perfil</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
