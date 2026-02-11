import { Link } from 'react-router-dom'
import { Stars } from '../components/Stars'
import { FacetedFilter, SortBar } from '../components/FacetedFilter'
import { sitters } from '../data/sitters'
import { useSitterFilters } from '../hooks/useSitterFilters'

const testimonials = [
  {
    author: 'Carlos M.',
    avatar: 'https://i.pravatar.cc/100?img=33',
    rating: 5,
    text: 'Maria cuidó de nuestro labrador Max durante dos semanas. Nos mandaba fotos todos los días. Max no quería volver a casa!',
    petName: 'Max',
    petType: 'Labrador',
    sitter: 'María García',
    location: 'Madrid',
  },
  {
    author: 'Rosa P.',
    avatar: 'https://i.pravatar.cc/100?img=43',
    rating: 5,
    text: 'Ana es la mejor con los gatos. Mi gato Simba es muy asustadizo pero con ella se relajó enseguida. Volveremos seguro.',
    petName: 'Simba',
    petType: 'Gato',
    sitter: 'Ana Martínez',
    location: 'Valencia',
  },
  {
    author: 'Iñaki Z.',
    avatar: 'https://i.pravatar.cc/100?img=54',
    rating: 5,
    text: 'Carmen es increíble. Mi pastor alemán Koda volvió mucho más calmado. Además de cuidarlo, le enseñó trucos nuevos!',
    petName: 'Koda',
    petType: 'Pastor Alemán',
    sitter: 'Carmen Ruiz',
    location: 'Bilbao',
  },
]

const services = [
  {
    icon: '🏠',
    title: 'Alojamiento',
    description: 'Tu mascota se queda en casa de una cuidadora con atención 24h, como en su segundo hogar.',
    from: 20,
  },
  {
    icon: '🚶',
    title: 'Paseos',
    description: 'Paseos diarios adaptados a la energía y necesidades de tu perro. Ejercicio y diversión garantizados.',
    from: 12,
  },
  {
    icon: '📍',
    title: 'Visitas a domicilio',
    description: 'Una cuidadora visita tu casa para alimentar, jugar y dar cariño a tu mascota en su entorno.',
    from: 12,
  },
  {
    icon: '☀️',
    title: 'Guardería de día',
    description: 'Cuidado durante el día mientras trabajas. Socialización, juego supervisado y mucho mimo.',
    from: 15,
  },
]

export function Home() {
  const {
    filters,
    filteredSitters,
    facetOptions,
    facetCounts,
    activeFilterCount,
    toggleArrayFilter,
    updateFilter,
    clearAllFilters,
    removeFilter,
  } = useSitterFilters(sitters)

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-badge">+500 cuidadoras verificadas en toda España</span>
            <h1>
              Tu mascota merece<br />
              <span className="hero-highlight">el mejor cuidado</span>
            </h1>
            <p>
              Conectamos a dueños de mascotas con cuidadoras de confianza verificadas.
              Encuentra la pet sister perfecta cerca de ti en minutos.
            </p>
            <div className="hero-actions">
              <a href="#sitters" className="btn btn-primary btn-lg">
                Explorar cuidadoras
              </a>
              <a href="#how-it-works" className="btn btn-outline-hero btn-lg">
                Cómo funciona
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>500+</strong>
                <span>Cuidadoras verificadas</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <strong>10.000+</strong>
                <span>Mascotas cuidadas</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <strong>4.8 ★</strong>
                <span>Valoración media</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-grid">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop"
                alt="Perro feliz"
                className="hero-img hero-img-1"
              />
              <img
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop"
                alt="Gato adorable"
                className="hero-img hero-img-2"
              />
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop"
                alt="Perros jugando"
                className="hero-img hero-img-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="services-inner">
          <h2>Servicios para cada necesidad</h2>
          <p className="section-subtitle">
            Desde paseos diarios hasta alojamiento completo, tenemos la solución perfecta para ti y tu mascota.
          </p>
          <div className="services-grid">
            {services.map((service) => (
              <a href="#sitters" className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-price">Desde {service.from}€</span>
                <span className="service-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" id="how-it-works">
        <h2>¿Cómo funciona?</h2>
        <p className="section-subtitle">
          Encontrar la cuidadora ideal para tu mascota es muy sencillo. Solo 3 pasos.
        </p>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">🔍</div>
            <h3>Busca y filtra</h3>
            <p>Encuentra cuidadoras cerca de ti filtrando por ubicación, tipo de mascota, servicio y precio.</p>
          </div>
          <div className="step-connector">
            <span />
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">💬</div>
            <h3>Contacta y conoce</h3>
            <p>Chatea con las cuidadoras, consulta sus perfiles completos y resuelve todas tus dudas.</p>
          </div>
          <div className="step-connector">
            <span />
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">🐶</div>
            <h3>Reserva seguro</h3>
            <p>Reserva el servicio de forma segura con pago protegido y deja a tu mascota en las mejores manos.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>Lo que dicen nuestros usuarios</h2>
        <p className="section-subtitle">
          Miles de familias ya confían en PetSisters para el cuidado de sus mascotas.
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.author}>
              <div className="testimonial-stars">
                <Stars rating={t.rating} />
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-footer">
                <img src={t.avatar} alt={t.author} className="testimonial-avatar" />
                <div>
                  <strong className="testimonial-author">{t.author}</strong>
                  <span className="testimonial-meta">
                    {t.petName} ({t.petType}) · Cuidado por {t.sitter}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="trust-section">
        <div className="trust-inner">
          <h2>¿Por qué elegir PetSisters?</h2>
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">✓</div>
              <h3>Cuidadoras verificadas</h3>
              <p>Todas nuestras cuidadoras pasan por un proceso de verificación de identidad y antecedentes.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🛡️</div>
              <h3>Cobertura veterinaria</h3>
              <p>Cada reserva incluye cobertura veterinaria para tu tranquilidad durante toda la estancia.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">📱</div>
              <h3>Actualizaciones diarias</h3>
              <p>Recibe fotos y mensajes de tu cuidadora para que siempre sepas cómo está tu mascota.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">💬</div>
              <h3>Soporte 24/7</h3>
              <p>Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sitters section with faceted filters */}
      <section className="sitters-section" id="sitters">
        <h2>Encuentra tu cuidadora ideal</h2>
        <p className="section-subtitle sitters-subtitle">
          Explora nuestras cuidadoras verificadas, filtra por lo que necesitas y descubre la persona perfecta para tu mascota.
        </p>

        <div className="sitters-layout">
          <FacetedFilter
            filters={filters}
            facetOptions={facetOptions}
            facetCounts={facetCounts}
            activeFilterCount={activeFilterCount}
            onToggleArray={toggleArrayFilter}
            onUpdate={updateFilter}
            onClearAll={clearAllFilters}
            onRemove={removeFilter}
          />

          <div className="sitters-main">
            <SortBar
              sortBy={filters.sortBy}
              total={facetCounts.total}
              onSortChange={(v) => updateFilter('sortBy', v)}
            />

            {filteredSitters.length > 0 ? (
              <div className="sitters-grid">
                {filteredSitters.map((sitter) => (
                  <Link to={`/cuidadora/${sitter.id}`} className="sitter-card" key={sitter.id}>
                    <div className="sitter-card-img-wrapper">
                      <img src={sitter.image} alt={sitter.name} className="sitter-img" />
                      {sitter.verified && <span className="sitter-verified-badge">Verificada</span>}
                    </div>
                    <div className="sitter-info">
                      <h3>{sitter.name}</h3>
                      <p className="sitter-location">📍 {sitter.location}</p>
                      <div className="sitter-rating">
                        <Stars rating={sitter.rating} />
                        <span className="rating-text">
                          {sitter.rating} ({sitter.reviews} reseñas)
                        </span>
                      </div>
                      <div className="sitter-meta">
                        <span>{sitter.experience} años exp.</span>
                        <span>⏱ {sitter.responseTime}</span>
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
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No se encontraron cuidadoras</h3>
                <p>Prueba a ajustar los filtros para ver más resultados.</p>
                <button className="btn btn-primary" onClick={clearAllFilters}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-inner">
          <div className="cta-text">
            <h2>¿Eres cuidadora de mascotas?</h2>
            <p>
              Únete a nuestra comunidad de más de 500 cuidadoras verificadas.
              Establece tus horarios, elige tus servicios y empieza a ganar dinero haciendo lo que más te gusta.
            </p>
          </div>
          <div className="cta-actions">
            <button className="btn btn-cta btn-lg">Hazte cuidadora</button>
            <span className="cta-note">Registro gratuito · Sin compromisos</span>
          </div>
        </div>
      </section>
    </>
  )
}
