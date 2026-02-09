import { useState } from 'react'
import { Link } from 'react-router'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          🐾 PetSisters
        </Link>
        <div className="nav-links">
          <a href="/#how-it-works">Cómo funciona</a>
          <a href="/#sitters">Cuidadoras</a>
          <button className="btn btn-outline">Iniciar sesión</button>
          <button className="btn btn-primary">Registrarse</button>
        </div>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="/#sitters" onClick={() => setMenuOpen(false)}>Cuidadoras</a>
          <div className="mobile-menu-divider" />
          <p className="mobile-menu-label">Servicios</p>
          <a href="#" onClick={() => setMenuOpen(false)}>Paseo de perros</a>
          <a href="#" onClick={() => setMenuOpen(false)}>Alojamiento</a>
          <a href="#" onClick={() => setMenuOpen(false)}>Guardería de día</a>
          <a href="#" onClick={() => setMenuOpen(false)}>Visitas a domicilio</a>
          <div className="mobile-menu-divider" />
          <div className="mobile-menu-actions">
            <button className="btn btn-outline mobile-menu-btn" onClick={() => setMenuOpen(false)}>Iniciar sesión</button>
            <button className="btn btn-primary mobile-menu-btn" onClick={() => setMenuOpen(false)}>Registrarse</button>
          </div>
        </div>
      )}
    </nav>
  )
}
