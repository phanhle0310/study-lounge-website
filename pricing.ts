// Rule: 10% off bookings of 4+ hours.
export function calcPrice(rate: number, hours: number) {
  const subtotal = rate * hours
  const discount = hours >= 4 ? Math.round(subtotal * 0.1 * 100) / 100 : 0
  return { subtotal, discount, total: Math.round((subtotal - discount) * 100) / 100 }
}
export const money = (n: number) => `$${n.toFixed(2)}`
