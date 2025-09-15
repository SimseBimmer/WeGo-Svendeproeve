export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  user: {
    id: 'number',
    name: 'string',
    email: 'string',
    password: 'string',
    description: 'string',
    image: 'string',
    refreshToken: 'string',
    isActive: 'boolean'
  },
  trip: {
    id: 'number',
    userId: 'number',
    departureDate: 'date',
    addressDeparture: 'string',
    cityDeparture: 'string',
    addressDestination: 'string',
    cityDestination: 'string',
    routeDeviation: 'number',
    seatsTotal: 'number',
    pricePerSeat: 'number',
    bagSizeId: 'number',
    comment: 'string',
    allowChildren: 'boolean',
    allowSmoking: 'boolean',
    allowMusic: 'boolean',
    allowPets: 'boolean',
    hasComfort: 'boolean',
    useFerry: 'boolean',
    isElectric: 'boolean',
    createdAt: 'date'
  },
  booking: {
    id: 'number',
    tripId: 'number',
    userId: 'number',
    comment: 'string',
    numSeats: 'number',
    createdAt: 'date'
  },
  review: {
    id: 'number',
    numStars: 'number',
    comment: 'string',
    reviewerId: 'number',
    reviewedUserId: 'number'
  },
  bagsize: {
    id: 'number',
    name: 'string',
    description: 'string',
    iconUrl: 'string'
  },
  slide: {
    id: 'number',
    image: 'string',
    text: 'string'
  },
  content: {
    id: 'number',
    title: 'string',
    content: 'string'
  }  
};