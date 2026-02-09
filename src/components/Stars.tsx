export function Stars({ rating }: { rating: number }) {
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
