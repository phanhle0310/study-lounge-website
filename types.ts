export type SpaceType = 'pod' | 'sleep'
export interface Space { id: string; type: SpaceType; name: string; pricePerHour: number }
export interface BookingInput { spaceId: string; date: string; startHour: number; hours: number; name: string; email: string }
export interface Booking extends BookingInput { id: string; total: number; createdAt: string }
