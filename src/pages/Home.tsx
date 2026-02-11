import { Link } from 'react-router-dom'
import { Stars } from '../components/Stars'
import { FacetedFilter, SortBar } from '../components/FacetedFilter'
import { sitters } from '../data/sitters'
import { useSitterFilters } from '../hooks/useSitterFilters'

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
        <div className="hero-content">
          <h1>Tu mascota merece el mejor cuidado</h1>
          <p>
            Conectamos a due\u00F1os de mascotas con cuidadoras de confianza.
            Encuentra la pet sister perfecta cerca de ti.
          </p>
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
              <strong>4.8 {'\u2605'}</strong>
              <span>Valoraci\u00F3n media</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" id="how-it-works">
        <h2>{'\u00BF'}C\u00F3mo funciona?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">{'\uD83D\uDD0D'}</div>
            <h3>Busca</h3>
            <p>Encuentra cuidadoras cerca de ti filtrando por ubicaci\u00F3n, disponibilidad y tipo de mascota.</p>
          </div>
          <div className="step">
            <div className="step-icon">{'\uD83D\uDCAC'}</div>
            <h3>Contacta</h3>
            <p>Chatea con las cuidadoras, conoce su experiencia y resuelve todas tus dudas.</p>
          </div>
          <div className="step">
            <div className="step-icon">{'\uD83D\uDC36'}</div>
            <h3>Reserva</h3>
            <p>Reserva el servicio de forma segura y deja a tu mascota en las mejores manos.</p>
          </div>
        </div>
      </section>

      {/* Sitters section with faceted filters */}
      <section className="sitters-section" id="sitters">
        <h2>Cuidadoras destacadas</h2>

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
                      <p className="sitter-location">{'\uD83D\uDCCD'} {sitter.location}</p>
                      <div className="sitter-rating">
                        <Stars rating={sitter.rating} />
                        <span className="rating-text">
                          {sitter.rating} ({sitter.reviews} rese\u00F1as)
                        </span>
                      </div>
                      <div className="sitter-meta">
                        <span>{sitter.experience} a\u00F1os exp.</span>
                        <span>{'\u23F1'} {sitter.responseTime}</span>
                      </div>
                      <div className="sitter-specialties">
                        {sitter.specialties.map((s) => (
                          <span className="tag" key={s}>{s}</span>
                        ))}
                      </div>
                      <div className="sitter-footer">
                        <span className="price">{sitter.price}{'\u20AC'}<small>/hora</small></span>
                        <span className="btn btn-primary btn-sm">Ver perfil</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">{'\uD83D\uDD0D'}</div>
                <h3>No se encontraron cuidadoras</h3>
                <p>Prueba a ajustar los filtros para ver m\u00E1s resultados.</p>
                <button className="btn btn-primary" onClick={clearAllFilters}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
