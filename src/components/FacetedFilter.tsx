import { useState } from 'react'
import type { FilterState, FacetCounts } from '../hooks/useSitterFilters'

interface FacetedFilterProps {
  filters: FilterState
  facetOptions: {
    locations: string[]
    specialties: string[]
    services: string[]
    priceMin: number
    priceMax: number
  }
  facetCounts: FacetCounts
  activeFilterCount: number
  onToggleArray: (key: 'locations' | 'specialties' | 'services', value: string) => void
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onClearAll: () => void
  onRemove: (key: keyof FilterState, value?: string) => void
}

const SPECIALTY_ICONS: Record<string, string> = {
  Perros: '🐶',
  Gatos: '🐱',
  Aves: '🐦',
  Reptiles: '🦎',
  Conejos: '🐰',
}

const SERVICE_ICONS: Record<string, string> = {
  Alojamiento: '🏠',
  Paseo: '🚶',
  'Visita a domicilio': '📍',
  'Guardería de día': '☀️',
}

const RATING_OPTIONS = [
  { value: 4.9, label: '4.9+' },
  { value: 4.8, label: '4.8+' },
  { value: 4.5, label: '4.5+' },
  { value: 4.0, label: '4.0+' },
]

const EXPERIENCE_OPTIONS = [
  { value: 3, label: '3+ años' },
  { value: 5, label: '5+ años' },
  { value: 8, label: '8+ años' },
  { value: 10, label: '10+ años' },
]

const SORT_OPTIONS = [
  { value: 'rating' as const, label: 'Mejor valoradas' },
  { value: 'price-asc' as const, label: 'Precio: menor a mayor' },
  { value: 'price-desc' as const, label: 'Precio: mayor a menor' },
  { value: 'experience' as const, label: 'Más experiencia' },
  { value: 'reviews' as const, label: 'Más reseñas' },
]

function FacetSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="facet-section">
      <button className="facet-header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`facet-chevron ${open ? 'open' : ''}`}>▸</span>
      </button>
      {open && <div className="facet-body">{children}</div>}
    </div>
  )
}

export function FacetedFilter({
  filters,
  facetOptions,
  facetCounts,
  activeFilterCount,
  onToggleArray,
  onUpdate,
  onClearAll,
  onRemove,
}: FacetedFilterProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeChips = buildActiveChips(filters, facetOptions)

  return (
    <>
      {/* Mobile toggle button */}
      <button className="filter-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        <span>⚙️ Filtros</span>
        {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
      </button>

      {/* Sidebar */}
      <aside className={`faceted-filter ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="filter-header">
          <h3>Filtros</h3>
          {activeFilterCount > 0 && (
            <button className="filter-clear-all" onClick={onClearAll}>
              Limpiar todo
            </button>
          )}
          <button className="filter-mobile-close" onClick={() => setMobileOpen(false)}>
            ✕
          </button>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="active-filters">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                className="filter-chip"
                onClick={() => onRemove(chip.filterKey, chip.value)}
              >
                {chip.label} ✕
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="facet-search">
          <input
            type="text"
            placeholder="Buscar cuidadora..."
            value={filters.searchQuery}
            onChange={(e) => onUpdate('searchQuery', e.target.value)}
          />
          {filters.searchQuery && (
            <button className="facet-search-clear" onClick={() => onUpdate('searchQuery', '')}>
              ✕
            </button>
          )}
        </div>

        {/* Location */}
        <FacetSection title="Ubicación">
          {facetOptions.locations.map((loc) => (
            <label key={loc} className="facet-checkbox">
              <input
                type="checkbox"
                checked={filters.locations.includes(loc)}
                onChange={() => onToggleArray('locations', loc)}
              />
              <span className="facet-label">{loc}</span>
              <span className="facet-count">{facetCounts.locations[loc] || 0}</span>
            </label>
          ))}
        </FacetSection>

        {/* Specialties */}
        <FacetSection title="Tipo de mascota">
          {facetOptions.specialties.map((sp) => (
            <label key={sp} className="facet-checkbox">
              <input
                type="checkbox"
                checked={filters.specialties.includes(sp)}
                onChange={() => onToggleArray('specialties', sp)}
              />
              <span className="facet-label">
                {SPECIALTY_ICONS[sp] || ''} {sp}
              </span>
              <span className="facet-count">{facetCounts.specialties[sp] || 0}</span>
            </label>
          ))}
        </FacetSection>

        {/* Services */}
        <FacetSection title="Servicios">
          {facetOptions.services.map((sv) => (
            <label key={sv} className="facet-checkbox">
              <input
                type="checkbox"
                checked={filters.services.includes(sv)}
                onChange={() => onToggleArray('services', sv)}
              />
              <span className="facet-label">
                {SERVICE_ICONS[sv] || ''} {sv}
              </span>
              <span className="facet-count">{facetCounts.services[sv] || 0}</span>
            </label>
          ))}
        </FacetSection>

        {/* Price range */}
        <FacetSection title="Precio por hora">
          <div className="facet-range">
            <div className="range-values">
              <span>{filters.priceRange[0]}€</span>
              <span>{filters.priceRange[1]}€</span>
            </div>
            <div className="range-inputs">
              <input
                type="range"
                min={facetOptions.priceMin}
                max={facetOptions.priceMax}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  onUpdate('priceRange', [
                    Math.min(Number(e.target.value), filters.priceRange[1]),
                    filters.priceRange[1],
                  ])
                }
              />
              <input
                type="range"
                min={facetOptions.priceMin}
                max={facetOptions.priceMax}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onUpdate('priceRange', [
                    filters.priceRange[0],
                    Math.max(Number(e.target.value), filters.priceRange[0]),
                  ])
                }
              />
            </div>
          </div>
        </FacetSection>

        {/* Rating */}
        <FacetSection title="Valoración mínima">
          <div className="facet-rating-options">
            {RATING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`rating-option ${filters.minRating === opt.value ? 'active' : ''}`}
                onClick={() => onUpdate('minRating', filters.minRating === opt.value ? 0 : opt.value)}
              >
                ★ {opt.label}
              </button>
            ))}
          </div>
        </FacetSection>

        {/* Experience */}
        <FacetSection title="Experiencia">
          <div className="facet-rating-options">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`rating-option ${filters.minExperience === opt.value ? 'active' : ''}`}
                onClick={() =>
                  onUpdate('minExperience', filters.minExperience === opt.value ? 0 : opt.value)
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FacetSection>

        {/* Verified */}
        <FacetSection title="Verificación">
          <label className="facet-checkbox">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onUpdate('verifiedOnly', e.target.checked)}
            />
            <span className="facet-label">Solo verificadas</span>
            <span className="facet-count">{facetCounts.verified}</span>
          </label>
        </FacetSection>

        {/* Mobile apply button */}
        <button className="filter-mobile-apply" onClick={() => setMobileOpen(false)}>
          Ver {facetCounts.total} resultado{facetCounts.total !== 1 ? 's' : ''}
        </button>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && <div className="filter-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  )
}

export function SortBar({
  sortBy,
  total,
  onSortChange,
}: {
  sortBy: FilterState['sortBy']
  total: number
  onSortChange: (value: FilterState['sortBy']) => void
}) {
  return (
    <div className="sort-bar">
      <span className="results-count">
        {total} cuidadora{total !== 1 ? 's' : ''} encontrada{total !== 1 ? 's' : ''}
      </span>
      <div className="sort-select-wrapper">
        <label htmlFor="sort-select">Ordenar por:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

interface ActiveChip {
  key: string
  label: string
  filterKey: keyof FilterState
  value?: string
}

function buildActiveChips(
  filters: FilterState,
  facetOptions: { priceMin: number; priceMax: number },
): ActiveChip[] {
  const chips: ActiveChip[] = []

  for (const loc of filters.locations) {
    chips.push({ key: `loc-${loc}`, label: loc, filterKey: 'locations', value: loc })
  }
  for (const sp of filters.specialties) {
    chips.push({ key: `sp-${sp}`, label: sp, filterKey: 'specialties', value: sp })
  }
  for (const sv of filters.services) {
    chips.push({ key: `sv-${sv}`, label: sv, filterKey: 'services', value: sv })
  }
  if (
    filters.priceRange[0] > facetOptions.priceMin ||
    filters.priceRange[1] < facetOptions.priceMax
  ) {
    chips.push({
      key: 'price',
      label: `${filters.priceRange[0]}€ - ${filters.priceRange[1]}€`,
      filterKey: 'priceRange',
    })
  }
  if (filters.minRating > 0) {
    chips.push({
      key: 'rating',
      label: `≥ ${filters.minRating}★`,
      filterKey: 'minRating',
    })
  }
  if (filters.minExperience > 0) {
    chips.push({
      key: 'exp',
      label: `${filters.minExperience}+ años exp.`,
      filterKey: 'minExperience',
    })
  }
  if (filters.verifiedOnly) {
    chips.push({ key: 'verified', label: 'Verificadas', filterKey: 'verifiedOnly' })
  }
  if (filters.searchQuery) {
    chips.push({
      key: 'search',
      label: `"${filters.searchQuery}"`,
      filterKey: 'searchQuery',
    })
  }

  return chips
}
