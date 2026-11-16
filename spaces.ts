import type { Space } from '../types'
export const SPACES: Space[] = [
  ...Array.from({ length: 4 }, (_, i) => ({ id: `pod-${i + 1}`, type: 'pod' as const, name: `Study Pod ${i + 1}`, pricePerHour: 6 })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: `box-${i + 1}`, type: 'sleep' as const, name: `Sleep Box ${i + 1}`, pricePerHour: 9 })),
]
