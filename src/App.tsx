import './App.css'

const sitters = [
  {
    name: 'María García',
    location: 'Madrid',
    rating: 4.9,
    reviews: 124,
    price: 15,
    specialties: ['Perros', 'Gatos'],
    image: 'https://i.pravatar.cc/300?img=1',
  },
  {
    name: 'Laura Fernández',
    location: 'Barcelona',
    rating: 4.8,
    reviews: 98,
    price: 18,
    specialties: ['Perros', 'Aves'],
    image: 'https://i.pravatar.cc/300?img=5',
  },
  {
    name: 'Ana Martínez',
    location: 'Valencia',
    rating: 5.0,
    reviews: 67,
    price: 12,
    specialties: ['Gatos', 'Conejos'],
    image: 'https://i.pravatar.cc/300?img=9',
  },
  {
    name: 'Sofía López',
    location: 'Sevilla',
    rating: 4.7,
    reviews: 203,
    price: 20,
    specialties: ['Perros', 'Gatos', 'Reptiles'],
    image: 'https://i.pravatar.cc/300?img=16',
  },
  {
    name: 'Carmen Ruiz',
    location: 'Bilbao',
    rating: 4.9,
    reviews: 56,
    price: 14,
    specialties: ['Perros'],
    image: 'https://i.pravatar.cc/300?img=20',
  },
  {
    name: 'Elena Torres',
    location: 'Málaga',
    rating: 4.6,
    reviews: 89,
    price: 16,
    specialties: ['Gatos', 'Perros'],
    image: 'https://i.pravatar.cc/300?img=23',
  },
]

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="stars" aria-label={`${rating} de 5 estrellas`}>
      {'★'.repeat(full)}
      {half && '★'}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="logo">
            🐾 PetSisters
          </a>
          <div className="nav-links">
            <a href="#how-it-works">Cómo funciona</a>
            <a href="#sitters">Cuidadoras</a>
            <button className="btn btn-outline">Iniciar sesión</button>
            <button className="btn btn-primary">Registrarse</button>
          </div>
        </div>
      </nav>

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
            <input type="date" />
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
            <div className="sitter-card" key={sitter.name}>
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
                  <button className="btn btn-primary btn-sm">Contactar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo">🐾 PetSisters</span>
            <p>Cuidando a quienes más quieres.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Empresa</h4>
              <a href="#">Sobre nosotros</a>
              <a href="#">Blog</a>
              <a href="#">Trabaja con nosotros</a>
            </div>
            <div>
              <h4>Soporte</h4>
              <a href="#">Centro de ayuda</a>
              <a href="#">Contacto</a>
              <a href="#">FAQ</a>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="#">Términos de uso</a>
              <a href="#">Privacidad</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 PetSisters. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
