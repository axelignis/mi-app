import { useState, useMemo, useCallback } from 'react'
import type { Sitter } from '../types'

export interface FilterState {
  locations: string[]
  specialties: string[]
  services: string[]
  priceRange: [number, number]
  minRating: number
  minExperience: number
  verifiedOnly: boolean
  sortBy: 'rating' | 'price-asc' | 'price-desc' | 'experience' | 'reviews'
  searchQuery: string
}

export interface FacetCounts {
  locations: Record<string, number>
  specialties: Record<string, number>
  services: Record<string, number>
  verified: number
  total: number
}

const DEFAULT_FILTERS: FilterState = {
  locations: [],
  specialties: [],
  services: [],
  priceRange: [0, 50],
  minRating: 0,
  minExperience: 0,
  verifiedOnly: false,
  sortBy: 'rating',
  searchQuery: '',
}

export function useSitterFilters(sitters: Sitter[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  // Extract all unique values for facets
  const facetOptions = useMemo(() => {
    const locations = [...new Set(sitters.map((s) => s.location))].sort()
    const specialties = [...new Set(sitters.flatMap((s) => s.specialties))].sort()
    const services = [...new Set(sitters.flatMap((s) => s.services.map((sv) => sv.name)))].sort()
    const prices = sitters.map((s) => s.price)
    const priceMin = Math.floor(Math.min(...prices))
    const priceMax = Math.ceil(Math.max(...prices))
    return { locations, specialties, services, priceMin, priceMax }
  }, [sitters])

  // Filter sitters
  const filteredSitters = useMemo(() => {
    let result = sitters.filter((sitter) => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase()
        const matchesSearch =
          sitter.name.toLowerCase().includes(q) ||
          sitter.location.toLowerCase().includes(q) ||
          sitter.bio.toLowerCase().includes(q) ||
          sitter.specialties.some((s) => s.toLowerCase().includes(q))
        if (!matchesSearch) return false
      }

      // Location
      if (filters.locations.length > 0 && !filters.locations.includes(sitter.location)) {
        return false
      }

      // Specialties
      if (
        filters.specialties.length > 0 &&
        !filters.specialties.some((sp) => sitter.specialties.includes(sp))
      ) {
        return false
      }

      // Services
      if (filters.services.length > 0) {
        const sitterServiceNames = sitter.services.map((sv) => sv.name)
        if (!filters.services.some((sv) => sitterServiceNames.includes(sv))) {
          return false
        }
      }

      // Price range
      if (sitter.price < filters.priceRange[0] || sitter.price > filters.priceRange[1]) {
        return false
      }

      // Min rating
      if (filters.minRating > 0 && sitter.rating < filters.minRating) {
        return false
      }

      // Min experience
      if (filters.minExperience > 0 && sitter.experience < filters.minExperience) {
        return false
      }

      // Verified only
      if (filters.verifiedOnly && !sitter.verified) {
        return false
      }

      return true
    })

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'experience':
        result.sort((a, b) => b.experience - a.experience)
        break
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [sitters, filters])

  // Compute facet counts based on current filtered results (excluding the facet itself)
  const facetCounts = useMemo<FacetCounts>(() => {
    const counts: FacetCounts = {
      locations: {},
      specialties: {},
      services: {},
      verified: 0,
      total: filteredSitters.length,
    }

    for (const sitter of filteredSitters) {
      counts.locations[sitter.location] = (counts.locations[sitter.location] || 0) + 1
      for (const sp of sitter.specialties) {
        counts.specialties[sp] = (counts.specialties[sp] || 0) + 1
      }
      for (const sv of sitter.services) {
        counts.services[sv.name] = (counts.services[sv.name] || 0) + 1
      }
      if (sitter.verified) counts.verified++
    }

    return counts
  }, [filteredSitters])

  // Active filter count (for badge)
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.locations.length > 0) count++
    if (filters.specialties.length > 0) count++
    if (filters.services.length > 0) count++
    if (filters.minRating > 0) count++
    if (filters.minExperience > 0) count++
    if (filters.verifiedOnly) count++
    if (filters.searchQuery) count++
    if (
      filters.priceRange[0] > facetOptions.priceMin ||
      filters.priceRange[1] < facetOptions.priceMax
    ) {
      count++
    }
    return count
  }, [filters, facetOptions])

  const toggleArrayFilter = useCallback(
    (key: 'locations' | 'specialties' | 'services', value: string) => {
      setFilters((prev) => {
        const arr = prev[key]
        const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
        return { ...prev, [key]: next }
      })
    },
    [],
  )

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      priceRange: [facetOptions.priceMin, facetOptions.priceMax],
    })
  }, [facetOptions])

  const removeFilter = useCallback(
    (key: keyof FilterState, value?: string) => {
      setFilters((prev) => {
        if (key === 'locations' || key === 'specialties' || key === 'services') {
          return { ...prev, [key]: value ? prev[key].filter((v) => v !== value) : [] }
        }
        if (key === 'priceRange') {
          return { ...prev, priceRange: [facetOptions.priceMin, facetOptions.priceMax] }
        }
        if (key === 'minRating') return { ...prev, minRating: 0 }
        if (key === 'minExperience') return { ...prev, minExperience: 0 }
        if (key === 'verifiedOnly') return { ...prev, verifiedOnly: false }
        if (key === 'searchQuery') return { ...prev, searchQuery: '' }
        return prev
      })
    },
    [facetOptions],
  )

  return {
    filters,
    filteredSitters,
    facetOptions,
    facetCounts,
    activeFilterCount,
    toggleArrayFilter,
    updateFilter,
    clearAllFilters,
    removeFilter,
  }
}
